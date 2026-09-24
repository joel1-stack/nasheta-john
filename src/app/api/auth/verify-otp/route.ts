import { NextResponse } from "next/server"
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore, Timestamp } from "firebase-admin/firestore"

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
    const { email, otp } = await req.json()
    if (!email || !otp) {
      return NextResponse.json({ success: false, error: "Email and OTP required" }, { status: 400 })
    }

    const app = getAdminApp()
    const adminAuth = getAuth(app)
    const db = getFirestore(app)

    const otpDoc = await db.collection("otps").doc(email).get()
    const data = otpDoc.data()

    if (!data || data.used || data.otp !== String(otp) || (data.expires as Timestamp).toMillis() < Date.now()) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 401 })
    }

    await otpDoc.ref.update({ used: true })

    let userRecord = await adminAuth.getUserByEmail(email).catch(() => null)
    if (!userRecord) {
      userRecord = await adminAuth.createUser({
        email,
        emailVerified: true,
        displayName: "iGamingUbuntu Admin",
      })
    }

    const customToken = await adminAuth.createCustomToken(userRecord.uid)
    return NextResponse.json({ success: true, customToken })
  } catch (error: any) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({
      success: false,
      error: error?.message || "Failed to verify OTP",
    }, { status: 500 })
  }
}
