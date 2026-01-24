'use client'

import { useState } from 'react';

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // --- THE ALGORITHM ---
  const calculateProbability = (snow, tempMin, wind, rain) => {
    let score = 0;
    
    // 1. SNOW ACCUMULATION (Base Score)
    if (snow > 1.0) score += 20;
    if (snow > 3.0) score += 40;
    if (snow > 6.0) score += 60; 
    
    // 2. THE ICE FACTOR (The "School Killer")
    // If it is raining and freezing, that is ICE.
    if (rain > 0.1 && tempMin <= 32) score += 50; 
    if (rain > 0.25 && tempMin <= 30) score += 70; // Massive ice storm

    // 3. TEMPERATURE
    if (tempMin < 0) score += 10;
    if (tempMin < -10) score += 20;

    // 4. WIND
    if (wind > 25) score += 10;
    if (wind > 40) score += 20;

    return Math.min(score, 100);
  };

  const getMessage = (prob) => {
    if (prob < 20) return "PACK YOUR LUNCH 🎒 School is ON.";
    if (prob < 50) return "PJ INSIDE OUT 🤞 It's a coin flip.";
    if (prob < 80) return "LOOKING JUICY 🧃 High chance of closure.";
    return "GOD TIER SNOW DAY 👑 Sleep in till noon.";
  };

  const handlePredict = async () => {
    if(!input) return; 
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const cleanInput = input.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      // 1. GEOCODING (Zippopotam.us is faster/safer than Nominatim)
      if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanInput)) { // Canada
         const fsa = cleanInput.substring(0, 3);
         const geoRes = await fetch(`https://api.zippopotam.us/ca/${fsa}`);
         if (!geoRes.ok) throw new Error("Postal Code not found. Try a main city code (e.g. L4G).");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'Canada';
      } else if (/^\d{5}$/.test(cleanInput)) { // USA
         const geoRes = await fetch(`https://api.zippopotam.us/us/${cleanInput}`);
         if (!geoRes.ok) throw new Error("Zip Code not found.");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'USA';
      } else {
        throw new Error("Invalid Format. Use 5 digits (US) or A1A (Canada).");
      }

      // 2. WEATHER FETCH (Open-Meteo)
      // fetching Daily data for robustness
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
      );
      const wData = await weatherRes.json();

      // We check Index 1 (Tomorrow) for accuracy.
      const snow = wData.daily.snowfall_sum[1] || 0;
      const rain = wData.daily.rain_sum[1] || 0;
      const temp = wData.daily.temperature_2m_min[1];
      const wind = wData.daily.windspeed_10m_max[1];

      const chance = calculateProbability(snow, temp, wind, rain);

      setResult({
        chance,
        message: getMessage(chance),
        snow: snow.toFixed(1),
        temp: Math.round(temp),
        wind: Math.round(wind),
        location: `${city}, ${country}`
      });

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }
    setLoading(false);
  };

  const shareResult = () => {
    const text = `I have a ${result.chance}% chance of a Snow Day in ${result.location}! ❄️ Check yours at www.snowdaypredictor.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">
          Enter Zip (US) or Postal Code (CA)
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="e.g. 14201 or L4G" 
            className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 focus:outline-none font-mono text-lg uppercase placeholder-slate-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
          />
          <button 
            onClick={handlePredict}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg min-w-[80px]"
          >
            {loading ? '⏳' : 'GO'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-3 font-bold">⚠️ {error}</p>}
      </div>

      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-xs text-cyan-400 font-mono mb-2 border border-slate-600">
              📍 Forecast for {result.location}
            </div>
            <div className={`text-7xl md:text-8xl font-black mb-2 drop-shadow-xl ${
                result.chance > 60 ? 'text-green-400' : 'text-white'
            }`}>
              {result.chance}%
            </div>
            <p className="text-xl font-bold text-cyan-100">{result.message}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-slate-700 pt-6 mb-6">
             <div className="text-center p-2 bg-slate-900/50 rounded">
               <div className="text-[10px] uppercase text-slate-500 font-bold">Snow</div>
               <div className="text-lg font-mono text-white">{result.snow}"</div>
             </div>
             <div className="text-center p-2 bg-slate-900/50 rounded">
               <div className="text-[10px] uppercase text-slate-500 font-bold">Temp</div>
               <div className="text-lg font-mono text-white">{result.temp}°</div>
             </div>
             <div className="text-center p-2 bg-slate-900/50 rounded">
               <div className="text-[10px] uppercase text-slate-500 font-bold">Wind</div>
               <div className="text-lg font-mono text-white">{result.wind} <span className="text-xs">mph</span></div>
             </div>
          </div>

          <button 
            onClick={shareResult}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
          >
            {copied ? '✅ Copied!' : '📤 Share My Odds'}
          </button>
        </div>
      )}
    </div>
  );
}
