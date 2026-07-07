import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Loader2 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { ROLES } from '../../utils/constants.js'

export default function RegisterPage() {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', abhaId: '',
    role: 'patient', password: '', confirm: '', terms: false,
  })
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (!form.terms) { setError('Please accept the terms.'); return }
    setError('')
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, abhaId: form.abhaId, role: form.role })
      navigate('/dashboard')
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg mb-3">
            <Shield className="w-8 h-8 text-[#1e3a5f]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create your OmniShield account</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required className="input-field" value={form.name} onChange={set('name')} placeholder="Dr. Priya Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required className="input-field" value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" required className="input-field" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ABHA ID <span className="text-gray-400">(optional)</span></label>
                <input type="text" className="input-field" value={form.abhaId} onChange={set('abhaId')} placeholder="ABHA-XXXX-XXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="input-field" value={form.role} onChange={set('role')}>
                  {Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" required minLength={8} className="input-field" value={form.password} onChange={set('password')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" required className="input-field" value={form.confirm} onChange={set('confirm')} />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="mt-0.5 rounded" checked={form.terms}
                onChange={e => setForm(p => ({ ...p, terms: e.target.checked }))} />
              I agree to the <a href="#" className="text-[#0d9488] hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-[#0d9488] hover:underline">Privacy Policy</a>
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-2.5">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0d9488] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
