'use client';

import { useState } from 'react';

export default function AlarmSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  // ⚠️ REPLACE THIS WITH YOUR REAL EMAIL ADDRESS
  // Use the /ajax/ version so it doesn't redirect users away from your site
  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/YOUR_REAL_EMAIL@GMAIL.COM';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
            email: email,
            _subject: "New Snow Day Subscriber!", // Subject line you will see
            _template: "table" // Makes the email look nice
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-900/30 border border-emerald-500/50 p-6 rounded-xl text-center animate-in fade-in zoom-in mb-8">
        <p className="text-3xl mb-2">🛌💤</p>
        <h3 className="text-xl font-black text-white italic uppercase">You are on the list!</h3>
        <p className="text-emerald-300 text-sm mt-2">
          Go to sleep. If schools close, you'll get an email at 6:00 AM.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl relative overflow-hidden group mb-8 text-left">
      
      {/* Cool Background Glow */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            NEW
          </span>
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">
            The 6:00 AM Club
          </span>
        </div>

        <h3 className="text-2xl font-black text-white italic uppercase leading-none mb-2">
          Don't set your alarm.
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          We'll email you at <span className="text-white font-bold">6:00 AM</span> tomorrow 
          <span className="underline decoration-red-500 underline-offset-2 ml-1">only</span> if schools are closed. 
          Otherwise, sleep in.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="flex-1 bg-slate-900 border border-slate-600 text-white px-4 py-3 rounded-lg focus:border-cyan-400 focus:outline-none placeholder-slate-600 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Honeypot to stop bots (FormSubmit feature) */}
          <input type="text" name="_honey" style={{display: 'none'}} />
          
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-sm"
          >
            {status === 'submitting' ? '...' : 'JOIN LIST'}
          </button>
        </form>
        
        {status === 'error' && (
          <p className="text-red-400 text-xs mt-2 font-bold">
            ⚠️ error. Please try again.
          </p>
        )}
        
        <p className="text-[10px] text-slate-600 mt-3 text-center">
          No spam. Just snow notifications. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
