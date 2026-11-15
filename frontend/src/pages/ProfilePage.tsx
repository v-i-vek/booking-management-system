import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { usersApi } from '../api/users'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/Toast'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
}).refine((d) => {
  if (d.newPassword && d.newPassword.length > 0) {
    return d.newPassword.length >= 6
  }
  return true
}, { message: 'New password must be at least 6 characters', path: ['newPassword'] })

type FormValues = z.infer<typeof schema>

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore()
  const { toasts, toast, removeToast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  })

  const onSubmit = async (data: FormValues) => {
    if (!user) return
    setIsSaving(true)
    try {
      const dto: { name?: string; email?: string; password?: string } = {
        name: data.name,
        email: data.email,
      }
      if (data.newPassword && data.newPassword.length > 0) {
        dto.password = data.newPassword
      }
      const updated = await usersApi.update(user.id, dto)
      updateUser(updated)
      toast.success('Profile updated successfully!')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const inputStyle = (hasError?: boolean) => ({
    backgroundColor: '#0b1326',
    border: `1px solid ${hasError ? '#ef4444' : 'rgba(148,163,184,0.2)'}`,
    color: '#dae2fd',
    outline: 'none',
  })

  const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#0ea5e9'
    e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.4)'
  }
  const blurHandler = (hasError?: boolean) => (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = hasError ? '#ef4444' : 'rgba(148,163,184,0.2)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Profile Card */}
      <div className="rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)', background: 'linear-gradient(135deg, #131b2e 0%, rgba(14,165,233,0.04) 100%)' }}>
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(14,165,233,0.15)', border: '2px solid rgba(14,165,233,0.3)' }}>
            <span className="material-symbols-outlined text-[36px]" style={{ color: '#0ea5e9', fontVariationSettings: "'FILL' 1" }}>person</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
            <span className="material-symbols-outlined text-[11px] text-white">verified</span>
          </div>
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-heading text-lg font-semibold" style={{ color: '#dae2fd' }}>{user?.name}</h2>
            <Badge variant={user?.role === 'ADMIN' ? 'admin' : 'user'} dot>{user?.role}</Badge>
            <Badge variant={user?.isActive ? 'success' : 'error'} dot>{user?.isActive ? 'Active' : 'Inactive'}</Badge>
          </div>
          <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>{user?.email}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="data-mono text-[11px]" style={{ color: '#64748b' }}>
              ID: {user?.id?.slice(0, 8).toUpperCase()}...
            </span>
            <span className="data-mono text-[11px]" style={{ color: '#64748b' }}>
              Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>
        <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}>
          <span className="material-symbols-outlined text-[20px]" style={{ color: '#0ea5e9' }}>edit</span>
          <h3 className="font-heading text-base font-semibold" style={{ color: '#dae2fd' }}>Edit Profile</h3>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Full Name</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>person</span>
              <input {...register('name')} type="text" className="w-full h-10 pl-9 pr-3 rounded text-sm"
                style={inputStyle(!!errors.name)} onFocus={focusHandler} onBlur={blurHandler(!!errors.name)} />
            </div>
            {errors.name && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Email Address</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>email</span>
              <input {...register('email')} type="email" className="w-full h-10 pl-9 pr-3 rounded text-sm"
                style={inputStyle(!!errors.email)} onFocus={focusHandler} onBlur={blurHandler(!!errors.email)} />
            </div>
            {errors.email && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.email.message}</p>}
          </div>

          {/* Password section */}
          <div className="p-4 rounded-lg flex flex-col gap-4" style={{ backgroundColor: '#0b1326', border: '1px solid rgba(148,163,184,0.08)' }}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]" style={{ color: '#94a3b8' }}>lock</span>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Change Password</span>
              <span className="text-[10px]" style={{ color: '#64748b' }}>(optional)</span>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ color: '#94a3b8' }}>New Password</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>key</span>
                <input {...register('newPassword')} type={showNewPassword ? 'text' : 'password'} placeholder="Min 6 characters"
                  className="w-full h-10 pl-9 pr-10 rounded text-sm" style={inputStyle(!!errors.newPassword)}
                  onFocus={focusHandler} onBlur={blurHandler(!!errors.newPassword)} />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3" style={{ color: '#64748b' }}>
                  <span className="material-symbols-outlined text-[17px]">{showNewPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {errors.newPassword && <p className="text-xs" style={{ color: '#ef4444' }}>{errors.newPassword.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit" variant="primary" loading={isSaving} icon="save">Save Changes</Button>
          </div>
        </form>
      </div>

      {/* Account Info */}
      <div className="rounded-xl p-5" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[18px]" style={{ color: '#0ea5e9' }}>info</span>
          <h3 className="font-heading text-sm font-semibold" style={{ color: '#dae2fd' }}>Account Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'User ID', value: user?.id?.slice(0, 16) + '...', icon: 'fingerprint' },
            { label: 'Account Role', value: user?.role, icon: 'badge' },
            { label: 'Account Status', value: user?.isActive ? 'Active' : 'Inactive', icon: 'toggle_on' },
            { label: 'Last Updated', value: user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A', icon: 'update' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex flex-col gap-1 p-3 rounded-lg" style={{ backgroundColor: '#222a3d' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[14px]" style={{ color: '#94a3b8' }}>{icon}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>{label}</span>
              </div>
              <span className="data-mono text-xs font-medium" style={{ color: '#dae2fd' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
