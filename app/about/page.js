import Link from 'next/link';

export const metadata = {
  title: 'About the Operation | Snow Day Predictor Mission',
  description: 'The story behind the algorithm. How we calculate the odds using NOAA data, historical bias, and diesel gel points.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 py-12 px-6 font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* --- NAVIGATION --- */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="text-cyan-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Intel Hub
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900 p-8 md:p-16 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl pointer-events-none select-none">📡</div>

        {/* --- HEADER --- */}
        <div className="border-b border-slate-800 pb-10 mb-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
                Mission <span className="text-cyan-400">Statement</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
                We exist for one reason: To cure the <span className="text-white font-bold">6:00 AM Anxiety</span>.
            </p>
        </div>

        <div className="space-y-16 text-lg leading-relaxed">
          
          {/* SECTION 1: THE ORIGIN */}
          <section>
              <h3 className="text-2xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">01 //</span> The Origin Story
              </h3>
              <p className="mb-6">
                Every winter, thousands of students, parents, and teachers in Ontario wake up in the pitch dark, staring at their phones, hitting refresh on Twitter/X, wondering the same thing: 
                <em>"Do I have to go out in this?"</em>
              </p>
              <p>
                For years, the answer was "Wait and See." You had to wait for the robo-call or the CP24 banner. We decided that wasn't good enough. 
                We wanted to know the odds <strong>the night before</strong>, so we could decide whether to study for that math test... or stay up late playing video games.
              </p>
          </section>

          {/* SECTION 2: THE TECH (Authority Builder) */}
          <section className="bg-slate-950 p-8 rounded-3xl border border-slate-800 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:scale-110 transition-transform duration-700">🧠</div>
              
              <h3 className="text-2xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">02 //</span> How The Algorithm Works
              </h3>
              <p className="mb-4 text-base">
                We are not guessing. Our "Snow Day Probability Score" is calculated using a weighted algorithm that pulls real-time data from three primary sources:
              </p>
              <ul className="space-y-4 text-base mt-6">
                  <li className="flex gap-4">
                      <span className="bg-cyan-900/30 text-cyan-400 font-black px-2 py-1 rounded text-xs uppercase h-fit mt-1">Source A</span>
                      <div>
                          <strong className="text-white block uppercase text-xs tracking-wider mb-1">Open-Meteo & NOAA Feeds</strong>
                          We track hourly snowfall rates (cm/hr) and wind chill. If snow falls faster than 3cm/hr, city plows cannot keep up.
                      </div>
                  </li>
                  <li className="flex gap-4">
                      <span className="bg-cyan-900/30 text-cyan-400 font-black px-2 py-1 rounded text-xs uppercase h-fit mt-1">Source B</span>
                      <div>
                          <strong className="text-white block uppercase text-xs tracking-wider mb-1">Infrastructure Limits</strong>
                          We monitor the "Diesel Gel Point." At -25°C, school bus fuel turns to slush. If the engines don't start, school doesn't start.
                      </div>
                  </li>
                  <li className="flex gap-4">
                      <span className="bg-cyan-900/30 text-cyan-400 font-black px-2 py-1 rounded text-xs uppercase h-fit mt-1">Source C</span>
                      <div>
                          <strong className="text-white block uppercase text-xs tracking-wider mb-1">Historical Bias (The "Human Element")</strong>
                          We track the habits of specific boards. For example, the TDSB is statistically 40% less likely to close than York Region due to the subway system.
                      </div>
                  </li>
              </ul>
          </section>

          {/* SECTION 3: THE DISCLAIMER (Trust Builder) */}
          <section>
              <h3 className="text-2xl font-black text-white mb-6 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">03 //</span> Who We Are
              </h3>
              <p className="mb-6">
                We are <strong>not</strong> the School Board. We are not the Superintendent. 
                We are a small team of data analysts and developers who simply love snow days as much as you do.
              </p>
              <p className="text-base text-slate-400 italic border-l-4 border-slate-700 pl-4">
                "We are the people analyzing the radar <em>before</em> the Superintendent even wakes up."
              </p>
          </section>

          {/* CTA SECTION */}
          <div className="pt-12 border-t border-slate-800 text-center">
            <h3 className="font-black text-white uppercase tracking-widest text-sm mb-6">Ready to see the data?</h3>
            <Link 
                href="/" 
                className="inline-block bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black uppercase tracking-widest py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              Launch Predictor
            </Link>
          </div>

        </div>
      </div>
      
      {/* Footer Cred */}
      <div className="text-center mt-12 opacity-40 text-[10px] uppercase tracking-widest">
        End of Transmission // Est. 2024
      </div>

    </div>
  );
}
