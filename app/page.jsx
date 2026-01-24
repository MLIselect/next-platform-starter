import SnowCalculator from '../components/SnowCalculator';

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-black text-blue-800 mb-2 text-center">
        SNOW DAY PREDICTOR ❄️
      </h1>
      <p className="text-xl text-slate-600 mb-8 text-center">
        Don't trust the weatherman. Trust the algorithm.
      </p>
      
      <SnowCalculator />
      
      <p className="mt-12 text-xs text-slate-400">
        Results strictly for entertainment. Do your homework.
      </p>
    </div>
  );
}
