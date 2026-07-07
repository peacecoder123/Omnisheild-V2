import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-gray-300 py-4 px-6">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0d9488]" />
          <span className="font-semibold text-white">OmniShield</span>
          <span className="text-gray-400">— Smart Health Card & Disease Surveillance Platform</span>
        </div>
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} OmniShield. HIPAA · GDPR · NDHM Compliant
        </div>
      </div>
    </footer>
  )
}
