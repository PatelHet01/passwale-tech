import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, DollarSign, Eye, ArrowLeft, Download, UserCheck2 } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function EventAnalyticsPage() {
  const { id } = useParams()
  const [analytics, setAnalytics] = useState(null)
  const [attendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(true)

  const COLORS = ['#6D28D9', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

  useEffect(() => {
    fetchAnalytics()
  }, [id])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/organizer/events/${id}/analytics`)
      setAnalytics(res.data.data)

      const attRes = await api.get(`/organizer/events/${id}/attendees`)
      setAttendees(attRes.data.data || [])
    } catch (err) {
      toast.error('Failed to load event statistics')
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    // Navigate straight to download endpoint
    const url = `${api.defaults.baseURL}/organizer/events/${id}/attendees/export`
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading analytics...</span>
      </div>
    )
  }

  const pieData = Object.entries(analytics?.trafficSources || {}).map(([key, val]) => ({
    name: key.toUpperCase(),
    value: val
  })).filter(item => item.value > 0)

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center space-x-3">
        <Link to="/organizer/events" className="text-slate-500 hover:text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h3 className="text-lg font-bold font-display text-slate-200">Event Performance Analysis</h3>
          <p className="text-xs text-slate-500">Track page interactions, check-ins and traffic drivers</p>
        </div>
      </div>

      {/* Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Page views', value: analytics?.views || 0, icon: Eye, color: 'text-blue-400' },
          { label: 'Passes Sold', value: analytics?.ticketsSold || 0, icon: UserCheck2, color: 'text-purple-400' },
          { label: 'Gross Revenue', value: `₹${analytics?.grossRevenue || 0}`, icon: DollarSign, color: 'text-emerald-400' },
          { label: 'Net Organizer Share', value: `₹${analytics?.netRevenue?.toFixed(2) || 0}`, icon: DollarSign, color: 'text-amber-400' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{kpi.label}</span>
                <p className="text-2xl font-black text-slate-100 font-display">{kpi.value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                <Icon size={18} className={kpi.color} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Traffic Pie Chart & Attendees list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pie */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div>
            <h4 className="font-bold text-slate-200 font-display text-sm">Traffic Acquisition Channels</h4>
            <p className="text-[10px] text-slate-500">Referral UTM distribution</p>
          </div>
          <div className="h-48 flex justify-center">
            {pieData.length === 0 ? (
              <p className="text-slate-500 text-xs self-center">No traffic logs recorded yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 justify-center">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendees List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200 font-display text-sm">Roster list</h4>
              <p className="text-[10px] text-slate-500">Check-in statuses and categories</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="text-xs flex items-center space-x-1 border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg transition-colors font-semibold"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto pr-1">
            <table className="w-full text-left text-xs text-slate-400">
              <thead>
                <tr className="border-b border-slate-800/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5">Holder Name</th>
                  <th className="py-2.5">Pass Code</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {attendees.map((att) => (
                  <tr key={att._id}>
                    <td className="py-3 font-semibold text-slate-300">{att.holderName}</td>
                    <td className="py-3 font-mono text-slate-500">{att.ticketNumber}</td>
                    <td className="py-3">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        att.status === 'used'
                          ? 'bg-slate-950 text-slate-500 border border-slate-800'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
