import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-6">About the Predictor</h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-xl text-cyan-300 font-medium">
            We exist for one reason: The 6:00 AM anxiety.
          </p>
          
          <p>
            Every winter, thousands of students and parents in Ontario wake up in the dark, staring at their phones, wondering the same thing: 
            <em>"Do I have to go out in this?"</em>
          </p>

          <p>
            For years, the answer was "Wait and see." You had to refresh Twitter, check the news, or wait for the robo-call. 
            We decided that wasn't good enough.
          </p>

          <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-cyan-500 my-8">
            <h3 className="font-bold text-white mb-2">How it works</h3>
            <p className="text-base">
              Our algorithm aggregates data from multiple sources—Environment Canada snowfall rates, wind chill factors, ice accretion risk, and historical school board decision patterns. 
              We calculate the odds so you can decide whether to study for that math test... or go back to sleep.
            </p>
          </div>

          <p>
            We are not the School Board. We are not the Superintendent. 
            We are the people analyzing the data <em>before</em> the Superintendent wakes up.
          </p>

          <div className="pt-8 border-t border-slate-800">
            <h3 className="font-bold text-white mb-4">Support the Project</h3>
            <p className="text-sm mb-4">
              This site is free, but servers aren't. If we helped you get a snow day, consider joining our "6:00 AM Club" newsletter.
            </p>
            <Link href="/" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition-all">
              Check Today's Odds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
