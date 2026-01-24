import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor 2026 | Will School Be Closed Tomorrow?',
  description: 'Accurate snow day calculator for Ontario & USA. Check your school closing odds for the massive storm on Jan 25-26. Enter your zip/postal code now.',
  keywords: ['Snow Day Calculator', 'School Closings', 'Snow Day Predictor', 'Will school be closed', 'Ontario Snow Day', 'Buffalo Snow Day'],
  openGraph: {
    title: 'Snow Day Predictor 2026 ❄️',
    description: 'Will school be closed tomorrow? Check your odds now.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* TAILWIND CDN (Critical for Design) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { slate: { 900: '#0f172a', 800: '#1e293b' } }
                }
              }
            }
          `
        }} />
        
        {/* GOOGLE ANALYTICS (Optional - Create a GA4 property to fill this in) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID-HERE"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR-ID-HERE');
          `
        }} />
        */}
      </head>
      <body className={`${inter.className} bg-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
