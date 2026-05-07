export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

  const html = `
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Wex Advisory <onboarding@resend.dev>",
        to: "maxmwexley@gmail.com",
        subject: `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
