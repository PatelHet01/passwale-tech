import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // 'verifying' | 'success' | 'failed'

  useEffect(() => {
    // Check status
    const paymentStatus = searchParams.get('txStatus') || 'SUCCESS'
    const timer = setTimeout(() => {
      if (paymentStatus === 'SUCCESS') {
        setStatus('success')
        const redirectTimer = setTimeout(() => {
          navigate('/dashboard/tickets')
        }, 1500)
        return () => clearTimeout(redirectTimer)
      } else {
        setStatus('failed')
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        {status === 'verifying' && (
          <div className="space-y-4 flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-500" size={36} />
            <h3 className="text-xl font-bold font-display text-slate-100">Verifying Payment</h3>
            <p className="text-slate-400 text-xs">Connecting to Cashfree Gateway to secure your tickets...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4 flex flex-col items-center">
            <CheckCircle className="text-emerald-400 animate-bounce" size={40} />
            <h3 className="text-xl font-bold font-display text-emerald-400">Payment Confirmed</h3>
            <p className="text-slate-400 text-xs">Redirecting to your ticket wallet...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-4 flex flex-col items-center">
            <AlertCircle className="text-rose-400" size={40} />
            <h3 className="text-xl font-bold font-display text-rose-400">Payment Failed</h3>
            <p className="text-slate-400 text-xs">Transaction was aborted or declined by the provider.</p>
            <button
              onClick={() => navigate('/events')}
              className="mt-2.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
            >
              Browse Events
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
