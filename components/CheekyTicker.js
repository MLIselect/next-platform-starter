export default function CheekyTicker() {
  return (
    <div className="w-full bg-blue-700 text-white overflow-hidden py-2 border-b border-blue-500 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: K-12 VICTORY LAP */}
        <span>🏆 GTHA SCHOOLS 100% CLOSED (TDSB, PEEL, YORK, DURHAM, HALTON)</span>
        
        {/* SECTION 2: THE NEW TARGET (UNIVERSITIES) */}
        <span>👀 WATCHING UNIVERSITIES: U of T, TMU, YORK, MCMASTER... YOUR MOVE.</span>
        <span>🎓 COLLEGES: DON'T MAKE STUDENTS COMMUTE IN THIS.</span>
        
        {/* SECTION 3: EXAM INFO */}
        <span>📉 HIGH SCHOOL EXAMS: CHECK YOUR BOARD SITE (MOST SHIFTED 1 DAY)</span>
        
        {/* SECTION 4: VIBES */}
        <span>🛌 K-12 STUDENTS: YOU WON. GO TO SLEEP.</span>
        <span>☕ UNI STUDENTS: WE ARE TRACKING YOUR STATUS NOW.</span>
        
        {/* REPEAT LOOP */}
        <span>🏆 GTHA SCHOOLS 100% CLOSED (TDSB, PEEL, YORK, DURHAM, HALTON)</span>
        <span>👀 WATCHING UNIVERSITIES: U of T, TMU, YORK, MCMASTER... YOUR MOVE.</span>
        <span>🎓 COLLEGES: DON'T MAKE STUDENTS COMMUTE IN THIS.</span>
        <span>📉 HIGH SCHOOL EXAMS: CHECK YOUR BOARD SITE (MOST SHIFTED 1 DAY)</span>
        <span>🛌 K-12 STUDENTS: YOU WON. GO TO SLEEP.</span>
        <span>☕ UNI STUDENTS: WE ARE TRACKING YOUR STATUS NOW.</span>
      </div>
    </div>
  );
}
