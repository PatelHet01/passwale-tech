import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function EventDetailsLight() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock or fetch event details
    api.get(`/events`).then(r => {
      const found = r.data?.data?.find(e => e.slug === slug);
      if (found) setEvent(found);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  const ev = event || {
    title: "NEO-FOUNDRY NIGHTS",
    category: "LIVE MICRO-BRAND",
    date: "2024-10-24T20:00:00Z",
    city: "Mumbai",
    venue: "The Grand Dockyard, Sector 4",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkJ5FQakDUs4UeAHIRK53oSjZFgSBZRRq2go2dfnV5co1sBcj-HpN2V4B2h728WCQ-B_cWf0jblJBUmoZsRLhn4uAIvYPq_7fOdNKdY1Jav633hGdpM46uFHvJyCqxTdfCKmqp3mfw9MpW0ibTExxKry3A8PuYowKu3EX_glbPPNimnKyE-FArhL97A72cTPd6z0j2uRvfNa2KUyzMlKBqTuKZJVz5ffKega6u4HRh4u623oA8q2K6S9jgjBP6eavYlLksZ8FebjA",
    description: "Curated by @TheVibeArchitect. Zero bots. 100% Peer Verified.",
    minPrice: 30
  };

  return (
    <div className="bg-background text-primary font-body-md overflow-x-hidden min-h-screen">
      {/* Top Navigation Bar */}
      <header className="w-full top-0 sticky flex justify-between items-center px-4 py-4 bg-background z-50 border-b-4 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)]">
        <div className="flex items-center gap-2">
          <Link to={-1} className="material-symbols-outlined text-primary font-bold cursor-pointer active:scale-95 transition-transform">arrow_back</Link>
          <h1 className="font-display-lg text-headline-lg-mobile tracking-tighter uppercase text-primary">PASSWALE</h1>
        </div>
        <div className="h-10 w-10 border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] bg-secondary-container flex items-center justify-center overflow-hidden">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBAsQ12melAB8EJnSkuGtHEAqOT-9bI2EZzt-tvGErhmHu6OR19r1RtJJLNyjVSTuUo0d7R1gbukeI8f3T4GEs0WmnMxsqjJXVT7g1MXYcUvl_nMxHQZRl-1kxV3wuzhc6vo7mE3bylTVvjMZzt0AEOcTDkP5O9gelgVgCb8KV3fLt86KccgaM1p1vCTS83DNdw54RDJ0uoYcyZf4ZxciQ-oLiIWJx4ntwJlmuTpGjg49GMKPNJZX8dD9fCF7-Qf7mTIvlE6Jsyrye" alt="User" />
        </div>
      </header>

      <main className="min-h-screen pb-24" style={{ backgroundColor: '#f8f9fb', backgroundImage: 'linear-gradient(45deg, #dfe2f3 25%, transparent 25%, transparent 50%, #dfe2f3 50%, #dfe2f3 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}>
        {/* Hero: Event Brand Microsite */}
        <section className="px-4 pt-8">
          <div className="bg-primary text-on-primary p-6 border-4 border-primary shadow-[8px_8px_0px_0px_rgba(4,7,17,1)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rotate-12 opacity-20 border-4 border-primary"></div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-secondary-container text-on-secondary-container px-2 py-1 border-2 border-primary font-label-bold text-label-sm uppercase">{ev.category}</span>
                <span className="font-label-bold text-label-sm text-secondary-fixed">RAVE_TECH.PASSWALE.COM</span>
              </div>
              <h2 className="font-display-lg text-headline-lg-mobile uppercase mb-2 leading-none">{ev.title}</h2>
              <p className="font-body-md text-on-primary-container mb-6 max-w-xs">{ev.description}</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-white"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-secondary-container"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-primary bg-on-primary-container"></div>
                </div>
                <span className="font-label-bold text-label-sm">+422 Verified Squads attending</span>
              </div>
            </div>
          </div>
        </section>

        {/* DM -> Pass Flow Simulation */}
        <section className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline-md text-headline-md uppercase">The Access Flow</h3>
            <span className="material-symbols-outlined text-secondary font-bold">verified_user</span>
          </div>

          <div className="bg-white/90 backdrop-blur-[8px] border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] p-4 mb-4 relative">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 border-2 border-primary bg-primary flex-shrink-0">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEhXyCXl6f0XwIPyOJvA89x_gMDp6GJJ1j0Iujr3lG6BQOWsoKc6NYkE6gwx6AfhqMWKjjhNXZSldgNgjNQknkwVE0QH-MRCRwi0Rue6sTs5kfDmbuX1iBW_jEeZ6IPLAV-WNQsmPytlwZXKYGaGhgU3EpI-ReRIT4mJTSe8cIkSFqhA6m7x1AiY4QXQOeTaxxV6HTQeKi0_RoRjB2hr9oWT2gn7af94mWyy_oqHkwn7ZNwbuSImau0ufE4WejBj9-5_8BiZahdYGp" alt="Creator" />
              </div>
              <div className="flex-1">
                <p className="font-label-bold text-label-bold mb-1">Creator DM Invite</p>
                <div className="bg-primary text-on-primary p-3 border-2 border-primary">
                  <p className="font-body-md text-sm italic">"Yo! Dropping the last 10 foundry slots here. Hit the link to claim yours. DM is your key."</p>
                </div>
              </div>
            </div>

            <div className="border-2 border-primary bg-secondary-container p-4 shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] active:shadow-none active:translate-x-1 active:translate-y-1 cursor-pointer transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-display-lg text-lg uppercase tracking-tight">VIP FOUNDRY PASS</p>
                  <p className="font-label-sm text-xs uppercase opacity-80">Reserved for: Passholder #001</p>
                </div>
                <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>confirmation_number</span>
              </div>
            </div>
          </div>
        </section>

        {/* Slot-Based Entry Selection */}
        <section className="px-4 mt-8">
          <h3 className="font-headline-md text-headline-md uppercase mb-4">Select Your Slot</h3>
          <div className="grid grid-cols-1 gap-4">
            {/* Slot 1 */}
            <button className="w-full flex items-center justify-between p-4 bg-surface border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all group">
              <div className="text-left">
                <p className="font-label-bold text-label-bold uppercase">Alpha Entry (20:00)</p>
                <p className="font-label-sm text-xs text-on-primary-container">Priority lounge access included</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-error font-bold text-sm uppercase">Sold Out</span>
                <span className="material-symbols-outlined text-on-primary-container">lock</span>
              </div>
            </button>

            {/* Slot 2 */}
            <button className="w-full flex items-center justify-between p-4 bg-secondary-container border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all group">
              <div className="text-left">
                <p className="font-label-bold text-label-bold uppercase">Prime Entry (22:00)</p>
                <p className="font-label-sm text-xs text-on-primary-container">Main stage peak performance</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display-lg text-lg tracking-tighter">${(ev.minPrice || 30) + 15}</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </button>

            {/* Slot 3 */}
            <button className="w-full flex items-center justify-between p-4 bg-surface border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all group">
              <div className="text-left">
                <p className="font-label-bold text-label-bold uppercase">Late Forge (01:00)</p>
                <p className="font-label-sm text-xs text-on-primary-container">Closing set + exclusive drop</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display-lg text-lg tracking-tighter">${ev.minPrice || 30}</span>
                <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </button>
          </div>
        </section>

        {/* Fair Resale Waitlist Section */}
        <section className="px-4 mt-10">
          <div className="bg-primary text-on-primary p-6 border-4 border-primary shadow-[8px_8px_0px_0px_rgba(4,7,17,1)] relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary-fixed text-4xl">balance</span>
              <h3 className="font-headline-md text-headline-md uppercase leading-none">Fair-Trade<br/>Waitlist</h3>
            </div>
            <p className="font-body-md text-sm mb-6 opacity-80">
              Can't make it? List your pass here. It will be sold at <span className="text-secondary-fixed font-bold">Face Value</span> only to the next person in line. Anti-scalp tech enabled.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-label-sm font-label-bold uppercase mb-1">
                <span>Current Queue</span>
                <span>128 People</span>
              </div>
              <div className="w-full h-4 border-2 border-secondary-fixed bg-primary-container relative">
                <div className="absolute top-0 left-0 h-full bg-secondary-fixed w-[65%]" />
              </div>
              <button className="w-full mt-4 py-3 bg-secondary-fixed text-primary font-label-bold uppercase border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
                Join Waitlist
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-20 right-6 w-16 h-16 bg-secondary-container border-4 border-primary rounded-none flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(4,7,17,1)] active:shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] active:translate-x-1 active:translate-y-1 transition-all z-40">
        <span className="material-symbols-outlined text-4xl font-bold">add</span>
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-stretch h-16 bg-background border-t-4 border-primary shadow-[0px_-4px_0px_0px_rgba(4,7,17,1)] z-50">
        <Link to="/scenes" className="flex flex-col items-center justify-center text-on-primary-container py-1 w-full hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">explore</span>
          <span className="font-label-sm text-label-sm">Scenes</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center justify-center text-on-primary-container py-1 w-full hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">local_fire_department</span>
          <span className="font-label-sm text-label-sm">Drops</span>
        </Link>
        <Link to="/dashboard/tickets" className="flex flex-col items-center justify-center text-on-primary-container py-1 w-full hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="font-label-sm text-label-sm">Tickets</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-on-primary-container py-1 w-full hover:bg-surface-container-high active:translate-y-1 transition-transform">
          <span className="material-symbols-outlined">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
