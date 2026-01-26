'use client';

import { useState } from 'react'; 
import SnowCalculator from '../components/SnowCalculator';
import CheekyTicker from '../components/CheekyTicker';
import Snowfall from '../components/Snowfall';

export default function Page() {
  const [activeTab, setActiveTab] = useState('status');

  // 1. REUSABLE COLOR LOGIC (Clean & Scalable)
  const getRiskStyle = (prob) => {
    if (["90%", "95%"].includes(prob)) return {
      border: "border-orange-500",
      badge: "bg-orange-500",
      text: "text-orange-400"
    };
    return {
      border: "border-red-500",
      badge: "bg-red-500",
      text: "text-red-400"
    };
  };

  // 2. DATA WITH REGION TAGS (Ready for future sorting)
  const boards = [
    { name: "English Montreal School Board (EMSB)", region: "QC", subtitle: "English Board", status: "BUSES CANCELLED*", probability: "100%", time: "View School List →" },
    { name: "Lester B. Pearson School Board (LBPSB)", region: "QC", subtitle: "English Board", status: "BUSES CANCELLED", probability: "100%", time: "Official Status" },
    { name: "Commission scolaire de Montréal (CSSDM)", region: "QC", subtitle: "French Board", status: "OPEN - NO BUSES", probability: "95%", time: "View Official Alert →" },
    { name: "Riverside School Board (RSB)", region: "QC", subtitle: "English Board (South Shore)", status: "BUSES CANCELLED", probability: "95%", time: "Weather Alert" },
    { name: "Toronto District School Board (TDSB)", region: "ON", subtitle: "Ontario Board", status: "CLOSED", probability: "100%", time: "Official" },
    { name: "Peel District School Board (PDSB)", region: "ON", subtitle: "Ontario Board", status: "CLOSED", probability: "100%", time: "Official" },
    { name: "York Region District School Board (YRDSB)", region: "ON", subtitle: "Ontario Board", status: "CLOSED", probability: "100%", time: "Official" },
    { name: "Durham District School Board (DDSB)", region: "ON", subtitle: "Ontario Board", status: "CLOSED", probability: "100%", time: "BOSS DEFEATED" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 relative">
      <Snowfall />

      {/* HEADER */}
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
        <h1 className="text-3xl md:text-5xl font-black text-center tracking-tighter text-white mb-3 text-balance">Will school be closed?</h1>
        <p className="text-slate-400 text-base md:text-lg mb-8 text-center max-w-2xl">
          Storm Update (Jan 26). <span className="text-cyan-400 font-bold">Check Snow & Ice Odds for Ontario & Quebec.</span>
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
                        <div key={index} className={`bg-slate-800/80 backdrop-blur-sm border-l-4 ${style.border} rounded-lg p-6 shadow-lg transition-colors`}>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-sm text-white max-w-[70%] leading-tight text-balance">{board.name}</h3>
                                <span className={`${style.badge} text-white text-[10px] font-black px-2 py-1 rounded uppercase whitespace-nowrap`}>{board.status}</span>
                            </div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-4">[{board.region}] {board.subtitle}</p>
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Probability</p>
                                    <p className={`text-3xl font-black ${style.text}`}>{board.probability}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider italic">{board.time}</p>
                                </div>
                            </div>
                        </div>
                      );
                    })}
                </div>
            )}

            {activeTab === 'exams' && (
                <div className="max-w-2xl mx-auto bg-slate-800 rounded-xl p-8 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 shadow-2xl">
                    <h2 className="text-2xl font-black text-yellow-400 mb-6 text-center uppercase tracking-tight">Exam Rescheduling Guide</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Ontario (TDSB / Peel / York)</h3>
                            <p className="text-slate-300 mt-1 text-sm">Exams usually shift by 1 business day. Check your board's portal for Tuesday morning updates.</p>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Quebec (EMSB / LBPSB / CSSDM)</h3>
                            <p className="text-slate-300 mt-1 text-sm">Exams are often managed school-by-school. Note: Buildings may stay open even if buses are grounded.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* --- DISCLAIMER --- */}
        <div className="w-full max-w-5xl my-12">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col md:flex-row items-center gap-4">
              <div className="bg-amber-500/10 p-3 rounded-full border border-amber-500/20"><svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
              <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-tighter text-center md:text-left">
                <strong>Source of Truth:</strong> Monitoring live feeds from <strong>TDSB & EMSB</strong>. *Buses cancelled: buildings may stay open for staff/exams. Always verify with your official board portal.
              </p>
          </div>
        </div>

        {/* RADAR */}
        <div className="w-full max-w-[728px] mb-12">
            <h3 className="text-center text-slate-400 text-[10px] font-bold uppercase mb-4 tracking-widest">🔴 Live Ice & Snow Tracker</h3>
            <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-[400px]">
                <iframe width="100%" height="100%" src="https://embed.windy.com/embed2.html?lat=44.50&lon=-76.56&detailLat=44.50&detailLon=-76.56&width=650&height=450&zoom=6&level=surface&overlay=rain&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" frameBorder="0" title="Radar"></iframe>
            </div>
        </div>

        {/* FAQ & FOOTER */}
        <div className="w-full max-w-2xl border-t border-slate-800 pt-12 pb-12">
            <h2 className="text-2xl font-black text-white mb-6 text-center uppercase tracking-tighter">Frequently Asked Questions</h2>
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-cyan-400 mb-2 leading-tight">How does the Snow Day Predictor work?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">We analyze NOAA/Open-Meteo data for accumulation, wind speed, and temperature. For <strong>Montreal and Toronto</strong>, we weight the "Ice Factor" heavily as freezing rain is the main cause of bus pulls.</p>
            </div>
        </div>

        <footer className="mt-8 text-slate-600 text-[10px] text-center w-full pb-8">
          <p className="mb-4">© 2026 Snow Day Predictor. v16.5 (Grok-Optimized Launch)</p>
          <div className="mb-6 px-4">
            <a href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" target="_blank" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-xs py-3 px-6 rounded-full hover:scale-105 transition-transform shadow-lg">🛷 STORM PREP: GET YOUR SLED! 🛷</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
