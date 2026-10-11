import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/AuthContext'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4">
      <h1 className="text-2xl font-semibold text-text-dark">Panel de administración</h1>
      <p className="text-text-gray">Sesión iniciada como {user?.email}</p>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-xl bg-pink-accent px-6 py-3 text-sm font-semibold text-bg-white transition hover:bg-pink-accent/90"
      >
        Cerrar sesión
      </button>
    </main>
  )
}
