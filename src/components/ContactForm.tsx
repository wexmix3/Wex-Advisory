"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Calendar, Check } from "lucide-react";

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
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/40 focus:border-[#C8A84B] transition-colors";

  return (
    <section id="contact" className="bg-[#071220] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14">
          {/* Left: copy */}
          <div>
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let&apos;s talk
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Whether you&apos;re interested in a report, want to explore automation,
              or just have a question — reach out. I read every message personally and
              respond within 24 hours.
            </p>

            <div className="space-y-4 text-sm text-white/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} />
                </div>
                <a href="mailto:maxwexley@wexadvisory.com" className="hover:text-white transition-colors">
                  maxwexley@wexadvisory.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} />
                </div>
                <a href="tel:+12242471940" className="hover:text-white transition-colors">
                  (224) 247-1940
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gold" strokeWidth={1.5} />
                </div>
                <span>Response within 24 hours</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Prefer to talk directly?</p>
              <a
                href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:text-gold/80 transition-colors"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                Book a free strategy call ↗
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {state === "success" ? (
              <div className="bg-white/[0.04] rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-6 h-6 text-gold" strokeWidth={2} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Message sent</h3>
                <p className="text-white/50 text-sm">
                  Thanks — I&apos;ll be in touch within 24 hours.
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
                  <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">What can I help with? *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me a bit about your business and what you're trying to figure out..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>

                {state === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong — email me at{" "}
                    <a href="mailto:maxwexley@wexadvisory.com" className="underline">
                      maxwexley@wexadvisory.com
                    </a>
                  </p>
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
