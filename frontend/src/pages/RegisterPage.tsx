import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authApi } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/Toast'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type FormValues = z.infer<typeof schema>

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const { toasts, toast, removeToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const res = await authApi.register({ name: data.name, email: data.email, password: data.password })
      setAuth(res.user, res.access_token)
      toast.success(`Welcome, ${res.user.name}! Account created.`)
      setTimeout(() => navigate('/dashboard'), 600)
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed. Try again.'
      toast.error(typeof msg === 'string' ? msg : Array.isArray(msg) ? msg[0] : 'Registration error')
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = (hasError: boolean) => ({
    backgroundColor: '#0b1326',
    border: `1px solid ${hasError ? '#ef4444' : 'rgba(148,163,184,0.2)'}`,
    color: '#dae2fd',
    outline: 'none',
  })

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#0ea5e9'
    e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.4)'
  }
  const blurStyle = (hasError: boolean) => (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = hasError ? '#ef4444' : 'rgba(148,163,184,0.2)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0b1326' }}>
      {/* Header */}
      <header className="w-full h-14 flex items-center justify-between px-4 md:px-6 border-b" style={{ backgroundColor: 'rgba(13,19,38,0.95)', borderColor: 'rgba(148,163,184,0.1)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#222a3d' }}>
            <span className="material-symbols-outlined text-[20px]" style={{ color: '#0ea5e9', fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          </div>
          <span className="font-heading text-sm font-semibold" style={{ color: '#dae2fd' }}>Booking Management</span>
        </div>
        <Link to="/login" className="text-sm font-medium flex items-center gap-1 transition-colors hover:text-primary" style={{ color: '#0ea5e9' }}>
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Login
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute -top-32 -left-28 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }} />

        <div className="w-full max-w-[480px] relative z-10">
          <div className="rounded-xl shadow-2xl flex flex-col gap-5 p-5 sm:p-6" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#222a3d' }}>
                <span className="material-symbols-outlined text-[22px]" style={{ color: '#0ea5e9', fontVariationSettings: "'FILL' 1" }}>person_add</span>
              </div>
              <div>
                <p className="font-heading text-base font-semibold" style={{ color: '#dae2fd' }}>Create Account</p>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Register for the Booking Management System</p>
              </div>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Full Name</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>person</span>
                  <input {...register('name')} type="text" placeholder="John Doe" className="w-full h-10 pl-9 pr-3 rounded text-sm"
                    style={inputStyle(!!errors.name)} onFocus={focusStyle} onBlur={blurStyle(!!errors.name)} />
                </div>
                {errors.name && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>email</span>
                  <input {...register('email')} type="email" placeholder="you@example.com" className="w-full h-10 pl-9 pr-3 rounded text-sm"
                    style={inputStyle(!!errors.email)} onFocus={focusStyle} onBlur={blurStyle(!!errors.email)} />
                </div>
                {errors.email && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>key</span>
                  <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Min 6 characters"
                    className="w-full h-10 pl-9 pr-10 rounded text-sm" style={inputStyle(!!errors.password)}
                    onFocus={focusStyle} onBlur={blurStyle(!!errors.password)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3" style={{ color: '#64748b' }}>
                    <span className="material-symbols-outlined text-[17px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {errors.password && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Confirm Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>lock</span>
                  <input {...register('confirmPassword')} type={showPassword ? 'text' : 'password'} placeholder="Re-enter your password"
                    className="w-full h-10 pl-9 pr-3 rounded text-sm" style={inputStyle(!!errors.confirmPassword)}
                    onFocus={focusStyle} onBlur={blurStyle(!!errors.confirmPassword)} />
                </div>
                {errors.confirmPassword && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded flex items-center justify-center gap-2 font-heading text-base font-semibold transition-all duration-150 active:scale-[0.99] disabled:opacity-60 mt-1"
                style={{ backgroundColor: '#0ea5e9', color: '#fff' }}
              >
                {isLoading ? (
                  <><span className="material-symbols-outlined text-[20px] animate-spin">sync</span><span>Creating Account...</span></>
                ) : (
                  <><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span><span>Create Account</span></>
                )}
              </button>
            </form>

            {/* Login link */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-sm" style={{ color: '#94a3b8' }}>Already have an account?</span>
              <Link to="/login" className="text-sm font-semibold flex items-center gap-0.5 transition-colors" style={{ color: '#0ea5e9' }}>
                Sign In <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-3 border-t" style={{ backgroundColor: 'rgba(6,14,32,0.8)', borderColor: 'rgba(148,163,184,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center text-[11px]" style={{ color: '#94a3b8' }}>
          Booking Management System &copy; {new Date().getFullYear()}
        </div>
      </footer>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
