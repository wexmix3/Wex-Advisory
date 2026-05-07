type Pillar = {
  iconPath: string;
  title: string;
  desc: string;
};

const PILLARS: Pillar[] = [
  {
    iconPath:
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Competitor Profiles",
    desc: "Deep-dives on your top competitors — website traffic, SEO positioning, review velocity, pricing, and online presence benchmarked against yours.",
  },
  {
    iconPath:
      "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Market Intelligence",
    desc: "Industry size, growth trajectory, and macro trends — grounded in real data with CAGR estimates, emerging players, and market dynamics you need to plan ahead.",
  },
  {
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Strategic Recommendations",
    desc: "3–5 immediate, budget-calibrated actions ranked by impact. No generic advice — every recommendation is tied to a specific gap in your competitive position.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="services" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          What We Do
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Everything you need to outmaneuver the competition
        </h2>
        <p className="text-white/50 text-base max-w-xl mb-14">
          One report. Every edge you need to know where you stand — and exactly what to do about it.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold/30 transition-colors"
            >
              <div className="text-gold mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={p.iconPath} />
                </svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
