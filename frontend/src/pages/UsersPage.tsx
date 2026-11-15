import React, { useEffect, useState, useCallback } from 'react'
import { usersApi } from '../api/users'
import type { User, UpdateUserDto } from '../types'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/Toast'
import { useAuthStore } from '../store/authStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const editSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  role: z.enum(['USER', 'ADMIN']),
  isActive: z.boolean(),
  password: z.string().optional(),
})
type EditFormValues = z.infer<typeof editSchema>

export const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuthStore()
  const { toasts, toast, removeToast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'USER' | 'ADMIN'>('ALL')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
  })

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await usersApi.getAll()
      setUsers(data)
    } catch {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const openEdit = (u: User) => {
    setEditingUser(u)
    reset({ name: u.name, email: u.email, role: u.role, isActive: u.isActive, password: '' })
  }

  const saveEdit = async (data: EditFormValues) => {
    if (!editingUser) return
    setIsSaving(true)
    try {
      const dto: UpdateUserDto = { name: data.name, email: data.email, role: data.role, isActive: data.isActive }
      if (data.password && data.password.length > 0) dto.password = data.password
      const updated = await usersApi.update(editingUser.id, dto)
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      toast.success(`User ${updated.name} updated`)
      setEditingUser(null)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update user')
    } finally {
      setIsSaving(false)
    }
  }

  const confirmDelete = async () => {
    if (!deletingUser) return
    setIsDeleting(true)
    try {
      await usersApi.remove(deletingUser.id)
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id))
      toast.success(`User ${deletingUser.name} deleted`)
      setDeletingUser(null)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete user')
    } finally {
      setIsDeleting(false)
    }
  }

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const inputStyle = {
    backgroundColor: '#0b1326',
    border: '1px solid rgba(148,163,184,0.2)',
    color: '#dae2fd',
    outline: 'none',
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold" style={{ color: '#dae2fd' }}>User Management</h2>
          <p className="text-sm" style={{ color: '#94a3b8' }}>
            {users.length} total users · {users.filter(u => u.isActive).length} active
          </p>
        </div>
        <Button variant="primary" icon="refresh" onClick={fetchUsers}>Refresh</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px]" style={{ color: '#64748b' }}>search</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded text-sm"
            style={inputStyle}
          />
        </div>
        {/* Role filter */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: '#0b1326' }}>
          {(['ALL', 'USER', 'ADMIN'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              style={roleFilter === r
                ? { backgroundColor: '#222a3d', color: '#0ea5e9' }
                : { color: '#94a3b8' }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="material-symbols-outlined text-[48px]" style={{ color: '#64748b' }}>search_off</span>
            <p className="text-sm" style={{ color: '#94a3b8' }}>No users found matching your criteria</p>
            <Button variant="ghost" onClick={() => { setSearchQuery(''); setRoleFilter('ALL') }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#0b1326' }}>
                  {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr
                    key={u.id}
                    className="group transition-colors"
                    style={{ borderTop: i > 0 ? '1px solid rgba(148,163,184,0.06)' : 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a2235')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: u.role === 'ADMIN' ? 'rgba(14,165,233,0.15)' : 'rgba(148,163,184,0.1)' }}>
                          <span className="material-symbols-outlined text-[15px]" style={{ color: u.role === 'ADMIN' ? '#0ea5e9' : '#94a3b8' }}>person</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#dae2fd' }}>{u.name}</p>
                          {u.id === currentUser?.id && <span className="text-[9px] font-bold text-primary uppercase tracking-wider">YOU</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#94a3b8' }}>{u.email}</td>
                    <td className="px-5 py-3">
                      <Badge variant={u.role === 'ADMIN' ? 'admin' : 'user'} dot>{u.role}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={u.isActive ? 'success' : 'error'} dot>{u.isActive ? 'Active' : 'Inactive'}</Badge>
                    </td>
                    <td className="px-5 py-3 data-mono text-xs" style={{ color: '#94a3b8' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="p-1.5 rounded transition-colors"
                          style={{ color: '#94a3b8' }}
                          title="Edit user"
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0ea5e9'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(14,165,233,0.1)' }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        {u.id !== currentUser?.id && (
                          <button
                            onClick={() => setDeletingUser(u)}
                            className="p-1.5 rounded transition-colors"
                            style={{ color: '#94a3b8' }}
                            title="Delete user"
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(239,68,68,0.1)' }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={!!editingUser} onClose={() => setEditingUser(null)} title={`Edit User: ${editingUser?.name}`} size="md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(saveEdit)}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Full Name</label>
            <input {...register('name')} type="text" className="w-full h-10 px-3 rounded text-sm" style={inputStyle} />
            {errors.name && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.name.message}</p>}
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Email</label>
            <input {...register('email')} type="email" className="w-full h-10 px-3 rounded text-sm" style={inputStyle} />
            {errors.email && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.email.message}</p>}
          </div>
          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Role</label>
            <select {...register('role')} className="w-full h-10 px-3 rounded text-sm" style={inputStyle}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          {/* Active */}
          <div className="flex items-center gap-3">
            <input {...register('isActive')} type="checkbox" id="isActive" className="w-4 h-4 rounded" style={{ accentColor: '#0ea5e9' }} />
            <label htmlFor="isActive" className="text-sm cursor-pointer" style={{ color: '#dae2fd' }}>Account Active</label>
          </div>
          {/* New Password (optional) */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>New Password <span style={{ color: '#64748b' }}>(leave blank to keep current)</span></label>
            <input {...register('password')} type="password" placeholder="New password..." className="w-full h-10 px-3 rounded text-sm" style={inputStyle} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setEditingUser(null)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={isSaving}>Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deletingUser} onClose={() => setDeletingUser(null)} title="Confirm Delete" size="sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <span className="material-symbols-outlined text-[24px]" style={{ color: '#ef4444' }}>warning</span>
            <p className="text-sm" style={{ color: '#dae2fd' }}>
              Are you sure you want to permanently delete <strong>{deletingUser?.name}</strong>? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeletingUser(null)}>Cancel</Button>
            <Button variant="danger" loading={isDeleting} onClick={confirmDelete} icon="delete">Delete User</Button>
          </div>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
