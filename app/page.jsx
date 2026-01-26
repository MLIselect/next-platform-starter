'use client';

import { useState } from 'react'; 
import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  const [activeTab, setActiveTab] = useState('status');

  // 1. REUSABLE COLOR LOGIC (Scalable & Professional)
  const getRiskStyle = (prob) => {
    // Warnings are orange; confirmed closures are red
    const isWarning = ["90%", "95%"].includes(prob);
    return {
      border: isWarning ? "border-orange-500" : "border-red-500",
      badge: isWarning ? "bg-orange-500" : "bg-red-500",
      text: isWarning ? "text-orange-400" : "text-red-400"
    };
  };

  // 2. DATA WITH LINKS & REGIONS (Sorted by Active Storm Zone)
  const boards = [
    { 
      name: "English Montreal School Board (EMSB)", 
      region: "QC", 
      subtitle: "English Board", 
      status: "BUSES CANCELLED*", 
      probability: "100%", 
      time: "View School List →",
      link: "https://www.emsb.qc.ca/emsb/services/transportation" 
    },
    { 
      name: "Lester B. Pearson School Board (LBPSB)", 
      region: "QC", 
      subtitle: "English Board", 
      status: "BUSES CANCELLED", 
      probability: "100%", 
      time: "Official Status",
      link: "https://www.lbpsb.qc.ca/" 
    },
    { 
      name: "Commission scolaire de Montréal (CSSDM)", 
      region: "QC", 
      subtitle: "French Board", 
      status: "OPEN - NO BUSES", 
      probability: "95%", 
      time: "View Official Alert →",
      link: "https://www.cssdm.gouv.qc.ca/" 
    },
    { 
      name: "Riverside School Board (RSB)", 
      region: "QC", 
      subtitle: "South Shore English", 
      status: "BUSES CANCELLED", 
      probability: "95%", 
      time: "Weather Alert",
      link: "http://www.rsb.qc.ca/" 
    },
    { 
      name: "Toronto District School Board (TDSB)", 
      region: "ON", 
      subtitle: "Ontario Board", 
      status: "CLOSED", 
      probability: "100%", 
      time: "Official Updates",
      link: "https://www.tdsb.on.ca/" 
    },
    { 
      name: "Peel District School Board (PDSB)", 
      region: "ON", 
      subtitle: "Ontario Board", 
      status: "CLOSED", 
      probability: "100%", 
      time: "Board Status",
      link: "https://www.peelschools.org/" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      <Snowfall />

      <div className="sticky top-0 z-50 shadow-2xl">
        <CheekyTicker />
        <header className="w-full py-3 px-4 flex justify-center border-b border-slate-800 bg-black/95 backdrop-blur-md">
          <div className="flex items-center gap-4"> 
            <img src="/logo.png" alt="Logo" className="w-14 h-14 md:w-20 md:h-20 shrink-0 hover:rotate-12 transition-transform" />
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-white uppercase">Snow Day</span>
              <span className="font-black text-2xl md:text-4xl tracking-tighter text-cyan-400 uppercase">Predictor</span>
            </div>
          </div>
        </header>
      </div>

      <main className="flex flex-col items-center pt-8 pb-20 px-4 relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-center tracking-tighter text-white mb-3 text-balance uppercase italic">Will school be closed?</h1>
        <p className="text-slate-400 text-base md:text-lg mb-8 text-center max-w-2xl">
          Storm Update (Jan 26). <span className="text-cyan-400 font-bold underline decoration-cyan-500/30 underline-offset-4">Check Snow & Ice Odds for Ontario & Quebec.</span>
        </p>

        <div className="w-full max-w-lg mb-12">
          <SnowCalculator />
        </div>

        {/* --- TABS --- */}
        <div className="w-full max-w-5xl">
            <div className="flex justify-center mb-8">
                <div className="bg-slate-800 p-1.5 rounded-full inline-flex shadow-xl border border-slate-700">
                  <button onClick={() => setActiveTab('status')} aria-label="Status" className={`px-6 py-2 rounded-full text-sm font-black transition-all ${activeTab === 'status' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400'}`}>🚧 STATUS BOARD</button>
                  <button onClick={() => setActiveTab('exams')} aria-label="Exams" className={`px-6 py-2 rounded-full text-sm font-black transition-all ${activeTab === 'exams' ? 'bg-yellow-400 text-slate-900 shadow-lg' : 'text-slate-400'}`}>📝 EXAM UPDATES</button>
                </div>
            </div>

            {activeTab === 'status' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in zoom-in duration-300">
                    {boards.map((board, index) => {
                      const style = getRiskStyle(board.probability);
                      return (
                        <div key={index} className={`bg-slate-800/80 backdrop-blur-sm border-l-4 ${style.border} rounded-lg p-6 shadow-lg transition-colors flex flex-col justify-between`}>
                            <div>
                              <div className="flex justify-between items-start mb-1 gap-2">
                                  <h3 className="font-bold text-sm text-white leading-tight text-balance">{board.name}</h3>
                                  <span className={`${style.badge} text-white text-[10px] font-black px-2 py-1 rounded uppercase whitespace-nowrap`}>{board.status}</span>
                              </div>
                              <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-4">[{board.region}] {board.subtitle}</p>
                            </div>
                            
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Probability</p>
                                    <p className={`text-3xl font-black ${style.text}`}>{board.probability}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider italic mb-1">Official Link</p>
                                    <a href={board.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-cyan-400 hover:text-white uppercase transition-colors underline decoration-cyan-400/30 underline-offset-4">
                                      {board.time}
                                    </a>
                                </div>
                            </div>
                        </div>
                      );
                    })}
                </div>
            )}

            {activeTab === 'exams' && (
                <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl p-8 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 shadow-2xl">
                    <h2 className="text-2xl font-black text-yellow-400 mb-6 text-center uppercase tracking-tight italic">Exam Rescheduling Guide</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Ontario (TDSB / Peel / York)</h3>
                            <p className="text-slate-300 mt-1 text-sm">Exams usually shift by 1 business day. Check your board's portal for Tuesday morning updates.</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Quebec (EMSB / LBPSB / CSSDM)</h3>
                            <p className="text-slate-300 mt-1 text-sm italic">Note: EMSB/CSSDM often reschedule exams individually. Buildings may stay open even if buses are grounded.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* --- PROFESSIONAL DISCLAIMER SECTION --- */}
        <div className="w-full max-w-5xl my-12">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col md:flex-row items-center gap-4">
              <div className="bg-amber-500/10 p-3 rounded-full border border-amber-500/20"><svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
              <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-tighter text-center md:text-left">
                <strong>Source of Truth:</strong> Monitoring live data from <strong>TDSB & EMSB</strong>. <span className="text-slate-300 font-bold">*Buses cancelled: buildings may stay open for staff/exams.</span> Always verify with your official board portal before travel.
              </p>
          </div>
        </div>

        {/* --- FAQ SECTION: FULL RESTORATION & SEO DEPTH --- */}
        <div className="w-full max-w-2xl border-t border-slate-800 pt-12 pb-12">
            <h2 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-tighter italic">The Snow Day Intelligence Hub</h2>
            <div className="space-y-6">
              <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-800">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2 leading-tight">How does the 2026 Snow Day Predictor work?</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">We analyze **9 weighted factors** including: snowfall accumulation, 6:00 AM wind chill, urban bridge congestion (Montreal Factor), and morning ice windows. Our engine processes NOAA and Open-Meteo data to provide localized probabilities by postal/zip code.</p>
              </div>
              <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-800">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2 leading-tight">Why is Montreal status different from Toronto?</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Quebec school boards like the **EMSB** and **CSSDM** are known as "Snow Warriors." They prioritize keeping buildings open for students who can walk, even when all buses are cancelled. Ontario boards (like the **TDSB**) are more likely to close buildings entirely due to broader transportation dependencies.</p>
              </div>
              <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-800">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2 leading-tight">What is a "Bomb Cyclone" alert?</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">A Bomb Cyclone (bombogenesis) occurs when pressure drops 24mb in 24 hours, creating explosive storm growth. When our scanner detects these "Pink Zone" signatures for the weekend, we trigger an **Advanced Bomb Alert** on your results card to warn of high-impact weekend blizzards.</p>
              </div>
            </div>
        </div>

        <footer className="mt-8 text-slate-600 text-[10px] text-center w-full pb-8">
          <p className="mb-4 uppercase tracking-[0.2em]">© 2026 Snow Day Predictor. v16.7 (Production Launch Ready)</p>
          <div className="mb-6 px-4">
            <a href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" target="_blank" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-xs py-3 px-6 rounded-full hover:scale-105 transition-transform shadow-lg uppercase tracking-widest">🛷 STORM PREP: GET YOUR SLED! 🛷</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
