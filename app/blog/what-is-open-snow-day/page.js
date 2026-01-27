import Link from 'next/link';

export const metadata = {
  title: "Snow Day Survival Guide: What is Open in Toronto & Montreal?",
  description: "Schools are closed, but the city isn't. A guide to malls, movie theatres, and ski hills open during the storm.",
}

export default function WhatIsOpenPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 pb-20 font-sans">
      
      {/* --- NAVIGATION BAR --- */}
      <div className="pt-8 px-6 max-w-5xl mx-auto">
        <Link href="/" className="text-cyan-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors group flex items-center gap-2">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Intel Hub
        </Link>
      </div>

      {/* --- HEADER SECTION --- */}
      <div className="border-b border-slate-800 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
          The Snow Day <span className="text-cyan-400">Survival Guide</span> ❄️
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm max-w-xl mx-auto">
          Schools are Closed. The buses are grounded. Here is where the fun is still happening in Toronto & Montreal.
        </p>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-5xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* TORONTO SECTION */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-cyan-500/30 pb-4">
            <span className="text-4xl">🍁</span>
            <div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Toronto / GTA</h2>
                <p className="text-xs text-cyan-400 uppercase font-bold tracking-widest">Status: Operational</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all">
            <h3 className="text-xl font-black text-white mb-4 uppercase italic">🛍️ Shopping Malls (Likely OPEN)</h3>
            <p className="text-sm text-slate-400 mb-4">Malls are private property and rarely close unless the power grid fails.</p>
            <ul className="space-y-3 text-slate-300 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="text-cyan-500">✓</span> CF Toronto Eaton Centre</li>
              <li className="flex items-center gap-2"><span className="text-cyan-500">✓</span> Yorkdale Mall (Subway accessible)</li>
              <li className="flex items-center gap-2"><span className="text-cyan-500">✓</span> Square One (Mississauga)</li>
              <li className="flex items-center gap-2"><span className="text-cyan-500">✓</span> Vaughan Mills (Entrances cleared)</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all">
            <h3 className="text-xl font-black text-white mb-4 uppercase italic">🎬 Entertainment</h3>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="border-l-2 border-slate-700 pl-4">
                <strong className="text-white block uppercase text-xs tracking-wider mb-1">Cineplex Theatres</strong>
                Almost always open. Snow days are actually their busiest days for matinees.
              </li>
              <li className="border-l-2 border-slate-700 pl-4">
                <strong className="text-white block uppercase text-xs tracking-wider mb-1">The ROM & AGO</strong>
                Usually remain open unless public transit (TTC) stops entirely.
              </li>
            </ul>
          </div>
        </div>

        {/* MONTREAL SECTION */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-purple-500/30 pb-4">
            <span className="text-4xl">⚜️</span>
            <div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Montreal / QC</h2>
                <p className="text-xs text-purple-400 uppercase font-bold tracking-widest">Status: Underground</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-all">
            <h3 className="text-xl font-black text-white mb-4 uppercase italic">🚇 The Underground City (RÉSO)</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                The ultimate snow day refuge. Connected to the Metro, 32km of shops and food are 100% weather-proof.
            </p>
            <ul className="space-y-3 text-slate-300 text-sm font-medium">
              <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Place Montréal Trust</li>
              <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Centre Eaton de Montréal</li>
              <li className="flex items-center gap-2"><span className="text-purple-500">✓</span> Complexe Desjardins</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-all">
            <h3 className="text-xl font-black text-white mb-4 uppercase italic">🎿 Skiing & Outdoors</h3>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="border-l-2 border-slate-700 pl-4">
                <strong className="text-white block uppercase text-xs tracking-wider mb-1">Mont Saint-Sauveur</strong>
                Only 45 mins from Montreal. Usually open and busy on snow days!
              </li>
              <li className="border-l-2 border-slate-700 pl-4">
                <strong className="text-white block uppercase text-xs tracking-wider mb-1">Mont Rigaud</strong>
                "The kindergarten of skiing" is great for local families.
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* --- AFFILIATE CALL TO ACTION --- */}
      <div className="max-w-2xl mx-auto mt-24 p-10 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] border border-cyan-500/20 text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl group-hover:opacity-10 transition-opacity select-none">🛒</div>
        
        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Heading out into the storm?</h4>
        <p className="text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Make sure your car is ready for the slush. If you are stuck on the 401 without a snow brush, you surrendered to the storm.
        </p>
        <a 
          href="https://www.amazon.ca/s?k=winter+car+emergency+kit&tag=mliselectpro-20" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-10 py-4 rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          Check Emergency Gear
        </a>
      </div>
    </div>
  );
}
