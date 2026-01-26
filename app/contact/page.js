export default function ContactPage() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 py-12 px-6 font-sans">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <h1 className="text-3xl font-black text-white mb-2">Contact Us</h1>
        <p className="text-slate-400 mb-8">
          Have a media inquiry, bug report, or advertising request?
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">General Inquiries</h3>
            <p className="mb-2 text-sm">
              For general questions or feedback about the calculator:
            </p>
            {/* Replace this email if you set up a custom one later */}
            <a href="mailto:mliselectpro@gmail.com" className="text-cyan-400 font-mono text-lg hover:underline">
              mliselectpro@gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Media & Press</h3>
            <p className="mb-2 text-sm">
              For comments on upcoming storms or algorithm predictions for news segments:
            </p>
            <p className="text-slate-400 text-sm">
              Please mark the subject line <strong>"MEDIA REQUEST"</strong> for priority response.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mt-8">
            <p className="text-xs text-slate-500">
              <strong>Note:</strong> We cannot answer individual "Will my specific school close?" emails. 
              Please use the calculator on the homepage for local predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
