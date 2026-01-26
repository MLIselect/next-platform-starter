'use client';

import { useState } from 'react'; 
import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  // STATE FOR TABS
  const [activeTab, setActiveTab] = useState('status');

  // DATA FOR THE BOARD CARDS (The Victory List + Quebec Update)
  const boards = [
    { name: "TDSB (Toronto)", status: "CLOSED", probability: "100%", time: "Confirmed" },
    { name: "EMSB (Montreal English)", status: "BUSES CANCELLED", probability: "100%", time: "Confirmed" },
    { name: "Lester B. Pearson (LBPSB)", status: "BUSES CANCELLED", probability: "100%", time: "Confirmed" },
    { name: "Peel (PDSB & DPCDSB)", status: "CLOSED", probability: "100%", time: "Confirmed" },
    { name: "York (YRDSB & YCDSB)", status: "CLOSED", probability: "100%", time: "Confirmed" },
    { name: "CSSDM (Montreal French)", status: "OPEN - NO BUSES", probability: "95%", time: "Weather Alert" },
    { name: "Durham (DDSB & DCDSB)", status: "CLOSED", probability: "100%", time: "BOSS DEFEATED" },
    { name: "Halton (HDSB & HCDSB)", status: "CLOSED", probability: "100%", time: "Confirmed" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      
      {/* VISUALS: BACKGROUND SNOW */}
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

        {/* CALCULATOR APP */}
        <div className="w-full max-w-lg relative z-10 mb-8">
          <SnowCalculator />
        </div>

        {/* --- QUEBEC & MONTREAL POLICY GUIDE (NEW SECTION) --- */}
        <div className="w-full max-w-5xl mb-16 border-t border-slate-800 pt-12">
            <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
                <div className="h-10 w-2 bg-cyan-500 rounded-full hidden md:block"></div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                Quebec & Montreal <span className="text-cyan-400">Policy Guide</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group">
                    <h3 className="text-cyan-400 font-black uppercase text-sm mb-3 tracking-widest group-hover:text-white transition-colors">The "Island Factor"</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Montreal (H-prefix) and Laval (J-prefix) boards have a "Snow Warrior" reputation. However, the <strong>EMSB</strong> and <strong>Lester B. Pearson</strong> boards prioritize bus safety above all. If our calculator shows 100% bus odds, it usually means the bridges or the Metropolitan (A-40) are too dangerous for transit.
                    </p>
                </div>

                <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group">
                    <h3 className="text-cyan-400 font-black uppercase text-sm mb-3 tracking-widest group-hover:text-white transition-colors">Bus vs School Odds</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        In Quebec, it is common for <strong>Buses to cancel</strong> while <strong>Schools stay open.</strong> Our algorithm factors in the specific morning ice window and wind chill thresholds (-25°C) that impact the 6:00 AM bus roll-out for CSSDM and English boards.
                    </p>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                    MONITORING: CSSDM • EMSB • LBPSB • RIVERSIDE • NEW FRONTIERS
                </p>
            </div>
        </div>

        {/* --- DASHBOARD TABS --- */}
        <div className="w-full max-w-5xl mb-12">
            
            {/* TABS NAVIGATION */}
            <div className="flex justify-center mb-8">
                <div className="bg-slate-800 p-1.5 rounded-full inline-flex shadow-xl border border-slate-700">
                <button
                    onClick={() => setActiveTab('status')}
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-black tracking-wide transition-all ${
                    activeTab === 'status' 
                        ? 'bg-red-600 text-white shadow-lg scale-105' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                >
                    🚧 STATUS BOARD
                </button>
                <button
                    onClick={() => setActiveTab('exams')}
                    className={`px-6 py-2 rounded-full text-sm md:text-base font-black tracking-wide transition-all ${
                    activeTab === 'exams' 
                        ? 'bg-yellow-400 text-slate-900 shadow-lg scale-105' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                >
                    📝 EXAM UPDATES
                </button>
                </div>
            </div>

            {/* TAB CONTENT: STATUS GRID */}
            {activeTab === 'status' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in zoom-in duration-300">
                    {boards.map((board, index) => (
                    <div key={index} className="bg-slate-800/80 backdrop-blur-sm border-l-4 border-red-500 rounded-lg p-6 shadow-lg hover:bg-slate-800 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-white">{board.name}</h3>
                            <span className="bg-red-500 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wider">
                                {board.status}
                            </span>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                            <div>
                                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Probability</p>
                                <p className="text-3xl font-black text-red-400">{board.probability}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Status</p>
                                <p className="text-sm font-bold text-white">{board.time}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}

            {/* TAB CONTENT: EXAM CHEAT SHEET */}
            {activeTab === 'exams' && (
                <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
                    <h2 className="text-2xl md:text-3xl font-black text-yellow-400 mb-6 text-center uppercase tracking-tight">
                    Exam Rescheduling Guide
                    </h2>
                    
                    <div className="space-y-4">
                    <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h3 className="font-bold text-lg text-white">Toronto (TDSB & TCDSB)</h3>
                        <p className="text-slate-300 mt-1 text-sm leading-relaxed">
                        <strong>Standard Rule:</strong> Exams usually shift by 1 day. 
                        <br/>(Monday's exam → Tuesday, Tuesday → Wednesday).
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-purple-500">
                        <h3 className="font-bold text-lg text-white">York Catholic (YCDSB)</h3>
                        <p className="text-slate-300 mt-1 text-sm leading-relaxed">
                        <strong>Confirmed:</strong> Monday exams are moved to <span className="text-yellow-300 font-bold">Thursday, Jan 29</span>.
                        <br/>Tuesday/Wednesday exams proceed as originally scheduled.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-green-500">
                        <h3 className="font-bold text-lg text-white">Peel (PDSB & DPCDSB)</h3>
                        <p className="text-slate-300 mt-1 text-sm leading-relaxed">
                        <strong>Check Portal:</strong> Most secondary schools have a "Contingency Day" built into the schedule (usually Thursday or Friday). Check your D2L/Google Classroom.
                        </p>
                    </div>
                    
                    <div className="mt-8 text-center border-t border-slate-700 pt-6">
                        <p className="text-xs text-slate-500">
                        ⚠️ <strong>Disclaimer:</strong> Always check your specific school board website or student email for the official confirmation.
                        </p>
                    </div>
                    </div>
                </div>
            )}
        </div>

        {/* LIVE RADAR */}
        <div className="w-full max-w-[728px] mb-12">
            <h3 className="text-center text-slate-400 text-sm font-bold uppercase mb-4 tracking-wider">🔴 Live Ice & Snow Tracker</h3>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-[350px] md:h-[400px]">
                <iframe 
                    width="100%" height="100%" 
                    src="https://embed.windy.com/embed2.html?lat=43.65&lon=-79.38&detailLat=43.65&detailLon=-79.38&width=650&height=450&zoom=5&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" 
                    frameBorder="0"
                    title="Live Weather Radar for Ice and Snow"
                >
                </iframe>
            </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl text-slate-500 mb-16">
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform" role="img" aria-label="Ice cube">🧊</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Ice Factor</h3>
                <p className="text-sm mt-1">We track Freezing Rain.</p>
           </div>
           
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                <div 
                  className="text-5xl mb-2 group-hover:animate-drift bus-icon" 
                  role="img" 
                  aria-label="Yellow school bus drifting on icy road"
                >
                  🚌
                </div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Road Safety</h3>
                <p className="text-sm mt-1 group-hover:text-yellow-400 transition-colors font-medium">Bus drift calculations included.</p>
           </div>
           
           <div className="group p-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform" role="img" aria-label="Satellite">📡</div>
                <h3 className="font-bold text-slate-300 text-sm uppercase">Real Data</h3>
                <p className="text-sm mt-1">Powered by NOAA/Open-Meteo.</p>
           </div>
        </div>

        {/* FAQ SECTION */}
        <div className="w-full max-w-2xl text-left border-t border-slate-800 pt-12 pb-12">
            <h2 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-tighter">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">How does the Snow Day Predictor work?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We aggregate real-time weather data from NOAA and Open-Meteo, analyzing factors like snow accumulation, wind speed, and temperature drop. For regions like Montreal, Aurora, and Buffalo, we apply a special "Ice Factor" weight, as freezing rain is the #1 cause of school bus cancellations.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">What factors affect school closures in Ontario & Quebec?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        In Ontario and Quebec, the decision is often made by 6:00 AM based on road safety for buses. While Montreal schools are resilient, icy bridges and highways (like the A-40) often trigger bus pulls even when schools remain open.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">Can I check snow day odds for tomorrow?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Yes! Enter your Zip Code (US) or Postal Code (Canada) above to get the odds for the upcoming storm (Jan 26-27). We update data hourly to catch sudden shifts in the storm front.
                    </p>
                </div>
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
            <br/><span className="text-[10px] text-slate-800">v16.2 (Quebec & US Optimized)</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
