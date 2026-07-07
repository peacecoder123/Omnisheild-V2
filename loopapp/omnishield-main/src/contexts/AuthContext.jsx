import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('omnishield_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('omnishield_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password, role) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Connect to backend API — POST /api/auth/login
      await new Promise(r => setTimeout(r, 800))
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email,
        role: role || 'doctor',
        abhaId: 'ABHA-12345-67890',
        facility: 'City General Hospital',
      }
      const mockToken = 'mock_jwt_' + Date.now()
      setUser(mockUser)
      setToken(mockToken)
      localStorage.setItem('omnishield_user', JSON.stringify(mockUser))
      localStorage.setItem('omnishield_token', mockToken)
      return mockUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: Connect to backend API — POST /api/auth/register
      await new Promise(r => setTimeout(r, 800))
      const mockUser = { id: Date.now().toString(), ...userData }
      const mockToken = 'mock_jwt_' + Date.now()
      setUser(mockUser)
      setToken(mockToken)
      localStorage.setItem('omnishield_user', JSON.stringify(mockUser))
      localStorage.setItem('omnishield_token', mockToken)
      return mockUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('omnishield_user')
    localStorage.removeItem('omnishield_token')
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
