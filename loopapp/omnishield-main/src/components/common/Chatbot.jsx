import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { api } from '../../utils/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'

const WELCOME = "👋 Hi! I'm OmniShield's health assistant. I can help you with symptoms, health advice, appointments, and medication reminders.\n\nHow can I help you today?"

export default function Chatbot() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'bot', text: WELCOME, time: new Date() }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Check for pending notifications on mount
    if (user?.id) {
      api.get(`/notifications/${user.id}`).then(notifs => {
        if (notifs?.length) {
          notifs.forEach(n => {
            setMessages(m => [...m, { role: 'bot', text: `🔔 ${n.message}`, time: new Date() }])
          })
        }
      }).catch(() => {})
    }
  }, [user])

  const send = async () => {
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { role: 'user', text, time: new Date() }])
    setInput('')
    setTyping(true)
    try {
      const res = await api.post('/chatbot', { message: text, patientId: user?.id })
      setTyping(false)
      let reply = res.message || 'I could not understand that. Please try again.'
      if (res.severity) reply += `\n\n**Severity:** ${res.severity}`
      if (res.seeDoctor) reply += '\n\n⚠️ **Please consult a doctor.**'
      setMessages(m => [...m, { role: 'bot', text: reply, time: new Date() }])
    } catch {
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', text: 'I\'m having trouble connecting. Please try again.', time: new Date() }])
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return <p key={i} className="mb-0.5 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
    })
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0d9488] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0f766e] transition-all z-40 ring-4 ring-[#0d9488]/30 animate-pulse"
        aria-label="Open health chatbot"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200" style={{ height: '480px' }}>
          {/* Header */}
          <div className="bg-[#0d9488] text-white px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">OmniShield Health Assistant</div>
              <div className="text-xs text-white/80">Always here to help</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 bg-[#0d9488] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs ${msg.role === 'user' ? 'bg-[#1e3a5f] text-white rounded-tr-sm' : 'bg-white text-gray-800 shadow-sm rounded-tl-sm border border-gray-100'}`}>
                  {formatText(msg.text)}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-[#1e3a5f] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 bg-[#0d9488] rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your health question..."
              className="flex-1 text-xs border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-8 h-8 bg-[#0d9488] text-white rounded-full flex items-center justify-center hover:bg-[#0f766e] disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
