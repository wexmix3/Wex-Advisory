export default function Hero() {
  return (
    <section className="min-h-screen bg-navy flex flex-col justify-center pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Eyebrow */}
        <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-6">
          AI-Powered Business Consulting
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Give your business<br />
          the edge it{" "}
          <span className="text-gold">deserves.</span>
        </h1>

        {/* Subhead */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          I help small businesses understand their competition and cut wasted time through AI-powered
          automation — without needing a tech team or a big budget.
        </p>

        {/* Service pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="#competitive-analysis"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Competitive Analysis
          </a>
          <a
            href="#workflow-automation"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-gold hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Workflow Automation
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white/50 font-semibold text-sm hover:border-white/30 hover:text-white/70 transition-colors"
          >
            Get in Touch →
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap gap-6 text-white/30 text-xs">
          <span>✓ Backed by real data — not guesswork</span>
          <span>✓ No tech team required</span>
          <span>✓ Flat-fee reports — no surprise invoices</span>
          <span>✓ Results delivered in plain English</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-12 md:mt-16">
        <a href="#services" className="text-white/20 hover:text-white/40 transition-colors animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
