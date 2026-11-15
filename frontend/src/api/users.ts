import api from './axios'
import type { User, UpdateUserDto } from '../types'

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const res = await api.get<User[]>('/users')
    return res.data
  },

  getById: async (id: string): Promise<User> => {
    const res = await api.get<User>(`/users/${id}`)
    return res.data
  },

  update: async (id: string, dto: UpdateUserDto): Promise<User> => {
    const res = await api.patch<User>(`/users/${id}`, dto)
    return res.data
  },

  remove: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/users/${id}`)
    return res.data
  },
}
