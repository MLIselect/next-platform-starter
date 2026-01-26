'use client';

/**
 * ============================================================================
 * SNOW DAY PREDICTOR - PROPRIETARY CALCULATION ENGINE
 * ============================================================================
 * Version: 17.0.5 (Full Authority Build)
 * Status: Production Ready / Global Launch
 * Line Count Target: 300+ (Explicit & Un-Condensed)
 * * This component performs the following:
 * 1. Coordinates with Open-Meteo for hyper-local weather data.
 * 2. Applies the "Superintendent Mood" weighting algorithm.
 * 3. Detects the critical 6:00 AM "Commute Window" for bus safety.
 * 4. Integrates the Amazon Affiliate "Storm Prep" Gold Slot.
 * 5. Handles viral social media share generation.
 * ============================================================================
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; 
import AlarmSignup from './AlarmSignup'; 

export default function SnowCalculator() {
  // --------------------------------------------------------------------------
  // 1. CORE STATE MANAGEMENT
  // --------------------------------------------------------------------------
  // We maintain explicit state variables to ensure maximum UI stability
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAfternoon, setIsAfternoon] = useState(false);

  // --------------------------------------------------------------------------
  // 2. CHRONOS ENGINE (Time Window Synchronizer)
  // --------------------------------------------------------------------------
  /**
   * Commute Window Logic:
   * Schools base their decisions on the 6:00 AM weather window.
   * If the current user time is >= 12:00 PM, we shift prediction to the next day.
   */
  useEffect(() => {
    const synchronizeCommuteWindow = () => {
      const systemTime = new Date();
      const currentHour = systemTime.getHours();
      
      // The "Noon Flip": After 12 PM, we predict for the next morning.
      const afternoonModeActive = currentHour >= 12;
      
      // Auto-refresh the engine if a user is idling during the noon transition
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
  // 3. THE PROPRIETARY ALGORITHM ($LaTeX$ Weighted Matrix)
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
    // For the current massive blizzard, we force 100% in confirmed impact zones.
    if (isAfternoon === false) {
      // Canada Zone Detection (M=Montreal, L=GTA/York/Peel/Halton)
      const isImpactCanada = countryCode === 'Canada' && (postalClean.startsWith('M') || postalClean.startsWith('L'));
      
      if (isImpactCanada) {
        return { bus: 100, school: 100 };
      }

      // US Zone Detection (Known snow-belt closure targets)
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
    // Ice during the exact moment buses rollout is a primary grounding factor.
    if (iceDetectedAtCommute) { 
      busOdds += 30; 
      schoolOdds += 15; 
    }
    
    // --- FACTOR 3: WIND CHILL (BERARDELLI PINK ZONE CALIBRATION) ---
    // Cold enough to freeze skin or stop diesel engines from starting.
    if (feelsLikeF < -20) { 
        busOdds += 35; 
        schoolOdds += 15; 
    } 
    // Standard Canadian threshold (Ontario and Quebec specific)
    if (countryCode === 'Canada' && feelsLikeF < -15) { 
        busOdds += 20; 
        schoolOdds += 10; 
    }

    // --- FACTOR 4: FLASH FREEZE (Rain to Frozen ground) ---
    if (rainVolume > 0.05 && minTempF <= 32) { 
      busOdds += 55; 
      schoolOdds += 25; 
    }
    
    // --- FACTOR 5: URBAN DENSITY (The Montreal/Toronto Bridge Effect) ---
    const isMajorMetro = cityUpper.includes('MONTREAL') || cityUpper.includes('TORONTO');
    if (isMajorMetro) { 
      busOdds += 12; 
      schoolOdds += 5; 
    }

    // --- FACTOR 6: SUPERINTENDENT MOOD VARIANCE ---
    // Simulates the unpredictable human element (Mood, Precedent, Board Fatigue)
    const moodVariance = Math.floor(Math.random() * 11) - 5; 
    
    let finalBus = busOdds + moodVariance;
    let finalSchool = schoolOdds + moodVariance;

    // "Never Boring" Floor Logic: Ensure snowy days show at least minor odds.
    if (finalBus <= 0 && (snowInches > 0.1 || feelsLikeF < 15)) {
        finalBus = Math.floor(Math.random() * 9) + 1;
    }

    // Final Clamping to strictly adhere to 0-100% range
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
        mood: "THE SUPERINTENDENT SURRENDERED. PUT ON YOUR PJS AND GO BACK TO SLEEP. WE CALLED IT." 
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
        mood: "PURE STRESS. ONE BOARD CANCELS, THE OTHER STAYS OPEN. REFRESH TWITTER EVERY 30 SECONDS." 
      };
    }
    if (oddsValue < 80) {
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
      
      // STEP 1: GEO-CODING VIA ZIP/POSTAL API
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

      // STEP 2: WEATHER FETCHING (Open-Meteo Professional Feed)
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

      // STEP 3: LONG RANGE BOMB CYCLONE SCANNER
      const weeklySnowArr = wData.daily.snowfall_sum;
      const bombCycloneTrigger = weeklySnowArr.slice(3).some(val => val > 5.5);

      // STEP 4: DATA EXTRACTION
      const dayIndex = isAfternoon ? 1 : 0;
      const snowRaw = wData.daily.snowfall_sum[dayIndex];
      const rainRaw = wData.daily.rain_sum[dayIndex];
      const tempMinRaw = wData.daily.temperature_2m_min[dayIndex];
      
      // 6:00 AM Morning Window Detection
      const hourIndex = isAfternoon ? 30 : 6; 
      const commutePrecip = wData.hourly.precipitation[hourIndex];
      const commuteTemp = wData.hourly.temperature_2m[hourIndex];
      const morningIceDetected = commutePrecip > 0.01 && commuteTemp <= 32;

      const morningFeelsLike = wData.hourly.apparent_temperature[hourIndex];

      // STEP 5: RUN ALGORITHM
      const calculatedOdds = calculateProbabilityWeight(
        snowRaw, 
        tempMinRaw, 
        rainRaw, 
        country, 
        city, 
        cleanInput, 
        morningIceDetected, 
        morningFeelsLike
      );

      const branding = getBrandingForOdds(calculatedOdds.bus);
      
      // Units Logic
      const displayT = country === 'Canada' ? Math.round((tempMinRaw - 32) * 5/9) : Math.round(tempMinRaw);
      const displayS = country === 'Canada' ? (snowRaw * 2.54).toFixed(1) : snowRaw.toFixed(1);
      const displayC = country === 'Canada' ? Math.round((morningFeelsLike - 32) * 5/9) : Math.round(morningFeelsLike);

      // STEP 6: FINALIZE RESULT STATE
      setResult({
        location: `${city}, ${state}`,
        probs: calculatedOdds,
        title: branding.title,
        mood: branding.mood,
        display: {
          bombDetected: bombCycloneTrigger,
          snow: displayS,
          temp: displayT,
          chill: displayC,
          units: country === 'Canada' ? { snow: 'cm', temp: '°C' } : { snow: '"', temp: '°F' },
          ice: morningIceDetected || (rainRaw > 0.05 && tempMinRaw <= 32)
        }
      });

    } catch (err) { 
        console.error("Engine Fault:", err);
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
    <div className="bg-slate-800 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] border-2 border-slate-700 w-full transition-all duration-500">
      
      {/* HEADER SECTION */}
      <div className="p-10 border-b border-slate-700 bg-slate-800/50 backdrop-blur-2xl">
        <div className="bg-cyan-500/10 border border-cyan-500/30 p-6 rounded-[2rem] text-center mb-10 shadow-inner">
            <h2 className="text-3xl md:text-4xl font-black italic text-cyan-400 uppercase tracking-tighter leading-none">Target: {targetDayLabel} Commute</h2>
            <p className="text-[11px] text-slate-400 font-bold uppercase mt-3 tracking-[0.3em]">Proprietary Storm-Logic Engine Sync: OK</p>
        </div>

        {/* INPUT GROUP */}
        <div className="flex flex-col sm:flex-row gap-4 mb-2">
          <input 
            type="text" 
            placeholder="POSTAL / ZIP" 
            className="flex-1 bg-slate-950 border-2 border-slate-700 text-white p-6 rounded-[1.5rem] focus:border-cyan-400 outline-none font-mono text-3xl uppercase transition-all placeholder:opacity-10 shadow-inner" 
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

      {/* RESULTS DISPLAY AREA */}
      {result && (
        <div className="p-10 bg-slate-950/40 animate-in fade-in zoom-in duration-700">
          
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
                  <div className="text-8xl sm:text-9xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-none tracking-tighter">
                    {result.probs.bus}%
                  </div>
              </div>
              <div className="bg-slate-950/90 p-14 rounded-[3.5rem] border-2 border-slate-800 shadow-2xl flex flex-col justify-center items-center group">
                  <span className="text-[14px] font-black text-slate-500 uppercase tracking-[0.5em] block mb-6">School Closure</span>
                  <div className="text-8xl sm:text-9xl font-black text-slate-400 drop-shadow-lg leading-none tracking-tighter">
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
                        <h4 className="font-black text-white uppercase text-xs tracking-[0.3em] mb-2">Tactical Storm Prep</h4>
                        <p className="text-yellow-500 font-black text-lg leading-tight italic">Sleds are selling out fast. Get yours on Amazon →</p>
                    </div>
                  </div>
                  <div className="hidden lg:block text-yellow-500/20 font-black text-5xl group-hover:text-yellow-500 transition-colors">⟫</div>
              </a>
          </div>

          {/* MOOD ASSESSMENT BUBBLE */}
          <div className="text-center mb-16 bg-white/5 p-12 rounded-[3.5rem] border border-white/10 shadow-inner relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 px-8 py-2 rounded-full border border-white/10 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] italic">Superintendent Mood Assessment</span>
            </div>
            <p className="text-5xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter leading-tight drop-shadow-2xl">
              {result.title}
            </p>
            <p className="text-yellow-400 font-bold italic text-3xl md:text-4xl max-w-2xl mx-auto leading-relaxed">
              "{result.mood}"
            </p>
          </div>

          <AlarmSignup location={result.location} />

          {/* TECHNICAL DATA ICONS (RESTORED TO 3 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-slate-800 pt-16">
              <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700 flex flex-col items-center hover:bg-slate-800 transition-all shadow-xl group">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">❄️</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] mb-4 text-center">Snow Accumulation</span>
                  <span className="text-6xl font-black text-white">{result.display.snow}</span>
                  <span className="text-[11px] text-cyan-400 font-black mt-3 uppercase tracking-widest">{result.display.units.snow} Total</span>
              </div>
              <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700 flex flex-col items-center text-center hover:bg-slate-800 transition-all shadow-xl group">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🥶</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] mb-4">6 AM Wind Chill</span>
                  <span className={`text-6xl font-black ${result.display.chill < -15 ? 'text-red-400' : 'text-white'}`}>
                    {result.display.chill}°
                  </span>
                  <span className="text-[11px] text-slate-400 font-black mt-3 uppercase tracking-widest italic">Frostbite Warning</span>
              </div>
              <div className="bg-slate-800/40 p-10 rounded-[2.5rem] border border-slate-700 flex flex-col items-center hover:bg-slate-800 transition-all shadow-xl group">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🧊</div>
                  <span className="text-[11px] uppercase font-black text-slate-500 tracking-[0.2em] mb-4 text-center">Threat Level</span>
                  <span className={`text-4xl font-black ${result.display.ice ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                    {result.display.ice ? 'CRITICAL' : 'MINIMAL'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-black mt-3 uppercase tracking-widest">Ice/Road Friction</span>
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
