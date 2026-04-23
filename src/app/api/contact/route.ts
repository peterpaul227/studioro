import { NextResponse } from "next/server";

/**
 * Contact form API route — accepts a JSON POST, validates, and sends via
 * Resend if `RESEND_API_KEY` is set. If the key is missing we still return
 * success and log to the server console — useful in preview deploys.
 *
 * Sets a per-IP rate limit in memory (5 req / 10 min) — good enough for a
 * small portfolio; swap for Upstash if traffic grows.
 */

type Body = {
  name?: string;
  email?: string;
  company?: string;
  type?: string;
  budget?: string;
  message?: string;
};

// In-memory rate limiter — module-scope map survives warm invocations.
const RATE_LIMIT: Record<string, { count: number; reset: number }> = {};
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const bucket = RATE_LIMIT[ip];
  if (!bucket || bucket.reset < now) {
    RATE_LIMIT[ip] = { count: 1, reset: now + WINDOW_MS };
    return true;
  }
  if (bucket.count >= MAX_PER_WINDOW) return false;
  bucket.count++;
  return true;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRate(ip)) {
    return NextResponse.json(
      { ok: false, error: "Te veel aanvragen. Probeer het later opnieuw." },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldig bericht-formaat." },
      { status: 400 },
    );
  }

  const { name = "", email = "", company = "", type = "", budget = "", message = "" } =
    body;

  // Basic validation
  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json(
      { ok: false, error: "Vul naam, email en bericht in." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Geen geldig email-adres." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Bericht is te lang (max 5000 tekens)." },
      { status: 400 },
    );
  }

  const subject = `Project-aanvraag via studioro.com — ${name}`;
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#0a0a0a;max-width:640px">
      <h2 style="font-size:18px;border-bottom:1px solid #eee;padding-bottom:10px">
        Nieuwe aanvraag via studioro.com
      </h2>
      <table style="font-size:14px;line-height:1.6;border-collapse:collapse">
        <tr><td style="padding:4px 16px 4px 0;color:#888">Naam</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 16px 4px 0;color:#888">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:4px 16px 4px 0;color:#888">Bedrijf</td><td>${escapeHtml(company)}</td></tr>` : ""}
        ${type ? `<tr><td style="padding:4px 16px 4px 0;color:#888">Type</td><td>${escapeHtml(type)}</td></tr>` : ""}
        ${budget ? `<tr><td style="padding:4px 16px 4px 0;color:#888">Budget</td><td>${escapeHtml(budget)}</td></tr>` : ""}
      </table>
      <h3 style="font-size:14px;margin-top:24px;margin-bottom:8px;color:#666">Bericht</h3>
      <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;background:#faf7f2;padding:16px;border-radius:4px;border-left:3px solid #d62828">${escapeHtml(message)}</div>
      <p style="font-size:11px;color:#999;margin-top:24px">IP: ${escapeHtml(ip)}</p>
    </div>
  `;
  const text = [
    `Naam: ${name}`,
    `Email: ${email}`,
    company && `Bedrijf: ${company}`,
    type && `Type: ${type}`,
    budget && `Budget: ${budget}`,
    "",
    "Bericht:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  // Send via Resend if configured
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX || "info@studioro.com";
  const from = process.env.CONTACT_FROM || "noreply@studioro.com";

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Studioro website <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend failure:", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "Verzenden mislukte. Probeer het direct via email." },
        { status: 502 },
      );
    }
  } else {
    // No email service configured yet — log so Robert can grep the Vercel logs,
    // and still return success so the UX doesn't break.
    console.log("[contact][no-RESEND_API_KEY]", { subject, text });
  }

  return NextResponse.json({ ok: true });
}
