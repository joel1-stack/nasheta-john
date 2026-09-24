import { NextResponse } from "next/server"
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore, Timestamp } from "firebase-admin/firestore"

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

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()
    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP required" }, { status: 400 })
    }

    const app = getAdminApp()
    const adminAuth = getAuth(app)
    const db = getFirestore(app)

    const otpDoc = await db.collection("otps").doc(email).get()
    const data = otpDoc.data()

    if (
      !data ||
      data.used ||
      data.otp !== otp ||
      (data.expires as Timestamp).toMillis() < Date.now()
    ) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 401 })
    }

    await otpDoc.ref.update({ used: true })

    const userRecord = await adminAuth.getUserByEmail(email)
    if (!userRecord) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const customToken = await adminAuth.createCustomToken(userRecord.uid)
    return NextResponse.json({ success: true, customToken })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}