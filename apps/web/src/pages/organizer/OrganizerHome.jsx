import { useState, useEffect } from 'react';
import api from '@/services/api';
import useAuthStore from '@/stores/authStore';

export default function OrganizerHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    fetchConsoleStats();
  }, []);

  const fetchConsoleStats = async () => {
    try {
      const res = await api.get('/organizer/dashboard');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load organizer metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-primary animate-pulse font-display-lg text-headline-md uppercase">Loading console...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 md:pb-0 bg-background text-on-surface">
      {/* Content Canvas */}
      <div className="space-y-6">
        
        {/* Growth Funnel Stats (Bento Grid) */}
        <section className="grid grid-cols-12 gap-6">
          {/* Main Reels-Native Funnel Chart */}
          <div className="col-span-12 lg:col-span-8 bg-white border-2 border-primary shadow-[4px_4px_0px_0px_#040711] p-6 relative overflow-hidden transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary uppercase">Reels-Native Growth Funnel</h3>
                <p className="text-on-primary-container font-medium text-sm">Tracking high-intent traffic from IG Reels & Stories</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-secondary-container border-2 border-primary text-xs font-bold uppercase">LAST 24H</span>
                <span className="px-3 py-1 bg-primary text-white border-2 border-primary text-xs font-bold uppercase">LIVE</span>
              </div>
            </div>
            
            <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
              <div className="flex-1 bg-primary-fixed border-2 border-primary h-[40%] hover:bg-secondary-container transition-colors group relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-xs opacity-0 group-hover:opacity-100">12k</span>
              </div>
              <div className="flex-1 bg-primary-fixed border-2 border-primary h-[65%] hover:bg-secondary-container transition-colors group relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-xs opacity-0 group-hover:opacity-100">18k</span>
              </div>
              <div className="flex-1 bg-primary-fixed border-2 border-primary h-[50%] hover:bg-secondary-container transition-colors group relative"></div>
              <div className="flex-1 bg-primary-fixed border-2 border-primary h-[85%] hover:bg-secondary-container transition-colors group relative"></div>
              <div className="flex-1 bg-primary-fixed border-2 border-primary h-[70%] hover:bg-secondary-container transition-colors group relative"></div>
              <div className="flex-1 bg-secondary-container border-2 border-primary h-[95%] relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-xs">24.2k</span>
              </div>
              <div className="flex-1 bg-primary-fixed border-2 border-primary h-[45%] hover:bg-secondary-container transition-colors group relative"></div>
            </div>
            <div className="flex justify-between mt-4 text-xs font-bold text-primary uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span className="text-secondary">Sat</span><span>Sun</span>
            </div>
          </div>
          
          {/* Conversion Pulse */}
          <div className="col-span-12 lg:col-span-4 bg-primary text-white border-2 border-primary shadow-[4px_4px_0px_0px_#040711] p-6 flex flex-col justify-between transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-error rounded-full animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase">Direct Conversion</span>
              </div>
              <h4 className="text-5xl font-black mb-1">12.4%</h4>
              <p className="text-white/60 text-sm font-semibold">From IG Stickers to Checkout</p>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-white/20">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase font-bold text-secondary-fixed">Revenue Goal</p>
                  <p className="text-2xl font-bold">₹{stats?.totalRevenue || '4,20,000'} / 5L</p>
                </div>
                <div className="w-16 h-16 border-4 border-secondary-container rounded-full flex items-center justify-center font-black text-xl text-secondary-container">
                  84%
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Middle Row: Squad-Lock & Payments */}
        <section className="grid grid-cols-12 gap-6">
          {/* Squad-Lock Management */}
          <div className="col-span-12 lg:col-span-7 bg-white border-2 border-primary shadow-[4px_4px_0px_0px_#040711] overflow-hidden transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
            <div className="p-6 border-b-2 border-primary bg-primary-fixed">
              <h3 className="font-headline-md text-headline-md text-primary uppercase flex items-center gap-3">
                <span className="material-symbols-outlined">group_work</span>
                Squad-Lock Status
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-surface-container-high border-b-2 border-primary">
                    <th className="px-6 py-4 font-label-bold text-label-bold uppercase text-primary">Squad Name</th>
                    <th className="px-6 py-4 font-label-bold text-label-bold uppercase text-primary">Lock Ratio</th>
                    <th className="px-6 py-4 font-label-bold text-label-bold uppercase text-primary">Status</th>
                    <th className="px-6 py-4 font-label-bold text-label-bold uppercase text-primary">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-surface-container-highest">
                  <tr className="hover:bg-secondary-container/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">Midnight Rebels</div>
                      <div className="text-xs text-on-primary-container">ID: #SQD-902</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-surface-dim h-2 border border-primary mb-1">
                        <div className="bg-primary h-full" style={{width: '100%'}}></div>
                      </div>
                      <span className="text-xs font-bold text-primary">10/10 LOCKED</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-800 text-[10px] font-bold uppercase">Confirmed</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="material-symbols-outlined text-primary hover:bg-primary/10 rounded-full p-1 transition-colors">more_vert</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-secondary-container/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">Cyber Punx</div>
                      <div className="text-xs text-on-primary-container">ID: #SQD-441</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-surface-dim h-2 border border-primary mb-1">
                        <div className="bg-primary h-full" style={{width: '70%'}}></div>
                      </div>
                      <span className="text-xs font-bold text-primary">7/10 PENDING</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-800 text-[10px] font-bold uppercase">Awaiting</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="material-symbols-outlined text-primary hover:bg-primary/10 rounded-full p-1 transition-colors">more_vert</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-secondary-container/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-primary">Vibe Curators</div>
                      <div className="text-xs text-on-primary-container">ID: #SQD-112</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-surface-dim h-2 border border-primary mb-1">
                        <div className="bg-primary h-full" style={{width: '20%'}}></div>
                      </div>
                      <span className="text-xs font-bold text-primary">2/10 FORMING</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-surface-container-highest text-primary border border-primary text-[10px] font-bold uppercase">Open</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="material-symbols-outlined text-primary hover:bg-primary/10 rounded-full p-1 transition-colors">more_vert</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Processing */}
          <div className="col-span-12 lg:col-span-5 bg-secondary-container border-2 border-primary shadow-[4px_4px_0px_0px_#040711] p-6 flex flex-col transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-md text-headline-md text-primary uppercase">Payment Processing</h3>
              <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
            </div>
            <div className="space-y-4 flex-1">
              <div className="bg-white border-2 border-primary p-4 shadow-[4px_4px_0px_0px_#040711]">
                <p className="text-xs font-bold text-on-primary-container uppercase">Pending Settlement</p>
                <p className="text-3xl font-black text-primary">₹1,28,400.00</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary text-white border-2 border-primary p-4">
                  <p className="text-[10px] font-bold uppercase text-secondary-fixed">Processed (24h)</p>
                  <p className="text-xl font-bold">₹42,000</p>
                </div>
                <div className="bg-white border-2 border-primary p-4">
                  <p className="text-[10px] font-bold uppercase text-on-primary-container">Success Rate</p>
                  <p className="text-xl font-bold text-primary">99.8%</p>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full py-4 border-2 border-primary bg-primary text-white font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_#040711]">
              Initiate Payout
            </button>
          </div>
        </section>

        {/* Bottom Row: Recent Drops & Quick Insights */}
        <section className="grid grid-cols-12 gap-6">
          {/* Quick Insights */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-primary shadow-[4px_4px_0px_0px_#040711] p-6 border-l-[12px] border-l-secondary-container transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
              <p className="font-label-bold text-label-bold text-primary uppercase mb-2">Top Referral Source</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-white text-2xl border-2 border-primary">
                  <span className="material-symbols-outlined">photo_camera</span>
                </div>
                <div>
                  <h5 className="font-bold text-primary">IG Reels: "Friday Glow"</h5>
                  <p className="text-xs text-on-primary-container">4,203 sessions today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-primary shadow-[4px_4px_0px_0px_#040711] p-6 border-l-[12px] border-l-primary transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
              <p className="font-label-bold text-label-bold text-primary uppercase mb-2">Waitlist velocity</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-container border-2 border-primary flex items-center justify-center text-primary text-2xl">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <h5 className="font-bold text-primary">+120 souls / hour</h5>
                  <p className="text-xs text-on-primary-container">24% increase from average</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Drop Overview */}
          <div className="col-span-12 lg:col-span-8 bg-white border-2 border-primary shadow-[4px_4px_0px_0px_#040711] relative overflow-hidden flex flex-col md:flex-row transition-all hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_#040711]">
            <div className="md:w-1/3 bg-primary overflow-hidden relative group min-h-[200px]">
              <img 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500 absolute inset-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmX2LsbhuNBIb15X4pa9jAWmJcR1l1CTgIsiWj8HIqN0IC7zNpLa_o9R7bBMl-sKVQ76fCi2d0a1SstIpHtg6nnf4qYA42TWvX4Vy0_HPwBIcY0laypv9ng_1eZ4LGZF7F0Hua3GCl2T7_x4hG8sBohCF2t-GOHbTfpcDC8trJ9vKXWit_M7d8IUhAVKTzVeBFA1H_dl5R1yyfaxsFIwD1VqtwwliLpJ_OGd7VQQi6svlSrfPoU2IvtrNlLh5KCp5Z0-iPqpc4IzTd" 
                alt="Event"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-secondary-container text-primary font-black px-3 py-1 text-xs border border-primary">LIVE NOW</span>
                <h4 className="text-white font-black text-xl mt-2">NEON VOID // 004</h4>
              </div>
            </div>
            <div className="md:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest">Drop Performance</p>
                    <h5 className="text-3xl font-black text-primary">648 / 1000 SOLD</h5>
                  </div>
                  <button className="p-3 border-2 border-primary text-primary hover:bg-surface-container-high active:scale-95 transition-all">
                    <span className="material-symbols-outlined">edit_square</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold uppercase text-primary mb-1">
                      <span>General Admission</span>
                      <span>420 Left</span>
                    </div>
                    <div className="w-full h-4 bg-surface-container-highest border-2 border-primary">
                      <div className="h-full bg-secondary-container border-r-2 border-primary" style={{width: '58%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm font-bold uppercase text-primary mb-1">
                      <span>Squad VIP Pass</span>
                      <span>22 Left</span>
                    </div>
                    <div className="w-full h-4 bg-surface-container-highest border-2 border-primary">
                      <div className="h-full bg-primary border-r-2 border-primary" style={{width: '89%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 py-3 border-2 border-primary bg-white text-primary font-bold text-sm uppercase shadow-[4px_4px_0px_0px_#040711] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                  View Attendees
                </button>
                <button className="flex-1 py-3 border-2 border-primary bg-primary text-white font-bold text-sm uppercase shadow-[4px_4px_0px_0px_#040711] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                  Live Broadcast
                </button>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}
