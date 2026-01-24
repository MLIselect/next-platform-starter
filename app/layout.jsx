import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor - Will School Be Closed?',
  description: 'Check your snow day odds for Jan 25-26. Accurate ice and snow predictions for US & Canada.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        
        {/* 1. GOOGLE ANALYTICS */}
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

        {/* 2. GOOGLE ADSENSE */}
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2146887969910228"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 3. TAILWIND CONFIG (For Ticker Animation) */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
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
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
