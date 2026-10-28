import type { NextRequest } from "next/server"
import { initializeApp, getApps, cert, getApp, type App } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { isAllowedAdmin } from "@/lib/adminEmails"

/** Firebase Admin app for API routes (bypasses Firestore client rules). */
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

/** Checks the caller's Firebase ID token belongs to a CMS admin. */
export type AdminCheck = { ok: false; error: string; status: number } | { ok: true; email: string }

export async function requireAdmin(req: NextRequest): Promise<AdminCheck> {
  const header = req.headers.get("authorization") || ""
  const match = header.match(/^Bearer\s+(.+)$/i)
  if (!match) return { ok: false, error: "Sign in to the CMS first.", status: 401 }
  try {
    const decoded = await getAuth(getAdminApp()).verifyIdToken(match[1])
    if (!decoded.email || !isAllowedAdmin(decoded.email)) {
      return { ok: false, error: "This account is not authorized for the CMS.", status: 403 }
    }
    return { ok: true, email: decoded.email }
  } catch {
    return { ok: false, error: "Your session expired. Please sign in again.", status: 401 }
  }
}
