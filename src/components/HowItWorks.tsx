const COMP_STEPS = [
  {
    num: "01",
    title: "Tell me about your business",
    desc: "Send me your company name, location, industry, and a few competitors you want analyzed. Takes under two minutes.",
  },
  {
    num: "02",
    title: "I run the analysis",
    desc: "I pull real traffic data, keyword rankings, review trends, and market dynamics across every competitor you've named.",
  },
  {
    num: "03",
    title: "Report in your inbox",
    desc: "A structured PDF with full competitor profiles, your competitive position score, and ranked action items — within 24 hours.",
  },
];

const AUTO_STEPS = [
  {
    num: "01",
    title: "You describe the problem",
    desc: "Tell me what's taking too long or happening too inconsistently. No technical knowledge needed — just describe the pain in plain terms.",
  },
  {
    num: "02",
    title: "I map the solution",
    desc: "I identify what can realistically be automated and send you a plain-language proposal with a fixed price. You decide whether to proceed.",
  },
  {
    num: "03",
    title: "I build it and hand it off",
    desc: "I set everything up, test it, and walk you through how to run it. You don't need to touch a line of code.",
  },
];

function StepRow({ steps }: { steps: typeof COMP_STEPS }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, i) => (
        <div key={step.num} className="relative">
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
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#071220] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          How It Works
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
          Simple process, clear deliverables
        </h2>

        {/* Comp Analysis */}
        <div className="mb-14">
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">
            Competitive Analysis
          </p>
          <StepRow steps={COMP_STEPS} />
        </div>

        <div className="border-t border-white/10 mb-14" />

        {/* Workflow Automation */}
        <div>
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">
            Workflow Automation
          </p>
          <StepRow steps={AUTO_STEPS} />
        </div>
      </div>
    </section>
  );
}
