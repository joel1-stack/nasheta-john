import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { doc, updateDoc, increment, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"

/** Affiliate redirects must never be indexed, dead one or not. */
const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" }

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const home = new URL("/", req.nextUrl.origin)
  const fb = getDb()

  if (fb && slug) {
    try {
      const linkRef = doc(fb, "affiliateLinks", slug)
      const linkSnap = await getDoc(linkRef)
      if (linkSnap.exists()) {
        const data = linkSnap.data()
        // An absolute destination is required: a malformed one used to throw
        // here and turn a dead campaign into a 500.
        let destination: URL | null = null
        try {
          destination = new URL(String(data.url || ""))
        } catch {
          destination = null
        }

        if (destination && /^https?:$/.test(destination.protocol)) {
          await updateDoc(linkRef, { clicks: increment(1) })
          await addDoc(collection(fb, "clicks"), {
            linkId: slug,
            placement: req.headers.get("referer") || "direct",
            timestamp: serverTimestamp(),
          })
          return NextResponse.redirect(destination, { status: 302, headers: NOINDEX })
        }
      }
    } catch {}
  }

  // NextResponse.redirect needs an absolute URL; "/" alone throws.
  return NextResponse.redirect(home, { status: 302, headers: NOINDEX })
}
