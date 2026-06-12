import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertTriangle, Scan, Search } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function CheckInPage() {
  const { eventId } = useParams()
  const [stats, setStats] = useState(null)
  const [ticketNumber, setTicketNumber] = useState('')
  const [result, setResult] = useState(null) // { success, attendeeName, status }
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchScanStats()
  }, [])

  const fetchScanStats = async () => {
    try {
      const res = await api.get(`/tickets/check-in/${eventId}/stats`)
      setStats(res.data.data)
    } catch (err) {
      console.error('Failed to load scan statistics')
    }
  }

  const handleCheckIn = async (e) => {
    e.preventDefault()
    if (!ticketNumber) return toast.error('Please enter a ticket number')

    setLoading(true)
    setResult(null)
    try {
      const res = await api.post('/tickets/check-in', { ticketNumber })
      setResult({
        success: true,
        holderName: res.data.data.holderName,
        ticketNumber: res.data.data.ticketNumber
      })
      toast.success('Attendee checked in successfully!')
      setTicketNumber('')
      fetchScanStats()
    } catch (err) {
      setResult({
        success: false,
        message: err.response?.data?.error?.message || 'Check-in failed'
      })
      toast.error('Scan validation rejected')
    } finally {
      setLoading(false)
    }
  }

  const simulateCameraScan = async () => {
    // Quick simulator helper: fetch all tickets for event, pick the first active one, check it in!
    try {
      const listRes = await api.get(`/organizer/events/${eventId}/attendees`)
      const activeTickets = (listRes.data.data || []).filter(t => t.status === 'active')
      if (activeTickets.length === 0) {
        return toast.error('No active tickets found to simulate scanning')
      }
      
      const targetNum = activeTickets[0].ticketNumber
      setTicketNumber(targetNum)
      toast.success(`Mock scanned code: ${targetNum}. Click check-in to confirm.`)
    } catch (err) {
      toast.error('Simulation check failed')
    }
  }

  return (
    <div className="space-y-8 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3">
        <Link to="/organizer/events" className="text-slate-500 hover:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h3 className="text-lg font-bold font-display text-slate-200">Door Gate Check-In</h3>
          <p className="text-xs text-slate-500">Scan dynamic ticket QR codes or perform manual audits</p>
        </div>
      </div>

      {/* Live check in stats bar */}
      {stats && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-baseline text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Scans Complete</span>
            <span className="font-semibold text-slate-200">
              {stats.checkedIn} / {stats.total} entries
            </span>
          </div>
          <div className="bg-slate-950 rounded-full h-2 overflow-hidden w-full">
            <div
              className="bg-purple-500 h-full transition-all duration-500"
              style={{ width: `${stats.total > 0 ? (stats.checkedIn / stats.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Camera Simulator and manual form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sim box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
            <Scan size={30} />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-200 text-sm">QR Camera Emulator</h4>
            <p className="text-[10px] text-slate-500 max-w-[180px] mx-auto">
              Simulate entry pass scanning loops using active event ticket data
            </p>
          </div>
          <button
            onClick={simulateCameraScan}
            className="text-xs font-semibold px-4 py-2 border border-slate-800 hover:border-slate-700 bg-slate-950 rounded-xl transition-all"
          >
            Trigger Scan
          </button>
        </div>

        {/* Manual entry */}
        <form onSubmit={handleCheckIn} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 font-display text-sm">Manual Code Entry</h4>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                value={ticketNumber}
                onChange={e => setTicketNumber(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 text-xs"
                placeholder="e.g. PW-171800-4820"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all text-xs disabled:opacity-50"
          >
            {loading ? 'Validating ticket...' : 'Confirm Ticket Entry'}
          </button>
        </form>
      </div>

      {/* Verification alerts */}
      {result && (
        <div className={`p-5 rounded-2xl border flex items-start space-x-3.5 text-xs ${
          result.success
            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-400'
            : 'bg-rose-950/20 border-rose-800/40 text-rose-400'
        }`}>
          {result.success ? (
            <>
              <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Entry Pass Approved</p>
                <p className="text-[11px] text-slate-400">
                  Attendee: <span className="font-semibold text-slate-200">{result.holderName}</span> | Code: {result.ticketNumber}
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle size={20} className="shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Entry Rejected</p>
                <p className="text-[11px] text-slate-400">{result.message}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
