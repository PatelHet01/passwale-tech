import { Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAuthStore from '@/stores/authStore'
import { useEffect } from 'react'

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated())
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--surface-app)' }}>
      {/* Animated mesh background */}
      <div className="absolute inset-0 mesh-gradient" />
      {/* Animated floating blobs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(29,78,216,0.12)' }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(109,40,217,0.1)' }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-10 right-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(250,204,21,0.05)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Logo */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a href="/" className="flex items-center gap-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          <span style={{ color: 'var(--brand-yellow)' }}>●</span>
          <span style={{ color: 'var(--text-primary)' }}>Passwale</span>
        </a>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[448px] px-4">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
    </div>
  )
}
