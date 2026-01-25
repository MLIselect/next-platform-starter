import Link from 'next/link';

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
          With Environment Canada upgrading the forecast to <strong className="text-white">20-40cm</strong> of snow, the odds of school bus cancellations for the TDSB have skyrocketed.
        </p>

        {/* Odds Box */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 my-8">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Current Closure Probabilities:</h3>
          <ul className="space-y-3">
            <li className="flex justify-between border-b border-slate-700 pb-2">
              <span>TDSB (Toronto)</span>
              <span className="font-bold text-green-400">75% (High)</span>
            </li>
             <li className="flex justify-between border-b border-slate-700 pb-2">
              <span>Bus Cancellation Chance</span>
              <span className="font-bold text-green-400">95% (Very High)</span>
            </li>
          </ul>
        </div>

        {/* NEW SUBSTANCE CONTENT STARTS HERE */}
        <div className="prose prose-invert prose-lg text-slate-300 mb-10">
          
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Forecast: A Major Winter Storm</h2>
          <p className="mb-4 leading-relaxed">
            All eyes are on the weather radar this weekend. Environment Canada has upgraded the forecast for the Greater Toronto Area, calling for a significant winter storm event starting Sunday and lasting through Monday morning.
          </p>
          <p className="mb-4 leading-relaxed">
            With snowfall accumulation estimates now reaching <strong className="text-white">20-40cm</strong>, coupled with potential blowing snow and reduced visibility, the commute on Monday morning is expected to be hazardous.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">How TDSB Makes the Call</h2>
          <p className="mb-4 leading-relaxed">
            The decision to close schools is never taken lightly. The Director of Education monitors weather reports and road conditions starting as early as 4:00 AM. The primary factors include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-300">
            <li><strong className="text-white">Road Safety:</strong> Can school buses navigate residential streets safely?</li>
            <li><strong className="text-white">Accumulation:</strong> Is the snowfall rate faster than plows can clear?</li>
            <li><strong className="text-white">Temperature:</strong> Is there a risk of buses freezing or extreme wind chill?</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Bus Cancellations vs. School Closures</h2>
          <p className="mb-4 leading-relaxed">
            For parents new to the TDSB, it is important to remember the distinction:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-slate-300">
            <li>
              <strong className="text-white">Bus Cancellation:</strong> Often happens when side streets are snowy but main roads are clear. Schools remain <strong className="text-green-400">OPEN</strong>, but students who take the bus must find their own way there.
            </li>
            <li>
              <strong className="text-white">Full System Closure:</strong> This happens when conditions are dangerous for everyone. Given the 40cm forecast, a full system closure is much more likely this time.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">When Will We Know?</h2>
          <p className="mb-4 leading-relaxed">
            The TDSB has a strict deadline for these announcements. Decisions are usually made by <strong className="text-white">6:00 AM</strong> on the morning of the snow day. The official announcement will be posted on the TDSB website and social media channels first.
          </p>
        </div>
        {/* NEW CONTENT ENDS HERE */}

        <Link 
          href="/" 
          className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-center font-bold text-white py-4 rounded-lg hover:scale-105 transition-transform shadow-lg no-underline"
        >
          CHECK MY ODDS
        </Link>
      </div>
    </div>
  );
}
