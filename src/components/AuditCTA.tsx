"use client";

export default function AuditCTA() {
  return (
    <section id="ai-audit" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-bold tracking-wider uppercase">Free · Instant</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See exactly where AI saves your business money
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Enter your website URL and get a quantified AI opportunity snapshot in 2–3 minutes.
              Real savings estimates with the math shown — not generic advice.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "5 AI maturity scores benchmarked against your industry",
                "Top automation opportunities ranked by annual savings",
                "Full labor math: hours × rate × automation ceiling",
                "Implementation roadmap with specific tool recommendations",
                "PDF report delivered to your inbox",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/50 hover:text-white text-sm underline underline-offset-4 transition-colors"
            >
              Or book a free strategy call directly →
            </a>
          </div>

          {/* Right: CTA card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Free AI Opportunity Snapshot</h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              2–3 minutes · No credit card · PDF delivered to your inbox
            </p>

            <a
              href="https://audit.wexadvisory.com/audit"
              className="block w-full py-4 rounded-xl bg-gold text-navy font-bold text-base hover:bg-gold-muted transition-colors mb-4"
            >
              Analyze My Business →
            </a>

            <div className="border-t border-white/10 pt-5 mt-2">
              <p className="text-white/30 text-xs mb-3">Prefer to talk first?</p>
              <a
                href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl border border-white/20 text-white/70 hover:border-gold/50 hover:text-white font-semibold text-sm transition-colors"
              >
                Book a Free Strategy Call
              </a>
              <p className="text-white/20 text-xs mt-2">30 min · No sales pressure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
