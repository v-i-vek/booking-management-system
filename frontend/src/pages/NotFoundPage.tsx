import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6" style={{ backgroundColor: '#0b1326' }}>
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
        <span className="material-symbols-outlined text-[48px]" style={{ color: '#0ea5e9' }}>error_outline</span>
      </div>
      <div className="text-center">
        <h1 className="font-heading text-5xl font-bold" style={{ color: '#0ea5e9' }}>404</h1>
        <h2 className="font-heading text-xl font-semibold mt-2" style={{ color: '#dae2fd' }}>Page Not Found</h2>
        <p className="text-sm mt-2" style={{ color: '#94a3b8' }}>The page you're looking for doesn't exist or has been moved.</p>
      </div>
      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-heading text-sm font-semibold transition-all hover:bg-primary-light"
        style={{ backgroundColor: '#0ea5e9', color: '#fff' }}
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Dashboard
      </Link>
    </div>
  )
}
