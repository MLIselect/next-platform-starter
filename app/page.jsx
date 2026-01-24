import SnowCalculator from '../components/SnowCalculator';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-yellow-400 selection:text-slate-900">
      
      {/* 1. The Fake News Ticker (Cheeky) */}
      <div className="bg-yellow-400 text-slate-900 py-2 px-4 font-bold text-sm uppercase tracking-widest overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          BREAKING: Math homework causes sadness • 100% chance of hot cocoa • Teachers spotting buying wine in bulk •
        </div>
      </div>

      {/* 2. The Hero Section */}
      <main className="flex flex-col items-center justify-center pt-16 px-4">
        
        {/* Logo / Header Area */}
        <div className="text-center mb-10 space-y-4">
          <div className="text-6xl mb-2">❄️😎</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg">
            SNOW DAY <br className="md:hidden"/> PREDICTOR
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto">
            The only weatherman that cares about your sleep schedule.
          </p>
        </div>

        {/* 3. The Calculator Widget */}
        <div className="w-full max-w-lg relative z-10">
          {/* Decorative blurred glow behind the calculator */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          <SnowCalculator />
        </div>

        {/* 4. Professional "Trust" Footer */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-slate-500 max-w-4xl border-t border-slate-800 pt-10 mb-10">
          <div>
            <h3 className="text-slate-300 font-bold uppercase tracking-wider text-sm mb-2">Accuracy</h3>
            <p className="text-sm">Powered by real meteorological data (and hope).</p>
          </div>
          <div>
            <h3 className="text-slate-300 font-bold uppercase tracking-wider text-sm mb-2">Speed</h3>
            <p className="text-sm">Predictions faster than your bus route.</p>
          </div>
          <div>
            <h3 className="text-slate-300 font-bold uppercase tracking-wider text-sm mb-2">Legal</h3>
            <p className="text-sm">Don't sue us if you have to take the quiz.</p>
          </div>
        </div>

      </main>
    </div>
  );
}
