import SnowCalculator from '../components/SnowCalculator';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* TICKER */}
      <div className="bg-yellow-400 text-slate-900 py-2 px-4 font-bold text-xs md:text-sm uppercase tracking-widest overflow-hidden whitespace-nowrap">
        <p className="animate-pulse text-center">
          🚨 STORM ALERT: Teachers everywhere are crossing their fingers right now. 🚨
        </p>
      </div>

      <main className="flex flex-col items-center pt-8 pb-12 px-4">
        
        {/* LOGO SECTION */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
           {/* Ensure you uploaded 'logo.png' to the public folder! */}
           <Image 
             src="/logo.png" 
             alt="Cool Snowflake" 
             fill 
             className="object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
             priority
           />
        </div>

        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-black text-center tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
          SNOW DAY<br/>PREDICTOR
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 text-center max-w-xl">
          Will you survive tomorrow? <br/>
          <span className="text-cyan-400">Enter your Zip Code to find out.</span>
        </p>

        {/* CALCULATOR */}
        <div className="w-full max-w-lg relative z-10 mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25"></div>
          <SnowCalculator />
        </div>

        {/* ADVERTISEMENT PLACEHOLDER */}
        {/* Once Google approves you, you paste their code inside this box */}
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600 text-sm rounded-lg mb-12">
          <span className="font-mono">Google Ads will appear here</span>
        </div>

        {/* FOOTER */}
        <footer className="text-slate-600 text-xs text-center max-w-md mx-auto leading-relaxed">
          <p className="mb-4">
            <strong>Disclaimer:</strong> This tool uses weather data but the "Snow Day Chance" is a cheeky algorithm. 
            If you skip school and get detention, that is on you, my friend.
          </p>
          <p>© 2026 Snow Day Predictor. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}
