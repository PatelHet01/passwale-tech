import { useState, useEffect } from 'react'
import { Calendar, Eye, ShieldAlert, CheckCircle } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function AdminEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/events')
      setEvents(res.data.data || [])
    } catch (err) {
      toast.error('Failed to load events review queue')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/events/${id}/status`, { status })
      toast.success(`Event status updated to ${status}!`)
      fetchEvents()
    } catch (err) {
      toast.error('Failed to update event status')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading queue...</span>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 pb-12">
      <div>
        <h3 className="text-xl font-bold font-display text-slate-100">Event Review Queue</h3>
        <p className="text-xs text-slate-400 mt-0.5">Approve pending event proposals or cancel listings</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-400">
          <thead>
            <tr className="border-b border-slate-800/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5">Event Details</th>
              <th className="py-2.5">Organizer</th>
              <th className="py-2.5">Start Date</th>
              <th className="py-2.5">Status</th>
              <th className="py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {events.map((event) => (
              <tr key={event._id}>
                <td className="py-3.5">
                  <span className="font-semibold text-slate-300 block">{event.title}</span>
                  <span className="text-[10px] text-slate-500">{event.location?.venue}</span>
                </td>
                <td className="py-3.5 text-slate-400">{event.organizer?.name}</td>
                <td className="py-3.5 text-slate-500">{new Date(event.dates?.start).toLocaleDateString()}</td>
                <td className="py-3.5">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    event.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : event.status === 'cancelled'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-slate-950 text-slate-500 border border-slate-800'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  {event.status === 'pending' || event.status === 'draft' ? (
                    <button
                      onClick={() => handleUpdateStatus(event._id, 'published')}
                      className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border border-emerald-600/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 transition-all active:scale-95"
                    >
                      Approve
                    </button>
                  ) : null}
                  {event.status !== 'cancelled' ? (
                    <button
                      onClick={() => handleUpdateStatus(event._id, 'cancelled')}
                      className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border border-rose-600/30 text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 transition-all active:scale-95"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(event._id, 'draft')}
                      className="text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 transition-all active:scale-95"
                    >
                      Draft
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
