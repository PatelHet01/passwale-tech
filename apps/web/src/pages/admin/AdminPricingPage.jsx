import { useState, useEffect } from 'react'
import { FileCode2, Info, RefreshCw } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function AdminPricingPage() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Live simulation states
  const [testBasePrice, setTestBasePrice] = useState(1000)
  const [simulatedPlatformFee, setSimulatedPlatformFee] = useState(3.69)

  useEffect(() => {
    fetchPricingSettings()
  }, [])

  const fetchPricingSettings = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/pricing')
      setSettings(res.data.data)
      setSimulatedPlatformFee(res.data.data?.platformFee || 3.69)
    } catch (err) {
      toast.error('Failed to load pricing configurations')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSetting = (field, val) => {
    setSettings(prev => ({
      ...prev,
      [field]: val
    }))
    if (field === 'platformFee') {
      setSimulatedPlatformFee(parseFloat(val))
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.patch('/admin/pricing', settings)
      toast.success('Pricing configurations successfully saved!')
      fetchPricingSettings()
    } catch (err) {
      toast.error('Failed to save settings')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading configurations...</span>
      </div>
    )
  }

  // Calculate live preview metrics
  const afterDiscount = testBasePrice // Simplify mock for preview
  const feeAmount = afterDiscount * (simulatedPlatformFee / 100)
  const simulatedTotal = afterDiscount + feeAmount

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
      {/* Form editor */}
      <form onSubmit={handleSave} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100">Fee Configuration</h3>
          <p className="text-xs text-slate-400 mt-0.5">Control global platform rates and card pricing metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Platform Fee (%)</label>
            <input
              type="number"
              step="0.01"
              value={settings.platformFee}
              onChange={e => handleUpdateSetting('platformFee', parseFloat(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 focus:outline-none focus:border-red-500 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Volunteer Brokerage Fee (%)</label>
            <input
              type="number"
              value={settings.volunteerFeePercent}
              onChange={e => handleUpdateSetting('volunteerFeePercent', parseInt(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 focus:outline-none focus:border-red-500 text-sm"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">PassCard Pricing</label>
          <div className="grid grid-cols-2 gap-4 bg-slate-950/40 border border-slate-800 p-4 rounded-2xl">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Plus Tier Monthly (₹)</p>
              <input
                type="number"
                value={settings.cardPricing?.plus?.monthly || 199}
                onChange={e => {
                  const updated = { ...settings.cardPricing }
                  updated.plus.monthly = parseInt(e.target.value)
                  handleUpdateSetting('cardPricing', updated)
                }}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2.5 px-3 mt-1.5 text-xs text-slate-200"
              />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Pro Tier Monthly (₹)</p>
              <input
                type="number"
                value={settings.cardPricing?.pro?.monthly || 599}
                onChange={e => {
                  const updated = { ...settings.cardPricing }
                  updated.pro.monthly = parseInt(e.target.value)
                  handleUpdateSetting('cardPricing', updated)
                }}
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2.5 px-3 mt-1.5 text-xs text-slate-200"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {submitting ? 'Saving settings...' : 'Update Settings'}
          </button>
        </div>
      </form>

      {/* Live Preview panel */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
            <Info size={16} className="text-red-400" />
            <span>Pricing Simulator</span>
          </h4>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Simulate Ticket Base Price
              </label>
              <input
                type="number"
                value={testBasePrice}
                onChange={e => setTestBasePrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-red-500 text-xs"
              />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Base Price</span>
                <span>₹{testBasePrice}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Platform Fee ({simulatedPlatformFee}%)</span>
                <span>₹{feeAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2.5 border-t border-slate-800 flex justify-between font-bold text-slate-200 text-sm">
                <span>Attendee Pays</span>
                <span>₹{simulatedTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
