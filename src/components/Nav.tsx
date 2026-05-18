"use client";

import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-gold text-sm font-bold tracking-[0.3em] uppercase">
          Wex Advisory
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#competitive-analysis" className="hover:text-white transition-colors">Competitive Analysis</a>
          <a href="#workflow-automation" className="hover:text-white transition-colors">Workflow Automation</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a
            href="https://www.linkedin.com/in/max-wexley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-block px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
        >
          Get Started →
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm text-white/70">
          <a href="#competitive-analysis" onClick={() => setMenuOpen(false)} className="hover:text-white">Competitive Analysis</a>
          <a href="#workflow-automation" onClick={() => setMenuOpen(false)} className="hover:text-white">Workflow Automation</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-white">Pricing</a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-white">About</a>
          <a
            href="https://www.linkedin.com/in/max-wexley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            LinkedIn ↗
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 inline-block px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-center">
            Get Started →
          </a>
        </div>
      )}
    </header>
  );
}
