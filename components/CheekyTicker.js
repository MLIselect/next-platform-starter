'use client';

/**
 * ============================================================================
 * CHEEKY TICKER - LIVE GOOGLE SHEETS COMMAND FEED
 * ============================================================================
 * Version: 19.3.1 (Tactical Theme Patch)
 * Target Event: Tuesday, Jan 27 Residual Impact
 * Logic: Fetches live updates from Google Sheets CSV.
 * ============================================================================
 */

import { useState, useEffect } from 'react';

export default function CheekyTicker() {
  // --------------------------------------------------------------------------
  // 1. DATA CONFIGURATION (YOUR LIVE LINK)
  // --------------------------------------------------------------------------
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSXlGJUCOmJGIvjJ8rjj5hU_kl-0mphM1fEb98ZkZSdqOggKUpJZgTzFs69m_VnjpMF1-z9It4a3fWn/pub?gid=1829360058&single=true&output=csv";

  const fallbackMessages = [
    "🔮 TUESDAY INTEL: EXTREME COLD (-27°C) & ROAD DRIFTING IMPACTING COMMUTE",
    "⚠️ MONTREAL: BUS CANCEL ODDS REMAIN ELEVATED DUE TO ARCTIC CHILL",
    "🚨 AURORA/YORK: PLOWS WORKING OVERTIME. ROADS ARE HIGH-FRICTION",
    "🛌 TUESDAY PIVOT: CHECK YOUR POSTAL ABOVE FOR EARLY MORNING ODDS",
    "🎓 UNI STATUS: MOST CAMPUSES REOPENING TUESDAY. CHECK LOCAL ALERTS",
    "🛒 SURVIVAL: SLED DEMAND IS PEAKING. GET YOURS ON AMAZON BELOW."
  ];

  const [messages, setMessages] = useState(fallbackMessages);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const syncWithCloud = async () => {
      try {
        // Add timestamp to prevent caching
        const response = await fetch(`${SHEET_CSV_URL}&t=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Cloud Sync Failed");
        const rawData = await response.text();
        
        const cloudMessages = rawData
          .split(/\r?\n/)
          .map(row => row.replace(/^"|"$/g, '').trim()) // Clean CSV quotes
          .filter(row => row.length > 0);

        if (cloudMessages.length > 0) {
          setMessages(cloudMessages);
          setIsLive(true);
        }
      } catch (err) {
        // Keep fallback if offline
        setIsLive(false);
      }
    };

    syncWithCloud();
    const syncInterval = setInterval(syncWithCloud, 300000); // Retry every 5 mins
    return () => clearInterval(syncInterval);
  }, [SHEET_CSV_URL]);

  return (
    <div className="w-full bg-cyan-500 text-slate-900 overflow-hidden py-3 border-b border-cyan-600 shadow-2xl relative z-50 group font-sans">
      
      {/* LIVE INDICATOR BADGE */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 bg-cyan-600 border-r border-cyan-700 shadow-xl">
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isLive ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]'}`}></span>
          <span className="font-black text-[9px] tracking-[0.3em] uppercase italic text-white">
            {isLive ? 'Live Sync' : 'Storm Feed'}
          </span>
        </div>
      </div>

      {/* SCROLLING TEXT AREA */}
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12 items-center pl-32">
        {messages.map((msg, index) => (
          <span key={`msg-${index}`} className="flex items-center gap-12">
            {msg}
            <span className="text-cyan-900 opacity-40 font-normal select-none italic"> // </span>
          </span>
        ))}
        {/* DUPLICATE FOR INFINITE LOOP EFFECT */}
        {messages.map((msg, index) => (
          <span key={`clone-${index}`} className="flex items-center gap-12 opacity-80">
            {msg}
            <span className="text-cyan-900 opacity-40 font-normal select-none italic"> // </span>
          </span>
        ))}
      </div>

      {/* FADE GRADIENTS FOR SMOOTH EDGES */}
      <div className="absolute inset-y-0 left-24 w-12 bg-gradient-to-r from-cyan-500 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cyan-500 to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
