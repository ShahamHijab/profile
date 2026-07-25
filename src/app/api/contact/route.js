import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This route was missing entirely before — the contact form POSTed to
// /api/contact, got Next.js's default 404 page back (not JSON), and the
// fetch failed silently as a generic "Network error." This route sends
// the message over SMTP using nodemailer.
//
// Required in .env.local (and in your host's environment variables, e.g.
// Vercel project settings — .env.local is never deployed):
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=587
//   SMTP_USER=youraddress@gmail.com
//   SMTP_PASS=your16charapppassword   (a Gmail *App Password*, not your login password)
//   CONTACT_TO_EMAIL=whereyouwanttoreceivemail@example.com   (optional — defaults to SMTP_USER)

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

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP env vars are missing — contact form cannot send email.");
    return NextResponse.json(
      { error: "The contact form isn't fully configured yet. Please email me directly instead." },
      { status: 500 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || SMTP_USER;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for port 465, false for 587/others (uses STARTTLS)
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form SMTP error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or email me directly." },
      { status: 502 }
    );
  }
}