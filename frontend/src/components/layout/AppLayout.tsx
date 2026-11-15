import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'User Management',
  '/profile': 'My Profile',
}

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Booking Management'

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#0b1326' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
