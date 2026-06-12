import axios from 'axios'
import useAuthStore from '@/stores/authStore'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach token on each request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-refresh on 401
let isRefreshing = false
let queue = []

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject })
        }).then(token => {
          original.headers.Authorization = `Bearer ${token}`
          return api(original)
        })
      }
      original._retry = true
      isRefreshing = true
      try {
        const token = await useAuthStore.getState().refreshAccessToken()
        queue.forEach(p => p.resolve(token))
        queue = []
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } catch {
        queue.forEach(p => p.reject(error))
        queue = []
        useAuthStore.getState().logout()
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default api
