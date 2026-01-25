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

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 my-8">
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Current Closure Probabilities:</h3>
          <ul className="space-y-3">
            <li className="flex justify-between border-b border-slate-700 pb-2">
              <span>TDSB (Toronto)</span>
              <span className="font-bold text-green-400">75% (High)</span>
            </li>
          </ul>
        </div>

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
