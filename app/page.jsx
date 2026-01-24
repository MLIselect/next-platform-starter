import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* 1. TICKER */}
      <CheekyTicker />

      {/* 2. HEADER */}
      <header className="w-full p-6 flex justify-center border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            SNOW DAY <span className="text-cyan-400">PREDICTOR</span>
          </span>
        </div>
      </header>

      <main className="flex flex-col items-center pt-12 pb-20 px-4">
        
        {/* 3. HERO */}
        <h1 className="text-4xl md:text-6xl font-black text-center tracking-tighter text-white mb-4 drop-shadow-lg">
          Will school be closed?
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 text-center max-w-2xl">
          Massive Storm Incoming (Jan 25-26).
          <br/>
          <span className="text-cyan-400 font-bold">Check your odds for Snow & Ice Days.</span>
        </p>

        {/* 4. CALCULATOR (With Z-Index Fix) */}
        <div className="w-full max-w-lg relative z-10 mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 animate-pulse pointer-events-none"></div>
          <div className="relative z-20">
            <SnowCalculator />
          </div>
        </div>

        {/* 5. ADS */}
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 text-sm rounded-lg mb-12">
          <span className="font-mono text-xs tracking-widest uppercase">Google Ads Space (Processing...)</span>
        </div>

        {/* 6. TRUST SIGNALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500">
           <div><div className="text-2xl mb-2">🧊</div><h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3><p className="text-sm mt-1">We track Freezing Rain.</p></div>
           <div><div className="text-2xl mb-2">🚌</div><h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3><p className="text-sm mt-1">Bus drift calculations included.</p></div>
           <div><div className="text-2xl mb-2">📡</div><h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3><p className="text-sm mt-1">Powered by NOAA/Open-Meteo.</p></div>
        </div>

        {/* 7. FOOTER */}
        <footer className="mt-20 text-slate-600 text-xs text-center border-t border-slate-800 pt-8 w-full pb-8">
          <p className="mb-4">© 2026 Snow Day Predictor. Not affiliated with any school district.</p>
          <div className="mb-4">
            <a href="https://www.amazon.ca/s?k=snow+sled&tag=YOUR_TAG" target="_blank" className="text-cyan-500 hover:text-cyan-400 underline font-bold text-sm">
               ❄️ Don't get caught bored: Grab a Sled on Amazon NOW! ❄️
            </a>
          </div>
          <p>Disclaimer: Results for entertainment purposes only.</p>
        </footer>
      </main>
    </div>
  );
}
