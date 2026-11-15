import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useAuthStore } from '../../store/authStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  to: string
  icon: string
  label: string
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: 'grid_view', label: 'Dashboard' },
  { to: '/users', icon: 'manage_accounts', label: 'Users', adminOnly: true },
  { to: '/profile', icon: 'person', label: 'My Profile' },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredNav = navItems.filter(item => !item.adminOnly || user?.role === 'ADMIN')

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-30 h-full w-64 flex flex-col',
          'border-r border-borderMd',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:z-auto',
        )}
        style={{ backgroundColor: '#131b2e' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-borderMd">
          <div className="w-9 h-9 rounded-lg bg-surface-high flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_month
            </span>
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-onSurface leading-tight">Booking MgmT</p>
            <p className="text-[10px] text-textTertiary uppercase tracking-wider">Management System</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <p className="text-[10px] text-textTertiary uppercase tracking-widest font-semibold px-3 mb-2">Main Menu</p>
          <ul className="space-y-1">
            {filteredNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group',
                      isActive
                        ? 'bg-primary/10 text-primary border-l-2 border-primary pl-[10px]'
                        : 'text-textSecondary hover:text-onSurface hover:bg-surface-high',
                    )
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.adminOnly && (
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
                      ADMIN
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info + Logout */}
        <div className="border-t border-borderMd p-3">
          <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-surface-high">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[16px]">person</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-onSurface truncate">{user?.name}</p>
              <p className="text-[10px] text-textTertiary truncate">{user?.email}</p>
            </div>
            <span className={clsx(
              'ml-auto text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0',
              user?.role === 'ADMIN' ? 'text-primary bg-primary/10' : 'text-textSecondary bg-surface-highest'
            )}>
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-all duration-150 group"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
