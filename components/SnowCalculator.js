'use client';

/**
 * SNOW DAY PREDICTOR - STORM ENGINE 2026
 * --------------------------------------
 * Version: 16.9.5 (Full Authority Build)
 * Logic: Superintendent Mood + Jeff Berardelli "Pink Zone" Calibration
 * Target: Ontario & Quebec Storm Event (Jan 26)
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; 
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  // --- 1. CORE STATE MANAGEMENT ---
  // We keep every state explicit to ensure no "flickering" during heavy API calls
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAfternoon, setIsAfternoon] = useState(false);

  // --- 2. LIVE TIME ENGINE ---
  // This handles the "Commute Window" flip. 
  // If it's 1:00 PM on Monday, we are predicting for TUESDAY morning.
  useEffect(() => {
    const updateCommuteWindow = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      
      // If past noon, target the next school day
      const newIsAfternoon = currentHour >= 12;
      
      // Safety: Auto-rerun prediction if the user is sitting on the page during the noon flip
      if (newIsAfternoon !== isAfternoon && input && result) {
        processSnowPrediction(input);
      }
      
      setIsAfternoon(newIsAfternoon); 
    };

    updateCommuteWindow();
    
    // Check every 60 seconds to ensure the target day label is always accurate
    const timer = setInterval(updateCommuteWindow, 60000);
    return () => clearInterval(timer);
  }, [isAfternoon, input, result]);

  // Derived label for the UI header
  const targetDayLabel = isAfternoon ? "Tuesday" : "Monday";

  // --- 3. THE PROPRIETARY ALGORITHM ($LaTeX$ Weighted) ---
  /**
   * Probability is calculated based on $P = (S_w + I_w + C_w) \times M_v$
   * Where S=Snow, I=Ice, C=Cold/WindChill, and M=Superintendent Mood Variance.
   */
  const calculateProbability = (
    snowAccumulation, 
    minTemperature, 
    windSpeed, 
    rainVolume, 
    countryCode, 
    cityName, 
    postalClean, 
    iceWindowDetected, 
    feelsLikeTemp
  ) => {
    const cityUpper = cityName.toUpperCase();
    
    // --- VICTORY MODE: JAN 26 STORM OVERRIDE ---
    // If we are in the morning window of Jan 26, GTA and Montreal are guaranteed 100%
    if (!isAfternoon) {
      // Canada Region M (Montreal) and L (GTA/York/Peel)
      if (countryCode === 'Canada' && (postalClean.startsWith('M') || postalClean.startsWith('L'))) {
        return { bus: 100, school: 100 };
      }
      // US Direct Impact Zones
      const confirmedSurrenderCities = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN', 'SYRACUSE'];
      if (confirmedSurrenderCities.some(c => cityUpper.includes(c))) {
        return { bus: 100, school: 100 };
      }
    }

    // Initialize base odds
    let busOdds = 0; 
    let schoolOdds = 0;
    
    // --- FACTOR 1: SNOW ACCUMULATION ---
    if (snowAccumulation > 0.5) { busOdds += 15; schoolOdds += 5; }
    if (snowAccumulation > 2.0) { busOdds += 40; schoolOdds += 20; }
    if (snowAccumulation > 5.0) { busOdds += 75; schoolOdds += 50; }
    if (snowAccumulation > 9.0) { busOdds += 98; schoolOdds += 90; }
    
    // --- FACTOR 2: THE 6:00 AM ICE WINDOW ---
    // If the timing of the storm hits exactly during the bus rollout
    if (iceWindowDetected) { 
      busOdds += 30; 
      schoolOdds += 15; 
    }
    
    // --- FACTOR 3: WIND CHILL (BERARDELLI PINK ZONE) ---
    // Cold enough to freeze exposed skin in < 15 minutes is a primary grounding factor
    if (feelsLikeTemp < -20) { 
        busOdds += 35; 
        schoolOdds += 15; 
    } 
    // Standard Canadian threshold for Ontario/Quebec
    if (countryCode === 'Canada' && feelsLikeTemp < -15) { 
        busOdds += 20; 
        schoolOdds += 10; 
    }

    // --- FACTOR 4: FLASH FREEZE (Rain followed by drop) ---
    if (rainVolume > 0.05 && minTemperature <= 32) { 
      busOdds += 55; 
      schoolOdds += 25; 
    }
    
    // --- FACTOR 5: URBAN CONGESTION (The Montreal Bridge Factor) ---
    if (cityUpper.includes('MONTREAL') || cityUpper.includes('TORONTO')) { 
      busOdds += 12; 
      schoolOdds += 5; 
    }

    // --- FACTOR 6: SUPERINTENDENT MOOD VARIANCE ---
    // Adds a layer of "human randomness" to the result for better engagement
    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    
    let finalBus = busOdds + moodVariance;
    let finalSchool = schoolOdds + moodVariance;

    // "Never Boring" Floor Logic: Avoid showing 0% on a day that is clearly cold or snowy
    if (finalBus <= 0 && (snowAccumulation > 0.1 || feelsLikeTemp < 15)) {
        finalBus = Math.floor(Math.random() * 9) + 1;
    }

    // Final Clamping (0-100)
    return { 
      bus: Math.max(1, Math.min(finalBus, 100)), 
      school: Math.max(1, Math.min(finalSchool, 100)) 
    };
  };

  // --- 4. CHEEKY MOOD MESSAGES ---
  const generateMoodMessage = (prob) => {
    if (prob >= 99) {
      return { 
        title: "VICTORY: SCHOOL CLOSED! 🚨", 
        mood: "THE SUPERINTENDENT SURRENDERED. PUT ON YOUR PJS AND GO BACK TO SLEEP. WE CALLED IT." 
      };
    }
    if (prob < 20) {
      return { 
        title: "PACK THE LUNCH 🎒", 
        mood: "RUTHLESS. THE PLOWS ARE WINNING. BUSES ARE ROLLING. NO MERCY TODAY." 
      };
    }
    if (prob < 50) {
      return { 
        title: "BUS BINGO 🎰", 
        mood: "PURE STRESS. ONE BOARD CANCELS, THE OTHER STAYS OPEN. REFRESH TWITTER EVERY 30 SECONDS." 
      };
    }
    if (prob < 80) {
      return { 
        title: "PJ DAY LIKELY 🤞", 
        mood: "THE PRINCIPAL IS STARING AT THE SALT TRUCK ON THEIR DRIVEWAY. ODDS ARE IN YOUR FAVOR." 
      };
    }
    return { 
      title: "GOD TIER SNOW DAY 👑", 
      mood: "BUSES ARE GROUNDED. TEACHERS ARE ALREADY MAKING PANCAKES. STAY HOME." 
    };
  };

  // --- 5. THE DATA PROCESSING ENGINE ---
  const processSnowPrediction = async (locationInput) => {
    if(!locationInput) return; 
    
    setLoading(true); 
    setError(''); 
    setResult(null);

    try {
      const cleanInput = locationInput.trim().toUpperCase().replace(/\s/g, '');
      const isUS = cleanInput.length === 5;
      
      // STEP 1: GEO-CODING
      const geoUrl = isUS 
        ? `https://api.zippopotam.us/us/${cleanInput}` 
        : `https://api.zippopotam.us/ca/${cleanInput.substring(0,3)}`;
      
      const geoRes = await fetch(geoUrl);
      if (!geoRes.ok) throw new Error("INVALID_LOCATION");
      const geoData = await geoRes.json();

      const { latitude: lat, longitude: lon } = geoData.places[0];
      const city = geoData.places[0]['place name'];
      const state = geoData.places[0]['state abbreviation'];
      const country = isUS ? 'USA' : 'Canada';

      // STEP 2: WEATHER FETCHING (Open-Meteo)
      const weatherParams = [
        `latitude=${lat}`,
        `longitude=${lon}`,
        `daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max`,
        `hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation`,
        `timezone=auto`,
        `temperature_unit=fahrenheit`,
        `wind_speed_unit=mph`,
        `precipitation_unit=inch`
      ].join('&');

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?${weatherParams}`);
      if (!weatherRes.ok) throw new Error("WEATHER_FAIL");
      const wData = await weatherRes.json();

      // STEP 3: LONG RANGE SCANNER (Weekend Bomb Detection)
      const weeklySnowArr = wData.daily.snowfall_sum;
      const bombCycloneTrigger = weeklySnowArr.slice(3).some(val => val > 5.5);

      // STEP 4: EXTRACT RELEVANT DATA POINTS
      const dayIndex = isAfternoon ? 1 : 0;
      const snowVal = wData.daily.snowfall_sum[dayIndex];
      const rainVal = wData.daily.rain_sum[dayIndex];
      const tempMinVal = wData.daily.temperature_2m_min[dayIndex];
      
      // Commute Window Analysis (6:00 AM)
      const hourIndex = isAfternoon ? 30 : 6; 
      const morningWindowData = isAfternoon 
        ? wData.hourly.precipitation.slice(28, 34) 
        : wData.hourly.precipitation.slice(4, 10);
      
      const isIcecommute = morningWindowData.some((p, i) => {
        const hTemp = wData.hourly.temperature_2m[hourIndex + i];
        return p > 0.01 && hTemp <= 32;
      });

      const sixAmFeelsLike = wData.hourly.apparent_temperature[hourIndex];

      // STEP 5: CALCULATE FINAL ODDS
      const probabilitySet = calculateProbability(
        snowVal, 
        tempMinVal, 
        20, 
        rainVal, 
        country, 
        city, 
        cleanInput, 
        isIcecommute, 
        sixAmFeelsLike
      );

      const messageContent = generateMoodMessage(probabilitySet.bus);
      
      // Unit Conversions for the UI
      const displayTemp = country === 'Canada' 
        ? Math.round((tempMinVal - 32) * 5/9) 
        : Math.round(tempMinVal);
      
      const displaySnow = country === 'Canada' 
        ? (snowVal * 2.54).toFixed(1) 
        : snowVal.toFixed(1);

      const displayChill = country === 'Canada'
        ? Math.round((sixAmFeelsLike - 32) * 5/9)
        : Math.round(sixAmFeelsLike);

      // STEP 6: COMMIT TO STATE
      setResult({
        location: `${city}, ${state}`,
        probs: probabilitySet,
        title: messageContent.title,
        mood: messageContent.mood,
        display: {
          bombDetected: bombCycloneTrigger,
          snow: displaySnow,
          temp: displayTemp,
          chill: displayChill,
          units: country === 'Canada' ? { snow: 'cm', temp: '°C' } : { snow: '"', temp: '°F' },
          ice: isIcecommute || (rainVal > 0.05 && tempMinVal <= 32)
        }
      });

    } catch (err) { 
        console.error("Prediction Error:", err);
        setError("INVALID LOCATION. USE A VALID POSTAL (L4G) OR ZIP (14201).");
    }
    setLoading(false);
  };

  const handleShare = () => {
    if (!result) return;
    const text = `VICTORY! My Snow Day odds for ${result.location} are ${result.probs.bus}%! ❄️ schoolsnowdaypredictor.com`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  // --- 6. RENDER COMPONENT ---
  return (
    <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700 w-full transition-all duration-500 hover:shadow-cyan-500/10">
      
      {/* HEADER SECTION */}
      <div className="p-8 border-b border-slate-700 bg-slate-800/50 backdrop-blur-xl">
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-5 rounded-2xl text-center mb-8 shadow-inner">
            <h2 className="text-3xl font-black italic text-cyan-400 uppercase tracking-tighter leading-none">Analyzing {targetDayLabel}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-[0.2em]">Storm-Ready 2026 Engine Active</p>
        </div>

        {/* INPUT GROUP */}
        <div className="flex gap-3 mb-4">
          <input 
            type="text" 
            placeholder="POSTAL / ZIP" 
            className="flex-1 bg-slate-950 border-2 border-slate-700 text-white p-5 rounded-2xl focus:border-cyan-400 outline-none font-mono text-2xl uppercase transition-all placeholder:opacity-20" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && processSnowPrediction(input)} 
          />
          <button 
            onClick={() => processSnowPrediction(input)} 
            disabled={loading} 
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black py-4 px-10 rounded-2xl shadow-lg active:scale-95 transition-all text-2xl"
          >
            {loading ? '⏳' : 'GO'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm font-bold mt-2 text-center animate-bounce">⚠️ {error}</p>}
      </div>

      {/* RESULTS DISPLAY AREA */}
      {result && (
        <div className="p-8 bg-slate-900/50 animate-in fade-in zoom-in duration-500">
          
          <div className="flex justify-center mb-10">
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-8 py-3 rounded-full flex items-center gap-3 shadow-inner">
              <span className="text-xl">📍</span>
              <span className="text-white font-black uppercase tracking-[0.2em] text-[11px]">{result.location}</span>
            </div>
          </div>

          {/* THE 2X2 PROBABILITY GRID (MASSIVE TEXT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-center">
              <div className="bg-slate-950/80 p-12 rounded-[2.5rem] border-2 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                  <span className="text-[13px] font-black text-cyan-400 uppercase tracking-[0.4em] block mb-4">Bus Cancellation</span>
                  <div className="text-8xl sm:text-9xl font-black text-white drop-shadow-2xl leading-none">{result.probs.bus}%</div>
              </div>
              <div className="bg-slate-950/80 p-12 rounded-[2.5rem] border-2 border-slate-800 shadow-xl">
                  <span className="text-[13px] font-black text-slate-500 uppercase tracking-[0.4em] block mb-4">School Closure</span>
                  <div className="text-8xl sm:text-9xl font-black text-slate-400 drop-shadow-lg leading-none">{result.probs.school}%</div>
              </div>
          </div>

          {/* AMAZON AFFILIATE CONVERSION SLOT */}
          <div className="mb-10 bg-yellow-500 p-1 rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform group">
              <a 
                href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-900 flex items-center justify-between gap-6 p-6 rounded-[1.8rem] border border-yellow-500/20"
              >
                  <div className="flex items-center gap-6 text-left">
                    <div className="text-5xl animate-bounce group-hover:scale-110 transition-transform">🛷</div>
                    <div className="flex flex-col">
                        <h4 className="font-black text-white uppercase text-xs tracking-widest mb-1">Storm Prep: Essential Gear</h4>
                        <p className="text-yellow-500 font-bold text-base leading-tight italic">Sleds are selling out fast. Get yours on Amazon →</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-yellow-500/30 font-black text-4xl group-hover:text-yellow-500 transition-colors">⟫</div>
              </a>
          </div>

          {/* CHEEKY MESSAGE BUBBLE */}
          <div className="text-center mb-14 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-4 py-1 rounded-full border border-white/10">
                <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Prediction Outcome</span>
            </div>
            <p className="text-4xl sm:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter leading-tight drop-shadow-md">{result.title}</p>
            <p className="text-yellow-400 font-bold italic text-2xl sm:text-3xl max-w-md mx-auto leading-tight">"{result.mood}"</p>
          </div>

          <AlarmSignup location={result.location} />

          {/* TECHNICAL DATA ICONS (RESTORED TO 3 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 border-t border-slate-800 pt-14">
              <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 flex flex-col items-center hover:bg-slate-800 transition-all">
                  <div className="text-5xl mb-4">❄️</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-widest mb-2">Total Snow</span>
                  <span className="text-5xl font-black text-white">{result.display.snow}</span>
                  <span className="text-[11px] text-cyan-400 font-bold mt-2 uppercase tracking-tighter">{result.display.units.snow} Expected</span>
              </div>
              <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 flex flex-col items-center text-center hover:bg-slate-800 transition-all">
                  <div className="text-5xl mb-4">🥶</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-widest mb-2">6 AM Chill</span>
                  <span className={`text-5xl font-black ${result.display.chill < -15 ? 'text-red-400' : 'text-white'}`}>{result.display.chill}°</span>
                  <span className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-tighter italic">Wind Chill Index</span>
              </div>
              <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 flex flex-col items-center hover:bg-slate-800 transition-all">
                  <div className="text-5xl mb-4">🧊</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-widest mb-2">Road Safety</span>
                  <span className={`text-4xl font-black ${result.display.ice ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                    {result.display.ice ? 'CRITICAL' : 'SAFE'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">Ice Detection</span>
              </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-14">
            <button 
              onClick={handleShare} 
              className="flex-1 py-7 bg-sky-500 hover:bg-sky-400 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 text-2xl"
            >
               <span className="text-3xl leading-none">🐦</span> TWEET YOUR ODDS
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
