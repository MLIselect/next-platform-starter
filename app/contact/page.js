import Link from 'next/link';

export const metadata = {
  title: 'Contact Command | Establish Communication',
  description: 'Reach out to the Snow Day Predictor team for media inquiries, bug reports, or advertising opportunities.',
};

export default function ContactPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 py-12 px-6 font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* --- NAVIGATION --- */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="text-cyan-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Intel Hub
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900 p-8 md:p-12 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl pointer-events-none select-none">📡</div>

        {/* --- HEADER --- */}
        <div className="border-b border-slate-800 pb-10 mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
                Establish <span className="text-cyan-400">Comms</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium max-w-2xl leading-relaxed">
                Direct line to the Command Center. Whether you are a journalist tracking a storm or a user reporting a glitch.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CARD 1: GENERAL INQUIRIES */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-100 transition-opacity">📨</div>
                <h3 className="text-xl font-black text-white mb-4 uppercase italic">General Intelligence</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    Have feedback on the algorithm? Found a bug in the matrix? Want to advertise on the site?
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Secure Frequency</p>
                    <a href="mailto:mliselectpro@gmail.com" className="text-cyan-400 font-mono text-base md:text-lg font-bold hover:text-white transition-colors break-all">
                        mliselectpro@gmail.com
                    </a>
                </div>
            </div>

            {/* CARD 2: MEDIA & PRESS */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-100 transition-opacity">🎙️</div>
                <h3 className="text-xl font-black text-white mb-4 uppercase italic">Media & Press</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    For comments on upcoming winter storms, historical data analysis, or interview requests.
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs text-purple-400 font-bold mb-1">PRIORITY CLEARANCE</p>
                    <p className="text-sm text-slate-300">
                        Please mark your subject line: <br/>
                        <strong className="text-white">"MEDIA REQUEST: [Outlet Name]"</strong>
                    </p>
                </div>
            </div>

        </div>

        {/* --- PROTOCOL WARNING (Anti-Spam) --- */}
        <div className="mt-12 bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-xl">
             <h3 className="text-sm font-black text-red-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                ⚠️ Communication Protocol V.1
             </h3>
             <p className="text-slate-300 text-sm leading-relaxed">
                <strong>We cannot answer individual prediction requests.</strong> <br/>
                Please do not email us asking <em>"Will St. Mary's High School close tomorrow?"</em> 
                We process thousands of data points; we cannot manually calculate odds for specific schools via email. 
                Please use the <Link href="/" className="text-cyan-400 hover:underline font-bold">Main Calculator</Link> on the homepage.
             </p>
        </div>

        {/* Footer Timestamp */}
        <div className="text-center mt-12 opacity-40 text-[10px] uppercase tracking-widest">
            Comms Channel: Open // Monitored 06:00 - 22:00 EST
        </div>

      </div>
    </div>
  );
}
