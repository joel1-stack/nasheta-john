import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/adminServer"

export const runtime = "nodejs"

/** Pages that list articles, refreshed on every content change. */
const ALWAYS = ["/", "/sitemap.xml", "/blog-sitemap.xml", "/news-sitemap.xml", "/llms.txt"]

/**
 * Called by the CMS after it saves, publishes or deletes articles, so the
 * cached public pages show the change straight away instead of within the
 * 5-minute refresh window. Admin only.
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status })

  const body = await req.json().catch(() => null)
  const requested: unknown[] = Array.isArray(body?.paths) ? body.paths : []
  const paths = [...new Set([...ALWAYS, ...requested.filter((p): p is string => typeof p === "string" && /^\/[a-z0-9/_-]*$/i.test(p))])].slice(0, 60)

  for (const p of paths) revalidatePath(p)
  revalidatePath("/page/[page]", "page")
  return NextResponse.json({ revalidated: paths })
}
