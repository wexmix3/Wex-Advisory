// Run: node scripts/generate-sample-report.js
// Output: public/sample-report.pdf

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const NAVY  = "#0F1F3D";
const GOLD  = "#C8A84B";
const WHITE = "#FFFFFF";
const GRAY  = "#4A4A5A";
const LGRAY = "#9999AA";
const RULE  = "#E0E4EE";
const CREAM = "#F7F8FC";
const RED   = "#B83232";
const AMBER = "#C07020";

const W = 612, H = 792, ML = 64, MR = 64;
const CW = W - ML - MR; // 484

const doc = new PDFDocument({ size: "LETTER", margin: 0, info: {
  Title: "Competitive Intelligence Report — Wex Advisory (Sample)",
  Author: "Wex Advisory",
}});
doc.pipe(fs.createWriteStream(path.join(__dirname, "../public/sample-report.pdf")));

// ── Layout helpers ────────────────────────────────────────────────────────────

function bg(color) { doc.rect(0, 0, W, H).fill(color); }

function hdr(label) {
  doc.rect(0, 0, W, 20).fill(CREAM);
  doc.moveTo(0, 20).lineTo(W, 20).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.fontSize(6.5).font("Helvetica-Bold").fillColor(LGRAY)
    .text(label.toUpperCase(), ML, 7, { characterSpacing: 0.7, lineBreak: false });
  doc.text("WEX ADVISORY  |  CONFIDENTIAL", 0, 7, { width: W - MR, align: "right", lineBreak: false });
  doc.y = 44;
}

function ftr(label) {
  doc.moveTo(ML, H - 28).lineTo(W - MR, H - 28).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.fontSize(6.5).font("Helvetica").fillColor(LGRAY)
    .text(label, ML, H - 18, { lineBreak: false });
  doc.font("Helvetica-Bold").text("CONFIDENTIAL", 0, H - 18, { width: W - MR, align: "right", lineBreak: false });
}

function secHead(num, title) {
  const y = doc.y;
  doc.fontSize(64).font("Helvetica-Bold").fillColor("#EAECF4")
    .text(String(num).padStart(2, "0"), ML - 4, y - 6, { lineBreak: false });
  doc.fontSize(22).font("Helvetica-Bold").fillColor(NAVY)
    .text(title, ML + 50, y + 8, { lineBreak: false });
  doc.y = y + 52;
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(1.5).strokeColor(GOLD).stroke();
  doc.y += 16;
}

function rule() {
  doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(0.4).strokeColor(RULE).stroke();
  doc.y += 10;
}

function body(text, opts) {
  doc.fontSize(10).font("Helvetica").fillColor(GRAY)
    .text(text, ML, doc.y, { width: CW, lineGap: 2, ...opts });
  doc.y += 10;
}

function sub(text) {
  doc.y += 4;
  doc.fontSize(11).font("Helvetica-Bold").fillColor(NAVY)
    .text(text, ML, doc.y);
  doc.y += 14;
}

function bullet(text, x) {
  const indent = x || ML + 10;
  doc.fontSize(9.5).font("Helvetica").fillColor(GRAY)
    .text("›  " + text, indent, doc.y, { width: CW - (indent - ML), lineGap: 2 });
  doc.y += 6;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 1: COVER
// ═══════════════════════════════════════════════════════════════════════════════

bg(NAVY);
doc.rect(0, 0, W, 4).fill(GOLD);

doc.fontSize(8).font("Helvetica-Bold").fillColor(GOLD)
  .text("WEX ADVISORY", ML, 26, { characterSpacing: 2.5, lineBreak: false });
doc.fontSize(7).font("Helvetica-Bold").fillColor(`${WHITE}25`)
  .text("CONFIDENTIAL", 0, 26, { width: W - MR, align: "right", characterSpacing: 1.2, lineBreak: false });

const cy = 230;
doc.fontSize(9.5).font("Helvetica-Bold").fillColor(GOLD)
  .text("COMPETITIVE INTELLIGENCE REPORT", ML, cy, { characterSpacing: 1.4, lineBreak: false });
doc.fontSize(42).font("Helvetica-Bold").fillColor(WHITE)
  .text("Meridian Workspace", ML, cy + 20);
doc.fontSize(14).font("Helvetica").fillColor(`${WHITE}60`)
  .text("Austin, TX", ML, cy + 74);
doc.moveTo(ML, cy + 100).lineTo(ML + 52, cy + 100).lineWidth(2).strokeColor(GOLD).stroke();
doc.fontSize(11).font("Helvetica").fillColor(`${WHITE}50`)
  .text("Competitor Analysis  ·  Market Sizing  ·  Strategic Recommendations", ML, cy + 114);

// Section index tiles
const tiles = [
  "01  Executive Summary", "02  Company Overview",
  "03  Competitive Landscape", "04  Competitive Gaps",
  "05  Market Position", "06  Recommendations",
];
const tw = (CW - 10) / 3;
tiles.forEach((t, i) => {
  const tx = ML + (i % 3) * (tw + 5);
  const ty = 558 + Math.floor(i / 3) * 24;
  doc.rect(tx, ty, tw, 18).fill(`${WHITE}08`);
  doc.fontSize(7.5).font("Helvetica").fillColor(`${WHITE}40`)
    .text(t, tx + 8, ty + 5, { lineBreak: false });
});

doc.moveTo(ML, H - 48).lineTo(W - MR, H - 48).lineWidth(0.4).strokeColor(`${WHITE}15`).stroke();
doc.fontSize(7.5).font("Helvetica").fillColor(`${WHITE}25`)
  .text("Prepared May 2025  ·  Wex Advisory  ·  wexadvisory.com", ML, H - 36);

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 2: EXECUTIVE BRIEF
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("Executive Brief");

doc.fontSize(18).font("Helvetica-Bold").fillColor(NAVY).text("Executive Brief", ML, doc.y);
doc.y += 26;

// Three cards
const cards = [
  { lbl: "SITUATION", txt: "Meridian Workspace operates in a high-growth Austin coworking market with 14 identifiable competitors and an estimated $280M annual spend. Premium demand is concentrated among tech companies and independent professionals." },
  { lbl: "PROBLEM", txt: "Despite strong product quality, Meridian is losing consideration to higher-visibility competitors. SEO traffic lags Industrious by 3.4x. Pricing transparency and online presence are the primary friction points in the funnel." },
  { lbl: "PRIORITY ACTION", txt: "Capture near-term demand through a pricing page launch, Google Business optimization, and a day pass product — before the Q3 seasonal peak in corporate workspace renewals." },
];
const cw3 = (CW - 16) / 3, ch = 88, cardsY = doc.y;
cards.forEach((c, i) => {
  const cx = ML + i * (cw3 + 8);
  doc.rect(cx, cardsY, cw3, ch).strokeColor(RULE).lineWidth(0.8).stroke();
  doc.rect(cx, cardsY, cw3, 3).fill(NAVY);
  doc.fontSize(6.5).font("Helvetica-Bold").fillColor(GOLD)
    .text(c.lbl, cx + 10, cardsY + 12, { characterSpacing: 0.7, lineBreak: false });
  doc.fontSize(8.5).font("Helvetica").fillColor(GRAY)
    .text(c.txt, cx + 10, cardsY + 25, { width: cw3 - 20, lineGap: 1.5 });
});
doc.y = cardsY + ch + 18;

// Stat tiles
const stats = [
  { v: "6.4", u: "/10", lbl: "Market Position\nScore" },
  { v: "5", u: "", lbl: "Competitor\nProfiles" },
  { v: "3.4x", u: "", lbl: "Traffic Gap vs.\nIndustrious" },
  { v: "3", u: "", lbl: "Immediate\nPriority Actions" },
];
const tw2 = (CW - 12) / 4, th = 62, tilesY = doc.y;
stats.forEach((s, i) => {
  const tx2 = ML + i * (tw2 + 4);
  doc.rect(tx2, tilesY, tw2, th).fill(CREAM);
  doc.rect(tx2, tilesY, tw2, th).strokeColor(RULE).lineWidth(0.5).stroke();
  doc.fontSize(26).font("Helvetica-Bold").fillColor(NAVY)
    .text(s.v, tx2, tilesY + 8, { width: tw2, align: "center", lineBreak: false });
  doc.fontSize(7.5).font("Helvetica").fillColor(LGRAY)
    .text(s.lbl, tx2, tilesY + 42, { width: tw2, align: "center" });
});
doc.y = tilesY + th + 18;

sub("Key Findings");
[
  "Industrious and Capital Factory dominate page-one rankings for all Austin coworking terms — Meridian holds zero.",
  "Pricing is competitive vs. Industrious ($500–750/mo) but Meridian has no pricing page, eliminating 73% of self-qualifying prospects.",
  "Community programming is an underdeveloped differentiator — 3 of 5 competitors offer no structured events calendar.",
  "Corporate day pass demand is rising; Meridian lacks a discoverable day-pass product online.",
  "Google rating of 4.6 is strong, but 47 reviews vs. the competitor average of 214 limits Maps visibility.",
].forEach(f => bullet(f));

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 3: TABLE OF CONTENTS
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("Table of Contents");
doc.fontSize(18).font("Helvetica-Bold").fillColor(NAVY).text("Table of Contents", ML, doc.y);
doc.y += 26;

const toc = [
  ["01", "Executive Summary", "4"],
  ["02", "Company Overview", "5"],
  ["03", "Competitive Landscape", "6–10"],
  ["04", "Competitive Gaps", "11"],
  ["05", "Market Position Assessment", "12"],
  ["06", "Strategic Recommendations", "13–14"],
  ["—",  "Supplemental Note: Key Concepts & Data Sources", "15–17"],
];
toc.forEach(([num, title, pg], i) => {
  const ty = doc.y;
  doc.rect(ML, ty, CW, 36).fill(i % 2 === 0 ? CREAM : WHITE);
  doc.fontSize(20).font("Helvetica-Bold").fillColor(i < 6 ? "#DDDDE8" : "#EEEEEE")
    .text(num, ML + 8, ty + 6, { lineBreak: false });
  doc.fontSize(11).font("Helvetica-Bold").fillColor(NAVY)
    .text(title, ML + 48, ty + 12, { lineBreak: false });
  doc.fontSize(10).font("Helvetica").fillColor(LGRAY)
    .text(pg, 0, ty + 13, { width: W - MR, align: "right", lineBreak: false });
  doc.y = ty + 36;
});

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 4: 01 EXECUTIVE SUMMARY
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("01  Executive Summary");
secHead(1, "Executive Summary");

body("This report provides an independent competitive assessment of Meridian Workspace, a premium coworking operator in Austin's 2nd Street District. Research was conducted in April–May 2025 using publicly available data: web traffic analytics, Google Business profiles, pricing pages, LinkedIn company data, and direct observation. Five direct competitors were profiled in depth.");
doc.y += 4;

sub("Market Context");
body("Austin's coworking market is in a consolidation phase following pandemic-era oversupply. Demand has recovered to approximately 94% of 2019 levels, driven by tech sector growth, remote work normalization, and an influx of corporate satellite offices. The Austin MSA is projected to add 38,000 professional services jobs through 2027, sustaining demand for flexible workspace across all price tiers.");

sub("Meridian's Current Position");
body("Meridian competes in the premium segment ($500–$750/desk/month), alongside Industrious and Capital Factory. It differentiates on boutique hospitality and community programming, but currently underutilizes these strengths in its marketing and digital presence. Its market position score of 6.4/10 reflects strong product fundamentals offset by below-average digital discoverability.");

sub("Critical Gaps Identified");
[
  "Search visibility: Zero page-one rankings for core Austin coworking keywords",
  "Review volume: 47 Google reviews vs. competitor average of 214",
  "Pricing transparency: No pricing page — the highest-friction barrier in the funnel",
  "Day pass product: Inbound demand confirmed, but product not discoverable online",
  "LinkedIn presence: 310 followers, no posting cadence vs. Industrious 3–4x/week",
].forEach(g => bullet(g));

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 5: 02 COMPANY OVERVIEW
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("02  Company Overview");
secHead(2, "Company Overview");

const profile = [
  ["Founded", "2021"],
  ["Type", "Independent boutique coworking operator"],
  ["Location", "2nd Street District, Austin, TX (single location)"],
  ["Square footage", "~8,200 sq ft"],
  ["Total desks", "~120 (dedicated + hot desks + private offices)"],
  ["Price range", "$500–$750/desk/month (dedicated)  |  $150/mo hot desk"],
  ["Products", "Dedicated desks, private offices (2–8 person), hot desks, event space rental"],
  ["Est. monthly revenue", "$85,000–$120,000 at 75–85% utilization"],
  ["Primary target", "Tech startups, independent professionals, small teams (2–10 people)"],
  ["Google rating", "4.6 / 5  (47 reviews)"],
];

profile.forEach((row, i) => {
  const ry = doc.y;
  doc.rect(ML, ry, 162, 20).fill(i % 2 === 0 ? CREAM : WHITE);
  doc.rect(ML + 162, ry, CW - 162, 20).fill(WHITE);
  doc.rect(ML, ry, CW, 20).strokeColor(RULE).lineWidth(0.4).stroke();
  doc.fontSize(7.5).font("Helvetica-Bold").fillColor(LGRAY)
    .text(row[0].toUpperCase(), ML + 8, ry + 6, { characterSpacing: 0.3, lineBreak: false });
  doc.fontSize(9).font("Helvetica").fillColor(NAVY)
    .text(row[1], ML + 170, ry + 6, { lineBreak: false });
  doc.y = ry + 20;
});

doc.y += 14;
sub("Value Proposition");
body("Meridian positions itself as the alternative to corporate coworking — offering curated community, premium amenities (espresso bar, standing desks, sound-masking), and a membership experience modeled after private clubs rather than shared offices. Its design-forward space and location in Austin's most walkable district attract members from media, consulting, and early-stage tech.");

sub("Primary Advantages");
["Boutique atmosphere with intentional design and curation",
 "2nd Street location: walkable to 60+ restaurants, Town Lake trail, ACL Live",
 "Active events calendar: average 6 programming events per month",
 "High member retention: ~88% month-over-month",
].forEach(b => bullet(b));

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES 6–10: 03 COMPETITIVE LANDSCAPE
// ═══════════════════════════════════════════════════════════════════════════════

const comps = [
  {
    name: "Industrious", cat: "Premium National Chain",
    meta: { URL: "industriousoffice.com", Location: "The Domain, 10710 Research Blvd", Pricing: "$650–$900/desk/mo", Rating: "4.8 / 5 (312 reviews)", Traffic: "~8,400 visits/mo" },
    desc: "Industrious is the leading premium flexible workspace brand in the U.S., operating 160+ locations nationwide. Its Austin location at The Domain anchors the north Austin tech corridor and serves enterprise clients including Google, Lyft, and Salesforce. Industrious differentiates on its service model — all-inclusive pricing with hospitality-grade staffing — and its enterprise sales team is its primary growth engine.",
    strengths: ["Dominates branded search — ranks #1 for \"coworking Austin\" and 14 related terms","Enterprise sales infrastructure — dedicated account team for Fortune 500 clients","All-inclusive pricing eliminates line-item comparison friction","312 Google reviews dominate the social proof layer of the consideration stage","National brand recognition reduces trust barriers for out-of-market relocators"],
    weaknesses: ["The Domain location is inconvenient for downtown Austin professionals","Corporate service model feels impersonal; low community programming investment","Price premium ($650+) prices out solo operators and early-stage startups","Standardized design — no local Austin character or neighborhood identity","Member churn higher than boutique operators; limited community cohesion"],
  },
  {
    name: "Capital Factory", cat: "Tech Accelerator + Coworking",
    meta: { URL: "capitalfactory.com", Location: "701 Brazos St, Downtown Austin", Pricing: "$350–$650/desk/mo", Rating: "4.5 / 5 (188 reviews)", Traffic: "~5,200 visits/mo" },
    desc: "Capital Factory is Austin's most recognized startup accelerator, incubator, and coworking hub. Located in the heart of downtown, it blends workspace with venture capital access, founder programming, and a 10,000-member network. Members are predominantly early-stage tech founders, and the space has become synonymous with Austin's startup identity. Capital Factory competes not on workspace quality — but on network access.",
    strengths: ["Unique value prop: workspace + VC access + accelerator programming","10,000+ alumni network creates unmatched referral and hiring flywheel","Deeply embedded in Austin tech identity — high aspirational brand equity","SXSW and Austin tech event anchor provides year-round thought leadership","Corporate partners (Dell, Google, Amazon) fund programming, subsidizing member costs"],
    weaknesses: ["Physical workspace quality is secondary to programming — dated layout","Not suitable for non-tech professionals or client-facing companies","Crowded, noisy environment — poor for focus work or confidential calls","Member community is highly transient — limited long-term retention","Perception barrier: seen as \"for startups only\" by mid-market professionals"],
  },
  {
    name: "WeWork", cat: "National Chain (Mid-Market Repositioning)",
    meta: { URL: "wework.com", Location: "301 Congress Ave, Downtown Austin", Pricing: "$400–$700/desk/mo", Rating: "4.2 / 5 (93 reviews)", Traffic: "~3,800 visits/mo" },
    desc: "WeWork operates from the iconic 301 Congress building overlooking Lady Bird Lake. Post-bankruptcy restructuring in 2023 stabilized operations, but national media coverage of its financial difficulties permanently affected enterprise trust. The Austin location maintains strong occupancy due to its premium address and views, but is losing premium positioning to Industrious and boutique operators like Meridian.",
    strengths: ["Prime address at 301 Congress — one of Austin's most recognizable buildings","Day pass product is available and marketed — captures transient and trial demand","Global network: members can work at any WeWork worldwide","Largest physical footprint in downtown Austin — accommodates large teams quickly","Competitive pricing post-bankruptcy — willing to negotiate multi-month discounts"],
    weaknesses: ["Brand trust permanently damaged by bankruptcy narrative — enterprise clients avoid","Service quality has declined post-restructuring; staffing cuts are visible","Generic design with no Austin identity — indistinguishable from any other city","High churn — members frequently cite declining amenity quality in reviews","4.2 Google rating is the lowest among premium downtown competitors"],
  },
  {
    name: "Common Desk", cat: "Regional Operator (Mid-Market)",
    meta: { URL: "commondesk.com", Location: "816 Congress Ave + East 6th St", Pricing: "$299–$499/desk/mo", Rating: "4.7 / 5 (142 reviews)", Traffic: "~2,100 visits/mo" },
    desc: "Common Desk is a Dallas-based regional coworking operator that entered Austin in 2019. With two Austin locations, it targets price-sensitive professionals and small businesses who want a community experience without the premium price tag. Its community programming (weekly coffee hours, happy hours) is its strongest differentiator, and its Congress Avenue location directly competes with Meridian for downtown-adjacent demand.",
    strengths: ["Lowest price point among community-focused competitors ($299/mo dedicated)","Strong programming — weekly events consistently draw 20–40 attendees","4.7 Google rating with 142 reviews — best rating-per-review ratio in the market","Two Austin locations provide flexibility single-location operators cannot match","Locally owned perception resonates with Austin's anti-chain cultural preference"],
    weaknesses: ["Mid-market positioning limits appeal to client-facing and funded teams","Limited private office inventory — loses larger teams to premium operators","Below-average amenities vs. premium tier (no espresso bar, older AV equipment)","Website lacks a pricing page — friction point confirmed in prospect interviews","East 6th location parking constraints generate consistent negative reviews"],
  },
  {
    name: "Regus / IWG", cat: "Mass-Market Global Chain",
    meta: { URL: "regus.com/austin", Location: "6 locations across Austin metro", Pricing: "$150–$350/desk/mo", Rating: "3.8 / 5 (avg. 6 locations)", Traffic: "~1,400 visits/mo" },
    desc: "Regus, operating under the IWG parent alongside Spaces and HQ, is the world's largest flexible workspace provider. Its Austin presence spans six locations, targeting corporate road warriors, satellite office users, and price-sensitive solopreneurs. Regus does not compete with Meridian on product or community — it competes on price, availability, and global corporate account relationships.",
    strengths: ["Largest location footprint in Austin — 6 sites across the metro","Global corporate account relationships drive occupancy independent of local marketing","Lowest price point in the market — unchallenged in the sub-$200/mo segment","Day office and meeting room inventory unmatched for transient corporate users","IWG network reciprocity: 3,300+ locations worldwide for road warriors"],
    weaknesses: ["3.8 Google rating (lowest in market) reflects systemic service quality issues","Zero community programming — purely transactional, no member relationships","Dated facilities; design aesthetic actively repels creative and tech talent","High churn; members routinely graduate to premium operators as they grow","Brand carries no status signal — liability for client-facing professionals"],
  },
];

comps.forEach((comp, ci) => {
  doc.addPage();
  hdr("03  Competitive Landscape");

  if (ci === 0) {
    secHead(3, "Competitive Landscape");
    body("The following five profiles cover Meridian Workspace's most direct competitors, evaluated across seven dimensions: pricing, product breadth, digital presence, community programming, target market alignment, physical quality, and brand equity.");
    doc.y += 8;
  } else {
    doc.y = 44;
  }

  // Header bar
  const hy = doc.y;
  doc.rect(ML, hy, CW, 44).fill(NAVY);
  doc.rect(ML, hy, 44, 44).fill(GOLD);
  doc.fontSize(16).font("Helvetica-Bold").fillColor(NAVY)
    .text(String(ci + 1), ML, hy + 13, { width: 44, align: "center", lineBreak: false });
  doc.fontSize(15).font("Helvetica-Bold").fillColor(WHITE)
    .text(comp.name, ML + 54, hy + 6, { lineBreak: false });
  doc.fontSize(7.5).font("Helvetica").fillColor(`${WHITE}65`)
    .text(comp.cat.toUpperCase(), ML + 54, hy + 27, { characterSpacing: 0.4, lineBreak: false });
  doc.y = hy + 50;

  // Meta row
  const metaKeys = Object.keys(comp.meta);
  const mw = CW / metaKeys.length, my = doc.y;
  doc.rect(ML, my, CW, 46).fill(CREAM);
  doc.rect(ML, my, CW, 46).strokeColor(RULE).lineWidth(0.4).stroke();
  metaKeys.forEach((k, mi) => {
    const mx = ML + mi * mw;
    if (mi > 0) doc.moveTo(mx, my + 6).lineTo(mx, my + 40).lineWidth(0.4).strokeColor(RULE).stroke();
    doc.fontSize(6.5).font("Helvetica-Bold").fillColor(LGRAY)
      .text(k.toUpperCase(), mx + 8, my + 9, { characterSpacing: 0.4, width: mw - 16, lineBreak: false });
    doc.fontSize(8.5).font("Helvetica-Bold").fillColor(NAVY)
      .text(comp.meta[k], mx + 8, my + 24, { width: mw - 16, lineBreak: false });
  });
  doc.y = my + 56;

  // Description
  doc.fontSize(10).font("Helvetica").fillColor(GRAY)
    .text(comp.desc, ML, doc.y, { width: CW, lineGap: 2 });
  doc.y += 16;

  // Strengths / Weaknesses two columns
  const colW = (CW - 12) / 2;
  const labY = doc.y;

  doc.rect(ML, labY, colW, 22).fill(NAVY);
  doc.fontSize(7.5).font("Helvetica-Bold").fillColor(WHITE)
    .text("STRENGTHS", ML + 10, labY + 7, { characterSpacing: 0.5, lineBreak: false });

  doc.rect(ML + colW + 12, labY, colW, 22).fill(RED);
  doc.fontSize(7.5).font("Helvetica-Bold").fillColor(WHITE)
    .text("WEAKNESSES", ML + colW + 22, labY + 7, { characterSpacing: 0.5, lineBreak: false });

  let lY = labY + 30;
  let rY = labY + 30;

  comp.strengths.forEach(s => {
    doc.fontSize(9).font("Helvetica").fillColor(GRAY)
      .text("›  " + s, ML + 8, lY, { width: colW - 16, lineGap: 1.5 });
    lY = doc.y + 5;
    doc.y = lY;
  });

  doc.y = labY + 30;
  comp.weaknesses.forEach(w => {
    doc.fontSize(9).font("Helvetica").fillColor(GRAY)
      .text("›  " + w, ML + colW + 20, doc.y, { width: colW - 16, lineGap: 1.5 });
    rY = doc.y + 5;
    doc.y = rY;
  });

  doc.y = Math.max(lY, rY) + 8;
  ftr(`Competitor ${ci + 1} of 5  |  Wex Advisory  |  Meridian Workspace  |  May 2025`);
});

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 11: 04 COMPETITIVE GAPS
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("04  Competitive Gaps");
secHead(4, "Competitive Gaps");

const gaps = [
  { p: "HIGH", c: RED, title: "Search & Digital Discoverability", body: "Meridian holds zero page-one Google rankings for any Austin coworking keyword. Industrious, Capital Factory, and WeWork collectively dominate the top 8 organic positions. Without paid search or SEO remediation, Meridian is invisible to the highest-intent buyers at the moment of decision." },
  { p: "HIGH", c: RED, title: "Pricing Transparency", body: "No pricing page exists on the Meridian website. Research shows 73% of coworking prospects self-qualify on price before contacting an operator. The absence of a pricing page forces prospective members to contact competitors who publish pricing openly — this is the single highest-friction barrier in Meridian's funnel." },
  { p: "HIGH", c: RED, title: "Review Volume on Google Maps", body: "47 Google reviews vs. a competitor average of 214. Review volume is a primary factor in Google Maps local pack ranking. Meridian's 4.6 rating is excellent, but with fewer than 50 reviews, Google classifies the profile as low-confidence and ranks it outside the local pack for most target terms." },
  { p: "MEDIUM", c: AMBER, title: "Day Pass Product Visibility", body: "Day passes are reportedly available but not discoverable — no landing page, no Google Business listing, no published pricing. Transient corporate users represent an estimated $40,000–$80,000/year revenue opportunity currently defaulting to WeWork and Industrious, who have published and marketed day pass products." },
  { p: "MEDIUM", c: AMBER, title: "Event & Community Merchandising", body: "Meridian's events calendar is one of the strongest in the Austin market, averaging 6 events per month. However, the website does not display upcoming or past events. This is the brand's clearest differentiator versus corporate operators and it is entirely invisible to prospective members during the consideration phase." },
  { p: "MEDIUM", c: AMBER, title: "LinkedIn Organic Presence", body: "Meridian's LinkedIn company page has 310 followers with no consistent posting cadence. Industrious Austin posts 2–4x per week. LinkedIn is the primary channel through which corporate buyers discover and evaluate coworking spaces — Meridian has no presence at the point of decision for its highest-value buyer segment." },
];

gaps.forEach(g => {
  const gy = doc.y;
  doc.rect(ML, gy, 52, 18).fill(g.c);
  doc.fontSize(7).font("Helvetica-Bold").fillColor(WHITE)
    .text(g.p, ML, gy + 5, { width: 52, align: "center", characterSpacing: 0.5, lineBreak: false });
  doc.fontSize(10.5).font("Helvetica-Bold").fillColor(NAVY)
    .text(g.title, ML + 60, gy + 2, { lineBreak: false });
  doc.y = gy + 22;
  doc.fontSize(9).font("Helvetica").fillColor(GRAY)
    .text(g.body, ML, doc.y, { width: CW, lineGap: 1.5 });
  doc.y += 10;
  rule();
});

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 12: 05 MARKET POSITION ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("05  Market Position Assessment");
secHead(5, "Market Position Assessment");

// Score badge
const sbY = doc.y;
doc.rect(ML, sbY, 100, 78).fill(NAVY);
doc.fontSize(36).font("Helvetica-Bold").fillColor(GOLD)
  .text("6.4", ML, sbY + 12, { width: 100, align: "center", lineBreak: false });
doc.fontSize(7.5).font("Helvetica-Bold").fillColor(`${WHITE}55`)
  .text("OUT OF 10", ML, sbY + 56, { width: 100, align: "center", characterSpacing: 0.5, lineBreak: false });
doc.fontSize(10).font("Helvetica-Bold").fillColor(GRAY)
  .text("MARKET POSITION SCORE", ML + 110, sbY + 10, { lineBreak: false });
doc.fontSize(9).font("Helvetica").fillColor(GRAY)
  .text("Score reflects 7 weighted dimensions: product quality, pricing, digital presence, community, location, review profile, and brand equity. Assessed vs. 5 direct competitors as of May 2025.", ML + 110, sbY + 28, { width: CW - 118, lineGap: 2 });
doc.y = sbY + 90;

// Comparison table
const dims = [
  { d: "Product Quality", mer: 8, ind: 9, wew: 6, com: 6, cap: 7, reg: 4 },
  { d: "Price / Value", mer: 7, ind: 6, wew: 7, com: 9, cap: 8, reg: 9 },
  { d: "Digital Presence", mer: 4, ind: 9, wew: 8, com: 6, cap: 7, reg: 5 },
  { d: "Community", mer: 8, ind: 5, wew: 4, com: 8, cap: 9, reg: 1 },
  { d: "Location", mer: 9, ind: 7, wew: 9, com: 7, cap: 9, reg: 6 },
  { d: "Review Profile", mer: 5, ind: 10, wew: 6, com: 8, cap: 7, reg: 3 },
  { d: "Brand Equity", mer: 5, ind: 9, wew: 6, com: 6, cap: 8, reg: 4 },
  { d: "OVERALL", mer: 6.4, ind: 7.9, wew: 6.6, com: 7.1, cap: 7.9, reg: 4.6, total: true },
];
const hcols = ["Dimension", "Meridian", "Industrious", "WeWork", "Common Desk", "Cap Factory", "Regus"];
const hwidths = [138, 56, 66, 56, 72, 70, 54];

let tx = ML, ty = doc.y;
hcols.forEach((col, ci) => {
  const cw = hwidths[ci];
  doc.rect(tx, ty, cw, 22).fill(NAVY);
  doc.fontSize(7).font("Helvetica-Bold").fillColor(ci === 1 ? GOLD : WHITE)
    .text(col, tx + 4, ty + 7, { width: cw - 8, align: ci > 0 ? "center" : "left", lineBreak: false, characterSpacing: 0.2 });
  tx += cw;
});
ty += 22;

dims.forEach((row, ri) => {
  tx = ML;
  const rbg = row.total ? NAVY : (ri % 2 === 0 ? CREAM : WHITE);
  [row.d, row.mer, row.ind, row.wew, row.com, row.cap, row.reg].forEach((val, ci) => {
    const cw = hwidths[ci];
    doc.rect(tx, ty, cw, 22).fill(rbg);
    doc.rect(tx, ty, cw, 22).strokeColor(RULE).lineWidth(0.3).stroke();
    const isHigh = typeof val === "number" && val >= 8 && !row.total;
    const tc = row.total ? (ci === 0 ? WHITE : ci === 1 ? GOLD : `${WHITE}70`) : (ci === 0 ? NAVY : isHigh ? "#1a7a3a" : GRAY);
    doc.fontSize(ci === 0 ? 8.5 : 9).font(row.total || isHigh ? "Helvetica-Bold" : "Helvetica").fillColor(tc)
      .text(String(val), tx + 4, ty + 6, { width: cw - 8, align: ci > 0 ? "center" : "left", lineBreak: false });
    tx += cw;
  });
  ty += 22;
});
doc.y = ty + 12;
doc.fontSize(7.5).font("Helvetica").fillColor(LGRAY)
  .text("Scores are assessments by Wex Advisory based on primary research, web analytics, review analysis, and pricing observation. Reflects competitive context as of May 2025.", ML, doc.y, { width: CW });

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 13: 06 STRATEGIC RECOMMENDATIONS — Phase 1
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("06  Strategic Recommendations");
secHead(6, "Strategic Recommendations");

// Phase 1 header
const ph1Y = doc.y;
doc.rect(ML, ph1Y, CW, 24).fill(NAVY);
doc.fontSize(8).font("Helvetica-Bold").fillColor(GOLD)
  .text("PHASE 1  |  IMMEDIATE  (0–30 DAYS)", ML + 12, ph1Y + 8, { characterSpacing: 0.5, lineBreak: false });
doc.y = ph1Y + 34;

const recs1 = [
  { num: "01", badge: GOLD, nbg: NAVY, title: "Launch a Pricing Page",
    body: "Publish a clear pricing page with desk types, rates, and a \"Request a Tour\" CTA. Include an FAQ strip addressing the top 5 objections: parking, minimum term, amenities included, Wi-Fi speeds, and cancellation policy. Pricing transparency is the single highest-ROI action — 73% of prospects self-qualify on price before contacting.",
    target: "Target: live within 10 days" },
  { num: "02", badge: GOLD, nbg: NAVY, title: "Google Business Optimization",
    body: "Update Google Business Profile with accurate hours, 30+ high-quality photos, complete attributes, and services list. Enable messaging. Automate a review request sequence for new members on day 7 of membership using a simple email or text flow.",
    target: "Target: complete within 14 days; 80+ reviews within 90 days" },
  { num: "03", badge: GOLD, nbg: NAVY, title: "Day Pass Product Page",
    body: "Create a dedicated day pass landing page ($45/day or $150/mo hot desk) with online booking or inquiry capability. Link from homepage navigation and Google Business. This captures corporate transient demand currently defaulting to WeWork.",
    target: "Target: live within 14 days; 10 day passes sold in month 1" },
];

recs1.forEach(r => {
  const ry = doc.y;
  doc.rect(ML, ry, 36, 36).fill(r.badge);
  doc.fontSize(13).font("Helvetica-Bold").fillColor(r.nbg)
    .text(r.num, ML, ry + 8, { width: 36, align: "center", lineBreak: false });
  doc.fontSize(11).font("Helvetica-Bold").fillColor(NAVY)
    .text(r.title, ML + 44, ry + 4, { lineBreak: false });
  doc.y = ry + 22;
  doc.fontSize(9.5).font("Helvetica").fillColor(GRAY)
    .text(r.body, ML + 44, doc.y, { width: CW - 44, lineGap: 2 });
  doc.y += 6;
  doc.fontSize(8.5).font("Helvetica-Bold").fillColor(GOLD)
    .text(r.target, ML + 44, doc.y, { lineBreak: false });
  doc.y += 16;
  rule();
});

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025  |  Page 1 of 2");

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 14: 06 STRATEGIC RECOMMENDATIONS — Phase 2 + Vision
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage(); hdr("06  Strategic Recommendations");
doc.y = 44;

const ph2Y = doc.y;
doc.rect(ML, ph2Y, CW, 24).fill(NAVY);
doc.fontSize(8).font("Helvetica-Bold").fillColor(GOLD)
  .text("PHASE 2  |  SHORT-TERM  (30–90 DAYS)", ML + 12, ph2Y + 8, { characterSpacing: 0.5, lineBreak: false });
doc.y = ph2Y + 34;

const recs2 = [
  { num: "04", title: "SEO Content Strategy",
    body: "Develop and publish 4–6 location-specific landing pages targeting high-intent keywords: \"coworking 2nd street austin,\" \"private office rent austin tx,\" \"downtown austin coworking day pass.\" Each page should be 600–900 words with photos and a clear CTA. Google Search Console setup is a prerequisite.",
    target: "Target: page-one rankings for 3+ terms within 90 days" },
  { num: "05", title: "LinkedIn Presence",
    body: "Establish a 3x-per-week LinkedIn posting cadence covering: member spotlights, event recaps, Austin business community content, and space photos. Target 1,000+ followers within 90 days through connection outreach to Austin startup founders, operators, and corporate real estate decision-makers.",
    target: "Target: 1,000 followers; 2 inbound corporate leads per month" },
  { num: "06", title: "Member Referral Program",
    body: "Launch a structured referral program: one free month for the referrer, plus 50% off the first month for the new member. Community-based coworking operators with a formal referral program see 40–60% of new members from referrals. Operationalize with a simple landing page and attribution tracking.",
    target: "Target: 5 referral leads in 60 days; 2 conversions" },
];

recs2.forEach(r => {
  const ry = doc.y;
  doc.rect(ML, ry, 36, 36).fill(NAVY);
  doc.fontSize(13).font("Helvetica-Bold").fillColor(WHITE)
    .text(r.num, ML, ry + 8, { width: 36, align: "center", lineBreak: false });
  doc.fontSize(11).font("Helvetica-Bold").fillColor(NAVY)
    .text(r.title, ML + 44, ry + 4, { lineBreak: false });
  doc.y = ry + 22;
  doc.fontSize(9.5).font("Helvetica").fillColor(GRAY)
    .text(r.body, ML + 44, doc.y, { width: CW - 44, lineGap: 2 });
  doc.y += 6;
  doc.fontSize(8.5).font("Helvetica-Bold").fillColor(GOLD)
    .text(r.target, ML + 44, doc.y, { lineBreak: false });
  doc.y += 16;
  rule();
});

// Long-term vision
doc.y += 6;
const vY = doc.y;
doc.rect(ML, vY, CW, 78).fill(CREAM);
doc.rect(ML, vY, 4, 78).fill(GOLD);
doc.fontSize(7.5).font("Helvetica-Bold").fillColor(GOLD)
  .text("LONG-TERM VISION  (6–18 MONTHS)", ML + 14, vY + 10, { characterSpacing: 0.5, lineBreak: false });
doc.fontSize(9.5).font("Helvetica").fillColor(GRAY)
  .text("Pursue a second Austin location in the East 6th or SoCo corridor to capture demand from non-downtown-centric professionals. Simultaneously, develop an enterprise outreach program targeting 25–100 person Austin tech companies seeking satellite offices — this segment is underserved by both boutique and national operators and represents $15,000–$40,000/month in recurring revenue per account won.", ML + 14, vY + 24, { width: CW - 24, lineGap: 2 });
doc.y = vY + 88;

ftr("Wex Advisory  |  Meridian Workspace  |  May 2025  |  Page 2 of 2");

// ═══════════════════════════════════════════════════════════════════════════════
// SUPPLEMENTAL NOTE COVER
// ═══════════════════════════════════════════════════════════════════════════════

doc.addPage();
bg(NAVY);
doc.rect(0, 0, W, 4).fill(GOLD);
doc.fontSize(8).font("Helvetica-Bold").fillColor(GOLD)
  .text("WEX ADVISORY", ML, 26, { characterSpacing: 2.5, lineBreak: false });
doc.fontSize(7).font("Helvetica-Bold").fillColor(`${WHITE}25`)
  .text("CONFIDENTIAL", 0, 26, { width: W - MR, align: "right", characterSpacing: 1.2, lineBreak: false });
doc.fontSize(28).font("Helvetica-Bold").fillColor(WHITE)
  .text("Supplemental Note", ML, 276);
doc.moveTo(ML, 322).lineTo(ML + 48, 322).lineWidth(2).strokeColor(GOLD).stroke();
doc.fontSize(12).font("Helvetica").fillColor(`${WHITE}50`)
  .text("Key Concepts & Data Sources", ML, 334);
doc.fontSize(8.5).font("Helvetica").fillColor(`${WHITE}30`)
  .text("Meridian Workspace  ·  May 2025", ML, 358);

// ═══════════════════════════════════════════════════════════════════════════════
// KEY CONCEPTS (auto-paginated)
// ═══════════════════════════════════════════════════════════════════════════════

const concepts = [
  { term: "Organic Search Ranking", def: "The position at which a website appears in unpaid Google search results for a given keyword. Page-one ranking (positions 1–10) is the primary objective of SEO strategy. Position 1 captures approximately 28% of all clicks; positions 6–10 capture less than 3% combined. Ranking is determined by 200+ factors including content relevance, site authority, page speed, and user engagement." },
  { term: "Google Business Profile (GBP)", def: "Google's free listing tool that populates the \"local pack\" (map results) for location-based searches such as \"coworking near me.\" GBP ranking is determined by three factors: relevance, distance, and prominence (review count, rating, and website authority). Optimizing GBP is the highest-ROI local marketing action for any location-based business." },
  { term: "Branded vs. Non-Branded Search", def: "Branded searches include the business name (e.g., \"Meridian Workspace Austin\"). Non-branded searches are generic intent queries (\"coworking Austin,\" \"private office downtown\"). Branded search captures intent from people who already know you; non-branded captures net-new demand. Competitors invest in non-branded SEO to intercept prospects who have not yet chosen a provider." },
  { term: "Review Velocity & Authority", def: "Google's local ranking algorithm weights review count and recency. A business with 200 reviews and a 4.5 rating will rank higher than one with 30 reviews and a 4.8 rating, all else equal. Review velocity — the rate at which new reviews arrive — signals ongoing business activity. Industry benchmark: 3–5 new reviews per month to maintain competitive local visibility." },
  { term: "Conversion Rate (Web-to-Lead)", def: "The percentage of website visitors who complete a desired action such as submitting a tour request. Industry average for coworking sites is approximately 1.5–2.5%. Sites with a pricing page convert at 2.8–4.2% — prospective members who can self-qualify on price are 1.8x more likely to request a tour. Every 1% improvement on 1,000 monthly visitors generates 10 additional leads per month." },
  { term: "Month-over-Month (MoM) Retention", def: "The percentage of active members who remain in the following month — the primary health metric for coworking operators. Best-in-class: 90%+. Industry average: 80–85%. At 85% retention, a 120-desk operator loses approximately 18 members per month and must generate 18+ new members simply to remain flat. Improving from 85% to 90% retention reduces the monthly new-member requirement by 33%." },
  { term: "Net Promoter Score (NPS)", def: "A standardized loyalty metric: \"How likely are you to recommend us?\" on a 0–10 scale. Scores of 9–10 are Promoters; 7–8 are Passives; 0–6 are Detractors. NPS = % Promoters minus % Detractors. Premium coworking operators average NPS of 42–58. NPS above 50 reliably predicts organic member referral growth without structured incentives." },
  { term: "Total Addressable Market (TAM)", def: "The total revenue opportunity if a business captured 100% of its target market. The Austin coworking market TAM is estimated at $280M annually (2025), based on 28,000 active flexible workspace users across the metro at an average spend of $10,000/user/year. Meridian's serviceable obtainable market — its realistic capture target — is approximately $2.8M–$4.2M at full single-location utilization." },
  { term: "Day Pass Economics", def: "Day passes ($30–$60) are a low-commitment entry product that convert to memberships at 12–18% for best-in-class operators. A well-marketed program generating 40 passes/month at $45 = $1,800 in incremental revenue, plus 5–7 membership conversions worth $2,500–$5,250 in monthly recurring revenue. Total day pass program value: $4,300–$7,050/month at 40 daily visits." },
  { term: "Cost Per Lead (CPL)", def: "The average cost to generate one qualified sales lead. Paid search CPL for coworking terms in Austin is approximately $28–$55 per click at a 2.2% conversion rate = $127–$250 per lead. SEO-generated leads carry a CPL of $8–$22 (amortized). Referral leads carry the lowest CPL at $15–$40 when a formal referral program is in place — and close at 2x the rate of paid leads." },
  { term: "Serviceable Obtainable Market (SOM)", def: "The portion of the serviceable addressable market that a business can realistically capture in the near term, given constraints such as capacity, location, and competition. For Meridian, SOM is bounded by its 120-desk physical capacity ($1.5M–$2.2M/year at full utilization) and its current geographic catchment area within the 2nd Street District and adjacent downtown neighborhoods." },
];

let firstConcPage = true;
concepts.forEach(c => {
  const textH = doc.heightOfString(c.def, { width: CW - 16, fontSize: 9 });
  const entH = textH + 32;

  if (firstConcPage || doc.y + entH > H - 50) {
    doc.addPage();
    hdr("Supplemental Note  |  Key Concepts");
    if (firstConcPage) {
      doc.fontSize(18).font("Helvetica-Bold").fillColor(NAVY).text("Key Concepts", ML, doc.y);
      doc.y += 16;
      doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(1.5).strokeColor(GOLD).stroke();
      doc.y += 16;
      firstConcPage = false;
    }
  }

  const ey = doc.y;
  doc.rect(ML, ey, 3, entH - 8).fill(GOLD);
  doc.fontSize(10.5).font("Helvetica-Bold").fillColor(NAVY)
    .text(c.term, ML + 12, ey + 2, { lineBreak: false });
  doc.y = ey + 18;
  doc.fontSize(9).font("Helvetica").fillColor(GRAY)
    .text(c.def, ML + 12, doc.y, { width: CW - 16, lineGap: 2 });
  doc.y += 14;
  rule();
  ftr("Supplemental Note  |  Wex Advisory  |  Meridian Workspace  |  May 2025");
});

// ═══════════════════════════════════════════════════════════════════════════════
// DATA SOURCES
// ═══════════════════════════════════════════════════════════════════════════════

if (doc.y + 160 > H - 50) { doc.addPage(); hdr("Supplemental Note  |  Data Sources"); }
doc.y += 8;
doc.fontSize(16).font("Helvetica-Bold").fillColor(NAVY).text("Data Sources & Methodology", ML, doc.y);
doc.y += 16;
doc.moveTo(ML, doc.y).lineTo(W - MR, doc.y).lineWidth(1.5).strokeColor(GOLD).stroke();
doc.y += 14;

const sources = [
  { cat: "Web Traffic & SEO", items: ["Semrush: estimated organic traffic, keyword rankings, domain authority", "Ahrefs: backlink analysis and keyword gap identification", "Google PageSpeed Insights: technical performance assessment"] },
  { cat: "Market Data", items: ["CBRE Flexible Office Outlook: Austin Q1 2025", "JLL Coworking Market Report: Texas MSAs, 2024", "U.S. Bureau of Labor Statistics: Austin-Round Rock MSA employment projections", "CoStar: Austin office market vacancy and flex space absorption data"] },
  { cat: "Competitor Intelligence", items: ["Direct website observation — pricing, products, messaging (May 2025)", "Google Business Profile data: reviews, ratings, photos, Q&A sections", "LinkedIn company pages: follower counts, posting frequency, employee data", "Wayback Machine: historical website snapshots for longitudinal comparison"] },
  { cat: "Industry Benchmarks", items: ["Coworking Resources Industry Report 2024", "GCUC (Global Coworking Unconference Conference) member survey data", "Alliance Virtual Offices: Coworking Operator Benchmarks 2024", "Internal Wex Advisory benchmarks from prior coworking operator engagements"] },
];

sources.forEach(s => {
  doc.fontSize(10).font("Helvetica-Bold").fillColor(NAVY).text(s.cat, ML, doc.y);
  doc.y += 14;
  s.items.forEach(item => {
    doc.fontSize(9).font("Helvetica").fillColor(GRAY)
      .text("›  " + item, ML + 10, doc.y, { width: CW - 10, lineGap: 1.5 });
    doc.y += 8;
  });
  doc.y += 6;
});

doc.y += 6;
const dY = doc.y;
doc.rect(ML, dY, CW, 86).fill(CREAM);
doc.rect(ML, dY, CW, 86).strokeColor(RULE).lineWidth(0.5).stroke();
doc.fontSize(7.5).font("Helvetica-Bold").fillColor(GOLD)
  .text("IMPORTANT DISCLOSURE", ML + 12, dY + 12, { characterSpacing: 0.6, lineBreak: false });
doc.fontSize(8.5).font("Helvetica").fillColor(GRAY)
  .text("This report is based on publicly available information, third-party data sources, and independent analysis by Wex Advisory. Traffic figures and competitive scores are estimates and should be treated as directional indicators rather than precise measurements. Market conditions change rapidly; data reflects observations made in April–May 2025. This report does not constitute legal, financial, or investment advice and should be used for internal strategic planning purposes only. All information you provide during a paid engagement is held in strict confidence and is not shared with third parties.", ML + 12, dY + 26, { width: CW - 24, lineGap: 2 });

ftr("Supplemental Note  |  Wex Advisory  |  Meridian Workspace  |  May 2025");

doc.end();
console.log("Sample report written to public/sample-report.pdf");
