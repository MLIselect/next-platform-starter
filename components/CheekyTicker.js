export default function CheekyTicker() {
  return (
    <div className="w-full bg-red-600 text-white overflow-hidden py-2 border-b border-red-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* THE BIG NEWS */}
        <span>🏆 MISSION ACCOMPLISHED: 100% GTHA SHUTDOWN</span>
        <span>🚨 OFFICIAL: HALTON (HDSB) HAS SURRENDERED</span>
        
        {/* THE FULL LIST */}
        <span>✅ TORONTO (TDSB/TCDSB): CLOSED</span>
        <span>✅ PEEL (PDSB/DPCDSB): CLOSED</span>
        <span>✅ YORK (YRDSB/YCDSB): CLOSED</span>
        <span>✅ DURHAM (DDSB/DCDSB): CLOSED</span>
        <span>✅ HALTON (HDSB/HCDSB): CLOSED</span>
        
        {/* THE CELEBRATION */}
        <span>🛌 THE WAR IS OVER. GO TO SLEEP.</span>
        <span>📉 EXAMS CANCELED REGION-WIDE</span>
        <span>🚌 BUSES ARE BURIED. SEE YOU TUESDAY.</span>
        
        {/* REPEAT LOOP */}
        <span>🏆 MISSION ACCOMPLISHED: 100% GTHA SHUTDOWN</span>
        <span>🚨 OFFICIAL: HALTON (HDSB) HAS SURRENDERED</span>
        <span>✅ TORONTO (TDSB/TCDSB): CLOSED</span>
        <span>✅ PEEL (PDSB/DPCDSB): CLOSED</span>
        <span>✅ YORK (YRDSB/YCDSB): CLOSED</span>
        <span>✅ DURHAM (DDSB/DCDSB): CLOSED</span>
        <span>✅ HALTON (HDSB/HCDSB): CLOSED</span>
        <span>🛌 THE WAR IS OVER. GO TO SLEEP.</span>
      </div>
    </div>
  );
}
