import { BarChart3, Compass, ListChecks, ClipboardList, Zap, Users, type LucideIcon } from "lucide-react";

const COMP_FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: BarChart3,
    title: "Competitor Deep-Dives",
    desc: "Traffic benchmarks, keyword gaps, review velocity, pricing, and online presence — all benchmarked against your own position.",
  },
  {
    icon: Compass,
    title: "Market Intelligence",
    desc: "Industry size, growth trajectory, and macro trends grounded in real data — so you know where the market is heading, not just where it's been.",
  },
  {
    icon: ListChecks,
    title: "Ranked Action Plan",
    desc: "3–5 specific, budget-calibrated actions you can take this quarter — tied to real gaps in your competitive position, not generic advice.",
  },
];

const AUTO_FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ClipboardList,
    title: "Process Audit",
    desc: "I map out how your team currently spends its time and identify which tasks are the best candidates for automation — quick wins first.",
  },
  {
    icon: Zap,
    title: "AI Tool Setup",
    desc: "I implement the right tools for your situation — whether that's automated customer follow-ups, report generation, scheduling, or content workflows.",
  },
  {
    icon: Users,
    title: "No Tech Team Required",
    desc: "Everything I build is designed for normal people to use and maintain. You don't need a developer on staff — that's the whole point.",
  },
];

function FeatureCard({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="bg-white/[0.04] rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
      <div className="text-gold mb-5">
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureRow({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 py-5 border-t border-white/[0.06] first:border-t-0 first:pt-0">
      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-white font-bold text-base mb-1.5">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
      </div>
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
              <BarChart3 className="w-5 h-5 text-gold" strokeWidth={1.5} />
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

        {/* Service 2: Workflow Automation — inline-list treatment so this
            section reads differently from the 3-card grid above */}
        <div id="workflow-automation">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-gold" strokeWidth={1.5} />
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
          <div className="max-w-2xl">
            {AUTO_FEATURES.map((f) => <FeatureRow key={f.title} {...f} />)}
          </div>
          <div className="mt-8">
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
