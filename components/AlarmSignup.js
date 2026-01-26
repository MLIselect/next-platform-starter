export default function AlarmSignup({ location }) { 
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center mb-8">
      <h3 className="text-xl font-bold text-white mb-2">
        Don't wake up at 6:00 AM. 🛌
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        Join the <strong>"6:00 AM Club"</strong>. We will email you the second the schools officially close.
      </p>

      {/* UPDATE YOUR FORMSUBMIT URL HERE IF NEEDED */}
      <form action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST" className="flex flex-col gap-3">
        
        {/* HIDDEN INPUTS TO TRACK CITY */}
        <input type="hidden" name="_subject" value={`New Snow Club Member from ${location || 'Unknown'}`} />
        <input type="hidden" name="City" value={location || 'Unknown'} />

        <input 
          type="email" 
          name="email" 
          placeholder="Enter your email..." 
          required
          className="bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-cyan-400 focus:outline-none w-full text-center"
        />
        <button 
          type="submit" 
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all"
        >
          🔔 Notify Me
        </button>
      </form>
      <p className="text-[10px] text-slate-500 mt-3">
        No spam. Just snow days. Unsubscribe anytime.
      </p>
    </div>
  );
}
