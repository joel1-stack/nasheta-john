interface AffiliateOffer {
  operatorName: string
  bonusText: string
  url: string
}

interface AffiliateBoxProps {
  title: string
  offers: AffiliateOffer[]
}

export default function AffiliateBox({ title, offers }: AffiliateBoxProps) {
  return (
    <div className="affiliate-box rounded-lg p-6 my-8 border border-gold/30">
      <h3 className="text-lg font-bold text-text-primary mb-4">{title}</h3>
      <div className="space-y-3">
        {offers.map((offer, i) => (
          <div key={i} className="flex items-center justify-between bg-white rounded-lg p-4 border border-border">
            <div>
              <p className="font-semibold text-text-primary">{offer.operatorName}</p>
              <p className="text-sm text-text-secondary">{offer.bonusText}</p>
            </div>
            <a
              href={offer.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="bg-gold text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition whitespace-nowrap"
            >
              BET NOW →
            </a>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-muted mt-3">Affiliate link — we may earn a commission</p>
    </div>
  )
}
