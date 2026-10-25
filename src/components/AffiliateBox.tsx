"use client"

import AffiliateBanner, { AffiliateOffer, bookableOffers } from "./AffiliateBanner"

interface AffiliateBoxProps {
  title: string
  offers: (AffiliateOffer | { operatorName: string; bonusText: string; url: string; linkId?: string })[]
  placement?: string
}

/**
 * "Best Odds & Betting Offers" style box.
 * Developer placeholders are hidden until real campaigns exist in the CMS
 * "Affiliate Links" section, so the whole block (heading, "Ads" label and
 * disclosure line) disappears when there is nothing legitimate to show.
 */
export default function AffiliateBox({ title, offers, placement = "sidebar" }: AffiliateBoxProps) {
  const liveOffers = bookableOffers(offers as AffiliateOffer[])
  if (!liveOffers.length) return null

  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-1 h-5 bg-[#f59e0b] rounded-full inline-block" />
        <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-0.5 rounded bg-white">Ads</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {liveOffers.slice(0, 3).map((offer, i) => (
          <AffiliateBanner
            key={i}
            offers={[offer]}
            variant="card"
            placement={placement}
            className="h-full"
          />
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">18+ Only. Gamble responsibly. Affiliate links — we may earn a commission.</p>
    </div>
  )
}
