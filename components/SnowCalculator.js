'use client';

/**
 * ============================================================================
 * SNOW DAY PREDICTOR - PROPRIETARY CALCULATION ENGINE
 * ============================================================================
 * Version: 17.2.4 (Badge Overflow & Visibility Fix)
 * Status: Production Ready / Global Launch
 * Target Event: Ontario & Quebec "Pink Zone" (Jan 26-27)
 * Build Status: Un-Condensed / Explicit / JSX Safe
 * ============================================================================
 */

import { useState, useEffect, useMemo } from 'react';
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  // --------------------------------------------------------------------------
  // 1. STATE INITIALIZATION
  // --------------------------------------------------------------------------
  // Every state is explicit to prevent UI flicker and maintain strict logic
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAfternoon, setIsAfternoon] = useState(false);

  // --------------------------------------------------------------------------
  // 2. CHRONOS ENGINE (Time Window Synchronizer)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const synchronizeCommuteWindow = () => {
      const systemTime = new Date();
      const currentHour = systemTime.getHours();
      
      // The "Noon Flip": After 12 PM, we predict for the next morning.
      const afternoonModeActive = currentHour >= 12;
      
      // Auto-refresh the engine if a user is idling during the transition
      if (afternoonModeActive !== isAfternoon && input && result) {
        processSnowPrediction(input);
      }
      
      setIsAfternoon(afternoonModeActive); 
    };

    synchronizeCommuteWindow();
    
    // Heartbeat check every 60 seconds
    const chronosTimer = setInterval(synchronizeCommuteWindow, 60000);
    
    return () => {
      clearInterval(chronosTimer);
    };
  }, [isAfternoon, input, result]);

  // Derive the target day string for UI headers
  const targetDayLabel = isAfternoon ? "Tuesday" : "Monday";

  // --------------------------------------------------------------------------
  // 3. THE ALGORITHM ($LaTeX$ Weighted Matrix)
  // --------------------------------------------------------------------------
  /**
   * The calculation formula follows a weighted probability index:
   * $P = (A \cdot w_s) + (I \cdot w_i) + (C \cdot w_c) \pm M_v$
   * Where A=Accumulation, I=Ice, C=Cold, and M=Mood Variance.
   */
  const calculateProbabilityWeight = (
    snowInches, 
    minTempF, 
    rainVolume, 
    countryCode, 
    cityName, 
    postalClean, 
    iceDetectedAtCommute, 
    feelsLikeF
  ) => {
    const cityUpper = cityName.toUpperCase();
    
    // --- SPECIAL OVERRIDE: JAN 26 STORM VICTORY MODE ---
    // Since this storm is a 1-in-20 year event, we force 100% in confirmed impact zones.
    // L-Postal (Aurora/GTA) and M-Postal (Montreal)
    if (isAfternoon === false) {
      const isImpactCanada = countryCode === 'Canada' && (postalClean.startsWith('M') || postalClean.startsWith('L'));
      
      if (isImpactCanada) {
        return { bus: 100, school: 100 };
      }

      const confirmedUSImpact = ['DETROIT', 'BUFFALO', 'ANN ARBOR', 'DEARBORN', 'SYRACUSE'];
      if (confirmedUSImpact.some(c => cityUpper.includes(c))) {
        return { bus: 100, school: 100 };
      }
    }

    // Initialize base integer weights
    let busOdds = 0; 
    let schoolOdds = 0;
    
    // --- FACTOR 1: SNOW ACCUMULATION ---
    if (snowInches > 0.5) { busOdds += 15; schoolOdds += 5; }
    if (snowInches > 2.0) { busOdds += 40; schoolOdds += 20; }
    if (snowInches > 5.0) { busOdds += 75; schoolOdds += 50; }
    if (snowInches > 9.0) { busOdds += 98; schoolOdds += 90; }
    
    // --- FACTOR 2: THE 6:00 AM ICE THREAT ---
    if (iceDetectedAtCommute) { 
      busOdds += 35; 
      schoolOdds += 20; 
    }
    
    // --- FACTOR 3: WIND CHILL (DIESEL GEL POINT CALIBRATION) ---
    // Apparent temperature for child safety at stops
    if (feelsLikeF < -20) { 
        busOdds += 40; 
        schoolOdds += 15; 
    } 
    // Standard Canadian threshold
    if (countryCode === 'Canada' && feelsLikeF < -15) { 
        busOdds += 25; 
        schoolOdds += 10; 
    }

    // --- FACTOR 4: FLASH FREEZE ---
    if (rainVolume > 0.05 && minTempF <= 32) { 
      busOdds += 55; 
      schoolOdds += 30; 
    }
    
    // --- FACTOR 5: URBAN CONGESTION ---
    const isMajorMetro = cityUpper.includes('MONTREAL') || cityUpper.includes('TORONTO');
    if (isMajorMetro) { 
      busOdds += 15; 
      schoolOdds += 5; 
    }

    // --- FACTOR 6: SUPERINTENDENT MOOD VARIANCE ---
    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    
    let finalBus = busOdds + moodVariance;
    let finalSchool = schoolOdds + moodVariance;

    // Floor logic to prevent showing 0% during active storms
    if (finalBus <= 0 && (snowInches > 0.1 || feelsLikeF < 15)) {
        finalBus = Math.floor(Math.random() * 9) + 1;
    }

    return { 
      bus: Math.max(1, Math.min(finalBus, 100)), 
      school: Math.max(1, Math.min(finalSchool, 100)) 
    };
  };

  // --------------------------------------------------------------------------
  // 4. MOOD BRANDING GENERATOR
  // --------------------------------------------------------------------------
  const getBrandingForOdds = (oddsValue) => {
    if (oddsValue >= 99) {
      return { 
        title: "VICTORY: SCHOOL CLOSED! 🚨", 
        mood: "WE CALLED IT. THE SUPERINTENDENT SURRENDERED. PUT ON YOUR PJS AND GO BACK TO SLEEP." 
      };
    }
    if (oddsValue < 20) {
      return { 
        title: "PACK THE LUNCH 🎒", 
        mood: "RUTHLESS. THE PLOWS ARE WINNING. BUSES ARE ROLLING. NO MERCY TODAY." 
      };
    }
    if (oddsValue < 50) {
      return { 
        title: "BUS BINGO 🎰", 
        mood: "PURE STRESS. ONE BOARD CANCELS, THE OTHER STAYS OPEN. COIN FLIP DAY." 
      };
    }
    if (oddsValue < 80) {
      return { 
        title: "PJ DAY LIKELY 🤞", 
        mood: "THE PRINCIPAL IS STARING AT THE RADAR. ODDS ARE IN YOUR FAVOR." 
      };
    }
    return { 
      title: "GOD TIER SNOW DAY 👑", 
      mood: "BUSES ARE GROUNDED. TEACHERS ARE ALREADY MAKING PANCAKES. STAY HOME." 
    };
  };

  // --------------------------------------------------------------------------
  // 5. THE DATA PROCESSING ENGINE
  // --------------------------------------------------------------------------
  const processSnowPrediction = async (locationValue) => {
    if(!locationValue) return; 
    
    setLoading(true); 
    setError(''); 
    setResult(null);

    try {
      const cleanInput = locationValue.trim().toUpperCase().replace(/\s/g, '');
      const isUS = cleanInput.length === 5;
      
      // STEP 1: GEO-LOCATE
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

      // STEP 2: WEATHER FETCHING (Tactical Feed)
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,rain_sum,windspeed_10m_max&hourly=temperature_2m,apparent_temperature,windspeed_10m,precipitation&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      if (!weatherRes.ok) throw new Error("WEATHER_FAIL");
      const wData = await weatherRes.json();

      // STEP 3: ANALYZE DATA
      const dayIndex = isAfternoon ? 1 : 0;
      const hourIndex = isAfternoon ? 30 : 6; 
      
      const snowRaw = wData.daily.snowfall_sum[dayIndex];
      const rainRaw = wData.daily.rain_sum[dayIndex];
      const tempMinRaw = wData.daily.temperature_2m_min[dayIndex];
      const feelsLikeRaw = wData.hourly.apparent_temperature[hourIndex];
      
      // 6:00 AM Ice Window detection
      const iceFlag = wData.hourly.precipitation[hourIndex] > 0.01 && wData.hourly.temperature_2m[hourIndex] <= 32;

      // STEP 4: RUN ALGORITHM
      const calculatedOdds = calculateProbabilityWeight(
        snowRaw, tempMinRaw, rainRaw, country, city, cleanInput, iceFlag, feelsLikeRaw
      );

      const branding = getBrandingForOdds(calculatedOdds.bus);
      
      // STEP 5: UI UNIT LOGIC
      const toC = (f) => Math.round((f - 32) * 5/9);
      const toCm = (i) => (i * 2.54).toFixed(1);

      setResult({
        location: `${city}, ${state}`,
        probs: calculatedOdds,
        title: branding.title,
        mood: branding.mood,
        display: {
          snow: country === 'Canada' ? toCm(snowRaw) : snowRaw.toFixed(1),
          temp: country === 'Canada' ? toC(tempMinRaw) : Math.round(tempMinRaw),
          chill: country === 'Canada' ? toC(feelsLikeRaw) : Math.round(feelsLikeRaw),
          units: country === 'Canada' ? { snow: 'cm', temp: '°C' } : { snow: '"', temp: '°F' },
          ice: iceFlag || (rainRaw > 0.05 && tempMinRaw <= 32)
        }
      });

    } catch (err) { 
        setError("INVALID LOCATION. USE A VALID POSTAL (L4G) OR ZIP (14201).");
    }
    setLoading(false);
  };

  const handleShare = () => {
    if (!result) return;
    const text = `VICTORY! My Snow Day odds for ${result.location} are ${result.probs.bus}%! ❄️ schoolsnowdaypredictor.com`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  // --------------------------------------------------------------------------
  // 6. RENDER COMPONENT
  // --------------------------------------------------------------------------
  return (
    <div className="bg-slate-800 rounded-[3rem] overflow-visible shadow-[0_30px_100px_rgba(0,0,0,0.7)] border-2 border-slate-700 w-full transition-all duration-500 text-balance relative">
      
      {/* --- TUESDAY ODDS LIVE BADGE --- */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-red-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] animate-pulse border-2 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.6)]">
          Tuesday Odds Live
        </div>
      </div>

      {/* INPUT PANEL */}
      <div className="p-10 border-b border-slate-700 bg-slate-800/50 backdrop-blur-2xl pt-14 rounded-t-[3rem]">
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-[2rem] text-center mb-10 shadow-inner">
            <h2 className="text-3xl md:text-4xl font-black italic text-cyan-400 uppercase tracking-tighter leading-none">Target: {targetDayLabel} Commute</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase mt-3 tracking-[0.3em]">Proprietary Storm-Logic Engine Sync: OK</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <input 
            type="text" 
            placeholder="e.g. L4G (Aurora), M1V (Scarborough), H3A (Montreal)..." 
            className="flex-1 bg-slate-950 border-2 border-slate-700 text-white p-6 rounded-[1.5rem] focus:border-cyan-400 outline-none font-mono text-xl uppercase transition-all placeholder:opacity-50 shadow-inner" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && processSnowPrediction(input)} 
          />
          <button 
            onClick={() => processSnowPrediction(input)} 
            disabled={loading} 
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black py-5 px-12 rounded-[1.5rem] shadow-2xl active:scale-95 transition-all text-3xl"
          >
            {loading ? '⏳' : 'GO'}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm font-black mt-4 text-center animate-pulse uppercase tracking-widest">⚠️ {error}</p>}
      </div>

      {/* RESULT DISPLAY AREA */}
      {result && (
        <div className="p-10 bg-slate-950/40 animate-in fade-in zoom-in duration-700 rounded-b-[3rem]">
          
          <div className="flex justify-center mb-12">
            <div className="bg-cyan-500/10 border border-cyan-500/20 px-10 py-4 rounded-full flex items-center gap-4 shadow-2xl">
              <span className="text-2xl animate-pulse">📍</span>
              <span className="text-white font-black uppercase tracking-[0.2em] text-[13px]">{result.location}</span>
            </div>
          </div>

          {/* THE 2X2 PROBABILITY GRID (MASSIVE TEXT - NO ICONS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 text-center">
              <div className="bg-slate-950/90 p-14 rounded-[3.5rem] border-2 border-cyan-500 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col justify-center items-center group">
                  <span className="text-[14px] font-black text-cyan-400 uppercase tracking-[0.5em] block mb-6">Bus Cancellation</span>
                  <div className="text-8xl sm:text-9xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-none tracking-tighter italic">
                    {result.probs.bus}%
                  </div>
              </div>
              <div className="bg-slate-950/90 p-14 rounded-[3.5rem] border-2 border-slate-800 shadow-2xl flex flex-col justify-center items-center group">
                  <span className="text-[14px] font-black text-slate-500 uppercase tracking-[0.5em] block mb-6">School Closure</span>
                  <div className="text-8xl sm:text-9xl font-black text-slate-400 drop-shadow-lg leading-none tracking-tighter italic">
                    {result.probs.school}%
                  </div>
              </div>
          </div>

          {/* ============================================================================
              AMAZON AFFILIATE CONVERSION SLOT (THE GOLD SLOT)
              ============================================================================ */}
          <div className="mb-12 bg-gradient-to-r from-yellow-400 to-yellow-600 p-1 rounded-[2.5rem] shadow-[0_20px_50px_rgba(234,179,8,0.2)] hover:scale-[1.03] transition-transform duration-500 group">
              <a 
                href="https://www.amazon.ca/s?k=snow+sled&tag=mliselectpro-20" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-900 flex items-center justify-between gap-8 p-8 rounded-[2.3rem] border border-yellow-500/20"
              >
                  <div className="flex items-center gap-8">
                    <div className="text-6xl animate-bounce group-hover:scale-110 transition-transform">🛷</div>
                    <div className="flex flex-col text-left">
                        <h4 className="font-black text-white uppercase text-xs tracking-[0.3em] mb-2 leading-none">Tactical Storm Prep</h4>
                        <p className="text-yellow-500 font-black text-lg leading-tight italic">Sleds are selling out fast. Get yours on Amazon &rarr;</p>
                    </div>
                  </div>
                  <div className="hidden lg:block text-yellow-500/20 font-black text-5xl group-hover:text-yellow-500 transition-colors">&raquo;</div>
              </a>
          </div>

          {/* MOOD ASSESSMENT BUBBLE */}
          <div className="text-center mb-16 bg-white/5 p-12 rounded-[3.5rem] border border-white/10 shadow-inner relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 px-8 py-2 rounded-full border border-white/10 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] italic leading-none">Assessment Summary</span>
            </div>
            <p className="text-5xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter leading-tight drop-shadow-2xl text-balance">
              {result.title}
            </p>
            <p className="text-yellow-400 font-bold italic text-3xl md:text-4xl max-w-2xl mx-auto leading-relaxed text-balance">
              &ldquo;{result.mood}&rdquo;
            </p>
          </div>

          <AlarmSignup location={result.location} />

          {/* TECHNICAL DATA ICONS (RESTORED TO 3 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-slate-800 pt-16">
              <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700 flex flex-col items-center hover:bg-slate-800 transition-all shadow-xl group">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">❄️</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] mb-4 text-center">Snow Accumulation</span>
                  <span className="text-6xl font-black text-white">{result.display.snow}</span>
                  <span className="text-[11px] text-cyan-400 font-black mt-3 uppercase tracking-widest leading-none">{result.display.units.snow} Total</span>
              </div>
              <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700 flex flex-col items-center text-center hover:bg-slate-800 transition-all shadow-xl group">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🥶</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] mb-4">6 AM Wind Chill</span>
                  <span className={`text-6xl font-black ${result.display.chill < -15 ? 'text-red-400' : 'text-white'}`}>
                    {result.display.chill}&deg;
                  </span>
                  <span className="text-[11px] text-slate-400 font-black mt-3 uppercase tracking-widest italic leading-none">Frostbite Warning</span>
              </div>
              <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700 flex flex-col items-center hover:bg-slate-800 transition-all shadow-xl group">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🧊</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] mb-4 text-center">Threat Level</span>
                  <span className={`text-4xl font-black ${result.display.ice ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                    {result.display.ice ? 'CRITICAL' : 'MINIMAL'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-black mt-3 uppercase tracking-widest leading-none">Road Friction</span>
              </div>
          </div>

          {/* SOCIAL ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-8 mt-16">
            <button 
              onClick={handleShare} 
              className="flex-1 py-10 bg-sky-500 hover:bg-sky-400 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] shadow-[0_20px_60px_rgba(14,165,233,0.4)] transition-all active:scale-95 flex items-center justify-center gap-6 text-3xl"
            >
               <span className="text-4xl leading-none">🐦</span> SHARE ON X
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
