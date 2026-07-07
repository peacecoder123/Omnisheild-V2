import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Smartphone, CheckCircle } from 'lucide-react'

export default function MFASetup() {
  const [code, setCode] = useState('')
  const [verified, setVerified] = useState(false)
  const navigate = useNavigate()

  const handleVerify = (e) => {
    e.preventDefault()
    // TODO: POST /api/auth/mfa/verify
    setVerified(true)
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#e6f7f6] rounded-2xl mb-3">
            <Smartphone className="w-8 h-8 text-[#0d9488]" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Two-Factor Authentication</h1>
          <p className="text-gray-500 text-sm mt-1">Scan the QR code with your authenticator app</p>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-40 h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center">
            <Shield className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-xs text-gray-400 text-center px-2">QR Code<br />(Mock)</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 mb-6">
          <p className="text-xs text-blue-600 text-center font-mono">
            Secret: OMNI-SHLD-2024-XXXX
          </p>
          <p className="text-xs text-blue-500 text-center mt-1">
            Or enter this key manually in your authenticator app
          </p>
        </div>

        {verified ? (
          <div className="text-center py-2">
            <CheckCircle className="w-10 h-10 text-[#0d9488] mx-auto mb-2" />
            <p className="text-green-600 font-medium">Verified! Redirecting…</p>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                pattern="\d{6}"
                className="input-field text-center text-2xl tracking-widest font-mono"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
              />
            </div>
            <button type="submit" className="btn-primary w-full py-2.5">Verify &amp; Enable MFA</button>
          </form>
        )}
      </div>
    </div>
  )
}
