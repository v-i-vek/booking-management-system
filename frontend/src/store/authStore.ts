import { create } from 'zustand'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  updateUser: (user: User) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem('bms_token', token)
    localStorage.setItem('bms_user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },

  updateUser: (user) => {
    localStorage.setItem('bms_user', JSON.stringify(user))
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('bms_token')
    localStorage.removeItem('bms_user')
    set({ user: null, token: null, isAuthenticated: false })
  },

  hydrate: () => {
    const token = localStorage.getItem('bms_token')
    const userStr = localStorage.getItem('bms_user')
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User
        set({ user, token, isAuthenticated: true })
      } catch {
        localStorage.removeItem('bms_token')
        localStorage.removeItem('bms_user')
      }
    }
  },
}))
