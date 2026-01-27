'use client';

/**
 * ============================================================================
 * SNOW DAY PREDICTOR - GLOBAL COMMAND CENTER & INTELLIGENCE HUB
 * ============================================================================
 * Version: 20.0.0 (Automated Date Logic Integration)
 * Status: AUTOMATED / CONTENT PRESERVED
 * ============================================================================
 */

import { useState, useEffect } from 'react'; // <--- ADDED HOOKS HERE
import Link from 'next/link'; 
import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  
  // --------------------------------------------------------------------------
  // AUTOMATED DATE LOGIC (The "Noon Flip")
  // --------------------------------------------------------------------------
  const [headerInfo, setHeaderInfo] = useState({
    status: "LOADING...",
    title: "TARGET: ...",
    sub: "Initializing Chronos Protocol..."
  });

  useEffect(() => {
    // Get current time
    const now = new Date();
    const hour = now.getHours();
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    
    // Calculate Today and Tomorrow
    const todayName = days[now.getDay()];
    const tomorrowName = days[(now.getDay() + 1) % 7];

    // LOGIC: If it is past 12:00 PM, we target Tomorrow. Before 12:00 PM, we target Today's Commute.
    if (hour >= 12) {
        setHeaderInfo({
            status: "INCOMING",
            title: `TARGET: ${tomorrowName}`,
            sub: `Afternoon analytics active. Tracking the ${tomorrowName} forecast model.`
        });
    } else {
        setHeaderInfo({
            status: "ACTIVE",
            title: `TARGET: ${todayName} COMMUTE`,
            sub: `Morning verdicts confirmed. Now tracking slush density for the ${todayName} drive.`
        });
    }
  }, []);

  // --------------------------------------------------------------------------
  // SEO DATA SCHEMA (JSON-LD)
  // --------------------------------------------------------------------------
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Snow Day Predictor",
    "url": "https://schoolsnowdaypredictor.com",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "description": "Calculate the probability of a snow day or bus cancellation based on real-time weather data.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // --------------------------------------------------------------------------
  // MAIN LAYOUT RENDER
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      {/* SEO SCHEMA INJECTION */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background visual layer */}
      <Snowfall />

      {/* --- STICKY NAV + STORM TICKER --- */}
      <div className="sticky top-0 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <CheekyTicker />
        <header className="w-full py-4 px-6 flex justify-center border-b border-slate-800 bg-black/95 backdrop-blur-md">
          <div className="flex items-center gap-5"> 
            <img 
              src="/logo.png" 
              alt="Official Snow Day Predictor for Toronto, Montreal and USA" 
              className="w-16 h-16 md:w-20 md:h-20 shrink-0 hover:rotate-12 transition-transform duration-300 shadow-2xl" 
            />
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-2 uppercase font-black tracking-tighter">
                <span className="text-3xl md:text-5xl text-white">Snow Day</span>
                <span className="text-3xl md:text-5xl text-cyan-400 leading-none">Predictor</span>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="flex flex-col items-center pt-10 pb-32 px-4 relative z-10 text-balance">
        
        {/* --- DUAL VERDICT STORM HEADER (NOW AUTOMATED) --- */}
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-2 uppercase italic leading-none drop-shadow-2xl">
              <span className="sr-only">Snow Day Calculator & Predictor</span>
              Storm Status: <span className="text-cyan-400">{headerInfo.status}</span>
            </h1>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-yellow-400 mb-6 uppercase italic leading-none drop-shadow-xl">
              {headerInfo.title}
            </h2>
            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed italic">
              <span className="text-white font-bold underline decoration-yellow-500/30 underline-offset-4 uppercase">
                 {headerInfo.sub}
              </span>
            </p>
        </div>

        {/* --- THE CALCULATOR (HIGH VALUE TOOL) --- */}
        <div className="w-full max-w-2xl mb-24">
          <SnowCalculator />
        </div>

        {/* Intelligence Hub Hero Branding */}
        <div className="w-full max-w-5xl mt-16 mb-12 text-center">
            <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-700 px-10 py-5 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.3)] mb-8 border border-cyan-400/30">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg flex items-center gap-4 leading-none">
                    ❄️ Snow Day Intelligence Hub 
                    <span className="text-xs bg-red-600 px-3 py-1 rounded-full uppercase font-bold tracking-widest border border-red-400">Classified</span>
                </h2>
            </div>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium italic">
                Your ultimate storm survival guide for Ontario, Quebec & Montreal. Real-time intel, regional dossiers, and why the side streets are still a mess.
            </p>
        </div>

        {/* MAIN TACTICAL CONTAINER */}
        <div className="w-full max-w-6xl bg-slate-900/40 backdrop-blur-xl border-2 border-slate-800 rounded-[3rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.6)] space-y-24">
            
            {/* 1. REGIONAL INTEL DOSSIER */}
            <section>
                <div className="flex items-center gap-6 mb-12 justify-center md:justify-start">
                    <div className="h-10 w-2 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                        Regional <span className="text-cyan-400">Intel Dossier</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 hover:border-cyan-500/30 transition-all">
                        <div className="text-4xl mb-4 opacity-50">🏗️</div>
                        <h3 className="text-cyan-400 font-black uppercase text-xs mb-4 tracking-widest italic">Bridge Risk Matrix</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Montreal's A-40 and the GTA's DVP bridges are high-friction failure points. If bridge gridlock is detected, boards ground buses 2x faster.</p>
                    </div>
                    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 hover:border-cyan-500/30 transition-all">
                        <div className="text-4xl mb-4 opacity-50">🎰</div>
                        <h3 className="text-cyan-400 font-black uppercase text-xs mb-4 tracking-widest italic">Bus vs School Tactics</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">In Quebec, "School Open / No Buses" is a common standard. We track these probabilities separately so you aren't caught walking in a blizzard.</p>
                    </div>
                    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 hover:border-cyan-500/30 transition-all">
                        <div className="text-4xl mb-4 opacity-50">💣</div>
                        <h3 className="text-cyan-400 font-black uppercase text-xs mb-4 tracking-widest italic">Pink Zone Warning</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">When a Bomb Cyclone (Pressure Drop &gt; 24mb/24hr) hits, it creates the 'Pink Zone' on infra-red. These explosive storms trigger high-wind cancellations 12 hours earlier.</p>
                    </div>
                </div>
            </section>

            {/* 2. LIVE TACTICAL STORM FEED (Radar) */}
            <section>
                <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400 italic text-center md:text-left">Live Tactical Storm Feed</h2>
                </div>
                <div className="rounded-[2.5rem] overflow-hidden border-8 border-slate-800 shadow-2xl h-[550px] w-full bg-slate-950 relative group">
                    <iframe width="100%" height="100%" src="https://embed.windy.com/embed2.html?lat=44.50&lon=-76.56&detailLat=44.50&detailLon=-76.56&width=1200&height=550&zoom=6&level=surface&overlay=snow&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" frameBorder="0" title="Tactical Radar" className="opacity-90 group-hover:opacity-100 transition-opacity"></iframe>
                    <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 pointer-events-none">
                        <span className="text-[10px] font-bold uppercase text-white tracking-[0.25em]">Satellite Sync: Active</span>
                    </div>
                </div>
            </section>

            {/* 3. FREQUENTLY ASKED QUESTIONS (AdSense Content Layer) */}
            <section className="w-full border-t border-slate-800 pt-16">
                <div className="flex items-center gap-6 mb-12 justify-center md:justify-start">
                    <div className="h-14 w-3 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                      Frequently Asked <span className="text-cyan-400">Questions (FAQ)</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
                    {/* LEFT COLUMN: THE LOGIC MATRIX */}
                    <div className="bg-slate-950/40 p-10 rounded-[3rem] border border-slate-800 shadow-inner group space-y-8">
                        <h3 className="text-2xl font-black text-cyan-400 mb-6 uppercase tracking-tight italic border-b border-cyan-500/20 pb-4 leading-none">
                          The Logic Matrix
                        </h3>
                        
                        <div className="space-y-6">
                          <div>
                            <p className="text-white font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-3">
                              <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">01</span> The Diesel Gel Point
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                              Buses don't run on hope. At -25°C, diesel fuel transitions into a slushie-like state. If the engines won't fire, the board must retire. We weight this "Freeze Factor" heavily in our algorithm.
                            </p>
                          </div>

                          <div>
                            <p className="text-white font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-3">
                              <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">02</span> Plowing Saturation Limit
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                              Municipal plows typically manage 1 cm per hour. Once a storm enters the 3 cm/hr "Red Zone," the plows lose the war. We calculate the saturation rate to predict the exact moment the Superintendent surrenders.
                            </p>
                          </div>

                          <div>
                            <p className="text-white font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-3">
                              <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">03</span> The Pajama Index (Sfi)
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                              After 3 consecutive days of sub-zero temps, the Superintendent's "Fatigue Index" spikes. Human psychology shows that the urge to cancel school increases by 40% on a Friday compared to a Tuesday.
                            </p>
                          </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: BOMB CYCLONE & GEAR */}
                    <div className="space-y-8">
                      <div className="bg-slate-950/40 p-10 rounded-[3rem] border border-slate-800 shadow-inner group border-red-500/20 relative overflow-hidden">
                          <div className="absolute -top-4 -right-4 text-9xl opacity-5 group-hover:opacity-10 transition-all">💣</div>
                          <h3 className="text-2xl font-black text-red-500 mb-6 uppercase tracking-tight leading-none italic">Bomb Cyclone Directive</h3>
                          <p className="text-slate-400 text-base leading-relaxed italic pr-12">
                              Bombogenesis is defined by a pressure drop of &gt; 24mb in 24 hours. These storms create chaotic wind patterns that can tip high-profile vehicles (buses). If our long-range scanner detects a pressure vacuum, the 💣 icon is triggered automatically.
                          </p>
                      </div>

                      <div className="bg-yellow-500/10 border-2 border-yellow-500/20 p-10 rounded-[3rem] relative overflow-hidden">
                          <h4 className="text-yellow-500 font-black uppercase text-xs tracking-widest mb-4 italic leading-none flex items-center gap-3">
                            <span className="animate-bounce">🛒</span> Strategic Supply Notice
                          </h4>
                          <p className="text-white text-sm font-bold leading-relaxed mb-6 italic">
                            Retail reports from Ontario indicate a 400% surge in sled and shovel demand. Secure your tactical winter gear before the next "Pink Zone" lock-in.
                          </p>
                          <a href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 text-slate-900 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest block text-center hover:scale-105 transition-transform shadow-2xl">
                            🛒 Secure Gear on Amazon
                          </a>
                      </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================
                4. NEW BLOG SECTION (DECRYPTED INTEL ARCHIVE)
                ========================================================================
            */}
            <section className="w-full border-t border-slate-800 pt-16">
                 <div className="flex items-center gap-6 mb-12 justify-center md:justify-start">
                    <div className="h-14 w-3 bg-red-600 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                      Decrypted <span className="text-red-600">Intel Archive</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     
                     {/* BLOG CARD: PLOW PANIC (New) */}
                     <Link href="/blog/plow-panic-tuesday" className="group bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-orange-500/50 hover:-translate-y-2 transition-all shadow-xl relative overflow-hidden flex flex-col justify-between">
                         <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-110 transition-transform duration-700">🚜</div>
                         <div>
                            <div className="text-5xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all">❄️</div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-3 group-hover:text-orange-400">The Plow Panic</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                                Snow stops at 3AM, but school is closed? Why side-street "Windrows" are the real enemy.
                            </p>
                         </div>
                         <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tuesday Intel</span>
                             <span className="text-orange-400 text-xs font-bold">Read →</span>
                         </div>
                     </Link>

                     {/* BLOG CARD: The 6AM Silence */}
                     <Link href="/blog/the-6am-silence" className="group bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 hover:-translate-y-2 transition-all shadow-xl relative overflow-hidden flex flex-col justify-between">
                         <div>
                            <div className="text-5xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all">📞</div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-3 group-hover:text-cyan-400">The 6:00 AM Silence</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                                Why do they wait until the last second? We analyze the "Chain of Command" between spotters and superintendents.
                            </p>
                         </div>
                         <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Analysis</span>
                             <span className="text-cyan-400 text-xs font-bold">Read →</span>
                         </div>
                     </Link>

                     {/* BLOG CARD: Will TDSB Close? */}
                     <Link href="/blog/will-tdsb-close-monday" className="group bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 hover:-translate-y-2 transition-all shadow-xl relative overflow-hidden flex flex-col justify-between">
                         <div>
                            <div className="text-5xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all">📉</div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-3 group-hover:text-cyan-400">Will TDSB Close?</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                                Analyzing the forecast data. Historical triggers vs. current accumulation rates.
                            </p>
                         </div>
                         <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Forecast Model</span>
                             <span className="text-cyan-400 text-xs font-bold">Read →</span>
                         </div>
                     </Link>

                     {/* BLOG CARD: Snow Day Survival */}
                     <Link href="/blog/what-is-open-snow-day" className="group bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 hover:-translate-y-2 transition-all shadow-xl relative overflow-hidden flex flex-col justify-between">
                         <div>
                            <div className="text-5xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all">🛍️</div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-3 group-hover:text-cyan-400">Survival Guide</h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                                School is closed, but the city isn't. Here is what is open in Toronto & Montreal (Malls, Movies, Skiing).
                            </p>
                         </div>
                         <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">City Intel</span>
                             <span className="text-cyan-400 text-xs font-bold">Read →</span>
                         </div>
                     </Link>

                </div>
            </section>

        </div>

        {/* --- HARDENED FOOTER & TACTICAL DISCLAIMER --- */}
        <footer className="w-full text-center border-t border-slate-800 pt-16 pb-20 mt-24 italic text-slate-500 text-[11px] uppercase tracking-widest leading-relaxed px-6 relative overflow-hidden">
            
            {/* CHEEKY STUDENT EASTER EGG */}
            <div className="flex flex-col items-center justify-center mb-10 not-italic">
                <div className="relative">
                    <span className="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">😴</span>
                    <span className="absolute -top-2 -right-5 text-2xl animate-bounce duration-[2000ms] text-cyan-400/40 font-black">Z</span>
                    <span className="absolute -top-7 -right-1 text-sm animate-bounce duration-[3000ms] text-cyan-400/20 font-black">z</span>
                </div>
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] mt-4">
                    Current Status: dreaming of snow
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* System Status Authority Line */}
                <p className="text-cyan-400/60 font-black tracking-[0.3em] not-italic">
                    System Status: v19.1.0 (Blizzard Hardened) // Verified for Jan 27 Storm Cycle
                </p>

                {/* The Legal & Affiliation Block */}
                <div className="opacity-60 space-y-4">
                    <p>
                        © 2026 Snow Day Predictor. Not affiliated with the TDSB, YRDSB, PDSB, EMSB, or any official school board transport authority.
                    </p>
                    
                    {/* MANDATORY ADSENSE LINKS */}
                    <div className="flex justify-center gap-6 mt-4 text-[10px] font-bold text-slate-400/80">
                         <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                         <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
                         <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Us</Link>
                    </div>

                    <div className="max-w-2xl mx-auto leading-normal lowercase first-letter:uppercase tracking-normal font-medium border-t border-slate-800/50 pt-8 mt-8">
                        <p className="mb-4">
                            Data analyzed via NOAA satellite infrared feed and Open-Meteo tactical API. Predictive modeling is provided for planning and entertainment purposes only. 
                        </p>
                        <p className="text-slate-400 font-bold italic">
                            Always cross-verify with your local school board’s official social media channels or website for final, binding closure announcements before deciding to 
                            <span className="text-cyan-400/80 mx-1 underline decoration-cyan-500/20 underline-offset-4">stay in bed</span> 
                            and ignore your alarm.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
