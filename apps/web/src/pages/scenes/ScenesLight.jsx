import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/services/api';

const SCENES = [
  { id:'techno',    icon:'bolt',          name:'TECHNO',     desc:'Underground warehouse raves' },
  { id:'bollywood', icon:'music_note',    name:'BOLLYWOOD',  desc:'Retro nights & golden era' },
  { id:'garba',     icon:'brightness_7', name:'GARBA',      desc:'Dandiya & Navratri celebrations' },
  { id:'comedy',    icon:'mic',          name:'COMEDY',     desc:'Open mic & standup specials' },
  { id:'startup',   icon:'rocket_launch',name:'STARTUP',    desc:'Pitch nights & hackathons' },
  { id:'creative',  icon:'brush',        name:'CREATIVE',   desc:'Art & cultural showcases' },
];

export default function ScenesLight() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <header className="sticky top-0 z-50 bg-background border-b-4 border-primary shadow-[0px_4px_0px_0px_rgba(4,7,17,1)] flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4">
        <Link to="/" className="font-display-lg text-headline-md uppercase text-primary font-black">PASSWALE</Link>
        <h2 className="font-display-lg text-headline-md text-primary uppercase">SCENES</h2>
        <Link to="/dashboard" className="w-10 h-10 border-2 border-primary bg-primary flex items-center justify-center neo-shadow-sm">
          <span className="material-symbols-outlined text-white text-sm">person</span>
        </Link>
      </header>

      <div className="px-margin-mobile md:px-margin-desktop py-8">
        <div className="mb-8">
          <h1 className="font-display-lg text-display-lg text-primary uppercase leading-none">THE<br/>SCENE<br/>DIRECTORY</h1>
          <div className="w-24 h-2 bg-secondary-container border-2 border-primary mt-4 neo-shadow-sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCENES.map((scene) => (
            <Link key={scene.id} to={`/scenes/${scene.id}`}
              className="group bg-white border-2 border-primary neo-shadow p-6 flex flex-col gap-4 hover:bg-secondary-container transition-colors neo-button-press"
            >
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 bg-primary flex items-center justify-center neo-shadow-sm">
                  <span className="material-symbols-outlined text-secondary-container text-3xl" style={{ fontVariationSettings:"'FILL' 1" }}>{scene.icon}</span>
                </div>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
              <div>
                <h3 className="font-display-lg text-headline-lg text-primary uppercase leading-none mb-2">{scene.name}</h3>
                <p className="font-label-bold text-sm text-on-primary-container">{scene.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
