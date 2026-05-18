"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export default function FreeSnapshot() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ business: "", email: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/free-snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/60 transition-colors";

  return (
    <section id="free-snapshot" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-bold tracking-wider uppercase">Free</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get a free snapshot of your top competitor
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Enter your business name and email below. I&apos;ll personally put together a quick
              1-page competitive snapshot — traffic estimate, top keywords, and one thing they&apos;re
              doing that you&apos;re probably not. No charge, no pitch.
            </p>
            <ul className="space-y-3">
              {[
                "Traffic estimate for your top competitor",
                "Their top 3 search keywords",
                "One gap you can exploit right now",
                "Delivered within 24 hours by email",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {state === "success" ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">You&apos;re on the list</h3>
                <p className="text-white/50 text-sm">
                  I&apos;ll have your competitor snapshot ready within 24 hours.
                  Check your inbox — it&apos;ll come from maxwexley@wexadvisory.com.
                </p>
              </div>
            ) : (
              <>
                <p className="text-white font-semibold mb-1">Claim your free snapshot</p>
                <p className="text-white/40 text-sm mb-6">Takes 30 seconds. No credit card.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                      Your business name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Plumbing"
                      className={inputClass}
                      value={form.business}
                      onChange={(e) => setForm((p) => ({ ...p, business: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                      Your email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@yourbusiness.com"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-red-400 text-sm">
                      Something went wrong — email me directly at maxwexley@wexadvisory.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full py-4 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted disabled:opacity-50 transition-colors"
                  >
                    {state === "submitting" ? "Sending…" : "Send Me My Free Snapshot →"}
                  </button>
                  <p className="text-white/20 text-xs text-center">
                    I don&apos;t sell your info or add you to any list without asking.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
