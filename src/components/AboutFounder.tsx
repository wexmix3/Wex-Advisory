import Image from "next/image";

export default function AboutFounder() {
  return (
    <section id="about" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Who&apos;s behind the analysis
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Photo */}
            <div className="md:w-56 flex-shrink-0">
              <div className="relative w-full h-64 md:h-full min-h-[240px]">
                <Image
                  src="/headshot.jpg"
                  alt="Max Wexley"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 px-8 py-8 flex flex-col justify-center">
              <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Founder
              </p>
              <h3 className="text-white text-2xl font-bold mb-1">Max Wexley</h3>
              <p className="text-white/40 text-sm mb-5">New York City</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                I&apos;m a finance analyst by day and a builder by night. I built Wex Advisory
                because competitive intelligence was either out of reach for small businesses — locked
                behind $10,000 retainers — or too shallow to be useful.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Every report I deliver is one I&apos;d want to receive myself: specific, actionable,
                and grounded in real data — not guesswork. The goal is simple: give growing companies
                the same quality of insight that larger competitors take for granted.
              </p>
              <a
                href="https://www.linkedin.com/in/max-wexley"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:text-gold/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
