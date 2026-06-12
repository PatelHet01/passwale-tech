import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Calendar, PlusCircle, Award, RefreshCw, LogOut, ShieldAlert } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function OrganizerLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Console Home', path: '/organizer', icon: LayoutDashboard },
    { label: 'My Events', path: '/organizer/events', icon: Calendar },
    { label: 'Create Event', path: '/organizer/events/create', icon: PlusCircle },
  ]

  return (
    <div className="min-h-screen bg-[var(--surface-app)] text-[var(--text-primary)] flex flex-col md:flex-row transition-colors">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--surface-mid)] border-r border-[var(--surface-border)] p-6 space-y-8 shrink-0 transition-colors">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-display font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            PASSWALE
          </Link>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-purple-500 text-white">
            ORGANIZER
          </span>
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
                    ? 'bg-purple-600/20 text-purple-500 border border-purple-500/30'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="pt-6 border-t border-[var(--surface-border)] space-y-4">
          <Link
            to="/events"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
          >
            <RefreshCw size={18} />
            <span className="text-sm font-medium">Attendee View</span>
          </Link>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-950 border border-purple-700 flex items-center justify-center font-bold text-purple-300">
                {user?.name?.charAt(0) || 'O'}
              </div>
              <div className="truncate w-28">
                <p className="font-semibold text-sm truncate">{user?.name || 'Organizer'}</p>
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

      {/* Main Console Container */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-16 md:pb-0">
        <header className="flex items-center justify-between p-6 border-b border-[var(--surface-border)] bg-[var(--surface-app)]/80 backdrop-blur-lg transition-colors">
          <div className="md:hidden flex items-center space-x-2">
            <span className="font-display font-extrabold text-lg text-purple-500">PASSWALE CONSOLE</span>
          </div>
          <h1 className="hidden md:block text-2xl font-bold font-display">
            {navItems.find(item => item.path === location.pathname)?.label || 'Organizer Dashboard'}
          </h1>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {user?.roles?.includes('admin') && (
              <Link
                to="/admin"
                className="text-xs flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-yellow-600/30 text-yellow-600 bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors"
              >
                <ShieldAlert size={14} />
                <span>Admin Console</span>
              </Link>
            )}
            <Link
              to="/organizer/events/create"
              className="theme-btn-primary text-xs"
            >
              Create New Event
            </Link>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile view top helper tabs for organizer console navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface-mid)]/90 backdrop-blur-lg border-t border-[var(--surface-border)] flex items-center justify-around py-3 z-50 transition-colors">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 ${isActive ? 'text-purple-500' : 'text-[var(--text-secondary)]'}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          )}
        )}
        <Link
          to="/events"
          className="flex flex-col items-center space-y-1 text-[var(--text-secondary)]"
        >
          <RefreshCw size={20} />
          <span className="text-[10px] font-semibold">Attendee</span>
        </Link>
      </nav>
    </div>
  )
}
