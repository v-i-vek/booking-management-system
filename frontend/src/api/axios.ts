import axios from 'axios'

// In production, uses VITE_API_URL if configured, otherwise falls back to '/api/v1' (works with dev proxy & reverse proxies)
const baseURL = (import.meta.env.VITE_API_URL as string)?.trim() || '/api/v1'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor: attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bms_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bms_token')
      localStorage.removeItem('bms_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
