import { useState, useCallback } from 'react'
import type { ToastMessage, ToastType } from '../types'

let toastIdCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((message: string, type: ToastType = 'info', icon?: string) => {
    const id = `toast-${++toastIdCounter}`
    const toast: ToastMessage = { id, message, type, icon }
    setToasts((prev) => [...prev, toast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = {
    success: (msg: string, icon?: string) => addToast(msg, 'success', icon || 'check_circle'),
    error: (msg: string, icon?: string) => addToast(msg, 'error', icon || 'error'),
    info: (msg: string, icon?: string) => addToast(msg, 'info', icon || 'info'),
    warning: (msg: string, icon?: string) => addToast(msg, 'warning', icon || 'warning'),
  }

  return { toasts, toast, removeToast }
}
