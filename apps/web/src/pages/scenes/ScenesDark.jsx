import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/services/api';

const SCENES = [
  { id:'techno',    icon:'bolt',          name:'TECHNO',     desc:'Underground warehouse raves & industrial beats' },
  { id:'bollywood', icon:'music_note',    name:'BOLLYWOOD',  desc:'Retro nights & classic golden era parties' },
  { id:'garba',     icon:'brightness_7', name:'GARBA',      desc:'Dandiya nights & Navratri celebrations' },
  { id:'comedy',    icon:'mic',          name:'COMEDY',     desc:'Open mic stages & standup specials' },
  { id:'startup',   icon:'rocket_launch',name:'STARTUP',    desc:'Pitch nights, hackathons & founder mixers' },
  { id:'creative',  icon:'brush',        name:'CREATIVE',   desc:'Art installations & cultural showcases' },
];

export default function ScenesDark() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    SCENES.forEach(s => {
      api.get(`/events?category=${s.id}&limit=1`).then(r => {
        setCounts(prev => ({ ...prev, [s.id]: r.data?.total || r.data?.data?.length || 0 }));
      }).catch(() => {});
    });
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-28">

      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md shadow-xl">
        <div className="flex items-center gap-md">
          <Link to="/" className="font-display-xl text-headline-md text-secondary uppercase tracking-tighter">PASSWALE</Link>
        </div>
        <Link to="/dashboard" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-sm">person</span>
        </Link>
      </header>

      <main className="pt-28 px-grid-margin">
        <div className="mb-xl">
          <h1 className="font-headline-lg text-headline-lg text-white mb-xs">PICK YOUR SCENE</h1>
          <p className="font-body-md text-on-surface-variant">Curated high-octane experiences for every vibe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {SCENES.map(scene => (
            <Link key={scene.id} to={`/scenes/${scene.id}`}
              className="group relative overflow-hidden rounded-2xl bg-surface-container-high border border-white/5 hover:border-secondary/30 transition-all duration-300 p-xl flex flex-col items-center text-center shadow-lg"
            >
              <div className="w-24 h-24 mb-md bg-surface rounded-full flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.02)] group-hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.6)] transition-all">
                <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings:"'FILL' 1" }}>{scene.icon}</span>
              </div>
              <h3 className="font-display-xl text-headline-lg text-white mb-2 uppercase group-hover:text-secondary transition-colors">{scene.name}</h3>
              <p className="font-body-md text-on-surface-variant text-sm mb-md">{scene.desc}</p>
              <span className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container-highest px-3 py-1 rounded-full">
                {counts[scene.id] || '–'} EVENTS LIVE
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg rounded-t-xl border-t border-white/10 flex justify-around items-center h-20 px-4">
        <Link to="/" className="flex flex-col items-center text-on-surface-variant">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-mono text-[10px]">Home</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center text-on-surface-variant">
          <span className="material-symbols-outlined">explore</span>
          <span className="font-label-mono text-[10px]">Explore</span>
        </Link>
        <Link to="/dashboard/tickets" className="flex flex-col items-center text-on-surface-variant">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-mono text-[10px]">Tickets</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center text-secondary relative">
          <span className="material-symbols-outlined" style={{ fontVariationSettings:"'FILL' 1" }}>category</span>
          <span className="font-label-mono text-[10px]">Scenes</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full" />
        </Link>
      </nav>
    </div>
  );
}
