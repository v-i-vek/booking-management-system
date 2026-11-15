import React, { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { authApi } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/ui/Toast'

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  captcha: z.string().min(1, 'Enter the captcha code'),
})

type FormValues = z.infer<typeof schema>

const CAPTCHA_POOL = ['K7#R9M', '3X9@WV', 'N5$8LQ', '8P%T2B', 'Y4&J6C', 'M2#9KR', 'B6!L3P', 'T1@X5N']

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const { toasts, toast, removeToast } = useToast()

  const [mode, setMode] = useState<'user' | 'staff'>('user')
  const [showPassword, setShowPassword] = useState(false)
  const [captchaIdx, setCaptchaIdx] = useState(0)
  const [captchaSpinning, setCaptchaSpinning] = useState(false)
  const [trustDevice, setTrustDevice] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const currentCaptcha = CAPTCHA_POOL[captchaIdx]

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const refreshCaptcha = useCallback(() => {
    setCaptchaSpinning(true)
    setTimeout(() => {
      setCaptchaIdx((i) => (i + 1) % CAPTCHA_POOL.length)
      setCaptchaSpinning(false)
      toast.info('Captcha refreshed')
    }, 300)
  }, [toast])

  const speakCaptcha = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const chars = currentCaptcha.split('').join(' ')
      const utt = new SpeechSynthesisUtterance('Security code: ' + chars)
      utt.rate = 0.85
      window.speechSynthesis.speak(utt)
      toast.info('Reading captcha aloud...')
    } else {
      toast.error('Audio not supported on this browser')
    }
  }, [currentCaptcha, toast])

  const onSubmit = async (data: FormValues) => {
    if (data.captcha.toUpperCase() !== currentCaptcha) {
      setError('captcha', { message: 'Captcha does not match. Please try again.' })
      toast.error('Captcha verification failed')
      refreshCaptcha()
      return
    }

    setIsLoading(true)
    try {
      const res = await authApi.login({ email: data.email, password: data.password })
      setAuth(res.user, res.access_token)
      toast.success(`Welcome back, ${res.user.name}!`)
      setTimeout(() => navigate('/dashboard'), 500)
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.'
      toast.error(typeof msg === 'string' ? msg : msg[0])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0b1326' }}>
      {/* Top Header */}
      <header
        className="w-full h-14 flex items-center justify-between px-4 md:px-6 border-b"
        style={{ backgroundColor: 'rgba(13, 19, 38, 0.95)', borderColor: 'rgba(148,163,184,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#222a3d' }}>
              <span className="material-symbols-outlined text-[20px]" style={{ color: '#0ea5e9', fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
            </div>
            <div>
              <p className="font-heading text-sm font-semibold leading-tight" style={{ color: '#dae2fd' }}>
                BookingMS{' '}
                <span className="text-[9px] font-bold uppercase tracking-wider px-1 py-0.5 rounded ml-1" style={{ color: '#0ea5e9', backgroundColor: '#222a3d' }}>
                  PRS v1.0
                </span>
              </p>
              <p className="text-[10px]" style={{ color: '#94a3b8' }}>Booking Management Gateway</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded ml-4" style={{ backgroundColor: '#171f33' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
            <span className="data-mono text-xs" style={{ color: '#10b981' }}>API Gateway v1.0 Connected</span>
            <span style={{ color: '#94a3b8' }} className="text-xs mx-1">•</span>
            <span className="material-symbols-outlined text-[13px]" style={{ color: '#94a3b8' }}>lock</span>
            <span className="data-mono text-[11px]" style={{ color: '#94a3b8' }}>TLS 1.3</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: '#0b1326' }}>
            <span className="material-symbols-outlined text-[14px]" style={{ color: '#0ea5e9' }}>support_agent</span>
            <span className="text-xs" style={{ color: '#94a3b8' }}>Support:</span>
            <span className="data-mono text-xs" style={{ color: '#dae2fd' }}>helpdesk@booking.io</span>
          </div>
          <div className="flex items-center rounded p-0.5" style={{ backgroundColor: '#222a3d' }}>
            <button className="px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: '#0ea5e9', color: '#0b1326' }}>EN</button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute -top-32 -left-28 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-28 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

        <div className="w-full max-w-[520px] relative z-10">
          {/* Login Card */}
          <div className="rounded-xl shadow-2xl flex flex-col gap-5 p-5 sm:p-6" style={{ backgroundColor: '#131b2e', border: '1px solid rgba(148,163,184,0.1)' }}>

            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#222a3d' }}>
                  <span className="material-symbols-outlined text-[26px]" style={{ color: '#0ea5e9', fontVariationSettings: "'FILL' 1" }}>lock_person</span>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                    <span className="material-symbols-outlined text-[9px]" style={{ color: '#fff' }}>verified</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-semibold" style={{ color: '#dae2fd' }}>Booking Management</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: '#0ea5e9', backgroundColor: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)' }}>v1.0</span>
                  </div>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>Unified Auth & Operations Gateway</p>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end shrink-0">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#10b981' }}>API Online</span>
                </div>
                <span className="data-mono text-[10px] mt-0.5" style={{ color: '#64748b' }}>LATENCY: &lt;30ms</span>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="grid grid-cols-2 p-1 gap-1 rounded-lg" style={{ backgroundColor: '#0b1326' }}>
              <button
                type="button"
                onClick={() => setMode('user')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-semibold transition-all duration-150"
                style={mode === 'user'
                  ? { backgroundColor: '#222a3d', color: '#0ea5e9', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }
                  : { color: '#94a3b8' }
                }
              >
                <span className="material-symbols-outlined text-[17px]">person</span>
                <span>User Login</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('staff')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded text-sm font-semibold transition-all duration-150"
                style={mode === 'staff'
                  ? { backgroundColor: '#222a3d', color: '#0ea5e9', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }
                  : { color: '#94a3b8' }
                }
              >
                <span className="material-symbols-outlined text-[17px]">badge</span>
                <span>Admin / Staff SSO</span>
              </button>
            </div>

            {/* Staff banner */}
            {mode === 'staff' && (
              <div className="flex flex-col gap-1 p-3 rounded" style={{ backgroundColor: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.15)' }}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#93ccff' }}>
                    <span className="material-symbols-outlined text-[13px]">shield_person</span>
                    Admin SSO Channel
                  </span>
                  <span className="data-mono text-[9px]" style={{ color: '#64748b' }}>ADMIN-ONLY</span>
                </div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Use admin@booking.com for administrative access.</p>
              </div>
            )}

            {/* Login Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Email field */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>
                    {mode === 'user' ? 'Email / Username' : 'Admin Email / Service ID'}
                  </label>
                  <span className="data-mono text-[10px]" style={{ color: '#64748b' }}>JWT-AUTH</span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>account_circle</span>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder={mode === 'user' ? 'user@booking.com' : 'admin@booking.com'}
                    className="w-full h-10 pl-9 pr-3 rounded text-sm transition-all duration-150"
                    style={{
                      backgroundColor: '#0b1326',
                      border: `1px solid ${errors.email ? '#ef4444' : 'rgba(148,163,184,0.2)'}`,
                      color: '#dae2fd',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.4)' }}
                    onBlur={(e) => { e.target.style.borderColor = errors.email ? '#ef4444' : 'rgba(148,163,184,0.2)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                {errors.email && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.email.message}</p>}
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Password</label>
                  <Link to="/register" className="text-xs transition-colors" style={{ color: '#0ea5e9' }}>Create Account</Link>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>key</span>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full h-10 pl-9 pr-10 rounded text-sm transition-all duration-150"
                    style={{
                      backgroundColor: '#0b1326',
                      border: `1px solid ${errors.password ? '#ef4444' : 'rgba(148,163,184,0.2)'}`,
                      color: '#dae2fd',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.4)' }}
                    onBlur={(e) => { e.target.style.borderColor = errors.password ? '#ef4444' : 'rgba(148,163,184,0.2)'; e.target.style.boxShadow = 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3"
                    style={{ color: '#64748b' }}
                  >
                    <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {errors.password && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.password.message}</p>}
              </div>

              {/* Captcha */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#94a3b8' }}>Security Captcha</label>
                  <span className="data-mono text-[10px]" style={{ color: '#64748b' }}>CASE-INSENSITIVE</span>
                </div>
                <div className="flex items-stretch gap-2">
                  {/* Captcha display */}
                  <div
                    className="flex-1 flex items-center justify-center rounded px-4 py-2 select-none font-mono font-bold text-lg tracking-[0.3em]"
                    style={{
                      backgroundColor: '#0b1326',
                      border: '1px solid rgba(148,163,184,0.2)',
                      color: '#0ea5e9',
                      letterSpacing: '0.3em',
                      userSelect: 'none',
                      textDecoration: captchaSpinning ? 'none' : 'line-through rgba(14,165,233,0.3)',
                      opacity: captchaSpinning ? 0.4 : 1,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    {currentCaptcha}
                  </div>
                  {/* Refresh */}
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="w-10 flex items-center justify-center rounded transition-colors"
                    style={{ backgroundColor: '#171f33', border: '1px solid rgba(148,163,184,0.2)', color: '#94a3b8' }}
                    title="Refresh captcha"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${captchaSpinning ? 'animate-spin' : ''}`}>refresh</span>
                  </button>
                  {/* Audio */}
                  <button
                    type="button"
                    onClick={speakCaptcha}
                    className="w-10 flex items-center justify-center rounded transition-colors"
                    style={{ backgroundColor: '#171f33', border: '1px solid rgba(148,163,184,0.2)', color: '#94a3b8' }}
                    title="Read captcha aloud"
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  </button>
                </div>
                {/* Captcha input */}
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[17px] pointer-events-none" style={{ color: '#64748b' }}>pin</span>
                  <input
                    {...register('captcha')}
                    type="text"
                    placeholder="Enter captcha above"
                    maxLength={6}
                    className="w-full h-10 pl-9 pr-3 rounded text-sm font-mono tracking-widest uppercase transition-all duration-150"
                    style={{
                      backgroundColor: '#0b1326',
                      border: `1px solid ${errors.captcha ? '#ef4444' : 'rgba(148,163,184,0.2)'}`,
                      color: '#dae2fd',
                      outline: 'none',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#0ea5e9'; e.target.style.boxShadow = '0 0 0 1px rgba(14,165,233,0.4)' }}
                    onBlur={(e) => { e.target.style.borderColor = errors.captcha ? '#ef4444' : 'rgba(148,163,184,0.2)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                {errors.captcha && <p className="text-xs flex items-center gap-1" style={{ color: '#ef4444' }}><span className="material-symbols-outlined text-[12px]">error</span>{errors.captcha.message}</p>}
              </div>

              {/* Trust device checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  className="relative w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    backgroundColor: trustDevice ? '#0ea5e9' : 'transparent',
                    border: `1.5px solid ${trustDevice ? '#0ea5e9' : 'rgba(148,163,184,0.3)'}`,
                  }}
                  onClick={() => setTrustDevice(!trustDevice)}
                >
                  {trustDevice && <span className="material-symbols-outlined text-[11px]" style={{ color: '#fff' }}>check</span>}
                </div>
                <span className="text-xs" style={{ color: '#94a3b8' }}>Trust this device for 8 hrs</span>
              </label>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 flex items-center justify-center gap-2 rounded font-heading font-semibold text-sm transition-all duration-150 active:scale-[0.98]"
                style={{
                  background: isLoading ? '#0284c7' : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: '#fff',
                  boxShadow: '0 0 12px rgba(14,165,233,0.3)',
                  opacity: isLoading ? 0.8 : 1,
                }}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    <span>Sign In Securely</span>
                    <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Alternative Access */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(148,163,184,0.12)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#64748b' }}>Alternative Access</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(148,163,184,0.12)' }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="h-9 flex items-center justify-center gap-2 rounded text-xs font-semibold transition-colors"
                style={{ backgroundColor: '#171f33', border: '1px solid rgba(148,163,184,0.15)', color: '#94a3b8' }}
                onClick={() => toast.info('OTP login coming soon')}
              >
                <span className="material-symbols-outlined text-[16px]">sms</span>
                OTP Login
              </button>
              <button
                type="button"
                className="h-9 flex items-center justify-center gap-2 rounded text-xs font-semibold transition-colors"
                style={{ backgroundColor: '#171f33', border: '1px solid rgba(148,163,184,0.15)', color: '#94a3b8' }}
                onClick={() => toast.info('SSO login coming soon')}
              >
                <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                SSO / LDAP
              </button>
            </div>

            {/* Advisory panel */}
            <div className="p-3 rounded flex gap-2.5" style={{ backgroundColor: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.12)' }}>
              <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0" style={{ color: '#0ea5e9' }}>info</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold" style={{ color: '#0ea5e9' }}>Security Advisory</span>
                <span className="text-[11px]" style={{ color: '#94a3b8' }}>Never share your credentials. This system is monitored for unauthorized access. All activity is logged.</span>
              </div>
            </div>

            {/* Register link */}
            <p className="text-center text-xs" style={{ color: '#64748b' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold transition-colors" style={{ color: '#0ea5e9' }}>
                Register here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-[10px]" style={{ color: '#64748b' }}>
              © 2024 Booking Management System · v1.0.0 · All rights reserved
            </p>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
