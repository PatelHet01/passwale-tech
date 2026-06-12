import React, { useEffect } from 'react';

export default function LandingLight() {
  useEffect(() => {
    // Micro-interactions for button pressing
    const buttons = document.querySelectorAll('.neo-button-press');
    
    const handleMouseDown = (e) => {
      e.currentTarget.style.transform = 'translate(4px, 4px)';
      e.currentTarget.style.boxShadow = '0px 0px 0px 0px var(--color-primary)';
    };
    
    const handleMouseUp = (e) => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    };

    buttons.forEach(button => {
      button.addEventListener('mousedown', handleMouseDown);
      button.addEventListener('mouseup', handleMouseUp);
      button.addEventListener('mouseleave', handleMouseUp);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mousedown', handleMouseDown);
        button.removeEventListener('mouseup', handleMouseUp);
        button.removeEventListener('mouseleave', handleMouseUp);
      });
    };
  }, []);

  return (
    <div className="font-body-md text-on-background custom-scrollbar">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-background flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 z-50 border-b-4 border-primary neo-shadow">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary font-bold cursor-pointer hover:bg-secondary-container p-2 transition-all">menu</span>
          <h1 className="font-display-lg text-headline-lg-mobile tracking-tighter uppercase text-primary">PASSWALE</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a className="font-label-bold text-label-bold text-secondary font-bold underline decoration-4 underline-offset-4 uppercase" href="#">Scenes</a>
          <a className="font-label-bold text-label-bold text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container transition-all px-2 py-1 uppercase" href="#">Drops</a>
          <a className="font-label-bold text-label-bold text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container transition-all px-2 py-1 uppercase" href="#">Squads</a>
          <a className="font-label-bold text-label-bold text-on-primary-container hover:bg-secondary-container hover:text-on-secondary-container transition-all px-2 py-1 uppercase" href="#">Vault</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 border-2 border-primary bg-secondary-container px-4 py-2 font-label-bold text-label-bold neo-shadow neo-button-press uppercase">
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
            My Passes
          </button>
          <div className="w-10 h-10 border-2 border-primary neo-shadow-sm overflow-hidden bg-primary cursor-pointer active:scale-95 transition-transform">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPydBmNgCp1JRSKDiKkov3qh6V9u_BiwTA0k33KpxSlUtRtqjNxx_p4TA9GDi3een9R63_P3-Mw14v9VNh5cVML2c7l-3IoiFChIeIRGX3oIpeFHy_6Ya2mg6EolISE9fQ5Lyf0qYYFXtdK-7Rbtl-pHGke0T9pCh74UXxNPDl8YhLl45bHAAokdmgfnxqBWiOZGJvTRAhOE67-QLdifqJ6K4yHDTOeeuodtcnBpH7zE0p2IpHgWSqfp1XOTbq15pvs7iJw9xIl8UR"/>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* NavigationDrawer (Desktop Only) */}
        <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 bg-surface w-80 border-r-4 border-primary shadow-[8px_0px_0px_0px_rgba(4,7,17,1)] pt-24 overflow-y-auto">
          <div className="px-6 mb-8 flex flex-col items-start">
            <div className="w-20 h-20 border-4 border-primary neo-shadow mb-4">
              <img alt="Cultural Insider Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMSt1nXoITIElrF07jBVtyYn4p9ypsdpYrzkDfSjkTRcuq_qejYMDvaguWnU9plyNAY1zDUrBjlNwjnJb5Ng7dftiWLxWe4H6rR5lyrj51zcmIgb1J0C3ysAPptSGRTG3TfhU3mHt7SdbCopJkfnutaxCz8aT3fXYKuGDSeTBa-b_hopuKJqIbmQalHhYFVchlYp6D7k4kyZxISb7DwJwZSANYCquVNIbFkZQgJtEn9pXVyTBdB2R1UjXuusrwfLI_Wvi91NkpCun5"/>
            </div>
            <h3 className="font-display-lg text-headline-md text-primary uppercase">Passholder #001</h3>
            <p className="font-label-bold text-label-bold text-secondary uppercase">Elite Scene Streak</p>
            <span className="text-xs font-bold text-on-primary-container tracking-widest mt-1 uppercase">Vibe Architect</span>
          </div>
          <nav className="flex flex-col gap-2 px-2">
            <a className="flex items-center gap-4 px-4 py-3 bg-secondary-container text-on-secondary-container border-2 border-primary shadow-[4px_4px_0px_0px_rgba(4,7,17,1)] mx-2 my-1 font-label-bold text-label-bold uppercase active:scale-95 duration-100" href="#">
              <span className="material-symbols-outlined">explore</span>
              Scenes
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all mx-2 my-1 font-label-bold text-label-bold uppercase active:scale-95 duration-100" href="#">
              <span className="material-symbols-outlined">local_fire_department</span>
              Drops
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all mx-2 my-1 font-label-bold text-label-bold uppercase active:scale-95 duration-100" href="#">
              <span className="material-symbols-outlined">group</span>
              Squads
            </a>
            <a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all mx-2 my-1 font-label-bold text-label-bold uppercase active:scale-95 duration-100" href="#">
              <span className="material-symbols-outlined">lock</span>
              Vault
            </a>
          </nav>
          <div className="mt-auto p-6 border-t-2 border-primary bg-primary-container text-on-primary-container">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-bold text-sm uppercase">Global Rank</span>
              <span className="text-secondary font-black">#42</span>
            </div>
            <div className="w-full bg-primary h-2 border border-on-primary-container">
              <div className="bg-secondary-container h-full w-[75%]"></div>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 md:ml-80 pb-32">
          {/* Hero Drop Section */}
          <section className="relative w-full h-[614px] border-b-4 border-primary overflow-hidden flex items-end">
            <img className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCymNHxPwAlA-zwffEel2gA_3ShWqQtIRJxJhuL0_sEgRhBX-U4pi_XRq2vrZU0QLdERlXWBsel_ZTgVPt_YTnFu2gM6is7XbLwZsd2jn3gdAQLwVcgK7hbG0TYNn_LpZJ7JcJ2NpJrgg7rYrKo_i_OrSUg1Ny5cIbQiW1DMtSAJ_m-OYEOei-2I9hKBOuvHWCUDXQ4C0MmUPZq82hACoA3DSC12lZAxvgpvTkG0jPrS0lghKSRNRQRL8luFPBDK_pCXo64kxGYzS0Z"/>
            <div className="relative z-10 p-margin-mobile md:p-margin-desktop w-full flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-3xl">
                <span className="bg-secondary-container text-primary font-bold px-3 py-1 neo-shadow-sm mb-4 inline-block uppercase tracking-wider">LATEST DROP</span>
                <h2 className="font-display-lg text-display-lg text-on-primary leading-[0.9] uppercase mb-4">Underground Berlin Archive</h2>
                <p className="font-body-lg text-on-primary-container max-w-xl">Exclusive access to the private 2024 collection. 500 total passes. Burnable assets included.</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-primary text-on-primary border-4 border-secondary-container px-8 py-4 font-display-lg text-headline-md neo-shadow-lg neo-button-press uppercase">ENTER THE VAULT</button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8">
              <div className="bg-white border-2 border-primary p-4 neo-shadow flex flex-col items-center">
                <span className="text-xs font-bold uppercase text-on-primary-container">Ends In</span>
                <span className="font-display-lg text-headline-lg text-primary tracking-tighter">04:22:15</span>
              </div>
            </div>
          </section>

          {/* Ticker Bar */}
          <div className="bg-primary py-2 marquee-container border-b-4 border-primary">
            <div className="marquee-content flex gap-12 items-center">
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">LIVE MINTING: SQUAD 77 LOCK-IN // </span>
              <span className="text-secondary-container font-black uppercase text-xl italic tracking-widest">BRAND DROP: NOCTA X PASSWALE // </span>
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">SCENE ALERT: NYC ROOFTOP UNLOCKED // </span>
              <span className="text-secondary-container font-black uppercase text-xl italic tracking-widest">LIVE MINTING: SQUAD 77 LOCK-IN // </span>
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">BRAND DROP: NOCTA X PASSWALE // </span>
              <span className="text-on-primary font-black uppercase text-xl italic tracking-widest">SCENE ALERT: NYC ROOFTOP UNLOCKED // </span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <section className="p-margin-mobile md:p-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 space-y-md">
              <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                <h3 className="font-display-lg text-headline-lg text-primary uppercase">Culture Archives</h3>
                <div className="flex gap-2">
                  <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-1 border border-primary">grid_view</span>
                  <span className="material-symbols-outlined cursor-pointer hover:bg-surface-container-high p-1 border border-primary">format_list_bulleted</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group relative bg-white border-2 border-primary neo-shadow p-0 flex flex-col h-full hover:bg-secondary-container transition-colors cursor-pointer overflow-hidden">
                  <div className="h-48 border-b-2 border-primary relative overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKShbviaKSPJB_m8r8IBz8UIDW_drAPuBRO3vcKKN-GaszWv8brzmnqHMOpztxDRbdfwQ4DRGcb0HmdngCdXOzqj-X8x6jXBLGiiPG39qc3ZFm7BxRQRiC4YkcjpwXkjVBYRXzkvQaPMAmY2SOXyOa4X9eVRMTRwlII1I2sLxS7dZnRb3QS1nAZyliJh4Wcsp3kUVgIWsoOtLhV49H6JuX27wS4d8KRXaJ0bHjwKg8L7A9qo4KSvCKEuCqiRayNNMLVh89ZMfhvyuZ"/>
                    <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">VOL. 01</span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-headline-md text-headline-md uppercase mb-1">Sonic Temple</h4>
                      <p className="text-sm font-bold text-on-primary-container uppercase">Industrial / Techno Archive</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-secondary overflow-hidden"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary overflow-hidden"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-[10px] font-black">+12</div>
                      </div>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  </div>
                </div>
                <div className="group relative bg-white border-2 border-primary neo-shadow p-0 flex flex-col h-full hover:bg-secondary-container transition-colors cursor-pointer overflow-hidden">
                  <div className="h-48 border-b-2 border-primary relative overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp2HDAuuAoW90WeFrwX0FZyAa9xWfq_1Z5tJtHPtT9GCt5tMq3uK6f0UqamJZtX3FxuSOzf741xqx-7KE9vd0fIcdXmnO7bNfy190YStv-8cGRcoCIfoNV9klDt0bbnrfbn4hL2ZAckmVjaytxWPe8zejozqbwdwjJ8O8mnk2QQ8ATUl_tEbDQXO2EnJeIIeauAQetm7qpo6gczbpa0pSJnNU0ufCeyZky9WRzR7sCRzPDEPmqdpigLIiLyTeLq8cZxXnUwvXdrinf"/>
                    <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">VOL. 04</span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-headline-md text-headline-md uppercase mb-1">Concrete Pulse</h4>
                      <p className="text-sm font-bold text-on-primary-container uppercase">Architecture / Fashion</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-secondary overflow-hidden"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary overflow-hidden"></div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-white flex items-center justify-center text-[10px] font-black">+8k</div>
                      </div>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary border-2 border-primary p-6 neo-shadow-lg flex items-center justify-between mt-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-display-lg text-headline-lg text-white uppercase leading-none mb-2">Build Your Scene</h3>
                  <p className="text-white font-bold max-w-md">Connect your Spotify and Instagram to unlock exclusive legacy drops based on your cultural fingerprint.</p>
                  <button className="mt-4 bg-primary text-white border-2 border-white px-6 py-2 font-bold neo-shadow neo-button-press uppercase">Connect Identity</button>
                </div>
                <span className="material-symbols-outlined text-[120px] text-primary/20 absolute -right-4 -bottom-4 select-none">fingerprint</span>
              </div>
            </div>

            {/* Right Column: Squad Lock-in & Status */}
            <div className="lg:col-span-4 space-y-md">
              <div className="border-b-2 border-primary pb-2">
                <h3 className="font-display-lg text-headline-lg text-primary uppercase">Squad Lock-in</h3>
              </div>
              <div className="bg-white border-2 border-primary neo-shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 border-2 border-primary bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">hub</span>
                  </div>
                  <div>
                    <h4 className="font-label-bold text-lg uppercase leading-tight">Elite Unit 07</h4>
                    <p className="text-xs font-bold text-secondary uppercase">Active Session: Lollapalooza 2024</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border-2 border-primary bg-surface-container-low hover:bg-secondary-container transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full"></div>
                      <span className="font-bold uppercase text-sm">Marcus (Lead)</span>
                    </div>
                    <span className="bg-green-500 w-3 h-3 rounded-full border border-primary"></span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-2 border-primary bg-surface-container-low hover:bg-secondary-container transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-container rounded-full"></div>
                      <span className="font-bold uppercase text-sm">Sarah.eth</span>
                    </div>
                    <span className="bg-green-500 w-3 h-3 rounded-full border border-primary animate-pulse"></span>
                  </div>
                  <div className="flex items-center justify-between p-3 border-2 border-primary bg-surface-container-low opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-on-primary-container rounded-full"></div>
                      <span className="font-bold uppercase text-sm">T-Raw</span>
                    </div>
                    <span className="bg-primary-container w-3 h-3 rounded-full border border-primary"></span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-primary text-white py-3 font-bold neo-shadow neo-button-press uppercase flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Ping Squad
                </button>
              </div>
              <div className="bg-primary border-2 border-primary neo-shadow overflow-hidden h-64 relative group">
                <div className="absolute inset-0 bg-secondary-container/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img className="w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWyl-33_Ts7y7_zbAtE3Z8aRMJcjAaaFRqXWdAk-DYm6FhuMh1fT64qzW3V8CJ1V8UPnJDQwemOYCkH2sYJpTXxdd06eUspan7GSkqJ5QppVYqjy-0MdqlXxcaC4qRxqCKwi-1U9TKfcW8g0jEYBvFQYSo0aV6whqnuSTXWiuC7l1xZnoiUjYE1Z7Czhku_ehvUhVCOS3-KvkH_vtv1tXJ9sygsOIFV9gySpnH2-lo3WH6bfRMsaTqDUCx8MiFYPw9RexQHV2_og7C"/>
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-secondary text-primary font-black px-3 py-1 neo-shadow-sm uppercase text-xs">Brooklyn Warehouse</span>
                  <h4 className="text-white font-display-lg text-headline-md uppercase mt-1">Sector 9</h4>
                </div>
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white border-2 border-primary neo-shadow-sm flex items-center justify-center hover:bg-secondary-container transition-all">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="w-10 h-10 bg-white border-2 border-primary neo-shadow-sm flex items-center justify-center hover:bg-secondary-container transition-all">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Collections Section */}
          <section className="px-margin-mobile md:px-margin-desktop mb-margin-desktop">
            <div className="border-b-4 border-primary mb-8 flex items-center justify-between">
              <h3 className="font-display-lg text-headline-lg text-primary uppercase py-2">The Scene Collections</h3>
              <button className="font-label-bold text-label-bold uppercase text-primary hover:underline decoration-2">View All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="border-2 border-primary p-2 neo-shadow hover:translate-y-[-4px] transition-transform bg-white cursor-pointer group">
                <div className="aspect-square bg-surface-container-highest border-2 border-primary overflow-hidden mb-2">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnLLJ7jJg8VjtrcH5Et4h135GBu05dXSMgoAG8cp2ovVmMJB706E-qLnjuiyZ5bsmkYdKG21ZLcoiAh1gapmCU8J2EKBwQm0eMtzNNP69qdt3GXBOQP8VBgUSjZ2wjRo7EiZ0SMBBMEs6LidSUkdCZr9Divl-VnX-H2fLGObhWA4huqrZpjRaeJgmsXjAdhl-ySdd4o1mg_mM1HRRUFl_-3kwzQVuWQ_T9bU97gcQNLBR0KCMeDGn5cVOfDvqT9p9MJ4xl3Obj2U2O"/>
                </div>
                <h5 className="font-bold uppercase text-sm truncate">Tokyo Midnight</h5>
                <p className="text-[10px] font-bold text-on-primary-container uppercase">12 Limited Edition</p>
              </div>
              <div className="border-2 border-primary p-2 neo-shadow hover:translate-y-[-4px] transition-transform bg-white cursor-pointer group">
                <div className="aspect-square bg-surface-container-highest border-2 border-primary overflow-hidden mb-2">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU0aobBTm6TjUvNEws6CxCOM2WmHtvk6P0CHi33qVtEk3Z6k3z59SUwjxBW3HIXyfpVmBleLBLxwEC56KSy8RGVfrNp2Y7_mTPdy3Ue1OjA5MLBdN63IvVozwDL9ieUfvOGlzFHF73lVdmc8tgAj46MrndKd574cFOBTyQ8EFEv_eam0DtZ7gMUa5HukXjMtHpwFJbLMV7Zl-NJDac8X78PiGE15Ql6xxJQXfSnrN8nfGMgwRCWG8lR3FAilG2NyABlbb18_xt59jP"/>
                </div>
                <h5 className="font-bold uppercase text-sm truncate">Arena Gold</h5>
                <p className="text-[10px] font-bold text-on-primary-container uppercase">5 Limited Edition</p>
              </div>
              <div className="border-2 border-primary p-2 neo-shadow hover:translate-y-[-4px] transition-transform bg-white cursor-pointer group">
                <div className="aspect-square bg-surface-container-highest border-2 border-primary overflow-hidden mb-2">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZvSoRKOF39Qp6a_GpSCQXyNPQv-2RAduSrLSRWbUf3wQq102UpvJowgRgGZA831Ut_k2hNWv_rFFPeAHmQtTSW2ImwpBWFMzP0sQLPCSQDcbAIo8hC5JyZyEjiHUJOsglqd3PINvDo9ibDRzuBATarkycJlXEwiSectbRXJq7s_XfqXOY12AdOGTylkTT0sr9WSOG-beD8JE1Pl0GuheP4FZajUEMdjKu2JKCwyLWr_bW_LHjBIakp6lpYYnrNNXRj9fhEBX8RxB"/>
                </div>
                <h5 className="font-bold uppercase text-sm truncate">Vibe Deck 02</h5>
                <p className="text-[10px] font-bold text-on-primary-container uppercase">Community Drop</p>
              </div>
              <div className="border-2 border-primary p-2 neo-shadow hover:translate-y-[-4px] transition-transform bg-white cursor-pointer group">
                <div className="aspect-square bg-surface-container-highest border-2 border-primary overflow-hidden mb-2">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8X_VAGlZIVpD4ZyQ3_pnXffxvwDusI9AWFq3N5QzFTChhgGpBT7O-1bcTVTOpJD4kHMHU5dSbUt4WIeg5V2jajXyWy7k7tcsB2lskhEZGY700GtUhoBHmRFbgQmWWnCQzBOVllJCgpscLJmQZYRIqWX8M5SVykUy_gwibamG5Q4ydOBLOW6XF4Hzgn-dTkrfdJEgrtHetKNQNIUUJmZXNZL263fH2KQ7XUW34Gd9qVbGLc2rSTrhFEfADBIzGmDCzoCEmYqzKUhkz"/>
                </div>
                <h5 className="font-bold uppercase text-sm truncate">Master Mix</h5>
                <p className="text-[10px] font-bold text-on-primary-container uppercase">Access Token</p>
              </div>
              <div className="border-2 border-primary p-2 neo-shadow hover:translate-y-[-4px] transition-transform bg-white cursor-pointer group">
                <div className="aspect-square bg-surface-container-highest border-2 border-primary overflow-hidden mb-2">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPLFK0lXAN5cVAsHCkkN3UMKtFKxmku7KlkH4wbsanWgOrud2fwmjIKwXWlMTQ4CQBryQZNhl_ZyIsO6qw3ySYWt1_iDDauiyqokluT6p3qz3oj_2t8D9ECVHMiUh4tpyLV8I1wwynMkO1WxE9sTsnp65M3T-2EflyTwus4ZMLoYtlHqkjNkHos9MDV-C5UT9-iitgKS6gSbNw3Cu-EFdIvDZmYPi06XvPmhxr6IOlX7IDQctURe7Sk41sXD2_mQCY_vxgRWacFIQN"/>
                </div>
                <h5 className="font-bold uppercase text-sm truncate">Visionary 1</h5>
                <p className="text-[10px] font-bold text-on-primary-container uppercase">Legacy Asset</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-stretch h-16 bg-background border-t-4 border-primary shadow-[0px_-4px_0px_0px_rgba(4,7,17,1)] z-50">
        <a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container py-1 rounded-none border-x-2 border-primary w-1/4" href="#">
          <span className="material-symbols-outlined">explore</span>
          <span className="font-label-sm text-label-sm uppercase">Scenes</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-primary-container py-1 w-1/4" href="#">
          <span className="material-symbols-outlined">local_fire_department</span>
          <span className="font-label-sm text-label-sm uppercase">Drops</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-primary-container py-1 w-1/4" href="#">
          <span className="material-symbols-outlined">group</span>
          <span className="font-label-sm text-label-sm uppercase">Squads</span>
        </a>
        <a className="flex flex-col items-center justify-center text-on-primary-container py-1 w-1/4" href="#">
          <span className="material-symbols-outlined">lock</span>
          <span className="font-label-sm text-label-sm uppercase">Vault</span>
        </a>
      </nav>

      {/* FAB (Contextual for Home/Main Screen) */}
      <button className="fixed bottom-24 right-8 w-16 h-16 bg-secondary-container border-4 border-primary neo-shadow-lg flex items-center justify-center z-50 neo-button-press transition-all group md:bottom-12">
        <span className="material-symbols-outlined text-primary text-3xl font-black group-hover:rotate-90 transition-transform">add</span>
        <span className="absolute right-20 bg-primary text-white px-4 py-2 font-bold uppercase text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border-2 border-secondary-container pointer-events-none">Create Session</span>
      </button>
    </div>
  );
}
