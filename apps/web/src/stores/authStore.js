import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/services/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setTokens: (token, refreshToken) => set({ token, refreshToken }),

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          const { data } = await api.post('/auth/login', credentials)
          set({ user: data.user, token: data.token, refreshToken: data.refreshToken, isLoading: false })
          api.defaults.headers.Authorization = `Bearer ${data.token}`
          return data
        } catch (err) {
          set({ isLoading: false })
          throw err
        }
      },

      loginWithGoogle: () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
      },

      signup: async (payload) => {
        set({ isLoading: true })
        try {
          const { data } = await api.post('/auth/signup', payload)
          set({ user: data.user, token: data.token, refreshToken: data.refreshToken, isLoading: false })
          api.defaults.headers.Authorization = `Bearer ${data.token}`
          return data
        } catch (err) {
          set({ isLoading: false })
          throw err
        }
      },

      logout: () => {
        set({ user: null, token: null, refreshToken: null })
        delete api.defaults.headers.Authorization
        window.location.href = '/login'
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) return null
        try {
          const { data } = await api.post('/auth/refresh-token', { refreshToken })
          set({ token: data.token })
          api.defaults.headers.Authorization = `Bearer ${data.token}`
          return data.token
        } catch {
          get().logout()
          return null
        }
      },

      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
      isAuthenticated: () => !!get().token && !!get().user,
      hasRole: (role) => get().user?.roles?.includes(role) ?? false,
      isAdmin: () => get().user?.roles?.some(r => ['admin', 'super_admin'].includes(r)) ?? false,
    }),
    {
      name: 'passwale-auth',
      partialize: (state) => ({ token: state.token, refreshToken: state.refreshToken, user: state.user }),
    }
  )
)

export default useAuthStore
