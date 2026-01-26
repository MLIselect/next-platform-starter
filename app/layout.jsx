import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Footer from '../components/Footer'; // <--- 1. IMPORT FOOTER

const inter = Inter({ subsets: ['latin'] });

// 1. GROK'S SEO METADATA (Server-Side)
export const metadata = {
  title: 'Snow Day Predictor 2026 – US & Canada School Closure Odds',
  description: 'Get real-time snow day odds for your zip/postal code. Powered by NOAA/Open-Meteo—check ice, snow, and closures for winter storms like Jan 25-26 in Ontario & US.',
  keywords: ['snow day predictor', 'school closure forecast', 'winter storm odds US Canada', 'freezing rain calculator Ontario', 'snow day calculator'],
  viewport: 'width=device-width, initial-scale=1', // Mobile friendly
  openGraph: {
    title: 'Snow Day Predictor 2026 ❄️',
    description: 'Will school be closed tomorrow? Check your odds now.',
    url: 'https://www.schoolsnowdaypredictor.com/',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  // 2. STRUCTURED DATA (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Snow Day Predictor',
    'url': 'https://www.schoolsnowdaypredictor.com/',
    'description': 'AI-powered calculator for school snow day probabilities based on weather data.',
    'applicationCategory': 'WeatherApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <html lang="en">
      <head>
        {/* TAILWIND CDN (Guarantees styling works immediately) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { slate: { 900: '#0f172a', 800: '#1e293b' } },
                  animation: { 
                    marquee: 'marquee 25s linear infinite',
                    drift: 'drift 0.8s ease-in-out infinite' 
                  },
                  keyframes: {
                    marquee: {
                      '0%': { transform: 'translateX(0)' },
                      '100%': { transform: 'translateX(-100%)' },
                    },
                    drift: {
                      '0%': { transform: 'translateX(0) rotate(0deg)' },
                      '25%': { transform: 'translateX(5px) rotate(5deg)' },
                      '50%': { transform: 'translateX(-5px) rotate(-5deg)' },
                      '75%': { transform: 'translateX(5px) rotate(5deg)' },
                      '100%': { transform: 'translateX(0) rotate(0deg)' },
                    }
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body className={`${inter.className} bg-slate-900 text-white`}>
        
        {/* INJECT JSON-LD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* GOOGLE ANALYTICS */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-MBFE7VNRTG"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MBFE7VNRTG');
          `}
        </Script>
        
        <main className="min-h-screen">
            {children}
        </main>

        {/* 2. ADD FOOTER HERE */}
        <Footer />
        
      </body>
    </html>
  );
}
