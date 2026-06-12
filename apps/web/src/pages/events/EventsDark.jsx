import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/api';

const CHIPS = [
  { id:'all',       icon:'confirmation_number', label:'ALL',      color:'primary' },
  { id:'techno',    icon:'bolt',                label:'TECHNO',   color:'primary' },
  { id:'garba',     icon:'brightness_7',        label:'GARBA',    color:'secondary' },
  { id:'secret',    icon:'visibility_off',      label:'SECRET',   color:'on-surface-variant' },
  { id:'creative',  icon:'brush',               label:'CREATIVE', color:'on-surface-variant' },
  { id:'live',      icon:'speaker_group',       label:'LIVE',     color:'on-surface-variant' },
];

export default function EventsDark() {
  const [active, setActive] = useState('all');
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = {};
    if (active !== 'all') params.category = active;
    if (search) params.search = search;
    api.get('/events', { params }).then(r => setEvents(r.data?.data || [])).catch(() => {});
  }, [active, search]);

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden diagonal-stripes min-h-screen pb-32">

      {/* Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md shadow-xl">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary active:scale-95 duration-200 cursor-pointer">menu</span>
          <h1 className="font-display-xl text-headline-md md:text-display-xl text-secondary uppercase tracking-tighter">PASSWALE</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-sm">person</span>
        </div>
      </header>

      <main className="pt-24 px-grid-margin">
        {/* Sticky Glass Search */}
        <section className="sticky top-20 z-40 py-md">
          <div className="neomorphic-well rounded-xl flex items-center p-md gap-md border border-white/5 backdrop-blur-md">
            <span className="material-symbols-outlined text-outline">search</span>
            <input
              className="bg-transparent border-none outline-none text-on-surface w-full font-body-md placeholder:text-outline-variant"
              placeholder="Search techno, garba, or secret raves..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="material-symbols-outlined text-secondary cursor-pointer">tune</span>
          </div>
        </section>

        {/* Scene Chips */}
        <section className="mt-md">
          <div className="flex overflow-x-auto gap-md no-scrollbar py-sm">
            {CHIPS.map(chip => (
              <button
                key={chip.id}
                onClick={() => setActive(chip.id)}
                className={`flex-none flex items-center gap-sm px-lg py-sm rounded-full transition-all ${
                  active === chip.id
                    ? 'bg-primary-container border border-primary/30 opacity-100'
                    : 'bg-surface-variant border border-on-surface-variant/30 opacity-60 hover:opacity-100'
                }`}
              >
                <span className={`material-symbols-outlined text-${chip.color} ${active===chip.id?'clay-icon-shadow':''}`} style={{fontVariationSettings:"'FILL' 1"}}>{chip.icon}</span>
                <span className={`font-cta text-cta text-${chip.color} uppercase`}>{chip.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Event Poster Grid */}
        <section className="mt-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-grid-gutter mb-12">
          {events.length > 0 ? events.map(ev => (
            <Link key={ev._id} to={`/e/${ev.slug}`} className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-l-4 border-secondary group cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}>
              {ev.coverImage
                ? <img className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" src={ev.coverImage} alt={ev.title} />
                : <div className="absolute inset-0 bg-surface-container-high" />
              }
              {ev.ticketsLeft < 30 && (
                <div className="absolute top-md right-md bg-error px-md py-xs rounded-full flex items-center gap-xs shadow-lg">
                  <span className="text-on-error font-cta text-[12px] uppercase">🔥 {ev.ticketsLeft} left</span>
                </div>
              )}
              <div className="absolute bottom-0 w-full p-md bg-surface/60 backdrop-blur-md border-t border-white/10">
                <p className="font-label-mono text-[10px] text-secondary uppercase tracking-widest mb-xs">{ev.venue || 'Venue'} // {ev.city || ''}</p>
                <h3 className="font-headline-md text-[18px] text-white leading-tight uppercase mb-sm">{ev.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-cta text-secondary text-md">₹{ev.minPrice || '---'}</span>
                  <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_forward</span>
                </div>
              </div>
            </Link>
          )) : [
            { label:'Bunker 03 // BLR', title:'NEON VOID: ABX-7', price:'₹1,299', badge:'🔥 23 left', color:'primary' },
            { label:'Dandia Heights // AMD', title:'URBAN GARBA NIGHTS', price:'₹499', badge:'Sold 80%', color:'secondary' },
            { label:'The Glade // GOA', title:'ECHOES OF SILENCE', price:'₹2,500', badge:'🔥 5 left', color:'on-surface-variant' },
            { label:'Mainstage // DEL', title:'SYNTHETIC DREAMS', price:'₹1,800', badge:'', color:'primary' },
          ].map((ev, i) => (
            <div key={i} className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-l-4 border-${ev.color} group cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-surface-container-high`}>
              {ev.badge && (
                <div className="absolute top-md right-md bg-error px-md py-xs rounded-full flex items-center gap-xs shadow-lg">
                  <span className="text-on-error font-cta text-[12px] uppercase">{ev.badge}</span>
                </div>
              )}
              <div className="absolute bottom-0 w-full p-md bg-surface/60 backdrop-blur-md border-t border-white/10">
                <p className="font-label-mono text-[10px] text-secondary uppercase tracking-widest mb-xs">{ev.label}</p>
                <h3 className="font-headline-md text-[18px] text-white leading-tight uppercase mb-sm">{ev.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-cta text-secondary text-md">{ev.price}</span>
                  <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Floating Map Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <button className="clay-button bg-secondary text-on-secondary px-lg py-sm rounded-full flex items-center gap-sm font-cta uppercase tracking-widest">
          <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>map</span>
          Map View
        </button>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg rounded-t-xl border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-20 px-4">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant" to="/">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-mono text-label-mono">Home</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-secondary relative">
          <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>explore</span>
          <span className="font-label-mono text-label-mono">Explore</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full" />
        </div>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant" to="/dashboard/tickets">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-mono text-label-mono">Tickets</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant" to="/dashboard">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-mono text-label-mono">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
