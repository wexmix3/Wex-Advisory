"use client";

// Update TOOL_URL once the competitor-analysis tool is deployed
const TOOL_URL = "https://wexadvisory.com/tool";

const TIERS = [
  {
    name: "Starter",
    price: "$149",
    cadence: "one-time",
    badge: null,
    highlight: false,
    description: "Get a comprehensive intelligence report on your top competitors — ready in under 60 seconds.",
    features: [
      "Full competitive intelligence report",
      "3 competitor deep-dives",
      "Real traffic & keyword data",
      "Market size estimate",
      "Budget-calibrated recommendations",
      "Professional-grade PDF download",
    ],
    cta: "Get Starter Report",
    href: TOOL_URL,
  },
  {
    name: "Professional",
    price: "$299",
    cadence: "one-time",
    badge: "Most Popular",
    highlight: true,
    description: "Everything in Starter, plus a deeper competitive analysis and a 1:1 debrief with Max to walk through the findings.",
    features: [
      "Everything in Starter",
      "5 competitor deep-dives",
      "Position score /10 vs. competitors",
      "Gap analysis & opportunity map",
      "30-min debrief call with Max",
      "Follow-up Q&A via email",
    ],
    cta: "Get Professional Report",
    href: TOOL_URL,
  },
  {
    name: "Monthly Retainer",
    price: "$599",
    cadence: "/month",
    badge: null,
    highlight: false,
    description: "Stay ahead month over month with ongoing reports and a competitive monitoring brief delivered to your inbox.",
    features: [
      "2 full reports per month",
      "Monthly competitive monitoring brief",
      "Priority turnaround",
      "Dedicated Slack or email channel",
      "Quarterly strategy check-in",
      "White-label option available",
    ],
    cta: "Start Retainer",
    href: "#contact",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Pricing
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Transparent pricing, no surprises
        </h2>
        <p className="text-white/50 text-base max-w-xl mb-14">
          Every report is powered by real data and built to the same professional standard.
          Need something custom?{" "}
          <a href="#contact" className="text-gold hover:underline">
            Contact us
          </a>{" "}
          for enterprise and custom scope engagements.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
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
                <p
                  className={`text-xs font-bold tracking-widest uppercase mb-2 ${
                    tier.highlight ? "text-navy/60" : "text-gold"
                  }`}
                >
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
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-sm ${
                      tier.highlight ? "text-navy/80" : "text-white/70"
                    }`}
                  >
                    <span className={`mt-0.5 font-bold flex-shrink-0 ${tier.highlight ? "text-navy" : "text-gold"}`}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
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

        {/* Custom engagement */}
        <div className="mt-8 border border-white/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold mb-1">Custom Engagement</p>
            <p className="text-white/50 text-sm">
              Multi-location analysis, M&amp;A prep, franchise intelligence, or a fully custom scope.
              We scope it together — you get a fixed-fee proposal.
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors whitespace-nowrap"
          >
            Contact Us →
          </a>
        </div>

        <p className="text-center text-white/20 text-xs mt-8">
          ✓ Powered by Claude AI · ✓ Real traffic data via DataForSEO · ✓ Secured by Stripe · ✓ Reports delivered as professional PDFs
        </p>
      </div>
    </section>
  );
}
