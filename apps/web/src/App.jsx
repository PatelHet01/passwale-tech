import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import OrganizerLayout from '@/layouts/OrganizerLayout'

import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage'

import EventsPage from '@/pages/events/EventsPage'
import EventMicrosite from '@/pages/events/EventMicrosite'
import EventDetailsPage from '@/pages/events/EventDetailsPage'
import ScenesPage from '@/pages/scenes/ScenesPage'
import SceneDetailPage from '@/pages/scenes/SceneDetailPage'

import DashboardPage from '@/pages/dashboard/DashboardPage'
import MyTicketsPage from '@/pages/dashboard/MyTicketsPage'
import MyCardPage from '@/pages/dashboard/MyCardPage'
import WalletPage from '@/pages/dashboard/WalletPage'
import ProfilePage from '@/pages/dashboard/ProfilePage'

import OrganizerHome from '@/pages/organizer/OrganizerHome'
import CreateEventPage from '@/pages/organizer/CreateEventPage'
import OrganizerEventsPage from '@/pages/organizer/OrganizerEventsPage'
import EventAnalyticsPage from '@/pages/organizer/EventAnalyticsPage'
import CheckInPage from '@/pages/organizer/CheckInPage'

import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminPricingPage from '@/pages/admin/AdminPricingPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'
import AdminEventsPage from '@/pages/admin/AdminEventsPage'
import AdminFinancialsPage from '@/pages/admin/AdminFinancialsPage'
import AdminSalesPage from '@/pages/admin/AdminSalesPage'
import AdminNotificationsPage from '@/pages/admin/AdminNotificationsPage'
import AdminAuditLogsPage from '@/pages/admin/AdminAuditLogsPage'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import RoleRoute from '@/components/auth/RoleRoute'
import PaymentCallbackPage from '@/pages/payments/PaymentCallbackPage'
import SquadPage from '@/pages/squads/SquadPage'
import { useThemeStore } from '@/stores/themeStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
})

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },

  // Auth
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password/:token', element: <ResetPasswordPage /> },
      { path: '/verify-email/:token', element: <VerifyEmailPage /> },
    ],
  },

  // Public event pages
  { path: '/e/:slug', element: <EventDetailsPage /> },
  { path: '/squad/:inviteCode', element: <SquadPage /> },
  { path: '/payment/callback', element: <PaymentCallbackPage /> },
  { path: '/scenes', element: <ScenesPage /> },
  { path: '/scenes/:slug', element: <SceneDetailPage /> },
  { path: '/events', element: <EventsPage /> },

  // Attendee dashboard
  {
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/dashboard/tickets', element: <MyTicketsPage /> },
      { path: '/dashboard/card', element: <MyCardPage /> },
      { path: '/dashboard/wallet', element: <WalletPage /> },
      { path: '/dashboard/profile', element: <ProfilePage /> },
    ],
  },

  // Organizer dashboard
  {
    element: <ProtectedRoute><RoleRoute roles={['organizer', 'admin']}><OrganizerLayout /></RoleRoute></ProtectedRoute>,
    children: [
      { path: '/organizer', element: <OrganizerHome /> },
      { path: '/organizer/events', element: <OrganizerEventsPage /> },
      { path: '/organizer/events/create', element: <CreateEventPage /> },
      { path: '/organizer/events/:id/edit', element: <CreateEventPage /> },
      { path: '/organizer/events/:id/analytics', element: <EventAnalyticsPage /> },
      { path: '/organizer/check-in/:eventId', element: <CheckInPage /> },
    ],
  },

  // Admin
  {
    element: <ProtectedRoute><RoleRoute roles={['admin', 'super_admin']}><AdminLayout /></RoleRoute></ProtectedRoute>,
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/admin/pricing', element: <AdminPricingPage /> },
      { path: '/admin/users', element: <AdminUsersPage /> },
      { path: '/admin/events', element: <AdminEventsPage /> },
      { path: '/admin/financials', element: <AdminFinancialsPage /> },
      { path: '/admin/sales', element: <AdminSalesPage /> },
      { path: '/admin/notifications', element: <AdminNotificationsPage /> },
      { path: '/admin/audit-logs', element: <AdminAuditLogsPage /> },
    ],
  },

  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  const initTheme = useThemeStore((state) => state.initTheme)

  useEffect(() => {
    const cleanup = initTheme();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--theme-surface, #1E293B)',
            color: 'var(--theme-text, #F8FAFC)',
            border: '1px solid var(--theme-border, rgba(255,255,255,0.07))',
            borderRadius: 'var(--theme-radius-sm, 12px)',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: 'var(--theme-accent, #34D399)', secondary: 'var(--theme-surface, #0F172A)' } },
          error: { iconTheme: { primary: 'var(--theme-error, #F87171)', secondary: 'var(--theme-surface, #0F172A)' } },
        }}
      />
    </QueryClientProvider>
  )
}
