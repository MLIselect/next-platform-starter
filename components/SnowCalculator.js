'use client'

import { useState } from 'react';

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- IMPROVED ACCURACY LOGIC ---
  const calculateProbability = (snow, tempMin, wind, rain) => {
    let score = 0;
    
    // 1. SNOW ACCUMULATION (Base Score)
    if (snow > 0.5) score += 15;
    if (snow > 2.0) score += 25;
    if (snow > 5.0) score += 30; // Heavy snow is a big factor
    if (snow > 8.0) score += 20; // 8+ inches is almost guaranteed

    // 2. THE ICE FACTOR (The "School Killer")
    // If it's raining but temp is below 32F, that's Ice.
    if (rain > 0.1 && tempMin < 32) {
        score += 30; // Ice is dangerous
    }
    if (rain > 0.25 && tempMin < 30) {
        score += 20; // Heavy ice
    }

    // 3. EXTREME COLD
    if (tempMin < 0) score += 10;
    if (tempMin < -10) score += 15; // Schools close for pure cold

    // 4. WIND CHILL / BLIZZARD
    if (wind > 20) score += 5;
    if (wind > 35) score += 15;

    return Math.min(score, 100);
  };

  const getMessage = (prob) => {
    // Professional but fun text
    if (prob < 15) return "School is likely ON. Pack your bags.";
    if (prob < 40) return "Slight Chance. Don't get your hopes up.";
    if (prob < 70) return "50/50 Chance. It could go either way.";
    if (prob < 90) return "High Probability. Prepare for a snow day.";
    return "Maximum Probability. Stay warm & safe!";
  };

  const handlePredict = async () => {
    if(!input) return; 
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // 1. CLEAN INPUT
      const cleanInput = input.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      // 2. GEOCODING (US & CA)
      if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanInput)) {
         const fsa = cleanInput.substring(0, 3);
         const geoRes = await fetch(`https://api.zippopotam.us/ca/${fsa}`);
         if (!geoRes.ok) throw new Error("Could not find Canadian Postal Code");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'CA';
      } else if (/^\d{5}$/.test(cleanInput)) {
         const geoRes = await fetch(`https://api.zippopotam.us/us/${cleanInput}`);
         if (!geoRes.ok) throw new Error("Could not find US Zip Code");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'US';
      } else {
        throw new Error("Please enter a valid US Zip or CA Postal Code");
      }

      // 3. FETCH WEATHER (Including Rain for Ice Calc)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
      );
      const wData = await weatherRes.json();

      // Get forecast for tomorrow (Index 1)
      // Note: We look at tomorrow for accuracy, but you can change logic to check Today if it's early morning.
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
      setError("Location not found. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">
          Enter Zip or Postal Code
        </label>
        <div className="flex gap-2 relative">
          <input 
            type="text" 
            placeholder="e.g. 14201" 
            className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none font-mono text-lg uppercase placeholder-slate-600 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
          />
          <button 
            onClick={handlePredict}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg transition-all active:scale-95 disabled:opacity-50 min-w-[80px]"
          >
            {loading ? '...' : 'GO'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-3 font-bold flex items-center gap-2">❌ {error}</p>}
      </div>

      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 bg-slate-700/50 rounded-full text-xs text-cyan-400 font-mono mb-3 border border-slate-600">
              📍 Forecast for {result.location}
            </div>
            
            {/* The Percentage */}
            <div className="flex items-center justify-center mb-2">
              <span className={`text-7xl md:text-8xl font-black tracking-tighter drop-shadow-2xl ${
                result.chance > 60 ? 'text-green-400' : 
                result.chance > 30 ? 'text-yellow-400' : 'text-slate-300'
              }`}>
                {result.chance}%
              </span>
            </div>
            
            <p className="text-xl md:text-2xl font-bold text-white leading-tight">
              {result.message}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-slate-700 pt-6">
            <div className="bg-slate-900/50 p-3 rounded border border-slate-700 text-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Snow</div>
                <div className="text-white font-mono text-lg">{result.snow}"</div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded border border-slate-700 text-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Low Temp</div>
                <div className="text-white font-mono text-lg">{result.temp}°</div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded border border-slate-700 text-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold">Wind</div>
                <div className="text-white font-mono text-lg">{result.wind} <span className="text-xs">mph</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
