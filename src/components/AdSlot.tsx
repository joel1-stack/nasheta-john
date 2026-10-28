"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getBanners, isBannerLive } from "@/lib/firestoreService"
import { trackEvent } from "@/lib/analytics"
import type { Banner, BannerZone } from "@/types"

type Position =
  | "leaderboard-top"
  | "footer-banner"
  | "sidebar-1"
  | "sidebar-2"
  | "in-content-1"
  | "in-content-2"
  | "in-content-3"

interface AdSlotProps {
  position: Position
  className?: string
}

/** Each page position maps to a CMS zone; later slots take the zone's next banner. */
const slots: Record<Position, { zone: BannerZone; index: number }> = {
  "leaderboard-top": { zone: "header", index: 0 },
  "footer-banner": { zone: "header", index: 1 },
  "sidebar-1": { zone: "sidebar", index: 0 },
  "sidebar-2": { zone: "sidebar", index: 1 },
  "in-content-1": { zone: "in-article", index: 0 },
  "in-content-2": { zone: "in-article", index: 1 },
  "in-content-3": { zone: "in-article", index: 2 },
}

/** Our own promos, shown in a slot until an advertiser books it. */
const HOUSE: Partial<Record<Position, { title: string; text: string; cta: string; href: string }>> = {
  "leaderboard-top": {
    title: "Put your brand in front of Africa's iGaming industry",
    text: "Banners, sponsored articles and press releases",
    cta: "Advertise with us",
    href: "/advertise",
  },
  "footer-banner": {
    title: "Get Africa's betting news on Telegram",
    text: "Regulation, tax and market moves, as they happen",
    cta: "Join the channel",
    href: "https://t.me/nashetajohn",
  },
  "in-content-1": {
    title: "Your banner could be here",
    text: "Reach operators, affiliates and regulators across Africa",
    cta: "Book this spot",
    href: "/advertise",
  },
  "in-content-2": {
    title: "Have news to share?",
    text: "Publish your press release on iGamingUbuntu",
    cta: "Send it to us",
    href: "/advertise",
  },
  "in-content-3": {
    title: "Follow African iGaming as it happens",
    text: "Daily regulation and market updates on Telegram",
    cta: "Join the channel",
    href: "https://t.me/nashetajohn",
  },
}

// One request per page load, shared by every slot on the page.
let bannersPromise: Promise<Banner[]> | null = null
function loadBanners(): Promise<Banner[]> {
  if (!bannersPromise) bannersPromise = getBanners().then((all) => all.filter((b) => isBannerLive(b)))
  return bannersPromise
}

function HouseLeaderboard({ promo, className }: { promo: NonNullable<(typeof HOUSE)[Position]>; className: string }) {
  const external = promo.href.startsWith("http")
  const inner = (
    <div className="max-w-[728px] min-h-[90px] mx-auto bg-brand-ink rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 sm:py-3 overflow-hidden relative">
      <span className="absolute -right-6 -top-10 w-32 h-32 rounded-full bg-brand-lime/10" aria-hidden="true" />
      <div className="relative">
        <p className="text-white font-semibold leading-snug">{promo.title}</p>
        <p className="text-brand-lime/80 text-sm mt-0.5">{promo.text}</p>
      </div>
      <span className="relative shrink-0 self-start sm:self-center bg-brand-lime text-brand-ink text-sm font-bold px-4 py-2 rounded">
        {promo.cta} &rarr;
      </span>
    </div>
  )
  return (
    <div className={className}>
      {external ? (
        <a href={promo.href} target="_blank" rel="noopener" className="block hover:opacity-95 transition">{inner}</a>
      ) : (
        <Link href={promo.href} className="block hover:opacity-95 transition">{inner}</Link>
      )}
    </div>
  )
}

/**
 * A paid banner from the CMS (Banners page). Until a slot is booked it shows
 * one of our own promos; "sidebar-2" stays empty.
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

  if (banner) {
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

  // While loading (undefined) the house promo is already shown, so nothing jumps.
  if (position === "sidebar-1") {
    return (
      <div className={`bg-brand-mint border border-brand-teal/20 rounded p-5 ${className}`}>
        <p className="text-[11px] uppercase tracking-wider text-brand-teal-dark font-semibold">Advertise with us</p>
        <p className="font-semibold text-brand-deep mt-2 leading-snug">Reach operators, affiliates and regulators across Africa.</p>
        <p className="text-sm text-gray-600 mt-2">Banners, sponsored articles and press releases.</p>
        <Link href="/advertise" className="mt-4 inline-block bg-brand-teal text-white text-sm font-semibold px-4 py-2 rounded hover:bg-brand-deep transition">
          See options &rarr;
        </Link>
      </div>
    )
  }

  const promo = HOUSE[position]
  return promo ? <HouseLeaderboard promo={promo} className={className} /> : null
}
