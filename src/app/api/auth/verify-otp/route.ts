import { NextResponse } from "next/server"
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { isAllowedAdmin } from "@/lib/adminEmails"

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
    let email = ""
    let otp = ""
    try {
      const body = await req.json()
      email = String(body?.email || "").trim().toLowerCase()
      otp = String(body?.otp || "").trim()
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 })
    }

    if (!email || !otp) {
      return NextResponse.json({ success: false, error: "Email and OTP required" }, { status: 400 })
    }

    if (!isAllowedAdmin(email)) {
      return NextResponse.json({ success: false, error: "This email is not authorized for the CMS." }, { status: 403 })
    }

    const app = getAdminApp()
    const db = getFirestore(app)

    const otpDoc = await db.collection("otps").doc(email).get()
    const data = otpDoc.data()

    if (!data || data.used || String(data.otp) !== otp) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 401 })
    }

    const expires = data.expires
    const expiresMs =
      expires && typeof expires.toMillis === "function"
        ? expires.toMillis()
        : typeof expires === "number"
          ? expires
          : Date.now() + 1
    if (expiresMs < Date.now()) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 401 })
    }

    await otpDoc.ref.update({ used: true, usedAt: Date.now() })

    const { getAuth } = await import("firebase-admin/auth")
    const adminAuth = getAuth(app)

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
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to verify OTP" },
      { status: 500 }
    )
  }
}
