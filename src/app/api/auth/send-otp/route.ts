import { NextResponse } from "next/server"
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore, Timestamp } from "firebase-admin/firestore"
import nodemailer from "nodemailer"

function getAdminApp() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    })
  }
  return getApp()
}

export const runtime = "nodejs"

const OTP_INBOX = "salvagekyalo@gmail.com"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const app = getAdminApp()
    const adminAuth = getAuth(app)
    const db = getFirestore(app)

    const userRecord = await adminAuth.getUserByEmail(email).catch(() => null)
    if (!userRecord) {
      return NextResponse.json({ error: "No admin account with this email" }, { status: 404 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Timestamp.fromMillis(Date.now() + 10 * 60 * 1000)

    await db.collection("otps").doc(email).set({ otp, expires, used: false })

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"iGamingUbuntu CMS" <${process.env.SMTP_USER}>`,
      to: OTP_INBOX,
      subject: `iGamingUbuntu Admin OTP for ${email}`,
      text: `Login code for ${email}: ${otp}\n\nThis code expires in 10 minutes. If you did not request this, ignore this email.`,
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

    console.log(`OTP for ${email} sent to ${OTP_INBOX}`)
    return NextResponse.json({ success: true, message: "OTP sent to the admin inbox" })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}