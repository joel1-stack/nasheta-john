import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import { isAllowedAdmin } from "@/lib/adminEmails"

export const runtime = "nodejs"

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

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

async function requireAdmin(req: NextRequest): Promise<{ error: string; status: number } | null> {
  const header = req.headers.get("authorization") || ""
  const match = header.match(/^Bearer\s+(.+)$/i)
  if (!match) return { error: "Sign in to manage categories.", status: 401 }
  try {
    const decoded = await getAuth(getAdminApp()).verifyIdToken(match[1])
    if (!decoded.email || !isAllowedAdmin(decoded.email)) {
      return { error: "This account is not authorized for the CMS.", status: 403 }
    }
    return null
  } catch {
    return { error: "Your session expired. Please sign in again.", status: 401 }
  }
}

export async function GET() {
  try {
    const db = getFirestore(getAdminApp())
    const snap = await db.collection("categories").orderBy("name", "asc").get()
    const categories = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    return NextResponse.json({ categories })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load categories"
    return NextResponse.json({ categories: [], error: message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return NextResponse.json({ error: denied.error }, { status: denied.status })

  const body = await req.json().catch(() => null)
  const name = String(body?.name || "").trim()
  if (!name) return NextResponse.json({ error: "Category name is required." }, { status: 400 })

  try {
    const slug = slugify(name)
    const description = String(body?.description || "").trim()
    const db = getFirestore(getAdminApp())
    const ref = await db.collection("categories").add({ name, slug, description })
    return NextResponse.json({ id: ref.id, name, slug, description })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save category"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return NextResponse.json({ error: denied.error }, { status: denied.status })

  const body = await req.json().catch(() => null)
  const id = String(body?.id || "")
  const data = body?.data || {}
  if (!id) return NextResponse.json({ error: "Category id is required." }, { status: 400 })

  try {
    const update: Record<string, string> = {}
    if (typeof data.name === "string" && data.name.trim()) {
      update.name = data.name.trim()
      update.slug = slugify(data.name)
    }
    if (typeof data.description === "string") update.description = data.description
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 })
    }
    const db = getFirestore(getAdminApp())
    await db.collection("categories").doc(id).update(update)
    return NextResponse.json({ id, ...update })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update category"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return NextResponse.json({ error: denied.error }, { status: denied.status })

  const id = new URL(req.url).searchParams.get("id") || ""
  if (!id) return NextResponse.json({ error: "Category id is required." }, { status: 400 })

  try {
    const db = getFirestore(getAdminApp())
    await db.collection("categories").doc(id).delete()
    return NextResponse.json({ id, deleted: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete category"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
