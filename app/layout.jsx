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
        {/* Place Google AdSense <script> here when you get it */}
      </head>
      <body className={inter.className}>
        {/* This ensures ONLY your new page shows, removing the old template header */}
        {children}
      </body>
    </html>
  );
}
