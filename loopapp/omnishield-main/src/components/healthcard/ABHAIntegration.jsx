import { useState } from 'react'
import { CheckCircle, Loader2, Link } from 'lucide-react'

export default function ABHAIntegration() {
  const [step, setStep] = useState(1)
  const [abhaId, setAbhaId] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const nextStep = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: POST /api/abha/verify-otp
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setStep(s => s + 1)
  }

  return (
    <div className="card max-w-lg">
      <div className="flex items-center gap-2 mb-6">
        <Link className="w-5 h-5 text-[#0d9488]" />
        <h2 className="section-title mb-0">ABHA ID Integration</h2>
      </div>

      <div className="flex mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex-1 flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-[#0d9488] text-white' : 'bg-gray-200 text-gray-400'}`}>{s}</div>
            {s < 3 && <div className={`flex-1 h-1 ${step > s ? 'bg-[#0d9488]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={nextStep} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter ABHA ID or Mobile Number</label>
            <input className="input-field" value={abhaId} onChange={e => setAbhaId(e.target.value)}
              placeholder="ABHA-XXXX-XXXX or 9876543210" required />
          </div>
          <p className="text-xs text-gray-400">An OTP will be sent to your registered mobile number.</p>
          <button type="submit" disabled={loading} className="btn-accent w-full flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={nextStep} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
            <input className="input-field text-center text-2xl tracking-widest font-mono" maxLength={6}
              value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="------" required />
          </div>
          <button type="submit" disabled={loading} className="btn-accent w-full flex items-center justify-center gap-2">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="text-center py-6">
          <CheckCircle className="w-14 h-14 text-[#0d9488] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">ABHA ID Linked!</h3>
          <p className="text-gray-500 text-sm mt-1">Your health records are now accessible via OmniShield.</p>
          <div className="mt-4 bg-[#e6f7f6] rounded-lg p-3 text-sm text-[#0d9488] font-mono">{abhaId || 'ABHA-12345-67890'}</div>
        </div>
      )}
    </div>
  )
}
