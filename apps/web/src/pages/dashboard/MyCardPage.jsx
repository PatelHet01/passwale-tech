import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

export default function MyCardPage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleScan = () => {
    if (isLinked) return;
    setIsScanning(true);
    
    // Simulate NFC scan
    setTimeout(() => {
      setIsScanning(false);
      setIsLinked(true);
    }, 2500);
  };

  return (
    <div className="bg-surface text-primary font-body-md min-h-screen pb-20 overflow-x-hidden">
      {/* Top Navigation Header */}
      <header className="bg-background dark:bg-primary text-primary dark:text-on-primary sticky top-0 border-b-4 border-primary dark:border-secondary-fixed shadow-[4px_4px_0px_0px_#040711] flex justify-between items-center px-4 md:px-16 py-4 w-full z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-primary dark:text-secondary-fixed font-bold active:scale-95 transition-transform cursor-pointer">arrow_back</button>
          <h1 className="font-display-lg text-2xl tracking-tighter uppercase text-primary dark:text-secondary-fixed">PASSWALE</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary shadow-[4px_4px_0px_0px_#040711] bg-secondary-container flex items-center justify-center overflow-hidden">
            <img 
              alt="Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEaWIScbzaEAs24zBHf_KAwHrIuYU10XpRC9n06Xb2-ZyJJz8xITlVwu8cv8s3tqum0IpIx1leBhZyVpyJGdereEoGCUdmSD1Bz6BD_KRtsvZeKAKEnBdNy-QMas2A1FqUia9fZnBA8DRfUyc8YJBxfWa-bfT6BWL2N0ygLFKU1zNYFwXxISlM9kAaLcuFXIUCG3CbKYJFxnY8B2lLH5CkgBgm5HTIwhs4jG61XkdXghXr-Mur_NakoWuDKnYmVhPGlLa5z8X77Fxn" 
            />
          </div>
        </div>
      </header>

      <main className="px-4 md:max-w-2xl md:mx-auto mt-8 space-y-12">
        {/* IP Collection Hero */}
        <section className="space-y-6">
          <div className="relative w-full aspect-video border-4 border-primary shadow-[4px_4px_0px_0px_#040711] bg-primary-container overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10"></div>
            <div className="absolute bottom-4 left-4 z-20">
              <span className="inline-block bg-secondary-container text-primary font-label-bold text-xs font-bold px-3 py-1 border-2 border-primary mb-2">COLLECTION #04</span>
              <h2 className="text-white font-display-lg text-3xl font-black uppercase">NEON GALAXY '24</h2>
            </div>
            <img 
              className="w-full h-full object-cover opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAao8WfQbkgsdxEQoQnRtgiFrZxS5QJYnVPGPFxtLOoLQQk1KD5DojLYqg11T2baIgCqwz8wIrY5qEhETaDNCo-agB83klk9NYnxSQJSYNbO7rRS27asM9Wmqx_3j8e6RTjQZsIhQ2WjyMqUM3JNxNaFgrpl-dX9mEaUmhC6KiHHr5QNgxTFGpWcpyLMHRbGhhw1X4BIYm2GEuO2hTQ-7dkeXnPYgIVq3C2D90IAuKlgiAOdKCnMCKFfgDEzss589mEGZyIXBqS7qD0" 
              alt="Neon Galaxy Event" 
            />
          </div>

          {/* Scene Streaks: Cultural Passport */}
          <div className="bg-secondary-container border-4 border-primary p-4 shadow-[4px_4px_0px_0px_#040711] relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-headline-md text-xl font-bold uppercase leading-none text-primary">SCENE STREAK</h3>
                <p className="font-label-bold text-xs font-bold text-primary/80 mt-1">THE CULTURAL INSIDER STATUS</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <div className="flex-shrink-0 w-16 h-16 border-2 border-primary bg-background flex flex-col items-center justify-center">
                <span className="font-bold text-xs leading-none mb-1 text-primary">2021</span>
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="flex-shrink-0 w-16 h-16 border-2 border-primary bg-background flex flex-col items-center justify-center">
                <span className="font-bold text-xs leading-none mb-1 text-primary">2022</span>
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="flex-shrink-0 w-16 h-16 border-2 border-primary bg-background flex flex-col items-center justify-center">
                <span className="font-bold text-xs leading-none mb-1 text-primary">2023</span>
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
              </div>
              <div className="flex-shrink-0 w-16 h-16 border-2 border-primary bg-white flex flex-col items-center justify-center border-dashed">
                <span className="font-bold text-xs leading-none mb-1 text-primary/60">2024</span>
                <span className="material-symbols-outlined text-primary/60">pending</span>
              </div>
            </div>
            <p className="text-sm font-bold mt-2 text-primary">1 EVENT TO LEGENDARY STATUS</p>
          </div>
        </section>

        {/* Advanced Pass UX: Wristband Linking */}
        <section className="space-y-6">
          <h3 className="font-headline-md text-xl font-bold border-l-8 border-primary pl-4 uppercase">DEVICE ACTIVATION</h3>
          <div className="bg-white border-2 border-primary p-6 shadow-[4px_4px_0px_0px_#040711] space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-primary-fixed flex items-center justify-center border-2 border-primary">
                <span className="material-symbols-outlined text-3xl text-primary">nfc</span>
                <div 
                  className={`absolute inset-0 border-4 rounded-full ${isScanning ? 'animate-[pulse-ring_2s_infinite] border-secondary-container opacity-50' : isLinked ? 'border-green-500 opacity-100' : 'border-transparent'}`}
                  style={isScanning ? { animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' } : {}}
                ></div>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-md text-lg font-bold leading-tight uppercase">LINK WRISTBAND</h4>
                <p className="text-xs font-bold opacity-60 uppercase">{isLinked ? 'WRISTBAND ID: PW-992-GALAXY' : 'TAP PHONE TO NFC TAG'}</p>
              </div>
            </div>
            <button 
              onClick={handleScan}
              disabled={isLinked}
              className={`w-full py-4 font-bold text-sm border-2 border-primary shadow-[4px_4px_0px_0px_#040711] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all uppercase ${isLinked ? 'bg-green-400 text-primary' : isScanning ? 'bg-secondary-container text-primary animate-pulse' : 'bg-secondary-container text-primary'}`}
            >
              {isLinked ? 'LINKED SUCCESSFULLY' : isScanning ? 'SCANNING...' : 'START SCANNING'}
            </button>
          </div>
        </section>

        {/* Slot-Based Entry Selection */}
        <section className="space-y-6">
          <h3 className="font-headline-md text-xl font-bold border-l-8 border-primary pl-4 uppercase">RESERVE ENTRY SLOT</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-container text-white border-2 border-primary p-4 shadow-[4px_4px_0px_0px_#040711] relative opacity-60 cursor-not-allowed">
              <div className="absolute top-2 right-2 w-3 h-3 bg-error rounded-full animate-pulse"></div>
              <span className="text-xs font-bold block opacity-70 mb-1">SLOT A</span>
              <h4 className="text-2xl font-black mb-2">18:00</h4>
              <p className="text-xs font-bold uppercase text-error">SOLD OUT</p>
            </div>
            <div 
              onClick={() => setSelectedSlot('B')}
              className={`border-2 border-primary p-4 shadow-[4px_4px_0px_0px_#040711] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer transition-all ${selectedSlot === 'B' ? 'bg-primary text-white' : 'bg-secondary-container text-primary'}`}
            >
              <span className="text-xs font-bold block opacity-70 mb-1">SLOT B</span>
              <h4 className="text-2xl font-black mb-2">20:30</h4>
              <p className="text-xs font-bold uppercase">4 SLOTS LEFT</p>
            </div>
            <div 
              onClick={() => setSelectedSlot('C')}
              className={`border-2 border-primary p-4 shadow-[4px_4px_0px_0px_#040711] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer transition-all ${selectedSlot === 'C' ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            >
              <span className="text-xs font-bold block opacity-70 mb-1">SLOT C</span>
              <h4 className="text-2xl font-black mb-2">22:00</h4>
              <p className="text-xs font-bold uppercase text-primary/60">AVAILABLE</p>
            </div>
            <div 
              onClick={() => setSelectedSlot('D')}
              className={`border-2 border-primary p-4 shadow-[4px_4px_0px_0px_#040711] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer transition-all opacity-40`}
            >
              <span className="text-xs font-bold block opacity-70 mb-1">SLOT D</span>
              <h4 className="text-2xl font-black mb-2">00:00</h4>
              <p className="text-xs font-bold uppercase">LOCKED</p>
            </div>
          </div>
        </section>

        {/* Past Lineups & Aftermovies (Archive) */}
        <section className="space-y-6 pb-12">
          <div className="flex justify-between items-end">
            <h3 className="font-headline-md text-xl font-bold border-l-8 border-primary pl-4 uppercase">VAULT ARCHIVE</h3>
            <span className="text-xs font-bold underline cursor-pointer hover:text-primary/70">VIEW ALL</span>
          </div>
          <div className="space-y-4">
            {/* Archive Card 1 */}
            <div className="group relative bg-white border-2 border-primary overflow-hidden shadow-[4px_4px_0px_0px_#040711]">
              <div className="flex h-32">
                <div className="w-1/3 h-full border-r-2 border-primary overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaU6PtemAp1nZ8kTzyir_XgOnTgMymOtKvtEOU8Xgj5HjQ0CRf6Bi9jU0g3j-1P0QRFp3ulqDXwXJqTNSX9qhF8gUxZNxIbSH9wfrf-st4ZNgDu00a19U7EGeK57wjEaA3464LSfvA4p-CPzRv8dAai0weCUDNpaEbEOIGkE5qlT3hhptw_JekGPFaBoDByi4OWF7YzQneJh55WWXa8BLoy20tYCt6GkOQLou1pYqBo4iVIPlw_NDXHicMOwJhLfTPwe_BOypDSBaE" 
                    alt="2023 Edition" 
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center bg-surface-container-low cursor-pointer">
                  <span className="text-[10px] font-bold text-primary/70 mb-1">2023 EDITION</span>
                  <h4 className="text-lg font-bold leading-tight uppercase">SYNTHETIC DREAMS</h4>
                  <div className="flex gap-2 mt-2 items-center text-primary">
                    <span className="material-symbols-outlined text-lg">play_circle</span>
                    <span className="text-xs font-bold uppercase">Aftermovie</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Archive Card 2 */}
            <div className="group relative bg-white border-2 border-primary overflow-hidden shadow-[4px_4px_0px_0px_#040711]">
              <div className="flex h-32">
                <div className="w-1/3 h-full border-r-2 border-primary overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk-ysWphttDqPJIFJ8tsgl4cSI1L7axeti6tyd-JfV7YBF-DB2jHM7Cwk87F6gdmGDTGY52091sg-ixMaO0Y4hxm1VHMOwDoKjch2qf4FgjNqicrBBceBNCCK6cNRluIb0R-TiRpUbI4-EqZePOPxDx3z4awbc8eX_-JLyhh6lNUWs4UZWw9MY6IyAIsxIuh0q2HDhUffCLkk72VxKaGlknefAyy6VUPiXP1Uv8IGJ1VJ6LFEAYht9q-Xst0djd-iLuiJiorulmVES" 
                    alt="2022 Edition" 
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center bg-surface-container-low cursor-pointer">
                  <span className="text-[10px] font-bold text-primary/70 mb-1">2022 EDITION</span>
                  <h4 className="text-lg font-bold leading-tight uppercase">ORIGIN STORY</h4>
                  <div className="flex gap-2 mt-2 items-center text-primary">
                    <span className="material-symbols-outlined text-lg">list_alt</span>
                    <span className="text-xs font-bold uppercase">Full Lineup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-stretch h-16 bg-background dark:bg-primary text-primary dark:text-secondary-fixed border-t-4 border-primary shadow-[0px_-4px_0px_0px_#040711] z-50">
        <Link to="/scenes" className="flex flex-col items-center justify-center text-primary/70 py-1 flex-1 hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold mt-1">Scenes</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center justify-center text-primary/70 py-1 flex-1 hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">local_fire_department</span>
          <span className="text-[10px] font-bold mt-1">Drops</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-primary/70 py-1 flex-1 hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </Link>
        <Link to="/dashboard/card" className="flex flex-col items-center justify-center bg-secondary-container text-primary py-1 border-x-2 border-primary flex-1 active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
          <span className="text-[10px] font-bold mt-1">Vault</span>
        </Link>
      </nav>
    </div>
  );
}
