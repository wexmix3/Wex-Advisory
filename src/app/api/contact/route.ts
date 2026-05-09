export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter: 5 submissions per 10 minutes per IP
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS  = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests — try again later" }, { status: 429 });
  }

  let name: string, company: string, email: string, message: string;
  try {
    const body = await req.json();
    name    = String(body.name    ?? "").trim();
    company = String(body.company ?? "").trim();
    email   = String(body.email   ?? "").trim();
    message = String(body.message ?? "").trim();
    if (!name || !email || !message) throw new Error("Missing required fields");
    if (!email.includes("@")) throw new Error("Invalid email");
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid request" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_your")) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const firstName = name.split(" ")[0];

  const notificationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #0F1F3D;">New Inquiry — Wex Advisory</h2>
      <p><strong>Name:</strong> ${name}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr style="border: 1px solid #eee; margin: 16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    </div>
  `;

  const autoReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${firstName},</p>

      <p>Got your message — thanks for reaching out. Really glad you're here.</p>

      <p>I'll have your report ready within 24 hours. Before I get started, a few quick questions that'll help me make it as useful as possible:</p>

      <ol style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>What's your company name and website?</strong></li>
        <li style="margin-bottom: 8px;"><strong>Who are your top 3 competitors?</strong> (or whoever you're most focused on or worried about)</li>
        <li style="margin-bottom: 8px;"><strong>Any specific areas you want me to focus on?</strong> Things like pricing, SEO, traffic, positioning, or messaging — whatever's most on your mind.</li>
      </ol>

      <p>Just reply to this email — no form, no portal, no friction.</p>

      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:maxwexley@wexadvisory.com" style="color: #C8A84B;">maxwexley@wexadvisory.com</a></span>
      </p>
    </div>
  `;

  async function sendEmail(to: string, subject: string, html: string) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Max Wexley <maxwexley@wexadvisory.com>",
        to,
        reply_to: "maxwexley@wexadvisory.com",
        subject,
        html,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
  }

  try {
    await sendEmail(
      "maxwexley@wexadvisory.com",
      `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
      notificationHtml
    );

    // Fire auto-reply in background — don't block the response
    sendEmail(
      email,
      "Got your request — a couple quick questions",
      autoReplyHtml
    ).catch((err) => console.error("[contact] Auto-reply failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
