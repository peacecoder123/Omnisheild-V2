import { Link, useNavigate } from 'react-router-dom'
import { Shield, LogOut, User, Wifi, WifiOff } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { ROLES } from '../../utils/constants.js'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [online, setOnline] = useState(navigator.onLine)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const roleInfo = user ? ROLES[user.role] : null

  return (
    <header className="bg-[#1e3a5f] text-white shadow-lg z-50 relative">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <div className="bg-white/20 rounded-lg p-1.5">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">OmniShield</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Online indicator */}
          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${online ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {online ? 'Online' : 'Offline'}
          </div>

          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(v => !v)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-colors">
                <div className="w-7 h-7 bg-[#0d9488] rounded-full flex items-center justify-center text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium leading-tight">{user.name}</p>
                  {roleInfo && (
                    <p className="text-xs text-teal-300 leading-tight">{roleInfo.label}</p>
                  )}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {user.abhaId && <p className="text-xs text-teal-600 mt-0.5">{user.abhaId}</p>}
                  </div>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-accent text-sm py-1.5 px-4">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  )
}
