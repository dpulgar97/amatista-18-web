import { Navigate, useNavigate } from 'react-router'
import LoginForm from '../../components/admin/LoginForm'
import { useAuth } from '../../auth/AuthContext'
import background from '../../assets/images/login-admin-bg.webp'

export default function LoginAdmin() {
  const { user, initializing } = useAuth()
  const navigate = useNavigate()

  if (initializing) {
    return null
  }

  if (user) {
    return <Navigate to="/admin" replace />
  }

  return (
    <main
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: `url(${background})` }}
    >
      <LoginForm onSuccess={() => navigate('/admin')} />
    </main>
  )
}
