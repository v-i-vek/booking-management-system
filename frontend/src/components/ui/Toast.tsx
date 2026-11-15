import React from 'react'
import type { ToastMessage } from '../../types'
import clsx from 'clsx'

interface ToastProps {
  toasts: ToastMessage[]
  removeToast: (id: string) => void
}

const toastStyles: Record<string, string> = {
  success: 'border-tertiary/30 text-tertiary',
  error: 'border-danger/30 text-danger',
  info: 'border-primary/30 text-primary',
  warning: 'border-warning/30 text-warning',
}

const toastIcons: Record<string, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
  warning: 'warning',
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-xl shadow-2xl',
            toastStyles[toast.type] || toastStyles.info,
          )}
          style={{ backgroundColor: '#222a3d' }}
        >
          <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            {toast.icon || toastIcons[toast.type]}
          </span>
          <span className="text-sm flex-1" style={{ color: '#dae2fd' }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="transition-colors shrink-0"
            style={{ color: '#94a3b8' }}
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
