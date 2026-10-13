import Script from 'next/script';

async function getLiveUpdates() {
  // TODO(automation phase): this still returns fixed sample text, not a real
  // feed. Wire this up to the Open-Meteo / NWS / Environment Canada refresh
  // pipeline before re-enabling the "generated automatically" claim below.
  const updates = [
    { time: "Sample", text: "This page is a preview of the live storm feed — real automated updates are in progress and not live yet." }
  ];
  return updates;
}

export default async function LiveBlog() {
  const updates = await getLiveUpdates();

  return (
    <div className="bg-slate-900 min-h-screen text-white p-6 tracking-tight">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-black uppercase">Live Storm Tracker</h1>
        </div>

        <div className="space-y-8 border-l-2 border-slate-700 ml-3">
          {updates.map((update, i) => (
            <div key={i} className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-slate-900 border-2 border-cyan-400 rounded-full"></div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{update.time}</span>
              <p className="text-lg font-medium text-slate-200 mt-1">{update.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-slate-800 rounded-lg border border-slate-700 text-center text-sm text-slate-400">
          This feed isn&apos;t automated yet — real-time NWS &amp; Open-Meteo-powered updates are coming soon.
        </div>
      </div>
    </div>
  );
}
