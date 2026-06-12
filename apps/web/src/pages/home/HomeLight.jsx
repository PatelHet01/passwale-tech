import { Link } from 'react-router-dom';
import { useThemeStore } from '@/stores/themeStore';
import { useState, useEffect } from 'react';
import api from '@/services/api';

export default function HomeLight() {
  const { setTheme, theme } = useThemeStore();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events?limit=5&sort=date').then(r => setEvents(r.data?.data || [])).catch(() => {});
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="font-display-lg text-on-background custom-scrollbar">

      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-background flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 z-50 border-b-4 border-primary neo-shadow">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary font-bold cursor-pointer hover:bg-secondary-container p-2 transition-all">menu</span>
          <h1 className="font-display-lg text-headline-lg-mobile tracking-tighter uppercase text-primary">PASSWALE</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <Link className="font-label-bold text-label-bold text-secondary font-bold underline decoration-4 underline-offset-4 uppercase" to="/">Scenes</Link>
          <Link className="font-label-bold text-label-bold text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container transition-all px-2 py-1 uppercase" to="/events">Drops</Link>
          <Link className="font-label-bold text-label-bold text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container transition-all px-2 py-1 uppercase" to="/scenes">Squads</Link>
          <Link className="font-label-bold text-label-bold text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container transition-all px-2 py-1 uppercase" to="/dashboard/tickets">Vault</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center gap-2 border-2 border-primary bg-surface-container px-3 py-2 font-label-bold text-label-bold neo-shadow neo-button-press"
            title="Switch to dark mode"
          >
            <span className="material-symbols-outlined text-sm">dark_mode</span>
          </button>
          <Link to="/login" className="hidden md:flex items-center gap-2 border-2 border-primary bg-secondary-container px-4 py-2 font-label-bold text-label-bold neo-shadow neo-button-press uppercase">
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
            My Passes
          </Link>
          <Link to="/dashboard" className="w-10 h-10 border-2 border-primary neo-shadow-sm overflow-hidden bg-primary cursor-pointer">
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">person</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Navigation Drawer (Desktop) */}
        <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 bg-surface w-72 border-r-4 border-primary shadow-[8px_0px_0px_0px_rgba(4,7,17,1)] pt-24 overflow-y-auto">
          <div className="px-6 mb-8 flex flex-col items-start">
            <div className="w-20 h-20 border-4 border-primary neo-shadow mb-4 bg-surface-container-highest overflow-hidden flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">person</span>
            </div>
            <h3 className="font-display-lg text-headline-md text-primary uppercase">Passholder</h3>
            <p className="font-label-bold text-label-bold text-secondary uppercase">Elite Scene Streak</p>
            <span className="text-xs font-bold text-on-primary-container tracking-widest mt-1 uppercase">Vibe Architect</span>
          </div>
          <nav className="flex flex-col gap-2 px-2">
            <Link to="/" className="flex items-center gap-4 px-4 py-3 bg-secondary-container text-on-secondary-container border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] mx-2 my-1 font-label-bold text-label-bold uppercase">
              <span className="material-symbols-outlined">explore</span>Scenes
            </Link>
            <Link to="/events" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all mx-2 my-1 font-label-bold text-label-bold uppercase">
              <span className="material-symbols-outlined">local_fire_department</span>Drops
            </Link>
            <Link to="/scenes" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all mx-2 my-1 font-label-bold text-label-bold uppercase">
              <span className="material-symbols-outlined">group</span>Squads
            </Link>
            <Link to="/dashboard/tickets" className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all mx-2 my-1 font-label-bold text-label-bold uppercase">
              <span className="material-symbols-outlined">lock</span>Vault
            </Link>
          </nav>
          <div className="mt-auto p-6 border-t-2 border-primary bg-primary-container text-on-primary-container">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-bold text-sm uppercase">Global Rank</span>
              <span className="text-secondary font-black">#42</span>
            </div>
            <div className="w-full bg-primary h-2 border border-on-primary-container">
              <div className="bg-secondary-container h-full w-[75%]" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-72 pb-32">

          {/* Hero Drop Section */}
          <section className="relative w-full h-[500px] border-b-4 border-primary overflow-hidden flex items-end">
            {events[0]?.coverImage
              ? <img className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" src={events[0].coverImage} alt="" />
              : <div className="absolute inset-0 bg-primary-container" />
            }
            <div className="relative z-10 p-margin-mobile md:p-margin-desktop w-full flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-3xl">
                <span className="bg-secondary-container text-primary font-bold px-3 py-1 neo-shadow-sm mb-4 inline-block uppercase tracking-wider">LATEST DROP</span>
                <h2 className="font-display-lg text-display-lg text-on-primary leading-[0.9] uppercase mb-4">
                  {events[0]?.title || 'Underground Berlin Archive'}
                </h2>
                <p className="font-body-lg text-on-primary-container max-w-xl">
                  {events[0]?.description || 'Exclusive access to the private 2024 collection. 500 total passes. Burnable assets included.'}
                </p>
              </div>
              <div className="flex gap-4">
                <Link to={events[0] ? `/e/${events[0].slug}` : '/events'} className="bg-primary text-on-primary border-4 border-secondary-container px-8 py-4 font-display-lg text-headline-md neo-shadow-lg neo-button-press uppercase">
                  ENTER THE VAULT
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8">
              <div className="bg-white border-2 border-primary p-4 neo-shadow flex flex-col items-center">
                <span className="text-xs font-bold uppercase text-on-primary-container">Ends In</span>
                <span className="font-display-lg text-headline-lg text-primary tracking-tighter">04:22:15</span>
              </div>
            </div>
          </section>

          {/* Ticker Bar */}
          <div className="bg-primary py-2 marquee-container border-b-4 border-primary overflow-hidden">
            <div className="marquee-content flex gap-12 items-center">
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">LIVE MINTING: SQUAD 77 LOCK-IN // </span>
              <span className="text-secondary-container font-black uppercase text-xl italic tracking-widest">BRAND DROP: NOCTA X PASSWALE // </span>
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">SCENE ALERT: NYC ROOFTOP UNLOCKED // </span>
              <span className="text-secondary-container font-black uppercase text-xl italic tracking-widest">LIVE MINTING: SQUAD 77 LOCK-IN // </span>
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">BRAND DROP: NOCTA X PASSWALE // </span>
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">SCENE ALERT: NYC ROOFTOP UNLOCKED // </span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <section className="p-margin-mobile md:p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 space-y-md">
              <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                <h3 className="font-display-lg text-headline-lg text-primary uppercase">Culture Archives</h3>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-1 border border-primary">grid_view</span>
                  <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-1 border border-primary">format_list_bulleted</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.slice(0,2).map((ev, i) => (
                  <Link key={ev._id} to={`/e/${ev.slug}`} className="group relative bg-white border-2 border-primary neo-shadow flex flex-col h-full hover:bg-secondary-container transition-colors cursor-pointer overflow-hidden">
                    <div className="h-48 border-b-2 border-primary relative overflow-hidden">
                      {ev.coverImage
                        ? <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={ev.coverImage} alt={ev.title} />
                        : <div className="w-full h-full bg-surface-container-high" />
                      }
                      <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">VOL. 0{i+1}</span>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-headline-md text-headline-md uppercase mb-1">{ev.title}</h4>
                        <p className="text-sm font-bold text-on-primary-container uppercase">{ev.category || 'Cultural Event'}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-secondary overflow-hidden" />
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary overflow-hidden" />
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-[10px] font-black">+12</div>
                        </div>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {events.length < 2 && [
                  { title:'Sonic Temple', cat:'Industrial / Techno Archive' },
                  { title:'Concrete Pulse', cat:'Architecture / Fashion' },
                ].slice(events.length).map((ev, i) => (
                  <div key={ev.title} className="group relative bg-white border-2 border-primary neo-shadow flex flex-col h-full hover:bg-secondary-container transition-colors cursor-pointer overflow-hidden">
                    <div className="h-48 border-b-2 border-primary relative overflow-hidden bg-surface-container-high">
                      <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">VOL. 0{events.length+i+1}</span>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-headline-md text-headline-md uppercase mb-1">{ev.title}</h4>
                        <p className="text-sm font-bold text-on-primary-container uppercase">{ev.cat}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-secondary" />
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary" />
                          <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-[10px] font-black">+8k</div>
                        </div>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Build Your Scene Banner */}
              <div className="bg-secondary border-2 border-primary p-6 neo-shadow-lg flex items-center justify-between mt-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-display-lg text-headline-lg text-white uppercase leading-none mb-2">Build Your Scene</h3>
                  <p className="text-white font-bold max-w-md">Connect your Spotify and Instagram to unlock exclusive legacy drops based on your cultural fingerprint.</p>
                  <Link to="/dashboard/profile" className="mt-4 bg-primary text-white border-2 border-white px-6 py-2 font-bold neo-shadow neo-button-press uppercase inline-block">
                    Connect Identity
                  </Link>
                </div>
                <span className="material-symbols-outlined text-[120px] text-primary/20 absolute -right-4 -bottom-4 select-none">fingerprint</span>
              </div>
            </div>

            {/* Right Column: Squad Lock-in */}
            <div className="lg:col-span-4 space-y-md">
              <div className="border-b-2 border-primary pb-2">
                <h3 className="font-display-lg text-headline-lg text-primary uppercase">Squad Lock-in</h3>
              </div>
              <div className="bg-white border-2 border-primary neo-shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-primary bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">hub</span>
                  </div>
                  <div>
                    <h4 className="font-label-bold text-lg uppercase leading-tight">Elite Unit 07</h4>
                    <p className="text-xs font-bold text-secondary uppercase">Active Session</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {['Marcus (Lead)','Sarah.eth','T-Raw'].map((name, i) => (
                    <div key={name} className={`flex items-center justify-between p-3 border-2 border-primary bg-surface-container-low hover:bg-secondary-container transition-colors cursor-pointer ${i===2 ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${i===0?'bg-primary':i===1?'bg-primary-container':'bg-on-primary-container'}`} />
                        <span className="font-bold uppercase text-sm">{name}</span>
                      </div>
                      <span className={`w-3 h-3 rounded-full border border-primary ${i<2 ? 'bg-green-500' : 'bg-primary-container'} ${i===1 ? 'animate-pulse' : ''}`} />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-primary text-white py-3 font-bold neo-shadow neo-button-press uppercase flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Ping Squad
                </button>
              </div>

              {/* Scene Collections */}
              <div className="bg-primary border-2 border-primary neo-shadow overflow-hidden h-48 relative group">
                <div className="absolute inset-0 bg-secondary-container/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                <div className="w-full h-full bg-primary-container" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-secondary text-primary font-black px-3 py-1 neo-shadow-sm uppercase text-xs">Discover</span>
                  <h4 className="text-white font-display-lg text-headline-md uppercase mt-1">Sector 9</h4>
                </div>
              </div>
            </div>
          </section>

          {/* Scene Collections */}
          <section className="px-margin-mobile md:px-margin-desktop mb-margin-desktop">
            <div className="border-b-4 border-primary mb-8 flex items-center justify-between">
              <h3 className="font-display-lg text-headline-lg text-primary uppercase py-2">The Scene Collections</h3>
              <Link to="/scenes" className="font-label-bold text-label-bold uppercase text-primary hover:underline decoration-2">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {(events.length > 0 ? events : [
                { title:'Tokyo Midnight', cat:'12 Limited Edition' },
                { title:'Arena Gold', cat:'5 Limited Edition' },
                { title:'Vibe Deck 02', cat:'Community Drop' },
                { title:'Master Mix', cat:'Access Token' },
                { title:'Visionary 1', cat:'Legacy Asset' },
              ]).slice(0,5).map((ev, i) => (
                <Link key={i} to={ev.slug ? `/e/${ev.slug}` : '/events'} className="border-2 border-primary p-2 neo-shadow hover:translate-y-[-4px] transition-transform bg-white cursor-pointer group">
                  <div className="aspect-square bg-surface-container-highest border-2 border-primary overflow-hidden mb-2">
                    {ev.coverImage
                      ? <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={ev.coverImage} alt={ev.title} />
                      : <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-4xl">confirmation_number</span>
                        </div>
                    }
                  </div>
                  <h5 className="font-bold uppercase text-sm truncate">{ev.title}</h5>
                  <p className="text-[10px] font-bold text-on-primary-container uppercase">{ev.cat || ev.category || 'Limited Edition'}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-stretch h-16 bg-background border-t-4 border-primary shadow-[0px_-4px_0px_0px_rgba(4,7,17,1)] z-50">
        <Link className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container py-1 border-x-2 border-primary w-1/4" to="/">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold uppercase">Scenes</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-primary-container py-1 w-1/4" to="/events">
          <span className="material-symbols-outlined">local_fire_department</span>
          <span className="text-[10px] font-bold uppercase">Drops</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-primary-container py-1 w-1/4" to="/scenes">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-bold uppercase">Squads</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-primary-container py-1 w-1/4" to="/dashboard/tickets">
          <span className="material-symbols-outlined">lock</span>
          <span className="text-[10px] font-bold uppercase">Vault</span>
        </Link>
      </nav>

      {/* FAB */}
      <Link to="/events" className="fixed bottom-24 right-8 w-16 h-16 bg-secondary-container border-4 border-primary neo-shadow-lg flex items-center justify-center z-50 neo-button-press transition-all group md:bottom-12">
        <span className="material-symbols-outlined text-primary text-3xl font-black group-hover:rotate-90 transition-transform">add</span>
      </Link>
    </div>
  );
}
