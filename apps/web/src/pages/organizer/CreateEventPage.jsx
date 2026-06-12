import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, HelpCircle, Sparkles } from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'

export default function CreateEventPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [scenes, setScenes] = useState([])
  const [loading, setLoading] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [selectedScene, setSelectedScene] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [venue, setVenue] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Bengaluru')
  const [coverUrl, setCoverUrl] = useState('')
  const [categories, setCategories] = useState([
    { name: 'General Entry', price: 499, quantity: 100, isSquadPass: false }
  ])

  useEffect(() => {
    fetchScenes()
    if (id) {
      fetchEventData()
    }
  }, [id])

  const fetchScenes = async () => {
    try {
      const res = await api.get('/scenes')
      setScenes(res.data.data || [])
    } catch (err) {
      console.error('Failed to load scenes')
    }
  }

  const fetchEventData = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/events/slug/${id}`)
      const ev = res.data.data
      setTitle(ev.title)
      setShortDescription(ev.shortDescription)
      setDescription(ev.description)
      setSelectedScene(ev.scenes?.[0]?._id || '')
      setStartDate(ev.dates?.start ? ev.dates.start.split('T')[0] : '')
      setEndDate(ev.dates?.end ? ev.dates.end.split('T')[0] : '')
      setVenue(ev.location?.venue)
      setAddress(ev.location?.address)
      setCity(ev.location?.city)
      setCoverUrl(ev.media?.cover)
      setCategories(ev.ticketCategories || [])
    } catch (err) {
      toast.error('Failed to load event for edit')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (step === 1 && (!title || !selectedScene)) {
      return toast.error('Please enter title and select a cultural scene')
    }
    if (step === 2 && (!startDate || !venue)) {
      return toast.error('Please enter start date and venue address')
    }
    setStep(s => s + 1)
  }

  const handleBack = () => {
    setStep(s => s - 1)
  }

  const handleCategoryChange = (index, field, value) => {
    const updated = [...categories]
    updated[index][field] = value
    setCategories(updated)
  }

  const addCategory = () => {
    setCategories([...categories, { name: 'VIP Pass', price: 999, quantity: 50, isSquadPass: false }])
  }

  const removeCategory = (idx) => {
    if (categories.length === 1) return toast.error('Must have at least one ticket category')
    setCategories(categories.filter((_, i) => i !== idx))
  }

  const saveEvent = async (publish = false) => {
    setLoading(true)
    try {
      const payload = {
        title,
        shortDescription,
        description,
        scenes: selectedScene ? [selectedScene] : [],
        dates: { start: new Date(startDate), end: endDate ? new Date(endDate) : new Date(startDate) },
        location: {
          type: 'physical',
          venue,
          address,
          city,
          coordinates: [77.5946, 12.9716] // Mock coordinates
        },
        media: { cover: coverUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop' },
        ticketCategories: categories.map(c => ({
          ...c,
          passwaleCardBenefits: {
            enabled: true,
            plus: { discount: 10, earlyAccessHours: 24 },
            pro: { discount: 20, earlyAccessHours: 48 },
            black: { discount: 30, earlyAccessHours: 72 }
          }
        }))
      }

      let eventId = id
      if (id) {
        await api.patch(`/events/${id}`, payload)
      } else {
        const res = await api.post('/events', payload)
        eventId = res.data.data._id
      }

      if (publish) {
        await api.post(`/events/${eventId}/publish`)
        toast.success('Event published successfully!')
      } else {
        toast.success('Event draft saved successfully!')
      }

      navigate('/organizer/events')
    } catch (err) {
      toast.error(err.response?.data?.error?.message || 'Failed to save event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto pb-12 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <h3 className="text-xl font-bold font-display text-slate-100">
          {id ? 'Edit Event' : 'Create Event Wizard'}
        </h3>
        <span className="text-xs text-slate-500 font-semibold">Step {step} of 3</span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              placeholder="e.g. Techno Warehouse Fusion"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Short Summary</label>
            <input
              type="text"
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              placeholder="Short description under 150 characters"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">About Details (Rich text/HTML)</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows="4"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              placeholder="Provide a detailed description of the event drops"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Cultural Scene Segment</label>
            <select
              value={selectedScene}
              onChange={e => setSelectedScene(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-300 focus:outline-none focus:border-purple-500 text-sm"
            >
              <option value="">Select a scene...</option>
              {scenes.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all text-sm mt-4"
          >
            <span>Next Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-300 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-300 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Venue Name</label>
            <input
              type="text"
              value={venue}
              onChange={e => setVenue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              placeholder="e.g. Club Indigo Loft"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Street Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              placeholder="Full physical street address"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Cover Image URL</label>
            <input
              type="text"
              value={coverUrl}
              onChange={e => setCoverUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-100 placeholder-slate-600 focus:border-purple-500 focus:outline-none transition-colors text-sm"
              placeholder="Unsplash WebP / S3 cover url"
            />
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-1 px-4 py-3 rounded-xl border border-slate-800 text-slate-300 font-semibold text-xs uppercase"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all text-sm"
            >
              <span>Next Tickets</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket Categories</label>
              <button
                onClick={addCategory}
                className="text-xs text-purple-400 hover:underline font-bold"
              >
                + Add Category
              </button>
            </div>

            {categories.map((cat, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 relative">
                <button
                  onClick={() => removeCategory(idx)}
                  className="absolute top-2 right-3 text-slate-500 hover:text-rose-400 text-xs"
                >
                  Remove
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-500 block">Name</label>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={e => handleCategoryChange(idx, 'name', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block">Price (₹)</label>
                    <input
                      type="number"
                      value={cat.price}
                      onChange={e => handleCategoryChange(idx, 'price', parseFloat(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block">Total Capacity</label>
                  <input
                    type="number"
                    value={cat.quantity}
                    onChange={e => handleCategoryChange(idx, 'quantity', parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2.5 text-xs text-slate-200"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-purple-950/20 border border-purple-900/30 p-4 rounded-2xl flex items-start space-x-2 text-xs text-purple-400">
            <Sparkles size={14} className="shrink-0 mt-0.5" />
            <span>
              PassCard loyalty benefits (10% to 30% discounts) will be automatically configured for each tier when saving.
            </span>
          </div>

          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-1 px-4 py-3 rounded-xl border border-slate-800 text-slate-300 font-semibold text-xs uppercase"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
            <button
              onClick={() => saveEvent(false)}
              disabled={loading}
              className="flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-850 text-slate-300 font-bold transition-all text-sm disabled:opacity-50"
            >
              <Save size={16} />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => saveEvent(true)}
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold transition-all text-sm disabled:opacity-50"
            >
              Publish Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
