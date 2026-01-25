import Link from 'next/link';

export const metadata = {
  title: 'TDSB School Closure Odds: Monday Jan 26 | Snow Day Predictor',
  description: 'Will TDSB schools close tomorrow? With up to 40cm forecast for Monday, Jan 26, our historical data model shows a 75% chance of a snow day.',
};

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-cyan-400 text-sm hover:underline mb-8 block">
          ← Back to Calculator
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          Will TDSB Close Schools Tomorrow? <span className="text-cyan-400">Monday Jan 26 Odds</span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-6">
          With Environment Canada upgrading the forecast to an <strong className="text-white">Orange Weather Warning</strong> calling for <strong className="text-white">20-40cm</strong> of snow, the odds of a snow day have skyrocketed.
        </p>

        {/* Odds Box */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 my-8 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-cyan-400 border-b border-slate-700 pb-2">Current Closure Probabilities:</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="font-bold text-slate-200">TDSB / YRDSB (Schools)</span>
              <span className="font-black text-2xl text-green-400">75%</span>
            </li>
             <li className="flex justify-between items-center">
              <span className="font-bold text-slate-200">Bus Cancellations</span>
              <span className="font-black text-2xl text-green-400">95%</span>
            </li>
          </ul>
          <p className="text-xs text-slate-500 mt-4 text-center italic">
            *Based on historical closure triggers for &gt;30cm events. Note: YRDSB is now using a 2-zone pilot (North vs. South).
          </p>
        </div>

        {/* SUBSTANCE CONTENT */}
        <div className="prose prose-invert prose-lg text-slate-300 mb-10">
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Forecast: A Major Winter Storm</h2>
          <p className="mb-4 leading-relaxed">
            The forecast for the Greater Toronto Area has intensified, calling for a significant winter storm event starting Sunday evening. The primary concern is the <strong>snowfall rate</strong> of 2-4cm per hour overnight, which often exceeds the ability of city plows to clear residential streets before the 6 AM decision deadline.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The YRDSB "Two-Zone" Pilot (New for 2026)</h2>
          <p className="mb-4 leading-relaxed">
            As of January 5, 2026, the York Region District School Board (YRDSB) is piloting a two-zone system. Transportation may be cancelled specifically for the <strong>Georgina Service Area</strong> (North of Ravenshoe Rd) or the <strong>South Service Area</strong> (Aurora, Newmarket, Markham, etc.). Even if lake-effect snow hits the North hard, South zone buses might still run.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">How Boards Make the Call</h2>
          <p className="mb-4 leading-relaxed">
            The decision to close schools is based on student safety and road conditions. While boards like the TDSB rarely close because 93% of students walk, they <strong>did</strong> issue full closures as recently as <strong>January 15, 2026</strong>, due to extreme snowfall.
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-300">
            <li><strong className="text-white">Ice Risk:</strong> Freezing rain is the #1 "School Killer."</li>
            <li><strong className="text-white">Extreme Cold:</strong> At wind chills of -28°C or lower, students are kept indoors for recess.</li>
            <li><strong className="text-white">Plow Timing:</strong> If roads aren't cleared by 4:00 AM, buses are usually cancelled.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">When Will We Know?</h2>
          <p className="mb-4 leading-relaxed">
            Decisions are typically announced by <strong>6:00 AM</strong> Monday. We will update our odds tracker live as the storm hits the GTA.
          </p>
        </div>

        <Link 
          href="/" 
          className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-center font-bold text-white py-4 rounded-lg hover:scale-105 transition-transform shadow-lg no-underline"
        >
          CHECK MY LOCAL ODDS
        </Link>
      </div>
    </div>
  );
}
