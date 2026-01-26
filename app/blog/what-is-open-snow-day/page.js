export default function WhatIsOpenPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 pb-20 font-sans">
      {/* Header Section */}
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
          The Snow Day Survival Guide ❄️
        </h1>
        <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm">
          Schools are Closed. Here is where the fun is still happening.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* TORONTO SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-cyan-500/30 pb-4">
            <span className="text-3xl">🍁</span>
            <h2 className="text-3xl font-black text-white uppercase">Toronto / GTA</h2>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">🛍️ Shopping Malls (Likely OPEN)</h3>
            <ul className="space-y-2 text-slate-400 text-sm italic">
              <li>• CF Toronto Eaton Centre (Main roads usually cleared)</li>
              <li>• Yorkdale Mall (Parking may be limited)</li>
              <li>• Square One (Mississauga)</li>
              <li>• Upper Canada Mall (Newmarket/Aurora)</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">🎬 Entertainment</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><strong>Cineplex Theatres:</strong> Almost always open. Check local listings for matinees.</li>
              <li><strong>The ROM:</strong> Usually remains open unless transit stops entirely.</li>
            </ul>
          </div>
        </div>

        {/* MONTREAL SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-purple-500/30 pb-4">
            <span className="text-3xl">⚜️</span>
            <h2 className="text-3xl font-black text-white uppercase">Montreal / QC</h2>
          </div>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">🚇 The Underground City (RÉSO)</h3>
            <p className="text-sm text-slate-400 mb-4">The ultimate snow day refuge. Connected to the Metro, 32km of shops and food are 100% weather-proof.</p>
            <ul className="space-y-2 text-slate-400 text-sm italic">
              <li>• Place Montréal Trust</li>
              <li>• Centre Eaton de Montréal</li>
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-3">🎿 Skiing & Outdoors</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><strong>Mont Saint-Sauveur:</strong> Only 45 mins from Montreal. Usually open and busy on snow days!</li>
              <li><strong>Mont Rigaud:</strong> "The kindergarten of skiing" is great for local families.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* CALL TO ACTION */}
      <div className="max-w-2xl mx-auto mt-20 p-8 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-3xl border border-cyan-500/30 text-center">
        <h4 className="text-xl font-black text-white uppercase mb-2">Heading out?</h4>
        <p className="text-slate-300 text-sm mb-6">Make sure your car is ready for the slush. Grab an emergency snow brush or a warm parka.</p>
        <a 
          href="https://www.amazon.ca/s?k=winter+car+emergency+kit&tag=mliselectpro-20" 
          target="_blank"
          className="inline-block bg-cyan-500 text-slate-950 font-black px-8 py-3 rounded-full uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
        >
          Winter Gear on Amazon
        </a>
      </div>
    </div>
  );
}
