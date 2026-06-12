import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, IndianRupee, Users, ShieldAlert, FileCode2, History, RefreshCw, LogOut } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Pricing Control', path: '/admin/pricing', icon: FileCode2 },
    { label: 'User Admin', path: '/admin/users', icon: Users },
    { label: 'Event Review', path: '/admin/events', icon: ShieldAlert },
    { label: 'Financials', path: '/admin/financials', icon: IndianRupee },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: History },
  ]

  return (
    <div className="min-h-screen bg-[var(--surface-app)] text-[var(--text-primary)] flex flex-col md:flex-row transition-colors">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--surface-mid)] border-r border-[var(--surface-border)] p-6 space-y-8 shrink-0 transition-colors">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            PASSWALE
          </Link>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]">
            ADMIN
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600/20 text-red-500 border border-red-500/30'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                <Icon size={18} />
                <span className="font-semibold text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="pt-4 border-t border-[var(--surface-border)] space-y-2">
          <Link
            to="/organizer"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
          >
            <RefreshCw size={16} />
            <span className="text-sm font-semibold">Organizer Console</span>
          </Link>
          <Link
            to="/events"
            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
          >
            <RefreshCw size={16} />
            <span className="text-sm font-semibold">Attendee View</span>
          </Link>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-950 border border-red-800 flex items-center justify-center font-bold text-red-300">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="truncate w-28">
                <p className="font-semibold text-sm truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{user?.email || ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-[var(--text-secondary)] hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-16 md:pb-0">
        <header className="flex items-center justify-between p-6 border-b border-[var(--surface-border)] bg-[var(--surface-app)]/80 backdrop-blur-lg transition-colors">
          <span className="md:hidden font-display font-extrabold text-red-500">PASSWALE ADMIN</span>
          <h1 className="hidden md:block text-2xl font-bold font-display">
            {navItems.find(item => item.path === location.pathname)?.label || 'System Control'}
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="text-xs bg-[var(--surface-mid)] px-3 py-1.5 rounded-lg border border-[var(--surface-border)] text-[var(--text-secondary)]">
              Node: Live (Localhost)
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile view bottom navigators */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface-mid)]/90 backdrop-blur-lg border-t border-[var(--surface-border)] flex items-center justify-around py-3 z-50 transition-colors">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 ${isActive ? 'text-red-500' : 'text-[var(--text-secondary)]'}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          )}
        )}
        <Link to="/organizer" className="flex flex-col items-center space-y-1 text-[var(--text-secondary)]">
          <RefreshCw size={20} />
          <span className="text-[10px] font-semibold">Console</span>
        </Link>
      </nav>
    </div>
  )
}
