import { initializeApp, getApps, cert, getApp, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

/**
 * Firebase Admin (server-only) singleton.
 * Credentials come from Vercel env vars: FIREBASE_PROJECT_ID,
 * FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.
 */
export function getAdminApp(): App {
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

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp())
}

export function hasAdminCredentials(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  )
}
