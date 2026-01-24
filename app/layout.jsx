import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor 2026 | Will School Be Closed Tomorrow?',
  description: 'Accurate snow day calculator for Ontario & USA. Check your school closing odds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* TAILWIND CDN with ANIMATION CONFIG ADDED */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { slate: { 900: '#0f172a', 800: '#1e293b' } },
                  animation: {
                    marquee: 'marquee 25s linear infinite',
                  },
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
