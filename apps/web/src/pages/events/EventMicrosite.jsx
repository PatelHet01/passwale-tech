import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Calendar, MapPin, Sparkles, X, ChevronRight, CheckCircle2, QrCode } from 'lucide-react'
import api from '@/services/api'
import useAuthStore from '@/stores/authStore'
import toast from 'react-hot-toast'

export default function EventMicrosite() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Booking modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalStep, setModalStep] = useState(1) // 1: Select Category, 2: Review Breakdown, 3: Success
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [attendeeNames, setAttendeeNames] = useState([''])
  const [pricingBreakdown, setPricingBreakdown] = useState(null)
  const [calculating, setCalculating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [purchasedTickets, setPurchasedTickets] = useState([])

  useEffect(() => {
    fetchEventDetails()
  }, [slug])

  const fetchEventDetails = async () => {
    setLoading(true)
    try {
      const ref = searchParams.get('ref') || ''
      const res = await api.get(`/events/slug/${slug}?ref=${ref}`)
      setEvent(res.data.data)
    } catch (err) {
      toast.error('Event not found')
      navigate('/events')
    } finally {
      setLoading(false)
    }
  }

  const openBookingModal = () => {
    if (!token) {
      toast.error('Please log in to purchase tickets')
      navigate(`/login?redirect=/e/${slug}`)
      return
    }
    if (event?.ticketCategories?.length > 0) {
      setSelectedCategory(event.ticketCategories[0])
      setTicketQuantity(1)
      setAttendeeNames([''])
      setModalStep(1)
      setIsModalOpen(true)
    } else {
      toast.error('No tickets available')
    }
  }

  const handleQuantityChange = (val) => {
    setTicketQuantity(val)
    setAttendeeNames(Array(val).fill('').map((_, i) => attendeeNames[i] || ''))
  }

  const handleAttendeeNameChange = (index, value) => {
    const updated = [...attendeeNames]
    updated[index] = value
    setAttendeeNames(updated)
  }

  const fetchPricingBreakdown = async () => {
    setCalculating(true)
    try {
      const res = await api.post('/pricing/calculate', {
        eventId: event._id,
        categoryId: selectedCategory._id,
        userId: user?._id,
        quantity: ticketQuantity
      })
      setPricingBreakdown(res.data.data)
      setModalStep(2)
    } catch (err) {
      toast.error('Failed to calculate pricing')
    } finally {
      setCalculating(false)
    }
  }

  const executePurchase = async () => {
    setSubmitting(true)
    try {
      const res = await api.post('/tickets/purchase', {
        eventId: event._id,
        categoryId: selectedCategory._id,
        quantity: ticketQuantity,
        attendeeNames
      })
      
      setPurchasedTickets(res.data.data.tickets || [])
      setModalStep(3)
      toast.success('Tickets purchased successfully!')
    } catch (err) {
      toast.error(err.response?.data?.error?.message || 'Checkout failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display text-lg">Loading event details...</span>
      </div>
    )
  }

  if (!event) return null

  const primaryScene = event.scenes?.[0] || {}

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28">
      {/* Hero Header Cover */}
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-slate-900 border-b border-slate-900 overflow-hidden">
        <img
          src={event.media?.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop'}
          alt={event.title}
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 max-w-4xl mx-auto space-y-2">
          {primaryScene.name && (
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-slate-950" style={{ backgroundColor: primaryScene.color }}>
              {primaryScene.name}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Body */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-lg font-display">About Event</h3>
            <div
              className="text-slate-400 text-sm leading-relaxed prose prose-invert"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-lg font-display">Organizer Details</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                {event.organizer?.name?.charAt(0) || 'O'}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-200">{event.organizer?.name}</p>
                <p className="text-xs text-slate-500">Host, verified organizer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick info & sticky card */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider">Event Information</h4>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <Calendar className="text-slate-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-slate-100">Date & Time</p>
                  <p className="text-slate-400 mt-0.5">
                    {new Date(event.dates?.start).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="text-slate-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-slate-100">Venue</p>
                  <p className="text-slate-400 mt-0.5">{event.location?.venue}</p>
                  <p className="text-slate-500 mt-0.5">{event.location?.address}</p>
                </div>
              </div>
            </div>

            <button
              onClick={openBookingModal}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 font-display"
            >
              Get Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Booking Sheet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-end md:items-center justify-center z-50 px-0 md:px-6">
          <div className="w-full md:max-w-md bg-slate-900 border-t md:border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
            >
              <X size={20} />
            </button>

            {modalStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-100">Select Tickets</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Choose your category and quantity</p>
                </div>

                <div className="space-y-3">
                  {event.ticketCategories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                        selectedCategory?._id === cat._id
                          ? 'bg-blue-600/10 border-blue-500'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-sm text-slate-200">{cat.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{cat.description || 'General pass'}</p>
                        {cat.passwaleCardBenefits?.enabled && (
                          <span className="inline-flex items-center space-x-1 text-[10px] text-blue-400 font-semibold mt-1">
                            <Sparkles size={10} />
                            <span>Card Benefits Eligible</span>
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-slate-100 text-sm">₹{cat.price}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center space-x-3 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                    <button
                      onClick={() => handleQuantityChange(Math.max(1, ticketQuantity - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-slate-100"
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-200 text-sm w-4 text-center">{ticketQuantity}</span>
                    <button
                      onClick={() => handleQuantityChange(Math.min(10, ticketQuantity + 1))}
                      className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-300 hover:text-slate-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={fetchPricingBreakdown}
                  disabled={calculating}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg disabled:opacity-50 font-display"
                >
                  {calculating ? 'Calculating price...' : 'Continue to Checkout'}
                </button>
              </div>
            )}

            {modalStep === 2 && pricingBreakdown && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-100">Review Summary</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Please fill attendee info and review price breakdown</p>
                </div>

                {/* Attendee Name inputs */}
                <div className="space-y-3 max-h-32 overflow-y-auto pr-1">
                  {[...Array(ticketQuantity)].map((_, i) => (
                    <div key={i}>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Attendee {i + 1} Name
                      </label>
                      <input
                        type="text"
                        value={attendeeNames[i] || ''}
                        onChange={(e) => handleAttendeeNameChange(i, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                        placeholder="Full name"
                      />
                    </div>
                  ))}
                </div>

                {/* Pricing Table */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Ticket (x{ticketQuantity})</span>
                    <span>₹{pricingBreakdown.subtotal}</span>
                  </div>
                  {pricingBreakdown.discount > 0 && (
                    <div className="flex justify-between text-blue-400 font-medium">
                      <span className="flex items-center space-x-1">
                        <Sparkles size={11} />
                        <span>PassCard Tier Discount</span>
                      </span>
                      <span>-₹{pricingBreakdown.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Platform Fee (3.69%)</span>
                    <span>₹{pricingBreakdown.platformFeeAmount?.toFixed(2)}</span>
                  </div>
                  <div className="pt-2.5 border-t border-slate-800 flex justify-between font-bold text-slate-200 text-sm">
                    <span>Total Amount</span>
                    <span>₹{pricingBreakdown.total?.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={executePurchase}
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg disabled:opacity-50 font-display"
                >
                  {submitting ? 'Processing payment...' : 'Pay & Complete'}
                </button>
              </div>
            )}

            {modalStep === 3 && (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-display text-slate-100">Booking Confirmed!</h3>
                  <p className="text-slate-400 text-xs max-w-xs mx-auto">
                    Your purchase has been recorded. Your tickets are active and loaded in your Wallet.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center space-y-3">
                  <QrCode size={120} className="text-slate-300" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                    Dynamic QR expires in 30s
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(false)
                    navigate('/dashboard/tickets')
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all"
                >
                  Go to Ticket Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
