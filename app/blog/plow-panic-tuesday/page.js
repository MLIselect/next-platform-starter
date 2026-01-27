import Link from 'next/link';

export const metadata = {
  title: 'The Plow Panic: Why Tuesday Morning is Still at Risk | Snow Day Predictor',
  description: 'The snow might stop at 3 AM, but the buses still might not run. We analyze the "Plow Saturation Rate" and side-street gridlock for Tuesday, Jan 27.',
};

export default function BlogPost() {
  return (
    <article className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-cyan-400 selection:text-slate-900 pt-12 md:pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* --- NAVIGATION --- */}
        <header className="mb-12 border-b border-slate-800 pb-12">
            <Link href="/" className="group flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 hover:text-white transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Intel Hub
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">
             The Plow Panic: <br/>
             <span className="text-slate-500">Why Stopping at 3 AM is Too Late</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="bg-orange-900/30 text-orange-400 border border-orange-900/50 px-3 py-1 rounded">Target Date: Tuesday Jan 27</span>
                <span className="hidden md:inline">//</span>
                <span>Topic: Municipal Logistics</span>
            </div>
        </header>

        {/* --- MAIN INTEL BODY --- */}
        <div className="prose prose-invert prose-lg max-w-none space-y-8 leading-relaxed text-slate-300">
            
            <p className="text-xl text-white font-medium italic border-l-4 border-cyan-500 pl-6 py-2 bg-slate-800/30 rounded-r-xl">
                 The most common myth we hear is: <em>"The forecast says snow stops at 4:00 AM, so school will be open."</em> <strong>This is tactically false.</strong>
            </p>

            <p>
                In the world of school board logistics, the "Falling Snow" is not the enemy. The enemy is the <strong>"Windrow."</strong>
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                1. The Side Street Priority Gap
            </h3>
            <p>
                Municipal plows operate on a strict tier system. 
                <span className="text-white font-bold ml-2">Tier 1</span> (Highways/Emergency Routes) and <span className="text-white font-bold">Tier 2</span> (Arterial Roads) must be cleared first.
            </p>
            <p>
                School buses, however, live on <strong>Tier 3</strong> (Residential Streets/Crescents). If the storm drops 30cm of snow between 6 PM and 3 AM, the city fleet simply does not have the "Cycle Time" to reach Tier 3 streets before the buses need to launch at 6:00 AM.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                2. The "Windrow" Blockade
            </h3>
            <p>
                Even if a plow hits your street at 5:00 AM, it creates a massive "Windrow" (that heavy wall of ice/snow) at the end of every driveway. 
            </p>
            <p>
                <strong>The Board's Logic:</strong> If 40% of parents cannot physically get their cars out of their driveways to drive kids to the bus stop or school, the system collapses. They track "Driveway Blockage" as a key metric for cancellation.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                3. The School Parking Lot Loop
            </h3>
            <p>
                Private contractors clear school parking lots, not the city. These contractors are often overwhelmed during a "flash freeze" event. 
            </p>
            <p>
                If the "Bus Loop" (the specific lane where buses drop kids off) is not cleared to black asphalt by 6:30 AM, buses have nowhere to go. They cannot unload students on the street for safety reasons. A blocked loop = An automatic school closure.
            </p>

            {/* --- TACTICAL SUMMARY --- */}
            <div className="bg-slate-950 p-8 rounded-[2rem] border border-slate-800 my-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl select-none">🚜</div>
                
                <h3 className="text-sm font-black uppercase tracking-widest text-orange-500 mb-4 border-b border-slate-800 pb-4">
                    Tuesday Morning Forecast (Jan 27)
                </h3>
                
                <p className="text-slate-400 text-sm mb-6">
                    While the snow may taper off, the <strong>Cleanup Backlog</strong> is projected to be 6-8 hours. This puts the 6:00 AM bus launch in the "High Risk" zone.
                </p>

                <ul className="space-y-4 mb-8">
                     <li className="flex justify-between items-center text-sm font-bold text-white border-b border-slate-800 pb-2">
                        <span>Side Street Clearance</span>
                        <span className="text-red-500">CRITICAL DELAY</span>
                     </li>
                     <li className="flex justify-between items-center text-sm font-bold text-white border-b border-slate-800 pb-2">
                        <span>Bus Loop Status</span>
                        <span className="text-orange-500">UNCLEAR</span>
                     </li>
                </ul>

                <Link 
                  href="/" 
                  className="block w-full bg-orange-600 hover:bg-orange-500 text-center font-black text-white py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg no-underline"
                >
                  Check Tuesday's Odds
                </Link>
            </div>
        </div>

      </div>
    </article>
  );
}
