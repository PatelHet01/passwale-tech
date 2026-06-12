import { useState, useEffect } from 'react'
import { History, ShieldAlert } from 'lucide-react'
import api from '@/services/api'

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuditLogs()
  }, [])

  const fetchAuditLogs = async () => {
    try {
      const res = await api.get('/admin/audit-logs')
      setLogs(res.data.data || [])
    } catch (err) {
      console.error('Failed to load audit logs')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading audit logs...</span>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 pb-12">
      <div>
        <h3 className="text-xl font-bold font-display text-slate-100">Audit Trails</h3>
        <p className="text-xs text-slate-400 mt-0.5">Every administrative action logged with details</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-400">
          <thead>
            <tr className="border-b border-slate-800/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5">Administrator</th>
              <th className="py-2.5">Action</th>
              <th className="py-2.5">Target</th>
              <th className="py-2.5">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="py-3 font-semibold text-slate-300">{log.adminId?.name || 'Admin'}</td>
                <td className="py-3 font-mono text-xs text-purple-400">{log.action}</td>
                <td className="py-3 text-slate-400">{log.targetType}</td>
                <td className="py-3 text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
