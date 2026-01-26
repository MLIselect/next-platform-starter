export default function PrivacyPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-cyan-400 font-bold mb-8 uppercase tracking-wider text-sm">
          AKA: "The Boring Legal Stuff We Have to Post"
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <p>
            Last Updated: January 26, 2026. <br/>
            (We update this more often than the TDSB updates their snow policy).
          </p>

          <h3 className="text-xl font-bold text-white mt-8">1. The Emails (The "6:00 AM Club")</h3>
          <p>
            If you sign up for our email alerts, we collect your email address. That's it. 
            We use this purely to send you alerts when schools close. We do not sell your email to shady sled salesmen. 
            You can unsubscribe at any time by clicking the link at the bottom of our emails.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">2. Cookies & The Google Bots 🍪</h3>
          <p>
            We use cookies on this site. Not the chocolate chip kind (sadly), but the digital kind. 
            We use <strong>Google Analytics</strong> to see how many people are frantically refreshing the page at 5:45 AM.
          </p>
          <p className="mt-2">
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. 
            Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:underline">Google Ads Settings</a>.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">3. Affiliate Links</h3>
          <p>
            School Snow Day Predictor is a participant in the Amazon Services LLC Associates Program. 
            This means if you click a link to buy a "GT Snow Racer" or "Noise Cancelling Headphones" and actually buy it, we get a tiny commission at no extra cost to you. 
            It helps keep the servers running when 50,000 people visit at once.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">4. Location Data</h3>
          <p>
            We do not store your precise GPS location. When you enter your Postal Code or Zip Code, it is converted into coordinates on the fly to check the weather, and then discarded. 
            We don't know where you live, and we don't want to know.
          </p>

          <h3 className="text-xl font-bold text-white mt-8">5. Contact</h3>
          <p>
            If you have questions about this policy, please contact us at: <br/>
            <span className="text-white font-mono">mliselectpro@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
