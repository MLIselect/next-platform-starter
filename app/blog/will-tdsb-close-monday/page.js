import Link from 'next/link';

export const metadata = {
  title: 'TDSB School Closure Odds: Monday Jan 26 | Snow Day Predictor',
  description: 'Will TDSB schools close tomorrow? With up to 40cm forecast for Monday, Jan 26, our historical data model shows a 75% chance of a snow day.',
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
             Will TDSB Close Schools Tomorrow? <br/>
             <span className="text-slate-500">Monday Jan 26 Odds</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="bg-red-900/30 text-red-400 border border-red-900/50 px-3 py-1 rounded">Warning Level: Orange</span>
                <span className="hidden md:inline">//</span>
                <span>Forecast: 20-40cm</span>
            </div>
        </header>

        {/* --- MAIN INTEL BODY --- */}
        <div className="prose prose-invert prose-lg max-w-none space-y-8 leading-relaxed text-slate-300">
            
            <p className="text-xl text-white font-medium italic border-l-4 border-orange-500 pl-6 py-2 bg-slate-800/30 rounded-r-xl">
                 With Environment Canada upgrading the forecast to an <strong>Orange Weather Warning</strong> calling for <strong>20-40cm</strong> of snow, the odds of a snow day have skyrocketed.
            </p>

            {/* --- TACTICAL ODDS BOX --- */}
            <div className="bg-slate-950 p-8 rounded-[2rem] border border-slate-800 my-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl select-none">📊</div>
                
                <h3 className="text-sm font-black uppercase tracking-widest text-cyan-500 mb-6 border-b border-slate-800 pb-4">
                    Current Probability Matrix (06:00 EST)
                </h3>
                
                <ul className="space-y-6">
                    <li className="flex justify-between items-center group">
                        <span className="font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                            TDSB / YRDSB (Schools)
                        </span>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[75%]"></div>
                            </div>
                            <span className="font-black text-3xl text-orange-500">75%</span>
                        </div>
                    </li>
                    <li className="flex justify-between items-center group">
                        <span className="font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                            Bus Cancellations
                        </span>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-[95%]"></div>
                            </div>
                            <span className="font-black text-3xl text-red-500">95%</span>
                        </div>
                    </li>
                </ul>
                <p className="text-[10px] text-slate-500 mt-6 uppercase tracking-widest font-bold">
                    *Based on historical closure triggers for &gt;30cm events.
                </p>
            </div>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                The Forecast: A Major Winter Storm
            </h3>
            <p>
                The forecast for the Greater Toronto Area has intensified, calling for a significant winter storm event starting Sunday evening. 
            </p>
            <p>
                The primary concern is the <strong>snowfall rate</strong> of 2-4cm per hour overnight. This intensity ("The Red Zone") often exceeds the ability of city plows to clear residential streets before the 4:00 AM bus loop tests.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                The YRDSB "Two-Zone" Pilot
            </h3>
            <p>
                As of January 5, 2026, the York Region District School Board (YRDSB) is piloting a two-zone system. Transportation may be cancelled specifically for:
            </p>
            <ul className="list-none space-y-2 pl-4 border-l-2 border-slate-700">
                <li><strong className="text-white">Zone 1:</strong> Georgina Service Area (North of Ravenshoe Rd)</li>
                <li><strong className="text-white">Zone 2:</strong> South Service Area (Aurora, Newmarket, Markham)</li>
            </ul>
            <p>
                <strong>Tactical Note:</strong> Even if lake-effect snow hits the North hard, South zone buses might still run. Check your specific zone status.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                How Boards Make the Call
            </h3>
            <p>
                The decision to close schools is based on student safety and road conditions. While boards like the TDSB rarely close because 93% of students walk, they <strong>did</strong> issue full closures as recently as <strong>January 15, 2026</strong>.
            </p>
            <ul className="space-y-3 mt-4">
                <li className="flex gap-3">
                    <span className="text-cyan-500 font-bold">01 //</span>
                    <span><strong className="text-white">Ice Risk:</strong> Freezing rain is the #1 "School Killer."</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-cyan-500 font-bold">02 //</span>
                    <span><strong className="text-white">Extreme Cold:</strong> At wind chills of -28°C or lower, risk of frostbite cancels buses.</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-cyan-500 font-bold">03 //</span>
                    <span><strong className="text-white">Plow Timing:</strong> If side streets aren't cleared by 4:00 AM, buses cannot safely turn.</span>
                </li>
            </ul>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4">
                When Will We Know?
            </h3>
            <p>
                Decisions are typically announced by <strong>6:00 AM Monday</strong>. We will update our odds tracker live as the storm hits the GTA.
            </p>
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="mt-16 pt-10 border-t border-slate-800">
            <Link 
              href="/" 
              className="block w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-center font-black text-white py-5 rounded-full uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] no-underline"
            >
              Check My Local Odds
            </Link>
        </div>

      </div>
    </article>
  );
}
