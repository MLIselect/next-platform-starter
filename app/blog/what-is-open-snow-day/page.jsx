import Link from 'next/link';

export const metadata = {
  title: "What's Open on the Snow Day? | Malls, Movies & More",
  description: "School is closed, but is the mall open? Check the status of Vaughan Mills, Eaton Centre, Cineplex, and Ski Hills for Jan 26.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-400 selection:text-slate-900 pb-20">
      
      {/* NAVIGATION */}
      <nav className="p-4 border-b border-slate-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tighter hover:text-cyan-400 transition-colors">
            ← BACK TO PREDICTOR
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pt-12">
        
        {/* HEADER */}
        <header className="mb-10 text-center">
          <span className="bg-cyan-500 text-slate-900 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4 inline-block">
            Survival Guide
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
            School is Closed.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Is Anything Else Open?
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            You slept in. You ate breakfast. Now you're bored. Here is the official status of malls, movies, and spots to hang out during the "Snowmaggedon."
          </p>
        </header>

        {/* STATUS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* MALLS */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">🛍️ Major Malls</h3>
              <span className="bg-green-500 text-slate-900 font-black px-2 py-1 rounded text-xs uppercase">OPEN</span>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> Vaughan Mills (Normal Hours)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> Eaton Centre (Normal Hours)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> Yorkdale (Normal Hours)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> SQ1 (Normal Hours)
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500 italic border-t border-slate-700 pt-3">
              *Warning: Individual stores may be closed if staff couldn't make it in. Food courts will be packed.
            </p>
          </div>

          {/* ENTERTAINMENT */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">🍿 Movies & Fun</h3>
              <span className="bg-green-500 text-slate-900 font-black px-2 py-1 rounded text-xs uppercase">OPEN</span>
            </div>
             <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> Cineplex (Check App for times)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> Rec Room (Open)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">●</span> Dave & Busters (Open)
              </li>
            </ul>
          </div>

          {/* OUTDOORS */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">⛷️ Ski Hills</h3>
              <span className="bg-green-500 text-slate-900 font-black px-2 py-1 rounded text-xs uppercase">BUSY</span>
            </div>
            <p className="text-slate-300 mb-2">
              Blue Mountain, Horseshoe, and St. Louis are loving this snow.
            </p>
            <p className="text-yellow-400 text-sm font-bold">
              ⚠️ Expect massive lines. Everyone had the same idea as you.
            </p>
          </div>

          {/* TRANSIT */}
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 border-l-4 border-l-yellow-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">🚌 TTC / GO Transit</h3>
              <span className="bg-yellow-500 text-slate-900 font-black px-2 py-1 rounded text-xs uppercase">DELAYS</span>
            </div>
            <p className="text-slate-300">
              Transit is running, but expect 15-30 min delays on surface routes (buses/streetcars). Subways are your best bet.
            </p>
          </div>
        </div>

        {/* AFFILIATE PLUG */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-center shadow-xl transform hover:scale-[1.02] transition-transform cursor-pointer mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase">
                Don't go to the mall. Go outside.
            </h2>
            <p className="text-slate-900 font-medium text-lg mb-6 max-w-lg mx-auto">
                This is the best packing snow of the year. Grab a sled before they sell out everywhere.
            </p>
            <a 
                href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" 
                target="_blank" 
                className="inline-block bg-slate-900 text-white font-black text-xl px-8 py-4 rounded-full hover:bg-slate-800 transition-colors shadow-lg"
            >
                🛒 GRAB A SLED ON AMAZON
            </a>
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center text-slate-500 text-sm">
            <p>Updated: Jan 25, 8:00 PM EST. Always call ahead before travelling.</p>
        </div>

      </main>
    </div>
  );
}
