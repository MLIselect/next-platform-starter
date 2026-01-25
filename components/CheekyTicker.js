export default function CheekyTicker() {
  return (
    <div className="w-full bg-red-600 text-white overflow-hidden py-2 border-b border-red-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: THE OFFICIAL CLOSURES */}
        <span>🚨 OFFICIAL: TDSB (PUBLIC) & TCDSB (CATHOLIC) CLOSED</span>
        <span>📉 EXAMS RESCHEDULED: CHECK SCHOOL SITES</span>
        
        {/* SECTION 2: THE SPECIFIC SILENT LIST */}
        <span>👀 WAITING ON PEEL (PDSB & DPCDSB)...</span>
        <span>👀 WAITING ON YORK (YRDSB & YCDSB)...</span>
        
        {/* SECTION 3: THE FINAL BOSS */}
        <span>🧊 DURHAM (DDSB & DCDSB): THE FINAL BOSS IS WATCHING</span>
        
        {/* SECTION 4: THE VIBES */}
        <span>🚌 BUSES HATE ICE MORE THAN KIDS HATE MATH</span>
        <span>🛌 TORONTO: STAY IN BED</span>
        
        {/* REPEAT LOOP */}
        <span>🚨 OFFICIAL: TDSB (PUBLIC) & TCDSB (CATHOLIC) CLOSED</span>
        <span>📉 EXAMS RESCHEDULED: CHECK SCHOOL SITES</span>
        <span>👀 WAITING ON PEEL (PDSB & DPCDSB)...</span>
        <span>👀 WAITING ON YORK (YRDSB & YCDSB)...</span>
        <span>🧊 DURHAM (DDSB & DCDSB): THE FINAL BOSS IS WATCHING</span>
        <span>🚌 BUSES HATE ICE MORE THAN KIDS HATE MATH</span>
        <span>🛌 TORONTO: STAY IN BED</span>
      </div>
    </div>
  );
}
