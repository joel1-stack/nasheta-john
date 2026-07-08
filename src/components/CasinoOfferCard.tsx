import Link from "next/link"

export interface CasinoOffer {
  name: string
  logo: string
  bonus: string[]
  ctaLabel: string
  affiliateUrl: string
  rating?: number
  market?: string
}

interface CasinoOfferCardProps {
  offer: CasinoOffer
  placement?: "directory" | "inline" | "sidebar"
}

export default function CasinoOfferCard({ offer, placement = "directory" }: CasinoOfferCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group ${placement === "sidebar" ? "p-4" : ""}`}>
      {placement !== "sidebar" && (
        <div className="bg-gradient-to-r from-ubuntu-orange/5 to-gold/5 px-5 py-4 flex items-center gap-4 border-b border-border">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-card shrink-0 shadow-sm">
            <img src={offer.logo} alt={offer.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-lg">{offer.name}</h3>
            {offer.rating && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gold font-bold">{offer.rating}</span>
                <span className="text-text-muted">/5</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-5">
        {placement === "sidebar" && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-card shrink-0">
              <img src={offer.logo} alt={offer.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-text-primary">{offer.name}</h4>
          </div>
        )}

        <ul className="space-y-2 mb-5">
          {offer.bonus.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <svg className="w-4 h-4 text-ubuntu-green mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <a
          href={offer.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="block w-full text-center bg-gold text-black font-bold py-2.5 rounded-lg text-sm hover:bg-gold/90 transition shadow-md shadow-gold/20"
        >
          {offer.ctaLabel}
        </a>

        <p className="text-[10px] text-text-muted text-center mt-3 leading-relaxed">
          18+ Only. Please gamble responsibly. Affiliate link — we may earn a commission.
        </p>
      </div>
    </div>
  )
}
