"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getBanners, isBannerLive } from "@/lib/firestoreService"
import { trackEvent } from "@/lib/analytics"
import type { Banner } from "@/types"
import { HouseSideAd } from "@/components/HouseAds"

/**
 * Tall banners down both edges of the page, like the side skins on other trade
 * sites. Shown only where there is room (viewport 1536px and wider, beside the
 * 1152px content column), so phones, tablets and laptops never see them and
 * nothing overlaps the content. A booked "skin" banner from the CMS replaces the
 * house ad on its side: first one left, second one right.
 */
let skinsPromise: Promise<Banner[]> | null = null
function loadSkins(): Promise<Banner[]> {
  if (!skinsPromise) {
    skinsPromise = getBanners().then((all) => all.filter((b) => b.zone === "skin" && isBannerLive(b)))
  }
  return skinsPromise
}

function Skin({ side, banner }: { side: 0 | 1; banner?: Banner }) {
  const position = side === 0 ? "left-[calc(50%-576px-176px)]" : "left-[calc(50%+576px+16px)]"
  const wrap = `hidden 2xl:block fixed top-24 z-10 ${position}`
  if (!banner) {
    return (
      <div className={wrap}>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 text-center mb-1">Advertisement</p>
        <HouseSideAd side={side} />
      </div>
    )
  }
  const href = banner.linkUrl
  const external = href.startsWith("http")
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={banner.imageUrl}
      alt={banner.alt || banner.advertiser}
      width={160}
      height={600}
      loading="lazy"
      className="block w-[160px] h-[600px] object-cover hover:opacity-95 transition"
    />
  )
  return (
    <div className={wrap}>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 text-center mb-1">Advertisement</p>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener"
          onClick={() => trackEvent("ad_click", { ad_position: `skin-${side ? "right" : "left"}`, advertiser: banner.advertiser, link_url: href })}
        >
          {img}
        </a>
      ) : (
        <Link href={href}>{img}</Link>
      )}
    </div>
  )
}

export default function SideSkins() {
  const pathname = usePathname()
  const [skins, setSkins] = useState<Banner[]>([])

  useEffect(() => {
    let cancelled = false
    loadSkins().then((s) => { if (!cancelled) setSkins(s) })
    return () => { cancelled = true }
  }, [])

  if (pathname.startsWith("/igub-cms-x7k9")) return null
  return (
    <>
      <Skin side={0} banner={skins[0]} />
      <Skin side={1} banner={skins[1]} />
    </>
  )
}
