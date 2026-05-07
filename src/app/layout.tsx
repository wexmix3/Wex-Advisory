import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.wexadvisory.com";

export const metadata: Metadata = {
  title: "Wex Advisory — Competitor Intelligence for Small Business",
  description:
    "Professional competitive analysis, priced for small business. Real traffic data, competitor deep-dives, and actionable strategy delivered within 24 hours.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Wex Advisory — Competitor Intelligence for Small Business",
    description:
      "Know exactly where you stand. We deliver a full intelligence report — traffic benchmarks, competitor deep-dives, and actionable strategy — starting at $149.",
    url: SITE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wex Advisory — Competitor Intelligence for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wex Advisory — Competitor Intelligence for Small Business",
    description:
      "Know exactly where you stand. Competitor deep-dives, traffic benchmarks, and actionable strategy — starting at $149.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Wex Advisory",
  url: SITE_URL,
  description:
    "Professional competitive intelligence for small and growing businesses. Competitor deep-dives, traffic benchmarks, and actionable strategy — starting at $149.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
