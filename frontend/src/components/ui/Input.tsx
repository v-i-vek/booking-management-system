import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
  rightIcon?: React.ReactNode
  hint?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  hint,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 text-textTertiary text-[18px] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={clsx(
            'w-full h-10 bg-surface rounded text-onSurface text-sm placeholder:text-textTertiary',
            'border border-borderMd focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
            'transition-all duration-150 shadow-inner',
            icon ? 'pl-9' : 'pl-3',
            rightIcon ? 'pr-10' : 'pr-3',
            error && 'border-danger focus:border-danger focus:ring-danger',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-danger flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">error</span>{error}</p>}
      {hint && !error && <p className="text-xs text-textTertiary">{hint}</p>}
    </div>
  )
}
