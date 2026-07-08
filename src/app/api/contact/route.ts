import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "nashetajohn@gmail.com",
        pass: process.env.SMTP_PASS,
      },
    })

    const projectLabels: Record<string, string> = {
      match: "Match Result Articles",
      reviews: "Casino & Betting Reviews",
      guides: "Betting Guides & Tutorials",
      news: "Industry News & Press Releases",
      strategy: "Content Strategy & Consulting",
      other: "Something else",
    }

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER || "nashetajohn@gmail.com"}>`,
      to: "nashetajohn@gmail.com",
      replyTo: email,
      subject: `iGamingUbuntu Contact: ${name} - ${projectLabels[projectType] || projectType || "General"}`,
      text: `Name: ${name}\nEmail: ${email}\nProject: ${projectLabels[projectType] || projectType || "Not specified"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#E95420;padding:20px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission</h1>
          </div>
          <div style="background:#f9f9f9;padding:20px;border-radius:0 0 12px 12px;border:1px solid #eee">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:100px"><strong>Name</strong></td><td style="padding:8px 0">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#666"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666"><strong>Project</strong></td><td style="padding:8px 0">${projectLabels[projectType] || projectType || "Not specified"}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:8px;border:1px solid #eee">
              <p style="margin:0 0 8px;font-weight:bold;color:#333">Message:</p>
              <p style="margin:0;color:#555;white-space:pre-wrap">${message}</p>
            </div>
            <p style="margin-top:16px;font-size:12px;color:#999">Sent via iGamingUbuntu contact form</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Contact email error:", err)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
