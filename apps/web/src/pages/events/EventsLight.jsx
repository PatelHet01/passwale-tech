import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/api';

const CATEGORIES = [
  { id:'all', label:'All Events' },
  { id:'techno', label:'Techno' },
  { id:'garba', label:'Garba' },
  { id:'bollywood', label:'Bollywood' },
  { id:'comedy', label:'Comedy' },
  { id:'startup', label:'Startup' },
];

export default function EventsLight() {
  const [active, setActive] = useState('all');
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    const params = { sort };
    if (active !== 'all') params.category = active;
    if (search) params.search = search;
    api.get('/events', { params }).then(r => setEvents(r.data?.data || [])).catch(() => {});
  }, [active, search, sort]);

  const placeholders = [
    { title:'Techno Bunker Marathon', cat:'techno', city:'Mumbai', date:'28 Oct', price:'₹1,299', venue:'Bunker 03' },
    { title:'Nav-Rang Garba Nights', cat:'garba', city:'Ahmedabad', date:'15 Nov', price:'₹499', venue:'Dandia Heights' },
    { title:'Bollywood Retro Blaze', cat:'bollywood', city:'Bengaluru', date:'02 Dec', price:'₹799', venue:'Royal Orchid' },
    { title:'Founder Focus Summit', cat:'startup', city:'Delhi', date:'10 Dec', price:'₹1,500', venue:'The Shard' },
    { title:'Standup Open Mic', cat:'comedy', city:'Mumbai', date:'20 Dec', price:'₹350', venue:'Canvas Laugh Club' },
    { title:'Secret Rave: Echoes', cat:'techno', city:'Goa', date:'24 Dec', price:'₹2,500', venue:'The Glade' },
  ];

  const displayed = events.length > 0 ? events : placeholders.filter(e => active === 'all' || e.cat === active);

  return (
    <div className="min-h-screen bg-background text-on-background">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-4 border-primary shadow-[0px_4px_0px_0px_rgba(4,7,17,1)] flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display-lg text-headline-md uppercase text-primary font-black">PASSWALE</Link>
        </div>
        <div className="relative flex-1 max-w-md mx-8">
          <input
            className="w-full border-2 border-primary bg-surface-container-low px-4 py-2 pr-10 font-label-bold text-sm placeholder:text-on-primary-container focus:outline-none focus:ring-2 focus:ring-secondary-container"
            placeholder="Search events, artists, venues..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary">search</span>
        </div>
        <div className="flex items-center gap-3">
          <select onChange={e => setSort(e.target.value)} value={sort} className="border-2 border-primary bg-surface-container-low px-3 py-2 font-label-bold text-sm focus:outline-none">
            <option value="date">By Date</option>
            <option value="price">By Price</option>
            <option value="popular">Popular</option>
          </select>
          <Link to="/dashboard/tickets" className="border-2 border-primary bg-secondary-container px-4 py-2 font-label-bold text-sm neo-shadow neo-button-press uppercase hidden md:block">
            My Passes
          </Link>
        </div>
      </header>

      <div className="px-margin-mobile md:px-margin-desktop pt-8">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 border-b-2 border-primary">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`flex-none px-6 py-3 font-label-bold text-sm uppercase transition-all border-b-4 -mb-[2px] ${
                active === c.id
                  ? 'border-primary bg-secondary-container text-primary'
                  : 'border-transparent text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
          {displayed.map((ev, i) => (
            <Link key={ev._id || i} to={ev.slug ? `/e/${ev.slug}` : '/events'} className="group bg-white border-2 border-primary neo-shadow hover:-translate-y-1 transition-transform overflow-hidden flex flex-col">
              <div className="h-48 border-b-2 border-primary relative overflow-hidden bg-surface-container-high">
                {ev.coverImage && <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={ev.coverImage} alt={ev.title} />}
                {!ev.coverImage && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/20 text-6xl">confirmation_number</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase">{ev.category || ev.cat || 'Event'}</span>
                {(ev.ticketsLeft < 30 || false) && (
                  <span className="absolute top-2 right-2 bg-error text-white text-[10px] font-bold px-2 py-1">🔥 {ev.ticketsLeft} left</span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md uppercase mb-1 leading-tight">{ev.title}</h3>
                  <p className="text-sm font-bold text-on-primary-container uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {ev.venue || ev.city || ''}
                  </p>
                  <p className="text-xs font-bold text-on-primary-container uppercase mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {ev.date ? new Date(ev.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : ev.date || ''}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-black text-primary text-lg">{ev.price ? `₹${ev.price}` : ev.minPrice ? `₹${ev.minPrice}` : '---'}</span>
                  <span className="text-xs font-bold uppercase text-primary border-2 border-primary px-3 py-1 neo-shadow-sm neo-button-press">Book →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
