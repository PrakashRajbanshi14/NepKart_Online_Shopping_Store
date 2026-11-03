import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

export default function AdminRoute() {
  const location = useLocation()
  const user = useAppSelector((state) => state.auth.user)
  const token = user.token || localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return <Outlet />
}
