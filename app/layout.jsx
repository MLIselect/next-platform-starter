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

        {/* REMOVED TAILWIND CDN TO FIX LAYOUT CONFLICTS */}

        {children}
      </body>
    </html>
  );
}
