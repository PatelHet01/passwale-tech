import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

export default function WalletPage() {
  const user = useAuthStore((s) => s.user);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Generate mock ledger transaction history
    setHistory([
      { id: '1', title: 'Chase Bank', email: 'joh********@gmail.com', type: 'Financial', icon: 'account_balance' },
      { id: '2', title: 'Google Workspace', email: 'adm********@corp.com', type: 'Work', icon: 'alternate_email' },
      { id: '3', title: 'Adobe Creative Cloud', email: 'des********@studio.io', type: 'Personal', icon: 'cloud' },
      { id: '4', title: 'Amazon Retail', email: 'Weak Password', type: 'Alert', icon: 'shopping_cart', isWeak: true }
    ]);
  }, []);

  return (
    <div className="bg-surface dark:bg-[#0b1c30] text-on-surface dark:text-[#eeefff] font-body-md min-h-screen pb-24 md:pb-0">
      {/* TopAppBar */}
      <header className="bg-surface dark:bg-on-background border-b border-surface-border dark:border-outline-variant fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-3">
          <Link to={-1} className="material-symbols-outlined text-primary cursor-pointer active:scale-95 transition-transform">arrow_back</Link>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border border-primary/10">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB7uTxqaKehF8yep9HMQ-IZNFLiODCTckmxtvkKrf-flAaRng3uvMLIXYL-63zwU5AXCigpLjRJI7DaG62EUQb1O6EwPDtedGhr0UXDQZvuuHXbjrICjaVBSSa_8HjWYKZ_qeZr7_o15WovJFNMXi66ch009nCYlka-oEIMzL6SBFiWnWXUwgdrfsOcwBZBTuewJghGMUmodM0MRpMAdOCJ66HPix-ZHiYPN5xFFLodgNQUQ8IxIjjZ1uXnMTXQn4amaggBhvxQaOn" alt="User" />
          </div>
          <h1 className="font-headline-md font-bold text-primary dark:text-primary-fixed uppercase">Passwale Vault</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-surface-container-low dark:hover:bg-on-secondary-fixed-variant transition-colors active:scale-95 text-on-surface-variant dark:text-outline-variant">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-5xl mx-auto">
        {/* Search & Filter Area */}
        <section className="mb-8">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest dark:bg-[#131b2e] border border-surface-border dark:border-[#3f465c] rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-on-surface dark:text-white shadow-sm" 
              placeholder="Search your vault..." 
              type="text"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
              <span className="px-2 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider border border-surface-border">⌘ K</span>
            </div>
          </div>
        </section>

        {/* Stats Bento Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 dark:bg-[#131b2e]/70 backdrop-blur-md border border-surface-border dark:border-[#3f465c] p-6 rounded-xl flex flex-col justify-between h-32 hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary p-2 bg-primary-container/20 rounded-lg">lock_open</span>
              <span className="text-[#10B981] font-bold text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
              </span>
            </div>
            <div>
              <p className="font-bold text-2xl dark:text-white">128</p>
              <p className="text-outline text-sm">Total Credentials</p>
            </div>
          </div>
          
          <div className="bg-white/70 dark:bg-[#131b2e]/70 backdrop-blur-md border border-surface-border dark:border-[#3f465c] p-6 rounded-xl flex flex-col justify-between h-32 hover:border-[#F59E0B]/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-[#F59E0B] p-2 bg-[#F59E0B]/10 rounded-lg">warning</span>
            </div>
            <div>
              <p className="font-bold text-2xl dark:text-white">3</p>
              <p className="text-outline text-sm">Weak Passwords</p>
            </div>
          </div>
          
          <div className="bg-white/70 dark:bg-[#131b2e]/70 backdrop-blur-md border border-surface-border dark:border-[#3f465c] p-6 rounded-xl flex flex-col justify-between h-32 hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary p-2 bg-primary-container/20 rounded-lg">verified_user</span>
            </div>
            <div>
              <p className="font-bold text-2xl dark:text-white">94%</p>
              <p className="text-outline text-sm">Security Score</p>
            </div>
          </div>
        </section>

        {/* Credential List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl dark:text-white">Recent Logins</h2>
            <button className="text-primary text-sm font-semibold hover:underline">View all</button>
          </div>
          
          {history.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#131b2e] border border-surface-border dark:border-[#3f465c] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all cursor-pointer active:scale-[0.99]">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.isWeak ? 'bg-[#ffdad6]/20 text-[#EF4444]' : 'bg-surface-container dark:bg-surface-container-high text-primary'}`}>
                  <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm dark:text-white">{item.title}</h3>
                  <p className={`text-xs ${item.isWeak ? 'text-[#EF4444]' : 'text-outline'}`}>{item.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`hidden md:inline-block px-3 py-1 text-xs font-semibold rounded-full ${item.isWeak ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-surface-container dark:bg-surface-container-high text-on-surface-variant dark:text-white'}`}>
                  {item.type}
                </span>
                <button className="p-2 text-outline hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">content_copy</span>
                </button>
                <button className="p-2 text-outline hover:text-on-surface dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* FAB */}
      <button className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-14 h-14 bg-primary text-on-primary rounded-xl shadow-lg flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface dark:bg-on-background py-2 px-4 pb-safe border-t border-surface-border dark:border-outline-variant">
        <Link to="/dashboard/wallet" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-4 py-1 transition-transform active:scale-90">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>lock</span>
          <span className="font-bold text-xs mt-1">Vault</span>
        </Link>
        <Link to="/dashboard/tickets" className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-bold text-xs mt-1">Tickets</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-transform active:scale-90">
          <span className="material-symbols-outlined">person</span>
          <span className="font-bold text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
