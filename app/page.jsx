'use client';

/**
 * SNOW DAY PREDICTOR - GLOBAL COMMAND CENTER
 * -----------------------------------------
 * Target Event: Ontario & Quebec Blizzard (Jan 26)
 * Build: 17.0.1 (Intelligence Hub Edition)
 */

import { useState } from 'react'; 
import Link from 'next/link'; 
import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  const [activeTab, setActiveTab] = useState('status');

  // --- DYNAMIC RISK STYLING ---
  // We use specific orange/red gradients to drive urgency in the assessment board
  const getRiskStyle = (prob) => {
    const isWarning = ["85%", "90%", "95%"].includes(prob);
    return {
      border: isWarning ? "border-orange-500" : "border-red-500",
      badge: isWarning ? "bg-orange-500" : "bg-red-500",
      text: isWarning ? "text-orange-400" : "text-red-400"
    };
  };

  // --- EXPANDED LIVE STATUS DATA ---
  // Optimized for Jan 26 traffic across major metropolitan zones
  const boards = [
    { 
      name: "English Montreal Board (EMSB)", 
      region: "QC", 
      subtitle: "English Sector", 
      status: "BUSES CANCELLED*", 
      probability: "100%", 
      time: "Official Alert →", 
      link: "https://www.emsb.qc.ca/emsb/services/transportation" 
    },
    { 
      name: "York Region District (YRDSB/YCDSB)", 
      region: "ON", 
      subtitle: "Aurora / Newmarket / Vaughan", 
      status: "CLOSED", 
      probability: "100%", 
      time: "York Updates →", 
      link: "https://www2.yrdsb.ca/" 
    },
    { 
      name: "Commission scolaire de Montréal (CSSDM)", 
      region: "QC", 
      subtitle: "French Sector", 
      status: "OPEN - NO BUSES", 
      probability: "95%", 
      time: "Storm Status →", 
      link: "https://www.cssdm.gouv.qc.ca/citoyens/info-tempete/" 
    },
    { 
      name: "Toronto District Board (TDSB)", 
      region: "ON", 
      subtitle: "Ontario Board", 
      status: "CLOSED", 
      probability: "100%", 
      time: "TDSB Updates →", 
      link: "https://www.tdsb.on.ca/" 
    },
    { 
      name: "Peel District Board (PDSB)", 
      region: "ON", 
      subtitle: "Mississauga / Brampton", 
      status: "CLOSED", 
      probability: "100%", 
      time: "Board Status →", 
      link: "https://www.peelschools.org/" 
    },
    { 
      name: "Durham District Board (DDSB)", 
      region: "ON", 
      subtitle: "Pickering / Oshawa", 
      status: "CLOSED", 
      probability: "100%", 
      time: "Durham Alerts →", 
      link: "https://www.ddsb.ca/" 
    },
    { 
      name: "Ottawa-Carleton Board (OCDSB)", 
      region: "ON", 
      subtitle: "Capital Region", 
      status: "WARNING", 
      probability: "85%", 
      time: "Ottawa Alert →", 
      link: "https://ocdsb.ca/" 
    },
    { 
      name: "Halton District Board (HDSB)", 
      region: "ON", 
      subtitle: "Oakville / Burlington", 
      status: "CLOSED", 
      probability: "100%", 
      time: "Halton Status →", 
      link: "https://www.hdsb.ca/" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      {/* Animated snowfall background remains constant */}
      <Snowfall />

      {/* --- STICKY NAV + TICKER --- */}
      <div className="sticky top-0 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <CheekyTicker />
        <header className="w-full py-4 px-6 flex justify-center border-b border-slate-800 bg-black/95 backdrop-blur-md">
          <div className="flex items-center gap-5"> 
            <img 
              src="/logo.png" 
              alt="Snow Day Predictor Logo" 
              className="w-16 h-16 md:w-20 md:h-20 shrink-0 hover:rotate-12 transition-transform duration-300 shadow-2xl" 
            />
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-2 uppercase font-black tracking-tighter">
                <span className="text-3xl md:text-5xl text-white">Snow Day</span>
                <span className="text-3xl md:text-5xl text-cyan-400 leading-none">Predictor</span>
              </div>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1 hidden md:block">Real-Time Superintendent Logic Engine</p>
            </div>
          </div>
        </header>
      </div>

      <main className="flex flex-col items-center pt-10 pb-32 px-4 relative z-10 text-balance">
        
        {/* --- DYNAMIC STORM HEADER --- */}
        <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 uppercase italic leading-none drop-shadow-2xl">
                Will School Be Closed?
            </h1>
            <div className="inline-flex items-center gap-3 bg-red-600/10 border border-red-500/20 px-6 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <p className="text-red-400 font-bold text-xs md:text-base uppercase tracking-widest">
                    Massive Storm Update: January 26, 2026
                </p>
            </div>
            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed italic">
                Our sensors are detecting <span className="text-cyan-400 font-black underline decoration-cyan-500/30 underline-offset-8">record-breaking snowfall</span> and extreme wind chill grounding all buses across Ontario & Quebec.
            </p>
        </div>

        {/* --- THE CALCULATOR (CENTERPIECE) --- */}
        <div className="w-full max-w-2xl mb-12">
          <SnowCalculator />
        </div>

        {/* --- HIGH-CONVERSION AMAZON SECTION: STORM PREP --- */}
        <div className="w-full max-w-2xl mb-16">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform active:scale-95">
                <a href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" target="_blank" className="bg-slate-900 flex items-center gap-4 p-5 rounded-xl border border-yellow-500/20">
                    <div className="text-4xl">🛷</div>
                    <div className="text-left">
                        <h4 className="font-black text-white uppercase text-xs tracking-widest leading-none mb-1">Affiliate Update: Essential Storm Gear</h4>
                        <p className="text-yellow-500 font-bold text-sm leading-tight italic">Sleds and shovels are selling out. View on Amazon →</p>
                    </div>
                </a>
            </div>
        </div>

        {/* ============================================================================
            THE SNOW DAY INTELLIGENCE HUB 2026 
            ============================================================================ */}
        
        {/* Hub Hero Header */}
        <div className="w-full max-w-5xl mt-8 mb-12 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-block bg-gradient-to-r from-cyan-600 to-blue-700 px-10 py-5 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.3)] mb-8 border border-cyan-400/30">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg flex items-center gap-4">
                    ❄️ Snow Day Intelligence Hub 
                    <span className="text-xs bg-red-600 px-3 py-1 rounded-full uppercase font-bold animate-pulse tracking-widest border border-red-400">Classified</span>
                </h2>
            </div>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium italic">
                Your ultimate storm survival guide for Ontario, Quebec & Montreal. Real-time intel, board breakdowns, and tactical threat assessments.
            </p>
        </div>

        {/* THE TACTICAL HUB CONTAINER (Wraps all intel sections) */}
        <div className="w-full max-w-6xl bg-slate-900/40 backdrop-blur-xl border-2 border-slate-800 rounded-[3rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.6)] space-y-24">
            
            {/* 1. QUEBEC & MONTREAL INTEL DOSSIER (Formerly Policy Guide) */}
            <section>
                <div className="flex items-center gap-6 mb-10 justify-center md:justify-start">
                    <div className="h-10 w-2 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                        Quebec & Montreal <span className="text-cyan-400">Intel Dossier</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="bg-slate-800/40 p-10 rounded-3xl border border-slate-700 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 text-8xl opacity-5 group-hover:opacity-10 transition-all">🏗️</div>
                        <h3 className="text-cyan-400 font-black uppercase text-sm mb-4 tracking-widest group-hover:text-white transition-colors italic">The Island Factor</h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            Montreal boards like <strong>EMSB</strong> prioritize bridge safety. If the Champlain or Mercier is a gridlock of ice, buses ground instantly even if the local streets look clear.
                        </p>
                    </div>
                    <div className="bg-slate-800/40 p-10 rounded-3xl border border-slate-700 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 text-8xl opacity-5 group-hover:opacity-10 transition-all">🎰</div>
                        <h3 className="text-cyan-400 font-black uppercase text-sm mb-4 tracking-widest group-hover:text-white transition-colors italic">Bus vs School Odds</h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            In Quebec, "School Open / No Buses" is a standard tactical move. We track these probabilities separately to ensure you don't get stuck walking through a blizzard.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. REAL-TIME THREAT ASSESSMENT BOARD (Formerly Status Board Tabs) */}
            <section>
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-950 p-2 rounded-full inline-flex shadow-2xl border border-slate-800">
                      <button 
                        onClick={() => setActiveTab('status')} 
                        className={`px-10 py-3 rounded-full text-xs font-black transition-all duration-300 tracking-widest ${activeTab === 'status' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                      >
                        🚨 THREAT ASSESSMENT
                      </button>
                      <button 
                        onClick={() => setActiveTab('exams')} 
                        className={`px-10 py-3 rounded-full text-xs font-black transition-all duration-300 tracking-widest ${activeTab === 'exams' ? 'bg-yellow-400 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                      >
                        📝 EXAM DISRUPTION
                      </button>
                    </div>
                </div>

                {activeTab === 'status' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-500">
                        {boards.map((board, index) => {
                          const style = getRiskStyle(board.probability);
                          return (
                            <div key={index} className={`bg-slate-950/60 backdrop-blur-sm border-l-8 ${style.border} rounded-2xl p-6 flex flex-col justify-between shadow-xl group hover:bg-slate-900 transition-all hover:-translate-y-1`}>
                                <div className="text-left">
                                  <div className="flex justify-between items-start mb-2 gap-3">
                                      <h3 className="font-black text-[11px] text-white leading-tight uppercase italic">{board.name}</h3>
                                      <span className={`${style.badge} text-white text-[8px] font-black px-2 py-1 rounded uppercase shadow-lg`}>{board.status}</span>
                                  </div>
                                  <p className="text-slate-500 text-[9px] uppercase font-black tracking-widest mb-6">[{board.region}] {board.subtitle}</p>
                                </div>
                                <div className="flex items-end justify-between mt-4">
                                    <div className="text-left">
                                        <p className="text-slate-600 text-[8px] uppercase font-black tracking-widest mb-1 leading-none">Threat Level</p>
                                        <p className={`text-3xl font-black ${style.text} tracking-tighter`}>{board.probability}</p>
                                    </div>
                                    <div className="text-right">
                                        <a 
                                          href={board.link} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="text-[10px] font-black text-cyan-400 hover:text-white uppercase transition-colors underline underline-offset-4 italic tracking-widest"
                                        >
                                          Intel →
                                        </a>
                                    </div>
                                </div>
                            </div>
                          );
                        })}
                    </div>
                )}
            </section>

            {/* 3. LIVE TACTICAL STORM FEED (Formerly Radar) */}
            <section>
                <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400 italic">Live Tactical Storm Feed</h2>
                </div>
                <div className="rounded-[2.5rem] overflow-hidden border-8 border-slate-800 shadow-2xl h-[550px] w-full bg-slate-950 relative group">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://embed.windy.com/embed2.html?lat=44.50&lon=-76.56&detailLat=44.50&detailLon=-76.56&width=1200&height=550&zoom=6&level=surface&overlay=snow&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" 
                        frameBorder="0" 
                        title="Tactical Radar Feed" 
                        className="opacity-90 group-hover:opacity-100 transition-opacity"
                    ></iframe>
                    <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 pointer-events-none">
                        <span className="text-[10px] font-black uppercase text-white tracking-[0.25em]">Satellite Sync: Active</span>
                    </div>
                </div>
                
            </section>

            {/* 4. FIELD INTELLIGENCE BRIEFING (Formerly FAQ + Tech Breakdown) */}
            <section className="w-full border-t border-slate-800 pt-16">
                <div className="flex items-center gap-6 mb-12 justify-center md:justify-start">
                    <div className="h-14 w-3 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                        Field <span className="text-cyan-400">Intelligence Briefing</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-left">
                    {/* PRIMARY FAQ SECTION */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-slate-950/40 p-10 rounded-[3rem] border border-slate-800 shadow-inner group">
                            <h3 className="text-2xl font-black text-cyan-400 mb-6 uppercase tracking-tight italic border-b border-cyan-500/20 pb-4">Logic Calculation Matrix</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">
                                <li className="flex items-center gap-5 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                                    <span className="bg-cyan-500/20 text-cyan-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/20">01</span>
                                    <span>Accumulation vs. Plowing Speed</span>
                                </li>
                                <li className="flex items-center gap-5 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                                    <span className="bg-cyan-500/20 text-cyan-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/20">02</span>
                                    <span>The 6:00 AM "Ice Window" Timing</span>
                                </li>
                                <li className="flex items-center gap-5 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                                    <span className="bg-cyan-500/20 text-cyan-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/20">03</span>
                                    <span>-25°C Wind Chill Stop-Safety Thresholds</span>
                                </li>
                                <li className="flex items-center gap-5 bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                                    <span className="bg-cyan-500/20 text-cyan-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/20">04</span>
                                    <span>Historical Board Precedent Data</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-950/40 p-10 rounded-[3rem] border border-slate-800 shadow-inner group border-red-500/20 relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 text-9xl opacity-5 group-hover:opacity-10 transition-all">💣</div>
                            <h3 className="text-2xl font-black text-red-500 mb-6 uppercase tracking-tight leading-none italic">Bomb Cyclone Directive</h3>
                            <p className="text-slate-400 text-lg leading-relaxed italic pr-12">
                                When barometric pressure drops **24mb in 24 hours**, it creates bombogenesis. Our long-range scanner detects these signatures 5 days out. If you see the 💣 icon on your results, high-impact blizzard conditions are locked in.
                            </p>
                        </div>
                    </div>

                    {/* SIDEBAR INTEL */}
                    <div className="lg:col-span-1 space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-6 w-1 bg-cyan-500 rounded-full"></div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Intelligence Archive</h3>
                            </div>
                            <ul className="space-y-10">
                                <li>
                                    <Link href="/blog/what-is-open-snow-day" className="group flex flex-col">
                                        <span className="text-cyan-400 font-black group-hover:text-white transition-colors uppercase tracking-widest text-sm italic mb-2">What's Open? →</span>
                                        <span className="text-slate-500 text-xs font-bold leading-relaxed">Malls, Transit, and Movie Theater guide for GTA/Montreal.</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog/quebec-vs-ontario-policy" className="group flex flex-col">
                                        <span className="text-cyan-400 font-black group-hover:text-white transition-colors uppercase tracking-widest text-sm italic mb-2">Policy Variance →</span>
                                        <span className="text-slate-500 text-xs font-bold leading-relaxed">The technical difference in board closure triggers and walking rules.</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog/bomb-cyclone-survival" className="group flex flex-col">
                                        <span className="text-cyan-400 font-black group-hover:text-white transition-colors uppercase tracking-widest text-sm italic mb-2">Survival Protocol →</span>
                                        <span className="text-slate-500 text-xs font-bold leading-relaxed">Essential guide for staying safe during 'Pink Zone' extreme cold.</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* --- FOOTER --- */}
        <footer className="w-full text-center border-t border-slate-800 pt-16 pb-16 mt-24 italic text-slate-600 text-[10px] uppercase tracking-[0.5em] leading-relaxed">
            <p className="mb-4">© 2026 Snow Day Predictor. Not affiliated with any school board.</p>
            <p className="mb-4">Intelligence Build v17.0.1 (Tactical Launch Edition)</p>
            <p className="max-w-xl mx-auto opacity-30 mt-8 leading-tight">Data sourced from Open-Meteo, NOAA Satellite Feed, and municipal transport notices. All calculations for planning purposes only.</p>
        </footer>
      </main>
    </div>
  );
}
