import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI Opportunity Audit — Wex Advisory",
  description:
    "Submit your business URL and get a quantified AI savings report in 2–3 minutes. Real labor math, not generic advice. PDF delivered to your inbox.",
  openGraph: {
    title: "Free AI Opportunity Audit — Wex Advisory",
    description:
      "Submit your business URL and get a quantified AI savings report in 2–3 minutes. Real labor math, not generic advice.",
    url: "https://www.wexadvisory.com/audit",
    siteName: "Wex Advisory",
    type: "website",
  },
};

const AUDIT_URL = "https://audit.wexadvisory.com/audit";

const WHAT_YOU_GET = [
  "5 AI maturity scores benchmarked against your industry",
  "Top automation opportunities ranked by annual savings",
  "Full labor math: hours × rate × automation ceiling",
  "Implementation roadmap with specific tool recommendations",
  "PDF report delivered to your inbox",
];

const SCORES = [
  { label: "AI Readiness", score: 42, color: "#C8A84B" },
  { label: "Automation Opp.", score: 71, color: "#22c55e" },
  { label: "Data Visibility", score: 28, color: "#ef4444" },
  { label: "Revenue Accel.", score: 55, color: "#C8A84B" },
  { label: "Overall Maturity", score: 49, color: "#C8A84B" },
];

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const STEPS = [
  {
    num: "01",
    title: "Enter your business URL",
    desc: "Paste your website address and business email. 30 seconds — no signup, no credit card.",
  },
  {
    num: "02",
    title: "AI analyzes your operations",
    desc: "Claude reads your site, job postings, and reviews to identify exactly where AI can save you time and money.",
  },
  {
    num: "03",
    title: "PDF delivered to your inbox",
    desc: "A full report with specific tools, savings estimates, and a prioritized implementation roadmap — in 2–3 minutes.",
  },
];

function ScoreRing({ label, score, color }: { label: string; score: number; color: string }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="transform -rotate-90" width="64" height="64">
          <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
      </div>
      <div className="text-white/40 text-xs leading-tight max-w-[72px] mx-auto">{label}</div>
    </div>
  );
}

export default function AuditPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-[#071220] py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-bold tracking-wider uppercase">Free · 2–3 Minutes · No Credit Card</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              See exactly where AI saves<br />
              <span className="text-gold">your business money</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Enter your website URL and get a quantified AI opportunity report in 2–3 minutes.
              Real savings estimates with the math shown — not generic advice.
            </p>
            <a
              href={AUDIT_URL}
              className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-10 py-4 rounded-xl transition-colors shadow-lg shadow-gold/20"
            >
              Analyze My Business →
            </a>
            <p className="text-white/25 text-sm mt-4">
              PDF report emailed to you · Benchmarked against 12 industries
            </p>
          </div>
        </section>

        {/* What you get */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            {/* Left: copy */}
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What You Get</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                A full AI opportunity report — not a generic checklist
              </h2>
              <ul className="space-y-4">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                    <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: sample output card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <div className="text-white/30 text-xs font-medium uppercase tracking-wider mb-5">
                Sample Output — 25-person services firm
              </div>
              <div className="text-center mb-7">
                <div className="text-white/40 text-xs mb-1">Estimated Annual Savings Potential</div>
                <div className="text-gold text-4xl font-extrabold">$312K</div>
                <div className="text-white/30 text-xs mt-1">across 6 identified automation opportunities</div>
              </div>
              <div className="flex justify-center gap-4 flex-wrap">
                {SCORES.map((s) => (
                  <ScoreRing key={s.label} {...s} />
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/25">
                <span>Powered by Claude AI</span>
                <span>audit.wexadvisory.com</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[#071220] py-24 px-6 border-y border-white/10">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
              Three steps. Two minutes. Zero guesswork.
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {STEPS.map((step) => (
                <div key={step.num}>
                  <div className="w-14 h-14 rounded-2xl border border-gold/30 bg-gold/10 flex items-center justify-center mb-6">
                    <span className="text-gold font-bold text-lg">{step.num}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gold py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Ready to see your number?
            </h2>
            <p className="text-navy/65 text-base leading-relaxed mb-8">
              Free. No credit card. PDF in your inbox in under 3 minutes.
            </p>
            <a
              href={AUDIT_URL}
              className="inline-block bg-navy hover:bg-navy-light text-gold font-bold text-base px-10 py-4 rounded-xl transition-colors"
            >
              Analyze My Business →
            </a>
            <div className="mt-8 border-t border-navy/20 pt-6">
              <p className="text-navy/50 text-sm mb-3">Prefer to talk first?</p>
              <a
                href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy/70 hover:text-navy font-semibold text-sm underline underline-offset-4 transition-colors"
              >
                Book a free 30-min strategy call →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
