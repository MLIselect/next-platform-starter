'use client'

import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      
      {/* BACKGROUND SNOW */}
      <Snowfall />

      {/* HEADER & TICKER */}
      <div className="sticky top-0 z-50 shadow-2xl">
        <CheekyTicker />
        <header className="w-full py-3 px-4 flex justify-center border-b border-slate-800 bg-black/95 backdrop-blur-md">
          <div className="flex items-center gap-4"> 
            <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-white">SNOW DAY</span>
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-cyan-400">PREDICTOR</span>
            </div>
          </div>
        </header>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center pt-8 pb-20 px-4 relative z-10">
        
        <h1 className="text-3xl md:text-5xl font-black text-center tracking-tighter text-white mb-3">
          Will school be closed?
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium mb-8 text-center max-w-2xl">
          Massive Storm Incoming (Jan 25-26).
          <br/>
          <span className="text-cyan-400 font-bold">Check your odds for Snow & Ice Days.</span>
        </p>

        {/* CALCULATOR */}
        <div className="w-full max-w-lg relative z-10 mb-8">
          <SnowCalculator />
        </div>

        {/* LIVE RADAR */}
        <div className="w-full max-w-[728px] mb-12">
            <h3 className="text-center text-slate-400 text-sm font-bold uppercase mb-4 tracking-wider">🔴 Live Ice & Snow Tracker</h3>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-[350px] md:h-[400px]">
                <iframe 
                    width="100%" height="100%" 
                    src="https://embed.windy.com/embed2.html?lat=43.65&lon=-79.38&detailLat=43.65&detailLon=-79.38&width=650&height=450&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" 
                    frameBorder="0">
                </iframe>
            </div>
        </div>

        {/* TRUST SIGNALS (With Drifting Bus) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500 mb-16">
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2">🧊</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3>
                <p className="text-sm mt-1">We track Freezing Rain.</p>
           </div>
           {/* Drifting Bus (Uses CSS defined in Layout) */}
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div className="text-4xl mb-2 group-hover:animate-drift">🚌</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3>
                <p className="text-sm mt-1 group-hover:text-yellow-400">Bus drift calculations included.</p>
           </div>
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2">📡</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3>
                <p className="text-sm mt-1">Powered by NOAA/Open-Meteo.</p>
           </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 text-slate-600 text-xs text-center border-t border-slate-800 pt-8 w-full pb-8">
          <p className="mb-4">© 2026 Snow Day Predictor. Not affiliated with any school district.</p>
          <div className="mb-6">
            <a href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-sm py-3 px-6 rounded-full hover:scale-105 transition-transform shadow-lg">
               🛷 STORM PREP: CLICK HERE TO GRAB A SLED BEFORE THEY SELL OUT! 🛷
            </a>
          </div>
          <p className="max-w-md mx-auto opacity-50">
            Disclaimer: Results for entertainment purposes only. As an Amazon Associate, we earn from qualifying purchases.
            <br/><span className="text-[10px] text-slate-800">v14.0 (Live Stable)</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
