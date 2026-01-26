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
  const [isAfternoon, setIsAfternoon] = useState(false);

  // --- 1. LIVE TIME REFRESH + AUTO-RERUN ---
  useEffect(() => {
    const updateTime = () => {
      const hours = new Date().getHours();
      const newIsAfternoon = hours >= 12;
      if (newIsAfternoon !== isAfternoon && input && result) {
        runPrediction(input);
      }
      setIsAfternoon(newIsAfternoon); 
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [isAfternoon, input, result]);

  const targetDay = isAfternoon ? "Tuesday" : "Monday";

  // --- 2. THE ALGORITHM (Jeff Berardelli "Pink Zone" Optimized) ---
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput, morningIce, sixAmFeels) => {
    const upperCity = city.toUpperCase();
    
    // Victory Mode logic for Monday (Confirmed Closures)
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) return { bus: 100, school: 100 };
      const confirmedUS = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN'];
      if (confirmedUS.some(c => upperCity.includes(c))) return { bus: 100, school: 100 };
    }

    let bus = 0; let school = 0;
    
    // SNOW ACCUMULATION (inches)
    if (snow > 1.0) { bus += 30; school += 15; }
    if (snow > 4.0) { bus += 60; school += 40; }
    if (snow > 8.0) { bus += 95; school += 85; }
    
    // ICE RISK
    if (morningIce) { bus += 25; school += 15; }
    
    // WIND CHILL / APPARENT TEMP (The "Florida/Quebec" Factor)
    // Berardelli's "Pink Zone" starts affecting buses at -20°C (Ontario/QC) or <40°F (Florida)
    if (sixAmFeels < -15) { bus += 35; school += 15; }
    if (country === 'USA' && sixAmFeels < 38) { bus += 40; school += 20; } // Miami/Florida panic threshold

    // Standard Ice Logic
    if (rain > 0.02 && tempMin <= 32) { bus += 50; school += 20; }
    if (rain > 0.15 && tempMin <= 30) { bus += 98; school += 60; }
    
    if (upperCity.includes('MONTREAL')) { bus += 12; school += 5; }

    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    let finalBus = bus + moodVariance;
    if (finalBus <= 0 && snow > 0.1) finalBus = Math.floor(Math.random() * 8) + 1;

    return { 
      bus: Math.max(1, Math.min(finalBus, 100)), 
      school: Math.max(1, Math.min(school + moodVariance, 100)) 
    };
  };

  const getMessage = (prob) => {
    if (prob >= 99) return { title: "VICTORY: SCHOOL CLOSED! 🚨", mood: "The Superintendent surrendered. Go back to sleep." };
    if (prob < 20) return { title: "PACK THE LUNCH 🎒", mood: "Buses are rolling. No mercy." };
    if (prob < 50) return { title: "BUS BINGO 🎰", mood: "Pure chaos. Refreshing Twitter." };
    if (prob < 80) return { title: "PJ DAY LIKELY 🤞", mood: "The Principal is staring at the salt truck." };
    return { title: "GOD TIER SNOW DAY 👑", mood: "Buses are grounded. Don't set the alarm." };
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true); setError(''); setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      const isUS = cleanInput.length === 5;
      const geoUrl = isUS ? `https://api.zippopotam.us/us/${cleanInput}` : `https://api.zippopotam.us/ca/${cleanInput.substring(0,3)}`;
      
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("INVALID_LOCATION");
      const geoData = await geoRes.json();

      const { latitude: lat, longitude: lon } = geoData.places[0];
      const city = geoData.places[0]['place name'];
      const state = geoData.places[0]['state abbreviation'];
      const country = isUS ? 'USA' : 'Canada';

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      if (!weatherRes.ok) throw new Error("WEATHER_FAIL");
      const wData = await weatherRes.json();

      // --- LONG RANGE "PINK ZONE" BOMB SCANNER ---
      const weeklySnow = wData.daily.snowfall_sum;
      const weeklyTemps = wData.daily.temperature_2m_min;
      const bombDetected = weeklySnow.slice(3).some(s => s > 5) || weeklyTemps.slice(3).some(t => t < -15);

      const dayIdx = isAfternoon ? 1 : 0;
      const snowRaw = wData.daily.snowfall_sum[dayIdx];
      const rainRaw = wData.daily.rain_sum[dayIdx];
      const tempRaw = wData.daily.temperature_2m_min[dayIdx];
      const windRaw = wData.daily.windspeed_10m_max[dayIdx];

      const sixAmIndex = isAfternoon ? 30 : 6; 
      const morningWindow = isAfternoon ? wData.hourly.precipitation.slice(28, 33) : wData.hourly.precipitation.slice(4, 9);
      const morningIceDetected = morningWindow.some((precip, i) => 
        precip > 0.01 && wData.hourly.temperature_2m[isAfternoon ? 28+i : 4+i] <= 32
      );

      const sixAmFeels = wData.hourly.apparent_temperature[sixAmIndex];
      const sixAmWind = wData.hourly.windspeed_10m[sixAmIndex];

      const probs = calculateProbability(snowRaw, tempRaw, windRaw, rainRaw, country, city, cleanInput, morningIceDetected, sixAmFeels);
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
        location: `${city}, ${state}${isUS ? ', USA' : ''}`, 
        display: {
          bombDetected,
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
        setError("Invalid Code. Try L4G (Ontario) or H1A (Montreal).");
    }
    setLoading(false);
  };

  const tweetResult = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Odds for ${result.location}: ${result.probs.bus}%! ❄️ schoolsnowdaypredictor.com`)}`, '_blank'); };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-center mb-6 shadow-inner">
            <h2 className="text-2xl font-black italic text-cyan-400 uppercase tracking-tighter" role="status" aria-live="polite">Analyzing {targetDay}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Global Forecast Engine Active</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="e.g. L4G, H1A, 14201..." 
            className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 outline-none font-mono uppercase shadow-inner" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && runPrediction(input)} 
          />
          <button onClick={() => runPrediction(input)} disabled={loading} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg min-w-[80px] shadow-lg active:scale-95 transition-transform">{loading ? '⏳' : 'GO'}</button>
        </div>
        {error && <p className="text-red-400 text-xs font-bold mt-2" role="alert">⚠️ {error}</p>}
      </div>

      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* BOMB CYCLONE ALERT BADGE (Jeff Berardelli Weekend Sync) */}
          {result.display.bombDetected && (
            <div className="mb-6 bg-red-600/20 border border-red-500 p-4 rounded-xl animate-pulse">
                <div className="flex items-center gap-2 justify-center">
                    <span className="text-xl">💣</span>
                    <h5 className="text-red-400 font-black uppercase text-xs tracking-widest">WEEKEND BOMB CYCLONE ALERT</h5>
                </div>
                <p className="text-white text-[10px] mt-1 font-bold uppercase">Models confirm extreme "Pink Zone" weekend freeze. Predicted Jan 30-31.</p>
            </div>
          )}

          <div className="inline-flex flex-col items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-6 py-2.5 rounded-2xl mb-8 shadow-inner">
            <span className="text-sm text-white font-black uppercase tracking-tight">📍 {result.location}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
              <div className="bg-slate-900 p-8 rounded-3xl border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <div className="text-3xl mb-1">🚌</div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2 block">Bus Cancel Odds</span>
                  <div className="text-7xl font-black text-white">{result.probs.bus}%</div>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl border-2 border-slate-700 shadow-lg">
                  <div className="text-3xl mb-1">🏫</div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">School Closure</span>
                  <div className="text-7xl font-black text-slate-400">{result.probs.school}%</div>
              </div>
          </div>

          <div className="text-center mb-10">
            <p className="text-2xl font-black text-white mb-3 uppercase italic tracking-tight">{result.title}</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mx-auto max-w-sm shadow-inner text-yellow-400 font-bold italic">"{result.mood}"</div>
          </div>

          <AlarmSignup location={result.location} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-black text-cyan-400 tracking-widest mb-1">Total Snow</span>
                  <span className="text-4xl font-black text-white">{result.display.snow} {result.display.units.snow}</span>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-black text-cyan-400 tracking-widest mb-1">6 AM Feels</span>
                  <span className={`text-4xl font-black ${result.display.sixAmFeels < -15 ? 'text-red-400' : 'text-white'}`}>{result.display.sixAmFeels}°</span>
              </div>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <span className="text-[10px] uppercase font-black text-cyan-400 tracking-widest mb-1">Ice Risk</span>
                  <span className={`text-3xl font-black ${result.display.iceDetected ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                    {result.display.iceDetected ? 'CRITICAL' : 'LOW'}
                  </span>
              </div>
          </div>
          <button onClick={tweetResult} className="mt-8 w-full py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">🐦 Tweet Results</button>
        </div>
      )}
    </div>
  );
}
