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

  // --- 2. THE ALGORITHM (Enhanced with Wind Chill & Urban Density) ---
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput, morningIce, sixAmFeels) => {
    const upperCity = city.toUpperCase();
    
    // Victory Mode logic for Jan 26 confirmed zones
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) return { bus: 100, school: 100 };
      const confirmedUS = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN'];
      if (confirmedUS.some(c => upperCity.includes(c))) return { bus: 100, school: 100 };
    }

    let bus = 0; let school = 0;
    
    // ❄️ SNOW LOGIC
    if (snow > 1.0) { bus += 30; school += 15; }
    if (snow > 4.0) { bus += 60; school += 40; }
    if (snow > 8.0) { bus += 95; school += 85; }
    
    // 🧊 MORNING ICE WINDOW
    if (morningIce) { bus += 25; school += 15; }
    
    // 🥶 WIND CHILL BONUS (Critical for Quebec/Ontario)
    // If feels like is below -20, buses are almost always grounded
    if (sixAmFeels < -20) { bus += 35; school += 15; }

    // Standard Ice Logic
    if (rain > 0.02 && tempMin <= 32) { bus += 50; school += 20; }
    if (rain > 0.15 && tempMin <= 30) { bus += 98; school += 60; }
    
    // MONTREAL URBAN DENSITY / BRIDGE FACTOR
    if (upperCity.includes('MONTREAL')) { bus += 12; school += 5; }

    // Random Superintendent Mood Swing (-5 to +5)
    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    
    // "Never Boring" Floor Logic: Avoids 0% on clear days
    let finalBus = bus + moodVariance;
    if (finalBus <= 0) finalBus = Math.floor(Math.random() * 8) + 1;

    return { 
      bus: Math.max(1, Math.min(finalBus, 100)), 
      school: Math.max(1, Math.min(school + moodVariance, 100)) 
    };
  };

  const getMessage = (prob) => {
    if (prob >= 99) return { title: "VICTORY: SCHOOL CLOSED! 🚨", mood: "The Superintendent surrendered. Go back to sleep." };
    if (prob < 20) return { title: "PACK THE LUNCH 🎒", mood: "Ruthless. Buses are rolling. No mercy." };
    if (prob < 50) return { title: "BUS BINGO 🎰", mood: "Pure chaos. Refreshing Twitter every 30 seconds." };
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

      // --- LONG RANGE BOMB SCANNER (Jeff Berardelli Weekend Context) ---
      const weeklySnow = wData.daily.snowfall_sum;
      const weeklyTemps = wData.daily.temperature_2m_min;
      // Scans days 3-7 (Friday - Sunday) for Berardelli's "Pink Zone"
      const bombDetected = weeklySnow.slice(3).some(s => s > 6) || weeklyTemps.slice(3).some(t => t < -18);

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
          snow: country === 'Canada' ? toCm(snowRaw) : snowRaw.toFixed(1),
          temp: country === 'Canada' ? toC(tempRaw) : Math.round(tempRaw),
          wind: country === 'Canada' ? toKmh(windRaw) : Math.round(windRaw),
          sixAmFeels: country === 'Canada' ? toC(sixAmFeels) : Math.round(sixAmFeels),
          sixAmWind: country === 'Canada' ? toKmh(sixAmWind) : Math.round(sixAmWind),
          units: country === 'Canada' ? { snow: 'cm', temp: '°C', wind: 'km/h' } : { snow: '"', temp: '°F', wind: 'mph' },
          iceDetected: morningIceDetected || (rainRaw > 0.05 && tempRaw <= 32)
        }
      });
    } catch (err) { 
        setError("Invalid Code or Connection Error. Try L4G (Ontario) or H1A (Montreal).");
    }
    setLoading(false);
  };

  const tweetResult = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Odds for ${result.location}: ${result.probs.bus}% Bus Cancel! ❄️ schoolsnowdaypredictor.com`)}`, '_blank'); };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        
        {/* TIME PIVOT INDICATOR */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-center mb-6 shadow-inner">
            <h2 className="text-2xl font-black italic text-cyan-400 uppercase tracking-tighter" role="status" aria-live="polite">
                Analyzing {targetDay}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Live Forecast Engine Active</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            aria-label="Postal or Zip Code"
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
          
          {/* BOMB CYCLONE ALERT BADGE */}
          {result.display.bombDetected && (
            <div className="mb-6 bg-red-600/20 border border-red-500 p-4 rounded-xl animate-pulse">
                <div className="flex items-center gap-2 justify-center">
                    <span className="text-xl">💣</span>
                    <h5 className="text-red-400 font-black uppercase text-xs tracking-widest leading-none">WEEKEND BOMB CYCLONE ALERT</h5>
                </div>
                <p className="text-white text-[10px] mt-1 font-bold uppercase tracking-tight">Models confirm extreme weekend cold/snow. Predicted Jan 30-31.</p>
            </div>
          )}

          <div className="inline-flex flex-col items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-6 py-2.5 rounded-2xl mb-8 shadow-inner">
            <span className="text-sm text-white font-black uppercase tracking-tight">📍 {result.location}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
              <div className="bg-slate-900 p-8 rounded-3xl border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2 block">Bus Cancel Odds</span>
                  <div className="text-7xl font-black text-white">{result.probs.bus}%</div>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl border-2 border-slate-700 shadow-lg">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block text-slate-500">School Closure</span>
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
          <button onClick={tweetResult} className="mt-8 w-full py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">🐦 Tweet Result</button>
        </div>
      )}
    </div>
  );
}
