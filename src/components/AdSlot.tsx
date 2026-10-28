"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBanners, isBannerLive } from "@/lib/firestoreService"
import { trackEvent } from "@/lib/analytics"
import type { Banner, BannerZone } from "@/types"

type Position = "leaderboard-top" | "sidebar-1" | "sidebar-2" | "in-content-1" | "in-content-2" | "footer-banner"

interface AdSlotProps {
  position: Position
  className?: string
}

/** Each page position maps to a CMS zone; "-2" slots take the zone's second banner. */
const slots: Record<Position, { zone: BannerZone; index: number }> = {
  "leaderboard-top": { zone: "header", index: 0 },
  "footer-banner": { zone: "header", index: 1 },
  "sidebar-1": { zone: "sidebar", index: 0 },
  "sidebar-2": { zone: "sidebar", index: 1 },
  "in-content-1": { zone: "in-article", index: 0 },
  "in-content-2": { zone: "in-article", index: 1 },
}

// One request per page load, shared by every slot on the page.
let bannersPromise: Promise<Banner[]> | null = null
function loadBanners(): Promise<Banner[]> {
  if (!bannersPromise) bannersPromise = getBanners().then((all) => all.filter((b) => isBannerLive(b)))
  return bannersPromise
}

/**
 * A paid banner from the CMS (Banners page). Empty slots render nothing,
 * except the first sidebar slot, which shows a small "Advertise here" box.
 */
export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const { zone, index } = slots[position]
  const [banner, setBanner] = useState<Banner | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    loadBanners().then((live) => {
      if (!cancelled) setBanner(live.filter((b) => b.zone === zone)[index] || null)
    })
    return () => {
      cancelled = true
    }
  }, [zone, index])

  if (banner === undefined) return null

  if (!banner) {
    if (position !== "sidebar-1") return null
    return (
      <div className={`border border-dashed border-gray-300 rounded p-5 text-center ${className}`}>
        <p className="text-[11px] uppercase tracking-wider text-gray-400">Advertisement</p>
        <p className="font-semibold text-[#111827] mt-2">Your brand here</p>
        <p className="text-sm text-gray-500 mt-1">Reach operators, affiliates and regulators across Africa.</p>
        <Link href="/advertise" className="inline-block mt-3 text-sm font-semibold text-[#16A34A] hover:underline">
          Advertise with us &rarr;
        </Link>
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 text-center mb-1">Advertisement</p>
      <a
        href={banner.linkUrl}
        target="_blank"
        rel="sponsored noopener"
        onClick={() =>
          trackEvent("ad_click", { ad_position: position, advertiser: banner.advertiser, link_url: banner.linkUrl })
        }
        className="block"
      >
        <img
          src={banner.imageUrl}
          alt={banner.alt || banner.advertiser}
          loading="lazy"
          className="mx-auto w-auto max-w-full h-auto hover:opacity-95 transition"
        />
      </a>
    </div>
  )
}
