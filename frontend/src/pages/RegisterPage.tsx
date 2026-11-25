import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/auth'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Password Strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0
    let score = 0
    if (pwd.length >= 6) score++
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd) || pwd.length >= 10) score++
    return score // 1 = Weak, 2 = Medium, 3 = Strong
  }

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.trim() || !password || !fullName.trim() || !username.trim()) return

    setIsLoading(true)
    setErrorMessage(null)

    const email = contact.includes('@') ? contact : `${username}@lumigram.app`

    try {
      // Register via backend
      await authApi.register({
        email,
        password,
        name: fullName,
      })
      // Automatically log in
      const res = await authApi.login({ email, password })
      setAuth(res.user, res.access_token)
      navigate('/')
    } catch {
      // Fallback demo signup
      setAuth(
        {
          id: `user_${Date.now()}`,
          email,
          name: fullName,
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

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-between px-4 py-8 relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full bg-tertiary-container/15 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-6 w-80 h-80 rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center py-6">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-14">
          {/* LEFT COLUMN: Layered Editorial Phones (Desktop only) */}
          <div className="hidden lg:flex flex-1 relative w-full max-w-[440px] h-[640px] items-center justify-center">
            {/* Background Offset Phone Card */}
            <div className="absolute w-[270px] h-[540px] rounded-[44px] bg-surface-container-lowest p-2.5 shadow-2xl -rotate-6 -translate-x-10 translate-y-3 opacity-60 border border-outline-variant/40">
              <div className="w-full h-full rounded-[36px] overflow-hidden bg-surface-container-high relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsay4t-LbMzdbGsYWl_6YWo6Du7WrZivK5kXn9GROJ872IcTZQvHY03RZkkS9H_Nc9kvwjPHH02BWVBpTSdNo0KzCkZR1xvTk5GJtppYSig4n9n_LM3LfLm-Zn0FLeLj3zRuI52u4HhAXj983hBQk3g0Qhqe8U5PPsprlahRSO3RGP8dARX44TUVsO8WIEY3Bp57msnYr3TIsH8HHppRVNLb9uB59-a2NDo1ilm9U"
                  alt="Photography preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Foreground Hero Phone */}
            <div className="relative w-[290px] h-[580px] rounded-[44px] bg-surface-container-lowest p-2.5 shadow-2xl border border-outline-variant/60 rotate-2 translate-x-4">
              <div className="w-full h-full rounded-[36px] overflow-hidden bg-surface-container-high relative flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20" />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXYZzdGO7iclg4_wwiq4VNa9CIeVeZdbydG5FInSGLCHUfjgwcF2YDfd8zXxnc_HGNg6AP5wJvSXagFs3Vi-Zz25R3UdYq5dOwyAXdAHQVt8faZeXRctEtcJSoTHc2z3DIjde2FjtcKdYOuu5FEhHmFHgWyCWDAb9j1ImvgS-ItmgZ1Yy2UUGkpb2YDpSOoWzKs5QyUaZ5D8fV63X9RKLq7cHYvhq3tjgwE6BTVvA"
                  alt="Main preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px]">
                  <span className="font-bold">studio_nord</span>
                  <p className="text-white/80 line-clamp-1">
                    Ceramic tactile studies: Autumn edition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sign Up Form Card */}
          <div className="w-full max-w-[390px] flex flex-col items-center">
            {/* Primary Registration Card */}
            <div className="w-full bg-surface-container-low rounded-2xl p-7 sm:p-9 flex flex-col items-center shadow-xl border border-outline-variant/60">
              {/* Brand Header */}
              <div className="flex flex-col items-center mb-5 text-center">
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
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium leading-snug max-w-[260px]">
                  Sign up to see photos and videos from your friends.
                </p>
              </div>

              {/* Facebook Quick Login */}
              <button
                type="button"
                className="w-full py-2.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-white font-label-md font-bold transition-all shadow-md flex items-center justify-center gap-2 mb-4"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Log in with Facebook</span>
              </button>

              {/* Divider */}
              <div className="w-full flex items-center mb-4 gap-4">
                <div className="h-[1px] flex-1 bg-outline-variant/40" />
                <span className="text-[11px] uppercase tracking-wider text-outline font-bold">
                  or
                </span>
                <div className="h-[1px] flex-1 bg-outline-variant/40" />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="w-full mb-3 p-2.5 rounded-xl bg-error/10 border border-error/20 text-error text-[12px] text-center">
                  {errorMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5">
                {/* Contact */}
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Mobile number or email"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-sm border border-outline-variant/60 focus:bg-surface-container-high focus:outline-none focus:border-primary-container transition-all"
                />

                {/* Password with Strength Meter */}
                <div className="flex flex-col gap-1">
                  <div className="relative w-full flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className="w-full h-11 pl-4 pr-14 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-sm border border-outline-variant/60 focus:bg-surface-container-high focus:outline-none focus:border-primary-container transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-label-sm text-on-surface-variant hover:text-on-surface font-semibold"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {/* Realtime Strength Bars */}
                  {password && (
                    <div className="flex items-center gap-1.5 px-1 pt-1">
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          strength >= 1 ? 'bg-[#FD1D1D]' : 'bg-surface-container-highest'
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          strength >= 2 ? 'bg-[#f59e0b]' : 'bg-surface-container-highest'
                        }`}
                      />
                      <div
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          strength >= 3 ? 'bg-[#10b981]' : 'bg-surface-container-highest'
                        }`}
                      />
                      <span className="text-[10px] text-outline ml-1 font-semibold">
                        {strength === 1 ? 'Weak' : strength === 2 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Full Name */}
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-sm border border-outline-variant/60 focus:bg-surface-container-high focus:outline-none focus:border-primary-container transition-all"
                />

                {/* Username with Availability Indicator */}
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ''))
                    }
                    placeholder="Username"
                    required
                    className="w-full h-11 pl-4 pr-10 rounded-xl bg-surface-container text-on-surface placeholder:text-outline text-body-sm border border-outline-variant/60 focus:bg-surface-container-high focus:outline-none focus:border-primary-container transition-all"
                  />
                  {username.length >= 3 && (
                    <span className="absolute right-3 material-symbols-outlined text-primary-container text-[20px] fill-1">
                      check_circle
                    </span>
                  )}
                </div>

                {/* Policy Disclaimers */}
                <p className="text-[11px] text-on-surface-variant/75 text-center leading-normal px-1 mt-1">
                  People who use our service may have uploaded your contact info to
                  Lumigram.{' '}
                  <a href="#learn" className="text-primary hover:underline">
                    Learn More
                  </a>
                </p>

                <p className="text-[11px] text-on-surface-variant/75 text-center leading-normal px-1">
                  By signing up, you agree to our{' '}
                  <a href="#terms" className="text-primary hover:underline">
                    Terms
                  </a>
                  ,{' '}
                  <a href="#privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#cookies" className="text-primary hover:underline">
                    Cookies Policy
                  </a>
                  .
                </p>

                {/* Sign up Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 rounded-full bg-primary-container hover:bg-primary-container/90 text-white font-label-md font-bold tracking-wide transition-all shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-[18px]">
                        progress_activity
                      </span>
                      <span>Creating Account...</span>
                    </span>
                  ) : (
                    <span>Sign up</span>
                  )}
                </button>
              </form>
            </div>

            {/* Switcher Card */}
            <div className="w-full bg-surface-container-low rounded-2xl p-4 mt-3 text-center border border-outline-variant/60 shadow-lg">
              <p className="text-body-sm text-on-surface-variant">
                Have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-primary-container hover:underline ml-1"
                >
                  Log in
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
