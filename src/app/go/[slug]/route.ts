import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/firebase"
import { doc, updateDoc, increment, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore"
import { buildDestination, isValidSlug } from "@/lib/affiliate"

/** Affiliate redirects must never be indexed or cached, live or dead. */
const NOINDEX = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" }

function notFound() {
  return new NextResponse("Campaign link not found.", { status: 404, headers: { ...NOINDEX, "Content-Type": "text/plain; charset=utf-8" } })
}

/**
 * /go/<slug>: looks the slug up in the CMS `affiliateLinks` collection and
 * redirects to its destination (302), adding the visitor's utm_* and partner
 * sub-id parameters. Unknown, inactive or misconfigured slugs return 404.
 * If the database cannot be reached the answer is 503, never a guess.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!isValidSlug(slug)) return notFound()

  const fb = getDb()
  if (!fb) return new NextResponse("Temporarily unavailable.", { status: 503, headers: { ...NOINDEX, "Retry-After": "60" } })

  let snap
  try {
    snap = await getDoc(doc(fb, "affiliateLinks", slug))
  } catch {
    return new NextResponse("Temporarily unavailable.", { status: 503, headers: { ...NOINDEX, "Retry-After": "60" } })
  }
  if (!snap.exists()) return notFound()

  const data = snap.data()
  if (data.active === false) return notFound()
  const destination = buildDestination(String(data.url || ""), req.nextUrl.searchParams)
  if (!destination) return notFound()

  // Click counting must never block the redirect.
  try {
    await updateDoc(snap.ref, { clicks: increment(1) })
    await addDoc(collection(fb, "clicks"), {
      linkId: slug,
      placement: req.headers.get("referer") || "direct",
      timestamp: serverTimestamp(),
    })
  } catch {}

  return NextResponse.redirect(destination, { status: 302, headers: NOINDEX })
}
