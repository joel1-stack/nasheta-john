import { NextResponse } from "next/server"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "nasheta-105b3",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
}

function getAdminDb() {
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount) })
  }
  return getFirestore()
}

export async function POST(req: Request) {
  try {
    const { email, country } = await req.json()
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    const db = getAdminDb()
    const ref = await db.collection("subscribers").add({
      email,
      country: country || "",
      subscribedAt: new Date(),
    })

    return NextResponse.json({ success: true, id: ref.id })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
