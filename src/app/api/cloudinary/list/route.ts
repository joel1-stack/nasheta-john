import { NextResponse } from "next/server"
import { CLOUDINARY_FOLDER } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

interface CloudinaryResource {
  public_id?: string
  secure_url?: string
  bytes?: number
  created_at?: string
}

function getCloudinaryServerConfig(): { cloud: string; key: string; secret: string } {
  let cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || ""
  let key = process.env.CLOUDINARY_API_KEY || ""
  let secret = process.env.CLOUDINARY_API_SECRET || ""
  const url = process.env.CLOUDINARY_URL || ""
  const match = url.match(/^cloudinary:\/\/([^:]+):(.+)@(.+)$/)
  if (match) {
    if (!key) key = match[1]
    if (!secret) secret = match[2]
    if (!cloud) cloud = match[3]
  }
  return { cloud, key, secret }
}

export async function GET() {
  const { cloud, key, secret } = getCloudinaryServerConfig()

  if (!cloud || !key || !secret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured on the server. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
      },
      { status: 503 }
    )
  }

  try {
    const auth = Buffer.from(`${key}:${secret}`).toString("base64")
    const prefix = encodeURIComponent(`${CLOUDINARY_FOLDER}/`)
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/resources/image?max_results=100&type=upload&prefix=${prefix}`,
      { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" }
    )

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null
      return NextResponse.json(
        { error: body?.error?.message || `Cloudinary returned HTTP ${res.status}.` },
        { status: 502 }
      )
    }

    const data = (await res.json()) as { resources?: CloudinaryResource[] }
    const images = (data.resources || [])
      .filter((r) => r.secure_url && r.public_id)
      .map((r) => ({
        name: (r.public_id as string).replace(`${CLOUDINARY_FOLDER}/`, ""),
        url: r.secure_url as string,
        size: r.bytes || 0,
        time: new Date(r.created_at || Date.now()).toLocaleDateString(),
        created: r.created_at || "",
      }))
      .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())

    return NextResponse.json({ images })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list images." },
      { status: 500 }
    )
  }
}
