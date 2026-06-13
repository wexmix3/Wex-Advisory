"use client";

import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          {/* Double-V monogram: outer ∨ = W (white), inner ∧ = A (gold) */}
          <svg width="52" height="56" viewBox="0 0 110 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="5,12 55,95 105,12"
              stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="22,103 55,20 88,103"
              stroke="#C9A84C" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex flex-col leading-none gap-1">
            <span className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>Wex</span>
            <span className="text-[#C9A84C] text-[10px] font-light tracking-[0.35em] uppercase">Advisory</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/60">
          <a href="/#competitive-analysis" className="hover:text-white transition-colors">Services</a>
          <a href="/#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="/#about" className="hover:text-white transition-colors">About</a>
          <a href="/work" className="hover:text-white transition-colors">Work</a>
          <a
            href="/audit"
            className="hover:text-white transition-colors"
          >
            Free AI Audit
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/#contact"
            className="px-4 py-2.5 rounded-lg border border-white/20 text-white/70 hover:border-gold/50 hover:text-white font-semibold text-sm transition-colors"
          >
            Contact
          </a>
          <a
            href="/audit"
            className="px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
          >
            Free AI Audit →
          </a>
        </div>

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
          <a href="/#competitive-analysis" onClick={() => setMenuOpen(false)} className="hover:text-white">Services</a>
          <a href="/#pricing" onClick={() => setMenuOpen(false)} className="hover:text-white">Pricing</a>
          <a href="/#about" onClick={() => setMenuOpen(false)} className="hover:text-white">About</a>
          <a href="/work" onClick={() => setMenuOpen(false)} className="hover:text-white">Work</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="hover:text-white">Contact</a>
          <a href="/audit" onClick={() => setMenuOpen(false)} className="hover:text-white">Free AI Audit</a>
          <a
            href="/audit"
            className="mt-2 inline-block px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-center"
          >
            Free AI Audit →
          </a>
        </div>
      )}
    </header>
  );
}
