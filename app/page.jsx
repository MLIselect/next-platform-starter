import SnowCalculator from '../components/SnowCalculator';

export default function Page() {
    return (
        <div className="flex flex-col items-center py-12 gap-8">
            <section className="text-center max-w-2xl px-4">
                {/* The Header */}
                <h1 className="mb-4 text-5xl font-black text-slate-900">
                    SNOW DAY PREDICTOR ❄️
                </h1>
                
                {/* The Cheeky Subtitle */}
                <p className="mb-8 text-xl text-slate-600">
                    Don't trust the weatherman. Trust the algorithm.
                </p>

                {/* The Calculator Component */}
                <SnowCalculator />
                
            </section>

            {/* Footer Disclaimer */}
            <section className="text-center text-sm text-slate-400 mt-8">
                <p>
                    <strong>Disclaimer:</strong> If we are wrong and you fail your math test,<br/>
                    we owe you nothing but a "my bad."
                </p>
            </section>
        </div>
    );
}
