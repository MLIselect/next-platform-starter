'use client'

import { useState } from 'react';

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- 1. CHEEKY LOGIC ---
  const calculateCheekiness = (snowDepth, temp, wind) => {
    let score = 0;
    // Snow Logic (inches)
    if (snowDepth > 0.5) score += 20;
    if (snowDepth > 3) score += 40;
    if (snowDepth > 6) score += 60; // Big bump for heavy snow
    
    // Ice/Cold Logic
    if (temp < 32) score += 5;
    if (temp < 20) score += 15;

    // Wind Logic (mph)
    if (wind > 15) score += 10;
    if (wind > 35) score += 20;

    return Math.min(score, 100);
  };

  const getCheekyMessage = (prob) => {
    if (prob < 10) return "PACK YOUR LUNCH, NERD. 🤓";
    if (prob < 30) return "WEAR PJs INSIDE OUT. (It won't help).";
    if (prob < 60) return "SUPERINTENDENT IS FLIPPING A COIN. 🪙";
    if (prob < 85) return "LOOKING JUICY. CHARGE THE IPAD. 🔋";
    return "VICTORY! GOD TIER SNOW DAY. ❄️👑";
  };

  // --- 2. THE GEOLOCATION & WEATHER ENGINE ---
  const handlePredict = async () => {
    if(!input) return; 
    setLoading(true);
    setError('');
    setResult(null);

    try {
      let lat, lon, city, country;

      // Clean the input (remove spaces, uppercase)
      const cleanInput = input.trim().toUpperCase().replace(/\s/g, '');

      // DETECT COUNTRY BASED ON FORMAT
      // Canada: 6 chars (A1A1A1)
      // US: 5 digits (12345)
      
      if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanInput)) {
         // --- CANADA LOOKUP ---
         // Use only the first 3 chars (FSA) for Zippopotamus CA
         const fsa = cleanInput.substring(0, 3);
         const geoRes = await fetch(`https://api.zippopotam.us/ca/${fsa}`);
         if (!geoRes.ok) throw new Error("Invalid Canadian Postal Code");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'CA';

      } else if (/^\d{5}$/.test(cleanInput)) {
         // --- US LOOKUP ---
         const geoRes = await fetch(`https://api.zippopotam.us/us/${cleanInput}`);
         if (!geoRes.ok) throw new Error("Invalid US Zip Code");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'US';

      } else {
        throw new Error("Enter a valid 5-digit Zip (US) or Postal Code (Canada)");
      }

      // 3. FETCH WEATHER (Open-Meteo)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,windspeed_10m_max&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
      );
      const wData = await weatherRes.json();

      // Get "Tomorrow's" forecast (Index 1 usually, assuming user wants next school day)
      // We grab Index 0 (Today) and Index 1 (Tomorrow) and take the max to be safe for current storms.
      const snowToday = wData.daily.snowfall_sum[0] || 0;
      const snowTom   = wData.daily.snowfall_sum[1] || 0;
      const maxSnow   = Math.max(snowToday, snowTom);

      const minTemp   = wData.daily.temperature_2m_min[1];
      const maxWind   = wData.daily.windspeed_10m_max[1];

      const chance = calculateCheekiness(maxSnow, minTemp, maxWind);

      setResult({
        chance,
        message: getCheekyMessage(chance),
        snow: maxSnow.toFixed(1),
        temp: minTemp,
        wind: maxWind,
        location: `${city}, ${country}`
      });

    } catch (err) {
      console.error(err);
      setError(err.message || "Could not find that location.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full">
      
      {/* INPUT AREA */}
      <div className="bg-slate-900/80 p-6 border-b border-slate-700">
        <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">
          Enter Zip or Postal Code
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="e.g. 14201 or M5V" 
            className="flex-1 bg-slate-950 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none font-mono text-lg uppercase placeholder-slate-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
          />
          <button 
            onClick={handlePredict}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black py-4 px-6 rounded-lg transition-all active:scale-95 disabled:opacity-50 min-w-[100px]"
          >
            {loading ? '...' : 'GO'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-3 font-bold">⚠️ {error}</p>}
      </div>

      {/* RESULTS AREA */}
      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300 font-mono mb-2">
              📍 Forecast for {result.location}
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className={`text-8xl font-black tracking-tighter drop-shadow-lg ${
                result.chance > 80 ? 'text-green-400' : 
                result.chance > 40 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {result.chance}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mt-4 leading-tight">
              {result.message}
            </p>
          </div>

          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-3 gap-3 border-t border-slate-700 pt-6">
            <StatBox label="Snow" value={`${result.snow}"`} />
            <StatBox label="Low Temp" value={`${result.temp}°F`} />
            <StatBox label="Wind" value={`${result.wind} mph`} />
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
             <button className="text-cyan-400 hover:text-cyan-300 text-sm font-bold tracking-widest uppercase hover:underline">
                Share Result 📤
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="text-center p-3 bg-slate-950/50 rounded-lg border border-slate-700/50">
      <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">{label}</div>
      <div className="text-lg font-mono font-bold text-cyan-200">{value}</div>
    </div>
  );
}
