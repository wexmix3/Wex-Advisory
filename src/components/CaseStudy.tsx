const OUTCOMES = [
  { stat: "5", label: "Competitor profiles built" },
  { stat: "3", label: "Local SEO gaps identified" },
  { stat: "5", label: "Ranked action items delivered" },
  { stat: "9hrs", label: "Delivered after kickoff" },
];

export default function CaseStudy() {
  return (
    <section id="case-study" className="bg-[#071220] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Recent Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Competitive intelligence for a coworking operator
        </h2>
        <p className="text-white/40 text-base mb-12 max-w-2xl">
          Multi-location operator across Chicago and Dallas-Fort Worth — needed a clear picture of
          where they stood against regional competitors before making resource allocation decisions.
        </p>

        <div className="bg-white/[0.04] rounded-2xl overflow-hidden">
          {/* Top bar */}
          <div className="border-l-4 border-gold bg-white/[0.03] px-8 py-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-1">
                Flexible Coworking
              </p>
              <p className="text-white text-xl font-bold">Suburban coworking chain</p>
            </div>
            <p className="text-white/40 text-xs self-center">Chicago, IL · Dallas-Fort Worth, TX</p>
          </div>

          <div className="px-8 py-8">
            {/* Outcome stats */}
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-4 mb-10 pb-8 border-b border-white/10">
              {OUTCOMES.map((o, i) => (
                <div key={o.label} className="flex items-baseline gap-2.5">
                  <div className="text-gold text-4xl font-extrabold tabular-nums">{o.stat}</div>
                  <div className="text-white/40 text-xs leading-tight max-w-[110px]">{o.label}</div>
                  {i < OUTCOMES.length - 1 && (
                    <span className="hidden sm:inline text-white/10 text-2xl ml-8">·</span>
                  )}
                </div>
              ))}
            </div>

            {/* What was delivered */}
            <div className="bg-white/[0.03] rounded-xl px-6 py-5">
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
                What was delivered
              </p>
              <ul className="space-y-2">
                {[
                  "Full competitor traffic and SEO benchmarks vs. 5 direct rivals",
                  "Google Business Profile health audit across all locations",
                  "Review velocity analysis — where competitors were pulling ahead",
                  "Prioritized action plan ranked by expected impact and cost",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA beneath case study */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="/work"
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
          >
            See full case study →
          </a>
          <span className="hidden sm:inline text-white/20">·</span>
          <a href="#pricing" className="text-sm font-semibold text-gold hover:text-gold-muted transition-colors">
            Get your report →
          </a>
        </div>
      </div>
    </section>
  );
}
