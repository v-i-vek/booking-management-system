import React from 'react'
import clsx from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  const sizes = { sm: 'text-[16px]', md: 'text-[24px]', lg: 'text-[36px]' }
  return (
    <span
      className={clsx('material-symbols-outlined animate-spin text-primary', sizes[size], className)}
    >
      sync
    </span>
  )
}

export const PageLoader: React.FC = () => (
  <div className="flex-1 flex items-center justify-center min-h-screen bg-surface">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-surface-high flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-[28px] animate-spin">sync</span>
      </div>
      <p className="text-textSecondary text-sm font-body">Loading...</p>
    </div>
  </div>
)
