'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; 
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- 1. AUTOMATED TIME PIVOT ---
  const [isAfternoon, setIsAfternoon] = useState(false);
  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours();
      setIsAfternoon(hours >= 11); // After 11am, focus shifts to tomorrow
    };
    checkTime();
  }, []);

  const targetDay = isAfternoon ? "Tuesday" : "Monday";

  // --- 2. THE SPLIT ALGORITHM ---
  const calculateProbability = (snow, tempMin, wind, rain, country, city, cleanInput) => {
    const upperCity = city.toUpperCase();
    
    // Victory Mode Override (Keep for Monday Morning)
    if (!isAfternoon) {
      if (country === 'Canada' && (cleanInput.startsWith('M') || cleanInput.startsWith('L'))) {
        return { bus: 100, school: 100 }; 
      }
    }

    let busScore = 0;
    let schoolScore = 0;

    // Snow logic (Schools need ~15cm, Buses cancel at ~10cm)
    if (snow > 1.0) { busScore += 25; schoolScore += 10; }
    if (snow > 4.0) { busScore += 50; schoolScore += 30; }
    if (snow > 8.0) { busScore += 90; schoolScore += 70; }

    // Ice logic (The "Bus Killer")
    if (rain > 0.05 && tempMin <= 32) { busScore += 55; schoolScore += 20; }
    if (rain > 0.20 && tempMin <= 30) { busScore += 95; schoolScore += 60; }

    return { 
      bus: Math.min(busScore, 100), 
      school: Math.min(schoolScore, 100) 
    };
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true);
    setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      // ... (Your previous Geocoding Fetch logic here) ...
      const geoRes = await fetch(`https://api.zippopotam.us/${cleanInput.length === 5 ? 'us' : 'ca'}/${cleanInput.substring(0,3)}`);
      const geoData = await geoRes.json();
      lat = geoData.places[0].latitude;
      lon = geoData.places[0].longitude;
      city = geoData.places[0]['place name'];
      country = cleanInput.length === 5 ? 'USA' : 'Canada';

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
      );
      const wData = await weatherRes.json();

      // IMPORTANT: Use day index [1] if it's afternoon
      const idx = isAfternoon ? 1 : 0;
      const snow = wData.daily.snowfall_sum[idx];
      const rain = wData.daily.rain_sum[idx];
      const temp = wData.daily.temperature_2m_min[idx];
      const wind = wData.daily.windspeed_10m_max[idx];

      const probs = calculateProbability(snow, temp, wind, rain, country, city, cleanInput);

      setResult({
        probs,
        location: `${city}, ${country}`,
        stats: { snow, temp, wind, rain } // Keep for your detailed grid
      });

    } catch (err) { setError("Check your code format (L4G or 90210)"); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl">
        {/* Header Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Predicting for {targetDay}</h2>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAfternoon ? 'bg-orange-400' : 'bg-green-400'} animate-pulse`}></div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {isAfternoon ? 'Outlook Mode' : 'Live Status'}
            </span>
          </div>
        </div>

        {/* Input area */}
        <div className="flex gap-2 mb-8">
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Area..."
              className="flex-1 bg-slate-900 p-4 rounded-xl border border-slate-700 focus:border-cyan-500 outline-none"
            />
            <button onClick={() => runPrediction(input)} className="bg-cyan-500 text-slate-950 font-black px-6 rounded-xl hover:scale-105 transition-transform">GO</button>
        </div>

        {result && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Split Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center group">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Bus Cancellation 🚌</p>
                <span className="text-5xl font-black text-cyan-400">{result.probs.bus}%</span>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">School Closure 🏫</p>
                <span className="text-5xl font-black text-white">{result.probs.school}%</span>
              </div>
            </div>

            {/* Your 387 lines of detailed stats can go here! */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
               <p className="text-xs text-center text-slate-400 italic">
                {result.probs.bus > 80 ? "Superintendent is already in his pajamas." : "Pack your bag, it's looking like a regular day."}
               </p>
            </div>

            <AlarmSignup location={result.location} />
          </div>
        )}
      </div>
    </div>
  );
}
