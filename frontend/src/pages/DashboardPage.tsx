import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { usersApi } from '../api/users'
import type { User } from '../types'
import { Badge } from '../components/ui/Badge'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/Toast'

interface StatCard {
  label: string
  value: number | string
  icon: string
  color: string
  bg: string
  description: string
}

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  const { toasts, toast, removeToast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    if (isAdmin) {
      setLoading(true)
      usersApi.getAll()
        .then(setUsers)
        .catch(() => toast.error('Failed to load user stats'))
        .finally(() => setLoading(false))
    }
  }, [isAdmin])

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.isActive).length
  const adminUsers = users.filter((u) => u.role === 'ADMIN').length
  const inactiveUsers = users.filter((u) => !u.isActive).length

  const stats: StatCard[] = isAdmin
    ? [
        { label: 'Total Users', value: totalUsers, icon: 'group', color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', description: 'All registered users' },
        { label: 'Active Users', value: activeUsers, icon: 'check_circle', color: '#10b981', bg: 'rgba(16,185,129,0.1)', description: 'Currently active accounts' },
        { label: 'Administrators', value: adminUsers, icon: 'admin_panel_settings', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', description: 'Users with admin role' },
        { label: 'Inactive', value: inactiveUsers, icon: 'cancel', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', description: 'Deactivated accounts' },
      ]
    : [
        { label: 'Account Status', value: user?.isActive ? 'Active' : 'Inactive', icon: 'verified_user', color: user?.isActive ? '#10b981' : '#ef4444', bg: user?.isActive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', description: 'Your account status' },
        { label: 'Role', value: user?.role || 'USER', icon: 'badge', color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', description: 'Your assigned role' },
        { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A', icon: 'calendar_today', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', description: 'Account creation date' },
      ]

  const recentUsers = [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      <div className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)', background: 'linear-gradient(135deg, #131b2e 0%, rgba(14,165,233,0.05) 100%)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(14,165,233,0.15)' }}>
            <span className="material-symbols-outlined text-[28px]" style={{ color: '#0ea5e9', fontVariationSettings: "'FILL' 1" }}>waving_hand</span>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold" style={{ color: '#dae2fd' }}>
              {greeting}, {user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-sm" style={{ color: '#94a3b8' }}>
              {isAdmin ? 'You have full administrative access to the system.' : 'Welcome to your booking management portal.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#10b981' }}>System Online</span>
            </div>
            <span className="data-mono text-[10px]" style={{ color: '#64748b' }}>{now.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className={`grid gap-4 ${isAdmin ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.01]"
              style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                  <span className="material-symbols-outlined text-[22px]" style={{ color: stat.color, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                </div>
                <span className="data-mono text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded" style={{ color: stat.color, backgroundColor: stat.bg }}>
                  {stat.label === 'Role' ? 'ASSIGNED' : 'LIVE'}
                </span>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Users Table (admin only) */}
      {isAdmin && users.length > 0 && (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(148,163,184,0.08)' }}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]" style={{ color: '#0ea5e9' }}>people</span>
              <h3 className="font-heading text-sm font-semibold" style={{ color: '#dae2fd' }}>Recent Users</h3>
              <span className="data-mono text-[10px] px-1.5 py-0.5 rounded" style={{ color: '#94a3b8', backgroundColor: '#222a3d' }}>Last 5</span>
            </div>
            <Link
              to="/users"
              className="flex items-center gap-1 text-xs font-medium transition-colors hover:text-primary-light"
              style={{ color: '#0ea5e9' }}
            >
              View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#0b1326' }}>
                  {['Name', 'Email', 'Role', 'Status', 'Joined'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, i) => (
                  <tr
                    key={u.id}
                    className="transition-colors"
                    style={{ borderTop: i > 0 ? '1px solid rgba(148,163,184,0.06)' : 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(14,165,233,0.15)' }}>
                          <span className="material-symbols-outlined text-[13px]" style={{ color: '#0ea5e9' }}>person</span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#dae2fd' }}>{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: '#94a3b8' }}>{u.email}</td>
                    <td className="px-5 py-3">
                      <Badge variant={u.role === 'ADMIN' ? 'admin' : 'user'} dot>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={u.isActive ? 'success' : 'error'} dot>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 data-mono text-xs" style={{ color: '#94a3b8' }}>
                      {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick actions for regular users */}
      {!isAdmin && (
        <div className="rounded-xl p-5 flex flex-col gap-4" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>
          <h3 className="font-heading text-sm font-semibold" style={{ color: '#dae2fd' }}>Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { to: '/profile', icon: 'edit', label: 'Edit Profile', desc: 'Update your name, email, and password' },
              { to: '/profile', icon: 'security', label: 'Security Settings', desc: 'Manage your account security' },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-3 p-4 rounded-lg transition-colors"
                style={{ backgroundColor: '#222a3d', border: '1px solid rgba(148,163,184,0.08)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#2d3449')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#222a3d')}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(14,165,233,0.1)' }}>
                  <span className="material-symbols-outlined text-[20px]" style={{ color: '#0ea5e9' }}>{action.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#dae2fd' }}>{action.label}</p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
