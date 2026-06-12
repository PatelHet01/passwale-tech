import { useState, useEffect } from 'react'
import { Users, ShieldAlert, ShieldAlert as BlockIcon } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/users')
      setUsers(res.data.data || [])
    } catch (err) {
      toast.error('Failed to load users list')
    } finally {
      setLoading(false)
    }
  }

  const toggleBlockStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/admin/users/${id}/block`, {
        isBlocked: !currentStatus,
        blockReason: !currentStatus ? 'Violation of terms' : ''
      })
      toast.success(currentStatus ? 'Account unblocked!' : 'Account blocked successfully!')
      fetchUsers()
    } catch (err) {
      toast.error('Block operation failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading users...</span>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 pb-12">
      <div>
        <h3 className="text-xl font-bold font-display text-slate-100">User Administry</h3>
        <p className="text-xs text-slate-400 mt-0.5">Approve organizer credentials or suspend users</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-400">
          <thead>
            <tr className="border-b border-slate-800/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-2.5">Name</th>
              <th className="py-2.5">Email</th>
              <th className="py-2.5">Roles</th>
              <th className="py-2.5">Status</th>
              <th className="py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="py-3.5 font-semibold text-slate-300">{u.name}</td>
                <td className="py-3.5 text-slate-400">{u.email}</td>
                <td className="py-3.5 font-medium text-slate-500 capitalize">{u.roles?.join(', ')}</td>
                <td className="py-3.5">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    u.isBlocked
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {u.isBlocked ? 'suspended' : 'active'}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => toggleBlockStatus(u._id, u.isBlocked)}
                    className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg border transition-all active:scale-95 ${
                      u.isBlocked
                        ? 'border-emerald-600/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40'
                        : 'border-rose-600/30 text-rose-400 bg-rose-950/20 hover:bg-rose-950/40'
                    }`}
                  >
                    {u.isBlocked ? 'Reactivate' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
