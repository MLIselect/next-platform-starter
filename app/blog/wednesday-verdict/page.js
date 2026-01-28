import Link from 'next/link';

export const metadata = {
  title: "Wednesday Verdict: Infrastructure Saturation & The Diesel Gel Point",
  description: "Analyzing the plying limits and freezing conditions for the Jan 28 morning commute.",
}

export default function WednesdayVerdict() {
  return (
    <article className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-cyan-400 selection:text-slate-900 pt-12 md:pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* --- HEADER NAVIGATION --- */}
        <header className="mb-12 border-b border-slate-800 pb-12">
            <Link href="/" className="group flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 hover:text-white transition-colors">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Intel Hub
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">
                Wednesday Verdict: <br/>
                <span className="text-slate-500">Infrastructure Saturation & Diesel Gel Alerts</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span className="bg-slate-800 px-3 py-1 rounded text-cyan-400">Decrypted: Jan 27, 2026</span>
                <span className="hidden md:inline">//</span>
                <span>Clearance: Public</span>
                <span className="hidden md:inline">//</span>
                <span>Source: Regional Transit & Satellite Feed</span>
            </div>
        </header>

        {/* --- MAIN CONTENT BODY --- */}
        <div className="prose prose-invert prose-lg max-w-none space-y-8 leading-relaxed text-slate-300">
            
            <p className="text-xl text-white font-medium italic border-l-4 border-cyan-500 pl-6 py-2 bg-slate-800/30 rounded-r-xl">
                The morning of January 28 isn't just a weather event; it's a <strong>logistical battle</strong> between municipal clearing limits and Arctic chemistry.
            </p>

            <p>
                While the Greater Toronto Area (416) faces a standard deep freeze, the surrounding Snowbelt regions are hitting a critical threshold we call <strong>"Infrastructure Saturation."</strong> This is the point where the rate of snowfall exceeds the tactical clearing capacity of municipal fleets.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4 flex items-center gap-3">
                <span className="text-cyan-500 text-sm align-middle bg-cyan-950 px-2 py-1 rounded">01</span> 
                The Plowing Saturation Limit
            </h3>
            <p>
                In Simcoe County and Grey-Bruce, municipal plows have been operational for over 48 hours. When "Saturation" hits, primary highways are prioritized, leaving secondary rural roads—where the majority of bus routes reside—effectively abandoned until the squalls break. 
            </p>
            <p>
                Our scanners indicate that <strong>"Snow Ramping"</strong> on rural overpasses has reached a high-risk level. For bus operators, if a 12-ton vehicle cannot safely clear a residential crescent, the route is a scrub.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4 flex items-center gap-3">
                <span className="text-cyan-500 text-sm align-middle bg-cyan-950 px-2 py-1 rounded">02</span> 
                The Diesel Gel Warning
            </h3>
            <p>
                Ambient temperatures tonight are projected to bottom out at -24°C, with wind chills approaching -32°C. This is the <strong>"Chemistry Threshold"</strong> where untreated diesel fuel begins to crystallize.
            </p>
            <p>
                For rural fleets parked in open yards, the gel risk is rated at <strong>7.5/10</strong>. Even if the roads are navigable, a bus fleet that cannot achieve combustion at 5:00 AM results in a systemic cancellation across the district.
            </p>

            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight mt-12 mb-4 flex items-center gap-3">
                <span className="text-cyan-500 text-sm align-middle bg-cyan-950 px-2 py-1 rounded">03</span> 
                The GTA Black Ice Signatures
            </h3>
            <p>
                In the TDSB, YRDSB, and PDSB, the threat isn't depth—it's traction. The flash freeze tonight will solidify today's slush into a <strong>Black Ice glaze</strong>.
            </p>
            <p>
                While Toronto's "Walker Factor" usually keeps schools open, transportation delays are expected to be significant (85% probability). Expect "Code Cold" protocols to be in effect for all outdoor activities.
            </p>

            {/* --- TACTICAL SUMMARY CARD --- */}
            <div className="bg-slate-950 border-2 border-slate-800 p-8 rounded-[2rem] mt-16 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl group-hover:opacity-20 transition-opacity select-none">❄️</div>
                
                <h4 className="text-white font-black uppercase text-sm tracking-[0.2em] mb-4 text-center md:text-left">Wednesday Strategic Outlook</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Due to infrastructure saturation in the north and freezing signatures in the south, we have issued a **High-Risk** status for the Snowbelt regions.
                        </p>
                        <Link href="/" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-cyan-500/50">
                            View Live Scanner →
                        </Link>
                    </div>
                    <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                        <span className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Wednesday Snowbelt Projection</span>
                        <span className="block text-4xl md:text-5xl font-black text-white mb-1">95%</span>
                        <span className="block text-cyan-400 text-xs font-bold uppercase tracking-widest">Cancellation Risk</span>
                    </div>
                </div>
            </div>

        </div>
        
        {/* --- FOOTER CTA --- */}
        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
             <Link href="/" className="text-slate-500 hover:text-white uppercase font-black tracking-widest text-xs transition-colors">
                ← Return to Global Command Center
            </Link>
        </div>

      </div>
    </article>
  );
}
