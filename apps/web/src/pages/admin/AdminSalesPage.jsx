import { Sparkles } from 'lucide-react'

export default function AdminSalesPage() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 pb-12 max-w-2xl mx-auto text-center">
      <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mx-auto">
        <Sparkles size={24} />
      </div>
      <h3 className="text-xl font-bold font-display text-slate-100">Sales Dashboard</h3>
      <p className="text-slate-400 text-xs max-w-xs mx-auto">
        Detailed platform sales charts, commission summaries and booking statistics.
      </p>
    </div>
  )
}
