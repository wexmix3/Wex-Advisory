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
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#case-study" className="hover:text-white transition-colors">Case Study</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <a
          href="#pricing"
          className="hidden md:inline-block px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
        >
          Get a Report →
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
          <a href="#services" onClick={() => setMenuOpen(false)} className="hover:text-white">Services</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-white">How It Works</a>
          <a href="#case-study" onClick={() => setMenuOpen(false)} className="hover:text-white">Case Study</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="hover:text-white">Pricing</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="mt-2 inline-block px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-center">
            Get a Report →
          </a>
        </div>
      )}
    </header>
  );
}
