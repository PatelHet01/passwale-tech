import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, MapPin, Sparkles, Flame, Check } from 'lucide-react'
import api from '@/services/api'
import useAuthStore from '@/stores/authStore'
import toast from 'react-hot-toast'

export default function SceneDetailPage() {
  const { slug } = useParams()
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const [data, setData] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    fetchSceneDetails()
  }, [slug])

  const fetchSceneDetails = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/scenes/${slug}`)
      setData(res.data.data)

      // Fetch leaderboard
      const leadRes = await api.get(`/scenes/${slug}/leaderboard`)
      setLeaderboard(leadRes.data.data || [])
    } catch (err) {
      toast.error('Scene details failed to load')
    } finally {
      setLoading(false)
    }
  }

  const joinScene = async () => {
    if (!token) {
      return toast.error('Please log in to join')
    }
    setJoining(true)
    try {
      const currentPrefs = user?.scenePreferences || []
      const sceneId = data.scene._id
      
      const newPrefs = currentPrefs.includes(sceneId)
        ? currentPrefs.filter(id => id !== sceneId)
        : [...currentPrefs, sceneId]

      await api.post('/scenes/select', { sceneIds: newPrefs })
      toast.success(currentPrefs.includes(sceneId) ? 'Left scene successfully' : 'Joined scene successfully!')
      
      // Update local store
      if (useAuthStore.getState().user) {
        useAuthStore.getState().user.scenePreferences = newPrefs
      }
      // Re-trigger fetch to sync
      fetchSceneDetails()
    } catch (err) {
      toast.error('Failed to update scene preferences')
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="text-slate-400 animate-pulse font-display">Loading scene details...</span>
      </div>
    )
  }

  if (!data) return null

  const { scene, events } = data
  const isJoined = user?.scenePreferences?.includes(scene._id)

  return (
    <div className="space-y-8 pb-12">
      {/* Cover Header */}
      <div className="relative h-[25vh] md:h-[30vh] rounded-3xl overflow-hidden border border-slate-900 bg-slate-900 flex items-end p-6 md:p-10">
        <img
          src={scene.coverImage || 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop'}
          alt={scene.name}
          className="absolute inset-0 object-cover w-full h-full opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="relative flex flex-col md:flex-row md:items-end justify-between w-full gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight" style={{ color: scene.color }}>
              {scene.name} Scene
            </h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              {scene.description || 'Welcome to the scene hub.'}
            </p>
          </div>

          <button
            onClick={joinScene}
            disabled={joining}
            style={{
              backgroundColor: isJoined ? 'transparent' : scene.color,
              borderColor: scene.color
            }}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all active:scale-95 flex items-center space-x-2 shrink-0 ${
              isJoined ? 'text-slate-300 bg-slate-950/20 border-slate-800' : 'text-slate-950 hover:opacity-90'
            }`}
          >
            {isJoined ? (
              <>
                <Check size={14} />
                <span>Joined Scene</span>
              </>
            ) : (
              <span>Join Scene</span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Events */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold font-display flex items-center space-x-2">
            <span>Upcoming Beats</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-semibold">
              {events.length} events
            </span>
          </h3>

          {events.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6">
              <p className="text-slate-500 text-sm">No events drops scheduled for this scene yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Link
                  key={event._id}
                  to={`/e/${event.slug}`}
                  className="group flex flex-col bg-slate-900 border border-slate-800 hover:border-slate-700/85 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-950 shrink-0">
                    <img
                      src={event.media?.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <h4 className="font-bold text-slate-200 group-hover:text-slate-100 transition-colors line-clamp-1">
                      {event.title}
                    </h4>
                    <div className="space-y-1 text-xs text-slate-500">
                      <p className="flex items-center space-x-1.5">
                        <Calendar size={13} />
                        <span>{new Date(event.dates?.start).toLocaleDateString()}</span>
                      </p>
                      <p className="flex items-center space-x-1.5">
                        <MapPin size={13} />
                        <span>{event.location?.venue || 'Venue'}, {event.location?.city || 'City'}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Leaderboard */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-display flex items-center space-x-2">
            <span>Scene Leaderboard</span>
            <Sparkles size={16} style={{ color: scene.color }} />
          </h3>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 divide-y divide-slate-800/80">
            {leaderboard.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-6">No check-ins recorded yet.</p>
            ) : (
              leaderboard.map((item) => (
                <div key={item.userId} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center space-x-3 truncate">
                    <span className="text-xs font-bold text-slate-500 w-4">{item.rank}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300 border border-slate-700">
                      {item.name?.charAt(0) || 'U'}
                    </div>
                    <span className="font-semibold text-xs text-slate-200 truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-amber-400 text-[10px] font-bold">
                      <Flame size={10} />
                      <span>{item.streak}x</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{item.score} pts</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
