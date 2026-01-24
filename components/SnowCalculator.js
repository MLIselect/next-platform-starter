'use client'

import { useState } from 'react';

export default function SnowCalculator() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- THE LOGIC (Keep the cheekiness) ---
  const calculateCheekiness = (snowDepth, temp, wind) => {
    let score = 0;
    if (snowDepth > 0.5) score += 20;
    if (snowDepth > 2) score += 30;
    if (snowDepth > 6) score += 40;
    if (temp < 32) score += 10;
    if (temp < 20) score += 10;
    if (wind > 15) score += 10;
    if (wind > 30) score += 10;
    return Math.min(score, 100);
  };

  const getCheekyMessage = (probability) => {
    if (probability < 10) return "SADNESS DETECTED. Pack your lunch.";
    if (probability < 40) return "WEAR PJs INSIDE OUT. It's a long shot.";
    if (probability < 70) return "COIN FLIP. The Superintendent is sweating.";
    if (probability < 90) return "LOOKING GLORIOUS. Charge your iPad.";
    return "GOD TIER SNOW DAY. BURN THE HOMEWORK.";
  };

  const handlePredict = async () => {
    if(!zip) return; 
    setLoading(true);
    try {
      // MOCK DATA for now (Real Geocoding is the next step)
      const lat = 42.8864; // Buffalo
      const lon = -78.8784;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,windspeed_10m_max&timezone=auto`
      );
      const data = await res.json();
      
      const snow = data.daily.snowfall_sum[0] || 0; 
      const temp = data.daily.temperature_2m_min[0];
      const wind = data.daily.windspeed_10m_max[0];

      const chance = calculateCheekiness(snow / 2.54, temp, wind); 
      
      setResult({
        chance,
        message: getCheekyMessage(chance),
        snowAmount: (snow / 2.54).toFixed(1),
        temp: temp,
        wind: wind
      });

    } catch (error) {
      console.error(error);
      alert("The internet is frozen. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      
      {/* Card Header */}
      <div className="bg-slate-900/50 p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-slate-200">Start the Prediction</h2>
        <div className="flex gap-2 mt-4">
          <input 
            type="text" 
            placeholder="Enter Zip Code (e.g. 14201)" 
            className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-lg placeholder-slate-500"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
          />
          <button 
            onClick={handlePredict}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black py-4 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '🔮...' : 'GO'}
          </button>
        </div>
      </div>

      {/* Results Area */}
      {result && (
        <div className="p-8 bg-gradient-to-b from-slate-800 to-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex items-baseline justify-center space-x-2 mb-2">
            <span className={`text-8xl font-black tracking-tighter ${result.chance > 70 ? 'text-green-400' : result.chance > 30 ? 'text-yellow-400' : 'text-red-400'}`}>
              {result.chance}%
            </span>
            <span className="text-slate-400 font-bold uppercase tracking-widest">Chance</span>
          </div>

          <p className="text-2xl font-bold text-white text-center mb-8 leading-tight">
            {result.message}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-700 pt-6">
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">Snow</div>
              <div className="text-xl font-mono text-cyan-300">{result.snowAmount}"</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">Temp</div>
              <div className="text-xl font-mono text-cyan-300">{result.temp}°</div>
            </div>
            <div className="text-center p-3 bg-slate-900/50 rounded-lg">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">Wind</div>
              <div className="text-xl font-mono text-cyan-300">{result.wind} <span className="text-xs">mph</span></div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-3 text-slate-400 text-sm hover:text-white transition-colors underline decoration-dotted">
            Share this with your friends
          </button>
        </div>
      )}
    </div>
  );
}
