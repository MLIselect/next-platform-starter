'use client'

import { useState, useEffect } from 'react';

const JOKES = [
  "🚨 BREAKING: Students praying for ice 🧊",
  "🍷 Parents stocking up on 'sanity juice' (wine)",
  "🔄 Teachers refreshing the forecast every 3 seconds",
  "🪙 Superintendent currently flipping a coin",
  "🚌 Bus drivers practicing drifting in the parking lot",
  "📉 Math homework completion rate: 0%",
  "🧣 Inside-out pajamas: 60% of the time, it works every time",
  "🧂 Salt trucks spotted... unfortunately",
  "⛄ Snowman construction permits: APPROVED",
  "🔋 iPad charge levels: CRITICAL"
];

export default function CheekyTicker() {
  const [text, setText] = useState("");

  useEffect(() => {
    // Randomize the jokes on every page load
    const shuffled = [...JOKES].sort(() => 0.5 - Math.random());
    // Take the top 5 so it's not too long
    const selected = shuffled.slice(0, 5);
    setText(selected.join(" • "));
  }, []);

  if (!text) return null;

  return (
    <div className="bg-yellow-400 text-slate-900 py-2 px-4 font-bold text-xs md:text-sm uppercase tracking-widest overflow-hidden whitespace-nowrap border-b-4 border-yellow-500">
      <div className="animate-marquee inline-block">
        {text} • {text}
      </div>
    </div>
  );
}
