import { NextResponse } from "next/server"
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getFirestore, Timestamp } from "firebase-admin/firestore"
import nodemailer from "nodemailer"
import { isAllowedAdmin, getAllowedAdminEmails } from "@/lib/adminEmails"

function getAdminApp() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY")
    }
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  }
  return getApp()
}

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email required" }, { status: 400 })
    }

    const recipient = String(email).trim().toLowerCase()
    if (!isAllowedAdmin(recipient)) {
      console.warn(`OTP request denied for unauthorized email: ${recipient}`)
      return NextResponse.json(
        { success: false, error: "This email is not authorized for the CMS. Ask an admin to add it to ADMIN_EMAILS." },
        { status: 403 }
      )
    }

    const app = getAdminApp()
    const db = getFirestore(app)

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Timestamp.fromMillis(Date.now() + 10 * 60 * 1000)
    await db.collection("otps").doc(recipient).set({ otp, expires, used: false, updatedAt: Date.now() })

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP_USER / SMTP_PASS not set — cannot send OTP email")
      return NextResponse.json({
        success: false,
        error: "Email is not configured on the server (SMTP_USER/SMTP_PASS missing).",
      }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.verify()
    await transporter.sendMail({
      from: `"iGamingUbuntu CMS" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: `iGamingUbuntu Admin OTP for ${recipient}`,
      text: `Login code for ${recipient}: ${otp}\n\nThis code expires in 10 minutes. If you did not request this, ignore this email.`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
          <div style="background:#E95420;padding:20px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">iGamingUbuntu Admin Login</h1>
          </div>
          <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #eee;text-align:center">
            <p style="color:#555;margin:0 0 8px">Requested for: <strong>${email}</strong></p>
            <p style="color:#555;margin:0 0 12px">Your one-time login code is:</p>
            <p style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#0F0A1A;margin:0">${otp}</p>
            <p style="color:#999;font-size:13px;margin-top:16px">Expires in 10 minutes. If you did not request this, ignore this email.</p>
          </div>
        </div>
      `,
    })

    console.log(`OTP for ${recipient} sent to ${recipient} (${getAllowedAdminEmails().length} admin(s) allowed)`)
    return NextResponse.json({ success: true, message: `OTP sent to ${recipient}` })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to send OTP",
    }, { status: 500 })
  }
}
