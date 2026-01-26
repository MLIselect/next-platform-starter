export default function CheekyTicker() {
  return (
    // CHANGED: bg-red-600 -> bg-blue-600 (Victory Blue)
    <div className="w-full bg-blue-600 text-white overflow-hidden py-2 border-b border-blue-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* SECTION 1: THE BIG WIN */}
        <span>🏆 VICTORY: ALL GTHA SCHOOL BOARDS ARE CLOSED MONDAY</span>
        
        {/* SECTION 2: THE NEW TARGETS */}
        <span>👀 WATCHING UNIVERSITIES NOW: U OF T, YORK, TMU... YOUR MOVE.</span>
        <span>🎓 COLLEGES: DON'T BE HEROES. CLOSE THE CAMPUS.</span>
        
        {/* SECTION 3: USEFUL INFO */}
        <span>📉 EXAM UPDATE: CHECK THE NEW "EXAM UPDATES" TAB BELOW</span>
        <span>🛌 K-12 STUDENTS: TURN OFF ALARMS. GO TO SLEEP.</span>
        
        {/* REPEAT LOOP */}
        <span>🏆 VICTORY: ALL GTHA SCHOOL BOARDS ARE CLOSED MONDAY</span>
        <span>👀 WATCHING UNIVERSITIES NOW: U OF T, YORK, TMU... YOUR MOVE.</span>
        <span>🎓 COLLEGES: DON'T BE HEROES. CLOSE THE CAMPUS.</span>
        <span>📉 EXAM UPDATE: CHECK THE NEW "EXAM UPDATES" TAB BELOW</span>
        <span>🛌 K-12 STUDENTS: TURN OFF ALARMS. GO TO SLEEP.</span>
      </div>
    </div>
  );
}
