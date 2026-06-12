import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function EventDetailsDark() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch by slug. For MVP we can just fetch all and find, or just use mock data if not found.
    api.get(`/events`).then(r => {
      const found = r.data?.data?.find(e => e.slug === slug);
      if (found) setEvent(found);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  // Fallback mock data if event not found or loading
  const ev = event || {
    title: "KINETIC PULSE: THE VOID",
    category: "Techno",
    date: "2024-10-24T20:00:00Z",
    city: "Mumbai",
    venue: "The Grand Dockyard, Sector 4",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkJ5FQakDUs4UeAHIRK53oSjZFgSBZRRq2go2dfnV5co1sBcj-HpN2V4B2h728WCQ-B_cWf0jblJBUmoZsRLhn4uAIvYPq_7fOdNKdY1Jav633hGdpM46uFHvJyCqxTdfCKmqp3mfw9MpW0ibTExxKry3A8PuYowKu3EX_glbPPNimnKyE-FArhL97A72cTPd6z0j2uRvfNa2KUyzMlKBqTuKZJVz5ffKega6u4HRh4u623oA8q2K6S9jgjBP6eavYlLksZ8FebjA",
    description: "Step into the abyss. Kinetic Pulse returns to Mumbai's most iconic industrial dockyard for a 12-hour sonic journey. Featuring a custom-built 150kW Void sound system, the night will be led by three international headliners and the city's finest underground talent. Expect sensory overload, immersive projection mapping, and a community like no other.",
    minPrice: 2499
  };

  return (
    <div className="bg-surface text-on-surface overflow-x-hidden min-h-screen pb-32">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-surface/70 backdrop-blur-[20px] border-b border-white/10 flex justify-between items-center px-grid-margin h-16 transition-colors">
        <Link to={-1} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant/50 text-on-surface hover:bg-surface-variant transition-transform">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="font-display-xl text-headline-md tracking-tighter text-secondary uppercase">PASSWALE</div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant/50 text-on-surface hover:bg-surface-variant transition-transform">
          <span className="material-symbols-outlined">share</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[618px] w-full overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          src={ev.coverImage} 
          alt={ev.title} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-grid-margin space-y-md">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full border border-secondary text-secondary font-label-mono text-xs uppercase tracking-widest bg-secondary/10">Underground</span>
            <span className="px-3 py-1 rounded-full border border-primary text-primary font-label-mono text-xs uppercase tracking-widest bg-primary/10">{ev.category || 'Event'}</span>
          </div>
          <h1 className="font-display-xl text-display-xl text-on-surface leading-[0.9] tracking-tighter break-words max-w-[90%] uppercase">
            {ev.title}
          </h1>
          <div className="flex flex-wrap items-center gap-md text-on-surface-variant">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              <span className="font-cta text-cta">{ev.city}, IN</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary">calendar_today</span>
              <span className="font-cta text-cta">{new Date(ev.date).toLocaleDateString('en-IN', {month:'short', day:'numeric', year:'numeric'})}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="px-grid-margin -mt-8 relative z-10 space-y-xl max-w-4xl mx-auto">
        {/* Neumorphic Countdown Timer */}
        <div className="neumorphic-well rounded-2xl p-lg flex justify-around items-center gap-2 border border-white/5 bg-surface-container shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]">
          <div className="flex flex-col items-center">
            <span className="font-display-xl text-headline-lg text-secondary">08</span>
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest">Days</span>
          </div>
          <span className="font-display-xl text-headline-md text-on-surface/30">:</span>
          <div className="flex flex-col items-center">
            <span className="font-display-xl text-headline-lg text-secondary">14</span>
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest">Hrs</span>
          </div>
          <span className="font-display-xl text-headline-md text-on-surface/30">:</span>
          <div className="flex flex-col items-center">
            <span className="font-display-xl text-headline-lg text-secondary">42</span>
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest">Mins</span>
          </div>
          <span className="font-display-xl text-headline-md text-on-surface/30">:</span>
          <div className="flex flex-col items-center">
            <span className="font-display-xl text-headline-lg text-primary animate-pulse">59</span>
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest">Secs</span>
          </div>
        </div>

        {/* Event Description */}
        <section className="space-y-md">
          <h2 className="font-headline-md text-headline-md text-on-surface border-l-4 border-secondary pl-4">The Experience</h2>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            {ev.description}
          </p>
        </section>

        {/* Category Mini-Tickets (Skeuomorphic) */}
        <section className="space-y-md">
          <h2 className="font-headline-md text-headline-md text-on-surface border-l-4 border-primary pl-4">Ticket Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* GA Ticket */}
            <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-xl flex h-32 group cursor-pointer hover:-translate-y-1 transition-transform shadow-lg border-t border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary opacity-80" />
              <div className="w-2/3 p-lg flex flex-col justify-between">
                <div>
                  <h3 className="font-cta text-cta text-secondary">GENERAL ACCESS</h3>
                  <p className="font-label-mono text-xs text-on-surface-variant">ENTRY BY 10:00 PM</p>
                </div>
                <div className="font-display-xl text-headline-md text-on-surface">₹{ev.minPrice || 2499}</div>
              </div>
              <div className="w-[2px] h-full relative ticket-perforation opacity-30 bg-[radial-gradient(circle,transparent_40%,#1e2020_40%)] bg-[length:10px_10px]" />
              <div className="flex-1 bg-surface-variant/30 flex flex-col items-center justify-center p-md">
                <span className="material-symbols-outlined text-4xl text-on-surface/20" style={{fontVariationSettings: "'FILL' 1"}}>confirmation_number</span>
                <span className="font-label-mono text-[8px] text-on-surface-variant mt-2 text-center">PN: 82-XQ-9</span>
              </div>
            </div>

            {/* VIP Ticket */}
            <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low rounded-xl flex h-32 group cursor-pointer hover:-translate-y-1 transition-transform shadow-lg border-t border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary opacity-80" />
              <div className="w-2/3 p-lg flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="font-cta text-cta text-primary">VIP BACKSTAGE</h3>
                  <p className="font-label-mono text-xs text-on-surface-variant">UNRESTRICTED ACCESS</p>
                </div>
                <div className="font-display-xl text-headline-md text-on-surface">₹{(ev.minPrice || 2499) * 2 + 1001}</div>
              </div>
              <div className="w-[2px] h-full relative ticket-perforation opacity-30 bg-[radial-gradient(circle,transparent_40%,#1e2020_40%)] bg-[length:10px_10px]" />
              <div className="flex-1 bg-primary/10 flex flex-col items-center justify-center p-md relative z-10">
                <span className="material-symbols-outlined text-4xl text-primary/40" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                <span className="font-label-mono text-[8px] text-primary/60 mt-2 text-center">VIP PASS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="space-y-md">
          <div className="flex justify-between items-end">
            <h2 className="font-headline-md text-headline-md text-on-surface border-l-4 border-secondary pl-4">The Venue</h2>
            <span className="font-cta text-primary text-sm underline uppercase cursor-pointer">Open Maps</span>
          </div>
          <div className="h-48 rounded-2xl overflow-hidden grayscale contrast-125 border border-white/5 relative bg-surface-container">
            <img 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyFFgt7US6Rdr-tbkBXx3xJAdedtMJTDZZVrZxU0kvk788nvXEaW3kr-zhMI4hq05Wu5xmOS9CV-flEYtYg-O7plmQCUqLbomAmpHuG5FR0Z3zR7JslId2DqFOZpNBx530AIhLoy5n3D7APpwEpCOan_jrn0HKOzC47J1guc-ynDIJJ6GiDHduv5lgltCerKTo4-RMqFDFxgSZ1Qwd40z9DwCHYkmVVNbTWBC3vJVvYPV-mfERoINlYnNutkp3-kc5_F0AlyQrrx0" 
              alt="Map"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-ping absolute opacity-40"></div>
              <div className="w-6 h-6 bg-secondary rounded-full shadow-[0_0_20px_#ffe083] z-10"></div>
            </div>
            <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md p-md rounded-xl border border-white/10 max-w-[80%]">
              <p className="font-cta text-xs text-on-surface">{ev.venue}</p>
            </div>
          </div>
        </section>

        {/* Organizers */}
        <section className="pb-8">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_AU6TB85RSRhS7dfyEodik1-5Em4xe3IlquymENp7Hg7DBeSLvgqOxCoL4tGe9m7nwhPoVkbK8X_AUQn3xZALDS2rIEj6zlJM06qcKRoBboxRqHzEUTedsJX3uoiUiwTOwTAX5qokBGoSZMdpVzoLiwVOQ3r-VUBO2dwx2_TenulF777u3_MQrxPGZemJbTgkChWKc3pyp-znpemDdLbrrShvRY4FgsDsGejVoTfZEf9OTJEZhV3On_DB-u5Inzkus1HNmWp2QBw" alt="Organizer" />
            </div>
            <div>
              <p className="font-label-mono text-[10px] uppercase text-on-surface-variant">Organized By</p>
              <h4 className="font-headline-md text-body-lg text-on-surface">Subterranean Beats</h4>
            </div>
            <button className="ml-auto px-4 py-2 rounded-lg bg-surface-variant/50 hover:bg-surface-variant text-on-surface font-cta text-xs uppercase border border-white/5 transition-colors">
              Follow
            </button>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-grid-margin">
        <div className="bg-surface/80 backdrop-blur-[20px] rounded-2xl h-20 px-lg flex items-center justify-between border border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] max-w-4xl mx-auto">
          <div className="flex flex-col">
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Starts From</span>
            <span className="font-display-xl text-headline-md text-on-surface">₹{ev.minPrice || 2499}</span>
          </div>
          <button className="bg-secondary text-on-secondary hover:brightness-110 active:translate-y-1 font-display-xl text-cta px-6 md:px-10 py-3 md:py-4 rounded-xl border-2 border-black uppercase tracking-wider shadow-[0_4px_0_#000,0_8px_15px_rgba(0,0,0,0.3)] active:shadow-[0_2px_0_#000,0_4px_8px_rgba(0,0,0,0.3)] transition-all">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
