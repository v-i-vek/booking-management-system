import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { AppLayout } from './components/layout/AppLayout'
import { AdminRoute } from './router/AdminRoute'
import { FeedPage } from './pages/FeedPage'
import { ExplorePage } from './pages/ExplorePage'
import { ReelsPage } from './pages/ReelsPage'
import { MessagesPage } from './pages/MessagesPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { UsersPage } from './pages/UsersPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Dedicated Logout component for /logout route
const LogoutRoute: React.FC = () => {
  const { logout } = useAuthStore()
  useEffect(() => {
    logout()
  }, [logout])
  return <Navigate to="/login" replace />
}

function App() {
  const { hydrate } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutRoute />} />

        {/* Social App Experience (wrapped in Lumigram AppLayout) */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Legacy redirects & Admin route */}
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
