import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password || !confirmPassword) return toast.error('Please enter passwords')
    if (password !== confirmPassword) return toast.error('Passwords do not match')
    
    toast.success('Password updated successfully!')
    navigate('/login')
  }

  return (
    <div className="w-full max-w-[448px] bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold font-display text-slate-100">Set New Password</h2>
        <p className="text-slate-400 text-sm">Please secure your account with a new password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1.5">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg font-display"
        >
          Update Password
        </button>
      </form>

      <div className="mt-6 flex justify-center">
        <Link to="/login" className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft size={14} />
          <span>Cancel</span>
        </Link>
      </div>
    </div>
  )
}
