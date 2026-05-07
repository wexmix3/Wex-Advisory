"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How quickly will I receive my report?",
    a: "Most reports are delivered within 24 hours of your request. For more complex engagements or industries with many competitors, I'll let you know upfront if it will take longer.",
  },
  {
    q: "What industries do you cover?",
    a: "Any industry with an online presence — coworking, retail, professional services, hospitality, SaaS, healthcare, and more. If your competitors have websites, I can analyze them.",
  },
  {
    q: "How is this different from Googling my competitors myself?",
    a: "The report pulls real traffic data (via DataForSEO), SEO gap analysis, review velocity, Google Business Profile health, and synthesizes it all into a prioritized action plan. It would take a full day of manual research to replicate what I deliver in a structured, print-ready PDF.",
  },
  {
    q: "Is my information kept confidential?",
    a: "Yes. Your company name, industry, and any details you share are used solely to produce your report. I don't share client information with third parties.",
  },
  {
    q: "What if I'm not satisfied with the report?",
    a: "If the report doesn't meet your expectations, reach out within 48 hours and I'll revise it. My goal is a deliverable you can act on immediately.",
  },
  {
    q: "Can I get a report for a competitor outside the US?",
    a: "Yes — the analysis works for any market with an online footprint. Just mention the target geography when you reach out.",
  },
  {
    q: "What does the Monthly Retainer include?",
    a: "Two full reports per month, ongoing monitoring of your competitive landscape, and priority turnaround. It's designed for businesses where the competitive landscape shifts frequently and staying current is a genuine advantage.",
  },
  {
    q: "Do you offer refunds?",
    a: "Because each report requires significant research time, I don't offer refunds after delivery. If you have concerns about scope before ordering, contact me first — I'm happy to answer questions.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-navy py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Common questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-white/80 hover:text-white transition-colors"
              >
                <span className="font-semibold text-sm">{faq.q}</span>
                <svg
                  className={`w-4 h-4 flex-shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-sm mt-10">
          Still have questions?{" "}
          <a href="#contact" className="text-gold hover:underline">
            Send me a message →
          </a>
        </p>
      </div>
    </section>
  );
}
