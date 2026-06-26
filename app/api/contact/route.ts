import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Recipient — your email
const TO_EMAIL = "prasannanaik431@gmail.com";
// Sender domain shown in the From field (must be verified in Resend, or use onboarding@resend.dev for testing)
const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // "from" must be a domain YOU own/verified in Resend — email APIs don't allow
    // arbitrary sender addresses. The visitor's email goes in replyTo, so hitting
    // Reply in Gmail/Outlook goes directly back to them.
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,          // your verified sender (e.g. contact@yourdomain.com)
      to: TO_EMAIL,              // your inbox — prasannanaik431@gmail.com
      replyTo: email,            // visitor's email — Reply goes straight to them
      subject: `[Portfolio Contact] ${subject} — from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #e2e8f0; padding: 32px; border-radius: 8px; max-width: 600px;">
          <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #06b6d4; margin: 0; font-size: 18px; letter-spacing: 0.05em;">
              📬 NEW CONNECTION REQUEST
            </h2>
            <p style="color: #64748b; font-size: 11px; margin: 4px 0 0;">prasanna.naik — contact.service</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #64748b; font-size: 12px; padding: 6px 0; width: 120px;">client_identity:</td>
              <td style="color: #f8fafc; font-size: 12px; padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-size: 12px; padding: 6px 0;">callback_address:</td>
              <td style="color: #06b6d4; font-size: 12px; padding: 6px 0;">
                <a href="mailto:${email}" style="color: #06b6d4;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="color: #64748b; font-size: 12px; padding: 6px 0;">routing_subject:</td>
              <td style="color: #f8fafc; font-size: 12px; padding: 6px 0;">${subject}</td>
            </tr>
            <tr>
              <td style="color: #64748b; font-size: 12px; padding: 6px 0;">timestamp:</td>
              <td style="color: #f8fafc; font-size: 12px; padding: 6px 0;">${new Date().toUTCString()}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; border: 1px solid #1e293b; border-radius: 6px; padding: 16px; background: #0f172a;">
            <p style="color: #64748b; font-size: 11px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em;">message_payload</p>
            <p style="color: #e2e8f0; font-size: 13px; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 10px; color: #475569;">
            Reply to this email to respond directly to ${name}.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Message could not be delivered. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // Log internally but never expose raw error details to the client
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Message could not be delivered. Please try again." },
      { status: 500 }
    );
  }
}
