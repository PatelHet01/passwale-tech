import { useState, useEffect } from 'react'
import { IndianRupee, CreditCard, Send, Check } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function AdminFinancialsPage() {
  const [financials, setFinancials] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFinancials()
  }, [])

  const fetchFinancials = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/financials')
      setFinancials(res.data.data)
    } catch (err) {
      toast.error('Failed to load financials')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading financials...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Platform GMV</span>
          <p className="text-3xl font-black text-slate-100 font-display">₹{financials.gmv || 0}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Commissions Collected</span>
          <p className="text-3xl font-black text-slate-100 font-display">₹{financials.platformRevenue?.toFixed(2) || 0}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Completed Payouts</span>
          <p className="text-3xl font-black text-slate-100 font-display">₹{financials.payouts?.completed || 0}</p>
        </div>
      </div>
    </div>
  )
}
