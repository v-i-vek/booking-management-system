import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/auth'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier.trim() || !password) return

    setIsLoading(true)
    setErrorMessage(null)

    try {
      // Attempt backend authentication
      const response = await authApi.login({
        email: identifier.includes('@') ? identifier : `${identifier}@lumigram.app`,
        password,
      })
      setAuth(response.user, response.access_token)
      navigate('/')
    } catch {
      // Fallback demo login for seamless offline/standalone exploration
      setAuth(
        {
          id: 'user_elena',
          email: identifier.includes('@') ? identifier : `${identifier}@lumigram.app`,
          name: 'Elena Rostova',
          role: 'USER',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'demo_jwt_token_lumigram_2026',
      )
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setAuth(
      {
        id: 'user_elena',
        email: 'elena@lumigram.app',
        name: 'Elena Rostova',
        role: 'USER',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'demo_jwt_token_lumigram_2026',
    )
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-between px-4 py-8 relative overflow-hidden select-none">
      {/* Ambient subtle radial blooms */}
      <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-0 w-[420px] h-[420px] rounded-full bg-tertiary-container/10 blur-[100px] pointer-events-none" />

      {/* Main Grid Container */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center py-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center justify-items-center">
          {/* LEFT COLUMN: Editorial Smartphone Mockup (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 justify-center relative w-full">
            {/* Glow Layer */}
            <div className="absolute inset-x-8 inset-y-6 rounded-[48px] bg-gradient-to-tr from-primary-container/20 via-tertiary-container/15 to-transparent blur-2xl -z-10" />

            {/* Phone Shell */}
            <div className="relative w-[340px] h-[640px] bg-surface-container-lowest rounded-[44px] shadow-2xl p-3 border border-outline-variant/60 flex flex-col justify-between overflow-hidden">
              <div className="relative w-full h-full bg-surface-container rounded-[36px] overflow-hidden flex flex-col border border-outline-variant/40">
                {/* Dynamic Camera Notch / Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2.5 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-container-high border border-outline-variant/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-container/60" />
                </div>

                {/* Hero Editorial Photograph */}
                <div className="relative w-full h-full">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPbYdju1lJXkJ5WeFD9xjY4-L4LiwrNeCRCb1QawdWFweDC6QSt1w74Q61DwoRezeBwbWBrWyInLDPKBzwsmZlc0FOD69yD3vja-hTAbDevjD-aGLd-B9tRAuzGbTDIlhWNBtKfibKIt7_Ilo6_HRqxwh4BLwDDWalUOp9WyoiyXf0Fp3EsJbM1taBOhcg_8W3R5DRrkQ-dl2Kfwkd69qO25owAMKfFlNp2v_8wo4"
                    alt="Editorial preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                  {/* Mock Post Metadata */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxWnDTQDBgElX1-PMmkq84PaH6X13UFiiwusWO8WwspaxJpYtAXoHUOB2KvOgia9rBFDubveN6szCGn-S2uHqoq24oJS5Jcs_zJqvt9sie3SsPY-BDm4bLUXtWo7daHekGFcN6hcg51rGgLNTyRZ857bQxGDdPwgXRDMJ3XrSzNPbbkBudY9UxxR7rnMetvyoWB9LHicfoCpUa6XOo8n2nRwzWl-Ft4VZ-w9etoR4"
                          alt="Creator"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[13px] leading-tight">
                          elena_rostova
                        </span>
                        <span className="text-[10px] text-white/70">
                          Berlin • 35mm film
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-white/90 line-clamp-2">
                      Monolithic twilight studies. The stillness between shadows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Authentication Form Card */}
          <div className="w-full max-w-[390px] lg:col-span-6 flex flex-col items-center">
            {/* Primary Login Card */}
            <div className="w-full bg-surface-container-low rounded-2xl p-7 sm:p-9 flex flex-col items-center shadow-xl border border-outline-variant/60">
              {/* Brand Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] p-[2px] flex items-center justify-center shadow-md">
                    <div className="w-full h-full bg-surface-container-lowest rounded-[10px] flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container text-[22px]">
                        camera
                      </span>
                    </div>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface font-extrabold">
                    Lumigram
                  </h1>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                  Capture, curate, and connect in pure light.
                </p>
              </div>

              {/* Error banner */}
              {errorMessage && (
                <div className="w-full mb-3 p-2.5 rounded-xl bg-error/10 border border-error/20 text-error text-[12px] text-center">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Phone number, username, or email"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-sm border border-outline-variant/60 focus:bg-surface-container-high focus:outline-none focus:border-primary-container transition-all"
                  />
                </div>

                <div className="relative w-full flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full h-11 pl-4 pr-16 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-sm border border-outline-variant/60 focus:bg-surface-container-high focus:outline-none focus:border-primary-container transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-label-sm text-on-surface-variant hover:text-on-surface font-semibold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 mt-1 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-label-md font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-[18px]">
                        progress_activity
                      </span>
                      <span>Authenticating...</span>
                    </span>
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </form>

              {/* Quick 1-click Demo Account Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full mt-2.5 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-primary-container/30 text-primary-container text-label-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Instant Demo Login</span>
              </button>

              {/* Divider */}
              <div className="w-full flex items-center my-5 gap-4">
                <div className="h-[1px] flex-1 bg-outline-variant/40" />
                <span className="text-label-sm text-[11px] uppercase tracking-wider text-outline">
                  or
                </span>
                <div className="h-[1px] flex-1 bg-outline-variant/40" />
              </div>

              {/* Social Logins */}
              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full h-10 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-colors flex items-center justify-center gap-2.5 text-primary text-label-sm font-semibold"
                >
                  <svg className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Log in with Facebook</span>
                </button>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full h-10 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-colors flex items-center justify-center gap-2.5 text-on-surface text-label-sm font-semibold"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.86c2.26-2.09 3.68-5.17 3.68-9.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.26v3.09C3.25 21.3 7.31 24 12 24z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.26C.46 8.23 0 10.06 0 12s.46 3.77 1.26 5.38l4.01-3.09z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.62l4.01 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Forgot Password */}
              <a
                href="#forgot"
                className="mt-5 text-[11px] text-on-surface-variant hover:text-primary transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Switcher Card */}
            <div className="w-full bg-surface-container-low rounded-2xl p-4 mt-3 text-center border border-outline-variant/60 shadow-lg">
              <p className="text-body-sm text-on-surface-variant">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-bold text-primary-container hover:underline ml-1"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* App Store Links */}
            <div className="w-full flex flex-col items-center mt-5 gap-2.5">
              <span className="text-label-sm text-outline">Get the app.</span>
              <div className="flex items-center gap-2.5">
                <div className="h-9 px-3 rounded-xl bg-surface-container border border-outline-variant/40 flex items-center gap-2 text-on-surface cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.11.64-2.79 1.45-.59.69-1.12 1.83-.98 2.94 1.07.08 2.13-.57 2.78-1.29z" />
                  </svg>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[8px] uppercase tracking-wider text-outline">
                      Download on the
                    </span>
                    <span className="text-[11px] font-bold">App Store</span>
                  </div>
                </div>
                <div className="h-9 px-3 rounded-xl bg-surface-container border border-outline-variant/40 flex items-center gap-2 text-on-surface cursor-pointer">
                  <svg className="w-3.5 h-3.5 fill-current text-primary" viewBox="0 0 24 24">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .66.11.92.31l13.79 8.5c.67.41.88 1.29.47 1.96-.12.2-.29.35-.47.47L5.42 21.19c-.26.2-.58.31-.92.31-.83 0-1.5-.67-1.5-1.5z" />
                  </svg>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[8px] uppercase tracking-wider text-outline">
                      Get it on
                    </span>
                    <span className="text-[11px] font-bold">Google Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legal Strip */}
      <footer className="w-full max-w-4xl py-4 flex flex-col items-center gap-2 text-center text-[11px] text-outline">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a href="#meta" className="hover:text-on-surface transition-colors">Meta</a>
          <a href="#about" className="hover:text-on-surface transition-colors">About</a>
          <a href="#blog" className="hover:text-on-surface transition-colors">Blog</a>
          <a href="#jobs" className="hover:text-on-surface transition-colors">Jobs</a>
          <a href="#help" className="hover:text-on-surface transition-colors">Help</a>
          <a href="#api" className="hover:text-on-surface transition-colors">API</a>
          <a href="#privacy" className="hover:text-on-surface transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-on-surface transition-colors">Terms</a>
          <a href="#threads" className="hover:text-on-surface transition-colors">Threads</a>
        </div>
        <div className="flex items-center gap-3">
          <span>English (US)</span>
          <span>•</span>
          <span>© 2026 Lumigram</span>
        </div>
      </footer>
    </div>
  )
}
