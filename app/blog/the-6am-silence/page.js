import Link from 'next/link';

export const metadata = {
  title: "The 6:00 AM Silence: Why School Boards Wait Until the Last Minute",
  description: "Breaking down the 4:30 AM road tests and logistical hurdles that define a GTA Snow Day.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-bold uppercase tracking-widest mb-8 block">
          ← Back to Predictor
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          The 6:00 AM Silence: Why School Boards Wait
        </h1>
        
        <p className="text-lg text-slate-400 mb-8 italic">
          Breaking down the 4:30 AM road tests and logistical hurdles that define a GTA Snow Day.
        </p>

        <div className="space-y-6 leading-relaxed text-slate-300">
          <p>
            It is the question every parent in the GTA asks while staring at a foot of snow at 5:30 AM: <strong>"What are they waiting for?"</strong>
          </p>

          <p>
            While it feels like a lack of common sense, the gap between a midnight forecast and a 6:00 AM official tweet is actually a high-stakes coordination of bus operators, municipal road supervisors, and provincial mandates.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">1. The 4:30 AM "Ground Truth" Test</h3>
          <p>
            Transportation leads don't just look at the radar; they have bus operators actually driving representative routes at 4:30 AM. They are checking for "ground truth"—whether a bus can physically make a turn on a residential crescent or stop safely on a snow-covered hill.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">2. The "93% Walker" Factor</h3>
          <p>
            In the TDSB, approximately 93% of students walk or take the TTC. The board’s logic is that if they close the school, they are locking out thousands of students who could have safely walked a few blocks. This is why Toronto often stays "open" while regions with more rural routes shut down.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">3. Safety vs. The Childcare Crisis</h3>
          <p>
            If a board announces a closure at 10:00 PM and the storm underperforms, they have left 250,000+ parents without childcare for no reason. The silence until 6:00 AM is a buffer to ensure that the snow is actually on the ground and the municipal plows are actually failing to keep up.
          </p>

          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl mt-12">
            <p className="text-white font-bold mb-2">Current Monday Prediction:</p>
            <p className="text-cyan-400 text-2xl font-black">95% Bus Cancellation / 85% School Closure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
