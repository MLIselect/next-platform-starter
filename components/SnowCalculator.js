'use client' 

import { useState } from 'react';

export default function SnowCalculator() {
  // ... rest of your code ...
import { useState } from 'react';

export default function SnowCalculator() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- THE CHEEKY LOGIC ---
  const calculateCheekiness = (snowDepth, temp, wind) => {
    let score = 0;
    
    // Base score on snow (inches)
    // 0.5 inch = decent chance, 2+ inches = good chance
    if (snowDepth > 0.5) score += 20;
    if (snowDepth > 2) score += 30;
    if (snowDepth > 6) score += 40;

    // Temperature bonus (Ice factor)
    if (temp < 32) score += 10;
    if (temp < 20) score += 10;

    // Wind bonus (Blizzard factor)
    if (wind > 15) score += 10;
    if (wind > 30) score += 10;

    // Cap at 100
    return Math.min(score, 100);
  };

  const getCheekyMessage = (probability) => {
    if (probability < 10) return "Pack your lunch, nerd. You're going to school.";
    if (probability < 40) return "Wear your PJs inside out. It's a long shot.";
    if (probability < 70) return "The Principal is sweating. It's a coin flip.";
    if (probability < 90) return "Start heating up the hot cocoa.";
    return "VICTORY. GOD TIER SNOW DAY.";
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      // 1. FOR NOW: We are mocking the location to Buffalo, NY coordinates 
      //    (In the future, we will add a real Zip Code API)
      const lat = 42.8864; 
      const lon = -78.8784;

      // 2. Fetch Weather Data (Free Open-Meteo API)
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,snowfall_sum,windspeed_10m_max&timezone=auto`
      );
      const data = await res.json();
      
      // Get forecast (simplified logic for demo)
      const snow = data.daily.snowfall_sum[0] || 0; // Today/Tomorrow
      const temp = data.daily.temperature_2m_min[0];
      const wind = data.daily.windspeed_10m_max[0];

      // Calculate
      const chance = calculateCheekiness(snow / 2.54, temp, wind); // Convert cm to inches
      
      setResult({
        chance,
        message: getCheekyMessage(chance),
        snowAmount: (snow / 2.54).toFixed(1) // Show inches
      });

    } catch (error) {
      console.error(error);
      alert("The internet is frozen. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '2px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Will I have school?</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter Zip Code" 
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button 
          onClick={handlePredict}
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          {loading ? '...' : 'Predict'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '30px', animation: 'fadeIn 0.5s' }}>
          <div style={{ fontSize: '60px', fontWeight: '900', color: '#0070f3' }}>
            {result.chance}%
          </div>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>
            {result.message}
          </p>
          <p style={{ color: '#666' }}>
            Forecast logic: {result.snowAmount} inches of snow detected.
          </p>
        </div>
      )}
    </div>
  );
}
