import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: POST /api/auth/forgot-password
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg mb-3">
            <Shield className="w-8 h-8 text-[#1e3a5f]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset your password</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-[#0d9488] mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Check your email</h2>
              <p className="text-gray-500 text-sm mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Link to="/login" className="btn-primary inline-block">Back to Sign In</Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Forgot password?</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" required className="input-field" value={email}
                    onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-2.5">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
              <p className="text-sm text-gray-500 text-center mt-4">
                <Link to="/login" className="text-[#0d9488] hover:underline">Back to Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
