import SnowCalculator from '../components/SnowCalculator';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* 1. THE CHEEKY TICKER (Updated for Students & Parents) */}
      <div className="bg-yellow-400 text-slate-900 py-2 px-4 font-bold text-xs md:text-sm uppercase tracking-widest overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          🚨 BREAKING: Students praying for ice • Parents stocking up on "sanity juice" (wine) • Teachers refreshing the forecast every 3 seconds • 100% chance of chaos •
        </div>
      </div>

      {/* 2. HEADER (Clean & Branded) */}
      <header className="w-full p-6 flex justify-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            {/* Make sure logo.png is in your public folder */}
            <Image 
              src="/logo.png" 
              alt="Logo" 
              fill 
              className="object-contain" 
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            SNOW DAY <span className="text-cyan-400">PREDICTOR</span>
          </span>
        </div>
      </header>

      <main className="flex flex-col items-center pt-12 pb-20 px-4">
        
        {/* 3. HERO SECTION */}
        <h1 className="text-4xl md:text-6xl font-black text-center tracking-tighter text-white mb-4 drop-shadow-lg">
          Will school be closed?
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 text-center max-w-2xl">
          We analyze the storms, the ice, and the Superintendent's mood.
          <br/>
          <span className="text-cyan-400 font-bold">Accurate predictions for desperate students & panic-buying parents.</span>
        </p>

        {/* 4. CALCULATOR WIDGET */}
        <div className="w-full max-w-lg relative z-10 mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 animate-pulse"></div>
          <SnowCalculator />
        </div>

        {/* 5. ADVERTISEMENT PLACEHOLDER (Google Ads) */}
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 text-sm rounded-lg mb-12">
          <span className="font-mono text-xs tracking-widest uppercase">Google Ads Space (Coming Soon)</span>
        </div>

        {/* 6. TRUST SIGNALS (Why we are accurate) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500">
           <div>
             <div className="text-2xl mb-2">🧊</div>
             <h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3>
             <p className="text-sm mt-1">We know that 0.1" of ice cancels school faster than 5" of snow.</p>
           </div>
           <div>
             <div className="text-2xl mb-2">🚌</div>
             <h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3>
             <p className="text-sm mt-1">If the bus can't drift around a corner, you aren't going.</p>
           </div>
           <div>
             <div className="text-2xl mb-2">📡</div>
             <h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3>
             <p className="text-sm mt-1">Powered by NOAA & Open-Meteo live weather models.</p>
           </div>
        </div>

        {/* 7. FOOTER */}
        <footer className="mt-20 text-slate-600 text-xs text-center border-t border-slate-800 pt-8 w-full">
          <p className="mb-2">© 2026 Snow Day Predictor. Not affiliated with your school district.</p>
          <p>Disclaimer: If we say "Snow Day" and you skip, but school is open... that's a you problem.</p>
        </footer>

      </main>
    </div>
  );
}
