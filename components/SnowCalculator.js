'use client';

import { useState, useEffect, useMemo } from 'react';
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
  // This logic handles the "Noon flip" so predictions shift from Monday to Tuesday live.
  useEffect(() => {
    const updateTime = () => {
      const hours = new Date().getHours();
      const newIsAfternoon = hours >= 12;
      
      // Auto-rerun prediction if the time flips while a result is currently shown
      if (newIsAfternoon !== isAfternoon && input && result) {
        runPrediction(input);
      }
      setIsAfternoon(newIsAfternoon); 
    };
    updateTime();
    const timer = setInterval(updateTime, 60000); // Check every minute to handle the target day flip
    return () => clearInterval(timer);
  }, [isAfternoon, input, result]);

  const targetDay = isAfternoon ? "Tuesday" : "Monday";

  // --- 2. THE ALGORITHM ---
  // Integrates Superintendent Mood Logic + Grok's Wind Chill/Bomb Cyclone Bonuses
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput, morningIce, sixAmFeels) => {
    const upperCity = city.toUpperCase();
    
    // Victory Mode logic for Jan 26 (GTA/Montreal confirmed closures)
    // We force 100% for regions that have already officially surrendered
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) return { bus: 100, school: 100 };
      const confirmedUS = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN'];
      if (confirmedUS.some(c => upperCity.includes(c))) return { bus: 100, school: 100 };
    }

    let bus = 0; 
    let school = 0;
    
    // ❄️ SNOW LOGIC (Weighting accumulation in inches)
    if (snow > 1.0) { bus += 30; school += 15; }
    if (snow > 4.0) { bus += 60; school += 40; }
    if (snow > 8.0) { bus += 95; school += 85; }
    
    // 🧊 MORNING ICE WINDOW (Detection for the 6:00 AM commute)
    if (morningIce) { bus += 25; school += 15; }
    
    // 🥶 WIND CHILL BONUS (Jeff Berardelli "Pink Zone" Trigger)
    // apparent_temperature is the deciding factor for child safety at bus stops
    if (sixAmFeels < -20) { 
        bus += 35; 
        school += 15; 
    } 
    if (country === 'Canada' && sixAmFeels < -15) { 
        bus += 20; 
        school += 10; 
    }

    // Standard Ice Logic (Rain volume on frozen ground)
    if (rain > 0.02 && tempMin <= 32) { bus += 50; school += 20; }
    if (rain > 0.15 && tempMin <= 30) { bus += 98; school += 60; }
    
    // MONTREAL URBAN BRIDGE FACTOR (Urban density makes plowing twice as slow)
    if (upperCity.includes('MONTREAL')) { bus += 12; school += 5; }

    // Superintendent Random Mood Swing (-5 to +5 variance for replayability)
    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    
    let finalBus = bus + moodVariance;
    let finalSchool = school + moodVariance;

    // "Never Boring" Floor Logic: Ensure snowy/icy days don't show a flat 0%
    if (finalBus <= 0 && (snow > 0.1 || sixAmFeels < 10)) {
        finalBus = Math.floor(Math.random() * 8) + 1;
    }

    // DEV DEBUGGING (Logs to console for developers)
    console.log(`[Algorithm-Check] Day: ${targetDay} | Snow: ${snow} | Chill: ${sixAmFeels} | Ice: ${morningIce}`);

    return { 
      bus: Math.max(1, Math.min(finalBus, 100)), 
      school: Math.max(1, Math.min(finalSchool, 100)) 
    };
  };

  const getMessage = (prob) => {
    if (prob >= 99) return { title: "VICTORY: SCHOOL CLOSED! 🚨", mood: "WE CALLED IT. The Superintendent surrendered. Put on your PJs and go back to sleep." };
    if (prob < 20) return { title: "PACK THE LUNCH 🎒", mood: "Ruthless. Buses are rolling. The plow cleared your street at 4 AM." };
    if (prob < 50) return { title: "BUS BINGO 🎰", mood: "Pure stress. One board cancels, the other stays open. Coin flip." };
    if (prob < 80) return { title: "PJ DAY LIKELY 🤞", mood: "The Superintendent is staring at the freezing rain on their window. Looking good." };
    return { title: "GOD TIER SNOW DAY 👑", mood: "Buses are grounded. Teachers are already making pancakes. Stay home." };
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true); setError(''); setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      const isUS = cleanInput.length === 5;
      
      // GEO-FETCHING (Supports Canadian Postals and US Zip Codes)
      const geoUrl = isUS ? `https://api.zippopotam.us/us/${cleanInput}` : `https://api.zippopotam.us/ca/${cleanInput.substring(0,3)}`;
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("INVALID_LOCATION");
      const geoData = await geoRes.json();

      const { latitude: lat, longitude: lon } = geoData.places[0];
      const city = geoData.places[0]['place name'];
      const state = geoData.places[0]['state abbreviation'];
      const country = isUS ? 'USA' : 'Canada';

      // WEATHER-FETCHING (Open-Meteo Global Data)
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      if (!weatherRes.ok) throw new Error("WEATHER_FAIL");
      const wData = await weatherRes.json();

      // BOMB CYCLONE SCANNER (Looking at weekend signatures)
      const weeklySnow = wData.daily.snowfall_sum;
      const weeklyTemps = wData.daily.temperature_2m_min;
      const bombDetected = weeklySnow.slice(3).some(s => s > 5) || weeklyTemps.slice(3).some(t => t < -15);

      const dayIdx = isAfternoon ? 1 : 0;
      const snowRaw = wData.daily.snowfall_sum[dayIdx];
      const rainRaw = wData.daily.rain_sum[dayIdx];
      const tempRaw = wData.daily.temperature_2m_min[dayIdx];
      const windRaw = wData.daily.windspeed_10m_max[dayIdx];

      // 6 AM Commute Analysis Window
      const sixAmIndex = isAfternoon ? 30 : 6; 
      const morningWindow = isAfternoon ? wData.hourly.precipitation.slice(28, 33) : wData.hourly.precipitation.slice(4, 9);
      const morningIceDetected = morningWindow.some((precip, i) => precip > 0.01 && wData.hourly.temperature_2m[isAfternoon ? 28+i : 4+i] <= 32);

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
        postalDistrict: cleanInput,
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
        setError("Invalid Code. Use L4G, H1A, or 14201.");
    }
    setLoading(false);
  };

  const shareText = result ? `VICTORY! My Snow Day odds for ${result.location} are ${result.probs.bus}%! ❄️ schoolsnowdaypredictor.com` : '';
  const tweetResult = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank'); };

  return (
    <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 w-full hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500">
      
      {/* INPUT PANEL */}
      <div className="p-8 border-b border-slate-700 bg-slate-800/50 backdrop-blur-xl">
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-2xl text-center mb-8 shadow-inner">
            <h2 className="text-3xl font-black italic text-cyan-400 uppercase tracking-tighter" role="status" aria-live="polite">Analyzing {targetDay}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-[0.2em]">Storm-Ready 2026 Engine Active</p>
        </div>

        <div className="flex gap-3 mb-4">
          <input 
            type="text" 
            aria-label="Postal or Zip Code"
            aria-describedby="error-msg"
            placeholder="POSTAL / ZIP" 
            className="flex-1 bg-slate-950 border-2 border-slate-700 text-white p-5 rounded-2xl focus:border-cyan-400 outline-none font-mono text-xl uppercase transition-all" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && runPrediction(input)} 
          />
          <button 
            onClick={() => runPrediction(input)} 
            disabled={loading} 
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black py-4 px-8 rounded-2xl shadow-lg active:scale-95 transition-all text-xl"
          >
            {loading ? '⏳' : 'GO'}
          </button>
        </div>
        {error && <p id="error-msg" role="alert" className="text-red-400 text-sm font-bold mt-2 text-center animate-bounce">⚠️ {error}</p>}
      </div>

      {/* RESULTS PANEL */}
      {result && (
        <div className="p-8 bg-slate-900/50 animate-in fade-in zoom-in duration-500">
          
          {/* BOMB CYCLONE ALERT BADGE (Jeff Berardelli Sync) */}
          {result.display.bombDetected && (
            <div role="alert" className="mb-8 bg-red-600/20 border-2 border-red-500 p-5 rounded-2xl animate-pulse">
                <div className="flex items-center gap-3 justify-center text-red-500 mb-1">
                    <span className="text-3xl">💣</span>
                    <h5 className="font-black uppercase text-sm tracking-widest leading-none">BOMB CYCLONE ALERT</h5>
                </div>
                <p className="text-white text-xs font-bold uppercase tracking-tight opacity-90 text-center">Extreme weekend storm detected in our long-range scanner.</p>
            </div>
          )}

          <div className="flex justify-center mb-8">
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-3 rounded-full flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="text-white font-black uppercase tracking-widest text-xs">{result.location}</span>
            </div>
          </div>

          {/* 2X2 PROBABILITY GRID - HIGH VISIBILITY ICONS RESTORED */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-center">
              
              {/* BUS CARD */}
              <div className="bg-slate-950/80 p-8 rounded-3xl border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] group relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-5xl opacity-100 transition-transform group-hover:scale-110">🚌</div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] block mb-2">Bus Cancellation</span>
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-xl">{result.probs.bus}%</div>
              </div>

              {/* SCHOOL CARD */}
              <div className="bg-slate-950/80 p-8 rounded-3xl border-2 border-slate-800 shadow-xl group relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-5xl opacity-100 transition-transform group-hover:scale-110">🏫</div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2">School Closure</span>
                  <div className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-400 drop-shadow-lg">{result.probs.school}%</div>
              </div>
          </div>

          {/* EXPLAINED ASTERISK NOTE */}
          {result.probs.bus === 100 && (
            <p className="text-[10px] text-slate-500 mt-2 mb-8 italic text-center leading-relaxed max-w-xs mx-auto">
                *Buses cancelled — school buildings may still be open for walking students, staff, and indoor activities.
            </p>
          )}

          {/* MOOD MESSAGE PANEL */}
          <div className="text-center mb-12 bg-white/5 p-8 rounded-3xl border border-white/10">
            <p className="text-3xl font-black text-white mb-3 uppercase italic tracking-tighter leading-none">{result.title}</p>
            <p className="text-yellow-400 font-bold italic text-xl">"{result.mood}"</p>
          </div>

          <AlarmSignup location={result.location} />

          {/* DYNAMIC STATS ICON GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-slate-800 pt-12">
              
              {/* SNOW */}
              <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 flex flex-col items-center group hover:bg-slate-800 transition-all">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">❄️</div>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Total Snow</span>
                  <span className="text-4xl font-black text-white">{result.display.snow}</span>
                  <span className="text-[10px] text-cyan-400 font-bold mt-1 uppercase">{result.display.units.snow} Expected</span>
              </div>

              {/* CHILL */}
              <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 flex flex-col items-center group hover:bg-slate-800 transition-all text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🥶</div>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">6 AM Feels</span>
                  <span className={`text-4xl font-black ${result.display.sixAmFeels < -15 ? 'text-red-400' : 'text-white'}`}>{result.display.sixAmFeels}°</span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase leading-tight">Mornin' Wind Chill</span>
              </div>

              {/* ICE */}
              <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 flex flex-col items-center group hover:bg-slate-800 transition-all">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧊</div>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Road Safety</span>
                  <span className={`text-3xl font-black ${result.display.iceDetected ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                    {result.display.iceDetected ? 'CRITICAL' : 'SAFE'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase">ICE DETECTION</span>
              </div>

          </div>

          {/* TWEET BUTTON */}
          <div className="flex gap-4 mt-12">
            <button 
              onClick={tweetResult} 
              className="flex-1 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
               <span className="text-2xl">🐦</span> TWEET YOUR ODDS
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
