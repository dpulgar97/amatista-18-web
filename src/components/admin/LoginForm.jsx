import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import TextField from './TextField'
import { useLogin } from '../../hooks/useLogin'
import logo from '../../assets/images/centro-holistico-logo.png'

export default function LoginForm({ onSuccess }) {
  const { login, loading, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const success = await login(email, password)
    if (success) {
      onSuccess?.()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-3xl bg-bg-white p-8 shadow-2xl sm:p-10"
    >
      <img
        src={logo}
        alt="Centro Holístico Amatista 18"
        className="mx-auto h-28 w-auto object-contain"
      />

      <h1 className="text-center text-2xl font-semibold text-text-dark">
        Panel de administración
      </h1>
      <p className="mb-6 mt-1 text-center text-sm text-text-gray">
        Inicia sesión para gestionar el contenido
      </p>

      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-pink-accent/10 px-4 py-3 text-sm text-pink-accent">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <TextField
          id="email"
          label="Correo electrónico"
          icon={Mail}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@amatista18.com"
          disabled={loading}
        />

        <TextField
          id="password"
          label="Contraseña"
          icon={LockKeyhole}
          type={showPassword ? 'text' : 'password'}
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          disabled={loading}
          className="pr-12"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-gray transition hover:text-text-dark"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-accent py-3 text-sm font-semibold text-bg-white transition hover:bg-pink-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-bg-white/40 border-t-bg-white" />
          )}
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </div>
    </form>
  )
}
