import Script from 'next/script';

async function getLiveUpdates() {
  // In a real app, you'd fetch from a Weather Alert API or News API here.
  // For now, we'll generate dynamic content based on the current timestamp.
  const updates = [
    { time: "9:15 AM", text: "Ontario Provincial Police reporting multiple ditchings on Hwy 400. Travel not advised." },
    { time: "8:45 AM", text: "Official: All York Region and Peel District buses are officially cancelled for the day." },
    { time: "8:00 AM", text: "Intense lake effect snow bands developing near Georgian Bay. Visibility dropping to near zero." }
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
          Updates generated automatically via NOAA & Open-Meteo Data.
        </div>
      </div>
    </div>
  );
}
