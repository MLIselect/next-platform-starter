'use client';

/**
 * ============================================================================
 * CHEEKY TICKER - STORM COMMAND CENTER 2026
 * ============================================================================
 * Build: 18.0.2 (Live Intelligence Edition)
 * Target: Ontario & Quebec Jan 26-27 Event
 * Logic: Hyper-Local School Board & University Intelligence
 * ============================================================================
 */

import { useState, useEffect } from 'react';

export default function CheekyTicker() {
  // --- 1. THE LIVE INTELLIGENCE ARRAY ---
  // In a full production env, this would fetch from a /api/storm-updates endpoint.
  // For now, we use a "Live Memory" state to manage the cheeky feed.
  const [tickerMessages, setTickerMessages] = useState([
    "🏆 VICTORY: ALL GTHA SCHOOL BOARDS CLOSED TODAY (MONDAY)",
    "🎓 UNI UPDATE: YORK, TMU, & U OF T (SCARB/MISS) CLOSED. ST. GEORGE CLOSED UNTIL NOON.",
    "⚠️ MONTREAL ALERT: 100% BUS CANCEL ODDS CONFIRMED. POWER OUTAGES IN NDG.",
    "⚜️ QUEBEC: BITTER COLD SNAP (-21°C) IMPACTING TRANSIT. CHECK YOUR POSTAL ABOVE.",
    "🔮 TUESDAY PREDICTION: ROADS WILL BE ROUGH. EARLY TUESDAY ODDS ARE LIVE.",
    "🛒 SURVIVAL: MALLS & THEATRES ARE OPEN TODAY. CHECK THE 'WHAT IS OPEN' GUIDE.",
    "🛌 SLEEP IN, CANADA. THE ALGORITHM HAS SPOKEN."
  ]);

  // --- 2. LIVE DATA POLL (SIMULATED) ---
  // This effect allows the ticker to update every 5 minutes if you were fetching from an API.
  useEffect(() => {
    const fetchLatestIntel = async () => {
      try {
        // Mocking a live update for Tuesday morning shifts
        const currentHour = new Date().getHours();
        
        if (currentHour >= 16) { // It's currently 4:00 PM on Jan 26
          setTickerMessages(prev => [
            "🚨 PM UPDATE: SNOW PLOWS LOSING THE WAR IN AURORA/YORK. 401 GRIDLOCKED.",
            "🔮 TUESDAY INTEL: HEAVY DRIFTING EXPECTED OVERNIGHT. BUS ODDS SPIKING.",
            ...prev.slice(0, 5)
          ]);
        }
      } catch (err) {
        console.error("Ticker Sync Failed:", err);
      }
    };

    // Poll for new storm info every 300 seconds
    const tickerInterval = setInterval(fetchLatestIntel, 300000);
    return () => clearInterval(tickerInterval);
  }, []);

  // --- 3. RENDER THE COMMAND CENTER FEED ---
  return (
    <div className="w-full bg-blue-600 text-white overflow-hidden py-2 border-b border-blue-800 shadow-2xl relative z-50 group">
      {/* ANIMATION NOTE: 
          'animate-marquee' must be defined in your tailwind.config.js 
          under 'animations' and 'keyframes'.
      */}
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12 items-center">
        
        {/* THE SYSTEM STATUS PULSE */}
        <div className="flex items-center gap-3 bg-red-600 px-4 py-1 rounded-full animate-pulse border border-red-400">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="text-[10px]">LIVE STORM FEED</span>
        </div>

        {/* MAP DYNAMIC MESSAGES */}
        {tickerMessages.map((msg, index) => (
          <span key={index} className="flex items-center gap-12">
            {msg}
            <span className="text-blue-400 opacity-30">//</span>
          </span>
        ))}

        {/* CLONED SET FOR INFINITE SEAMLESS LOOP */}
        {tickerMessages.map((msg, index) => (
          <span key={`clone-${index}`} className="flex items-center gap-12 opacity-90">
            {msg}
            <span className="text-blue-400 opacity-30">//</span>
          </span>
        ))}

      </div>

      {/* TACTICAL OVERLAY */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
