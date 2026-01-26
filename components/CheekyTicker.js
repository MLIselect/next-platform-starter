'use client';

/**
 * ============================================================================
 * CHEEKY TICKER - LIVE GOOGLE SHEETS COMMAND FEED
 * ============================================================================
 * Version: 19.2.0 (Live Cloud-Sync Build)
 * Target Event: Ontario & Quebec Jan 26-27 Storm
 * Logic: Hyper-local sync with published Google Sheet CSV.
 * Build Status: Un-Condensed / Explicit / Build-Safe
 * ============================================================================
 */

import { useState, useEffect } from 'react';

export default function CheekyTicker() {
  // --------------------------------------------------------------------------
  // 1. DATA CONFIGURATION (YOUR LIVE LINK)
  // --------------------------------------------------------------------------
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvUHrc2H2cmCgEKnoLzvoABQ26ziDMEqvWxoXw2O7d_tVVqFkc-zsci2VUzBWi9G4oAs_HGRHgcFWS/pub?gid=1976510017&single=true&output=csv";

  // Emergency Tactical Fallback (Used if the Google Sheet is empty or the link fails)
  const fallbackMessages = [
    "🏆 VICTORY: ALL GTHA SCHOOL BOARDS CLOSED TODAY (MONDAY)",
    "⚠️ MONTREAL ALERT: 100% BUS CANCEL ODDS CONFIRMED. POWER OUTAGES IN NDG.",
    "🔮 TUESDAY PREDICTION: ROADS REMAIN TREACHEROUS. EARLY TUESDAY ODDS LIVE.",
    "🛌 SLEEP IN, CANADA. THE ALGORITHM HAS SPOKEN."
  ];

  const [messages, setMessages] = useState(fallbackMessages);
  const [isLive, setIsLive] = useState(false);

  // --------------------------------------------------------------------------
  // 2. THE LIVE SYNC ENGINE
  // --------------------------------------------------------------------------
  useEffect(() => {
    const syncWithCloud = async () => {
      try {
        // Fetch raw CSV data from the published link
        // We attach a timestamp query string to force the browser to bypass any cache
        const response = await fetch(`${SHEET_CSV_URL}&t=${new Date().getTime()}`);
        
        if (!response.ok) throw new Error("Cloud Sync Failed");

        const rawData = await response.text();
        
        /**
         * CSV PARSING LOGIC:
         * 1. Splits the data by line breaks (handling different OS formats)
         * 2. Removes wrapping quotes (e.g. "Message" becomes Message)
         * 3. Filters out any empty rows
         */
        const cloudMessages = rawData
          .split(/\r?\n/)
          .map(row => row.replace(/^"|"$/g, '').trim())
          .filter(row => row.length > 0);

        // Only update if we actually received data rows
        if (cloudMessages.length > 0) {
          setMessages(cloudMessages);
          setIsLive(true);
        }
      } catch (err) {
        console.error("Ticker Sync Alert: Reverting to tactical fallback.", err);
        setIsLive(false);
      }
    };

    // Initial sync when the component first appears
    syncWithCloud();

    // Auto-sync every 5 minutes (300,000ms)
    // This allows you to update the Google Sheet and see it go live instantly
    const syncInterval = setInterval(syncWithCloud, 300000);

    return () => {
      clearInterval(syncInterval);
    };
  }, [SHEET_CSV_URL]);

  // --------------------------------------------------------------------------
  // 3. RENDER THE SCROLLING BROADCAST
  // --------------------------------------------------------------------------
  return (
    <div className="w-full bg-blue-600 text-white overflow-hidden py-3 border-b border-blue-800 shadow-2xl relative z-50 group">
      
      {/* THE LIVE STATUS BADGE (Green = Connected / Red = Fallback) */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 bg-blue-700 border-r border-blue-500 shadow-xl">
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isLive ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]'}`}></span>
          <span className="font-black text-[9px] tracking-[0.3em] uppercase italic select-none">
            {isLive ? 'Live Sync' : 'Storm Feed'}
          </span>
        </div>
      </div>

      {/* THE SCROLLING ENGINE (Infinite Seamless Loop) */}
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12 items-center pl-32">
        
        {/* FIRST PASS (PRIMARY) */}
        {messages.map((msg, index) => (
          <span key={`msg-${index}`} className="flex items-center gap-12">
            {msg}
            <span className="text-blue-400 opacity-40 font-normal select-none italic"> // </span>
          </span>
        ))}

        {/* CLONED PASS (The Loop Connector) */}
        {messages.map((msg, index) => (
          <span key={`clone-${index}`} className="flex items-center gap-12 opacity-80">
            {msg}
            <span className="text-blue-400 opacity-40 font-normal select-none italic"> // </span>
          </span>
        ))}

      </div>

      {/* TACTICAL EDGE FADES (Gradients) */}
      <div className="absolute inset-y-0 left-24 w-12 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none z-10"></div>
      
    </div>
  );
}
