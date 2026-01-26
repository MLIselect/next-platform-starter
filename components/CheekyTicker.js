export default function CheekyTicker() {
  return (
    <div className="w-full bg-blue-600 text-white overflow-hidden py-2 border-b border-blue-800 shadow-md relative z-50">
      <div className="whitespace-nowrap animate-marquee font-black text-xs md:text-sm tracking-widest uppercase flex gap-12">
        {/* THE MAIN WIN */}
        <span>🏆 VICTORY: ALL GTHA SCHOOL BOARDS ARE CLOSED MONDAY</span>
        
        {/* THE PIVOT TO UNIS */}
        <span>🎓 UNIVERSITIES (UofT, YORK, TMU): WE ARE WATCHING YOU...</span>
        <span>👀 COLLEGES: DON'T BE HEROES. CLOSE THE CAMPUS.</span>
        
        {/* THE LOGISTICS */}
        <span>📉 EXAM ALERT: CHECK YOUR BOARD'S NEW SCHEDULE (MOST SHIFT 1 DAY)</span>
        <span>☕ PARENTS: ENJOY YOUR COFFEE. NO LUNCHES TO PACK.</span>
        
        {/* REPEAT */}
        <span>🏆 VICTORY: ALL GTHA SCHOOL BOARDS ARE CLOSED MONDAY</span>
        <span>🎓 UNIVERSITIES (UofT, YORK, TMU): WE ARE WATCHING YOU...</span>
        <span>👀 COLLEGES: DON'T BE HEROES. CLOSE THE CAMPUS.</span>
        <span>📉 EXAM ALERT: CHECK YOUR BOARD'S NEW SCHEDULE (MOST SHIFT 1 DAY)</span>
        <span>☕ PARENTS: ENJOY YOUR COFFEE. NO LUNCHES TO PACK.</span>
      </div>
    </div>
  );
}
