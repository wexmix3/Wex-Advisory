import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0F1F3D",
          padding: "80px 88px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold accent bar */}
        <div style={{ width: "56px", height: "4px", backgroundColor: "#C8A84B", marginBottom: "40px" }} />

        {/* Wordmark */}
        <div style={{ fontSize: "18px", color: "#C8A84B", letterSpacing: "0.25em", marginBottom: "28px", fontWeight: 700 }}>
          WEX ADVISORY
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            color: "#FFFFFF",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "28px",
            maxWidth: "880px",
          }}
        >
          Know exactly where you stand against your competition.
        </div>

        {/* Sub */}
        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.45)", maxWidth: "700px", lineHeight: 1.4 }}>
          Competitor deep-dives, traffic benchmarks, and strategic recommendations — starting at $149.
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: "14px" }}>
          <div style={{ width: "8px", height: "8px", backgroundColor: "#C8A84B", borderRadius: "50%" }} />
          <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            wexadvisory.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
