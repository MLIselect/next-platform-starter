import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';
import Script from 'next/script';

// 1. SEO METADATA
export const metadata = {
  title: 'Snow Day Predictor 2026 – Will School Be Closed? | US & Canada',
  description: 'Calculate your odds of a snow day based on real-time NOAA & Open-Meteo weather data. Check freezing rain, snow drift, and bus cancellation odds for Ontario (Aurora, Barrie) and the US (Buffalo, Detroit).',
  keywords: ['snow day calculator', 'school closing predictor', 'snow day odds', 'will school be closed', 'bus cancellation ontario', 'snow day prediction 14201', 'snow day prediction L4G'],
  openGraph: {
    title: 'Snow Day Predictor 2026 ❄️',
    description: 'Will school be closed tomorrow? Check your odds now.',
    type: 'website',
  },
};

export default function Page() {
  // 2. STRUCTURED DATA (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Snow Day Predictor',
    'url': 'https://schoolsnowdaypredictor.com',
    'description': 'AI-powered calculator for school snow day probabilities based on weather data.',
    'applicationCategory': 'WeatherApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 0. BACKGROUND SNOW */}
      <Snowfall />

      {/* 1. STICKY WRAPPER */}
      <div className="sticky top-0 z-50 shadow-2xl">
        <CheekyTicker />
        
        {/* SLIM HEADER */}
        <header className="w-full py-3 px-4 flex justify-center border-b border-slate-800 bg-black/95 backdrop-blur-md transition-all">
          <div className="flex items-center gap-4"> 
            
            {/* LOGO */}
            <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
              <img 
                src="/logo.png" 
                alt="Snow Day Predictor Logo" 
                className="w-full h-full object-contain hover:rotate-12 transition-transform duration-300" 
              />
            </div>
            
            {/* TEXT */}
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-white leading-none whitespace-nowrap shadow-black drop-shadow-sm">
                SNOW DAY
              </span>
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-cyan-400 leading-none whitespace-nowrap drop-shadow-sm">
                PREDICTOR
              </span>
            </div>
          </div>
        </header>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center pt-8 pb-20 px-4 relative z-10">
        
        {/* 2. HERO */}
        <h1 className="text-3xl md:text-5xl font-black text-center tracking-tighter text-white mb-3 drop-shadow-lg">
          Will school be closed?
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium mb-8 text-center max-w-2xl">
          Massive Storm Incoming (Jan 25-26).
          <br/>
          <span className="text-cyan-400 font-bold">Check your odds for Snow & Ice Days.</span>
        </p>

        {/* 3. CALCULATOR */}
        <div className="w-full max-w-lg relative z-10 mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 animate-pulse pointer-events-none"></div>
          <div className="relative z-20">
            <SnowCalculator />
          </div>
        </div>

        {/* 3.5 LIVE RADAR */}
        <div className="w-full max-w-[728px] mb-12">
            <h3 className="text-center text-slate-400 text-sm font-bold uppercase mb-4 tracking-wider">🔴 Live Ice & Snow Tracker</h3>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-[350px] md:h-[400px]">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://embed.windy.com/embed2.html?lat=43.65&lon=-79.38&detailLat=43.65&detailLon=-79.38&width=650&height=450&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" 
                    frameBorder="0">
                </iframe>
            </div>
        </div>

        {/* 4. ADS */}
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-600 text-sm rounded-lg mb-12">
          <span className="font-mono text-xs tracking-widest uppercase">Google Ads Space (Processing...)</span>
        </div>

        {/* 5. TRUST SIGNALS (With Drifting Bus Animation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500 mb-16">
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧊</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3>
                <p className="text-sm mt-1">We track Freezing Rain.</p>
           </div>
           
           {/* THE DRIFTING BUS */}
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer overflow-hidden">
                <div className="text-4xl mb-2 bus-icon">🚌</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3>
                <p className="text-sm mt-1 group-hover:text-yellow-400 transition-colors">Bus drift calculations included.</p>
           </div>
           
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📡</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3>
                <p className="text-sm mt-1">Powered by NOAA/Open-Meteo.</p>
           </div>
        </div>

        {/* 6. FAQ SECTION (SEO Content Depth) */}
        <div className="w-full max-w-2xl text-left border-t border-slate-800 pt-12 pb-12">
            <h2 className="text-2xl font-black text-white mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">How accurate is the Snow Day Predictor?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We use real-time data from NOAA and Open-Meteo to track snow accumulation, wind speeds, and most importantly, freezing rain. 
                        In regions like <span className="text-white">Aurora, Barrie, and Buffalo</span>, ice is the main factor for bus cancellations. 
                        While we can calculate the odds, the final decision is always up to the school district superintendent.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">Does this work for US and Canada?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Yes! Our algorithm works for any 5-digit US Zip Code (e.g., <span className="text-white">14201, 60601, 48201</span>) 
                        and any Canadian Postal Code (e.g., <span className="text-white">L4G, L9W, L4N</span>). 
                        We specifically tune our "Ice Factor" for the Great Lakes region where mixed precipitation is common.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">What triggers a "God Tier" snow day?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        A score over 80% usually requires a "Triple Threat": Heavy Snow (6+ inches), High Winds (40+ mph), 
                        and Freezing Temps. If Freezing Rain is involved, the odds skyrocket because buses cannot operate safely on ice.
                    </p>
                </div>
            </div>
        </div>

        {/* 7. FOOTER */}
        <footer className="mt-8 text-slate-600 text-xs text-center border-t border-slate-800 pt-8 w-full pb-8">
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
            <br/><span className="text-[10px] text-slate-800">v12.0 (SEO Mega Pack)</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
