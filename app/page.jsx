'use client';

import { useState } from 'react'; 
import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  // STATE FOR TABS
  const [activeTab, setActiveTab] = useState('status');

  // DATA FOR THE BOARD CARDS (Sorted by Region: Quebec then Ontario)
  const boards = [
    { 
      name: "English Montreal School Board (EMSB)", 
      subtitle: "English Board (QC)",
      status: "BUSES CANCELLED*", 
      probability: "100%", 
      time: "See Affected Schools List" 
    },
    { 
      name: "Lester B. Pearson School Board (LBPSB)", 
      subtitle: "English Board (QC)",
      status: "BUSES CANCELLED", 
      probability: "100%", 
      time: "Official" 
    },
    { 
      name: "Commission scolaire de Montréal (CSSDM)", 
      subtitle: "French Board (QC)",
      status: "OPEN - NO BUSES", 
      probability: "95%", 
      time: "Weather Alert" 
    },
    { 
      name: "Riverside School Board (RSB)", 
      subtitle: "English Board (QC – South Shore)", 
      status: "BUSES CANCELLED", 
      probability: "95%", 
      time: "Weather Alert"
    },
    { 
      name: "Toronto District School Board (TDSB)", 
      subtitle: "Ontario Board",
      status: "CLOSED", 
      probability: "100%", 
      time: "Official" 
    },
    { 
      name: "Peel District School Board (PDSB)", 
      subtitle: "Ontario Board",
      status: "CLOSED", 
      probability: "100%", 
      time: "Official" 
    },
    { 
      name: "York Region District School Board (YRDSB)", 
      subtitle: "Ontario Board",
      status: "CLOSED", 
      probability: "100%", 
      time: "Official" 
    },
    { 
      name: "Durham District School Board (DDSB)", 
      subtitle: "Ontario Board",
      status: "CLOSED", 
      probability: "100%", 
      time: "BOSS DEFEATED" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      
      <Snowfall />

      {/* HEADER & TICKER */}
      <div className="sticky top-0 z-50 shadow-2xl">
        <CheekyTicker />
        <header className="w-full py-3 px-4 flex justify-center border-b border-slate-800 bg-black/95 backdrop-blur-md">
          <div className="flex items-center gap-4"> 
            <div className="relative w-14 h-14 md:w-20 md:h-20 shrink-0">
              <img 
                src="/logo.png" 
                alt="Snow Day Predictor Logo" 
                className="w-full h-full object-contain hover:rotate-12 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-white leading-none whitespace-nowrap">SNOW DAY</span>
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-cyan-400 leading-none whitespace-nowrap">PREDICTOR</span>
            </div>
          </div>
        </header>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex flex-col items-center pt-8 pb-20 px-4 relative z-10">
        
        <h1 className="text-3xl md:text-5xl font-black text-center tracking-tighter text-white mb-3 drop-shadow-lg text-balance">
          Will school be closed?
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium mb-8 text-center max-w-2xl">
          Massive Storm Incoming (Jan 25-26).
          <br/>
          <span className="text-cyan-400 font-bold">Check your odds for Snow & Ice Days in Ontario & Quebec.</span>
        </p>

        <div className="w-full max-w-lg relative z-10 mb-8">
          <SnowCalculator />
        </div>

        {/* --- QUEBEC & MONTREAL POLICY GUIDE --- */}
        <div className="w-full max-w-5xl mb-16 border-t border-slate-800 pt-12">
            <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
                <div className="h-10 w-2 bg-cyan-500 rounded-full hidden md:block"></div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                Quebec & Montreal <span className="text-cyan-400">Policy Guide</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-balance">
                <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group">
                    <h3 className="text-cyan-400 font-black uppercase text-sm mb-3 tracking-widest group-hover:text-white transition-colors text-wrap">The "Island Factor"</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Montreal and Laval boards are legendary "Snow Warriors." However, <strong>EMSB</strong> and <strong>LBPSB</strong> prioritize bus safety. If odds hit 100%, bridges or the A-40 Metropolitan are likely deemed too dangerous for transit.
                    </p>
                </div>

                <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group">
                    <h3 className="text-cyan-400 font-black uppercase text-sm mb-3 tracking-widest group-hover:text-white transition-colors text-wrap">Bus vs School Odds</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        In Quebec, it is common for <strong>Buses to cancel</strong> while <strong>Schools stay open.</strong> Our algorithm factors in morning ice windows and -25°C wind chill thresholds affecting 6 AM roll-outs.
                    </p>
                </div>
            </div>
        </div>

        {/* --- DASHBOARD TABS --- */}
        <div className="w-full max-w-5xl mb-4">
            <div className="flex justify-center mb-8">
                <div className="bg-slate-800 p-1.5 rounded-full inline-flex shadow-xl border border-slate-700">
                <button
                    onClick={() => setActiveTab('status')}
                    aria-label="Switch to Status Board"
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-black tracking-wide transition-all ${
                    activeTab === 'status' ? 'bg-red-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    🚧 STATUS BOARD
                </button>
                <button
                    onClick={() => setActiveTab('exams')}
                    aria-label="Switch to Exam Updates"
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-black tracking-wide transition-all ${
                    activeTab === 'exams' ? 'bg-yellow-400 text-slate-900 shadow-lg scale-105' : 'text-slate-400 hover:text-white'
                    }`}
                >
                    📝 EXAM UPDATES
                </button>
                </div>
            </div>

            {activeTab === 'status' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in zoom-in duration-300">
                    {boards.map((board, index) => {
                      // IMPROVED LOGIC: Exact match for warning probabilities
                      const isWarning = ["90%", "95%"].includes(board.probability);
                      const borderColor = isWarning ? "border-orange-500" : "border-red-500";
                      const badgeColor = isWarning ? "bg-orange-500" : "bg-red-500";
                      const probColor = isWarning ? "text-orange-400" : "text-red-400";

                      return (
                        <div key={index} className={`bg-slate-800/80 backdrop-blur-sm border-l-4 ${borderColor} rounded-lg p-6 shadow-lg hover:bg-slate-800 transition-colors`}>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-sm text-white max-w-[75%] leading-tight text-wrap">{board.name}</h3>
                                <span className={`${badgeColor} text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap`}>
                                    {board.status}
                                </span>
                            </div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-4">
                                {board.subtitle}
                            </p>
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Probability</p>
                                    <p className={`text-3xl font-black ${probColor}`}>{board.probability}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Note</p>
                                    <p className="text-xs font-bold text-white uppercase">{board.time}</p>
                                </div>
                            </div>
                        </div>
                      );
                    })}
                </div>
            )}

            {activeTab === 'exams' && (
                <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-black text-yellow-400 mb-6 text-center uppercase tracking-tight">
                    Exam Rescheduling Guide
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500 text-sm">
                            <h3 className="font-bold text-white uppercase tracking-tighter">Ontario (TDSB / YRDSB / PEEL)</h3>
                            <p className="text-slate-300 mt-1">Exams usually shift by 1 day for all secondary students. Always confirm via the student portal.</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-cyan-500 text-sm">
                            <h3 className="font-bold text-white uppercase tracking-tighter">Quebec (EMSB / CSSDM / LBPSB)</h3>
                            <p className="text-slate-300 mt-1 italic">Note: EMSB/CSSDM often reschedule exams individually. Buildings may stay open for exams even if buses are grounded.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* --- PROFESSIONAL DISCLAIMER SECTION --- */}
        <div className="w-full max-w-5xl mb-12">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="bg-amber-500/10 p-3 rounded-full border border-amber-500/20">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-white text-xs font-black uppercase tracking-widest mb-1">Source of Truth Disclaimer</h4>
                <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-tighter">
                  <strong>Verification Required:</strong> We monitor live feeds from boards including the <strong>TDSB and EMSB</strong>. *Buses cancelled—schools may still be open for staff and activities. Always verify with your official board portal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE RADAR */}
        <div className="w-full max-w-[728px] mb-12">
            <h3 className="text-center text-slate-400 text-[10px] font-bold uppercase mb-4 tracking-widest">🔴 Live Ice & Snow Tracker</h3>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-[350px] md:h-[400px]">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://embed.windy.com/embed2.html?lat=45.50&lon=-73.56&detailLat=43.65&detailLon=-79.38&width=650&height=450&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" 
                    frameBorder="0"
                    title="Live Weather Radar"
                >
                </iframe>
            </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500 mb-16 px-4">
           <div className="p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2">🧊</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3>
                <p className="text-sm mt-1 text-balance">Freezing rain & road icing analytics.</p>
           </div>
           <div className="p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-5xl mb-2 bus-icon">🚌</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3>
                <p className="text-sm mt-1 text-balance">Real-time bus safety thresholds.</p>
           </div>
           <div className="p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2">📡</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3>
                <p className="text-sm mt-1 text-balance">NOAA/Open-Meteo API feeds.</p>
           </div>
        </div>

        {/* FAQ SECTION */}
        <div className="w-full max-w-2xl text-left border-t border-slate-800 pt-12 pb-12">
            <h2 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-tighter">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2 leading-tight">How does the Snow Day Predictor work?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We aggregate real-time weather data from NOAA and Open-Meteo, analyzing factors like snow accumulation, wind speed, and temperature drop. For regions like Montreal and Toronto, we apply a specific "Ice Factor" weight because road icing is the primary cause of bus cancellations.
                    </p>
                </div>
            </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 text-slate-600 text-xs text-center border-t border-slate-800 pt-8 w-full pb-8">
          <p className="mb-4">© 2026 Snow Day Predictor. Not affiliated with any school district.</p>
          <div className="mb-6 px-4">
            <a href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-sm py-3 px-6 rounded-full hover:scale-105 transition-transform shadow-lg">
                🛷 STORM PREP: GET YOUR SLED! 🛷
            </a>
          </div>
          <p className="max-w-md mx-auto opacity-50 px-4">
            Disclaimer: For entertainment purposes only. v16.3 (Production Ready)
          </p>
        </footer>
      </main>
    </div>
  );
}
