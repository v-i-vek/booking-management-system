import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSocialStore } from '../../store/socialStore'

export const MobileBottomBar: React.FC = () => {
  const location = useLocation()
  const { currentUser, setCreatePostOpen } = useSocialStore()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant z-40 flex items-center justify-around px-2">
      <NavLink
        to="/"
        className={`p-2 transition-colors ${
          location.pathname === '/' ? 'text-on-surface' : 'text-on-surface-variant'
        }`}
        aria-label="Home"
      >
        <span
          className={`material-symbols-outlined text-[26px] ${
            location.pathname === '/' ? 'fill-1' : ''
          }`}
        >
          home
        </span>
      </NavLink>

      <NavLink
        to="/explore"
        className={`p-2 transition-colors ${
          location.pathname === '/explore' ? 'text-on-surface' : 'text-on-surface-variant'
        }`}
        aria-label="Explore"
      >
        <span
          className={`material-symbols-outlined text-[26px] ${
            location.pathname === '/explore' ? 'fill-1' : ''
          }`}
        >
          explore
        </span>
      </NavLink>

      <button
        type="button"
        onClick={() => setCreatePostOpen(true)}
        className="p-2 text-on-surface-variant hover:text-on-surface"
        aria-label="Create Post"
      >
        <div className="w-7 h-7 rounded-lg border-2 border-current flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">add</span>
        </div>
      </button>

      <NavLink
        to="/reels"
        className={`p-2 transition-colors ${
          location.pathname === '/reels' ? 'text-on-surface' : 'text-on-surface-variant'
        }`}
        aria-label="Reels"
      >
        <span
          className={`material-symbols-outlined text-[26px] ${
            location.pathname === '/reels' ? 'fill-1' : ''
          }`}
        >
          movie
        </span>
      </NavLink>

      <NavLink
        to="/profile"
        className="p-2"
        aria-label="Profile"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className={`w-7 h-7 rounded-full object-cover ring-2 ${
            location.pathname === '/profile'
              ? 'ring-on-surface'
              : 'ring-outline-variant'
          }`}
        />
      </NavLink>
    </nav>
  )
}
