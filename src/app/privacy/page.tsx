import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Wex Advisory",
  description: "How Wex Advisory collects, uses, and protects your information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-navy px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gold text-sm hover:underline">← Back to Wex Advisory</Link>

        <h1 className="text-3xl font-bold text-white mt-8 mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: May 6, 2025</p>

        <div className="space-y-8 text-white/70 text-base leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Information We Collect</h2>
            <p>
              When you submit an inquiry through our contact form, we collect the information you
              provide — your name, company name, email address, and message. We do not collect
              payment information directly; payments are processed by third-party payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/60">
              <li>Respond to your inquiry and deliver the requested report or service</li>
              <li>Communicate with you about your engagement</li>
              <li>Send follow-up communications related to your service (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information with service providers who help us operate our business (such as email
              delivery services), subject to confidentiality obligations.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Data Retention</h2>
            <p>
              We retain your contact information for as long as necessary to fulfill the purpose for
              which it was collected, or as required by law. You may request deletion of your
              information at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Cookies and Analytics</h2>
            <p>
              This site may use basic analytics to understand traffic patterns. No personally
              identifiable information is collected through analytics tools. We do not use
              advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete the personal information we hold
              about you. To exercise these rights, contact us at{" "}
              <a href="mailto:maxwexley@wexadvisory.com" className="text-gold hover:underline">
                maxwexley@wexadvisory.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a href="mailto:maxwexley@wexadvisory.com" className="text-gold hover:underline">
                maxwexley@wexadvisory.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
