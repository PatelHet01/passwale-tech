import { Link } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

export default function DashboardLight() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-background font-body-md text-on-surface pb-32 min-h-screen">
      {/* Top App Bar */}
      <header className="w-full sticky top-0 z-50 flex justify-between items-center px-4 py-2 bg-surface border-b-2 border-on-surface">
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-4 text-on-surface cursor-pointer active:scale-95 transition-transform">menu</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black text-primary italic tracking-tighter uppercase">PASSWALE</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface cursor-pointer active:scale-95">search</span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 mt-8">
        {/* Profile Header */}
        <section className="mb-10">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 border-4 border-on-surface overflow-hidden bg-primary-container shadow-[4px_4px_0px_0px_#1f1b12]">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCECgaXmpwY4g0TIGjI3WjErAFB2DHQ2PM3Df1LnzymwpjmZxsy7fpbjy0srB-NmYrCCQNeOcPZYvf8VB-u2Sul_KB-rx-zIHs5vqigpGd2qjUY8S_FPpp7Nv4t9GxO9muQpEh-sH3UiLP8SHOV_WBkbwSY3GMSOyDe0p43aJLnx0uuBlDR3MnkHJidZe8Lj_TB1Vsuz4_Y4WrTA1-4S-1tDrlc2tc2vJGa2_zWoRMw9uf_q6pIzdFnulz9Jc4OfWF-_Naxnq3Blevf" 
                  alt="Profile" 
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary border-2 border-on-surface px-3 py-1 font-label-bold text-label-bold uppercase shadow-[4px_4px_0px_0px_#1f1b12]">
                LVL 42
              </div>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile uppercase mb-1">{user?.name || 'Alex Rivers'}</h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-primary-container text-on-primary-container px-2 py-0.5 font-label-bold text-[10px] border-2 border-on-surface uppercase">
                {user?.passwaleCard?.tier || 'VIP RAAVER'}
              </span>
              <span className="font-caption text-[12px] text-on-surface-variant uppercase font-semibold">Joined Dec 2023</span>
            </div>
          </div>
        </section>

        {/* Stats Grid (Bento Style) */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white border-2 border-on-surface p-4 shadow-[4px_4px_0px_0px_#1f1b12]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>confirmation_number</span>
              <span className="font-label-bold text-label-bold uppercase">Passes</span>
            </div>
            <span className="font-display-lg text-[32px] font-black leading-none">{user?.passCoinBalance || '124'}</span>
          </div>
          <div className="bg-white border-2 border-on-surface p-4 shadow-[4px_4px_0px_0px_#1f1b12]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
              <span className="font-label-bold text-label-bold uppercase">Events</span>
            </div>
            <span className="font-display-lg text-[32px] font-black leading-none">89</span>
          </div>
        </section>

        {/* Linked Accounts */}
        <section className="mb-8">
          <h3 className="font-headline-md text-headline-md uppercase mb-4 border-b-2 border-on-surface pb-1 inline-block">Linked Accounts</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-surface-container-low border-2 border-on-surface p-3 shadow-[4px_4px_0px_0px_#1f1b12] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface">language</span>
                <span className="font-label-bold text-label-bold uppercase">Spotify</span>
              </div>
              <span className="font-caption text-[12px] font-bold text-primary uppercase">Connected</span>
            </div>
            <div className="flex justify-between items-center bg-white border-2 border-on-surface p-3 opacity-60">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface">link</span>
                <span className="font-label-bold text-label-bold uppercase">Instagram</span>
              </div>
              <span className="font-caption text-[12px] font-bold uppercase">Link now</span>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="mb-8">
          <h3 className="font-headline-md text-headline-md uppercase mb-4 border-b-2 border-on-surface pb-1 inline-block">Preferences</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white border-2 border-on-surface p-4">
              <span className="font-label-bold text-label-bold uppercase">Dark Mode</span>
              <div className="w-12 h-6 bg-on-surface flex items-center px-1 border-2 border-on-surface cursor-pointer">
                <div className="w-4 h-4 bg-primary-container"></div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white border-2 border-on-surface p-4">
              <span className="font-label-bold text-label-bold uppercase">Notifications</span>
              <div className="w-12 h-6 bg-primary-container flex items-center justify-end px-1 border-2 border-on-surface cursor-pointer">
                <div className="w-4 h-4 bg-on-surface"></div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-white border-2 border-on-surface p-4">
              <span className="font-label-bold text-label-bold uppercase">Ticket Alerts</span>
              <div className="w-12 h-6 bg-primary-container flex items-center justify-end px-1 border-2 border-on-surface cursor-pointer">
                <div className="w-4 h-4 bg-on-surface"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-on-surface text-surface p-6 border-4 border-on-surface shadow-[8px_8px_0px_0px_#1f1b12]">
            <h3 className="font-headline-md text-headline-md uppercase mb-2">Host your own?</h3>
            <p className="font-body-md text-surface-variant mb-6 uppercase leading-tight">Turn your vision into reality. Join the Passwale network as an organizer today.</p>
            <button className="w-full bg-primary-container text-on-surface font-label-bold text-label-bold py-4 border-2 border-on-surface uppercase shadow-[4px_4px_0px_0px_#1f1b12] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              Become an Organizer
            </button>
          </div>
        </section>

        {/* Security/Legal */}
        <section className="space-y-4 mb-20 text-center flex flex-col items-center">
          <button className="font-caption text-[12px] font-bold uppercase underline tracking-widest text-on-surface-variant">Terms of Service</button>
          <div className="flex justify-center gap-4">
            <button className="text-error font-label-bold text-label-bold uppercase border-2 border-error px-6 py-2 hover:bg-error hover:text-white transition-colors">Log Out</button>
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 bg-surface h-20 border-t-2 border-on-surface z-50">
        <Link to="/scenes" className="flex flex-col items-center justify-center text-on-surface opacity-70 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">explore</span>
          <span className="font-label-bold text-[10px] mt-1 uppercase">EXPLORE</span>
        </Link>
        <Link to="/dashboard/tickets" className="flex flex-col items-center justify-center text-on-surface opacity-70 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-bold text-[10px] mt-1 uppercase">MY PASSES</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center bg-primary text-on-primary border-2 border-on-surface px-4 py-1 rounded-none shadow-[4px_4px_0px_0px_#1f1b12] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
          <span className="font-label-bold text-[10px] mt-1 uppercase">PROFILE</span>
        </Link>
      </nav>
    </div>
  );
}
