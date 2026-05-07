// Run: node scripts/generate-sample-report.js
// Output: public/sample-report.pdf

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// ── Colors ──────────────────────────────────────────────────────────────────
const NAVY   = "#0F1F3D";
const GOLD   = "#C8A84B";
const WHITE  = "#FFFFFF";
const BODY   = "#1A1A2E";       // near-black for body text on white pages
const GRAY   = "#555566";       // secondary text
const LGRAY  = "#AAAABC";       // tertiary / labels
const RULE   = "#E2E2EC";       // horizontal rules
const CREAM  = "#FAFAF8";       // alternate row / box background
const GOLDBG = "#FDF8EC";       // disclosure box bg
const GOLDBR = "#C8A84B44";     // disclosure box border (translucent)

// ── Page geometry ────────────────────────────────────────────────────────────
const W = 612;   // US Letter width  (pts)
const H = 792;   // US Letter height (pts)
const ML = 60;   // margin left
const MR = 60;   // margin right
const CW = W - ML - MR;   // content width

// ── Helpers ──────────────────────────────────────────────────────────────────
function fullBg(doc, color) {
  doc.rect(0, 0, W, H).fill(color);
}

function footer(doc, label, right = "CONFIDENTIAL") {
  const y = H - 36;
  doc.moveTo(ML, y).lineTo(W - MR, y).lineWidth(0.5).strokeColor(RULE).stroke();
  doc.fontSize(7).fillColor(LGRAY)
    .text(label, ML, y + 6, { width: CW / 2 })
    .text(right, ML + CW / 2, y + 6, { width: CW / 2, align: "right" });
}

function sectionHeader(doc, num, title, subtitle) {
  // large section number watermark
  doc.fontSize(72).fillColor("#E8EAF0").font("Helvetica-Bold")
    .text(num, ML, 72, { lineBreak: false });
  // title
  doc.fontSize(28).fillColor(NAVY).font("Helvetica-Bold")
    .text(title, ML, 130);
  if (subtitle) {
    doc.fontSize(11).fillColor(GRAY).font("Helvetica-Oblique")
      .text(subtitle, ML, doc.y + 4, { width: CW });
  }
  doc.moveDown(1.2);
}

function goldAccentLine(doc, x, y, w = 36) {
  doc.rect(x, y, w, 3).fill(GOLD);
}

function keyConceptEntry(doc, term, body) {
  // Gold left bar
  const startY = doc.y;
  doc.rect(ML, startY, 3, 1).fill(GOLD); // will extend after text

  // Term
  doc.font("Helvetica-Bold").fontSize(9).fillColor(NAVY)
    .text(term, ML + 14, startY, { width: CW - 14 });

  // Body
  doc.font("Helvetica").fontSize(9.5).fillColor(GRAY)
    .text(body, ML + 14, doc.y + 3, { width: CW - 14, lineGap: 2 });

  const endY = doc.y;
  // extend the gold bar to cover text height
  doc.rect(ML, startY, 3, endY - startY + 2).fill(GOLD);

  // rule
  doc.moveDown(0.6);
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.moveDown(0.7);
}

function sourceCategory(doc, label) {
  doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
    .text(label.toUpperCase(), ML, doc.y, { characterSpacing: 0.8 });
  doc.moveDown(0.3);
}

function sourceBullet(doc, text) {
  const x = ML + 12;
  const y = doc.y;
  doc.rect(ML, y + 3.5, 4, 4).fill(GOLD);
  doc.fontSize(9).fillColor(GRAY).font("Helvetica")
    .text(text, x, y, { width: CW - 12, lineGap: 1.5 });
  doc.moveDown(0.35);
}

function compRow(doc, label, kinetic, comp, highlight = false) {
  const colW  = [200, 140, 140];
  const rowH  = 22;
  const y     = doc.y;
  const cols  = [ML, ML + colW[0], ML + colW[0] + colW[1]];

  if (highlight) doc.rect(ML, y, CW, rowH).fill("#F0F4FF");

  doc.fontSize(9).fillColor(NAVY).font(highlight ? "Helvetica-Bold" : "Helvetica");
  doc.text(label,   cols[0] + 6, y + 6, { width: colW[0] - 8, lineBreak: false });
  doc.fillColor(highlight ? NAVY : GRAY)
    .text(kinetic, cols[1] + 6, y + 6, { width: colW[1] - 8, lineBreak: false });
  doc.text(comp,   cols[2] + 6, y + 6, { width: colW[2] - 8, lineBreak: false });

  doc.moveTo(ML, y + rowH).lineTo(W - MR, y + rowH).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.y = y + rowH;
}

function recBox(doc, num, priority, effort, title, body) {
  const bx = ML;
  const by = doc.y;
  const bw = CW;

  // number badge
  doc.rect(bx, by, 28, 28).fill(GOLD);
  doc.fontSize(14).fillColor(WHITE).font("Helvetica-Bold")
    .text(num, bx, by + 6, { width: 28, align: "center", lineBreak: false });

  // title
  doc.fontSize(11).fillColor(NAVY).font("Helvetica-Bold")
    .text(title, bx + 36, by + 1, { width: bw - 36 });

  // priority / effort tags
  const tagY = doc.y + 2;
  doc.rect(bx + 36, tagY, 70, 14).fill("#EEF2FF");
  doc.fontSize(7.5).fillColor("#3344AA").font("Helvetica-Bold")
    .text(`Priority: ${priority}`, bx + 38, tagY + 3, { lineBreak: false });
  doc.rect(bx + 114, tagY, 70, 14).fill("#F0FFF4");
  doc.fontSize(7.5).fillColor("#1A7A40").font("Helvetica-Bold")
    .text(`Effort: ${effort}`, bx + 116, tagY + 3, { lineBreak: false });

  // body
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(body, bx + 36, tagY + 20, { width: bw - 36, lineGap: 2 });

  doc.moveDown(1);
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.moveDown(0.8);
}

// ── Document ─────────────────────────────────────────────────────────────────
const outPath = path.join(__dirname, "../public/sample-report.pdf");
const doc = new PDFDocument({ size: "LETTER", margin: 0, info: {
  Title: "Competitive Intelligence Report — Wex Advisory (Sample)",
  Author: "Wex Advisory",
}});
doc.pipe(fs.createWriteStream(outPath));


// ════════════════════════════════════════════════════════════════════════════
// PAGE 1 — COVER
// ════════════════════════════════════════════════════════════════════════════
fullBg(doc, NAVY);

// firm name top-left
doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("W E X   A D V I S O R Y", ML, 44, { characterSpacing: 2 });

// gold accent bar
goldAccentLine(doc, ML, 300, 44);

// main title
doc.fontSize(42).fillColor(WHITE).font("Helvetica-Bold")
  .text("COMPETITIVE", ML, 316, { lineBreak: false });
doc.fontSize(42).fillColor(WHITE).font("Helvetica-Bold")
  .text("INTELLIGENCE", ML, 362);
doc.fontSize(42).fillColor(WHITE).font("Helvetica-Bold")
  .text("REPORT", ML, 408);

// subtitle
doc.fontSize(13).fillColor(GOLD).font("Helvetica-Oblique")
  .text("Sample Report  ·  For Illustrative Purposes", ML, 464);

// meta grid
const metaY = 520;
doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
  .text("PREPARED BY",   ML,       metaY)
  .text("DATE",          ML + 160, metaY)
  .text("SUBJECT",       ML + 290, metaY);
doc.fontSize(10).fillColor(WHITE).font("Helvetica")
  .text("Wex Advisory",           ML,       metaY + 14)
  .text("May 2026",               ML + 160, metaY + 14)
  .text("Kinetic Workspace",      ML + 290, metaY + 14);

// footer rule + text
doc.moveTo(ML, H - 44).lineTo(W - MR, H - 44).lineWidth(0.5).strokeColor("#FFFFFF22").stroke();
doc.fontSize(7).fillColor("#FFFFFF44").font("Helvetica")
  .text("Prepared by Wex Advisory  |  Proprietary & Confidential", ML, H - 34, { lineBreak: false })
  .fillColor("#FFFFFF44").text("CONFIDENTIAL", W - MR - 60, H - 34);


// ════════════════════════════════════════════════════════════════════════════
// PAGE 2 — EXECUTIVE SUMMARY
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "01", "Executive Summary",
  "Key findings from a competitive intelligence deep-dive on the Austin, TX flexible workspace market.");

doc.fontSize(10).fillColor(BODY).font("Helvetica").lineGap(3)
  .text(
    "Kinetic Workspace operates a single boutique coworking location in Austin's Mueller neighborhood. " +
    "The space has built a strong local reputation — a 4.9-star Google rating on 31 reviews — but competes " +
    "in one of the most contested flexible workspace markets in the U.S. This report profiles five direct " +
    "competitors, benchmarks Kinetic's digital footprint against the competitive set, and surfaces five " +
    "prioritized actions to defend and grow its market position.",
    ML, doc.y, { width: CW });

doc.moveDown(0.8);
doc.text(
  "The Austin flexible workspace market has attracted significant institutional capital. Industrious (backed " +
  "by CBRE), Common Desk (acquired by WeWork), and Regus (IWG plc) all operate within 3 miles of Kinetic's " +
  "location. These operators carry substantially larger marketing budgets and dedicated SEO resources. " +
  "However, Kinetic's strongest competitive moat — authentic community, boutique design, and direct founder " +
  "involvement — is structurally difficult for corporate chains to replicate.",
  ML, doc.y, { width: CW });

doc.moveDown(0.8);
doc.text(
  "The most material gap identified is organic search visibility. Kinetic's estimated site traffic (~1,800 " +
  "monthly visits) trails Common Desk (~12,400) and Industrious (~38,000) by a wide margin. This gap is " +
  "addressable through targeted long-tail content and consistent GBP optimization — high-ROI activities " +
  "that do not require paid media. The report's recommendations are sequenced by impact and ease of " +
  "execution, prioritizing actions that compound over time.",
  ML, doc.y, { width: CW });

// Key findings box
doc.moveDown(1.2);
const boxY = doc.y;
doc.rect(ML, boxY, CW, 148).fill(CREAM);
doc.rect(ML, boxY, 3, 148).fill(GOLD);
doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("KEY FINDINGS", ML + 14, boxY + 12, { characterSpacing: 0.8 });

const findings = [
  "Kinetic holds the strongest review rating in the market (4.9 ★) but has the lowest review count — velocity must accelerate to hold Map Pack position as the neighborhood densifies.",
  "Industrious ranks #1 for 'coworking Austin' and 'private office Austin' — Kinetic does not appear in the top 20 organic results for either term.",
  "No competitor in the Mueller / East Austin submarket offers a fully optimized GBP with regular photo updates and Q&A management — a direct local SEO opportunity.",
  "Zero competitors have a visible member referral program on their websites. First-mover advantage is available.",
  "The Austin flex market is projected to grow at 13–15% CAGR through 2028; Kinetic's boutique positioning is structurally aligned with the suburban/neighborhood coworking tailwind.",
];
let fy = boxY + 28;
findings.forEach((f, i) => {
  doc.rect(ML + 14, fy + 3.5, 4, 4).fill(GOLD);
  doc.fontSize(9).fillColor(BODY).font("Helvetica")
    .text(f, ML + 24, fy, { width: CW - 28, lineGap: 1.5 });
  fy = doc.y + 3;
});

footer(doc, "Kinetic Workspace — Competitive Intelligence Report");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 3 — MARKET OVERVIEW
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "02", "Market Overview",
  "U.S. flexible workspace industry context and Austin-specific competitive dynamics.");

// stat boxes
const stats = [
  { val: "$26B+", lbl: "U.S. Flex Workspace\nMarket Size (2024)" },
  { val: "13–15%", lbl: "Projected CAGR\n2024–2028" },
  { val: "~$980M", lbl: "Austin Metro Flex\nMarket Est. (2024)" },
  { val: "#3", lbl: "Austin Ranked Among\nFastest-Growing U.S.\nFlex Markets" },
];
const sW = (CW - 18) / 4;
stats.forEach((s, i) => {
  const sx = ML + i * (sW + 6);
  const sy = doc.y;
  doc.rect(sx, sy, sW, 68).fill(NAVY);
  doc.fontSize(22).fillColor(GOLD).font("Helvetica-Bold")
    .text(s.val, sx, sy + 10, { width: sW, align: "center", lineBreak: false });
  doc.fontSize(8).fillColor(WHITE).font("Helvetica")
    .text(s.lbl, sx, sy + 38, { width: sW, align: "center" });
});
doc.y = doc.y + 68 + 6;
doc.moveDown(1.2);

doc.fontSize(10.5).fillColor(NAVY).font("Helvetica-Bold").text("Industry Tailwinds", ML);
doc.moveDown(0.3);
const tailwinds = [
  ["Hybrid work adoption", "Post-2020 hybrid arrangements created structural demand for near-home professional workspace. Suburban and neighborhood coworking is the primary beneficiary: CBRE data shows suburban flex occupancy growing 18% faster than downtown urban equivalents in 2023."],
  ["WeWork's contraction", "WeWork filed Chapter 11 in November 2023 and closed dozens of locations, displacing an estimated 50,000+ members across the U.S. Austin saw two WeWork closures; former members are actively evaluating boutique alternatives."],
  ["Enterprise adoption", "Fortune 500 companies now use flex space as a formal real estate strategy (CBRE Flex Outlook, 2024). A single enterprise team-suite contract can generate more annual revenue than 20 individual memberships."],
];
tailwinds.forEach(([term, body]) => {
  doc.rect(ML, doc.y, 3, 1).fill(GOLD);
  doc.fontSize(9).fillColor(NAVY).font("Helvetica-Bold")
    .text(term, ML + 12, doc.y);
  doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
    .text(body, ML + 12, doc.y + 2, { width: CW - 12, lineGap: 2 });
  const ey = doc.y;
  doc.rect(ML, ey - (doc.y - ey) - 20, 3, 30).fill(GOLD);
  doc.moveDown(0.8);
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.moveDown(0.6);
});

doc.moveDown(0.4);
doc.fontSize(10.5).fillColor(NAVY).font("Helvetica-Bold").text("Austin Market Dynamics", ML);
doc.moveDown(0.3);
doc.fontSize(9.5).fillColor(GRAY).font("Helvetica").lineGap(2)
  .text(
    "Austin ranks among the top three fastest-growing U.S. flex workspace markets by demand growth. " +
    "The tech sector's continued presence (Dell, Apple, Tesla, Oracle all maintain Austin campuses) drives " +
    "consistent demand from both enterprise satellite teams and independent professionals. The Mueller " +
    "neighborhood specifically has emerged as a high-growth residential and commercial corridor, with " +
    "10,000+ units of housing built since 2010 and a professional population that indexes heavily toward " +
    "remote and hybrid workers.",
    ML, doc.y, { width: CW });

footer(doc, "Kinetic Workspace — Competitive Intelligence Report");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 4 — SUBJECT COMPANY PROFILE
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "03", "Subject Company Profile", "Kinetic Workspace — Austin, TX");

// Profile box
const pBy = doc.y;
doc.rect(ML, pBy, CW, 110).fill(CREAM);
const pData = [
  ["Company",        "Kinetic Workspace"],
  ["Founded",        "2020"],
  ["Location",       "Mueller Neighborhood, Austin, TX"],
  ["Capacity",       "~110 desks / 12 private offices"],
  ["Membership Est.","~85 active members"],
  ["Est. Revenue",   "~$720K annually (derived from pricing tiers and capacity)"],
  ["Google Rating",  "4.9 ★ (31 reviews)"],
  ["Website Traffic","~1,800 monthly visits (DataForSEO estimate)"],
];
let pyy = pBy + 10;
pData.forEach(([k, v], i) => {
  if (i % 2 === 0) doc.rect(ML, pyy, CW, 20).fill(i === 0 ? "#EEF0F8" : CREAM);
  doc.fontSize(8.5).fillColor(LGRAY).font("Helvetica-Bold")
    .text(k.toUpperCase(), ML + 12, pyy + 5, { width: 140, lineBreak: false });
  doc.fontSize(9).fillColor(BODY).font("Helvetica")
    .text(v, ML + 158, pyy + 5, { width: CW - 160, lineBreak: false });
  pyy += 20;
});
doc.y = pBy + 110 + 16;

doc.fontSize(10.5).fillColor(NAVY).font("Helvetica-Bold").text("Positioning Assessment", ML);
doc.moveDown(0.3);
doc.fontSize(9.5).fillColor(GRAY).font("Helvetica").lineGap(2)
  .text(
    "Kinetic Workspace occupies the boutique-premium segment of the Austin flex market. Its Mueller location " +
    "gives it a geographic moat: no direct competitor operates a coworking space within a 1-mile radius. The " +
    "space's design-forward aesthetic and founder-managed community culture produce the market's highest " +
    "Google rating — a signal of genuine member satisfaction that drives word-of-mouth acquisition.",
    ML, doc.y, { width: CW });

doc.moveDown(0.8);
doc.text(
  "The primary vulnerability is digital discoverability. Kinetic's website is not optimized for the search " +
  "terms prospective members use when not already familiar with the brand. This creates a scenario where " +
  "existing members are satisfied but new-member pipeline is constrained by low organic visibility — a " +
  "gap that grows more costly as competitors increase their content investment.",
  ML, doc.y, { width: CW });

doc.moveDown(1);
// SWOT
const swotLabels = ["Strengths", "Weaknesses", "Opportunities", "Threats"];
const swotColors = [["#EBF8F0","#1A7A40"],["#FFF0F0","#AA2222"],["#EEF2FF","#2233AA"],["#FFF8EB","#AA6600"]];
const swotItems = [
  ["Highest Google rating in market (4.9 ★)","Authentic founder-led community","Unique Mueller geographic position","Boutique design quality"],
  ["Low organic search visibility (~1,800 mo. visits)","Slow review velocity (31 total)","Single-location brand awareness ceiling","No visible referral program"],
  ["WeWork-displaced member pool in Austin","Long-tail keyword whitespace in Mueller/East Austin","Enterprise satellite office demand growing","First-mover on neighborhood-native positioning"],
  ["Industrious / CBRE scaling local spend","Common Desk pricing pressure","New flex operators entering Mueller corridor","Review volume gap widens over time without intervention"],
];
const sW2 = (CW - 6) / 2;
swotLabels.forEach((label, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const bx = ML + col * (sW2 + 6);
  const by2 = doc.y + row * 80;
  if (i === 2) doc.y = doc.y + 80;
  const [bg, fg] = swotColors[i];
  doc.rect(bx, by2, sW2, 74).fill(bg);
  doc.fontSize(8).fillColor(fg).font("Helvetica-Bold")
    .text(label.toUpperCase(), bx + 8, by2 + 8, { characterSpacing: 0.5 });
  swotItems[i].forEach((item, j) => {
    doc.fontSize(8.5).fillColor(BODY).font("Helvetica")
      .text(`· ${item}`, bx + 8, by2 + 22 + j * 12, { width: sW2 - 14, lineBreak: false });
  });
});
doc.y = doc.y + 74 + 6;

footer(doc, "Kinetic Workspace — Competitive Intelligence Report");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 5 — COMPETITOR PROFILES
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "04", "Competitor Profiles",
  "Five direct competitors operating in the Austin, TX flexible workspace market.");

const competitors = [
  {
    name: "Common Desk — East 6th St.",
    parent: "Subsidiary of WeWork (post-acquisition, 2022)",
    location: "1023 E 6th St, Austin, TX",
    traffic: "~12,400 mo. visits",
    rating: "4.6 ★",
    reviews: "134",
    mapPack: "Yes (East Austin searches)",
    strengths: "Strong brand awareness from WeWork acquisition; competitive pricing; large member network across 4 Austin locations.",
    weaknesses: "WeWork bankruptcy association creates perception risk; member turnover elevated post-acquisition; corporate chain feel undermines community positioning.",
    threat: "High",
  },
  {
    name: "Industrious — Domain Northside",
    parent: "Subsidiary of CBRE (partnership since 2021)",
    location: "11801 Domain Blvd, Austin, TX",
    traffic: "~38,000 mo. visits",
    rating: "4.8 ★",
    reviews: "67",
    mapPack: "Yes (Domain / North Austin)",
    strengths: "CBRE institutional backing; premium enterprise positioning; strong content and SEO investment; ranks #1 for 'coworking Austin' organically.",
    weaknesses: "Domain Northside location is 12 miles from Mueller — not a direct geographic competitor for Kinetic's member base; average daily rate 35–40% higher.",
    threat: "Medium",
  },
  {
    name: "Regus — Downtown Austin",
    parent: "IWG plc (LSE: IWG)",
    location: "300 W 6th St, Austin, TX",
    traffic: "~2.1M mo. visits (global domain)",
    rating: "3.9 ★",
    reviews: "44",
    mapPack: "Yes (downtown searches)",
    strengths: "Global brand recognition; corporate account infrastructure; multiple Austin locations provide geographic flexibility for enterprise clients.",
    weaknesses: "Lowest Google rating in the competitive set; member experience reviews cite transactional environment; no community programming; pricing model is contract-heavy.",
    threat: "Low",
  },
  {
    name: "Capital Factory",
    parent: "Independent (startup accelerator / coworking hybrid)",
    location: "701 Brazos St, Austin, TX",
    traffic: "~22,000 mo. visits",
    rating: "4.5 ★",
    reviews: "88",
    mapPack: "Yes (downtown / startup searches)",
    strengths: "Iconic Austin startup brand; investor and mentor network is a genuine member benefit; strong PR presence; annual SXSW activation drives awareness.",
    weaknesses: "Primary positioning as an accelerator creates self-selection — not targeting the same professional demographic as Kinetic; downtown location less relevant for Mueller residents.",
    threat: "Low",
  },
  {
    name: "The Yard Austin — 6th Street",
    parent: "Independent (regional operator, 3 Texas locations)",
    location: "815 W 6th St, Austin, TX",
    traffic: "~4,200 mo. visits",
    rating: "4.7 ★",
    reviews: "28",
    mapPack: "No",
    strengths: "Boutique positioning similar to Kinetic; authentic community; competitive monthly pricing; strong Instagram presence.",
    weaknesses: "Lower review count than Kinetic; not in Map Pack despite strong rating; limited content investment; no B2B offering visible on website.",
    threat: "Medium",
  },
];

competitors.forEach((c, idx) => {
  if (idx > 0 && idx % 2 === 0) { doc.addPage(); doc.y = 60; }
  if (idx > 0 && idx % 2 !== 0) { doc.moveDown(0.8); doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.5).strokeColor(RULE).stroke(); doc.moveDown(0.8); }

  // header bar
  const hY = doc.y;
  doc.rect(ML, hY, CW, 28).fill(NAVY);
  doc.fontSize(11).fillColor(WHITE).font("Helvetica-Bold")
    .text(c.name, ML + 12, hY + 7, { width: CW * 0.6, lineBreak: false });
  const threatColor = c.threat === "High" ? "#FF4444" : c.threat === "Medium" ? "#FF9900" : "#22AA55";
  doc.rect(ML + CW - 80, hY + 6, 72, 16).fill(threatColor + "33");
  doc.fontSize(8).fillColor(threatColor).font("Helvetica-Bold")
    .text(`Threat: ${c.threat}`, ML + CW - 78, hY + 10, { width: 68, align: "center", lineBreak: false });

  doc.y = hY + 28 + 4;

  // meta row
  const mCols = [
    ["PARENT", c.parent],
    ["LOCATION", c.location],
  ];
  mCols.forEach(([k, v], i) => {
    doc.fontSize(7.5).fillColor(LGRAY).font("Helvetica-Bold")
      .text(k, ML + i * (CW / 2), doc.y, { width: CW / 2 - 8, lineBreak: false });
  });
  doc.y = doc.y + 10;
  mCols.forEach(([k, v], i) => {
    doc.fontSize(9).fillColor(BODY).font("Helvetica")
      .text(v, ML + i * (CW / 2), doc.y, { width: CW / 2 - 8, lineBreak: false });
  });
  doc.y = doc.y + 14;

  // stats row
  const sItems = [
    ["Est. Monthly Traffic", c.traffic],
    ["Google Rating", c.rating],
    ["Review Count", c.reviews],
    ["Map Pack", c.mapPack],
  ];
  const sColW = CW / 4;
  const ssY = doc.y;
  doc.rect(ML, ssY, CW, 36).fill("#F2F4FA");
  sItems.forEach(([k, v], i) => {
    doc.fontSize(7).fillColor(LGRAY).font("Helvetica-Bold")
      .text(k.toUpperCase(), ML + i * sColW + 8, ssY + 5, { width: sColW - 10, lineBreak: false });
    doc.fontSize(10).fillColor(NAVY).font("Helvetica-Bold")
      .text(v, ML + i * sColW + 8, ssY + 16, { width: sColW - 10, lineBreak: false });
  });
  doc.y = ssY + 36 + 6;

  // strengths / weaknesses
  ["Strengths", "Weaknesses"].forEach((label, li) => {
    doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
      .text(label.toUpperCase(), ML, doc.y, { characterSpacing: 0.5 });
    doc.y += 1;
    doc.fontSize(9.5).fillColor(GRAY).font("Helvetica")
      .text(li === 0 ? c.strengths : c.weaknesses, ML, doc.y, { width: CW, lineGap: 1.5 });
    doc.moveDown(0.4);
  });
});

footer(doc, "Kinetic Workspace — Competitive Intelligence Report");

// add extra competitor page if needed
doc.addPage();
doc.y = 60;
// last two competitors fill page 5 already — add gap analysis on next page


// ════════════════════════════════════════════════════════════════════════════
// PAGE 6 — GAP ANALYSIS
// ════════════════════════════════════════════════════════════════════════════
sectionHeader(doc, "05", "Gap Analysis",
  "Where Kinetic Workspace leads, matches, and trails the competitive set.");

// Table header
const tHY = doc.y;
doc.rect(ML, tHY, CW, 22).fill(NAVY);
doc.fontSize(8.5).fillColor(WHITE).font("Helvetica-Bold")
  .text("METRIC",              ML + 6,   tHY + 6, { width: 194, lineBreak: false })
  .text("KINETIC WORKSPACE",   ML + 206, tHY + 6, { width: 134, lineBreak: false })
  .text("COMPETITIVE SET AVG", ML + 346, tHY + 6, { width: 140, lineBreak: false });
doc.y = tHY + 22;

const rows = [
  ["Google Rating",            "4.9 ★  ✓ Leads",         "4.5 ★"],
  ["Google Review Count",      "31  ✗ Trails",            "72 avg"],
  ["Review Velocity (est.)",   "~1–2/month  ✗ Trails",    "~5–8/month"],
  ["Map Pack Presence",        "Yes (Mueller)  ✓ On par",  "4 of 5 competitors"],
  ["Est. Monthly Web Traffic", "~1,800  ✗ Significant gap","~15,400 avg"],
  ["Organic Keyword Rankings", "Not in top 20  ✗ Trails", "Comp.Desk / Industrious rank top-5"],
  ["GBP Photo Count (est.)",   "~18 photos",              "~45 photos avg"],
  ["Blog / Content Pages",     "0 indexed  ✗ Trails",     "Industrious 140+; Common Desk 60+"],
  ["Member Referral Program",  "None visible  — Neutral", "None visible (market whitespace)"],
  ["B2B / Enterprise Offer",   "Not visible  ✗ Trails",   "Regus, Industrious have dedicated pages"],
  ["LinkedIn Presence",        "Company page  ✓ Present", "All competitors active"],
  ["Instagram Cadence",        "~2 posts/week  ✓ On par", "The Yard ~3x/week; others 1–2x"],
];
rows.forEach((row, i) => {
  const bg = i % 2 === 0 ? WHITE : CREAM;
  const h = 20;
  const ry = doc.y;
  doc.rect(ML, ry, CW, h).fill(bg);

  const color = row[1].includes("✓") ? "#1A7A40" : row[1].includes("✗") ? "#AA2222" : BODY;
  doc.fontSize(8.5).fillColor(BODY).font("Helvetica")
    .text(row[0], ML + 6,   ry + 5, { width: 194, lineBreak: false });
  doc.fontSize(8.5).fillColor(color).font(row[1].includes("✓") || row[1].includes("✗") ? "Helvetica-Bold" : "Helvetica")
    .text(row[1], ML + 206, ry + 5, { width: 134, lineBreak: false });
  doc.fontSize(8.5).fillColor(GRAY).font("Helvetica")
    .text(row[2], ML + 346, ry + 5, { width: 140, lineBreak: false });

  doc.moveTo(ML, ry + h).lineTo(W - MR, ry + h).lineWidth(0.3).strokeColor(RULE).stroke();
  doc.y = ry + h;
});

doc.moveDown(1);
doc.fontSize(8.5).fillColor(LGRAY).font("Helvetica-Oblique")
  .text("✓ = Kinetic leads or matches best competitor   ✗ = Material gap vs. competitive set   — = Neutral / data insufficient",
    ML, doc.y, { width: CW });

footer(doc, "Kinetic Workspace — Competitive Intelligence Report");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 7 — STRATEGIC RECOMMENDATIONS
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "06", "Strategic Recommendations",
  "Five prioritized actions calibrated to Kinetic Workspace's resources and competitive position.");

recBox(doc, "1", "HIGH", "LOW",
  "Launch a Review Velocity Campaign",
  "Kinetic's 4.9-star rating is the market's strongest signal of member satisfaction — but 31 total reviews " +
  "puts the Map Pack position at risk as the Mueller corridor grows. Target: 3+ new Google reviews per week. " +
  "Tactic: send a personal email to every member immediately after a positive interaction (renewal, event, " +
  "office upgrade) with a direct link to the Google review page. Automate via a simple CRM trigger. A " +
  "business with 31 reviews reaching 100 in 90 days will see a measurable improvement in Map Pack ranking " +
  "for 'coworking Mueller Austin' and adjacent terms."
);

recBox(doc, "2", "HIGH", "MEDIUM",
  "Publish 4 Long-Tail SEO Landing Pages",
  "Kinetic does not appear in the top 20 organic results for any of the primary search terms prospective " +
  "members use. The high-competition terms ('coworking Austin') are owned by Industrious and Common Desk. " +
  "The opportunity is in the long-tail: 'coworking Mueller Austin,' 'private office Mueller TX,' 'meeting " +
  "room rental East Austin,' 'day pass coworking Austin.' Each term has 50–400 monthly searches and minimal " +
  "competition. A single 800-word location page or blog post targeting each term, properly structured with " +
  "schema markup and internal links, can realistically reach page one within 60–90 days. Zero paid media required."
);

recBox(doc, "3", "HIGH", "LOW",
  "Activate a Member Referral Program",
  "No competitor in Kinetic's direct market has a visible referral program on their website — this is a " +
  "first-mover opportunity. Proposed structure: any active member who refers a new member who signs a " +
  "contract receives one month of membership credit. Referred members convert at 3–5x the rate of cold " +
  "leads and retain 40% longer (industry benchmark). At Kinetic's current scale, converting 5 referrals/month " +
  "at an average contract value of $500/month generates $30,000 in incremental annual revenue against a " +
  "cost of ~5 months of free desk credit (~$2,500). Implementation: a single landing page, a referral card " +
  "in the welcome packet, and a monthly email reminder to members."
);

recBox(doc, "4", "MEDIUM", "MEDIUM",
  "Develop a B2B Outreach Sequence for Mueller / East Austin Employers",
  "The Austin market is seeing strong enterprise demand for satellite workspace. Kinetic's Mueller location " +
  "is within 2 miles of several mid-size employer campuses. A targeted LinkedIn outreach sequence — " +
  "identifying HR managers and office administrators at 50–100 employers within a 3-mile radius — " +
  "can generate team-suite inquiries with a relatively low time investment. Template: a 3-message sequence " +
  "introducing Kinetic's team office options, referencing the neighborhood specifically, and offering a " +
  "complimentary tour. A single enterprise team-suite contract at $3,000–5,000/month generates more " +
  "revenue than 10–15 individual memberships."
);

recBox(doc, "5", "MEDIUM", "LOW",
  "Optimize the Google Business Profile for 'Near Me' and Neighborhood Queries",
  "Kinetic's GBP has strong review quality but gaps in the signals Google uses to rank local results. " +
  "Specific actions: (a) Upload 5+ new photos per week for 60 days — exterior, interior, private offices, " +
  "events, members working. Google surfaces businesses with recent photo activity more prominently. " +
  "(b) Add and answer 10 Q&As on the GBP directly — these appear in search results and signal completeness. " +
  "(c) Update the GBP description to include 'Mueller,' 'East Austin,' and 'near me' language naturally. " +
  "(d) Ensure all business hours, parking information, and accessibility details are complete. " +
  "These changes require no budget and produce measurable ranking improvements within 30–60 days."
);

footer(doc, "Kinetic Workspace — Competitive Intelligence Report");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 8 — SUPPLEMENTAL NOTE COVER
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
fullBg(doc, NAVY);

doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("W E X   A D V I S O R Y", ML, 44, { characterSpacing: 2 });

goldAccentLine(doc, ML, 316, 44);

doc.fontSize(42).fillColor(WHITE).font("Helvetica-Bold").text("SUPPLEMENTAL", ML, 332);
doc.fontSize(42).fillColor(WHITE).font("Helvetica-Bold").text("NOTE", ML, 378);
doc.fontSize(13).fillColor(GOLD).font("Helvetica-Oblique")
  .text("Key Concepts, Client Clarifications & Data Sources", ML, 432);

const sm = 520;
doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
  .text("PREPARED BY",   ML,       sm)
  .text("DATE",          ML + 160, sm)
  .text("SUBJECT",       ML + 290, sm);
doc.fontSize(10).fillColor(WHITE).font("Helvetica")
  .text("Wex Advisory",         ML,       sm + 14)
  .text("May 2026",             ML + 160, sm + 14)
  .text("Kinetic Workspace",    ML + 290, sm + 14);

doc.moveTo(ML, H - 44).lineTo(W - MR, H - 44).lineWidth(0.5).strokeColor("#FFFFFF22").stroke();
doc.fontSize(7).fillColor("#FFFFFF44").font("Helvetica")
  .text("Prepared by Wex Advisory  |  Proprietary & Confidential", ML, H - 34, { lineBreak: false })
  .fillColor("#FFFFFF44").text("CONFIDENTIAL", W - MR - 60, H - 34);


// ════════════════════════════════════════════════════════════════════════════
// PAGE 9 — KEY CONCEPTS (1 of 2)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "01", "Key Concepts Explained",
  "Plain-language definitions for terms used throughout the competitive intelligence report.");

keyConceptEntry(doc, "LOCAL SEO (SEARCH ENGINE OPTIMIZATION)",
  'SEO is the practice of making a business show up higher in Google search results — without paying for ads. "Local" SEO ' +
  "specifically refers to appearing when someone searches for a service in a specific city or neighborhood. For example, when " +
  'someone in Mueller types "coworking space" into Google, the businesses at the top didn\'t pay to be there — they earned ' +
  "that placement through complete profiles, consistent reviews, and content that matches what people are searching for. " +
  "Local SEO is essentially free advertising: it costs time, not money, and results compound over months and years."
);

keyConceptEntry(doc, "GOOGLE BUSINESS PROFILE (GBP)",
  "When you search for a business on Google or Google Maps, you see a panel showing the business's name, hours, photos, " +
  "reviews, and a link to their website. That panel is a Google Business Profile — a free listing any business can claim and " +
  'manage at no cost. The businesses that appear in the top three results on Google Maps (the "Map Pack") receive the vast ' +
  "majority of clicks from people searching nearby. An incomplete or unoptimized profile — missing photos, outdated hours, " +
  "or few reviews — causes Google to rank that business lower, even if the actual product is superior to better-maintained competitors."
);

keyConceptEntry(doc, '"NEAR ME" SEARCH',
  'When someone types "coworking space near me" into Google, Google automatically uses their device\'s location to show ' +
  "businesses within a few miles. This type of search carries extremely high purchase intent — the person has already decided " +
  "they want the product and is simply choosing which business to contact. For service businesses like coworking spaces, " +
  '"near me" searches are often the single most valuable customer acquisition moment, and ranking well for them requires a ' +
  "fully optimized and actively managed Google Business Profile."
);

keyConceptEntry(doc, "MAP PACK / GOOGLE MAPS RANKINGS",
  "When you search for a local business on Google, you typically see a map with three business pins highlighted — this is " +
  'called the "Map Pack." Studies consistently show that these three businesses receive roughly 70–80% of all clicks from ' +
  "that search. Falling off the top-three list means most potential customers never see a business at all, even with a strong " +
  "website. Ranking factors include: number and recency of Google reviews, completeness of the Business Profile, proximity " +
  "to the searcher, and click-through rate on the listing."
);

keyConceptEntry(doc, "REVIEW VELOCITY",
  "Review velocity refers to the rate at which a business receives new Google reviews over time — not just the total count. " +
  "Google's algorithm weights recent reviews more heavily because they signal a business is currently active and relevant. " +
  "A business with 200 reviews but none in the past six months will rank lower than a comparable business with 80 reviews " +
  "posted consistently over the past year. Actively requesting reviews from members immediately after positive interactions " +
  "is a high-ROI, zero-cost habit for any location-based business."
);

footer(doc, "Kinetic Workspace — Supplemental Note", "CONFIDENTIAL");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 10 — KEY CONCEPTS (2 of 2)
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
doc.y = 60;
doc.fontSize(8).fillColor(LGRAY).font("Helvetica-Bold")
  .text("KEY CONCEPTS EXPLAINED (CONT.)", ML, doc.y, { characterSpacing: 0.6 });
doc.moveTo(ML, doc.y + 12).lineTo(W - MR, doc.y + 12).lineWidth(0.4).strokeColor(RULE).stroke();
doc.y = doc.y + 24;

keyConceptEntry(doc, "ORGANIC SEARCH TRAFFIC",
  '"Organic" traffic means visitors who arrive at a website by clicking a regular, non-paid search result. It is contrasted with ' +
  '"paid" traffic, which comes from sponsored ads purchased on a cost-per-click basis. Organic traffic requires investment in ' +
  "content (blog posts, location pages, FAQs) and time to build, but compounds over time: a well-written post about " +
  '"best coworking spaces in Mueller Austin" can drive qualified visitors for years after publication at no ongoing cost.'
);

keyConceptEntry(doc, "LONG-TAIL KEYWORDS",
  'A "keyword" is the phrase a person types into a search engine. "Coworking" is a broad keyword — searched millions of ' +
  "times daily and nearly impossible for a small business to rank for against Industrious and Regus. A \"long-tail keyword\" " +
  'is a more specific phrase — like "private office rental Mueller Austin" or "meeting room East Austin" — searched less ' +
  "frequently but by people much closer to a purchase decision. Long-tail keywords are where small businesses win: lower " +
  "competition, higher searcher intent, and a single well-written blog post or location page can realistically reach page one."
);

keyConceptEntry(doc, "MEMBER REFERRAL PROGRAM",
  "A referral program is a structured system that rewards existing customers for introducing new customers to the business. " +
  "For a coworking space, this typically means offering a current member a free month of membership (or account credit) for " +
  "every new member they refer who signs a contract. Referral programs are among the highest-converting acquisition channels " +
  "for community-based businesses because the prospect arrives pre-sold by a trusted peer — and referred members tend to " +
  "stay longer due to existing social ties within the community."
);

keyConceptEntry(doc, "HYBRID WORK",
  "Hybrid work describes an arrangement where workers split time between home and an office — rather than commuting five " +
  "days a week. This shift, which accelerated significantly after 2020, created structural demand for neighborhood coworking: " +
  "professionals who want a professional environment close to home without a long commute. This is the fundamental market " +
  "tailwind behind Kinetic Workspace's business model and the primary reason neighborhood coworking locations are " +
  "outperforming downtown coworking on occupancy growth."
);

keyConceptEntry(doc, "CAGR (COMPOUND ANNUAL GROWTH RATE)",
  "CAGR expresses how fast a market grows per year, on average, over a multi-year period. A 15% CAGR means that if the " +
  "market is $10B today, it will be approximately $11.5B next year, $13.2B the year after, and so on — each year's growth " +
  "builds on the prior year's larger base. It is used to project future market size and to benchmark whether a specific " +
  "company is growing faster or slower than its industry average."
);

keyConceptEntry(doc, "ORGANIC SOCIAL CONTENT",
  "Organic social content refers to posts published on social media platforms (Instagram, LinkedIn) that appear in followers' " +
  'feeds for free — as opposed to "paid social," which is advertising purchased directly from the platform. For a community-' +
  "oriented business like Kinetic Workspace, organic content (member spotlights, space photography, event recaps) keeps " +
  "existing members engaged and demonstrates community quality to prospective members researching the space. Founder-led " +
  "businesses with genuine community stories consistently outperform corporate chains on organic engagement."
);

footer(doc, "Kinetic Workspace — Supplemental Note", "CONFIDENTIAL");


// ════════════════════════════════════════════════════════════════════════════
// PAGE 11 — DATA SOURCES & DISCLOSURE
// ════════════════════════════════════════════════════════════════════════════
doc.addPage();
sectionHeader(doc, "02", "Data Sources & Research Disclosure",
  "Sources used to compile, verify, and synthesize the analysis in this competitive intelligence report.");

sourceCategory(doc, "Kinetic Workspace — Company Data");
sourceBullet(doc, "Membership estimate, capacity, and founding year: kineticworkspace.com and Google Maps listing");
sourceBullet(doc, "Revenue estimate (~$720K): Derived from published pricing tiers, estimated occupancy, and industry revenue-per-desk benchmarks for single-location boutique operators. Kinetic is a private company and does not publicly disclose revenue; this figure is an estimate, not a reported financial result.");
sourceBullet(doc, "Google rating and review count: Google Maps listing at time of research");

doc.moveDown(0.4);
sourceCategory(doc, "Competitor Data");
sourceBullet(doc, "Common Desk Austin locations and pricing: commondesk.com and Google Maps listings");
sourceBullet(doc, "Industrious Domain Northside: industriousoffice.com, Google Maps listing, and CBRE partnership press release (2021)");
sourceBullet(doc, "Regus Austin locations: regus.com and Google Maps listings");
sourceBullet(doc, "Capital Factory profile and member network: capitalfactory.com and Crunchbase company data");
sourceBullet(doc, "The Yard Austin: theyardcoworking.com and Google Maps listing");

doc.moveDown(0.4);
sourceCategory(doc, "Market Size & Growth Data");
sourceBullet(doc, "U.S. flexible workspace market size ($26B+): Mordor Intelligence, Flexible Office Space Market Report (2023–2024); corroborated by CBRE Flex Space Outlook");
sourceBullet(doc, "CAGR projection (13–15% through 2028): Grand View Research, Coworking Space Market; CoworkingResources.com annual industry survey; JLL Future of Work research");
sourceBullet(doc, "Austin metro flex market (~$980M): Derived from CBRE regional office market reports and flex space penetration rate estimates; directional estimate, not a reported figure");
sourceBullet(doc, "Suburban coworking outperforming urban on occupancy growth: CBRE U.S. Flexible Office Trends (2023); Cushman & Wakefield Suburban Office Market Outlook");

doc.moveDown(0.4);
sourceCategory(doc, "Industry Events");
sourceBullet(doc, "WeWork Chapter 11 bankruptcy (November 2023): WeWork's filing in the U.S. Bankruptcy Court for the District of New Jersey; reported by The Wall Street Journal, Bloomberg, and Reuters");
sourceBullet(doc, "Common Desk / WeWork acquisition: WeWork press release (2022) and reported by CoStar and Bisnow");

doc.moveDown(0.4);
sourceCategory(doc, "SEO & Search Behavior Data");
sourceBullet(doc, "Map Pack click-share (~70–80% of local search clicks): BrightLocal Local Search Consumer Survey (2023); Moz Local Search Ranking Factors");
sourceBullet(doc, '"Near me" search behavior and purchase intent: Google/Ipsos consumer research on local search behavior');
sourceBullet(doc, "Review velocity impact on rankings: BrightLocal Local Consumer Review Survey (annual); Moz Local Ranking Factors study");
sourceBullet(doc, "Competitive traffic benchmarking: DataForSEO estimated traffic data for subject company and competitor domains");

// disclosure box
doc.moveDown(0.8);
const dY = doc.y;
const dH = 100;
doc.rect(ML, dY, CW, dH).fill("#FFF8EC");
doc.rect(ML, dY, 3, dH).fill(GOLD);
doc.fontSize(8).fillColor(GOLD).font("Helvetica-Bold")
  .text("IMPORTANT DISCLOSURE", ML + 12, dY + 10, { characterSpacing: 0.6 });
doc.fontSize(8.5).fillColor("#6B5500").font("Helvetica")
  .text(
    "This report was produced using Claude (Anthropic's AI), which synthesized publicly available information and supplemented it with " +
    "real-time web research where applicable. Revenue figures for private companies are estimates derived from industry benchmarks and " +
    "public signals (employee count, location count, pricing tiers), not disclosed financial statements. Location data sourced from " +
    "third-party platforms may lag physical changes by 6–18 months; subject company should verify all location references against " +
    "current operations. All market size figures are drawn from third-party research firms and should be treated as directional. " +
    "Wex Advisory recommends verifying specific competitor claims directly before using them in external or legal communications.",
    ML + 12, dY + 22, { width: CW - 20, lineGap: 2 });

footer(doc, "Kinetic Workspace — Supplemental Note", "CONFIDENTIAL");


// ── Finalize ─────────────────────────────────────────────────────────────────
doc.end();
console.log("✓ Sample report written to public/sample-report.pdf");
