import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

function mapAuthError(error) {
  if (error?.code === 'invalid_credentials') {
    return 'Credenciales inválidas. Intenta de nuevo.'
  }
  return error?.message ?? 'Error al iniciar sesión.'
}

export function useLogin() {
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function login(email, password) {
    setLoading(true)
    setError(null)

    const { error: signInError } = await signIn(email, password)
    setLoading(false)

    if (signInError) {
      setError(mapAuthError(signInError))
      return false
    }

    return true
  }

  return { login, loading, error }
}
