export default function CheekyTicker() {
  return (
    <div className="w-full bg-red-600 text-white overflow-hidden py-2 border-b border-red-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: THE FACTS */}
        <span>🚨 OFFICIAL: TDSB & TCDSB CLOSED MONDAY</span>
        <span>📉 EXAMS RESCHEDULED (CHECK SCHOOL SITES)</span>
        
        {/* SECTION 2: THE HOLDOUTS */}
        <span>👀 PEEL & YORK: SILENT (FOR NOW...)</span>
        <span>🧊 DDSB: THE FINAL BOSS HASN'T BLINKED</span>
        
        {/* SECTION 3: THE VIBES */}
        <span>🚌 BUSES HATE ICE MORE THAN KIDS HATE MATH</span>
        <span>🛌 TORONTO: STAY IN BED</span>
        
        {/* REPEAT FOR SMOOTH SCROLL */}
        <span>🚨 OFFICIAL: TDSB & TCDSB CLOSED MONDAY</span>
        <span>📉 EXAMS RESCHEDULED (CHECK SCHOOL SITES)</span>
        <span>👀 PEEL & YORK: SILENT (FOR NOW...)</span>
        <span>🧊 DDSB: THE FINAL BOSS HASN'T BLINKED</span>
        <span>🚌 BUSES HATE ICE MORE THAN KIDS HATE MATH</span>
        <span>🛌 TORONTO: STAY IN BED</span>
      </div>
    </div>
  );
}
