'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; 
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const AMAZON_TAG = 'mliselectpro-20';

  // --- 1. AUTOMATED TIME PIVOT ---
  const [isAfternoon, setIsAfternoon] = useState(false);
  useEffect(() => {
    const hours = new Date().getHours();
    setIsAfternoon(hours >= 12); 
  }, []);

  const targetDay = isAfternoon ? "Tuesday" : "Monday";

  // --- 2. THE MOOD ENGINE ---
  const getMood = (prob) => {
    if (prob >= 100) return "Superintendent has officially surrendered. Go back to bed.";
    if (prob > 80) return "He's looking at the radar. He's sweating. He's about to call it.";
    if (prob > 50) return "He's drinking coffee and hoping the plows save him. It's 50/50.";
    if (prob > 20) return "He's laughing at your optimism. Pack your bag.";
    return "Ruthless. He hasn't even looked at the snow. Buses are rolling.";
  };

  // --- 3. THE SPLIT ALGORITHM ---
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput) => {
    const upperCity = city.toUpperCase();
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) return { bus: 100, school: 100 };
      const confirmedUS = ['DETROIT', 'BUFFALO', 'ANN ARBOR'];
      if (confirmedUS.some(c => upperCity.includes(c))) return { bus: 100, school: 100 };
    }

    let bus = 0; let school = 0;
    if (snow > 1.0) { bus += 25; school += 10; }
    if (snow > 4.0) { bus += 55; school += 35; }
    if (snow > 8.0) { bus += 95; school += 80; }
    if (rain > 0.05 && tempMin <= 32) { bus += 60; school += 25; }
    if (rain > 0.20 && tempMin <= 30) { bus += 95; school += 65; }
    if (tempMin < -15) { bus += 30; school += 10; }
    return { bus: Math.min(bus, 100), school: Math.min(school, 100) };
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true); setError(''); setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      // Geocoding
      const geoUrl = cleanInput.length === 5 ? `https://api.zippopotam.us/us/${cleanInput}` : `https://api.zippopotam.us/ca/${cleanInput.substring(0,3)}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();
      lat = geoData.places[0].latitude; lon = geoData.places[0].longitude;
      city = geoData.places[0]['place name']; country = cleanInput.length === 5 ? 'USA' : 'Canada';

      // Weather Fetch
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      const wData = await weatherRes.json();

      const idx = isAfternoon ? 1 : 0;
      const snowRaw = wData.daily.snowfall_sum[idx];
      const rainRaw = wData.daily.rain_sum[idx];
      const tempRaw = wData.daily.temperature_2m_min[idx];
      const windRaw = wData.daily.windspeed_10m_max[idx];

      // 6 AM SPECIFIC DATA
      const hourIdx = isAfternoon ? 30 : 6; 
      const sixAmTemp = wData.hourly.apparent_temperature[hourIdx];
      const sixAmWind = wData.hourly.windspeed_10m[hourIdx];

      const probs = calculateProbability(snowRaw, tempRaw, windRaw, rainRaw, country, city, cleanInput);
      const isCanada = country === 'Canada';
      const toC = (f) => Math.round((f - 32) * 5/9);
      const toCm = (i) => (i * 2.54).toFixed(1);
      const toKmh = (m) => Math.round(m * 1.60934);

      setResult({
        probs, location: `${city}, ${country}`, mood: getMood(probs.bus),
        display: {
          snow: isCanada ? toCm(snowRaw) : snowRaw.toFixed(1),
          temp: isCanada ? toC(tempRaw) : Math.round(tempRaw),
          wind: isCanada ? toKmh(windRaw) : Math.round(windRaw),
          sixAmFeels: isCanada ? toC(sixAmTemp) : Math.round(sixAmTemp),
          sixAmWind: isCanada ? toKmh(sixAmWind) : Math.round(sixAmWind),
          units: isCanada ? { snow: 'cm', temp: '°C', wind: 'km/h' } : { snow: '"', temp: '°F', wind: 'mph' },
          iceDetected: (rainRaw > 0.05 && tempRaw <= 32)
        }
      });
    } catch (err) { setError("Try a main code (e.g. L4G or 48201)"); }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 w-full">
      <div className="p-6">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Predicting {targetDay}</h2>
            <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-1">
                {isAfternoon ? "Next Day Analysis Active" : "Live Storm Status Active"}
            </p>
        </div>

        <div className="flex gap-2 mb-8">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="POSTAL / ZIP" className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-xl focus:border-cyan-400 outline-none uppercase font-mono" />
          <button onClick={() => runPrediction(input)} className="bg-cyan-500 text-slate-900 font-black px-6 rounded-xl hover:scale-105 transition-all">GO</button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-6 rounded-2xl border-2 border-cyan-500/50 text-center">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">Bus Cancel Odds 🚌</span>
                    <div className="text-5xl font-black text-white">{result.probs.bus}%</div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">School Closure 🏫</span>
                    <div className="text-5xl font-black text-slate-400">{result.probs.school}%</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">6AM Feels</span>
                    <div className="text-lg font-bold">{result.display.sixAmFeels}{result.display.units.temp}</div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">Total Snow</span>
                    <div className="text-lg font-bold">{result.display.snow}{result.display.units.snow}</div>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center">
                    <span className="text-[9px] text-slate-500 font-bold uppercase">Peak Wind</span>
                    <div className="text-lg font-bold">{result.display.wind}{result.display.units.wind}</div>
                </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 text-center">
                <p className="text-xs text-slate-500 font-bold uppercase mb-1 tracking-widest">Superintendent Mood</p>
                <p className="text-yellow-400 font-bold italic text-sm">"{result.mood}"</p>
            </div>

            {result.display.iceDetected && (
                <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl text-center">
                    <p className="text-red-400 text-xs font-bold uppercase animate-pulse">⚠️ ICE WARNING: Bus risk increased</p>
                </div>
            )}

            <AlarmSignup location={result.location} />
          </div>
        )}
      </div>
    </div>
  );
}
