import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileBottomBar } from './MobileBottomBar'
import { NotificationsDrawer } from './NotificationsDrawer'
import { CreatePostModal } from '../post/CreatePostModal'

const routeTitles: Record<string, string> = {
  '/': 'Lumigram',
  '/explore': 'Explore & Discover',
  '/reels': 'Reels',
  '/messages': 'Direct Messages',
  '/profile': 'Profile',
}

export const AppLayout: React.FC = () => {
  const location = useLocation()
  const title = routeTitles[location.pathname] || 'Lumigram'

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary-container/30">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-[72px] lg:pl-[240px] flex flex-col min-w-0 transition-all">
        {/* Top Header */}
        <Header title={title} />

        {/* Page Viewport */}
        <main className="w-full pt-16 pb-16 md:pb-6 min-h-[calc(100vh-4rem)] flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar />

      {/* Modals & Overlays */}
      <NotificationsDrawer />
      <CreatePostModal />
    </div>
  )
}
