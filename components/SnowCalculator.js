'use client'

import { useState } from 'react';

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // YOUR AMAZON TAG
  const AMAZON_TAG = 'mliselectpro-20';

  // --- THE ALGORITHM ---
  const calculateProbability = (snow, tempMin, wind, rain) => {
    let score = 0;
    
    // 1. SNOW ACCUMULATION
    if (snow > 1.0) score += 20;
    if (snow > 3.0) score += 40;
    if (snow > 6.0) score += 60; 
    
    // 2. THE ICE FACTOR (The School Killer)
    if (rain > 0.1 && tempMin <= 32) score += 50; 
    if (rain > 0.25 && tempMin <= 30) score += 70; 

    // 3. TEMPERATURE
    if (tempMin < 0) score += 10;
    if (tempMin < -10) score += 20;

    // 4. WIND
    if (wind > 25) score += 10;
    if (wind > 40) score += 20;

    return Math.min(score, 100);
  };

  const getMessage = (prob) => {
    if (prob < 20) return { title: "PACK THE LUNCH 🎒", mood: "Ruthless. Buses are rolling." };
    if (prob < 50) return { title: "BUS BINGO 🎰", mood: "Stressing. Refreshing Twitter." };
    if (prob < 80) return { title: "PJ DAY LIKELY 🤞", mood: "Defeated. Drafting the email." };
    return { title: "GOD TIER SNOW DAY 👑", mood: "Asleep. Don't set the alarm." };
  };

  const getAffiliateLink = (prob) => {
    if (prob >= 50) {
        return {
            url: `https://www.amazon.ca/s?k=snow+sled&tag=${AMAZON_TAG}`,
            text: "🛷 HIGH ODDS! GRAB A SLED BEFORE THEY SELL OUT"
        };
    } else {
        return {
            url: `https://www.amazon.ca/s?k=bulk+hot+chocolate+coffee&tag=${AMAZON_TAG}`,
            text: "☕ LOW ODDS. STOCK UP ON COCOA (YOU'LL NEED IT)"
        };
    }
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      // 1. GEOCODING
      if (/^[A-Z]\d[A-Z]/.test(cleanInput)) { // Canada
         const fsa = cleanInput.substring(0, 3);
         const geoRes = await fetch(`https://api.zippopotam.us/ca/${fsa}`);
         if (!geoRes.ok) throw new Error("Postal Code not found.");
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
        throw new Error("Invalid Format. Use 5 digits (US) or L4G (Canada).");
      }

      // 2. WEATHER FETCH (Open-Meteo)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
      );
      const wData = await weatherRes.json();

      const snow = wData.daily.snowfall_sum[1] || 0;
      const rain = wData.daily.rain_sum[1] || 0;
      const temp = wData.daily.temperature_2m_min[1];
      const wind = wData.daily.windspeed_10m_max[1];

      const chance = calculateProbability(snow, temp, wind, rain);
      const msgData = getMessage(chance);
      const affiliate = getAffiliateLink(chance);

      setResult({
        chance,
        title: msgData.title,
        mood: msgData.mood,
        affiliate,
        snow: snow.toFixed(1),
        temp: Math.round(temp),
        wind: Math.round(wind),
        location: `${city}, ${country}`
      });

    } catch (err) {
      console.error(err);
      setError("Try a main city code (e.g. L4G or 14201).");
    }
    setLoading(false);
  };

  const shareText = result ? `My Odds: ${result.chance}% Snow Day in ${result.location}! ❄️ Superintendent Mood: ${result.mood} Check yours: schoolsnowdaypredictor.com #SnowDay2026` : '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetResult = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">
          Enter Zip (US) or Postal Code (CA)
        </label>
        
        {/* INPUT AREA */}
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="e.g. L4N, 14201, 48201..." 
            className="flex-1 bg-slate-900 border border-slate-600 text-white p-4 rounded-lg focus:border-cyan-400 focus:outline-none font-mono text-lg uppercase placeholder-slate-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runPrediction(input)}
          />
          <button 
            onClick={() => runPrediction(input)}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-lg min-w-[80px]"
          >
            {loading ? '⏳' : 'GO'}
          </button>
        </div>

        {/* QUICK PICK BUTTONS (Added Detroit for Midwest Appeal) */}
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <button onClick={() => {setInput('L4N'); runPrediction('L4N');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
            📍 Barrie
          </button>
          <button onClick={() => {setInput('L9W'); runPrediction('L9W');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
            📍 Orangeville
          </button>
          <button onClick={() => {setInput('14201'); runPrediction('14201');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
            🇺🇸 Buffalo
          </button>
           <button onClick={() => {setInput('48201'); runPrediction('48201');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
            🇺🇸 Detroit
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
            <p className="text-xl font-bold text-cyan-100 mb-6">{result.title}</p>
            
            <a 
                href={result.affiliate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-sm py-4 px-4 rounded-lg hover:scale-105 transition-transform shadow-lg mb-6"
            >
                {result.affiliate.text}
            </a>

            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 mx-auto max-w-sm">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Superintendent Mood</p>
                <p className="text-yellow-400 font-bold">"{result.mood}"</p>
            </div>
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

          <div className="flex gap-2">
            <button 
                onClick={copyToClipboard}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all"
            >
                {copied ? '✅ Copied!' : '📋 Copy Results'}
            </button>
            <button 
                onClick={tweetResult}
                className="flex-1 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg font-bold transition-all"
            >
                🐦 Tweet This
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
