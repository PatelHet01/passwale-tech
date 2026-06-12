import { Link } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

export default function DashboardDark() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-surface text-on-surface font-body-md selection:bg-secondary selection:text-on-secondary min-h-screen diagonal-bg pb-32">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-on-surface/10 flex justify-between items-center px-grid-margin py-md shadow-xl">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary text-headline-md active:scale-95 transition-transform cursor-pointer">menu</span>
          <h1 className="font-display-xl text-[28px] leading-none text-secondary uppercase tracking-tighter">PASSWALE</h1>
        </div>
        <div className="flex items-center gap-md">
          <div className="relative">
            <span className="material-symbols-outlined text-primary text-headline-md cursor-pointer">notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden active:scale-95 transition-transform cursor-pointer">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAur0rBCeMaKBu4EkCaFwhcv6p7iZ24zPyag2V8vQqHk3fus0dpZOlNMNp9H1Uqhh6PePkzioBEaO_XuMHIijoQoqLU2d6fhRPuACtRaPDm61RiMIT-D8XLzhzuTXFnRbVwRH4ANHvTRPVlp6FqHCORk9GwNiepYT9fMjnnA_zybGOJJLwalGOyK8MncqkqfzyZ8BF39lxcj4UJAzB0GSbNh-YG-2Jc-Lr7s9XqqgIAqsWmJHLTHYClD9dsoIpmQsqt-AuBKPy913k" 
              alt="Avatar" 
            />
          </div>
        </div>
      </header>

      <main className="pt-24 px-grid-margin space-y-xl max-w-4xl mx-auto">
        {/* Glass Profile Header Card */}
        <section className="relative overflow-hidden rounded-3xl bg-surface-container/40 backdrop-blur-2xl border border-white/10 p-lg shadow-2xl">
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-unit">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white">{user?.name || 'Rohan Sharma'}</h2>
              <div className="flex items-center gap-xs text-secondary">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                <span className="font-label-mono text-label-mono">12 DAY SCENE STREAK</span>
              </div>
              <p className="text-on-surface-variant font-cta text-[14px] mt-2 uppercase tracking-widest">
                {user?.passwaleCard?.tier || 'Pro Attendee'} • Level 4
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="neomorphic-well rounded-2xl p-md bg-surface flex flex-col items-center justify-center min-w-[100px]">
                <span className="text-secondary font-display-xl text-headline-md leading-none">{user?.passCoinBalance || '1,280'}</span>
                <span className="text-on-surface-variant font-label-mono text-[10px] mt-1">PASSCOINS</span>
              </div>
            </div>
          </div>
          {/* Claymorphic Decoration */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-20 rotate-12 z-0">
            <span className="material-symbols-outlined text-[120px] text-secondary clay-shadow-yellow" style={{fontVariationSettings: "'FILL' 1"}}>confirmation_number</span>
          </div>
        </section>

        {/* Upcoming Events - Skeuomorphic Tickets */}
        <section className="space-y-md">
          <div className="flex justify-between items-end">
            <h3 className="font-headline-md text-headline-md">Upcoming Passes</h3>
            <Link to="/dashboard/tickets" className="text-secondary font-cta text-sm uppercase tracking-wider cursor-pointer">View All</Link>
          </div>
          <div className="space-y-lg">
            {/* Ticket 1 */}
            <div className="skeuomorphic-card bg-[#e2e2e2] rounded-2xl overflow-hidden flex h-32 group hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="w-1/3 bg-primary-container p-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 diagonal-bg pointer-events-none"></div>
                <span className="font-label-mono text-[10px] text-primary uppercase relative z-10">Sat, 24 Oct</span>
                <div className="space-y-0 relative z-10">
                  <p className="font-display-xl text-headline-md text-white leading-tight">NEON</p>
                  <p className="font-display-xl text-headline-md text-white leading-tight">RAVE</p>
                </div>
              </div>
              {/* Perforation Line */}
              <div className="w-4 h-full bg-[#e2e2e2] ticket-perforation relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10"></div>
              </div>
              {/* Main Ticket Body */}
              <div className="flex-1 p-md flex flex-col justify-between text-surface relative">
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-cta text-xs uppercase opacity-60">Venue</p>
                  <p className="font-headline-md text-lg leading-tight">Bunker 42, Mumbai</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-label-mono text-[10px] tracking-tighter">ID: #PX-9928-SK</span>
                  <div className="bg-surface text-secondary px-3 py-1 rounded-full font-cta text-[10px] active:scale-95">REDEEM</div>
                </div>
              </div>
            </div>

            {/* Ticket 2 */}
            <div className="skeuomorphic-card bg-[#e2e2e2] rounded-2xl overflow-hidden flex h-32 opacity-90 grayscale-[0.2] cursor-pointer">
              <div className="w-1/3 bg-on-tertiary-fixed-variant p-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 diagonal-bg pointer-events-none"></div>
                <span className="font-label-mono text-[10px] text-tertiary-fixed uppercase relative z-10">Sun, 01 Nov</span>
                <div className="space-y-0 relative z-10">
                  <p className="font-display-xl text-headline-md text-white leading-tight">SOUL</p>
                  <p className="font-display-xl text-headline-md text-white leading-tight">FEST</p>
                </div>
              </div>
              <div className="w-4 h-full bg-[#e2e2e2] ticket-perforation relative"></div>
              <div className="flex-1 p-md flex flex-col justify-between text-surface">
                <div>
                  <p className="font-cta text-xs uppercase opacity-60">Venue</p>
                  <p className="font-headline-md text-lg leading-tight">Great Grounds, Pune</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-label-mono text-[10px] tracking-tighter">ID: #PX-1042-AL</span>
                  <div className="bg-surface/10 text-surface/50 border border-surface/20 px-3 py-1 rounded-full font-cta text-[10px]">UPCOMING</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scene Progress Bars */}
        <section className="space-y-md">
          <h3 className="font-headline-md text-headline-md">Your Scene Rep</h3>
          <div className="grid grid-cols-1 gap-lg">
            {/* Progress 1 */}
            <div className="space-y-xs">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-secondary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                  <span className="font-cta text-sm uppercase">Techno Underworld</span>
                </div>
                <span className="font-label-mono text-xs">85%</span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden p-[2px]">
                <div className="h-full bg-secondary rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]" style={{width: '85%'}}></div>
              </div>
            </div>
            {/* Progress 2 */}
            <div className="space-y-xs">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>groups</span>
                  <span className="font-cta text-sm uppercase">Community Hub</span>
                </div>
                <span className="font-label-mono text-xs">42%</span>
              </div>
              <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden p-[2px]">
                <div className="h-full bg-primary rounded-full" style={{width: '42%'}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-grid-gutter pb-8">
          <button className="bg-surface-container-high p-lg rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-sm active:scale-95 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>qr_code_scanner</span>
            </div>
            <span className="font-cta text-xs uppercase text-on-surface">Scan Entry</span>
          </button>
          <button className="bg-surface-container-high p-lg rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-sm active:scale-95 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>redeem</span>
            </div>
            <span className="font-cta text-xs uppercase text-on-surface">Store</span>
          </button>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-20 px-4 pb-safe">
        <Link to="/" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-mono text-label-mono mt-1">Home</span>
        </Link>
        <Link to="/scenes" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">explore</span>
          <span className="font-label-mono text-label-mono mt-1">Explore</span>
        </Link>
        <Link to="/dashboard/tickets" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-mono text-label-mono mt-1">Tickets</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary/80 active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined">mail</span>
          <span className="font-label-mono text-label-mono mt-1">Inbox</span>
        </div>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-secondary relative after:content-[''] after:absolute after:-bottom-2 after:w-1 after:h-1 after:bg-secondary after:rounded-full active:translate-y-1 transition-transform cursor-pointer">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
          <span className="font-label-mono text-label-mono mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
