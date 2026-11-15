import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

interface HeaderProps {
  onMenuToggle: () => void
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, title = 'Dashboard' }) => {
  const { user } = useAuthStore()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <header
      className="sticky top-0 z-10 w-full h-14 flex items-center justify-between px-4 md:px-6 border-b border-borderMd backdrop-blur-xl"
      style={{ backgroundColor: 'rgba(13, 19, 38, 0.9)' }}
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-textSecondary hover:text-onSurface hover:bg-surface-high transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
        <h1 className="font-heading text-base font-semibold text-onSurface">{title}</h1>
      </div>

      {/* Right: live clock + user chip */}
      <div className="flex items-center gap-3">
        {/* Live clock (desktop) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-high border border-borderMd">
          <span className="material-symbols-outlined text-primary text-[14px]">schedule</span>
          <span className="data-mono text-xs text-textSecondary">{timeStr}</span>
          <span className="text-textTertiary text-xs">|</span>
          <span className="text-xs text-textTertiary">{dateStr}</span>
        </div>

        {/* System status */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-tertiary/10 border border-tertiary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
          <span className="text-[10px] font-semibold text-tertiary uppercase tracking-wider">System Online</span>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-high border border-borderMd">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[13px]">person</span>
          </div>
          <span className="text-xs font-medium text-onSurface hidden sm:inline">{user?.name?.split(' ')[0]}</span>
        </div>
      </div>
    </header>
  )
}
