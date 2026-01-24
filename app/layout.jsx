import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor',
  description: 'Will school be closed? Check your odds.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* TAILWIND CDN (The "Instant Fix" for styles) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { slate: { 900: '#0f172a', 800: '#1e293b' } },
                  animation: { 
                    marquee: 'marquee 25s linear infinite',
                    drift: 'drift 1s ease-in-out infinite' 
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
        
        {children}
      </body>
    </html>
  );
}
