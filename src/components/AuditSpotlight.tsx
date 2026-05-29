const SCORES = [
  { label: 'AI Readiness', score: 42, color: '#C8A84B' },
  { label: 'Automation Opp.', score: 71, color: '#22c55e' },
  { label: 'Data Visibility', score: 28, color: '#ef4444' },
  { label: 'Revenue Accel.', score: 55, color: '#C8A84B' },
  { label: 'Overall Maturity', score: 49, color: '#C8A84B' },
];

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreRing({ label, score, color }: { label: string; score: number; color: string }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="transform -rotate-90" width="64" height="64">
          <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="32" cy="32" r={RADIUS} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
      </div>
      <div className="text-white/40 text-xs leading-tight max-w-[72px] mx-auto">{label}</div>
    </div>
  );
}

export default function AuditSpotlight() {
  return (
    <section className="bg-[#071220] border-y border-white/10 py-20 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold tracking-wider uppercase">Free · 2–3 Minutes · No Credit Card</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Not sure where to start?<br />
            <span className="text-gold">Get your free AI Snapshot.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-8">
            Enter your business URL and get a quantified breakdown of exactly where AI can save you money —
            with the labor math shown, not generic advice.
          </p>
          <a
            href="https://audit.wexadvisory.com/audit"
            className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-gold/10"
          >
            Analyze My Business →
          </a>
          <p className="text-white/25 text-sm mt-4">
            PDF report emailed to you · Benchmarked against 12 industries
          </p>
        </div>

        {/* Right: sample output card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
          <div className="text-white/30 text-xs font-medium uppercase tracking-wider mb-5">
            Sample Output — 25-person services firm
          </div>
          <div className="text-center mb-7">
            <div className="text-white/40 text-xs mb-1">Estimated Annual Savings Potential</div>
            <div className="text-gold text-4xl font-extrabold">$312K</div>
            <div className="text-white/30 text-xs mt-1">across 6 identified automation opportunities</div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {SCORES.map((s) => <ScoreRing key={s.label} {...s} />)}
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/25">
            <span>Powered by Claude AI</span>
            <span>audit.wexadvisory.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
