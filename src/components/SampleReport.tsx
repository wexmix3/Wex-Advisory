const STATS = [
  { value: "5", label: "Competitor Profiles" },
  { value: "/10", label: "Position Score" },
  { value: "✓", label: "Traffic Benchmarks" },
  { value: "3–5", label: "Immediate Actions" },
  { value: "✓", label: "Market Size Est." },
  { value: "✓", label: "Industry Trends" },
];

const BLURRED_SECTIONS = [
  { title: "Competitive Landscape", tag: "Section 1" },
  { title: "Market Sizing & Growth", tag: "Section 2" },
  { title: "Gap Analysis", tag: "Section 3" },
  { title: "Strategic Recommendations", tag: "Section 4" },
];

export default function SampleReport() {
  return (
    <section className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Sample Report
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          See what&apos;s inside every report
        </h2>
        <p className="text-white/50 text-base max-w-xl mb-12">
          Every engagement delivers a structured, print-ready PDF built to the same standard as top-tier consulting deliverables.
        </p>

        {/* Stat grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-gold text-xl font-bold mb-1">{s.value}</div>
              <div className="text-white/40 text-xs leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Blurred report preview */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Mock report header */}
          <div className="bg-navy border-b border-white/10 px-8 py-5 flex items-center justify-between">
            <div>
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">Wex Advisory</span>
              <span className="text-white/20 mx-2">|</span>
              <span className="text-white/40 text-xs">Competitive Intelligence Report</span>
            </div>
            <span className="text-white/20 text-xs">CONFIDENTIAL</span>
          </div>

          {/* Blurred sections */}
          <div className="p-8 grid md:grid-cols-2 gap-4 select-none">
            {BLURRED_SECTIONS.map((sec) => (
              <div key={sec.title} className="bg-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/70 font-semibold text-sm">{sec.title}</span>
                  <span className="text-gold/60 text-xs font-bold uppercase tracking-widest">{sec.tag}</span>
                </div>
                {/* Blurred content lines */}
                <div className="space-y-2 blur-sm pointer-events-none">
                  {[90, 75, 95, 60].map((w, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-full bg-white/20"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                  <div className="mt-3 h-2.5 rounded-full bg-gold/30 w-1/2" />
                </div>
              </div>
            ))}
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center bg-navy/60 backdrop-blur-[2px]">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-4">Get the full report for your business</p>
              <a
                href="#pricing"
                className="inline-block px-7 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
              >
                See Pricing → Starting at $149
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
