'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; 
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const AMAZON_TAG = 'mliselectpro-20';

  // --- 1. LIVE TIME REFRESH (Grok Suggestion) ---
  const [isAfternoon, setIsAfternoon] = useState(false);
  useEffect(() => {
    const updateTime = () => {
      const hours = new Date().getHours();
      setIsAfternoon(hours >= 12); 
    };
    updateTime();
    const timer = setInterval(updateTime, 60000); 
    return () => clearInterval(timer);
  }, []);

  const targetDay = isAfternoon ? "Tuesday" : "Monday";

  // --- 2. GRANULAR ALGORITHM (With Quebec Bonus) ---
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput, morningIce) => {
    const upperCity = city.toUpperCase();
    
    // Victory Mode (Ontario/US Focus)
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) return { bus: 100, school: 100 };
      const confirmedUS = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN'];
      if (confirmedUS.some(c => upperCity.includes(c))) return { bus: 100, school: 100 };
    }

    let bus = 0; let school = 0;
    
    // Snow Volume
    if (snow > 1.0) { bus += 30; school += 15; }
    if (snow > 4.0) { bus += 60; school += 40; }
    if (snow > 8.0) { bus += 95; school += 80; }
    
    // Morning Ice Window (Grok Suggestion)
    if (morningIce) { bus += 25; school += 15; }
    
    // Standard Ice Logic
    if (rain > 0.02 && tempMin <= 32) { bus += 50; school += 20; }
    
    // --- QUEBEC SPECIFIC BONUS (Grok Suggestion) ---
    // Quebec boards (CSS/EMSB) often cancel buses earlier for bridge/urban ice
    if (country === 'Canada' && (cleanInput.startsWith('H') || cleanInput.startsWith('J') || cleanInput.startsWith('G'))) {
        bus += 15; 
        school += 5;
    }

    // Cold/Wind (Diesel engine and student safety)
    if (tempMin < -10) { bus += 20; school += 5; }
    if (wind > 30) { bus += 25; school += 10; }

    // Superintendent Mood Variance
    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    
    return { 
      bus: Math.max(0, Math.min(bus + moodVariance, 100)), 
      school: Math.max(0, Math.min(school + moodVariance, 100)) 
    };
  };

  const getMessage = (prob) => {
    if (prob === 100) return { title: "VICTORY: SCHOOL CLOSED! 🚨", mood: "WE CALLED IT! The Superintendent surrendered. Go back to sleep, you earned it." };
    if (prob < 20) return { title: "PACK THE LUNCH 🎒", mood: "Ruthless. Buses are rolling." };
    if (prob < 50) return { title: "BUS BINGO 🎰", mood: "Stressing. Refreshing Twitter." };
    if (prob < 80) return { title: "PJ DAY LIKELY 🤞", mood: "Defeated. Drafting the email." };
    return { title: "GOD TIER SNOW DAY 👑", mood: "Asleep. Don't set the alarm." };
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true); setError(''); setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      const geoUrl = cleanInput.length === 5 ? `https://api.zippopotam.us/us/${cleanInput}` : `https://api.zippopotam.us/ca/${cleanInput.substring(0,3)}`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("INVALID_LOCATION");
      
      const geoData = await geoRes.json();
      lat = geoData.places[0].latitude; lon = geoData.places[0].longitude;
      city = geoData.places[0]['place name']; country = cleanInput.length === 5 ? 'USA' : 'Canada';

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      if (!weatherRes.ok) throw new Error("WEATHER_FAIL");
      
      const wData = await weatherRes.json();

      const dayIdx = isAfternoon ? 1 : 0;
      const snowRaw = wData.daily.snowfall_sum[dayIdx];
      const rainRaw = wData.daily.rain_sum[dayIdx];
      const tempRaw = wData.daily.temperature_2m_min[dayIdx];
      const windRaw = wData.daily.windspeed_10m_max[dayIdx];

      // 6 AM / Morning Ice Window Logic
      const sixAmIndex = isAfternoon ? 30 : 6; 
      const morningWindow = isAfternoon ? wData.hourly.precipitation.slice(28, 33) : wData.hourly.precipitation.slice(4, 9);
      const morningIceDetected = morningWindow.some((precip, i) => precip > 0.01 && wData.hourly.temperature_2m[isAfternoon ? 28+i : 4+i] <= 32);

      const sixAmFeels = wData.hourly.apparent_temperature[sixAmIndex];
      const sixAmWind = wData.hourly.windspeed_10m[sixAmIndex];

      const probs = calculateProbability(snowRaw, tempRaw, windRaw, rainRaw, country, city, cleanInput, morningIceDetected);
      const msgData = getMessage(probs.bus);
      
      const isCanada = country === 'Canada';
      const toC = (f) => Math.round((f - 32) * 5/9);
      const toCm = (i) => (i * 2.54).toFixed(1);
      const toKmh = (m) => Math.round(m * 1.60934);

      setResult({
        chance: probs.bus, probs, title: msgData.title, mood: msgData.mood, location: `${city}, ${country}`,
        display: {
          snow: isCanada ? toCm(snowRaw) : snowRaw.toFixed(1),
          temp: isCanada ? toC(tempRaw) : Math.round(tempRaw),
          wind: isCanada ? toKmh(windRaw) : Math.round(windRaw),
          sixAmFeels: isCanada ? toC(sixAmFeels) : Math.round(sixAmFeels),
          sixAmWind: isCanada ? toKmh(sixAmWind) : Math.round(sixAmWind),
          units: isCanada ? { snow: 'cm', temp: '°C', wind: 'km/h' } : { snow: '"', temp: '°F', wind: 'mph' },
          iceDetected: morningIceDetected || (rainRaw > 0.05 && tempRaw <= 32)
        }
      });
    } catch (err) { 
        if (err.message === "INVALID_LOCATION") setError("Postal/Zip not found. Try L4G (Ontario) or H1A (Montreal).");
        else if (err.message === "WEATHER_FAIL") setError("Weather satellite timeout. Try again in a moment.");
        else setError("Error connecting. Refresh the page.");
    }
    setLoading(false);
  };

  const shareText = result ? `VICTORY! My Odds: ${result.probs.bus}% Bus Cancel in ${result.location}! ❄️ ${result.mood} schoolsnowdaypredictor.com` : '';
  const copyToClipboard = () => { navigator.clipboard.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const tweetResult = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank'); };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <div className="space-y-3 mb-6">
          <Link href="/blog/what-is-open-snow-day" className="block bg-emerald-900/40 border border-emerald-500/30 p-3 rounded-lg hover:bg-emerald-800/50 transition-all text-left group">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">GUIDE</span>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider uppercase tracking-widest">Montreal & Toronto Status</span>
            </div>
            <p className="text-white text-sm font-bold group-hover:text-emerald-300 transition-colors">🏆 VICTORY: Schools CLOSED across Ontario & Quebec! Check what's open →</p>
          </Link>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-center mb-6 shadow-inner">
            <h2 className="text-2xl font-black italic text-cyan-400 uppercase tracking-tighter" role="status">Analyzing {targetDay}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Live Updates Enabled</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            aria-label="Postal or Zip Code"
            placeholder="e.g. L4G, H1A, 14201..." 
            className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 outline-none font-mono text-lg uppercase shadow-inner" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && runPrediction(input)} 
          />
          <button 
            onClick={() => runPrediction(input)} 
            disabled={loading} 
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg min-w-[80px] shadow-lg active:scale-95 transition-transform"
          >
            {loading ? '⏳' : 'GO'}
          </button>
        </div>
        {error && <p className="text-red-400 text-xs font-bold mt-2" role="alert">⚠️ {error}</p>}
      </div>

      <div className="bg-slate-950/40 border-y border-slate-700/50 p-6 text-center backdrop-blur-sm">
          <div className="flex justify-center mb-3 text-cyan-400">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h4 className="text-white font-black uppercase text-sm mb-1 tracking-tighter">📸 SHOW US YOUR SNOW DAY</h4>
          <p className="text-slate-400 text-[10px] mb-4 italic">Post your view and tag <span className="text-cyan-400 font-bold">#SchoolSnowDayPredictor</span> to be featured!</p>
          <div className="flex justify-center gap-3">
              <button onClick={tweetResult} className="text-[10px] font-bold text-white bg-sky-600 px-4 py-2 rounded-full hover:bg-sky-500 transition-all uppercase">Share Result</button>
              <Link href="https://twitter.com/search?q=%23SchoolSnowDayPredictor" target="_blank" className="text-[10px] font-bold text-slate-300 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700 transition-all uppercase">See the Feed</Link>
          </div>
      </div>

      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900 p-8 rounded-3xl border-2 border-cyan-500/50 text-center relative shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <div className="mb-4 flex justify-center text-cyan-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 11h-2V6h2v5m-6 0h-2V6h2v5m6 3H6v-3h12v3m-3-11H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m3 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V9c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v10z"/></svg>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Bus Cancel Odds</span>
                  <div className="text-7xl font-black text-white">{result.probs.bus}%</div>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl border-2 border-slate-700 text-center relative shadow-lg">
                  <div className="mb-4 flex justify-center text-slate-500">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.88 10.12L12 14.56l8.12-4.44L12 5.69 3.88 10.12zM5 13.18v2.81c0 .73.4 1.41 1.05 1.76l5 2.63c.25.13.5.2.75.2.25 0 .5-.07.75-.2l5-2.63c.65-.34 1.05-1.03 1.05-1.76v-2.81l-6.75 3.69L5 13.18z"/></svg>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block text-slate-500">School Closure</span>
                  <div className="text-7xl font-black text-slate-400">{result.probs.school}%</div>
              </div>
          </div>

          <div className="text-center mb-10">
            <p className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight">{result.title}</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mx-auto max-w-sm shadow-inner">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-1 tracking-widest">Superintendent Mood</p>
                <p className="text-yellow-400 font-bold italic text-lg">"{result.mood}"</p>
            </div>
          </div>

          <AlarmSignup location={result.location} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-8 text-center">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">❄️ Total Snow</span>
                <span className="text-4xl font-black text-white block mt-2">{result.display.snow}</span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase">{result.display.units.snow} Expected</span>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">🥶 6 AM Feels</span>
                <span className="text-4xl font-black text-white block mt-2">{result.display.sixAmFeels}°</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Wind: {result.display.sixAmWind} {result.display.units.wind}</span>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">💨 Peak Gusts</span>
                <span className={`text-4xl font-black block mt-2 ${result.display.wind > 40 ? 'text-red-400' : 'text-white'}`}>{result.display.wind}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{result.display.units.wind} Max</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={copyToClipboard} className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg">{copied ? '✅ Copied!' : '📋 Copy Result'}</button>
            <button onClick={tweetResult} className="flex-1 py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg">🐦 Tweet Results</button>
          </div>
        </div>
      )}
    </div>
  );
}
