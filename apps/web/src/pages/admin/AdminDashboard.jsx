import { useState, useEffect } from 'react';
import api from '@/services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load admin stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-primary animate-pulse font-display-lg text-headline-md uppercase">Loading Admin Console...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24 md:pb-0 bg-background text-on-surface">
      {/* Dashboard Hero / Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 border-4 border-primary bg-white shadow-[8px_8px_0px_0px_#040711] transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
          <h3 className="font-label-bold text-on-primary-container uppercase mb-2">Scene Streaks</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl lg:text-5xl font-black tracking-tighter">8,421</span>
            <span className="text-secondary font-bold">+12%</span>
          </div>
          <p className="font-body-md text-on-surface-variant mt-4">Active multi-event attendance streaks city-wide.</p>
        </div>
        <div className="p-8 border-4 border-primary bg-secondary-container shadow-[8px_8px_0px_0px_#040711] transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
          <h3 className="font-label-bold text-on-secondary-fixed-variant uppercase mb-2">Waitlist Velocity</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl lg:text-5xl font-black tracking-tighter">4.2<span className="text-2xl">s</span></span>
            <span className="text-primary font-bold">FAST</span>
          </div>
          <p className="font-body-md text-on-secondary-fixed-variant mt-4">Average sign-up rate during drop peaks.</p>
        </div>
        <div className="p-8 border-4 border-primary bg-primary text-white shadow-[8px_8px_0px_0px_#040711] transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
          <h3 className="font-label-bold text-on-primary-container uppercase mb-2">IP Landing Conversions</h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-4xl lg:text-5xl font-black tracking-tighter">68%</span>
          </div>
          <p className="font-body-md text-on-primary-container mt-4">Direct checkout from custom IP sub-pages.</p>
        </div>
      </section>

      {/* Analytics & Management Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-8 border-4 border-primary bg-white shadow-[8px_8px_0px_0px_#040711] p-0 overflow-hidden transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
          <div className="p-6 border-b-4 border-primary flex justify-between items-center bg-surface-container-low">
            <h4 className="font-headline-md text-headline-md uppercase">Streak Growth Velocity</h4>
            <div className="flex gap-2">
              <button className="px-3 py-1 border-2 border-primary bg-white font-bold text-xs uppercase active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_#040711] transition-all">7D</button>
              <button className="px-3 py-1 border-2 border-primary bg-secondary-container font-bold text-xs uppercase active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_#040711] transition-all">30D</button>
            </div>
          </div>
          <div className="relative h-[400px] w-full p-8 bg-surface-bright">
            {/* Abstract Visual Placeholder for Chart */}
            <div className="absolute inset-0 p-8 flex items-end gap-2 opacity-90">
              <div className="bg-primary-container w-full border-2 border-primary" style={{height: '40%'}}></div>
              <div className="bg-secondary-container w-full border-2 border-primary" style={{height: '60%'}}></div>
              <div className="bg-primary w-full border-2 border-primary" style={{height: '45%'}}></div>
              <div className="bg-secondary-container w-full border-2 border-primary" style={{height: '80%'}}></div>
              <div className="bg-primary-container w-full border-2 border-primary" style={{height: '55%'}}></div>
              <div className="bg-secondary-container w-full border-2 border-primary" style={{height: '95%'}}></div>
              <div className="bg-primary w-full border-2 border-primary" style={{height: '70%'}}></div>
            </div>
            <div className="relative z-10 font-bold text-primary flex flex-col justify-between h-full mix-blend-color-burn">
              <p className="bg-white/50 inline-block px-2 py-1 border-2 border-primary w-max">Peak Streak Volume: 12.4k</p>
              <div className="flex justify-between border-t-4 border-primary pt-2 bg-white/80 px-2 mt-auto">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
            </div>
          </div>
        </div>

        {/* IP Management Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 border-4 border-primary bg-white shadow-[8px_8px_0px_0px_#040711] p-6 transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
            <h4 className="font-label-bold uppercase mb-6 flex items-center justify-between">
              Active Landing Pages
              <span className="material-symbols-outlined cursor-pointer hover:text-secondary">add_circle</span>
            </h4>
            <ul className="space-y-4">
              <li className="p-4 border-2 border-primary flex items-center justify-between hover:bg-secondary-container transition-colors cursor-pointer group">
                <div>
                  <p className="font-bold">Neon Underworld</p>
                  <p className="text-xs text-on-surface-variant">/scenes/neon-syd</p>
                </div>
                <span className="material-symbols-outlined text-on-primary-container group-hover:text-primary">open_in_new</span>
              </li>
              <li className="p-4 border-2 border-primary flex items-center justify-between hover:bg-secondary-container transition-colors cursor-pointer group">
                <div>
                  <p className="font-bold">Techno Vault</p>
                  <p className="text-xs text-on-surface-variant">/scenes/vault-01</p>
                </div>
                <span className="material-symbols-outlined text-on-primary-container group-hover:text-primary">open_in_new</span>
              </li>
              <li className="p-4 border-2 border-primary flex items-center justify-between hover:bg-secondary-container transition-colors cursor-pointer group">
                <div>
                  <p className="font-bold">Sunset Rooftop</p>
                  <p className="text-xs text-on-surface-variant">/scenes/sunset-24</p>
                </div>
                <span className="material-symbols-outlined text-on-primary-container group-hover:text-primary">open_in_new</span>
              </li>
            </ul>
            <button className="w-full mt-6 py-4 border-4 border-primary bg-primary text-white font-display-lg text-lg uppercase active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_#040711] hover:bg-primary/90 transition-all">
              Configure All IP
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Table / Data Section */}
      <section className="border-4 border-primary bg-white shadow-[8px_8px_0px_0px_#040711] overflow-hidden transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
        <div className="p-6 border-b-4 border-primary bg-primary flex flex-col sm:flex-row justify-between items-center gap-4">
          <h4 className="font-headline-md text-xl md:text-2xl font-bold text-white uppercase">Waitlist Leaderboard</h4>
          <div className="relative w-full sm:w-auto">
            <input 
              className="w-full sm:w-64 bg-white border-2 border-primary px-4 py-2 font-bold placeholder:text-on-primary-container focus:ring-0 focus:border-secondary transition-all" 
              placeholder="Search Scene..." 
              type="text"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high border-b-2 border-primary">
                <th className="p-6 font-display-lg text-sm text-primary font-bold uppercase tracking-wider">Scene Identity</th>
                <th className="p-6 font-display-lg text-sm text-primary font-bold uppercase tracking-wider">Waitlist Size</th>
                <th className="p-6 font-display-lg text-sm text-primary font-bold uppercase tracking-wider">Growth %</th>
                <th className="p-6 font-display-lg text-sm text-primary font-bold uppercase tracking-wider">Status</th>
                <th className="p-6 font-display-lg text-sm text-primary font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-primary">
              <tr className="hover:bg-secondary-container/20 transition-colors">
                <td className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary bg-secondary-fixed"></div>
                  <span className="font-bold text-primary">Midnight Syndicate</span>
                </td>
                <td className="p-6 font-bold text-primary">12,450</td>
                <td className="p-6 text-green-600 font-black">+42%</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase">High Demand</span>
                </td>
                <td className="p-6">
                  <button className="px-4 py-2 border-2 border-primary bg-white font-bold text-xs hover:bg-secondary-container shadow-[2px_2px_0px_0px_#040711] active:translate-y-1 active:shadow-none transition-all uppercase">Expand Cap</button>
                </td>
              </tr>
              <tr className="hover:bg-secondary-container/20 transition-colors">
                <td className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary bg-primary"></div>
                  <span className="font-bold text-primary">Cyberpunk Afterhours</span>
                </td>
                <td className="p-6 font-bold text-primary">8,920</td>
                <td className="p-6 text-green-600 font-black">+18%</td>
                <td className="p-6">
                  <span className="px-3 py-1 bg-secondary-container border-2 border-primary text-primary text-xs font-bold uppercase">Stable</span>
                </td>
                <td className="p-6">
                  <button className="px-4 py-2 border-2 border-primary bg-white font-bold text-xs hover:bg-secondary-container shadow-[2px_2px_0px_0px_#040711] active:translate-y-1 active:shadow-none transition-all uppercase">Expand Cap</button>
                </td>
              </tr>
              <tr className="hover:bg-secondary-container/20 transition-colors">
                <td className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary bg-error"></div>
                  <span className="font-bold text-primary">The Industrial Loft</span>
                </td>
                <td className="p-6 font-bold text-primary">2,100</td>
                <td className="p-6 text-red-600 font-black">-4%</td>
                <td className="p-6">
                  <span className="px-3 py-1 border-2 border-primary bg-white text-primary text-xs font-bold uppercase">Cooling</span>
                </td>
                <td className="p-6">
                  <button className="px-4 py-2 border-2 border-primary bg-white font-bold text-xs hover:bg-secondary-container shadow-[2px_2px_0px_0px_#040711] active:translate-y-1 active:shadow-none transition-all uppercase">Promote</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Media Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80 border-4 border-primary bg-white shadow-[8px_8px_0px_0px_#040711] relative overflow-hidden group transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
          <img 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_cV4djuToRnRdhspDhG-AAj4pyzYTZGcVy1fAo7hSksWN8iiq8RVLXsDzCK9oGaeegBKIse03OJJ8xw3B0Ouiw-7buLCGuFx9d2ufR56OQUO0BVG-qtPl2uRPWXs79KasS9tQsQYrfO6923zSpJBTJY4S00rDc1mNUyQHMo0TtdtPQmCRaVJGTg7CCvHCMiSfRVpPi2S94yB637H046x8wIk78j6qQ-ShpVff8Zb9O0sP9QbnfMQab1uEgKWTCMyico5x2nHBu8-B" 
            alt="Event scene" 
          />
          <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
            <div className="bg-white border-4 border-primary p-6 shadow-[4px_4px_0px_0px_#040711]">
              <h5 className="font-display-lg text-2xl font-black uppercase">Vibe Audit: Sydney</h5>
            </div>
          </div>
        </div>
        <div className="h-80 border-4 border-primary bg-secondary-container shadow-[8px_8px_0px_0px_#040711] p-10 flex flex-col justify-center text-center transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[10px_10px_0px_0px_#040711]">
          <h5 className="font-display-lg text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4 text-primary">CITY DOMINANCE</h5>
          <p className="font-body-lg text-on-secondary-fixed-variant text-lg font-bold">Passwale accounts for 74% of high-streak attendance in the metro area.</p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-16 h-4 bg-primary border-2 border-primary"></div>
            <div className="w-16 h-4 bg-primary border-2 border-primary"></div>
            <div className="w-16 h-4 bg-primary border-2 border-primary"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
