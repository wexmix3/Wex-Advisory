const SCORES = [
  { label: 'AI Readiness', score: 42, color: '#C8A84B' },
  { label: 'Automation Opp.', score: 71, color: '#22c55e' },
  { label: 'Data Visibility', score: 28, color: '#ef4444' },
  { label: 'Revenue Accel.', score: 55, color: '#C8A84B' },
  { label: 'Overall Maturity', score: 49, color: '#C8A84B' },
];

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreRing({ label, score, color }: { label: string; score: number; color: string }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="transform -rotate-90" width="80" height="80">
          <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="7" />
          <circle
            cx="40" cy="40" r={RADIUS} fill="none"
            stroke={color} strokeWidth="7"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-base">{score}</span>
        </div>
      </div>
      <div className="text-white/40 text-xs leading-tight max-w-[80px] mx-auto">{label}</div>
    </div>
  );
}

export default function AuditSpotlight() {
  return (
    <section className="relative bg-[#050d1a] glow-navy border-y border-gold/20 py-24 px-6 overflow-hidden">
      {/* Full-bleed accent glow behind the whole spotlight — distinct from the
          bordered-glass card treatment used everywhere else on the page. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-40"
        style={{ backgroundImage: "radial-gradient(ellipse 60% 80% at 80% 30%, rgba(200,168,75,0.14), transparent 60%)" }}
      />

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold tracking-wider uppercase">Free · 2–3 Minutes · No Credit Card</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            Not sure where to start?<br />
            <span className="text-gold">Get your free AI Snapshot.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-8">
            Enter your business URL and get a quantified breakdown of exactly where AI can save you money —
            with the labor math shown, not generic advice.
          </p>
          <a
            href="https://audit.wexadvisory.com/audit"
            className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-gold/20"
          >
            Analyze My Business →
          </a>
          <p className="text-white/25 text-sm mt-4">
            PDF report emailed to you · Benchmarked against 12 industries
          </p>
        </div>

        {/* Right: sample output — no border/glass card, a raised panel with its
            own gold-tinted edge so it reads as the product, not another card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-2xl shadow-black/40 ring-1 ring-gold/25">
          <div className="text-white/30 text-xs font-medium uppercase tracking-wider mb-5">
            Sample Output — 25-person services firm
          </div>
          <div className="text-center mb-8">
            <div className="text-white/40 text-xs mb-1">Estimated Annual Savings Potential</div>
            <div className="text-gold text-5xl font-extrabold tracking-tight">$312K</div>
            <div className="text-white/30 text-xs mt-1">across 6 identified automation opportunities</div>
            <div className="text-white/25 text-[11px] mt-2 max-w-xs mx-auto leading-relaxed">
              Based on 6 automatable workflows at an estimated $52/hr blended labor cost — full methodology in your report.
            </div>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {SCORES.map((s) => <ScoreRing key={s.label} {...s} />)}
          </div>
          <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/25">
            <span>Powered by Claude AI</span>
            <span>audit.wexadvisory.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
