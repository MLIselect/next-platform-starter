export default function CheekyTicker() {
  return (
    <div className="w-full bg-red-600 text-white overflow-hidden py-2 border-b border-red-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: THE DEFINITIVE CLOSURES */}
        <span>🚨 OFFICIAL CLOSURES: TDSB, TCDSB, DDSB, DCDSB, & YORK CATHOLIC (YCDSB)</span>
        
        {/* SECTION 2: THE AWKWARD SILENCE (YORK PUBLIC) */}
        <span>👀 YORK PUBLIC (YRDSB): SILENT (WEIRD FLEX SINCE CATHOLIC CLOSED)</span>
        
        {/* SECTION 3: THE PEEL/HALTON WAITING GAME */}
        <span>⏳ WAITING ON PEEL (PDSB & DPCDSB) + HALTON (HDSB & HCDSB)</span>
        
        {/* SECTION 4: THE VIBES */}
        <span>🏆 DURHAM: THE FINAL BOSS WAS DEFEATED</span>
        <span>🚌 BUSES HATE ICE MORE THAN KIDS HATE MATH</span>
        <span>🛌 TORONTO/DURHAM: STAY IN BED</span>
        
        {/* REPEAT LOOP */}
        <span>🚨 OFFICIAL CLOSURES: TDSB, TCDSB, DDSB, DCDSB, & YORK CATHOLIC (YCDSB)</span>
        <span>👀 YORK PUBLIC (YRDSB): SILENT (WEIRD FLEX SINCE CATHOLIC CLOSED)</span>
        <span>⏳ WAITING ON PEEL (PDSB & DPCDSB) + HALTON (HDSB & HCDSB)</span>
        <span>🏆 DURHAM: THE FINAL BOSS WAS DEFEATED</span>
        <span>🚌 BUSES HATE ICE MORE THAN KIDS HATE MATH</span>
        <span>🛌 TORONTO/DURHAM: STAY IN BED</span>
      </div>
    </div>
  );
}
