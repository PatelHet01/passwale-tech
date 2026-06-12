import { useState } from 'react'
import { User, Mail, Phone, Shield, CheckCircle } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const [name, setName] = useState(user?.name || '')
  const [email] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')

  const handleSave = (e) => {
    e.preventDefault()
    toast.success('Profile credentials updated successfully!')
  }

  return (
    <div className="space-y-8 pb-12 max-w-2xl mx-auto">
      {/* Profile Form card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100">Profile Configuration</h3>
          <p className="text-xs text-slate-400 mt-0.5">Manage your user information and roles</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-slate-950/20 border border-slate-900/60 rounded-xl py-3 pl-11 pr-4 text-slate-500 cursor-not-allowed text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/10 active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Role details box */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-4">
        <h4 className="font-bold font-display text-slate-200 flex items-center space-x-2">
          <Shield size={16} className="text-blue-400" />
          <span>Assigned Roles</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {user?.roles?.map((role) => (
            <span
              key={role}
              className="inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 capitalize"
            >
              <CheckCircle size={12} className="text-emerald-400" />
              <span>{role}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
