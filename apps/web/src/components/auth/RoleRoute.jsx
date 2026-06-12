import { Navigate } from 'react-router-dom'
import useAuthStore from '@/stores/authStore'

export default function RoleRoute({ roles, children }) {
  const user = useAuthStore((s) => s.user)
  const hasAccess = user?.roles?.some(r => roles.includes(r))
  if (!hasAccess) return <Navigate to="/dashboard" replace />
  return children
}
