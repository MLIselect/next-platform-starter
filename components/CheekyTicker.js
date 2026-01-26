export default function CheekyTicker() {
  return (
    <div className="w-full bg-red-600 text-white overflow-hidden py-2 border-b border-red-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: THE BIG NEWS */}
        <span>🚨 OFFICIAL: GTHA-WIDE SCHOOL CLOSURE (ALL BOARDS)</span>
        <span>❄️ TORONTO, PEEL, YORK, & DURHAM ARE 100% CLOSED</span>
        
        {/* SECTION 2: SPECIFIC CONFIRMATIONS */}
        <span>✅ TDSB & TCDSB: CLOSED</span>
        <span>✅ PEEL (PDSB & DPCDSB): CLOSED</span>
        <span>✅ YORK (YRDSB & YCDSB): CLOSED</span>
        <span>✅ DURHAM (DDSB & DCDSB): CLOSED</span>
        
        {/* SECTION 3: THE STRAGGLERS */}
        <span>🛡️ HALTON: ELEMENTARY PA DAY (YOU'RE SAFE) / SECONDARY LIKELY CLOSED</span>
        
        {/* SECTION 4: THE CELEBRATION */}
        <span>🏆 ACHIEVEMENT UNLOCKED: 100% REGIONAL SHUTDOWN</span>
        <span>🛌 TURN OFF YOUR ALARMS. GO BACK TO SLEEP.</span>
        <span>🚌 BUSES ARE BURIED. SCHOOL IS CANCELED.</span>
        
        {/* REPEAT LOOP */}
        <span>🚨 OFFICIAL: GTHA-WIDE SCHOOL CLOSURE (ALL BOARDS)</span>
        <span>❄️ TORONTO, PEEL, YORK, & DURHAM ARE 100% CLOSED</span>
        <span>✅ TDSB & TCDSB: CLOSED</span>
        <span>✅ PEEL (PDSB & DPCDSB): CLOSED</span>
        <span>✅ YORK (YRDSB & YCDSB): CLOSED</span>
        <span>✅ DURHAM (DDSB & DCDSB): CLOSED</span>
        <span>🛡️ HALTON: ELEMENTARY PA DAY (YOU'RE SAFE) / SECONDARY LIKELY CLOSED</span>
        <span>🏆 ACHIEVEMENT UNLOCKED: 100% REGIONAL SHUTDOWN</span>
        <span>🛌 TURN OFF YOUR ALARMS. GO BACK TO SLEEP.</span>
      </div>
    </div>
  );
}
