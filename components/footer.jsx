import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-8 w-full">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Copyright */}
        <div className="text-slate-500 text-sm text-center md:text-left">
          <p>© 2026 Ontario Snow Day Predictor.</p>
          <p className="text-[10px] mt-1">Not affiliated with any school board.</p>
        </div>
        
        {/* Right Side: Links */}
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
        </div>

      </div>
    </footer>
  );
}
