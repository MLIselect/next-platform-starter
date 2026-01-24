import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor - Will School Be Closed Jan 25-26?',
  description: 'Massive Storm Alert for Ontario & US. Check your snow day odds for Jan 25-26. Accurate ice and snow predictions for Aurora, Newmarket, Toronto, and Buffalo.',
  keywords: ['Snow Day Calculator', 'School Closings Ontario', 'Snow Day Predictor', 'Will school be closed Monday', 'Ice Storm 2026'],
  openGraph: {
    title: 'Snow Day Predictor ❄️',
    description: 'Will school be closed tomorrow? Check your odds now.',
    images: ['https://cdn-icons-png.flaticon.com/512/642/642000.png'], // Placeholder image
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* TAILWIND CDN + MARQUEE ANIMATION */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { slate: { 900: '#0f172a', 800: '#1e293b' } },
                  animation: { marquee: 'marquee 60s linear infinite' },
                  keyframes: {
                    marquee: {
                      '0%': { transform: 'translateX(100%)' },
                      '100%': { transform: 'translateX(-100%)' },
                    }
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
