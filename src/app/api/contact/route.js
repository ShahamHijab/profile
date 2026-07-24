import { NextResponse } from "next/server";

// This route was missing entirely before — the contact form POSTed to
// /api/contact, got Next.js's default 404 page back (not JSON), and the
// fetch failed silently as a generic "Network error." This route actually
// sends the message, using Resend (https://resend.com) as the email provider.
//
// Setup required (see README):
//   1. Create a free Resend account and API key.
//   2. Add RESEND_API_KEY to your environment variables (Vercel project
//      settings, or .env.local for local dev).
//   3. Optionally set CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.
//      CONTACT_FROM_EMAIL defaults to Resend's shared test sender, which
//      works immediately with no domain verification.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim();
  const subject = (body?.subject || "").trim();
  const message = (body?.message || "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return NextResponse.json(
      { error: "The contact form isn't fully configured yet. Please email me directly instead." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "shahamhijab@proton.me";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      const errData = await resendRes.json().catch(() => ({}));
      console.error("Resend API error:", resendRes.status, errData);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again or email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Network error. Please try again." }, { status: 500 });
  }
}
