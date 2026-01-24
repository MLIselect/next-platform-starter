import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor - Will School Be Closed Jan 25-26?',
  description: 'Massive Storm Alert for Ontario & US. Check your snow day odds for Jan 25-26. Accurate ice and snow predictions.',
  keywords: ['Snow Day Calculator', 'School Closings', 'Snow Day Predictor', 'Will school be closed', 'Ice Storm'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 1. GOOGLE ANALYTICS (G-MBFE7VNRTG) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MBFE7VNRTG"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MBFE7VNRTG');
          `
        }} />

        {/* 2. GOOGLE ADSENSE (ca-pub-2146887969910228) */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2146887969910228"
          crossOrigin="anonymous"
        ></script>

        {/* 3. TAILWIND & ANIMATION CONFIG (Instant Start) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { slate: { 900: '#0f172a', 800: '#1e293b' } },
                  animation: { marquee: 'marquee 120s linear infinite' },
                  keyframes: {
                    marquee: {
                      '0%': { transform: 'translateX(0)' },
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
