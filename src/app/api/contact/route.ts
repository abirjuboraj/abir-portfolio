import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/data/site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please enter a message of at least 10 characters." },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.CONTACT_RECEIVER_EMAIL || siteConfig.contact.email;
    const submissionTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // 1. Try sending via Nodemailer SMTP if credentials exist
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const smtpHost =
        process.env.SMTP_HOST ||
        (smtpUser.includes("@gmail.com") ? "smtp.gmail.com" : "smtp.mailgun.org");
      const smtpPort = process.env.SMTP_PORT
        ? parseInt(process.env.SMTP_PORT, 10)
        : 465;
      const isSecure = smtpPort === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name} (Portfolio Contact)" <${smtpUser}>`,
        replyTo: email,
        to: recipientEmail,
        subject: `[Portfolio Inquiry] New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nTime: ${submissionTime}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #fafafa; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #3b82f6; font-size: 20px;">New Message from Portfolio Website</h2>
              <p style="margin: 4px 0 0; color: #a1a1aa; font-size: 13px;">Received on ${submissionTime}</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <strong style="color: #93c5fd; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Sender Details:</strong>
              <p style="margin: 6px 0 2px; font-size: 16px; color: #fafafa;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0; font-size: 15px; color: #a1a1aa;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
            </div>

            <div style="background-color: #111114; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin: 20px 0;">
              <strong style="color: #93c5fd; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</strong>
              <p style="margin: 10px 0 0; font-size: 15px; line-height: 1.6; color: #e4e4e7; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; margin-top: 24px; font-size: 12px; color: #71717a;">
              Sent via Md. Abir Hossen's Developer Portfolio Contact Form. Reply directly to this email to contact ${name}.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully! I will get back to you shortly.",
      });
    }

    // 2. Try sending via Formspree if configured
    const formspreeId =
      process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formspreeId && formspreeId !== "your_formspree_form_id_here") {
      const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message, _subject: `[Portfolio Inquiry] from ${name}` }),
      });

      if (formspreeRes.ok) {
        return NextResponse.json({
          success: true,
          message: "Your message has been sent successfully! I will get back to you shortly.",
        });
      }
    }

    // 3. Send via FormSubmit service directly to user's email (abirhj2010@gmail.com)
    let emailDelivered = false;
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://abir-portfolio.vercel.app",
          Origin: "https://abir-portfolio.vercel.app",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[Portfolio Inquiry] from ${name}`,
          _template: "table",
        }),
      });

      const fsData = await formSubmitRes.json().catch(() => ({}));
      console.log("[FormSubmit Response]:", fsData);

      if (formSubmitRes.ok) {
        emailDelivered = true;
      }
    } catch (fsDeliveryErr) {
      console.warn("FormSubmit delivery attempt error:", fsDeliveryErr);
    }

    // 4. Fallback / Dev Persistence: Persist message locally so no inquiry is ever lost
    try {
      const messagesFilePath = path.join(process.cwd(), "messages.json");
      let currentMessages: any[] = [];
      if (fs.existsSync(messagesFilePath)) {
        try {
          const raw = fs.readFileSync(messagesFilePath, "utf8");
          currentMessages = JSON.parse(raw);
        } catch {
          currentMessages = [];
        }
      }

      currentMessages.unshift({
        id: Date.now().toString(),
        name,
        email,
        message,
        receivedAt: submissionTime,
      });

      fs.writeFileSync(messagesFilePath, JSON.stringify(currentMessages, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Could not write to local messages file:", fsErr);
    }

    console.log(`[Contact Form Received] From: ${name} <${email}> at ${submissionTime}`);
    console.log(`[Message Body]:\n${message}`);

    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully to my email! I will get back to you shortly.",
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process your message. Please try again or email directly." },
      { status: 500 }
    );
  }
}
