export default function CheekyTicker() {
  return (
    <div className="w-full bg-blue-600 text-white overflow-hidden py-2 border-b border-blue-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: THE BIG WIN & ONTARIO STATUS */}
        <span>🏆 VICTORY: ALL GTHA SCHOOL BOARDS CLOSED TODAY (MONDAY)</span>
        <span>🎓 UNI UPDATE: YORK, TMU, & U OF T (SCARB/MISS) CLOSED. ST. GEORGE CLOSED UNTIL NOON.</span>
        
        {/* SECTION 2: QUEBEC FOCUS (NEW) */}
        <span>⚠️ MONTREAL ALERT: 100% BUS CANCEL ODDS CONFIRMED. POWER OUTAGES REPORTED IN NDG/CÔTE-SAINT-LUC.</span>
        <span>⚜️ QUEBEC: BITTER COLD SNAP (-21°C) IMPACTING TRANSIT. CHECK YOUR POSTAL CODE ABOVE.</span>
        
        {/* SECTION 3: TUESDAY PIVOT */}
        <span>🔮 TUESDAY PREDICTION: STORM CLEARING TONIGHT. ROADS WILL BE ROUGH. EARLY TUESDAY ODDS ARE LIVE.</span>
        <span>🛒 SURVIVAL: MALLS & THEATRES ARE OPEN TODAY. CHECK THE "WHAT IS OPEN" GUIDE BELOW.</span>
        
        {/* REPEAT LOOP FOR SMOOTH SCROLLING */}
        <span>🏆 VICTORY: ALL GTHA SCHOOL BOARDS CLOSED</span>
        <span>⚠️ MONTREAL: 100% BUS CANCEL ODDS & POWER OUTAGES</span>
        <span>🔮 TUESDAY EARLY ODDS ARE NOW LIVE - CHECK YOUR ZIP/POSTAL</span>
        <span>🛌 SLEEP IN, CANADA. THE ALGORITHM HAS SPOKEN.</span>
      </div>
    </div>
  );
}
