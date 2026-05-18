const OUTCOMES = [
  { stat: "3", label: "Local SEO gaps identified" },
  { stat: "5", label: "Competitor profiles built" },
  { stat: "5", label: "Ranked action items" },
];

export default function CaseStudy() {
  return (
    <section id="case-study" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Sample Engagement
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
          What a real analysis looks like
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Top bar */}
          <div className="border-l-4 border-gold bg-white/[0.03] px-8 py-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-1">Industry</p>
              <p className="text-white text-2xl font-bold">Flexible Coworking</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-white/70 text-sm">Suburban coworking chain</p>
              <p className="text-white/40 text-xs">Chicago, IL · Dallas-Fort Worth, TX</p>
            </div>
          </div>

          <div className="px-8 py-8">
            {/* Narrative */}
            <p className="text-white/70 text-base leading-relaxed mb-6 max-w-3xl">
              This engagement covered a suburban coworking operator with multiple locations across
              Chicago and Dallas-Fort Worth. With regional competitors intensifying and the flexible
              workspace market growing at 12–15% CAGR, the business needed to understand exactly
              where it stood — and where to focus its resources.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-10 max-w-3xl">
              The report covered five direct competitors, analyzed Local SEO footprint, Google
              Business Profile health, review velocity, and online traffic benchmarks — then
              surfaced a prioritized set of strategic actions calibrated to the actual budget.
            </p>

            {/* Outcome stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {OUTCOMES.map((o) => (
                <div key={o.label} className="bg-navy/60 border border-white/10 rounded-xl p-5 text-center">
                  <div className="text-gold text-3xl font-extrabold mb-2">{o.stat}</div>
                  <div className="text-white/50 text-xs leading-tight">{o.label}</div>
                </div>
              ))}
            </div>

            {/* What was delivered */}
            <div className="border border-white/10 rounded-xl px-6 py-5">
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">What was delivered</p>
              <ul className="space-y-2">
                {[
                  "Full competitor traffic and SEO benchmarks vs. 5 direct rivals",
                  "Google Business Profile health audit across all locations",
                  "Review velocity analysis — where competitors were pulling ahead",
                  "Prioritized action plan: 5 items ranked by expected impact and cost",
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
        <p className="text-center text-white/30 text-sm mt-10">
          Want to see something like this for your business?{" "}
          <a href="#pricing" className="text-gold hover:underline">
            Get your report →
          </a>
        </p>
      </div>
    </section>
  );
}
