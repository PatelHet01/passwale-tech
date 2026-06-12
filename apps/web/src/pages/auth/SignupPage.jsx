import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, ShieldCheck, Compass, Sparkles, User, Mail, Phone, Lock } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    roles: ['attendee'],
    scenePreferences: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Seeded Scenes mapping color list
  const scenes = [
    { id: 'Techno', name: 'Techno', color: '#6D28D9', bg: 'bg-purple-950/20 border-purple-800/30' },
    { id: 'Bollywood', name: 'Bollywood', color: '#DC2626', bg: 'bg-red-950/20 border-red-800/30' },
    { id: 'Garba', name: 'Garba', color: '#D97706', bg: 'bg-amber-950/20 border-amber-800/30' },
    { id: 'Campus', name: 'Campus', color: '#2563EB', bg: 'bg-blue-950/20 border-blue-800/30' },
    { id: 'Comedy', name: 'Comedy', color: '#059669', bg: 'bg-emerald-950/20 border-emerald-800/30' },
    { id: 'Startup', name: 'Startup', color: '#0891B2', bg: 'bg-cyan-950/20 border-cyan-800/30' }
  ]

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone || !formData.password)) {
      return toast.error('Please fill in all identity fields')
    }
    if (step === 3 && formData.scenePreferences.length < 1) {
      return toast.error('Please select at least 1 favorite scene')
    }
    setStep(s => s + 1)
  }

  const handleBack = () => {
    setStep(s => s - 1)
  }

  const toggleScene = (sceneName) => {
    setFormData(prev => {
      const exists = prev.scenePreferences.includes(sceneName)
      return {
        ...prev,
        scenePreferences: exists
          ? prev.scenePreferences.filter(x => x !== sceneName)
          : [...prev.scenePreferences, sceneName]
      }
    })
  }

  const handleRoleSelect = (role) => {
    setFormData(prev => {
      const exists = prev.roles.includes(role)
      return {
        ...prev,
        roles: exists ? prev.roles.filter(r => r !== role) : [...prev.roles, role]
      }
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // For MVP, look up matching scene IDs from seeded DB dynamically or map them directly on backend.
      // We will send scenePreferences as strings, and the backend handles binding where needed.
      const res = await api.post('/auth/signup', formData)
      toast.success('Registration successful! Welcome to Passwale.')
      
      // Auto redirect to login
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.error?.message || 'Failed to sign up')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[512px] bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">Create your account</h2>
              <p className="text-slate-400 text-sm mt-1">Get started with Passwale</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    placeholder="Enter name"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    placeholder="+919999999999"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/10"
            >
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">Select your roles</h2>
              <p className="text-slate-400 text-sm mt-1">Select all roles you want to use</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['attendee', 'organizer', 'vendor', 'volunteer'].map((role) => {
                const isSelected = formData.roles.includes(role)
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`p-6 rounded-2xl border text-left flex flex-col space-y-3 transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-md shadow-blue-500/5'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="capitalize font-bold text-lg text-slate-200">{role}</span>
                    <span className="text-xs text-slate-500 leading-tight">
                      {role === 'attendee' && 'Discover events and book tickets.'}
                      {role === 'organizer' && 'Host and organize music/shows.'}
                      {role === 'vendor' && 'Provide food, setups or bars.'}
                      {role === 'volunteer' && 'Help execute at entries.'}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleBack}
                className="flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">Select favorite Scenes</h2>
              <p className="text-slate-400 text-sm mt-1">This shapes your recommendations (min 1)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {scenes.map((scene) => {
                const isSelected = formData.scenePreferences.includes(scene.name)
                return (
                  <button
                    key={scene.id}
                    onClick={() => toggleScene(scene.name)}
                    style={{ borderColor: isSelected ? scene.color : undefined }}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-slate-900/60 shadow-lg'
                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scene.color }} />
                      <span className="font-semibold text-sm text-slate-200">{scene.name}</span>
                    </div>
                    {isSelected && <Sparkles size={14} style={{ color: scene.color }} />}
                  </button>
                )
              })}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleBack}
                className="flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">Ready to join?</h2>
              <p className="text-slate-400 text-sm mt-1">Review and complete your profile registration</p>
            </div>

            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Name</span>
                <span className="font-semibold text-slate-200">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold text-slate-200">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone</span>
                <span className="font-semibold text-slate-200">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Roles</span>
                <span className="font-semibold text-slate-200 capitalize">{formData.roles.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Scenes</span>
                <span className="font-semibold text-slate-200">{formData.scenePreferences.length} chosen</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleBack}
                className="flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Complete Sign Up'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-slate-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}
