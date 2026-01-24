import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* 1. STICKY WRAPPER */}
      <div className="sticky top-0 z-50 shadow-2xl">
        <CheekyTicker />
        
        {/* HEADER: Black background to match your logo */}
        <header className="w-full p-4 md:p-6 flex justify-center border-b border-slate-800 bg-black/90 backdrop-blur-md transition-all">
          <div className="flex items-center gap-4"> 
            
            {/* LOGO: Pointing to '/logo.png' now */}
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image 
                src="/logo.png" 
                alt="Snow Day Predictor Logo" 
                fill 
                className="object-contain" 
              />
            </div>
            
            {/* TEXT: Stacked for a professional brand look */}
            <div className="flex flex-col justify-center">
              <span className="font-black text-xl md:text-2xl tracking-tight text-white leading-none">
                SNOW DAY
              </span>
              <span className="font-black text-xl md:text-2xl tracking-tight text-cyan-400 leading-none">
                PREDICTOR
              </span>
            </div>
          </div>
        </header>
      </div>

      <main className="flex flex-col items-center pt-12 pb-20 px-4">
        
        {/* 2. HERO */}
        <h1 className="text-4xl md:text-6xl font-black text-center tracking-tighter text-white mb-4 drop-shadow-lg">
          Will school be closed?
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 text-center max-w-2xl">
          Massive Storm Incoming (Jan 25-26).
          <br/>
          <span className="text-cyan-400 font-bold">Check your odds for Snow & Ice Days.</span>
        </p>

        {/* 3. CALCULATOR */}
        <div className="w-full max-w-lg relative z-10 mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 animate-pulse pointer-events-none"></div>
          <div className="relative z-20">
            <SnowCalculator />
          </div>
        </div>

        {/* 4. ADS */}
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 text-sm rounded-lg mb-12">
          <span className="font-mono text-xs tracking-widest uppercase">Google Ads Space (Processing...)</span>
        </div>

        {/* 5. TRUST SIGNALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500">
           <div><div className="text-2xl mb-2">🧊</div><h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3><p className="text-sm mt-1">We track Freezing Rain.</p></div>
           <div><div className="text-2xl mb-2">🚌</div><h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3><p className="text-sm mt-1">Bus drift calculations included.</p></div>
           <div><div className="text-2xl mb-2">📡</div><h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3><p className="text-sm mt-1">Powered by NOAA/Open-Meteo.</p></div>
        </div>

        {/* 6. FOOTER (With Amazon Link + LEGAL Disclaimer) */}
        <footer className="mt-20 text-slate-600 text-xs text-center border-t border-slate-800 pt-8 w-full pb-8">
          <p className="mb-4">© 2026 Snow Day Predictor. Not affiliated with any school district.</p>
          
          <div className="mb-6">
            <a 
              href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-sm py-3 px-6 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
               🛷 STORM PREP: CLICK HERE TO GRAB A SLED BEFORE THEY SELL OUT! 🛷
            </a>
          </div>

          <p className="max-w-md mx-auto opacity-50">
            Disclaimer: Results for entertainment purposes only. As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </footer>

      </main>
    </div>
  );
}
