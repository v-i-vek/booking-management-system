import api from './axios'
import type { AuthResponse, LoginDto, RegisterDto, User } from '../types'

export const authApi = {
  login: async (dto: LoginDto): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', dto)
    return res.data
  },

  register: async (dto: RegisterDto): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', dto)
    return res.data
  },

  getMe: async (): Promise<User> => {
    const res = await api.get<User>('/auth/me')
    return res.data
  },
}
