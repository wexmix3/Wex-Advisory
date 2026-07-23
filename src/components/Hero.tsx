import { Check, BarChart3, Zap, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-dvh bg-navy glow-navy flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-6">
          AI-Powered Business Consulting
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          AI Consulting for Small Businesses —{" "}
          <span className="text-gold">Cut Costs and Save Time</span> Without a Tech Team.
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
            <BarChart3 className="w-4 h-4" strokeWidth={2} />
            Competitive Analysis
          </a>
          <a
            href="#workflow-automation"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-gold hover:text-gold transition-colors"
          >
            <Zap className="w-4 h-4" strokeWidth={2} />
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
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#C8A84B] flex-shrink-0" /> Built for businesses across any industry</span>
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#C8A84B] flex-shrink-0" /> Backed by real data — not guesswork</span>
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#C8A84B] flex-shrink-0" /> Flat-fee reports — no surprise invoices</span>
          <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-[#C8A84B] flex-shrink-0" /> Results delivered in plain English</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center mt-12 md:mt-16">
        <a href="#services" className="text-white/20 hover:text-white/40 transition-colors animate-bounce">
          <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
