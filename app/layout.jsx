import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor | Will School Be Closed?',
  description: 'The most accurate and cheeky snow day calculator for students and parents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Code (Paste your script here later) */}
      </head>
      <body className={inter.className}>
        {/* This renders ONLY your page content, no extra template junk */}
        {children}
      </body>
    </html>
  );
}
