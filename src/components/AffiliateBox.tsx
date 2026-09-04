"use client"

interface AffiliateOffer {
  operatorName: string
  bonusText: string
  url: string
  linkId?: string
}

interface AffiliateBoxProps {
  title: string
  offers: AffiliateOffer[]
  placement?: string
}

export default function AffiliateBox({ title, offers, placement = "sidebar" }: AffiliateBoxProps) {
  const handleClick = async (offer: AffiliateOffer) => {
    if (offer.linkId) {
      try {
        await fetch("/api/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ linkId: offer.linkId, placement }),
        })
      } catch { /* silent */ }
    }
  }

  return (
    <div className="rounded-xl p-6 my-8 border border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm">
      <h3 className="text-lg font-bold text-[#111827] mb-4">{title}</h3>
      <div className="space-y-3">
        {offers.map((offer, i) => (
          <div key={i} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
            <div>
              <p className="font-semibold text-[#111827]">{offer.operatorName}</p>
              <p className="text-sm text-gray-500">{offer.bonusText}</p>
            </div>
            <a
              href={offer.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              onClick={() => handleClick(offer)}
              className="bg-[#f59e0b] text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#d97706] transition whitespace-nowrap shadow-sm"
            >
              BET NOW
            </a>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">18+ Only. Gamble responsibly. Affiliate link — we may earn a commission.</p>
    </div>
  )
}
