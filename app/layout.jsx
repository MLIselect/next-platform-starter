import { Inter } from 'next/font/google';

// We removed the broken "import './globals.css'" line
// And replaced it with the script tag below.

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Snow Day Predictor | Will School Be Closed?',
  description: 'The most accurate and cheeky snow day calculator.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* THE CHEAT CODE: Load styling directly from the internet */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Customize the colors to match your dark theme */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    slate: {
                      900: '#0f172a',
                      800: '#1e293b',
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
