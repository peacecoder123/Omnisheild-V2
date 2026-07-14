import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Shield, Eye, EyeOff, Loader2, Info } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { ROLES } from '../../utils/constants.js'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '', role: 'doctor', remember: false })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password, form.role)
      navigate(from, { replace: true })
    } catch {
      setError('Invalid credentials. Please try again.')
    }
  }

  const DEMO_ACCOUNTS = [
    { role: 'Doctor',     email: 'doctor@demo.com' },
    { role: 'Patient',    email: 'patient@demo.com' },
    { role: 'Nurse',      email: 'nurse@demo.com' },
    { role: 'Lab Tech',   email: 'labtech@demo.com' },
    { role: 'Pharmacist', email: 'pharma@demo.com' },
    { role: 'Admin',      email: 'admin@demo.com' },
    { role: 'Government', email: 'govt@demo.com' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg mb-3">
            <Shield className="w-8 h-8 text-[#1e3a5f]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in to OmniShield</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="input-field" value={form.role} onChange={set('role')}>
                {Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" required className="input-field" value={form.email} onChange={set('email')} placeholder="name@facility.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required className="input-field pr-10" value={form.password} onChange={set('password')} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded" checked={form.remember} onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))} />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-[#0d9488] hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-2.5">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowDemo(v => !v)}
              className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Info className="w-4 h-4" />
              {showDemo ? 'Hide demo accounts' : 'Show demo accounts'}
            </button>
            {showDemo && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-700 mb-2">Demo accounts — password is <code className="bg-blue-100 px-1 rounded">demo</code> for all</p>
                <div className="space-y-1">
                  {DEMO_ACCOUNTS.map(a => (
                    <button
                      key={a.email}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, email: a.email, password: 'demo' }))}
                      className="w-full text-left flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-blue-100 transition-colors"
                    >
                      <span className="text-blue-800 font-medium">{a.role}</span>
                      <span className="text-blue-600 font-mono">{a.email}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-blue-500 mt-2">Click a row to fill in the credentials.</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#0d9488] font-medium hover:underline">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}