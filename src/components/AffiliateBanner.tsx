"use client"

import { useEffect, useRef, useState } from "react"

export interface AffiliateOffer {
  operatorName: string
  bonusText: string
  url: string
  linkId?: string
  imageUrl?: string
  ctaLabel?: string
}

interface AffiliateBannerProps {
  offers: AffiliateOffer[]
  placement?: string
  variant?: "leaderboard" | "card" | "sidebar" | "marquee"
  title?: string
  className?: string
}

const gradients = [
  "from-[#1a0a2e] via-[#772953] to-[#E95420]",
  "from-[#0F0A1A] via-[#E95420] to-[#FFD700]",
  "from-[#772953] via-[#E95420] to-[#409824]",
  "from-[#0B1A3A] via-[#1B2385] to-[#E95420]",
  "from-[#1a2e05] via-[#409824] to-[#FFD700]",
]

function trackClick(linkId?: string, placement = "banner") {
  if (!linkId) return
  fetch("/api/track-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ linkId, placement }),
  }).catch(() => {})
}

function getHref(offer: AffiliateOffer) {
  return offer.linkId ? `/go/${offer.linkId}` : offer.url
}

function getDomainFavicon(url: string): string | null {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "")
    if (!host || host.includes("localhost")) return null
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`
  } catch {
    return null
  }
}

function OperatorBadge({ name, imageUrl, url }: { name: string; imageUrl?: string; url?: string }) {
  const favicon = url ? getDomainFavicon(url) : null
  if (imageUrl) {
    return (
      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/20 shadow-lg ad-badge-pop">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    )
  }
  if (favicon) {
    return (
      <div className="w-12 h-12 rounded-xl bg-white shrink-0 border border-white/30 shadow-lg ad-badge-pop flex items-center justify-center overflow-hidden p-1.5">
        <img
          src={favicon}
          alt={name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = "none"
            const parent = el.parentElement
            if (parent) {
              const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
              parent.innerHTML = `<span style="font-weight:900;font-size:16px;color:#111">${initials}</span>`
            }
          }}
        />
      </div>
    )
  }
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  return (
    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-white font-black text-lg shrink-0 border border-white/25 shadow-lg ad-badge-pop">
      {initials}
    </div>
  )
}

export default function AffiliateBanner({
  offers,
  placement = "blog",
  variant = "leaderboard",
  title,
  className = "",
}: AffiliateBannerProps) {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (offers.length <= 1 || variant === "marquee") return
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % offers.length)
    }, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [offers.length, variant])

  if (!offers.length) return null

  if (variant === "marquee") {
    const doubled = [...offers, ...offers]
    return (
      <div className={`relative rounded-xl overflow-hidden border border-amber-300/40 bg-gradient-to-r from-[#0F0A1A] via-[#772953] to-[#E95420] ${className}`}>
        <div className="absolute top-1 left-3 z-10 text-[9px] uppercase tracking-widest text-white/60 bg-black/30 px-2 py-0.5 rounded">Sponsored</div>
        <div className="flex overflow-hidden py-3 mt-3">
          <div className="flex gap-6 ad-ticker whitespace-nowrap px-3">
            {doubled.map((offer, i) => (
              <a
                key={i}
                href={getHref(offer)}
                target="_blank"
                rel="nofollow sponsored noopener"
                onClick={() => trackClick(offer.linkId, placement)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-white transition"
              >
                {offer.url && getDomainFavicon(offer.url) && (
                  <img src={getDomainFavicon(offer.url)!} alt="" className="w-4 h-4 rounded-sm bg-white object-contain p-px" />
                )}
                <span className="font-bold">{offer.operatorName}</span>
                <span className="text-amber-300 text-xs">★ {offer.bonusText.slice(0, 40)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const offer = offers[Math.min(active, offers.length - 1)]
  const gradient = gradients[active % gradients.length]

  if (variant === "sidebar") {
    return (
      <div className={`space-y-3 ${className}`}>
        {title && <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>}
        {offers.slice(0, 4).map((o, i) => (
          <a
            key={i}
            href={getHref(o)}
            target="_blank"
            rel="nofollow sponsored noopener"
            onClick={() => trackClick(o.linkId, placement)}
            className={`group flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-gradient-to-br ${gradients[i % gradients.length]} text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ad-shine`}
          >
            <OperatorBadge name={o.operatorName} imageUrl={o.imageUrl} url={o.url} />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm truncate">{o.operatorName}</p>
              <p className="text-[11px] text-white/75 line-clamp-2">{o.bonusText}</p>
            </div>
            <span className="text-[10px] font-black bg-amber-400 text-black px-2 py-1 rounded-md group-hover:scale-110 transition ad-float">
              GO
            </span>
          </a>
        ))}
        <p className="text-[10px] text-gray-500">18+ · Affiliate link · Gamble responsibly</p>
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={`ad-banner rounded-2xl border border-white/10 shadow-xl p-5 text-white ${className}`}>
        <div className="flex items-center justify-between mb-3 relative z-10">
          <span className="text-[10px] uppercase tracking-widest bg-white/15 px-2 py-0.5 rounded">Sponsored</span>
          <div className="flex gap-1.5">
            {offers.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show offer ${i + 1}`}
                className={`w-2 h-2 rounded-full transition ${i === active ? "bg-amber-400 scale-125" : "bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10 ad-float">
          <OperatorBadge name={offer.operatorName} imageUrl={offer.imageUrl} url={offer.url} />
          <div className="flex-1 min-w-0">
            <p className="font-black text-lg leading-tight">{offer.operatorName}</p>
            <p className="text-sm text-white/85 mt-0.5">{offer.bonusText}</p>
          </div>
        </div>
        <a
          href={getHref(offer)}
          target="_blank"
          rel="nofollow sponsored noopener"
          onClick={() => trackClick(offer.linkId, placement)}
          className="mt-4 relative z-10 block w-full text-center bg-amber-400 hover:bg-amber-300 text-black font-black py-3 rounded-xl ad-cta-pulse"
        >
          {offer.ctaLabel || "CLAIM OFFER →"}
        </a>
        <p className="text-[10px] text-white/50 mt-2 relative z-10">18+ · T&Cs apply · Affiliate link</p>
      </div>
    )
  }

  return (
    <div className={`ad-banner rounded-2xl border border-white/10 shadow-xl overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch">
        <div className="flex-1 p-5 sm:p-6 text-white relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] uppercase tracking-widest bg-white/15 px-2 py-0.5 rounded">Sponsored</span>
            <div className="flex gap-1.5">
              {offers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show offer ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition ${i === active ? "bg-amber-400 scale-125" : "bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 ad-float">
            <OperatorBadge name={offer.operatorName} imageUrl={offer.imageUrl} url={offer.url} />
            <div className="min-w-0">
              <p className="font-black text-xl sm:text-2xl leading-tight">{offer.operatorName}</p>
              <p className="text-sm sm:text-base text-white/90 mt-1">{offer.bonusText}</p>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-col items-center justify-center gap-2 p-5 sm:p-6 sm:w-48 relative z-10 bg-black/20">
          <a
            href={getHref(offer)}
            target="_blank"
            rel="nofollow sponsored noopener"
            onClick={() => trackClick(offer.linkId, placement)}
            className="w-full text-center bg-amber-400 hover:bg-amber-300 text-black font-black py-3 px-5 rounded-xl ad-cta-pulse text-sm"
          >
            {offer.ctaLabel || "BET NOW →"}
          </a>
          <p className="text-[10px] text-white/50 text-center">18+ · T&amp;Cs apply · Affiliate</p>
        </div>
      </div>
    </div>
  )
}
