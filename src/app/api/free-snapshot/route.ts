export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS  = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now   = Date.now();
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
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let business: string, email: string;
  try {
    const body = await req.json();
    business = String(body.business ?? "").trim();
    email    = String(body.email    ?? "").trim();
    if (!business || !email) throw new Error("Missing required fields");
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

  const notificationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #0F1F3D;">New Free Snapshot Request</h2>
      <p><strong>Business:</strong> ${business.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr style="border: 1px solid #eee; margin: 16px 0;" />
      <p style="color: #888; font-size: 14px;">
        Respond with a 1-page competitor snapshot within 24 hours.
      </p>
    </div>
  `;

  const autoReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi there,</p>

      <p>Got it — I'll have your free competitor snapshot ready within 24 hours and send it to this address.</p>

      <p>One quick thing: to make it as useful as possible, who's your biggest competitor?
      Just reply with their name or website and I'll make sure to focus on them specifically.</p>

      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">
        Wex Advisory · <a href="mailto:maxwexley@wexadvisory.com" style="color: #C8A84B;">maxwexley@wexadvisory.com</a>
      </span>
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
      `Free snapshot request — ${business}`,
      notificationHtml
    );

    sendEmail(
      email,
      "Your free competitor snapshot is on its way",
      autoReplyHtml
    ).catch((err) => console.error("[free-snapshot] Auto-reply failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[free-snapshot] Error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
