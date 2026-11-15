import React, { useEffect } from 'react'
import clsx from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={clsx(
          'relative w-full rounded-xl border border-primary/20 shadow-2xl',
          'shadow-[0_8px_32px_rgba(0,0,0,0.6)]',
          sizes[size],
        )}
        style={{ backgroundColor: '#131b2e' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderMd">
          <h2 className="font-heading text-base font-semibold text-onSurface">{title}</h2>
          <button
            onClick={onClose}
            className="text-textSecondary hover:text-onSurface transition-colors p-1 rounded hover:bg-surface-high"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
