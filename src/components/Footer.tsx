export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-gold text-sm font-bold tracking-[0.25em] uppercase">Wex Advisory</p>
          <p className="text-white/30 text-xs mt-1">Competitor intelligence for growing businesses.</p>
        </div>

        <div className="flex flex-wrap gap-6 text-white/30 text-xs">
          <a href="#services" className="hover:text-white/60 transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-white/60 transition-colors">How It Works</a>
          <a href="#case-study" className="hover:text-white/60 transition-colors">Results</a>
          <a href="#pricing" className="hover:text-white/60 transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
          <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
          <a
            href="https://www.linkedin.com/in/max-wexley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>

        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Wex Advisory</p>
      </div>
    </footer>
  );
}
