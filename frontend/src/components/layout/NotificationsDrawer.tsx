import React from 'react'
import { useSocialStore } from '../../store/socialStore'

export const NotificationsDrawer: React.FC = () => {
  const { isNotificationsOpen, setNotificationsOpen, notifications } = useSocialStore()

  if (!isNotificationsOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setNotificationsOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-[400px] h-full bg-surface-container-low border-r border-outline-variant shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between p-4 border-b border-outline-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary-container">
              favorite
            </span>
            <h2 className="font-headline-md text-headline-sm font-bold text-on-surface">
              Notifications
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setNotificationsOpen(false)}
            className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/40">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-on-surface-variant gap-2">
              <span className="material-symbols-outlined text-4xl">notifications_off</span>
              <p className="text-body-md">No new notifications</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-4 hover:bg-surface-container transition-colors ${
                  !item.isRead ? 'bg-surface-container/50' : ''
                }`}
              >
                <img
                  src={item.user.avatar}
                  alt={item.user.username}
                  className="w-11 h-11 rounded-full object-cover ring-1 ring-outline-variant shrink-0"
                />
                <div className="flex-1 min-w-0 text-body-sm">
                  <p className="text-on-surface leading-snug">
                    <span className="font-semibold">{item.user.username}</span>{' '}
                    <span className="text-on-surface-variant">{item.content}</span>
                  </p>
                  <span className="text-[11px] text-outline font-medium">
                    {item.createdAt}
                  </span>
                </div>
                {item.targetMedia && (
                  <img
                    src={item.targetMedia}
                    alt="Post preview"
                    className="w-11 h-11 rounded-md object-cover ring-1 ring-outline-variant shrink-0"
                  />
                )}
                {item.type === 'follow' && (
                  <button
                    type="button"
                    className="px-3 py-1 bg-primary-container hover:bg-primary-container/90 text-white rounded-full text-label-sm font-semibold shrink-0"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
