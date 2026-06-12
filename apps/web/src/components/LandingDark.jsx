import React, { useState } from 'react';

export default function LandingDark() {
  const [activeChip, setActiveChip] = useState('TECHNO');

  const chips = [
    { id: 'TECHNO', icon: 'bolt', label: 'TECHNO', color: 'primary' },
    { id: 'GARBA', icon: 'brightness_7', label: 'GARBA', color: 'secondary' },
    { id: 'SECRET', icon: 'visibility_off', label: 'SECRET', color: 'on-surface-variant' },
    { id: 'CREATIVE', icon: 'brush', label: 'CREATIVE', color: 'on-surface-variant' },
    { id: 'LIVE', icon: 'speaker_group', label: 'LIVE', color: 'on-surface-variant' },
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden diagonal-bg min-h-screen pb-32">
      {/* Top AppBar (Brand Anchor) */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md shadow-xl">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary active:scale-95 duration-200 cursor-pointer">menu</span>
          <h1 className="font-display-xl text-headline-md md:text-display-xl text-secondary uppercase tracking-tighter">PASSWALE</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 active:scale-95 duration-200 cursor-pointer">
          <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFE3VCBtqwjkYO7IM2wPFkbAjmFVrFPyvPxmWKiGzEb8UGdnRPovwtuMquXdotR5up71CMWMvZnLTzgqhoWy6HUaQ6CG6zyb-vPQb5xIYXQE4gIzkbnonJxib0detupbFWqQabecPYq0uDljrH1y984L12E5RRhPQYW7trIV6jpcCg-G83fpe1ePROlBt17x_TgWk0iwp3wVxds2HvFbeIC6zpa-jH1izzHj4qs7MqLWDeTzmbI0mVOKVdEyRR2EtdmP-FErltq-c"/>
        </div>
      </header>

      <main className="pt-24 px-grid-margin">
        {/* Sticky Glass Search Bar */}
        <section className="sticky top-20 z-40 py-md">
          <div className="neomorphic-well rounded-xl flex items-center p-md gap-md border border-white/5 backdrop-blur-md">
            <span className="material-symbols-outlined text-outline">search</span>
            <input className="bg-transparent border-none outline-none focus:ring-0 text-on-surface w-full font-body-md placeholder:text-outline-variant" placeholder="Search techno, garba, or secret raves..." type="text"/>
            <span className="material-symbols-outlined text-secondary active:scale-90 transition-transform cursor-pointer">tune</span>
          </div>
        </section>

        {/* Scene Chips (Horizontal Scroll) */}
        <section className="mt-md">
          <div className="flex overflow-x-auto gap-md custom-scrollbar py-sm">
            {chips.map(chip => (
              <button 
                key={chip.id}
                onClick={() => setActiveChip(chip.id)}
                className={`flex-none flex items-center gap-sm px-lg py-sm rounded-full transition-all ${
                  activeChip === chip.id 
                    ? 'bg-primary-container border border-primary/30 opacity-100' 
                    : 'bg-surface-variant border border-on-surface-variant/30 opacity-60 hover:opacity-100'
                }`}
              >
                <span className={`material-symbols-outlined text-${chip.color} ${activeChip === chip.id ? 'clay-icon-shadow' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {chip.icon}
                </span>
                <span className={`font-cta text-cta text-${chip.color} uppercase`}>{chip.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Vertical Grid of 3:4 Event Posters */}
        <section className="mt-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-grid-gutter mb-12">
          {/* Poster 1: Techno */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-l-4 border-primary group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACsuUT8D9C7KHmViNdpgk22sOV3VBNBsXnBUt4VxmlpdDBx8Cx0LQwEe9ql8BT_roHvu9Mqx012zIyv-OND2MY5P0UFkg1ReZ8fe-pQ0HhCp75_LRtp_wpyU7CXHK918B6W6T0PVkEkG-ubVCoerxXJyH4cOZnBlZPBcVdSveaiDOT1SXI3B3zVSRSacP4Q_gMrwXSu_i7c4GFhF9dhGgHtiJS2QuX5fRdHaP7yjpbfZ1Xxk2ihuda1PN5tjvTiqKul4u3-wuELWc"/>
            <div className="absolute top-md right-md bg-error px-md py-xs rounded-full flex items-center gap-xs shadow-lg">
              <span className="text-on-error font-cta text-[12px] uppercase">🔥 23 left</span>
            </div>
            <div className="absolute bottom-0 w-full p-md bg-surface/60 backdrop-blur-md border-t border-white/10">
              <p className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-xs">Bunker 03 // BLR</p>
              <h3 className="font-headline-md text-[18px] text-white leading-tight uppercase mb-sm">NEON VOID: ABX-7</h3>
              <div className="flex justify-between items-center">
                <span className="font-cta text-secondary text-md">₹1,299</span>
                <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Poster 2: Garba */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-l-4 border-secondary group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIYCdBf17y_5VGEDRWc7n6jvegg-8dB0XOTZsxFU3ZqyZCKTJebspbxpjfiAURfN9tf59Uq1mrlB0-B9HFwOWTwgE5D32CpGtrZ8yBRD__dq9EHHb1-z7lBs8x7SCfijXIpeUzTQxI9JxDIKFMtFZI9pC_bt4S9CMcM1mVe5m75Owipy3-sepcdNgN11StFscmPTJcd79ctrZYNw5tP4eTNQzlPMxTXSlsiAAUEmubWr8_KsFX9AvBPzhyc3oUNLXEJsIRPFStIR0"/>
            <div className="absolute top-md right-md bg-surface/80 px-md py-xs rounded-full flex items-center gap-xs shadow-lg">
              <span className="text-on-surface font-cta text-[12px] uppercase">Sold 80%</span>
            </div>
            <div className="absolute bottom-0 w-full p-md bg-surface/60 backdrop-blur-md border-t border-white/10">
              <p className="font-label-mono text-[10px] text-secondary uppercase tracking-widest mb-xs">Dandia Heights // AMD</p>
              <h3 className="font-headline-md text-[18px] text-white leading-tight uppercase mb-sm">URBAN GARBA NIGHTS</h3>
              <div className="flex justify-between items-center">
                <span className="font-cta text-secondary text-md">₹499</span>
                <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Poster 3: Secret Rave */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-l-4 border-on-surface-variant group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKN3dHAQo9F0RlaQaZ2-f-icMqx7r-ZmEopheigRKhphaPGzQdHRbNQ7IxuUgG6jrmah4lRPRJeia3J_V9hPOL9yeV4lONC_GZ6EhsO_wOG5hzGDraYJ0mgwh7l43UVhPBOjCQrls0halykxcowfeiJ2o_7I99zFj6VzOYrwOoHh_bUXTsM3fVPRESrCsQGQ6KjVJr-4O6sLJyjjHOTBdffbGFP7dISqj5sQKDoaT55cVTNTeYThNlY9B1e-uCTxMPbuq6gX5mMKg"/>
            <div className="absolute top-md right-md bg-error px-md py-xs rounded-full flex items-center gap-xs shadow-lg">
              <span className="text-on-error font-cta text-[12px] uppercase">🔥 5 left</span>
            </div>
            <div className="absolute bottom-0 w-full p-md bg-surface/60 backdrop-blur-md border-t border-white/10">
              <p className="font-label-mono text-[10px] text-outline uppercase tracking-widest mb-xs">The Glade // GOA</p>
              <h3 className="font-headline-md text-[18px] text-white leading-tight uppercase mb-sm">ECHOES OF SILENCE</h3>
              <div className="flex justify-between items-center">
                <span className="font-cta text-secondary text-md">₹2,500</span>
                <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Poster 4: More Events */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-l-4 border-primary group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzsi6Ar-aipYnVDcmSlpR8KSlhwYNCq2t30xwf7b3SbCEwO5NEU7QKFRDzX7saYDQzzwFzzKBJDeYzV0lDoyQkwoTPngn5zhXF_FfdBOyNUAu5MNqGKypj7kiqeMFsboHJsvyTIwGWfzjZrJApOqNrrUeIF-IDT-RdtP6-NOGZWcl2xiITHeXQyRMd3FS-3Uxp5wY0B_kIo9Lhs-FsQiK5SkhCxRIqCn8gl3VCt3dZkiqLxdOTYbM10NHRikvmlYZ795oanUDVl5o"/>
            <div className="absolute bottom-0 w-full p-md bg-surface/60 backdrop-blur-md border-t border-white/10">
              <p className="font-label-mono text-[10px] text-primary uppercase tracking-widest mb-xs">Mainstage // DEL</p>
              <h3 className="font-headline-md text-[18px] text-white leading-tight uppercase mb-sm">SYNTHETIC DREAMS</h3>
              <div className="flex justify-between items-center">
                <span className="font-cta text-secondary text-md">₹1,800</span>
                <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Map View Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <button className="clay-button bg-secondary text-on-secondary px-lg py-sm rounded-full flex items-center gap-sm font-cta uppercase tracking-widest">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
          Map View
        </button>
      </div>

      {/* Bottom Navigation Bar (Brand Anchor) */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg rounded-t-xl border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-20 px-4 pb-safe">
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-mono text-label-mono">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center text-secondary relative after:content-[''] after:w-1 after:h-1 after:bg-secondary after:rounded-full after:mt-1 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
          <span className="font-label-mono text-label-mono">Explore</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-mono text-label-mono">Tickets</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">mail</span>
          <span className="font-label-mono text-label-mono">Inbox</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-mono text-label-mono">Profile</span>
        </div>
      </nav>
    </div>
  );
}
