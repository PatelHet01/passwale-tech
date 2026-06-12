import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Ticket, CreditCard, Wallet, User as UserIcon, LogOut, Compass } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function AppLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Discover', path: '/events', icon: Compass },
    { label: 'My Tickets', path: '/dashboard/tickets', icon: Ticket },
    { label: 'PassCard', path: '/dashboard/card', icon: CreditCard },
    { label: 'Wallet', path: '/dashboard/wallet', icon: Wallet },
    { label: 'Profile', path: '/dashboard/profile', icon: UserIcon },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--surface-app)] text-[var(--text-primary)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--surface-mid)] border-r border-[var(--surface-border)] p-6 space-y-8 shrink-0 transition-colors">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/branding/Yellow.svg" alt="PassWale" className="h-6 logo-dark" />
            <img src="/branding/white.svg" alt="PassWale" className="h-6 logo-light" />
            <span className="text-2xl font-display font-extrabold tracking-tight gradient-text">
              PASSWALE
            </span>
          </Link>
          {user?.passwaleCard?.tier && user?.passwaleCard?.tier !== 'free' && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[var(--brand-blue-light)] text-white shadow-[0_0_10px_var(--shadow-glow)]">
              {user.passwaleCard.tier}
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--brand-blue-light)]/20 text-[var(--brand-blue-light)] border border-[var(--brand-blue-light)]/30'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-[var(--surface-border)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] flex items-center justify-center font-bold text-[var(--text-primary)]">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="truncate w-28">
              <p className="font-semibold text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-[var(--text-secondary)] hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col min-h-0 pb-20 md:pb-0 overflow-y-auto">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-6 border-b border-[var(--surface-border)] bg-[var(--surface-app)]/50 backdrop-blur transition-colors">
          <h1 className="text-2xl font-bold font-display">
            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user?.roles?.some(r => ['organizer', 'admin'].includes(r)) && (
              <Link
                to={user.roles.includes('admin') ? '/admin' : '/organizer'}
                className="text-xs px-3 py-1.5 rounded-lg border border-[var(--surface-border)] text-[var(--text-secondary)] hover:border-[var(--brand-blue-light)] hover:text-[var(--brand-blue-light)] transition-colors"
              >
                Switch to Console
              </Link>
            )}
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface-mid)]/90 backdrop-blur-lg border-t border-[var(--surface-border)] flex items-center justify-around py-3 z-50 px-4 transition-colors">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 relative px-3 py-1`}
            >
              {isActive && (
                <motion.span
                  layoutId="bottomNavGlow"
                  className="absolute inset-0 bg-[var(--brand-blue-light)]/10 rounded-full border border-[var(--brand-blue-light)]/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={20} className={isActive ? 'text-[var(--brand-blue-light)]' : 'text-[var(--text-secondary)]'} />
              <span className={`text-[10px] font-semibold ${isActive ? 'text-[var(--brand-blue-light)]' : 'text-[var(--text-secondary)]'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
