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

  // --- 1. THE DYNAMIC TIME PIVOT ---
  const [isAfternoon, setIsAfternoon] = useState(false);
  useEffect(() => {
    const hours = new Date().getHours();
    setIsAfternoon(hours >= 12); // After 12 PM, we look at Tomorrow (Tuesday)
  }, []);

  const targetDay = isAfternoon ? "Tuesday" : "Monday";

  // --- 2. THE ALGORITHM (BUS VS SCHOOL SPLIT) ---
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput) => {
    const upperCity = city.toUpperCase();
    
    // Victory Mode: Keep Monday morning 100% for confirmed zones
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) return { bus: 100, school: 100 };
      const confirmedUS = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN'];
      if (confirmedUS.some(c => upperCity.includes(c))) return { bus: 100, school: 100 };
    }

    let bus = 0; let school = 0;
    // Snow Logic
    if (snow > 1.0) { bus += 25; school += 10; }
    if (snow > 4.0) { bus += 55; school += 35; }
    if (snow > 8.0) { bus += 95; school += 80; }
    // Ice Logic (The Bus Killer)
    if (rain > 0.05 && tempMin <= 32) { bus += 60; school += 25; }
    if (rain > 0.20 && tempMin <= 30) { bus += 95; school += 65; }
    // Cold Logic
    if (tempMin < -10) { bus += 30; school += 10; }

    return { bus: Math.min(bus, 100), school: Math.min(school, 100) };
  };

  const getMessage = (prob) => {
    if (prob === 100) return { title: "OFFICIAL: CLOSED 🚨", mood: "The Superintendent has spoken. Go back to bed." };
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
      const geoData = await geoRes.json();
      lat = geoData.places[0].latitude; lon = geoData.places[0].longitude;
      city = geoData.places[0]['place name']; country = cleanInput.length === 5 ? 'USA' : 'Canada';

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      const wData = await weatherRes.json();

      const dayIdx = isAfternoon ? 1 : 0;
      const snowRaw = wData.daily.snowfall_sum[dayIdx];
      const rainRaw = wData.daily.rain_sum[dayIdx];
      const tempRaw = wData.daily.temperature_2m_min[dayIdx];
      const windRaw = wData.daily.windspeed_10m_max[dayIdx];

      // 6 AM DATA FETCHING
      const sixAmIndex = isAfternoon ? 30 : 6; 
      const sixAmFeels = wData.hourly.apparent_temperature[sixAmIndex];
      const sixAmWind = wData.hourly.windspeed_10m[sixAmIndex];

      const probs = calculateProbability(snowRaw, tempRaw, windRaw, rainRaw, country, city, cleanInput);
      const msgData = getMessage(probs.bus);
      
      const isCanada = country === 'Canada';
      const toC = (f) => Math.round((f - 32) * 5/9);
      const toCm = (i) => (i * 2.54).toFixed(1);
      const toKmh = (m) => Math.round(m * 1.60934);

      setResult({
        chance: probs.bus,
        probs,
        title: msgData.title,
        mood: msgData.mood,
        location: `${city}, ${country}`,
        display: {
          snow: isCanada ? toCm(snowRaw) : snowRaw.toFixed(1),
          temp: isCanada ? toC(tempRaw) : Math.round(tempRaw),
          wind: isCanada ? toKmh(windRaw) : Math.round(windRaw),
          sixAmFeels: isCanada ? toC(sixAmFeels) : Math.round(sixAmFeels),
          sixAmWind: isCanada ? toKmh(sixAmWind) : Math.round(sixAmWind),
          units: isCanada ? { snow: 'cm', temp: '°C', wind: 'km/h' } : { snow: '"', temp: '°F', wind: 'mph' },
          iceDetected: (rainRaw > 0.05 && tempRaw <= 32)
        }
      });
    } catch (err) { setError("Check your code (e.g. L4G or 48201)"); }
    setLoading(false);
  };

  const shareText = result ? `My Odds: ${result.probs.bus}% Bus Cancel / ${result.probs.school}% School Closure for ${result.location}! ❄️ ${result.mood} schoolsnowdaypredictor.com` : '';
  const copyToClipboard = () => { navigator.clipboard.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const tweetResult = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank'); };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        
        {/* TOP ALERTS */}
        <div className="space-y-3 mb-6">
          <Link href="/blog/what-is-open-snow-day" className="block bg-emerald-900/40 border border-emerald-500/30 p-3 rounded-lg hover:bg-emerald-800/50 transition-all text-left group">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">GUIDE</span>
              <span className="text-emerald-400 text-xs font-bold uppercase">Survival</span>
            </div>
            <p className="text-white text-sm font-bold group-hover:text-emerald-300 transition-colors">🛍️ Malls, Movies & Ski Hills: What is OPEN today? →</p>
          </Link>
        </div>

        {/* TIME PIVOT INDICATOR */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-xl text-center mb-6">
            <h2 className="text-xl font-black italic text-cyan-400 uppercase tracking-tighter">Analyzing {targetDay}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Live Updates Enabled</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="POSTAL / ZIP" className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 outline-none font-mono text-lg uppercase" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && runPrediction(input)} />
          <button onClick={() => runPrediction(input)} disabled={loading} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg min-w-[80px]">{loading ? '⏳' : 'GO'}</button>
        </div>
      </div>

      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 animate-in fade-in slide-in-from-bottom-4">
          
          {/* THE BIG SPLIT CARDS (REPLACING THE SINGLE NUMBER) */}
          <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900 p-6 rounded-2xl border-2 border-cyan-500/50 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">🚌</div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Bus Cancel Odds</span>
                  <div className="text-6xl font-black text-white">{result.probs.bus}%</div>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">🏫</div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">School Closure</span>
                  <div className="text-6xl font-black text-slate-400">{result.probs.school}%</div>
              </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-xl font-bold text-cyan-100 mb-2">{result.title}</p>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 mx-auto max-w-sm">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1 italic tracking-widest">Superintendent Mood</p>
                <p className="text-yellow-400 font-bold italic">"{result.mood}"</p>
            </div>
          </div>

          <AlarmSignup location={result.location} />

          {/* THE ORIGINAL ICONS GRID (Snow, Temp, Wind) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider mb-1">❄️ Total Snow</span>
                <span className="text-3xl font-black text-white">{result.display.snow}</span>
                <span className="text-xs text-cyan-400 mt-1">{result.display.units.snow} Expected</span>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider mb-1">🥶 6 AM Feels</span>
                <span className="text-3xl font-black text-white">{result.display.sixAmFeels}°</span>
                <span className="text-xs text-slate-400 mt-1">Wind: {result.display.sixAmWind} {result.display.units.wind}</span>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider mb-1">💨 Peak Gusts</span>
                <span className={`text-3xl font-black ${result.display.wind > 40 ? 'text-red-400' : 'text-white'}`}>{result.display.wind}</span>
                <span className="text-xs text-slate-400 mt-1">{result.display.units.wind} Max</span>
            </div>
          </div>

          {/* THE ORIGINAL CALCULATION TABLE */}
          <div className="bg-slate-800/50 p-4 rounded-lg mb-8 border border-slate-700/50">
            <h4 className="text-white text-xs font-bold mb-3 uppercase tracking-wider border-b border-slate-700 pb-2">Analysis Breakdown:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">❄️ Snow Accumulation</span>
                <span className="text-white font-mono">{result.display.snow} {result.display.units.snow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">🧊 Ice Risk</span>
                <span className={result.display.iceDetected ? "text-red-400 font-bold" : "text-green-400"}>{result.display.iceDetected ? "HIGH" : "LOW"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">🌡️ Min Temp</span>
                <span className="text-white font-mono">{result.display.temp}{result.display.units.temp}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all">{copied ? '✅ Copied!' : '📋 Copy Result'}</button>
            <button onClick={tweetResult} className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-bold transition-all">🐦 Tweet</button>
          </div>
        </div>
      )}
    </div>
  );
}
