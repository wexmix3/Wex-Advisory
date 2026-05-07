export default function Hero() {
  return (
    <section className="min-h-screen bg-navy flex flex-col justify-center pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Eyebrow */}
        <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-6">
          Competitor Intelligence
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Know exactly where<br />
          you stand.{" "}
          <span className="text-gold">Beat the competition.</span>
        </h1>

        {/* Subhead */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Professional competitive intelligence, priced for small business. We deliver
          a full intelligence report — traffic benchmarks, competitor deep-dives,
          and actionable strategy — in under 60 seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#pricing"
            className="inline-block px-8 py-4 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors text-center"
          >
            Get Your Report — Starting at $149
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-gold hover:text-gold transition-colors text-center"
          >
            Book a Discovery Call
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap gap-6 text-white/30 text-xs">
          <span>✓ Powered by Claude AI</span>
          <span>✓ Real traffic data via DataForSEO</span>
          <span>✓ Trusted by growing companies</span>
          <span>✓ Delivered as a professional PDF</span>
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
