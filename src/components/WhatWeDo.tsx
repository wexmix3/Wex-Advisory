const COMP_FEATURES = [
  {
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Competitor Deep-Dives",
    desc: "Traffic benchmarks, keyword gaps, review velocity, pricing, and online presence — all benchmarked against your own position.",
  },
  {
    iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Market Intelligence",
    desc: "Industry size, growth trajectory, and macro trends grounded in real data — so you know where the market is heading, not just where it's been.",
  },
  {
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    title: "Ranked Action Plan",
    desc: "3–5 specific, budget-calibrated actions you can take this quarter — tied to real gaps in your competitive position, not generic advice.",
  },
];

const AUTO_FEATURES = [
  {
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Process Audit",
    desc: "I map out how your team currently spends its time and identify which tasks are the best candidates for automation — quick wins first.",
  },
  {
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    title: "AI Tool Setup",
    desc: "I implement the right tools for your situation — whether that's automated customer follow-ups, report generation, scheduling, or content workflows.",
  },
  {
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "No Tech Team Required",
    desc: "Everything I build is designed for normal people to use and maintain. You don't need a developer on staff — that's the whole point.",
  },
];

function FeatureCard({ iconPath, title, desc }: { iconPath: string; title: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-gold/30 transition-colors">
      <div className="text-gold mb-5">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
        </svg>
      </div>
      <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section id="services" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Services
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Two ways I can help your business
        </h2>
        <p className="text-white/50 text-base max-w-xl mb-16">
          Both services are built around the same idea: give small and mid-market businesses access to tools
          and insights that used to be reserved for companies with much bigger budgets.
        </p>

        {/* Service 1: Competitive Analysis */}
        <div id="competitive-analysis" className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Competitive Analysis</h3>
              <p className="text-white/40 text-sm">Full intelligence report · Delivered as a PDF · Starting at $149</p>
            </div>
          </div>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
            You tell me your business, your city, and who you're up against. I deliver a structured report
            that shows you exactly where you stand — and what to do about it. No fluff, no filler.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {COMP_FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href="#sample-report"
              className="inline-block px-6 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
            >
              See What's in a Report →
            </a>
            <a
              href="#pricing"
              className="inline-block px-6 py-3 rounded-xl border border-white/20 text-white/60 font-semibold text-sm hover:border-gold/40 hover:text-gold transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-16" />

        {/* Service 2: Workflow Automation */}
        <div id="workflow-automation">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">Workflow Automation</h3>
              <p className="text-white/40 text-sm">Custom scope · Priced per project · Contact me to start</p>
            </div>
          </div>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-8">
            Most small businesses have at least a few tasks that are eating up hours every week and
            could be handled automatically. I find those tasks, build the tools, and hand them off
            to you ready to run — no ongoing developer relationship needed.
          </p>
          <div className="grid md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3">
              <FeatureCard {...AUTO_FEATURES[0]} />
            </div>
            <div className="md:col-span-2 grid gap-6">
              <FeatureCard {...AUTO_FEATURES[1]} />
              <FeatureCard {...AUTO_FEATURES[2]} />
            </div>
          </div>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
            >
              Tell Me About Your Business →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
