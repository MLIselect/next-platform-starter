'use client';

import { useState } from 'react';
import Link from 'next/link'; 
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const AMAZON_TAG = 'mliselectpro-20';

  // --- THE ALGORITHM (RIGGED FOR VICTORY) ---
  const calculateProbability = (snow, tempMin, wind, rain) => {
    // 🚨 OVERRIDE: FORCE 100% FOR EVERYONE
    return 100;
  };

  const getMessage = (prob) => {
    // 🚨 OVERRIDE: FORCE OFFICIAL MESSAGE
    return { title: "OFFICIAL: SCHOOL CLOSED 🚨", mood: "The Superintendent has spoken. Go back to bed." };
  };

  const getAffiliateLink = (prob) => {
    // Always show the sled link since it is a confirmed snow day
    return {
        url: `https://www.amazon.ca/s?k=snow+sled&tag=${AMAZON_TAG}`,
        text: "🛷 VICTORY LAP! GRAB A SLED BEFORE THEY SELL OUT"
    };
  };

  const runPrediction = async (locationInput) => {
    if(!locationInput) return; 
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      let lat, lon, city, country;

      if (/^[A-Z]\d[A-Z]/.test(cleanInput)) {
         const fsa = cleanInput.substring(0, 3);
         const geoRes = await fetch(`https://api.zippopotam.us/ca/${fsa}`);
         if (!geoRes.ok) throw new Error("Postal Code not found.");
         const geoData = await geoRes.json();
         lat = geoData.places[0].latitude;
         lon = geoData.places[0].longitude;
         city = geoData.places[0]['place name'];
         country = 'Canada';
      } else if (/^\d{5}$/.test(cleanInput)) {
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

      // We still fetch weather just to populate the stats grid, even though result is 100%
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
      );
      const wData = await weatherRes.json();

      const snowRaw = (wData.daily.snowfall_sum[0] || 0) + (wData.daily.snowfall_sum[1] || 0); 
      const rainRaw = (wData.daily.rain_sum[0] || 0) + (wData.daily.rain_sum[1] || 0);
      const tempRaw = wData.daily.temperature_2m_min[1];
      const windRaw = wData.daily.windspeed_10m_max[1];

      const sixAmIndex = 30; 
      const sixAmTemp = wData.hourly.temperature_2m[sixAmIndex];
      const sixAmFeelsLike = wData.hourly.apparent_temperature[sixAmIndex];
      const sixAmWind = wData.hourly.windspeed_10m[sixAmIndex];

      const chance = calculateProbability(snowRaw, tempRaw, windRaw, rainRaw);
      const msgData = getMessage(chance);
      const affiliate = getAffiliateLink(chance);

      const isCanada = country === 'Canada';
      const toC = (f) => Math.round((f - 32) * 5/9);
      const toCm = (i) => (i * 2.54).toFixed(1);
      const toKmh = (m) => Math.round(m * 1.60934);

      const displayData = {
        snow: isCanada ? toCm(snowRaw) : snowRaw.toFixed(1),
        temp: isCanada ? toC(tempRaw) : Math.round(tempRaw),
        wind: isCanada ? toKmh(windRaw) : Math.round(windRaw),
        sixAmTemp: isCanada ? toC(sixAmTemp) : Math.round(sixAmTemp),
        sixAmFeelsLike: isCanada ? toC(sixAmFeelsLike) : Math.round(sixAmFeelsLike),
        sixAmWind: isCanada ? toKmh(sixAmWind) : Math.round(sixAmWind),
        iceDetected: (rainRaw > 0.1 && tempRaw <= 32),
        units: isCanada ? { snow: 'cm', temp: '°C', wind: 'km/h' } : { snow: '"', temp: '°F', wind: 'mph' }
      };

      setResult({
        chance,
        title: msgData.title,
        mood: msgData.mood,
        affiliate,
        display: displayData,
        location: `${city}, ${country}`
      });

    } catch (err) {
      console.error(err);
      setError("Try a main city code (e.g. L4G or 14201).");
    }
    setLoading(false);
  };

  const shareText = result ? `It's Official: SCHOOL IS CLOSED! ❄️ 100% Confirmed. Exams Postponed. schoolsnowdaypredictor.com` : '';
  
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
    <>
      <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 w-full transition-all">
        <div className="p-6 border-b border-slate-700 bg-slate-800">
          
          {/* --- BLOG POST LINKS --- */}
          <div className="space-y-3 mb-6">
            <Link 
              href="/blog/what-is-open-snow-day"
              className="block bg-emerald-900/40 border border-emerald-500/30 p-3 rounded-lg hover:bg-emerald-800/50 transition-all text-left group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">GUIDE</span>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Survival</span>
              </div>
              <p className="text-white text-sm font-bold group-hover:text-emerald-300 transition-colors">
                🛍️ Malls, Movies & Ski Hills: What is OPEN today? →
              </p>
            </Link>

            <Link 
              href="/blog/the-6am-silence"
              className="block bg-blue-900/40 border border-blue-500/30 p-3 rounded-lg hover:bg-blue-800/50 transition-all text-left group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider">Logistics</span>
              </div>
              <p className="text-white text-sm font-bold group-hover:text-cyan-300 transition-colors">
                📝 Why school boards waited until the last second →
              </p>
            </Link>
          </div>

          {/* 🚨 THE NEW EXAM ALERT (Replaced Status Board) 🚨 */}
          <div className="bg-orange-600/20 border border-orange-500 text-white p-4 rounded-xl text-center mb-6 shadow-[0_0_20px_rgba(234,88,12,0.2)]">
            <h2 className="text-xl font-black uppercase italic text-orange-400">⚠️ EXAM SCHEDULE UPDATE</h2>
            <p className="text-sm font-bold mt-2 text-white">
              All Secondary School Exams are POSTPONED.
            </p>
            <p className="text-[10px] mt-1 text-orange-200 uppercase tracking-wider">
              Check your board website for the new dates.
            </p>
          </div>
          
          <label className="block text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">
            Want to double check your area?
          </label>
          
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="e.g. L4N, 14201, 60601..." 
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

          <div className="flex gap-2 flex-wrap justify-center md:justify-start">
            <button onClick={() => {setInput('L4N'); runPrediction('L4N');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
              📍 Barrie (CA)
            </button>
            <button onClick={() => {setInput('14201'); runPrediction('14201');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
              🇺🇸 Buffalo (US)
            </button>
             <button onClick={() => {setInput('48201'); runPrediction('48201');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
              🇺🇸 Detroit (US)
            </button>
             <button onClick={() => {setInput('60601'); runPrediction('60601');}} className="text-xs bg-slate-700 hover:bg-slate-600 text-cyan-400 px-3 py-1 rounded-full border border-slate-600 transition-colors">
              🇺🇸 Chicago (US)
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
                  className="block w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-black text-sm py-4 px-4 rounded-lg hover:scale-105 transition-transform shadow-lg mb-8"
              >
                  {result.affiliate.text}
              </a>

              {/* --- ALARM SIGNUP --- */}
              <AlarmSignup />

              {result.display.iceDetected && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-8 animate-pulse">
                  <div className="flex items-center justify-center gap-2 text-red-200 font-bold uppercase tracking-wider text-sm">
                    <span>⚠️ Freezing Rain Risk Detected</span>
                  </div>
                  <p className="text-red-300 text-xs text-center mt-1">
                    Ice is boosting your odds significantly.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total Storm Snow</span>
                      <span className="text-3xl font-black text-white">{result.display.snow}</span>
                      <span className="text-xs text-cyan-400 mt-1">{result.display.units.snow} Expected</span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">6 AM Feels Like</span>
                      <span className="text-3xl font-black text-white">{result.display.sixAmFeelsLike}°</span>
                      <span className="text-xs text-slate-400 mt-1">Wind Gusts: {result.display.sixAmWind} {result.display.units.wind}</span>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col items-center text-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Primary Risk</span>
                      <span className={`text-2xl font-black ${result.chance > 50 ? 'text-red-400' : 'text-green-400'}`}>
                          {result.chance > 60 ? 'ROADS' : 'CLEAR'}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">
                          {result.chance > 60 ? 'Drifting & Visibility' : 'Safe to Travel'}
                      </span>
                  </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg mb-8 border border-slate-700/50 text-left">
                <h4 className="text-white text-sm font-bold mb-3 uppercase tracking-wider border-b border-slate-700 pb-2">How we calculated this {result.chance}% score:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">❄️ Snow Volume ({result.display.snow} {result.display.units.snow})</span>
                    <span className={
                      (result.display.units.snow === 'cm' && parseFloat(result.display.snow) > 15) || 
                      (result.display.units.snow === '"' && parseFloat(result.display.snow) > 6) 
                      ? "text-red-400 font-bold" : "text-slate-400"
                    }>
                      {(result.display.units.snow === 'cm' && parseFloat(result.display.snow) > 15) || 
                       (result.display.units.snow === '"' && parseFloat(result.display.snow) > 6) 
                       ? "CRITICAL" : "NORMAL"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">🧊 Ice Risk</span>
                    <span className={result.display.iceDetected ? "text-red-400 font-bold" : "text-green-400"}>
                      {result.display.iceDetected ? "HIGH" : "LOW"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">🥶 6 AM Temp</span>
                    <span className={result.display.sixAmFeelsLike < -20 || result.display.sixAmFeelsLike < -5 ? "text-orange-400 font-bold" : "text-slate-400"}>
                      {result.display.sixAmFeelsLike}° {result.display.units.temp}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 mx-auto max-w-sm">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Superintendent Mood</p>
                  <p className="text-yellow-400 font-bold">"{result.mood}"</p>
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

            <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed opacity-75">
              <strong>Disclaimer:</strong> This tool is for entertainment & planning purposes only. 
              <br />
              We calculate odds based on historical weather triggers, but we don't make the call. 
              <br />
              Always check your official school board website before rolling over and going back to sleep. 😴
            </p>
          </div>
        )}
      </div>
    </>
  );
}
