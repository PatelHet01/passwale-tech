import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Users, Clock, Sparkles, CheckCircle2, User } from 'lucide-react'
import api from '@/services/api'
import useAuthStore from '@/stores/authStore'
import toast from 'react-hot-toast'

export default function SquadPage() {
  const { inviteCode } = useParams()
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.token)
  const [squad, setSquad] = useState(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    fetchSquadInfo()
  }, [inviteCode])

  const fetchSquadInfo = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/squads/${inviteCode}`)
      setSquad(res.data.data)
    } catch (err) {
      toast.error('Squad details failed to load')
      navigate('/events')
    } finally {
      setLoading(false)
    }
  }

  const joinSquad = async () => {
    if (!token) {
      toast.error('Please sign in to join squad')
      navigate(`/login?redirect=/squad/${inviteCode}`)
      return
    }
    setJoining(true)
    try {
      await api.post(`/squads/${squad._id}/join`)
      toast.success('Joined squad lobby successfully!')
      fetchSquadInfo()
    } catch (err) {
      toast.error(err.response?.data?.error?.message || 'Failed to join squad')
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading squad lobby...</span>
      </div>
    )
  }

  if (!squad) return null

  const event = squad.eventId || {}
  const slotsRemaining = Math.max(0, squad.minMembers - squad.members.length)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 pb-20">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/30">
            Squad Ticket Lobby
          </span>
          <h3 className="text-2xl font-bold font-display text-slate-100 mt-2">{squad.name}</h3>
          <p className="text-slate-400 text-xs">{event.title}</p>
        </div>

        {/* Invite code card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex justify-between items-center text-xs">
          <div>
            <p className="text-slate-500 uppercase tracking-wider text-[10px]">Invite Code</p>
            <p className="font-mono text-slate-200 font-bold mt-0.5">{squad.inviteCode}</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast.success('Lobby link copied to clipboard!')
            }}
            className="px-3.5 py-2 border border-slate-800 bg-slate-900 text-slate-300 font-semibold rounded-xl"
          >
            Copy Link
          </button>
        </div>

        {/* Slots visualization */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Members ({squad.members.length}/{squad.maxMembers})</span>
            {slotsRemaining > 0 ? (
              <span className="text-slate-500">{slotsRemaining} more needed for discount</span>
            ) : (
              <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 size={12} />
                <span>Discount unlocked!</span>
              </span>
            )}
          </div>

          <div className="flex justify-center -space-x-2.5 overflow-hidden py-2.5">
            {squad.members.map((m, idx) => (
              <div
                key={idx}
                className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs"
                title={m.userId?.name}
              >
                {m.userId?.name?.charAt(0) || 'M'}
              </div>
            ))}
            {/* Empty placeholders */}
            {[...Array(slotsRemaining)].map((_, i) => (
              <div
                key={i}
                className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-900 bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-700"
              >
                <User size={14} />
              </div>
            ))}
          </div>
        </div>

        {/* Join button */}
        {squad.status === 'forming' ? (
          <button
            onClick={joinSquad}
            disabled={joining}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg text-sm"
          >
            {joining ? 'Joining lobby...' : 'Join Squad'}
          </button>
        ) : (
          <div className="text-center p-3.5 bg-slate-950 rounded-xl border border-slate-850 text-slate-500 text-xs font-semibold">
            Squad is locked and ready for entry code issuance.
          </div>
        )}
      </div>
    </div>
  )
}
