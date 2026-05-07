// Run: node scripts/generate-sample-report.js
// Output: public/sample-report.pdf

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// ── Colors ───────────────────────────────────────────────────────────────────
const NAVY  = "#0F1F3D";
const GOLD  = "#C8A84B";
const WHITE = "#FFFFFF";
const BODY  = "#1A1A2E";
const GRAY  = "#555566";
const LGRAY = "#9999AA";
const RULE  = "#E0E2EC";
const CREAM = "#F5F7FC";

// ── Geometry ─────────────────────────────────────────────────────────────────
const W = 612, H = 792, ML = 56, MR = 56;
const CW = W - ML - MR; // 500 pts

// ── Document ─────────────────────────────────────────────────────────────────
const doc = new PDFDocument({ size: "LETTER", margin: 0, info: {
  Title: "Competitive Intelligence Report — Wex Advisory (Sample)",
  Author: "Wex Advisory",
}});
doc.pipe(fs.createWriteStream(path.join(__dirname, "../public/sample-report.pdf")));

// ── Reusable helpers ─────────────────────────────────────────────────────────

function fullBg(color) { doc.rect(0, 0, W, H).fill(color); }

function pageHeader(section) {
  doc.rect(0, 0, W, 24).fill(CREAM);
  doc.moveTo(0, 24).lineTo(W, 24).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.fontSize(7).fillColor(LGRAY).font("Helvetica-Bold")
    .text(section.toUpperCase(), ML, 8, { characterSpacing: 0.7, lineBreak: false });
  doc.text("WEX ADVISORY  |  CONFIDENTIAL", 0, 8,
    { width: W - MR, align: "right", lineBreak: false });
  doc.y = 40;
}

function pageFooter(label) {
  doc.moveTo(ML, H - 32).lineTo(W - MR, H - 32).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.fontSize(7).fillColor(LGRAY).font("Helvetica")
    .text(label, ML, H - 22, { lineBreak: false });
  doc.font("Helvetica-Bold")
    .text("CONFIDENTIAL", 0, H - 22, { width: W - MR, align: "right", lineBreak: false });
}

function sectionTitle(num, title, sub) {
  const y0 = doc.y;
  doc.fontSize(78).fillColor("#EAECF4").font("Helvetica-Bold")
    .text(num, ML - 4, y0, { lineBreak: false });
  doc.fontSize(28).fillColor(NAVY).font("Helvetica-Bold")
    .text(title, ML, y0 + 46);
  if (sub) {
    doc.fontSize(10.5).fillColor(GRAY).font("Helvetica-Oblique")
      .text(sub, ML, doc.y + 2, { width: CW });
  }
  doc.moveDown(0.9);
}

function arrow(text, indent) {
  const x = ML + (indent || 0);
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text("›  " + text, x, doc.y, { width: CW - (indent || 0), lineGap: 1 });
  doc.moveDown(0.25);
}

function rule() {
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.y += 8;
}

function keyInsightBox(text) {
  const y = doc.y;
  doc.rect(ML, y, 3, 1).fill(GOLD); // placeholder; extended below
  doc.fontSize(7.5).fillColor(GOLD).font("Helvetica-Bold")
    .text("KEY INSIGHT", ML + 12, y + 1, { characterSpacing: 0.5 });
  doc.fontSize(10).fillColor(NAVY).font("Helvetica-Oblique")
    .text(text, ML + 12, doc.y + 3, { width: CW - 14, lineGap: 1 });
  const endY = doc.y + 4;
  doc.rect(ML, y, 3, endY - y).fill(GOLD);
  doc.y = endY + 10;
}

function advantageEntry(label, text) {
  doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
    .text(label.toUpperCase(), ML, doc.y, { characterSpacing: 0.5 });
  doc.y += 1;
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(text, ML, doc.y, { width: CW, lineGap: 1.5 });
  doc.y += 6; rule();
}

function gapEntry(priority, title, text) {
  const y = doc.y;
  const bg = priority === "HIGH" ? "#C0200A" : "#B86000";
  doc.rect(ML, y, 52, 16).fill(bg);
  doc.fontSize(8).fillColor(WHITE).font("Helvetica-Bold")
    .text(priority, ML, y + 4, { width: 52, align: "center", lineBreak: false });
  doc.fontSize(10).fillColor(NAVY).font("Helvetica-Bold")
    .text(title, ML + 60, y + 2, { width: CW - 60 });
  doc.y += 1;
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(text, ML + 60, doc.y, { width: CW - 60, lineGap: 1.5 });
  doc.y += 6; rule();
}

function recEntry(badge, title, text, target) {
  const y = doc.y;
  doc.rect(ML, y, 58, 16).fill(NAVY);
  doc.fontSize(7.5).fillColor(GOLD).font("Helvetica-Bold")
    .text(badge, ML, y + 4, { width: 58, align: "center", lineBreak: false });
  doc.fontSize(10).fillColor(NAVY).font("Helvetica-Bold")
    .text(title, ML + 66, y + 2, { width: CW - 66 });
  doc.y += 1;
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(text, ML + 66, doc.y, { width: CW - 66, lineGap: 1.5 });
  if (target) {
    doc.y += 3;
    doc.fontSize(9).fillColor(GOLD).font("Helvetica-Oblique")
      .text(target, ML + 66, doc.y, { width: CW - 66 });
  }
  doc.y += 8; rule();
}

// Two-column competitor card matching 25N report style
function competitorCard(name, category, url, desc, target, pricing, strengths, weaknesses) {
  const hY = doc.y;
  doc.rect(ML, hY, CW, 26).fill(NAVY);
  doc.fontSize(11).fillColor(WHITE).font("Helvetica-Bold")
    .text(name, ML + 10, hY + 8, { width: CW * 0.62, lineBreak: false });
  doc.fontSize(8.5).fillColor(GOLD).font("Helvetica-Bold")
    .text(category, 0, hY + 8, { width: W - MR - 10, align: "right", lineBreak: false });
  doc.y = hY + 32;

  doc.fontSize(8).fillColor(LGRAY).font("Helvetica").text(url, ML + 10, doc.y);
  doc.y += 4;
  doc.fontSize(9.5).fillColor(BODY).font("Helvetica")
    .text(desc, ML + 10, doc.y, { width: CW - 20, lineGap: 1.5 });
  doc.y += 3;
  doc.fontSize(8).fillColor(LGRAY)
    .text("Target: " + target + "  ·  Pricing: " + pricing, ML + 10, doc.y, { width: CW - 20 });
  doc.y += 10;

  // Two-column strengths / weaknesses
  const colW = (CW - 30) / 2;
  const rX = ML + 12 + colW + 8;

  doc.fontSize(8).fillColor(NAVY).font("Helvetica-Bold")
    .text("STRENGTHS", ML + 10, doc.y, { characterSpacing: 0.4, lineBreak: false });
  doc.text("WEAKNESSES", rX, doc.y - doc.currentLineHeight(), { characterSpacing: 0.4, lineBreak: false });
  doc.y += 4;

  const bulletStart = doc.y;

  // Left column — strengths
  let lY = bulletStart;
  strengths.forEach(s => {
    doc.fontSize(9).fillColor(GRAY).font("Helvetica")
      .text("›  " + s, ML + 10, lY, { width: colW - 4, lineGap: 1 });
    lY = doc.y + 3;
  });
  const lEnd = lY;

  // Right column — weaknesses (explicit Y positions; writes above doc.y intentionally)
  let rY = bulletStart;
  weaknesses.forEach(w => {
    doc.fontSize(9).fillColor(GRAY).font("Helvetica")
      .text("›  " + w, rX, rY, { width: colW - 4, lineGap: 1 });
    rY = doc.y + 3;
  });
  const rEnd = rY;

  doc.y = Math.max(lEnd, rEnd) + 8;
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.5).strokeColor(RULE).stroke();
  doc.y += 12;
}


// ════════════════════════════════════════════════════════════════════════════
// COVER
// ════════════════════════════════════════════════════════════════════════════
fullBg(NAVY);

doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("W E X   A D V I S O R Y", 0, 36,
    { width: W - MR, align: "right", characterSpacing: 2 });

// Gold accent bar
doc.rect(ML, 328, 44, 3).fill(GOLD);

doc.fontSize(36).fillColor(WHITE).font("Helvetica-Bold").text("KINETIC WORKSPACE", ML, 342);
doc.fontSize(14).fillColor("#AABBCC").font("Helvetica").text("Competitive Intelligence Report", ML, doc.y + 4);
doc.fontSize(10).fillColor(GRAY).font("Helvetica-Oblique")
  .text("Sample Report  ·  For Illustrative Purposes", ML, doc.y + 8);

// Meta row
doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
  .text("PREPARED BY", ML, 530)
  .text("DATE",        ML + 160, 530)
  .text("SUBJECT",     ML + 290, 530);
doc.fontSize(10).fillColor(WHITE).font("Helvetica")
  .text("Wex Advisory",      ML,       546)
  .text("May 2026",          ML + 160, 546)
  .text("Kinetic Workspace", ML + 290, 546);

doc.moveTo(ML, H - 40).lineTo(W - MR, H - 40).lineWidth(0.5).strokeColor("#FFFFFF1A").stroke();
doc.fontSize(7).fillColor("#FFFFFF44").font("Helvetica")
  .text("Prepared by Wex Advisory  |  Proprietary & Confidential", ML, H - 30, { lineBreak: false });
doc.text("CONFIDENTIAL", 0, H - 30, { width: W - MR, align: "right", lineBreak: false });


// ════════════════════════════════════════════════════════════════════════════
// EXECUTIVE BRIEF
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Executive Brief");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

doc.fontSize(18).fillColor(NAVY).font("Helvetica-Bold")
  .text("Kinetic Workspace", ML, doc.y);
doc.fontSize(9).fillColor(GOLD).font("Helvetica-Bold")
  .text("COMPETITIVE INTELLIGENCE", ML, doc.y + 2, { characterSpacing: 0.8 });
doc.y += 6;
doc.fontSize(8.5).fillColor(LGRAY).font("Helvetica")
  .text("Boutique coworking  ·  Mueller neighborhood, Austin TX  ·  May 2026", ML, doc.y);
doc.y += 14;

// Three-card row (Situation | Problem | Priority Action)
const cW = (CW - 16) / 3;
const cards = [
  { label: "SITUATION", color: RULE,
    text: "Kinetic Workspace is a single-location boutique coworking operator in Austin's high-growth Mueller corridor, differentiated by founder-led community and a 4.9-star Google rating." },
  { label: "PROBLEM", color: "#EDD",
    text: "Despite best-in-market member satisfaction, Kinetic lacks the organic search presence and digital acquisition infrastructure to fill capacity against better-funded national operators." },
  { label: "PRIORITY ACTION", color: "#EEF5E8",
    text: "Within 30 days, launch a review velocity campaign and fully optimize the GBP. These zero-cost actions directly close the largest gap between Kinetic and its top-ranked competitors." },
];
const cardsY = doc.y;
cards.forEach((c, i) => {
  const cx = ML + i * (cW + 8);
  doc.rect(cx, cardsY, cW, 110).fill(c.color === RULE ? CREAM : c.color);
  doc.rect(cx, cardsY, cW, 2).fill(NAVY);
  doc.fontSize(7.5).fillColor(NAVY).font("Helvetica-Bold")
    .text(c.label, cx + 10, cardsY + 10, { characterSpacing: 0.5 });
  doc.fontSize(9).fillColor(BODY).font("Helvetica")
    .text(c.text, cx + 10, cardsY + 24, { width: cW - 18, lineGap: 1.5 });
});
doc.y = cardsY + 118;

// Stat tiles
const stats = [
  { val: "~$980M", lbl: "Austin Metro\nFlex Market" },
  { val: "13–15%", lbl: "Industry CAGR\n2024–2028" },
  { val: "6 / 10", lbl: "Position Score\nvs. Competitors" },
  { val: "5", lbl: "Competitors\nAnalyzed" },
];
const tW = (CW - 12) / 4;
const tilesY = doc.y;
stats.forEach((s, i) => {
  const tx = ML + i * (tW + 4);
  doc.rect(tx, tilesY, tW, 52).stroke(); // just border
  doc.rect(tx, tilesY, tW, 52).fill(WHITE);
  doc.moveTo(tx, tilesY).lineTo(tx + tW, tilesY).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.moveTo(tx, tilesY + 52).lineTo(tx + tW, tilesY + 52).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.moveTo(tx, tilesY).lineTo(tx, tilesY + 52).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.moveTo(tx + tW, tilesY).lineTo(tx + tW, tilesY + 52).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
    .text(s.lbl, tx, tilesY + 8, { width: tW, align: "center" });
  doc.fontSize(18).fillColor(NAVY).font("Helvetica-Bold")
    .text(s.val, tx, tilesY + 28, { width: tW, align: "center", lineBreak: false });
});
doc.y = tilesY + 60;

// Key findings
doc.fontSize(9).fillColor(NAVY).font("Helvetica-Bold").text("KEY FINDINGS", ML, doc.y);
doc.y += 6;
[
  "Kinetic holds the market's strongest Google rating (4.9/5) but the lowest review count — velocity must accelerate to defend Map Pack position as the Mueller corridor grows.",
  "Industrious ranks #1 organically for 'coworking Austin' and 'private office Austin.' Kinetic does not appear in the top 20 results for either term.",
  "No competitor in the Mueller submarket has a fully optimized GBP with regular photo updates — a direct, zero-cost local SEO opportunity.",
  "Roughly half of 25N's member base is corporate/enterprise — a high-value segment Kinetic can systematically reach through direct B2B outreach at zero cost.",
].forEach(f => arrow(f));


// ════════════════════════════════════════════════════════════════════════════
// TABLE OF CONTENTS
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Table of Contents");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

doc.fontSize(22).fillColor(NAVY).font("Helvetica-Bold").text("Contents", ML, doc.y);
doc.y += 16;

const toc = [
  ["01", "Executive Summary",         "Key findings and most urgent opportunity"],
  ["02", "Company Overview",          "Products, positioning, and target market"],
  ["03", "Competitive Landscape",     "5 direct competitors analyzed"],
  ["04", "Competitive Advantages",    "Where Kinetic outperforms the market"],
  ["05", "Competitive Gaps",          "Vulnerabilities requiring strategic attention"],
  ["06", "Industry Dynamics",         "Market trends, size, and growth trajectory"],
  ["07", "Market Position Assessment","Overall standing vs. the competitive set"],
  ["08", "Strategic Recommendations", "Immediate actions and long-term vision"],
];
toc.forEach(([num, title, sub]) => {
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.y += 10;
  doc.fontSize(14).fillColor(GOLD).font("Helvetica-Bold")
    .text(num, ML, doc.y, { lineBreak: false });
  doc.fontSize(12).fillColor(NAVY).font("Helvetica-Bold")
    .text(title, ML + 36, doc.y - doc.currentLineHeight() * 0.85, { lineBreak: false });
  doc.fontSize(9).fillColor(GRAY).font("Helvetica")
    .text(sub, ML + 36, doc.y + 2, { width: CW - 36 });
  doc.y += 10;
});
doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();


// ════════════════════════════════════════════════════════════════════════════
// 01 — EXECUTIVE SUMMARY
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Executive Summary");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("01", "Executive Summary", "The headline findings and most urgent opportunity identified in this analysis.");

keyInsightBox("Fully optimize the Google Business Profile and launch a review velocity campaign within 30 days — neighborhood coworking searches are high-intent and hyper-local, and GBP is the highest-ROI zero-cost acquisition channel available to Kinetic Workspace.");

doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text("KEY FINDINGS", ML, doc.y);
doc.y += 6;
arrow("Kinetic generates an estimated ~$720K in annual revenue from a single boutique location, confirming viable unit economics in the fastest-growing corridor of Austin's flex market.");
arrow("The brand's authentic founder-led community and design-forward space are genuine differentiators versus corporate chains — but these advantages are insufficiently communicated in the digital channels where purchase decisions begin.");
arrow("Competitors Industrious and Common Desk dominate organic search in Austin and benefit from national brand recognition and enterprise sales infrastructure that Kinetic must counter with local SEO dominance and community depth.");
arrow("No direct competitor in the Mueller or East Austin submarket has a visible member referral program — first-mover advantage is available at near-zero cost.");


// ════════════════════════════════════════════════════════════════════════════
// 02 — COMPANY OVERVIEW
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Company Overview");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("02", "Company Overview", "Products, positioning, and target market.");

doc.fontSize(9.5).fillColor(BODY).font("Helvetica").lineGap(2)
  .text("Kinetic Workspace operates a design-forward boutique coworking space in Austin's Mueller neighborhood, serving independent professionals, remote workers, and small enterprise teams. Founded in 2020, the company differentiates on community warmth and boutique-quality design rather than commodity square footage. The model is purpose-built for professionals who want a professional environment close to home.", ML, doc.y, { width: CW });
doc.y += 12;

// Profile table
const profile = [
  ["COMPANY",          "Kinetic Workspace"],
  ["FOUNDED",          "2020"],
  ["LOCATION",         "Mueller Neighborhood, Austin, TX"],
  ["CAPACITY",         "~110 desks / 12 private offices"],
  ["MEMBERSHIP EST.",  "~85 active members"],
  ["EST. REVENUE",     "~$720K annually (derived from published pricing tiers and estimated occupancy)"],
  ["GOOGLE RATING",    "4.9 / 5  (31 reviews)"],
  ["WEBSITE TRAFFIC",  "~1,800 monthly visits (DataForSEO estimate)"],
];
profile.forEach(([k, v], i) => {
  const rowY = doc.y;
  doc.rect(ML, rowY, CW, 20).fill(i % 2 === 0 ? CREAM : WHITE);
  doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
    .text(k, ML + 10, rowY + 5, { width: 130, lineBreak: false });
  doc.fontSize(9).fillColor(BODY).font("Helvetica")
    .text(v, ML + 146, rowY + 5, { width: CW - 150, lineBreak: false });
  doc.y = rowY + 20;
});
doc.y += 12;

// Value prop
doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text("CORE VALUE PROPOSITION", ML, doc.y, { characterSpacing: 0.4 });
doc.y += 2;
const vpY = doc.y;
doc.rect(ML, vpY, 3, 1).fill(GOLD);
doc.fontSize(10).fillColor(NAVY).font("Helvetica-Oblique")
  .text("Kinetic delivers a boutique-quality work environment close to home, combining thoughtful design, founder-managed community, and a neighborhood identity that national chains cannot credibly replicate.", ML + 12, vpY, { width: CW - 14, lineGap: 1.5 });
const vpEnd = doc.y + 4;
doc.rect(ML, vpY, 3, vpEnd - vpY).fill(GOLD);
doc.y = vpEnd + 10;

// Products and target
const halfW = (CW - 10) / 2;
doc.fontSize(9).fillColor(NAVY).font("Helvetica-Bold").text("PRODUCTS & SERVICES", ML, doc.y, { characterSpacing: 0.3 });
doc.text("TARGET MARKET", ML + halfW + 10, doc.y - doc.currentLineHeight(), { characterSpacing: 0.3, lineBreak: false });
doc.y += 4;

const psY = doc.y;
[
  "Coworking desks — daily, part-time, and unlimited memberships",
  "Private offices — furnished, move-in-ready, conference room access included",
  "Meeting rooms — bookable by the hour, no membership required",
  "Event space — evenings and weekends, up to 60 attendees",
].forEach(s => {
  doc.fontSize(9).fillColor(GRAY).font("Helvetica")
    .text("›  " + s, ML, doc.y, { width: halfW - 4, lineGap: 1 });
  doc.y += 2;
});
const psEnd = doc.y;

let tmY = psY;
[
  "Mueller and East Austin residents who work remotely or on hybrid schedules",
  "Independent professionals, freelancers, and consultants seeking community",
  "Small enterprise teams (5–15 people) needing a satellite office close to home",
].forEach(s => {
  doc.fontSize(9).fillColor(GRAY).font("Helvetica")
    .text("›  " + s, ML + halfW + 10, tmY, { width: halfW - 4, lineGap: 1 });
  tmY = doc.y + 2;
});
doc.y = Math.max(psEnd, tmY);


// ════════════════════════════════════════════════════════════════════════════
// 03 — COMPETITIVE LANDSCAPE (page 1)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Competitive Landscape");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("03", "Competitive Landscape", "5 direct competitors operating in the Austin, TX flexible workspace market.");

doc.fontSize(9.5).fillColor(BODY).font("Helvetica").lineGap(2)
  .text("The Austin flex market has attracted significant institutional capital. Industrious (CBRE-backed), Common Desk (WeWork-acquired), and Regus (IWG plc) all operate within three miles of Kinetic's location. These operators carry substantially larger marketing budgets. The competitive battleground is shifting from amenity parity to member experience quality — terrain where Kinetic's boutique model holds latent advantage.", ML, doc.y, { width: CW });
doc.y += 14;

competitorCard(
  "Industrious — Domain Northside",
  "National premium challenger with enterprise muscle",
  "https://www.industriousoffice.com",
  "Industrious is a national premium coworking brand operating 200+ locations across major U.S. metros, backed by CBRE. It targets mid-market and enterprise clients with all-inclusive pricing, polished design, and strong corporate account management infrastructure.",
  "Enterprise and mid-market companies seeking managed flex space with predictable all-in costs",
  "All-inclusive monthly memberships and private office subscriptions; enterprise volume agreements",
  [
    "Ranks #1 organically for 'coworking Austin' and 'private office Austin'",
    "CBRE institutional backing and enterprise sales infrastructure",
    "All-inclusive pricing resonates with corporate real estate decision-makers",
    "Robust broker referral network generating passive lead flow",
  ],
  [
    "Lacks the community warmth and individual hospitality Kinetic provides",
    "Domain Northside location is 12 miles from Mueller — not a direct geographic competitor",
    "Premium pricing prohibitive for freelancers and small businesses",
  ]
);

competitorCard(
  "Common Desk — East 6th Street",
  "Established local challenger with national backing",
  "https://www.commondesk.com",
  "Common Desk is an Austin-born coworking brand acquired by WeWork, operating four DFW locations including East 6th Street, which overlaps with Kinetic's East Austin member base. It competes on community culture and local brand affinity.",
  "Freelancers, creatives, startups, and small teams seeking community-driven flex space",
  "Tiered monthly memberships for hot desks, dedicated desks, and private offices",
  [
    "Strong local Austin brand heritage and community loyalty",
    "Competitive pricing; largest member network in Austin at 4 locations",
    "5-star reviewed on East Austin searches; in Map Pack",
  ],
  [
    "WeWork ownership introduces brand uncertainty and culture dilution risk",
    "Less focus on suburban hospitality nuance — more urban-creative positioning",
    "Member turnover elevated post-acquisition",
  ]
);


// ════════════════════════════════════════════════════════════════════════════
// 03 — COMPETITIVE LANDSCAPE (page 2)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Competitive Landscape (Cont.)");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

doc.y = 40;

competitorCard(
  "Regus — Downtown Austin",
  "Global commodity flex-space incumbent",
  "https://www.regus.com",
  "Regus, operated by IWG plc, is the world's largest flex-office operator with thousands of global locations. It competes primarily on location density, price accessibility, and corporate account convenience rather than design or community experience.",
  "Corporate road warriors, cost-conscious SMBs, and enterprises needing global location coverage",
  "Flexible day passes, monthly memberships, and long-term private office leases; global enterprise accounts",
  [
    "Unmatched global location network enabling multi-city access for corporate clients",
    "Deep relationships with corporate travel and real estate procurement teams",
    "Lowest price point in the Austin market",
  ],
  [
    "Lowest Google rating in the competitive set (3.9 / 5)",
    "Widely perceived as sterile and transactional — no community or design investment",
    "No on-site hospitality or community management",
  ]
);

competitorCard(
  "Capital Factory",
  "Independent startup accelerator / coworking hybrid",
  "https://www.capitalfactory.com",
  "Capital Factory is an iconic Austin startup brand operating a coworking and accelerator hybrid downtown. It targets early-stage founders and investors, commanding strong PR presence and an annual SXSW activation.",
  "Early-stage founders, investors, and startup teams in Austin seeking network access",
  "Monthly coworking memberships and accelerator program fees",
  [
    "Iconic Austin startup brand with national investor recognition",
    "Investor and mentor network is a genuine, differentiated member benefit",
    "Strong organic media coverage and annual SXSW presence",
  ],
  [
    "Accelerator positioning creates self-selection — not targeting Kinetic's professional demographic",
    "Downtown location (Brazos St) is irrelevant for Mueller-area residents",
    "Community skews heavily toward early-stage tech; limited appeal to hybrid professionals",
  ]
);

competitorCard(
  "The Yard Austin — West 6th Street",
  "Independent boutique operator, 3 Texas locations",
  "https://www.theyardcoworking.com",
  "The Yard is an independent Texas boutique operator with a positioning similar to Kinetic's: authentic community, strong design, and competitive monthly pricing. It is the closest comparable to Kinetic in terms of size and identity.",
  "Independent professionals and small teams seeking a boutique community feel",
  "Monthly memberships for hot desks and private offices; day pass available",
  [
    "Boutique positioning and authentic community culture most similar to Kinetic",
    "Competitive pricing; strong Instagram presence with consistent visual identity",
    "Genuine independence — no corporate chain perception risk",
  ],
  [
    "Not in Map Pack despite a strong 4.7 / 5 rating — GBP underoptimized",
    "Lower review count than Kinetic (28 total); no review velocity program visible",
    "No B2B or enterprise offering visible on website",
  ]
);


// ════════════════════════════════════════════════════════════════════════════
// 04 — COMPETITIVE ADVANTAGES
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Competitive Advantages");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("04", "Competitive Advantages", "Where Kinetic Workspace outperforms the competitive set.");

doc.fontSize(9.5).fillColor(BODY).font("Helvetica").lineGap(2)
  .text("Kinetic's most durable advantages are structural — an authentic community identity and boutique design that national chains systemically under-invest in — but these advantages are currently insufficiently communicated in the digital channels where purchase decisions begin.", ML, doc.y, { width: CW });
doc.y += 14;

advantageEntry("Market-Leading Google Rating",
  "A 4.9 / 5 rating on 31 reviews is the highest in the Austin coworking competitive set. This is a direct signal of genuine member satisfaction and is the most credible trust marker available to a prospective member doing pre-tour research. No paid campaign can replicate it. The gap between Kinetic's rating quality and its review volume is the primary action item.");

advantageEntry("Authentic Founder-Led Community",
  "Kinetic's founder-managed model produces a member experience that corporate chains — staffed with rotating managers and regional oversight — cannot replicate at scale. Members are known by name, preferences are remembered, and community programming reflects genuine owner involvement. This creates loyalty and word-of-mouth that is the most cost-effective growth engine available.");

advantageEntry("Geographic Moat in Mueller Corridor",
  "No direct competitor operates a coworking space within a 1-mile radius of Kinetic's location. Mueller is a rapidly growing residential and professional corridor with 10,000+ housing units built since 2010. This geographic position creates a durable local SEO advantage for Mueller-specific search queries that none of the five competitors can credibly claim.");

advantageEntry("Boutique Design Quality",
  "Kinetic's design aesthetic consistently earns mention in member reviews and drives social media sharing. In a market where Regus represents the low end and Industrious the high-budget end, Kinetic occupies a distinctive boutique position — premium design quality without the enterprise price point. This differentiator is underutilized in Kinetic's online presence and content.");

advantageEntry("First-Mover Opportunity on Referral and B2B",
  "No competitor in the Mueller / East Austin submarket has a visible member referral program or B2B enterprise offering on their website. Kinetic can capture first-mover advantage on both fronts before better-funded competitors enter the submarket, creating switching costs that are social and relational rather than purely transactional.");


// ════════════════════════════════════════════════════════════════════════════
// 05 — COMPETITIVE GAPS
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Competitive Gaps");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("05", "Competitive Gaps", "Vulnerabilities requiring strategic attention.");

doc.fontSize(9.5).fillColor(BODY).font("Helvetica").lineGap(2)
  .text("Kinetic's primary vulnerabilities are in digital discoverability and systematic acquisition infrastructure — two gaps that directly limit occupancy growth and are addressable through disciplined organic tactics without paid media spend.", ML, doc.y, { width: CW });
doc.y += 14;

gapEntry("HIGH", "Low Organic Search Visibility",
  "Kinetic's estimated monthly web traffic (~1,800 visits) trails Common Desk (~12,400) and Industrious (~38,000) by a wide margin. The brand does not appear in the top 20 organic results for 'coworking Austin,' 'private office Austin,' or 'coworking Mueller' — the exact queries prospective members use. Zero blog or location-page content has been indexed.");

gapEntry("HIGH", "Slow Review Velocity",
  "Kinetic's 4.9 / 5 rating is the market's strongest, but 31 total reviews puts the Map Pack position at risk as the Mueller corridor densifies. Competitors average 72 reviews. Without a structured campaign to generate new reviews consistently, this gap widens over time and Google's algorithm will surface better-reviewed competitors above Kinetic.");

gapEntry("HIGH", "No Systematic Employer Outreach Program",
  "With enterprise teams representing a significant portion of the Austin flex market, there is clear opportunity for a structured local employer outreach program — approaching HR and operations leaders at Mueller and East Austin employers directly. This channel is effectively zero-cost but appears undeveloped. A single enterprise team-suite contract generates more revenue than 10–15 individual memberships.");

gapEntry("MEDIUM", "GBP Photo Count Below Competitive Set",
  "Kinetic's Google Business Profile has an estimated 18 photos — the competitive set averages 45. Google surfaces businesses with recent, frequent photo updates more prominently in Maps results. A consistent upload cadence (5+ photos/week for 60 days) is a zero-budget, high-impact action.");

gapEntry("MEDIUM", "No B2B or Enterprise Offer Visible Online",
  "Regus and Industrious both have dedicated enterprise and team-office landing pages. Kinetic has no visible B2B offering on its website, meaning corporate buyers who self-research before contacting a space will not find a relevant option — even if Kinetic can accommodate team suites today.");


// ════════════════════════════════════════════════════════════════════════════
// 06 — INDUSTRY DYNAMICS
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Industry Dynamics");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("06", "Industry Dynamics", "Market trends, size, and growth trajectory.");

doc.fontSize(9.5).fillColor(BODY).font("Helvetica").lineGap(2)
  .text("The U.S. flexible workspace market is estimated at $26B+ and growing at approximately 13–15% CAGR through 2028, fueled by the permanent institutionalization of hybrid work. Neighborhood and suburban markets are the fastest-growing sub-segment as companies implement hub-and-spoke real estate strategies — downsizing downtown HQs while adding near-home locations for distributed workforces. This structural shift is the single most important tailwind for Kinetic's positioning.", ML, doc.y, { width: CW });
doc.y += 10;

// Two stat boxes
const sb = [(CW - 10) / 2, (CW - 10) / 2];
const sbY = doc.y;
[
  { lbl: "MARKET SIZE", val: "$26B+ U.S. flexible workspace market. Suburban flex estimated to represent 25–30% of total demand and growing disproportionately." },
  { lbl: "GROWTH RATE", val: "13–15% CAGR through 2028, with the neighborhood coworking sub-segment outpacing urban at an estimated 18–20% annually." },
].forEach((s, i) => {
  const bx = ML + i * (sb[0] + 10);
  doc.rect(bx, sbY, sb[i], 58).fill(CREAM);
  doc.rect(bx, sbY, 3, 58).fill(GOLD);
  doc.fontSize(7.5).fillColor(GOLD).font("Helvetica-Bold")
    .text(s.lbl, bx + 12, sbY + 8, { characterSpacing: 0.5 });
  doc.fontSize(9.5).fillColor(BODY).font("Helvetica-Oblique")
    .text(s.val, bx + 12, sbY + 20, { width: sb[i] - 18, lineGap: 1.5 });
});
doc.y = sbY + 68;

doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text("KEY TRENDS & IMPLICATIONS", ML, doc.y, { characterSpacing: 0.4 });
doc.y += 8;

[
  ["Hub-and-Spoke Corporate Real Estate Adoption",
   "Enterprises replacing traditional HQ-only footprints with suburban satellite offices directly validate Kinetic's market thesis. HR and operations leaders at Austin employers are actively evaluating exactly this proposition — a direct outreach sequence can capture this demand at zero cost."],
  ["Hospitality-ification of Workspace",
   "Members increasingly evaluate coworking spaces on experience quality — service, design, community programming — rather than pure price or location. This directly advantages Kinetic's founder-managed model and boutique aesthetic over commodity competitors like Regus."],
  ["Rise of On-Demand and Day Pass Usage",
   "Non-member meeting room and day pass bookings are growing as hybrid workers need occasional professional space without commitment. Kinetic's no-membership-required meeting room option is well-positioned but needs stronger organic search visibility to capture this high-intent transactional demand."],
  ["Increased National Operator Suburban Expansion",
   "Industrious and Common Desk are actively expanding beyond downtown cores. Kinetic's current geographic moat is time-limited and must be converted into deep local loyalty and employer relationships before brand-funded competitors enter the Mueller corridor."],
  ["AI-Driven Freelance and Consultant Growth",
   "The proliferation of AI tools is enabling a new wave of independent consultants, fractional executives, and micro-agency operators — exactly the demographic most likely to value Kinetic's boutique community environment — expanding the addressable member pool in its existing market."],
].forEach(([title, text]) => {
  doc.fontSize(10).fillColor(NAVY).font("Helvetica-Bold").text("›  " + title, ML, doc.y);
  doc.y += 1;
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(text, ML + 16, doc.y, { width: CW - 16, lineGap: 1.5 });
  doc.y += 6;
});


// ════════════════════════════════════════════════════════════════════════════
// 07 — MARKET POSITION ASSESSMENT
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Market Position Assessment");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("07", "Market Position Assessment", "Overall competitive standing vs. the field.");

// Score badge
const scoreY = doc.y;
doc.circle(ML + 30, scoreY + 30, 30).fill(NAVY);
doc.fontSize(22).fillColor(GOLD).font("Helvetica-Bold")
  .text("6", ML, scoreY + 14, { width: 60, align: "center", lineBreak: false });
doc.fontSize(9).fillColor(WHITE).font("Helvetica")
  .text("/ 10", ML, scoreY + 38, { width: 60, align: "center", lineBreak: false });

// Score description
doc.fontSize(9).fillColor(NAVY).font("Helvetica-Bold")
  .text("BOUTIQUE COMMUNITY INCUMBENT — UNDER-INDEXED IN DIGITAL ACQUISITION", ML + 70, scoreY + 4, { width: CW - 70 });
doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
  .text("Kinetic earns a 6 out of 10 reflecting genuinely strong product-market fit — highest Google rating in the market, authentic community, and a defensible geographic moat — offset by meaningful organic search gaps and an underdeveloped acquisition infrastructure. The score reflects current position, not potential: with disciplined execution on organic and community channels, this score can move to 8 within 12 months.", ML + 70, doc.y + 2, { width: CW - 70, lineGap: 1.5 });
doc.y = Math.max(doc.y, scoreY + 66) + 12;

doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text("HEAD-TO-HEAD COMPARISON", ML, doc.y, { characterSpacing: 0.4 });
doc.y += 8;

const hth = [
  ["vs. Industrious",   "Kinetic loses on brand awareness and enterprise sales reach but wins decisively on authentic community warmth and on-site founder hospitality — a distinction that matters greatly to the Mueller professional who values being known by name, not just by desk number."],
  ["vs. Common Desk",   "Near-peer on community culture credentials, but Common Desk's WeWork ownership introduces organizational uncertainty that Kinetic can actively leverage as a stability and authenticity message to prospective East Austin members."],
  ["vs. Regus / IWG",   "Kinetic is categorically superior on experience quality and community. Competitive risk from Regus exists only for the most price-sensitive segment, which is not Kinetic's target customer."],
  ["vs. Capital Factory","Capital Factory's accelerator focus creates self-selection among early-stage founders — not Kinetic's target demographic. The two spaces address meaningfully different member needs."],
  ["vs. The Yard",      "The closest direct comparable in positioning. The Yard's GBP underoptimization and absence from Map Pack despite a strong rating gives Kinetic a clear benchmark: hold the Map Pack and build review velocity before The Yard does."],
];
hth.forEach(([label, text], i) => {
  const rowY = doc.y;
  if (i % 2 === 0) doc.rect(ML, rowY, CW, 1).fill(CREAM); // alternating subtle bg
  doc.fontSize(9).fillColor(NAVY).font("Helvetica-Bold")
    .text(label, ML, rowY, { width: 130, lineBreak: false });
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(text, ML + 140, rowY, { width: CW - 140, lineGap: 1.5 });
  doc.y += 8;
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.y += 8;
});


// ════════════════════════════════════════════════════════════════════════════
// 08 — STRATEGIC RECOMMENDATIONS (page 1 — immediate actions)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Strategic Recommendations");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

sectionTitle("08", "Strategic Recommendations", "Immediate actions and long-term strategic vision.");

doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text("IMMEDIATE ACTIONS (0–90 DAYS)", ML, doc.y, { characterSpacing: 0.3 });
doc.y += 8;

recEntry("0–90 days",
  "Launch a Review Velocity Campaign Across All GBP Locations",
  "Kinetic's 4.9-star rating is the market's strongest trust signal, but 31 total reviews puts the Map Pack position at risk as Mueller densifies. Target: 3+ new Google reviews per week. Tactic: send a personal email to every member immediately after a positive interaction — renewal, event, office upgrade — with a direct link to the Google review page. Automate via a simple CRM trigger. No budget required.",
  "90-day target: Reach 80+ Google reviews with a maintained 4.8+ rating; achieve top-3 Map Pack placement for 'coworking Mueller Austin' and 'coworking space near me' from the Mueller neighborhood."
);

recEntry("0–90 days",
  "Fully Optimize the Google Business Profile",
  "Kinetic's GBP has strong review quality but gaps in the signals Google uses to rank local results. Specific actions: (a) Upload 5+ new photos per week for 60 days — exterior, interior, private offices, events, members working. (b) Add and answer 10 Q&As directly on the GBP. (c) Update the GBP description to include 'Mueller,' 'East Austin,' and relevant neighborhood language. (d) Ensure all hours, parking, and accessibility details are complete. Zero budget required.",
  "90-day target: GBP photo count exceeds 60; all service categories and attributes complete; Q&A section seeded with 10+ entries."
);

recEntry("0–90 days",
  "Publish 4 Long-Tail SEO Location Pages",
  "Kinetic does not appear in the top 20 organic results for any primary search term prospective members use. The high-competition terms ('coworking Austin') are owned by Industrious. The opportunity is the long-tail: 'coworking Mueller Austin,' 'private office Mueller TX,' 'meeting room East Austin,' 'day pass coworking Austin.' Each has 50–400 monthly searches and minimal competition. A single 800-word page targeting each term, properly structured with schema markup, can realistically reach page one within 60–90 days.",
  "90-day target: 4 new location pages indexed; at least 2 ranking on page one for their target term; 50+ incremental organic sessions per page per month."
);

recEntry("0–90 days",
  "Identify and Engage Local Business Networks and Chambers",
  "Neighborhood markets run on local trust networks. Identify the top 3 business organizations, chambers, and professional groups in the Mueller / East Austin area — attend meetings, offer Kinetic as a meeting venue partner, and create a referral arrangement with membership directors. National operators cannot credibly pursue this channel. Positioning Kinetic as the professional home base for the local business community reinforces brand identity and generates consistent warm referrals.",
  "90-day target: Formal partnership or preferred-venue status with at least 2 local organizations; minimum 5 chamber-referred tour inquiries within the period."
);


// ════════════════════════════════════════════════════════════════════════════
// 08 — STRATEGIC RECOMMENDATIONS (page 2 — medium + long-term)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Strategic Recommendations (Cont.)");
pageFooter("Kinetic Workspace  —  Competitive Intelligence Report");

doc.y = 40;
doc.fontSize(9.5).fillColor(NAVY).font("Helvetica-Bold").text("MEDIUM-TERM INITIATIVES (3–18 MONTHS)", ML, doc.y, { characterSpacing: 0.3 });
doc.y += 8;

recEntry("3–18 MO",
  "Activate a Member Referral Program",
  "No competitor in Mueller or East Austin has a visible referral program — first-mover advantage is available. Proposed structure: any active member who refers a new member who signs a contract receives one month of membership credit. Referred members convert at 3–5x the rate of cold leads and retain 40% longer (industry benchmark). Implementation: a single landing page, a referral card in the welcome packet, and a monthly email reminder to members.",
  null
);

recEntry("3–18 MO",
  "Launch a B2B Direct Outreach Sequence for Local Employers",
  "Kinetic's Mueller location is within 2 miles of several mid-size employer campuses. A targeted LinkedIn outreach sequence — identifying HR managers and office administrators at 50–100 employers within a 3-mile radius — can generate team-suite inquiries with low time investment. Template: a 3-message sequence introducing Kinetic's team office options, referencing the neighborhood specifically, and offering a complimentary tour. A single enterprise team-suite contract at $3,000–5,000/month generates more revenue than 10–15 individual memberships.",
  null
);

recEntry("3–18 MO",
  "Establish Free Listings on LiquidSpace and Coworker.com",
  "LiquidSpace and Coworker.com are zero-cost marketplace platforms that route corporate real estate buyers and on-demand office seekers directly to flex-space operators. Optimizing Kinetic's profiles on both platforms with professional photography, detailed amenity listings, and competitive pricing captures high-intent buyers who are currently being redirected to Industrious and Regus — the operators who have claimed and optimized their profiles.",
  null
);

// Long-term vision box
doc.y += 4;
const ltY = doc.y;
doc.rect(ML, ltY, CW, 100).fill(CREAM);
doc.rect(ML, ltY, 3, 100).fill(GOLD);
doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("LONG-TERM VISION (3–5 YEARS)", ML + 12, ltY + 10, { characterSpacing: 0.5 });
doc.fontSize(9.5).fillColor(BODY).font("Helvetica-Oblique")
  .text("Over a 3–5 year horizon, Kinetic's path to market leadership in the Mueller coworking market is through deepening its identity as the irreplaceable professional community anchor in its neighborhood — not by competing with Industrious on enterprise sales volume, but by being so embedded in the local employer and professional ecosystem that switching costs are social and relational, not just financial. This means systematically converting Kinetic into a community institution: hosting local business events, partnering with Mueller district organizations, and building an employer partnership network where Kinetic is the default answer when an East Austin company's HR director asks 'where do our hybrid employees work?'",
    ML + 12, ltY + 24, { width: CW - 20, lineGap: 1.5 });


// ════════════════════════════════════════════════════════════════════════════
// SUPPLEMENTAL NOTE — COVER
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
fullBg(NAVY);

doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("W E X   A D V I S O R Y", 0, 36,
    { width: W - MR, align: "right", characterSpacing: 2 });

doc.rect(ML, 330, 44, 3).fill(GOLD);

doc.fontSize(36).fillColor(WHITE).font("Helvetica-Bold").text("SUPPLEMENTAL", ML, 344);
doc.fontSize(36).fillColor(WHITE).font("Helvetica-Bold").text("NOTE", ML, doc.y + 2);
doc.fontSize(13).fillColor(GOLD).font("Helvetica-Oblique")
  .text("Key Concepts, Client Clarifications & Data Sources", ML, doc.y + 10);

doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
  .text("PREPARED BY", ML, 524)
  .text("DATE",        ML + 160, 524)
  .text("SUBJECT",     ML + 290, 524);
doc.fontSize(10).fillColor(WHITE).font("Helvetica")
  .text("Wex Advisory",      ML,       540)
  .text("May 2026",          ML + 160, 540)
  .text("Kinetic Workspace", ML + 290, 540);

doc.moveTo(ML, H - 40).lineTo(W - MR, H - 40).lineWidth(0.5).strokeColor("#FFFFFF1A").stroke();
doc.fontSize(7).fillColor("#FFFFFF44").font("Helvetica")
  .text("Prepared by Wex Advisory  |  Proprietary & Confidential", ML, H - 30, { lineBreak: false });
doc.text("CONFIDENTIAL", 0, H - 30, { width: W - MR, align: "right", lineBreak: false });


// ════════════════════════════════════════════════════════════════════════════
// SUPPLEMENTAL — KEY CONCEPTS (page 1)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Key Concepts Explained");
pageFooter("Kinetic Workspace  —  Supplemental Note");

sectionTitle("01", "Key Concepts Explained",
  "Plain-language definitions for terms used throughout the competitive intelligence report.");

const concepts1 = [
  ["LOCAL SEO (SEARCH ENGINE OPTIMIZATION)",
   "SEO is the practice of making a business appear higher in Google search results — without paying for ads. \"Local\" SEO specifically refers to appearing when someone searches for a service in a specific city or neighborhood. When someone in Mueller types \"coworking space\" into Google, the businesses at the top didn’t pay to be there — they earned that placement through complete profiles, consistent reviews, and content that matches what people are searching for. Local SEO is essentially free advertising: it costs time, not money, and results compound over months and years."],
  ["GOOGLE BUSINESS PROFILE (GBP)",
   "When you search for a business on Google or Google Maps, you see a panel showing the name, hours, photos, reviews, and a link to their website. That panel is a Google Business Profile — a free listing any business can claim and manage. The businesses that appear in the top three results on Google Maps (the “Map Pack”) receive roughly 70–80% of all clicks from that search. An incomplete or unoptimized profile — missing photos, outdated hours, or few reviews — causes Google to rank that business lower, even if the actual product is superior to better-maintained competitors."],
  ["\"NEAR ME\" SEARCH",
   "When someone types \"coworking space near me\" into Google, Google automatically uses their device’s location to show businesses within a few miles. This type of search carries extremely high purchase intent — the person has already decided they want the product and is simply choosing which business to contact. For service businesses like coworking spaces, \"near me\" searches are often the single most valuable customer acquisition moment, and ranking well for them requires a fully optimized and actively managed Google Business Profile."],
  ["MAP PACK / GOOGLE MAPS RANKINGS",
   "When you search for a local business on Google, you typically see a map with three business pins highlighted — this is called the \"Map Pack.\" Studies consistently show that these three businesses receive roughly 70–80% of all clicks from that search. Falling off the top-three list means most potential customers never see a business at all, even with a strong website. Ranking factors include: number and recency of Google reviews, completeness of the Business Profile, proximity to the searcher, and click-through rate on the listing."],
  ["REVIEW VELOCITY",
   "Review velocity refers to the rate at which a business receives new Google reviews over time — not just the total count. Google’s algorithm weights recent reviews more heavily because they signal a business is currently active and relevant. A business with 200 reviews but none in the past six months will rank lower than a comparable business with 80 reviews posted consistently over the past year. Actively requesting reviews from members immediately after positive interactions is a high-ROI, zero-cost habit for any location-based business."],
];

function conceptEntry(term, text) {
  const y = doc.y;
  doc.rect(ML, y, 3, 1).fill(GOLD); // extended below
  doc.fontSize(8.5).fillColor(NAVY).font("Helvetica-Bold")
    .text(term, ML + 12, y, { characterSpacing: 0.3 });
  doc.y += 1;
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(text, ML + 12, doc.y, { width: CW - 14, lineGap: 1.5 });
  const end = doc.y + 4;
  doc.rect(ML, y, 3, end - y).fill(GOLD);
  doc.y = end + 2;
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.y += 8;
}

concepts1.forEach(([t, b]) => conceptEntry(t, b));


// ════════════════════════════════════════════════════════════════════════════
// SUPPLEMENTAL — KEY CONCEPTS (page 2)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Key Concepts Explained (Cont.)");
pageFooter("Kinetic Workspace  —  Supplemental Note");

doc.y = 40;

const concepts2 = [
  ["ORGANIC SEARCH TRAFFIC",
   "\"Organic\" traffic means visitors who arrive at a website by clicking a regular, non-paid search result. It is contrasted with \"paid\" traffic, which comes from sponsored ads purchased on a cost-per-click basis. Organic traffic requires investment in content (blog posts, location pages, FAQs) and time to build, but compounds over time: a well-written post about \"best coworking spaces in Mueller Austin\" can drive qualified visitors for years after publication at no ongoing cost."],
  ["LONG-TAIL KEYWORDS",
   "A \"keyword\" is the phrase a person types into a search engine. \"Coworking\" is a broad keyword — searched millions of times daily and nearly impossible for a small business to rank for against Industrious and Regus. A \"long-tail keyword\" is a more specific phrase — like \"private office Mueller Austin\" or \"meeting room East Austin\" — searched less frequently but by people much closer to a purchase decision. Long-tail keywords are where small businesses win: lower competition, higher searcher intent, and a single well-written blog post or location page can realistically reach page one."],
  ["MEMBER REFERRAL PROGRAM",
   "A referral program is a structured system that rewards existing customers for introducing new customers to the business. For a coworking space, this typically means offering a current member a free month of membership (or account credit) for every new member they refer who signs a contract. Referral programs are among the highest-converting acquisition channels for community-based businesses because the prospect arrives pre-sold by a trusted peer — and referred members tend to stay longer due to existing social ties within the community."],
  ["HYBRID WORK",
   "Hybrid work describes an arrangement where workers split time between home and an office — rather than commuting five days a week. This shift, which accelerated significantly after 2020, created structural demand for neighborhood coworking: professionals who want a professional environment close to home without a long commute. This is the fundamental market tailwind behind Kinetic Workspace’s business model and the primary reason neighborhood coworking locations are outperforming downtown equivalents on occupancy growth."],
  ["CAGR (COMPOUND ANNUAL GROWTH RATE)",
   "CAGR expresses how fast a market grows per year, on average, over a multi-year period. A 15% CAGR means that if the market is $10B today, it will be approximately $11.5B next year, $13.2B the year after, and so on — each year’s growth builds on the prior year’s larger base. It is used to project future market size and to benchmark whether a specific company is growing faster or slower than its industry average."],
  ["B2B OUTREACH",
   "B2B stands for \"business-to-business\" — one company selling to another, rather than to an individual consumer. In Kinetic’s context, B2B outreach means proactively contacting local employers — via LinkedIn, email, or in person — to offer team workspace solutions (private office suites, meeting room blocks, satellite office arrangements) rather than waiting for individuals to discover the space organically. A single enterprise team-suite contract generates more annual revenue than 15–20 individual memberships, making B2B outreach one of the highest-return activities available without a paid marketing budget."],
];

concepts2.forEach(([t, b]) => conceptEntry(t, b));


// ════════════════════════════════════════════════════════════════════════════
// SUPPLEMENTAL — DATA SOURCES & DISCLOSURE
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
pageHeader("Data Sources & Research Disclosure");
pageFooter("Kinetic Workspace  —  Supplemental Note");

sectionTitle("02", "Data Sources & Research Disclosure",
  "Sources used to compile, verify, and synthesize the analysis in this competitive intelligence report.");

function srcCat(label) {
  doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
    .text(label.toUpperCase(), ML, doc.y, { characterSpacing: 0.7 });
  doc.y += 4;
}
function srcBullet(text) {
  doc.fontSize(9).fillColor(GRAY).font("Helvetica")
    .text("›  " + text, ML + 12, doc.y, { width: CW - 14, lineGap: 1.5 });
  doc.y += 3;
}

srcCat("Kinetic Workspace — Company Data");
srcBullet("Membership estimate, capacity, and founding year: kineticworkspace.com and Google Maps listing");
srcBullet("Revenue estimate (~$720K): Derived from published pricing tiers, estimated occupancy, and industry revenue-per-desk benchmarks for single-location boutique operators. Kinetic is a private company and does not publicly disclose revenue; this figure is an estimate, not a reported financial result.");
srcBullet("Google rating and review count: Google Maps listing at time of research");
doc.y += 4;

srcCat("Competitor Data");
srcBullet("Common Desk Austin: commondesk.com and Google Maps listings");
srcBullet("Industrious Domain Northside: industriousoffice.com, Google Maps listing, and CBRE partnership press release (2021)");
srcBullet("Regus Austin: regus.com and Google Maps listings");
srcBullet("Capital Factory: capitalfactory.com and Crunchbase company data");
srcBullet("The Yard Austin: theyardcoworking.com and Google Maps listing");
doc.y += 4;

srcCat("Market Size & Growth Data");
srcBullet("U.S. flexible workspace market size ($26B+): Mordor Intelligence, Flexible Office Space Market Report (2023–2024); corroborated by CBRE Flex Space Outlook");
srcBullet("CAGR projection (13–15% through 2028): Grand View Research, Coworking Space Market; CoworkingResources.com annual industry survey; JLL Future of Work research");
srcBullet("Austin metro flex market (~$980M): Derived from CBRE regional office market reports and flex space penetration rate estimates; directional estimate, not a reported figure");
srcBullet("Suburban coworking outperforming urban on occupancy growth: CBRE U.S. Flexible Office Trends (2023); Cushman & Wakefield Suburban Office Market Outlook");
doc.y += 4;

srcCat("Industry Events");
srcBullet("WeWork Chapter 11 bankruptcy (November 2023): WeWork’s filing in the U.S. Bankruptcy Court for the District of New Jersey; reported by The Wall Street Journal, Bloomberg, and Reuters");
srcBullet("Common Desk / WeWork acquisition: WeWork press release (2022) and reported by CoStar and Bisnow");
doc.y += 4;

srcCat("SEO & Search Behavior Data");
srcBullet("Map Pack click-share (~70–80% of local search clicks): BrightLocal Local Search Consumer Survey (2023); Moz Local Search Ranking Factors");
srcBullet("\"Near me\" search behavior and purchase intent: Google/Ipsos consumer research on local search behavior");
srcBullet("Review velocity impact on rankings: BrightLocal Local Consumer Review Survey (annual); Moz Local Ranking Factors study");
srcBullet("Competitive traffic benchmarking: DataForSEO estimated traffic data for subject company and competitor domains");
doc.y += 8;

// Disclosure box
const dY = doc.y;
doc.rect(ML, dY, CW, 98).fill("#FFF9EC");
doc.rect(ML, dY, 3, 98).fill(GOLD);
doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("IMPORTANT DISCLOSURE", ML + 12, dY + 10, { characterSpacing: 0.6 });
doc.fontSize(8.5).fillColor("#6B5500").font("Helvetica")
  .text(
    "This report was produced using Claude (Anthropic’s AI), which synthesized publicly available information and supplemented it with real-time web research where applicable. Revenue figures for private companies are estimates derived from industry benchmarks and public signals (employee count, location count, pricing tiers), not disclosed financial statements. Location data sourced from third-party platforms may lag physical changes by 6–18 months; subject company should verify all location references against current operations. All market size figures are drawn from third-party research firms and should be treated as directional. Wex Advisory recommends verifying specific competitor claims directly before using them in external or legal communications.",
    ML + 12, dY + 24, { width: CW - 20, lineGap: 1.8 });


// ── Finalize ─────────────────────────────────────────────────────────────────
doc.end();
console.log("Sample report written to public/sample-report.pdf");
