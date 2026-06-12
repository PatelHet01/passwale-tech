import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShieldCheck, Loader2 } from 'lucide-react'

export default function VerifyEmailPage() {
  const { token } = useParams()
  const [verifying, setVerifying] = useState(true)

  useEffect(() => {
    // Mimic API confirmation
    const timer = setTimeout(() => {
      setVerifying(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [token])

  return (
    <div className="w-full max-w-[448px] bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl text-center">
      {verifying ? (
        <div className="space-y-4 py-8 flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500" size={36} />
          <h2 className="text-xl font-bold font-display text-slate-200">Verifying Email...</h2>
          <p className="text-slate-500 text-sm">Please wait while we validate your activation token</p>
        </div>
      ) : (
        <div className="space-y-6 py-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-slate-100">Verification Successful</h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Your email has been verified. You can now access all attendee features.
            </p>
          </div>
          <Link
            to="/login"
            className="w-full max-w-xs py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg block mx-auto text-sm"
          >
            Go to Sign In
          </Link>
        </div>
      )}
    </div>
  )
}
