import Link from 'next/link';

export const metadata = {
  title: 'TDSB School Closure Odds: Monday Jan 26 | Snow Day Predictor',
  description: 'Will TDSB schools close tomorrow? With 40cm of snow forecast for Monday, Jan 26, our historical data model shows a 75% chance of a snow day.',
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
          <p className="text-xs text-slate-500 mt-4 text-center">
            {/* FIX IS HERE: Changed ">" to "&gt;" */}
            *Based on historical closure triggers for &gt;30cm accumulation events.
          </p>
        </div>

        {/* SUBSTANCE CONTENT */}
        <div className="prose prose-invert prose-lg text-slate-300 mb-10">
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Forecast: A Major Winter Storm</h2>
          <p className="mb-4 leading-relaxed">
            All eyes are on the weather radar this weekend. The forecast for the Greater Toronto Area has intensified, calling for a significant winter storm event starting Sunday evening and lasting through the Monday morning commute.
          </p>
          <p className="mb-4 leading-relaxed">
            The primary concern is the <strong>snowfall rate</strong>. Models are predicting rates of <strong>2-4cm per hour</strong> overnight. This volume exceeds the ability of city plows to keep residential side streets clear—a key factor for school bus operations.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">How TDSB Makes the Call</h2>
          <p className="mb-4 leading-relaxed">
            The decision to close schools is never taken lightly. The Director of Education monitors weather reports and road conditions starting as early as 4:00 AM. The primary factors include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-300">
            <li><strong className="text-white">Accumulation:</strong> 40cm far exceeds the typical 25cm "closure threshold".</li>
            <li><strong className="text-white">Road Safety:</strong> Can school buses navigate unplowed residential streets safely?</li>
            <li><strong className="text-white">Timing:</strong> Heavy snow falling at 5:00 AM is the worst-case scenario for logistics.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Bus Cancellations vs. School Closures</h2>
          <p className="mb-4 leading-relaxed">
            For parents new to the TDSB, remember the distinction:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-300">
            <li>
              <strong className="text-white">Bus Cancellation:</strong> Often happens when side streets are snowy but main roads are clear. Schools remain <strong className="text-green-400">OPEN</strong>, but students who take the bus must find their own way there.
            </li>
            <li>
              <strong className="text-white">Full System Closure:</strong> This happens when conditions are dangerous for everyone. Given the 40cm forecast, a full system closure is historically probable.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">When Will We Know?</h2>
          <p className="mb-4 leading-relaxed">
            The TDSB has a strict deadline. Decisions are usually announced by <strong className="text-white">6:00 AM</strong> Monday. We will update our odds tracker live as the storm hits.
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
