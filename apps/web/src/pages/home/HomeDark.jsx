import { Link } from 'react-router-dom';
import { useThemeStore } from '@/stores/themeStore';
import { useEffect } from 'react';
import api from '@/services/api';
import { useState } from 'react';

export default function HomeDark() {
  const { setTheme, theme } = useThemeStore();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    api.get('/events?limit=4&sort=date').then(r => setUpcomingEvents(r.data?.data || [])).catch(() => {});
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="bg-surface text-on-surface overflow-x-hidden selection:bg-secondary selection:text-on-secondary">

      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md shadow-xl">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-secondary hover:opacity-80 cursor-pointer active:scale-95">menu</span>
          <span className="font-display-xl text-display-xl text-secondary uppercase tracking-tighter">PASSWALE</span>
        </div>
        <div className="hidden md:flex items-center gap-xl">
          <a className="text-secondary font-cta text-cta" href="#">HOME</a>
          <Link className="text-on-surface hover:opacity-80 font-cta text-cta" to="/events">EXPLORE</Link>
          <Link className="text-on-surface hover:opacity-80 font-cta text-cta" to="/scenes">SCENE</Link>
          <a className="text-on-surface hover:opacity-80 font-cta text-cta" href="#">SUPPORT</a>
        </div>
        <div className="flex items-center gap-md">
          {/* Theme toggle — only on home */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-secondary/30 bg-surface-container flex items-center justify-center hover:bg-secondary/10 transition-all"
            title="Switch theme"
          >
            <span className="material-symbols-outlined text-secondary text-sm">light_mode</span>
          </button>
          <Link to="/login" className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary/50">
            <div className="w-full h-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">person</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen pt-32 pb-xl diagonal-bg overflow-hidden flex flex-col items-center justify-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-grid-margin flex flex-col md:flex-row items-center justify-between gap-xl">
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            <h1 className="font-display-xl text-5xl lg:text-display-xl text-white mb-md leading-none">
              YOUR PASS TO<br/>
              <span className="text-secondary">EXTRAORDINARY</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto md:mx-0 mb-xl">
              Unlock the most exclusive techno bunkers, vibrant Garba grounds, and underground startup scenes with India's premier ticket engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center md:justify-start">
              <Link to="/events" className="clay-button bg-secondary text-on-secondary px-xl py-md font-display-xl text-headline-md rounded-lg uppercase text-center">
                GET PASS NOW
              </Link>
              <Link to="/events" className="border-2 border-primary text-primary px-xl py-md font-cta text-cta rounded-lg hover:bg-primary/10 transition-colors uppercase text-center">
                VIEW LINEUP
              </Link>
            </div>
          </div>

          {/* Hero Poster */}
          <div className="flex-1 flex justify-center order-1 md:order-2">
            <div className="hero-poster-animation w-full max-w-md aspect-[3/4] bg-primary-container rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/20 relative group">
              {upcomingEvents[0]?.coverImage
                ? <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={upcomingEvents[0].coverImage} alt={upcomingEvents[0].title} />
                : <div className="w-full h-full bg-gradient-to-br from-primary-container to-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/30 text-[120px]">confirmation_number</span>
                  </div>
              }
              <div className="absolute bottom-0 w-full p-lg glass-blur bg-black/40 border-t border-white/10">
                <span className="font-label-mono text-label-mono text-secondary uppercase mb-xs block">FEATURED EVENT</span>
                <h2 className="font-headline-lg text-headline-lg text-white leading-tight">{upcomingEvents[0]?.title || 'TOKYO DRIFT FESTIVAL'}</h2>
                <div className="flex items-center gap-sm mt-sm">
                  <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                  <span className="font-label-mono text-label-mono text-white/80">{upcomingEvents[0]?.venue || 'SAHARA PAVILION, MUMBAI'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mb-2">Explore Scenes</span>
          <span className="material-symbols-outlined text-secondary">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Scene Grid */}
      <section className="py-xl px-grid-margin bg-surface max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-xl">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-white mb-xs">PICK YOUR SCENE</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Curated high-octane experiences for every vibe.</p>
          </div>
          <Link to="/scenes" className="hidden md:block font-cta text-cta text-secondary border-b border-secondary pb-1">VIEW ALL SCENES</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-lg">
          {[
            { name:'TECHNO', count:'12', icon:'bolt' },
            { name:'BOLLYWOOD', count:'45', icon:'music_note' },
            { name:'GARBA', count:'8', icon:'brightness_7' },
            { name:'COMEDY', count:'21', icon:'mic' },
            { name:'STARTUP', count:'5', icon:'rocket_launch' },
          ].map(scene => (
            <Link key={scene.name} to={`/scenes/${scene.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl bg-surface-container-high border border-white/5 hover:border-secondary/30 transition-all duration-300 p-lg text-center flex flex-col items-center shadow-lg"
            >
              <div className="w-20 h-20 mb-md rounded-full bg-surface-container flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.5)]">
                <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings:"'FILL' 1" }}>{scene.icon}</span>
              </div>
              <h3 className="font-display-xl text-headline-md text-white mb-2 uppercase group-hover:text-secondary transition-colors">{scene.name}</h3>
              <span className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded-full">{scene.count} EVENTS LIVE</span>
            </Link>
          ))}
          <Link to="/events" className="group relative overflow-hidden rounded-2xl bg-primary-container border border-primary/20 hover:border-primary/50 transition-all duration-300 p-lg text-center flex flex-col items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-primary text-5xl mb-sm" style={{ fontVariationSettings:"'FILL' 1" }}>confirmation_number</span>
            <h3 className="font-display-xl text-headline-md text-primary mb-2 uppercase">ALL ACCESS</h3>
            <p className="font-label-mono text-[10px] text-on-primary-container">UNLIMITED EXPLORATION</p>
          </Link>
        </div>
      </section>

      {/* Dropping Soon */}
      <section className="py-xl overflow-hidden bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-grid-margin mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-white">DROPPING SOON</h2>
        </div>
        <div className="flex gap-lg overflow-x-auto no-scrollbar px-grid-margin pb-xl">
          {upcomingEvents.length > 0
            ? upcomingEvents.map(ev => (
              <Link key={ev._id} to={`/e/${ev.slug}`} className="flex-none w-80 group cursor-pointer">
                <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:-translate-y-2">
                  {ev.coverImage
                    ? <img className="w-full h-full object-cover" src={ev.coverImage} alt={ev.title} />
                    : <div className="w-full h-full bg-surface-container-high" />
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-lg w-full">
                    <div className="bg-secondary/20 border border-secondary/50 text-secondary font-label-mono text-[10px] w-fit px-2 py-1 rounded mb-md uppercase backdrop-blur-md">{ev.category || 'EVENT'}</div>
                    <h3 className="font-headline-md text-headline-md text-white mb-1">{ev.title}</h3>
                    <p className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {ev.date ? new Date(ev.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'}).toUpperCase() : ''}
                      {ev.city ? ` • ${ev.city.toUpperCase()}` : ''}
                    </p>
                  </div>
                </div>
              </Link>
            ))
            : [
              { label:'TECHNO BASTION', title:'SYNTH PULSE 2024', info:'OCT 24 • MUMBAI' },
              { label:'CULTURAL LEGACY', title:'NAV-RANG NIGHTS', info:'OCT 15 • AHMEDABAD' },
              { label:'VENTURE HUB', title:'FOUNDER FOCUS', info:'NOV 02 • BENGALURU' },
              { label:'LAUGH RIOT', title:'UNCUT STANDUP', info:'OCT 28 • DELHI' },
            ].map(ev => (
              <div key={ev.title} className="flex-none w-80 group cursor-pointer">
                <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-container-high transition-transform group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-lg w-full">
                    <div className="bg-secondary/20 border border-secondary/50 text-secondary font-label-mono text-[10px] w-fit px-2 py-1 rounded mb-md">{ev.label}</div>
                    <h3 className="font-headline-md text-headline-md text-white mb-1">{ev.title}</h3>
                    <p className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span> {ev.info}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* Skeuomorphic Ticket Highlight */}
      <section className="py-xl px-grid-margin diagonal-bg">
        <div className="max-w-5xl mx-auto">
          <div className="bg-secondary-fixed-dim rounded-[32px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex flex-col md:flex-row relative">
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none skew-x-12 translate-x-16" />
            <div className="flex-[2] p-xl relative border-r-0 md:border-r-2 border-dashed border-black/20">
              <div className="flex justify-between items-start mb-xl">
                <div className="font-display-xl text-headline-md text-black opacity-40 uppercase tracking-widest">VIP PASS</div>
                <div className="font-label-mono text-label-mono text-black font-bold">#PW-9921-XRT</div>
              </div>
              <h2 className="font-display-xl text-display-xl text-black mb-md uppercase leading-tight">PASSWALE<br/>FOUNDER CLUB</h2>
              <div className="grid grid-cols-2 gap-md mt-xl">
                <div>
                  <span className="font-label-mono text-xs text-black/60 uppercase block">HOLDER</span>
                  <span className="font-cta text-black text-headline-md">YOUR NAME</span>
                </div>
                <div>
                  <span className="font-label-mono text-xs text-black/60 uppercase block">ACCESS LEVEL</span>
                  <span className="font-cta text-black text-headline-md">LEGACY ELITE</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-col justify-between py-xl px-xs relative z-10">
              <div className="w-8 h-8 bg-surface rounded-full -mt-10 -ml-4" />
              <div className="ticket-perforation h-full w-[2px]" />
              <div className="w-8 h-8 bg-surface rounded-full -mb-10 -ml-4" />
            </div>
            <div className="flex-1 bg-black/5 p-xl flex flex-col items-center justify-center gap-md">
              <div className="bg-white p-4 rounded-xl shadow-inner">
                <div className="w-32 h-32 bg-surface-container-highest grid grid-cols-8 gap-0.5 p-2">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className={`${Math.random() > 0.5 ? 'bg-secondary' : 'bg-surface-variant'} rounded-sm`} />
                  ))}
                </div>
              </div>
              <Link to="/signup" className="clay-button bg-black text-secondary px-lg py-sm font-cta text-cta rounded-full uppercase w-full text-center block">
                CLAIM PASS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-xl px-grid-margin">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg text-white text-center mb-xl">HOW PASSWALE WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {[
              { icon:'search', title:'FIND YOUR VIBE', desc:'Browse exclusive categories from underground techno to high-stakes startup pitches.' },
              { icon:'bolt', title:'CLAIM YOUR PASS', desc:'Secure your high-texture digital pass with one-click kinetic interactions.' },
              { icon:'sensor_occupied', title:'ENTER THE SCENE', desc:'Present your QR at the venue for seamless VIP verification.' },
            ].map(step => (
              <div key={step.title} className="neumorphic-well p-xl rounded-[40px] text-center border border-white/5 group hover:border-secondary/20 transition-all">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-lg shadow-[8px_8px_16px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.02)] group-hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.6)] transition-all">
                  <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings:"'FILL' 1" }}>{step.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-md">{step.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest py-xl border-t border-white/5 mt-xl pb-32 md:pb-xl">
        <div className="max-w-7xl mx-auto px-grid-margin grid grid-cols-1 md:grid-cols-4 gap-xl">
          <div className="col-span-1 md:col-span-2">
            <span className="font-display-xl text-headline-lg text-secondary uppercase tracking-tighter block mb-md">PASSWALE</span>
            <p className="font-body-md text-on-surface-variant max-w-sm mb-lg">The definitive gateway to high-octane experiences across the Indian subcontinent.</p>
          </div>
          <div>
            <h4 className="font-cta text-cta text-white mb-lg">NAVIGATE</h4>
            <ul className="space-y-md font-body-md text-on-surface-variant">
              <li><Link className="hover:text-secondary transition-colors" to="/events">LIVE EVENTS</Link></li>
              <li><Link className="hover:text-secondary transition-colors" to="/dashboard/tickets">MY PASSES</Link></li>
              <li><Link className="hover:text-secondary transition-colors" to="/organizer">ORGANIZERS</Link></li>
              <li><Link className="hover:text-secondary transition-colors" to="/scenes">SCENE MAP</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-cta text-cta text-white mb-lg">LEGAL</h4>
            <ul className="space-y-md font-body-md text-on-surface-variant">
              <li className="hover:text-secondary cursor-pointer">PRIVACY POLICY</li>
              <li className="hover:text-secondary cursor-pointer">TERMS OF SERVICE</li>
              <li className="hover:text-secondary cursor-pointer">REFUND POLICY</li>
              <li className="hover:text-secondary cursor-pointer">SUPPORT</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-grid-margin mt-xl pt-lg border-t border-white/5 text-center">
          <span className="font-label-mono text-[12px] text-on-surface-variant">© 2024 PASSWALE TECHNOLOGIES. BUILT FOR THE BOLD.</span>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-20 px-4 rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-secondary" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings:"'FILL' 1" }}>home</span>
          <span className="font-label-mono text-[10px]">Home</span>
        </a>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant" to="/events">
          <span className="material-symbols-outlined">explore</span>
          <span className="font-label-mono text-[10px]">Explore</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant" to="/dashboard/tickets">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-mono text-[10px]">Tickets</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant" to="/dashboard">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-mono text-[10px]">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
