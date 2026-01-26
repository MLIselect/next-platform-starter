'use client';

/**
 * ============================================================================
 * CHEEKY TICKER - LIVE INTELLIGENCE FEED
 * ============================================================================
 * Version: 18.2.0 (Automatic Time-Pivot Build)
 * Target Event: Ontario & Quebec Jan 26-27 Storm
 * Logic: Auto-switches content based on EST/EDT local storm progression.
 * Build Status: Un-Condensed / Explicit
 * ============================================================================
 */

import { useState, useEffect } from 'react';

export default function CheekyTicker() {
  // --------------------------------------------------------------------------
  // 1. DATA REPOSITORY (THE INTEL)
  // --------------------------------------------------------------------------
  const mondayVictory = [
    "🏆 VICTORY: ALL GTHA SCHOOL BOARDS CLOSED TODAY (MONDAY)",
    "🎓 UNI UPDATE: YORK, TMU, & U OF T CLOSED. ST. GEORGE CLOSED UNTIL NOON.",
    "⚠️ MONTREAL ALERT: 100% BUS CANCEL ODDS CONFIRMED. POWER OUTAGES IN NDG."
  ];

  const tuesdayTactics = [
    "🔮 TUESDAY PREDICTION: ROADS REMAIN TREACHEROUS. EARLY TUESDAY ODDS ARE LIVE.",
    "🚨 PM UPDATE: SNOW PLOWS STRUGGLING IN AURORA & YORK. 401 GRIDLOCKED.",
    "🛌 TUESDAY PIVOT: THE SUPERINTENDENT IS STRESSED. CHECK YOUR POSTAL ABOVE.",
    "⚜️ QUEBEC: BITTER COLD SNAP (-21°C) IMPACTING TUESDAY TRANSIT."
  ];

  const globalAlerts = [
    "🛒 SURVIVAL: MALLS & THEATRES ARE OPEN TODAY. CHECK THE 'WHAT IS OPEN' GUIDE.",
    "🛌 SLEEP IN, CANADA. THE ALGORITHM HAS SPOKEN."
  ];

  // --------------------------------------------------------------------------
  // 2. LIVE FEED ENGINE
  // --------------------------------------------------------------------------
  const [messages, setMessages] = useState([...mondayVictory, ...tuesdayTactics, ...globalAlerts]);

  useEffect(() => {
    const updateTickerContent = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      /**
       * AUTOMATIC PIVOT LOGIC:
       * If past 3:00 PM (15:00), Tuesday Tactics take priority in the feed.
       */
      if (currentHour >= 15) {
        // Shift Tuesday info to the front of the line
        setMessages([
          ...tuesdayTactics,
          ...mondayVictory,
          ...globalAlerts
        ]);
      } else {
        // Morning mode: Monday Wins take the lead
        setMessages([
          ...mondayVictory,
          ...tuesdayTactics,
          ...globalAlerts
        ]);
      }
    };

    updateTickerContent();
    
    // Refresh the priority every 15 minutes to stay current
    const refreshTimer = setInterval(updateTickerContent, 900000);
    
    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  // --------------------------------------------------------------------------
  // 3. RENDER THE COMMAND FEED
  // --------------------------------------------------------------------------
  return (
    <div className="w-full bg-blue-600 text-white overflow-hidden py-3 border-b border-blue-800 shadow-2xl relative z-50 group">
      
      {/* THE LIVE PULSE BADGE (Psychological Trust Trigger) */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 bg-blue-700 border-r border-blue-500 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
          <span className="font-black text-[9px] tracking-[0.3em] uppercase italic">Live Intel</span>
        </div>
      </div>

      {/* THE SCROLLING ENGINE */}
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12 items-center pl-32">
        
        {/* FIRST PASS */}
        {messages.map((msg, index) => (
          <span key={`msg-${index}`} className="flex items-center gap-12">
            {msg}
            <span className="text-blue-400 opacity-40 font-normal select-none"> // </span>
          </span>
        ))}

        {/* CLONED PASS FOR INFINITE LOOP (No Gaps) */}
        {messages.map((msg, index) => (
          <span key={`clone-${index}`} className="flex items-center gap-12 opacity-80">
            {msg}
            <span className="text-blue-400 opacity-40 font-normal select-none"> // </span>
          </span>
        ))}

      </div>

      {/* TACTICAL EDGE GRADIENTS */}
      <div className="absolute inset-y-0 left-24 w-12 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-blue-600 to-transparent pointer-events-none z-10"></div>
      
    </div>
  );
}
