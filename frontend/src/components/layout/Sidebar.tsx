import React, { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useSocialStore } from '../../store/socialStore'
import { useAuthStore } from '../../store/authStore'

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    currentUser,
    conversations,
    notifications,
    setCreatePostOpen,
    isNotificationsOpen,
    setNotificationsOpen,
  } = useSocialStore()
  const { logout } = useAuthStore()

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

  const unreadMessagesCount = conversations.reduce(
    (acc, curr) => acc + (curr.unreadCount || 0),
    0,
  )
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Explore', icon: 'explore', path: '/explore' },
    { label: 'Reels', icon: 'movie', path: '/reels' },
    {
      label: 'Messages',
      icon: 'chat_bubble',
      path: '/messages',
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
  ]

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-[72px] lg:w-[240px] bg-surface-container-lowest z-50 flex-col justify-between px-2 lg:px-space-md py-space-lg border-r border-outline-variant transition-all">
      <div className="flex flex-col gap-space-lg">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-space-sm px-2 lg:px-space-xs py-space-xs group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center p-[2px] shadow-sm">
            <div className="w-full h-full bg-surface-container-lowest rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-primary-container">
                camera
              </span>
            </div>
          </div>
          <span className="hidden lg:inline font-headline-md text-headline-md tracking-tight text-on-surface font-extrabold bg-gradient-to-r from-on-surface to-on-surface-variant bg-clip-text">
            Lumigram
          </span>
        </NavLink>

        {/* Primary Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={`relative flex items-center gap-space-md px-3 py-3 rounded-DEFAULT transition-all ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface font-headline-sm shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
                title={item.label}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isActive ? 'fill-1 text-on-surface' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 min-w-[18px] text-[10px] font-bold text-white bg-[#FD1D1D] rounded-full flex items-center justify-center ring-2 ring-surface-container-lowest">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline text-body-lg font-medium">
                  {item.label}
                </span>
              </NavLink>
            )
          })}

          {/* Notifications Button */}
          <button
            type="button"
            onClick={() => setNotificationsOpen(!isNotificationsOpen)}
            className={`relative flex items-center gap-space-md px-3 py-3 rounded-DEFAULT transition-all text-left ${
              isNotificationsOpen
                ? 'bg-surface-container-high text-on-surface font-headline-sm'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            title="Notifications"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isNotificationsOpen ? 'fill-1 text-on-surface' : ''
                }`}
              >
                favorite
              </span>
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FD1D1D] rounded-full ring-2 ring-surface-container-lowest" />
              )}
            </div>
            <span className="hidden lg:inline text-body-lg font-medium">
              Notifications
            </span>
          </button>

          {/* Create Post Button */}
          <button
            type="button"
            onClick={() => setCreatePostOpen(true)}
            className="flex items-center gap-space-md px-3 py-3 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left group"
            title="Create Post"
          >
            <div className="w-6 h-6 rounded-md border-2 border-current flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[18px]">add</span>
            </div>
            <span className="hidden lg:inline text-body-lg font-medium">Create</span>
          </button>

          {/* Profile Link */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-space-md px-3 py-3 rounded-DEFAULT transition-all ${
                isActive
                  ? 'bg-surface-container-high text-on-surface font-headline-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`
            }
            title="Profile"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={`w-6 h-6 rounded-full object-cover ring-2 ${
                location.pathname === '/profile'
                  ? 'ring-on-surface'
                  : 'ring-outline-variant'
              }`}
            />
            <span className="hidden lg:inline text-body-lg font-medium">
              Profile
            </span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="relative flex flex-col gap-1">
        {/* Threads link */}
        <a
          href="https://threads.net"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-space-md px-3 py-2.5 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
          title="Threads"
        >
          <span className="material-symbols-outlined text-[24px]">alternate_email</span>
          <span className="hidden lg:inline text-body-lg font-medium">Threads</span>
        </a>

        {/* More Menu Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`w-full flex items-center gap-space-md px-3 py-2.5 rounded-DEFAULT transition-all ${
              isMoreMenuOpen
                ? 'bg-surface-container-high text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            title="More Options"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
            <span className="hidden lg:inline text-body-lg font-medium">More</span>
          </button>

          {/* Popover Menu */}
          {isMoreMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-60 bg-surface-container-high border border-outline-variant rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1 backdrop-blur-xl">
              <NavLink
                to="/profile"
                onClick={() => setIsMoreMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
                <span>Your Profile</span>
              </NavLink>
              <NavLink
                to="/profile?tab=saved"
                onClick={() => setIsMoreMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                <span>Saved Posts</span>
              </NavLink>
              <div className="h-[1px] bg-outline-variant my-1" />
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-body-md text-error hover:bg-error/10 transition-colors text-left"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
