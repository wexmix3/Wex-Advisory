"use client";

const TOOL_URL = "https://tool.wexadvisory.com";
const STRIPE_STARTER = TOOL_URL;
const STRIPE_PRO     = TOOL_URL;

const COMP_TIERS = [
  {
    name: "Starter",
    price: "$149",
    cadence: "one-time",
    badge: null,
    highlight: false,
    description: "A full competitive intelligence report delivered to your inbox within 24 hours.",
    features: [
      "3 competitor deep-dives",
      "Real traffic & keyword data",
      "Market size estimate",
      "Budget-calibrated recommendations",
      "Professional PDF download",
    ],
    cta: "Get Starter Report — $149",
    href: STRIPE_STARTER,
    external: STRIPE_STARTER !== "#contact",
  },
  {
    name: "Professional",
    price: "$299",
    cadence: "one-time",
    badge: "Most Popular",
    highlight: true,
    description: "Everything in Starter, plus a deeper analysis and a 30-min walkthrough call with Max.",
    features: [
      "5 competitor deep-dives",
      "Position score /10 vs. competitors",
      "Gap analysis & opportunity map",
      "30-min debrief call with Max",
      "Follow-up Q&A via email",
    ],
    cta: "Get Professional Report — $299",
    href: STRIPE_PRO,
    external: STRIPE_PRO !== "#contact",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Competitive Analysis Pricing ─────────────────────── */}
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Pricing
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Competitive Analysis
        </h2>
        <p className="text-white/50 text-base max-w-xl mb-14">
          Flat-fee, no surprises. Every report is built to the same professional standard — whether
          you order once or every month.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl">
          {COMP_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.highlight
                  ? "bg-gold text-navy"
                  : "bg-white/5 border border-white/10 text-white"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-navy text-gold text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${tier.highlight ? "text-navy/60" : "text-gold"}`}>
                  {tier.name}
                </p>
                <div className="flex items-end gap-1.5 mb-3">
                  <span className={`text-4xl font-extrabold ${tier.highlight ? "text-navy" : "text-white"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${tier.highlight ? "text-navy/50" : "text-white/40"}`}>
                    {tier.cadence}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${tier.highlight ? "text-navy/70" : "text-white/50"}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${tier.highlight ? "text-navy/80" : "text-white/70"}`}>
                    <span className={`mt-0.5 font-bold flex-shrink-0 ${tier.highlight ? "text-navy" : "text-gold"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                {...(tier.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all ${
                  tier.highlight
                    ? "bg-navy text-gold hover:bg-navy-light"
                    : "border border-gold text-gold hover:bg-gold hover:text-navy"
                }`}
              >
                {tier.cta}
              </a>

            </div>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mb-20">
          ✓ Real traffic data via DataForSEO · ✓ Delivered within 24 hours · ✓ Professional PDF format
        </p>

        {/* ── Workflow Automation Pricing ───────────────────────── */}
        <div className="border-t border-white/10 pt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Workflow Automation
          </h2>
          <p className="text-white/50 text-base max-w-xl mb-10">
            Every engagement is scoped individually. I work on an hourly basis to build what you need,
            with an optional monthly subscription to maintain and continue using what's been built.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Process Audit */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Step 1</p>
              <h3 className="text-white text-xl font-bold mb-3">Process Audit</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                I spend time understanding how your business actually operates — where time is lost,
                what's repetitive, and what tools you already have. You get a written report with
                prioritized automation opportunities and a rough cost estimate for each.
              </p>
              <ul className="space-y-2 mb-6">
                {["1-hour discovery call", "Written audit report", "Ranked list of automation opportunities", "Cost estimates for each"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-block w-full py-3.5 rounded-xl border border-gold text-gold hover:bg-gold hover:text-navy font-bold text-sm text-center transition-colors"
              >
                Get a Quote →
              </a>
            </div>

            {/* Implementation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Step 2</p>
              <h3 className="text-white text-xl font-bold mb-3">Implementation</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Once we've agreed on what to build, I handle everything — setup, testing, and
                handoff. You finish with a working system and a plain-language guide for running it
                yourself going forward.
              </p>
              <ul className="space-y-2 mb-6">
                {["Full build and configuration", "Testing and quality check", "Handoff documentation", "30-day support window"].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-gold font-bold flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-block w-full py-3.5 rounded-xl border border-gold text-gold hover:bg-gold hover:text-navy font-bold text-sm text-center transition-colors"
              >
                Start the Conversation →
              </a>
            </div>
          </div>

          {/* What businesses automate */}
          <div className="border border-white/10 rounded-2xl px-8 py-6">
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4">Common automation projects</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Customer follow-up sequences",
                "Lead intake and CRM updates",
                "Invoice and payment reminders",
                "Scheduling and appointment flows",
                "Social media content workflows",
                "Weekly reporting and summaries",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom engagement */}
        <div className="mt-8 border border-white/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold mb-1">Not sure which service fits?</p>
            <p className="text-white/50 text-sm">
              Send me a message with a quick description of your business and what's on your mind.
              I'll tell you straight whether I can help — and how.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors whitespace-nowrap"
          >
            Get in Touch →
          </a>
        </div>
      </div>
    </section>
  );
}
