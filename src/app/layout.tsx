import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://www.wexadvisory.com";

export const metadata: Metadata = {
  title: "AI Consulting for Small Business | Wex Advisory",
  description:
    "Wex Advisory helps small businesses save time with AI consulting and automation. No tech team needed. Get your free AI Snapshot today.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Consulting for Small Business | Wex Advisory",
    description:
      "Cut costs and save time with AI-powered consulting and automation — no tech team required. Flat-fee reports starting at $149.",
    url: SITE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Wex Advisory — AI Consulting for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting for Small Business | Wex Advisory",
    description:
      "Cut costs and save time with AI-powered consulting and automation. Flat-fee reports starting at $149. No tech team needed.",
    images: ["/api/og"],
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Wex Advisory",
  url: SITE_URL,
  description:
    "AI consulting and automation for small businesses. Competitor analysis, AI readiness audits, and automation strategy — starting at $149.",
  priceRange: "$149–$599",
  areaServed: "US",
  founder: {
    "@type": "Person",
    name: "Max Wexley",
    url: "https://www.linkedin.com/in/max-wexley",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "maxwexley@wexadvisory.com",
    contactType: "customer service",
  },
};

const jsonLdServices = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free AI Snapshot",
    description:
      "A free AI readiness audit that analyzes your business and delivers a PDF report with maturity scores, automation opportunities, and a phased implementation roadmap.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Wex Advisory" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Competitive Intelligence Report",
    description:
      "A 13-page AI-powered competitor analysis report with real traffic data, 5 competitor deep-dives, market sizing, and actionable recommendations — generated in ~60 seconds.",
    offers: { "@type": "Offer", price: "149", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Wex Advisory" },
  },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an AI consultant do for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI consultant analyzes your business operations to identify where artificial intelligence can save time and money — recommending specific tools, workflows, and automations tailored to your team size and industry. Wex Advisory focuses exclusively on high-ROI opportunities backed by labor math, not generic recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AI consulting cost for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wex Advisory offers a free AI Snapshot audit, competitive analysis reports starting at $149 flat-fee, and ongoing AI consulting at $150/hr with an optional $300/month subscription for continued support.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI consulting worth it for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most small businesses, even one automated workflow can save 5–15 hours per week. Wex Advisory's audit identifies your highest-ROI opportunities with specific savings estimates — so you know the return before committing.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a free AI audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free AI Snapshot analyzes your business website and online presence, then delivers a PDF report with 5 AI maturity scores, automation opportunities ranked by annual savings, labor cost math, and a phased implementation roadmap with specific tool recommendations.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        {jsonLdServices.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
