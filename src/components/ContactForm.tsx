"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
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
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/60 transition-colors";

  return (
    <section id="contact" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14">
          {/* Left: copy */}
          <div>
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let&apos;s talk about your competitive position
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Whether you&apos;re ready to buy a report or want to talk through a custom
              engagement, reach out. We typically respond within 24 hours.
            </p>

            <div className="space-y-4 text-sm text-white/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>maxmwexley@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Response within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {state === "success" ? (
              <div className="bg-white/5 border border-gold/30 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Message sent</h3>
                <p className="text-white/50 text-sm">
                  Thanks — we&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      className={inputClass}
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@acmecorp.com"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your business and what you'd like to know about your competition..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>

                {state === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong — please email us directly at maxmwexley@gmail.com</p>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full py-4 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted disabled:opacity-50 transition-colors"
                >
                  {state === "submitting" ? "Sending…" : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
