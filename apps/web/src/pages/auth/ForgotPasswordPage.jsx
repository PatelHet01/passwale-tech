import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return toast.error('Please enter your email')
    setIsSent(true)
    toast.success('Password reset link sent to your email!')
  }

  return (
    <div className="w-full max-w-[448px] bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold font-display text-slate-100">Reset Password</h2>
        <p className="text-slate-400 text-sm">We will email you a password recovery link</p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg"
          >
            <Send size={16} />
            <span>Send Reset Link</span>
          </button>
        </form>
      ) : (
        <div className="text-center p-6 space-y-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
          <p className="text-sm text-slate-300">
            Check your email inbox! An instruction link has been sent to <span className="font-semibold text-blue-400">{email}</span>.
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Link to="/login" className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  )
}
