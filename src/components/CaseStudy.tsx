const OUTCOMES = [
  { stat: "3", label: "Local SEO gaps identified" },
  { stat: "5", label: "Competitor deep-dives" },
  { stat: "5", label: "Strategic action items" },
];

export default function CaseStudy() {
  return (
    <section id="case-study" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Client Case Study
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
          Real results for real businesses
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Top bar */}
          <div className="border-l-4 border-gold bg-white/[0.03] px-8 py-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-1">Client</p>
              <p className="text-white text-2xl font-bold">25N Coworking</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-white rounded-lg px-4 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/25n-logo.png"
                  alt="25N Coworking"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm">Flexible Workspace · 5+ Locations</p>
                <p className="text-white/40 text-xs mt-1">Chicago, IL · Dallas, TX</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            {/* Narrative */}
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-3xl">
              25N Coworking — a suburban coworking chain with locations across Chicago and the
              Dallas-Fort Worth metro — engaged Wex Advisory for a competitive intelligence
              deep-dive. With regional competitors intensifying and the flexible workspace market
              growing at 12–15% CAGR, they needed to understand exactly where they stood and where
              to focus their resources.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-10 max-w-3xl">
              The report covered five direct competitors, analyzed Local SEO footprint, Google
              Business Profile health, review velocity, and online traffic benchmarks — then
              surfaced a prioritized set of strategic actions calibrated to their actual budget.
            </p>

            {/* Outcome stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {OUTCOMES.map((o) => (
                <div key={o.label} className="bg-navy/60 border border-white/10 rounded-xl p-5 text-center">
                  <div className="text-gold text-3xl font-extrabold mb-2">{o.stat}</div>
                  <div className="text-white/50 text-xs leading-tight">{o.label}</div>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-gold/50 pl-6">
              <p className="text-white/80 text-lg italic leading-relaxed mb-3">
                &ldquo;The analysis surfaced gaps we didn&apos;t know we had — and gave us a clear
                roadmap to close them.&rdquo;
              </p>
              <cite className="text-white/40 text-sm not-italic">— Founder, 25N Coworking</cite>
            </blockquote>
          </div>
        </div>

        {/* CTA beneath case study */}
        <p className="text-center text-white/30 text-sm mt-10">
          Ready to see what&apos;s true for your business?{" "}
          <a href="#pricing" className="text-gold hover:underline">
            Get your report →
          </a>
        </p>
      </div>
    </section>
  );
}
