"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

/**
 * Three animated house campaigns rotating in one slot (advertise, press
 * releases, Telegram), the way trade sites rotate several banners per spot.
 * Each animation is a 6 s loop, so a banner switches exactly when its loop
 * ends. Banners after the first only load when their turn comes. Files live
 * in /images/house/ because ad-block lists hide anything under /banners/.
 */
const CAMPAIGNS = [
  {
    id: "advertise",
    href: "/advertise",
    label: "Advertise with iGamingUbuntu",
    alt: "Advertise with iGamingUbuntu: put your brand in front of Africa",
  },
  {
    id: "press",
    href: "/press",
    label: "Send your press release to iGamingUbuntu",
    alt: "Press releases on iGamingUbuntu: got news? We'll make it heard",
  },
  {
    id: "telegram",
    href: "https://t.me/nashetajohn",
    label: "Join iGamingUbuntu on Telegram",
    alt: "Africa's betting news in your pocket: join iGamingUbuntu on Telegram",
  },
] as const

const LOOP_MS = 6000

type Format = "lb" | "side"

export default function HouseRotator({
  format,
  start = 0,
  className = "",
}: {
  format: Format
  start?: number
  className?: string
}) {
  const first = start % CAMPAIGNS.length
  const [active, setActive] = useState(first)
  const [loaded, setLoaded] = useState<number[]>([first])

  useEffect(() => {
    // No reduced-motion opt-out here: the banners animate as images anyway, and
    // Windows' "animation effects off" setting would otherwise hide two of the three.
    const t = window.setInterval(() => {
      if (document.hidden) return
      setActive((v) => {
        const next = (v + 1) % CAMPAIGNS.length
        setLoaded((l) => (l.includes(next) ? l : [...l, next]))
        return next
      })
    }, LOOP_MS)
    return () => window.clearInterval(t)
  }, [])

  const box =
    format === "lb"
      ? "relative block max-w-[728px] mx-auto aspect-[728/90] overflow-hidden rounded"
      : "relative block w-[160px] h-[600px] overflow-hidden rounded"

  return (
    <div className={className}>
      <div className={box}>
        {loaded.map((i) => {
          const c = CAMPAIGNS[i]
          const on = i === active
          const img = (
            <picture>
              <source srcSet={`/images/house/igub-${c.id}-${format}.webp`} type="image/webp" />
              <img
                src={`/images/house/igub-${c.id}-${format}.gif`}
                alt={c.alt}
                loading={i === first ? "lazy" : "eager"}
                decoding="async"
                className="block w-full h-full object-cover"
              />
            </picture>
          )
          const cls = `absolute inset-0 transition-opacity duration-500 hover:opacity-95 ${on ? "opacity-100 z-[1]" : "opacity-0 pointer-events-none"}`
          const a11y = { "aria-label": c.label, "aria-hidden": !on, tabIndex: on ? 0 : -1 }
          return c.href.startsWith("http") ? (
            <a key={c.id} href={c.href} target="_blank" rel="noopener" className={cls} {...a11y}>
              {img}
            </a>
          ) : (
            <Link key={c.id} href={c.href} className={cls} {...a11y}>
              {img}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
