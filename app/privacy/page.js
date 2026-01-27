import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Data Classification Protocols',
  description: 'How we handle your location data, cookies, and email alerts. Spoiler: We do not sell your data.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 py-12 px-6 font-sans selection:bg-cyan-400 selection:text-slate-900">
      
      {/* --- NAVIGATION --- */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="text-cyan-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Intel Hub
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-slate-900 p-8 md:p-12 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Background Watermark */}
        <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl pointer-events-none select-none">🔒</div>

        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
                Privacy Policy
            </h1>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <span className="bg-cyan-950 text-cyan-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded border border-cyan-900">
                    Classification: Top Secret
                </span>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                    AKA: "The Boring Legal Stuff We Have to Post"
                </p>
            </div>
        </div>

        <div className="space-y-12 text-sm md:text-base leading-relaxed text-slate-300">
          
          {/* Section 1 */}
          <section>
              <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">01 //</span> The Emails (The "6:00 AM Club")
              </h3>
              <p className="mb-4">
                If you choose to sign up for our email alerts, we collect your email address. That is it.
              </p>
              <p>
                We use this information purely to send you tactical alerts when school closure probability exceeds 75%. 
                We do <strong>not</strong> sell, trade, or transfer your email to shady sled salesmen or third parties.
                You can unsubscribe at any time by clicking the "Abort Mission" link at the bottom of our emails.
              </p>
          </section>

          {/* Section 2 - Google Ads & Cookies (CRITICAL FOR ADSENSE) */}
          <section className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">02 //</span> Cookies & The Google Bots 🍪
              </h3>
              <p className="mb-4">
                We use cookies on this site. Not the chocolate chip kind (sadly), but the digital kind. 
                These are small files that a site or its service provider transfers to your computer's hard drive to recognize your browser and capture certain information.
              </p>
              <ul className="list-disc pl-6 space-y-4 text-slate-400 marker:text-cyan-500">
                 <li>
                    <strong>Third-Party Vendors:</strong> Third-party vendors, including <strong>Google</strong>, use cookies to serve ads based on a user's prior visits to your website or other websites.
                 </li>
                 <li>
                    <strong>Advertising Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
                 </li>
                 <li>
                    <strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline">Google Ads Settings</a>.
                 </li>
              </ul>
          </section>

          {/* Section 3 - Affiliate Disclosure */}
          <section>
              <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">03 //</span> Affiliate Links
              </h3>
              <p className="mb-4">
                School Snow Day Predictor is a participant in the <strong>Amazon Services LLC Associates Program</strong>.
              </p>
              <p>
                This means if you click a link to buy a "GT Snow Racer" or "Noise Cancelling Headphones" and actually buy it, we get a tiny commission at no extra cost to you. 
                This helps keep the servers running when 50,000 people visit at once during a blizzard.
              </p>
          </section>

          {/* Section 4 - Location Data */}
          <section>
              <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">04 //</span> Location Data Protocol
              </h3>
              <p className="mb-4">
                We do not store your precise GPS location permanently. 
                When you enter your Postal Code or Zip Code, it is converted into coordinates on the fly to query the Open-Meteo Weather API, and then the data is discarded.
              </p>
              <p>
                We do not know where you live, and frankly, we do not want to know. We just want to know if your driveway is snowy.
              </p>
          </section>

          {/* Section 5 - Children's Privacy (COPPA) */}
          <section>
              <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">05 //</span> Children's Online Privacy
              </h3>
              <p>
                We do not knowingly collect any personally identifiable information from children under the age of 13. 
                If a parent or guardian believes that the site has personally identifiable information of a child under the age of 13 in its database, please contact us immediately and we will use our best efforts to promptly remove such information from our records.
              </p>
          </section>

          {/* Section 6 - Contact */}
          <section>
              <h3 className="text-xl font-black text-white mb-4 uppercase flex items-center gap-3">
                  <span className="text-cyan-500">06 //</span> Contact Channel
              </h3>
              <p className="mb-4">
                If you have questions about this policy, please contact Command at: <br/>
                <span className="text-cyan-400 font-mono bg-cyan-950/30 px-2 py-1 rounded inline-block mt-2">mliselectpro@gmail.com</span>
              </p>
          </section>

          {/* Footer Timestamp */}
          <div className="border-t border-slate-800 pt-8 mt-12 text-center text-xs text-slate-600 uppercase tracking-widest font-bold">
            Last Updated: January 26, 2026 // Status: Enforced
          </div>

        </div>
      </div>
    </div>
  );
}
