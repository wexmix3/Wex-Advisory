const STEPS = [
  {
    num: "01",
    title: "Submit your business",
    desc: "Tell us your company name, location, and the competitors you want analyzed. The whole intake takes under two minutes.",
  },
  {
    num: "02",
    title: "AI analyzes 50+ data points",
    desc: "Our engine pulls real traffic data, keyword rankings, review trends, and market dynamics across every competitor — simultaneously.",
  },
  {
    num: "03",
    title: "Receive your report",
    desc: "A professional PDF report lands with full competitor profiles, your competitive position score, and ranked action items — in under 60 seconds.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          How It Works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
          From zero to competitive clarity in 60 seconds
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line on desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-white/10 -translate-x-4 z-0" />
              )}

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl border border-gold/30 bg-gold/10 flex items-center justify-center mb-6">
                  <span className="text-gold font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
