import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Wex Advisory",
  description: "Terms and conditions for Wex Advisory services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-navy px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gold text-sm hover:underline">← Back to Wex Advisory</Link>

        <h1 className="text-3xl font-bold text-white mt-8 mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: May 6, 2025</p>

        <div className="space-y-8 text-white/70 text-base leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Services</h2>
            <p>
              Wex Advisory provides competitive intelligence reports and related advisory services
              to businesses. The scope, deliverables, and fees for each engagement are agreed upon
              prior to commencement of work.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Payment</h2>
            <p>
              Payment is due prior to delivery of reports unless otherwise agreed in writing.
              All fees are stated in US dollars. We reserve the right to update our pricing at any
              time; pricing changes will not affect confirmed engagements.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Refund Policy</h2>
            <p>
              Because each report requires significant research and analysis time, we do not offer
              refunds after delivery. If you have concerns about the deliverable, contact us within
              48 hours of receipt and we will work to address them. If you have questions about scope
              before ordering, please contact us first.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Confidentiality</h2>
            <p>
              All information you provide — including your company name, competitive context, and
              business details — is kept strictly confidential. We do not share client information
              with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Intellectual Property</h2>
            <p>
              Upon full payment, you receive a non-exclusive license to use the report for your
              internal business purposes. Reports may not be resold or redistributed without written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Accuracy of Information</h2>
            <p>
              Reports are based on publicly available data and third-party data sources. While we
              strive for accuracy, we do not guarantee that all data is complete or error-free.
              Reports reflect conditions at the time of research and should not be construed as
              legal, financial, or investment advice.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Limitation of Liability</h2>
            <p>
              Wex Advisory&apos;s liability for any claim arising from a service engagement is limited
              to the fees paid for that engagement. We are not liable for indirect, consequential, or
              incidental damages.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of New York. Any disputes will be
              resolved in the courts of New York County.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
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
