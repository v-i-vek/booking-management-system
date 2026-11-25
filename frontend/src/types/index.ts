export interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
  password?: string
  role?: 'USER' | 'ADMIN'
  isActive?: boolean
}

export interface ApiError {
  message: string | string[]
  statusCode: number
  error?: string
}

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  icon?: string
}

export * from './social'

