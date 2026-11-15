import React from 'react'
import clsx from 'clsx'

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'admin' | 'user'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  dot?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-tertiary/10 text-tertiary border-tertiary/30',
  error: 'bg-danger/10 text-danger border-danger/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  info: 'bg-primary/10 text-primary border-primary/30',
  neutral: 'bg-surface-highest text-textSecondary border-borderMd',
  admin: 'bg-primary/10 text-primary border-primary/30',
  user: 'bg-surface-highest text-textSecondary border-borderMd',
}

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-tertiary',
  error: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-primary',
  neutral: 'bg-textTertiary',
  admin: 'bg-primary',
  user: 'bg-textTertiary',
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, dot = false, className }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider',
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  )
}
