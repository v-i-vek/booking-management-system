import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSocialStore } from '../../store/socialStore'

interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title = 'Lumigram' }) => {
  const navigate = useNavigate()
  const { currentUser, setCreatePostOpen, setNotificationsOpen, notifications } =
    useSocialStore()
  const unreadNotifs = notifications.filter((n) => !n.isRead).length

  return (
    <header className="fixed top-0 left-0 md:left-[72px] lg:left-[240px] right-0 h-16 bg-surface/85 backdrop-blur-xl border-b border-outline-variant z-40 flex items-center justify-between px-4 lg:px-space-xl transition-all">
      {/* Mobile brand & page title */}
      <div className="flex items-center gap-3">
        <NavLink to="/" className="md:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center p-[1.5px]">
            <div className="w-full h-full bg-surface-container-lowest rounded-[6px] flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-primary-container">
                camera
              </span>
            </div>
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
            Lumigram
          </span>
        </NavLink>

        <span className="hidden md:inline font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
          {title}
        </span>
      </div>

      {/* Center / Right navigation shortcuts */}
      <div className="flex items-center gap-3 sm:gap-space-md">
        <nav className="hidden sm:flex items-center gap-space-lg text-body-md font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-on-surface font-semibold border-b-2 border-primary-container pb-1'
                : 'text-on-surface-variant hover:text-on-surface transition-colors pb-1'
            }
          >
            Feed
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? 'text-on-surface font-semibold border-b-2 border-primary-container pb-1'
                : 'text-on-surface-variant hover:text-on-surface transition-colors pb-1'
            }
          >
            Trending
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive
                ? 'text-on-surface font-semibold border-b-2 border-primary-container pb-1'
                : 'text-on-surface-variant hover:text-on-surface transition-colors pb-1'
            }
          >
            Direct
          </NavLink>
        </nav>

        {/* Action icons on mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setCreatePostOpen(true)}
            className="p-1.5 text-on-surface-variant hover:text-on-surface"
            aria-label="Create post"
          >
            <span className="material-symbols-outlined text-[24px]">add_box</span>
          </button>
          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            className="relative p-1.5 text-on-surface-variant hover:text-on-surface"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[24px]">favorite</span>
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FD1D1D] rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/messages')}
            className="p-1.5 text-on-surface-variant hover:text-on-surface"
            aria-label="Messages"
          >
            <span className="material-symbols-outlined text-[24px]">send</span>
          </button>
        </div>

        <div className="hidden sm:block h-5 w-[1px] bg-outline-variant mx-1" />

        <NavLink
          to="/profile"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-outline-variant hover:ring-primary-container transition-all"
          />
        </NavLink>
      </div>
    </header>
  )
}
