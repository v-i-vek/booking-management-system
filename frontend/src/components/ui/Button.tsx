import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center gap-2 font-heading font-semibold rounded transition-all duration-150 active:scale-[0.98] select-none'

  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white shadow-glow-primary-sm hover:shadow-glow-primary disabled:opacity-50',
    secondary: 'bg-surface-high hover:bg-surface-highest text-onSurface border border-borderMd disabled:opacity-50',
    ghost: 'bg-transparent hover:bg-white/5 text-textSecondary hover:text-onSurface disabled:opacity-50',
    danger: 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/30 disabled:opacity-50',
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
  }

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}
