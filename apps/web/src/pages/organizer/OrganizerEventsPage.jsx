import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, BarChart3, ScanLine, Edit, Eye, Clock } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await api.get('/organizer/events')
      setEvents(res.data.data || [])
    } catch (err) {
      toast.error('Failed to load events list')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (id) => {
    try {
      await api.post(`/events/${id}/publish`)
      toast.success('Event published successfully!')
      fetchEvents()
    } catch (err) {
      toast.error(err.response?.data?.error?.message || 'Publish verification failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading your events...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-display text-slate-200">Organized Drops</h3>
          <p className="text-xs text-slate-500">Edit, duplicate, publish or monitor scans of your events</p>
        </div>
        <Link
          to="/organizer/events/create"
          className="text-xs px-4 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-all"
        >
          Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/10 border border-slate-800/80 rounded-2xl p-8 max-w-sm mx-auto space-y-4">
          <Clock className="mx-auto text-slate-500" size={24} />
          <h4 className="font-bold text-slate-200">No events hosted yet</h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            Create your first draft event to configure ticketing tiers, card benefits, and start selling.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => {
            const soldCount = event.ticketCategories?.reduce((acc, c) => acc + (c.sold || 0), 0) || 0
            const totalCapacity = event.ticketCategories?.reduce((acc, c) => acc + (c.quantity || 0), 0) || 0
            const fillPercent = totalCapacity > 0 ? (soldCount / totalCapacity) * 100 : 0

            return (
              <div
                key={event._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex items-center space-x-2.5">
                    <h4 className="font-bold text-slate-200 truncate text-base">{event.title}</h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      event.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-950 text-slate-500 border border-slate-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                    <p className="flex items-center space-x-1">
                      <Calendar size={13} className="text-slate-500" />
                      <span>{new Date(event.dates?.start).toLocaleDateString()}</span>
                    </p>
                    <div className="flex items-center space-x-2 shrink-0 w-32">
                      <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{ width: `${fillPercent}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold">{soldCount}/{totalCapacity} Sold</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {event.status === 'draft' && (
                    <button
                      onClick={() => handlePublish(event._id)}
                      className="px-3.5 py-2 rounded-xl border border-emerald-600/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 text-xs font-semibold"
                    >
                      Publish
                    </button>
                  )}
                  <Link
                    to={`/organizer/events/${event._id}/edit`}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Link>
                  <Link
                    to={`/organizer/events/${event._id}/analytics`}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Analytics"
                  >
                    <BarChart3 size={16} />
                  </Link>
                  {event.status === 'published' && (
                    <Link
                      to={`/organizer/check-in/${event._id}`}
                      className="p-2.5 rounded-xl border border-purple-800/30 bg-purple-950/20 hover:bg-purple-950/40 text-purple-400 hover:text-purple-300 transition-all active:scale-95"
                      title="Scanner"
                    >
                      <ScanLine size={16} />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
