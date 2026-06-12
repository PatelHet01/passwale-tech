import { useIsDark } from '@/hooks/useIsDark';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/services/api';

export default function MyTicketsPage() {
  const isDark = useIsDark();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get('/tickets/my').then(r => setTickets(r.data?.data || [])).catch(() => {});
  }, []);

  if (isDark) return <TicketsDark tickets={tickets} />;
  return <TicketsLight tickets={tickets} />;
}

function TicketsDark({ tickets }) {
  const placeholder = {
    eventTitle: 'BUNKER BLIZZARD 4.0',
    scene: 'TECHNO SCENE',
    venue: 'Warehouse 7, Ballard Estate, Mumbai',
    date: 'Friday, 24 NOV • 22:00 IST',
    ticketId: '#PW-2024-BLZ',
    tier: 'VIP BACKSTAGE',
  };
  const t = tickets[0] || placeholder;

  return (
    <div className="min-h-screen bg-surface text-on-surface diagonal-stripes flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md">
        <div className="flex items-center gap-md">
          <button><span className="material-symbols-outlined text-primary">menu</span></button>
          <h1 className="font-display-xl text-headline-md text-secondary uppercase tracking-tighter">PASSWALE</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-sm">person</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-grid-margin">
        {tickets.length > 0 ? (
          <div className="space-y-lg w-full max-w-4xl">
            {tickets.map((tk) => <TicketCard key={tk._id} ticket={tk} />)}
          </div>
        ) : (
          <SkeuomorphicTicket ticket={t} />
        )}
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg rounded-t-xl border-t border-white/10 flex justify-around items-center h-20 px-4">
        <Link className="flex flex-col items-center text-on-surface-variant" to="/"><span className="material-symbols-outlined">home</span><span className="font-label-mono text-[10px]">Home</span></Link>
        <Link className="flex flex-col items-center text-on-surface-variant" to="/events"><span className="material-symbols-outlined">explore</span><span className="font-label-mono text-[10px]">Explore</span></Link>
        <div className="flex flex-col items-center text-secondary relative">
          <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>confirmation_number</span>
          <span className="font-label-mono text-[10px]">Tickets</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full" />
        </div>
        <Link className="flex flex-col items-center text-on-surface-variant" to="/dashboard"><span className="material-symbols-outlined">person</span><span className="font-label-mono text-[10px]">Profile</span></Link>
      </nav>
    </div>
  );
}

function SkeuomorphicTicket({ ticket }) {
  return (
    <div className="relative w-full max-w-4xl group hover:rotate-1 transition-transform duration-500 cursor-default">
      <div className="absolute inset-0 bg-black/40 blur-2xl translate-y-6 scale-95 rounded-xl" />
      <div className="relative paper-texture w-full flex flex-col md:flex-row overflow-hidden rounded-xl shadow-2xl border border-on-tertiary-fixed-variant/20">
        <div className="relative flex-grow p-lg flex flex-col justify-between min-h-[300px]">
          <div className="flex gap-lg">
            <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-black/10 shadow-inner bg-surface-container-high" />
            <div className="flex flex-col justify-center">
              <span className="bg-secondary/20 text-secondary border border-secondary px-3 py-1 rounded-full w-fit font-cta text-xs mb-sm">{ticket.scene || 'SCENE'}</span>
              <h2 className="font-headline-lg text-headline-lg text-black uppercase leading-tight mb-xs">{ticket.eventTitle || ticket.event?.title}</h2>
              <p className="font-label-mono text-black/60 flex items-center gap-xs uppercase">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                {ticket.date || ticket.event?.date || ''}
              </p>
            </div>
          </div>
          <div className="mt-xl flex justify-between items-end">
            <div>
              <p className="font-label-mono text-black/40 uppercase text-xs mb-unit">VENUE</p>
              <p className="font-headline-md text-black uppercase">{ticket.venue || ticket.event?.venue}</p>
            </div>
            <div className="ticket-stamp border-4 px-4 py-2 rounded-lg pointer-events-none select-none">
              <span className="text-3xl font-display-xl tracking-widest uppercase">ADMIT ONE</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-4 shimmer-strip opacity-90" />
        </div>
        <div className="hidden md:flex flex-col items-center justify-center py-xl px-xs relative z-10">
          <div className="w-8 h-8 bg-surface rounded-full -mt-10 -ml-4" />
          <div className="perforation w-1 h-full opacity-20" />
          <div className="w-8 h-8 bg-surface rounded-full -mb-10 -ml-4" />
        </div>
        <div className="w-full md:w-48 bg-secondary-fixed-dim/30 p-lg flex flex-col items-center justify-center gap-md">
          <div className="bg-white p-4 rounded-xl shadow-inner">
            <div className="w-32 h-32 bg-surface-container-highest grid grid-cols-8 gap-0.5 p-2">
              {[...Array(64)].map((_, i) => (
                <div key={i} className={`${Math.random()>0.5?'bg-secondary':'bg-surface-variant'} rounded-sm`} />
              ))}
            </div>
          </div>
          <p className="font-label-mono text-xs text-black/60 uppercase">TIER</p>
          <p className="font-cta text-black font-bold uppercase">{ticket.tier || 'GA'}</p>
          <p className="font-label-mono text-[10px] text-black/40 uppercase">{ticket.ticketId || ticket._id}</p>
        </div>
      </div>
    </div>
  );
}

function TicketCard({ ticket }) {
  return (
    <div className="bg-surface-container-high border border-white/10 rounded-2xl p-lg flex gap-lg">
      <div className="w-20 h-20 rounded-xl bg-primary-container flex-shrink-0" />
      <div className="flex-1">
        <h3 className="font-headline-md text-white uppercase mb-xs">{ticket.event?.title}</h3>
        <p className="font-label-mono text-[10px] text-secondary uppercase">{ticket.event?.venue}</p>
        <p className="font-label-mono text-[10px] text-on-surface-variant mt-sm">{ticket.tier} • {ticket.ticketId}</p>
      </div>
      <div className="text-right">
        <span className={`px-3 py-1 rounded-full font-cta text-[10px] uppercase ${ticket.used?'bg-surface-variant text-outline':'bg-secondary/20 text-secondary border border-secondary'}`}>
          {ticket.used ? 'Used' : 'Valid'}
        </span>
      </div>
    </div>
  );
}

function TicketsLight({ tickets }) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <header className="sticky top-0 z-50 bg-background border-b-4 border-primary px-margin-mobile py-4 flex items-center justify-between">
        <Link to="/" className="font-display-lg text-headline-md uppercase text-primary font-black">PASSWALE</Link>
        <h2 className="font-display-lg text-headline-md uppercase text-primary">MY PASSES</h2>
        <Link to="/dashboard" className="w-10 h-10 border-2 border-primary bg-primary flex items-center justify-center neo-shadow-sm">
          <span className="material-symbols-outlined text-white text-sm">person</span>
        </Link>
      </header>

      <div className="px-margin-mobile md:px-margin-desktop py-8">
        {tickets.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-primary text-[80px] block mb-4">confirmation_number</span>
            <h2 className="font-display-lg text-display-lg text-primary uppercase leading-none mb-4">NO PASSES YET</h2>
            <p className="font-label-bold text-on-primary-container mb-8">Start exploring events to claim your first pass</p>
            <Link to="/events" className="bg-primary text-white border-2 border-primary px-8 py-4 font-display-lg text-headline-md uppercase neo-shadow neo-button-press inline-block">
              EXPLORE EVENTS →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map(tk => (
              <div key={tk._id} className="bg-white border-2 border-primary neo-shadow p-4 flex items-start gap-4">
                <div className="w-20 h-20 bg-surface-container-high border-2 border-primary flex-shrink-0 overflow-hidden">
                  {tk.event?.coverImage && <img className="w-full h-full object-cover" src={tk.event.coverImage} alt="" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-md text-headline-md uppercase mb-1">{tk.event?.title}</h3>
                  <p className="font-label-bold text-sm text-on-primary-container uppercase">{tk.event?.venue}</p>
                  <p className="font-label-bold text-xs text-secondary uppercase mt-1">{tk.tier} • {tk.ticketId}</p>
                </div>
                <span className={`font-label-bold text-xs px-3 py-1 border-2 ${tk.used?'border-outline text-outline':'border-primary bg-secondary-container text-primary'} uppercase`}>
                  {tk.used ? 'USED' : 'VALID'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
