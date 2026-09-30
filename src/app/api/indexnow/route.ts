import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

const INDEXNOW_KEY = "7f3c9a1e5b8d426f9013ac57e2b6d804"
const HOST = "www.igamingubuntu.com"
const ALLOWED_PREFIX = `https://${HOST}/`

export async function POST(req: NextRequest) {
  let urls: unknown
  try {
    const body = await req.json()
    urls = body?.urls
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!Array.isArray(urls)) {
    return NextResponse.json({ error: "urls must be an array" }, { status: 400 })
  }

  const clean = Array.from(
    new Set(
      urls.filter((u): u is string => typeof u === "string" && u.startsWith(ALLOWED_PREFIX) && u.length < 500)
    )
  ).slice(0, 10000)

  if (clean.length === 0) {
    return NextResponse.json({ error: "No valid URLs (must start with https://www.igamingubuntu.com/)" }, { status: 400 })
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: clean,
      }),
    })
    return NextResponse.json({ submitted: clean.length, indexnowStatus: res.status })
  } catch (error) {
    const message = error instanceof Error ? error.message : "IndexNow unreachable"
    return NextResponse.json({ submitted: 0, error: message }, { status: 502 })
  }
}
