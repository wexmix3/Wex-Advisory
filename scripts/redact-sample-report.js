// Run: node scripts/redact-sample-report.js
// Takes the real 25N report PDFs, redacts all company names, combines into public/sample-report.pdf

const { PDFDocument, rgb } = require("pdf-lib");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const fs = require("fs");
const path = require("path");

// ── Sources ───────────────────────────────────────────────────────────────────
const SRC_DIR = "C:/Users/maxmw/Downloads/Claude/MMW Consulting";
const MAIN_PDF = path.join(SRC_DIR, "Wexley Consulting LLC_Competitor Analysis_25NCoworking_vF.pdf");
const SUPP_PDF = path.join(SRC_DIR, "Supplemental Note_Wexley Consulting LLC _ 25N Coworking_vF.pdf");
const OUT_PATH = path.join(__dirname, "../public/sample-report.pdf");

// ── Terms to redact (longest first to avoid partial-match collisions) ─────────
const REDACT_TERMS = [
  "Wexley Consulting LLC",
  "25N Coworking",
  "Wexley Consulting",
  "Novel Coworking",
  "Expansive Workspace",
  "Workplace Studio",
  "Common Desk",
  "25ncoworking.com",
  "industriousoffice.com",
  "commondesk.com",
  "novelcoworking.com",
  "expansiveworkspace.com",
  "workplacestudio.com",
  "liquidspace.com",
  "coworker.com",
  "Mara Hauser",
  "Industrious",
  "WeWork",
  "Regus",
  "Hubble",
  "CBRE",
  "IWG",
  "Wexley",
  "25N",
].sort((a, b) => b.length - a.length);

const NAVY = rgb(0.059, 0.122, 0.239);
const GOLD = rgb(0.784, 0.659, 0.294);

function containsRedactTerm(str) {
  const s = str.toLowerCase();
  return REDACT_TERMS.some((t) => s.includes(t.toLowerCase()));
}

// ── Extract text items with positions from every page ─────────────────────────
async function extractTextItems(pdfBytes) {
  const doc = await pdfjsLib.getDocument({ data: new Uint8Array(pdfBytes) }).promise;
  const pages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.0 });
    pages.push({ items: content.items, viewport });
  }
  return pages;
}

// ── Apply redaction rectangles to a loaded PDFDocument ───────────────────────
async function redactDoc(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const libPages = pdfDoc.getPages();
  const textPages = await extractTextItems(pdfBytes);

  let redactCount = 0;

  textPages.forEach(({ items }, pi) => {
    if (pi >= libPages.length) return;
    const page = libPages[pi];
    const { height: pageH } = page.getSize();

    for (const item of items) {
      if (!item.str || !item.str.trim()) continue;
      if (!containsRedactTerm(item.str)) continue;

      // pdfjs transform: [a, b, c, d, tx, ty]
      // tx/ty are in PDF coordinate space (bottom-left origin, same as pdf-lib)
      const [a, , , d, tx, ty] = item.transform;
      const fontSize = Math.abs(d) || Math.abs(a) || 10;
      const w = item.width || item.str.length * fontSize * 0.55;
      const h = fontSize + 2;

      // Draw redaction block — slightly oversized to cover descenders/ascenders
      page.drawRectangle({
        x: tx - 2,
        y: ty - 3,
        width: Math.max(w + 4, 20),
        height: h + 3,
        color: NAVY,
        opacity: 1,
      });
      redactCount++;
    }
  });

  console.log(`  Redacted ${redactCount} text item(s)`);
  return pdfDoc.save();
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("Loading PDFs...");
  const mainBytes = fs.readFileSync(MAIN_PDF);
  const suppBytes = fs.readFileSync(SUPP_PDF);

  console.log("Redacting main report...");
  const mainRedacted = await redactDoc(mainBytes);

  console.log("Redacting supplemental note...");
  const suppRedacted = await redactDoc(suppBytes);

  console.log("Combining into single PDF...");
  const combined = await PDFDocument.create();

  const mainDoc = await PDFDocument.load(mainRedacted);
  const suppDoc = await PDFDocument.load(suppRedacted);

  const mainPages = await combined.copyPages(mainDoc, mainDoc.getPageIndices());
  mainPages.forEach((p) => combined.addPage(p));

  const suppPages = await combined.copyPages(suppDoc, suppDoc.getPageIndices());
  suppPages.forEach((p) => combined.addPage(p));

  const finalBytes = await combined.save();
  fs.writeFileSync(OUT_PATH, finalBytes);

  const sizeMB = (finalBytes.byteLength / 1024 / 1024).toFixed(1);
  console.log(`Done! ${mainDoc.getPageCount() + suppDoc.getPageCount()} pages, ${sizeMB}MB → ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
