import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"

const casinoReviews = [
  { name: "SportPesa", rating: 4.8, bonus: "200% up to KES 5,000", payments: "M-Pesa, Airtel, Card", license: "BCLB Kenya" },
  { name: "Betika", rating: 4.6, bonus: "Free Bet on Deposit", payments: "M-Pesa, Card", license: "BCLB Kenya" },
  { name: "1xBet", rating: 4.5, bonus: "100% + $100 Free Bet", payments: "M-Pesa, Crypto, Card", license: "Curacao" },
  { name: "Betway", rating: 4.7, bonus: "Up to $50 Free Bets", payments: "M-Pesa, Card, Bank", license: "MGA, UKGC" },
  { name: "22Bet", rating: 4.4, bonus: "100% Welcome Bonus", payments: "M-Pesa, Crypto, Card", license: "Curacao" },
]

const topSites = casinoReviews.map((c) => ({
  operatorName: c.name,
  bonusText: `${c.bonus} — ${c.payments}`,
  url: `https://${c.name.toLowerCase()}.com/?ref=igamingubuntu`,
}))

export default function ReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Casino & Betting Site Reviews</h1>
      <p className="text-text-secondary mb-8">Honest, expert reviews of the best betting sites and online casinos in Africa.</p>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-card">
              <th className="text-left p-4 font-semibold text-text-primary">Site</th>
              <th className="text-left p-4 font-semibold text-text-primary">Rating</th>
              <th className="text-left p-4 font-semibold text-text-primary">Bonus</th>
              <th className="text-left p-4 font-semibold text-text-primary">Payments</th>
              <th className="text-left p-4 font-semibold text-text-primary">License</th>
              <th className="text-center p-4 font-semibold text-text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {casinoReviews.map((c, i) => (
              <tr key={c.name} className={i % 2 === 0 ? "bg-white" : "bg-card/50"}>
                <td className="p-4 font-bold text-text-primary">{c.name}</td>
                <td className="p-4">
                  <span className="text-gold font-bold">{c.rating}</span>
                  <span className="text-text-muted">/5</span>
                </td>
                <td className="p-4 text-sm text-text-secondary">{c.bonus}</td>
                <td className="p-4 text-sm text-text-secondary">{c.payments}</td>
                <td className="p-4 text-sm text-text-muted">{c.license}</td>
                <td className="p-4 text-center">
                  <a
                    href={`https://${c.name.toLowerCase()}.com/?ref=igamingubuntu`}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="bg-gold text-black font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    Join Now
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdSlot position="in-content-1" className="mb-8" />

      <AffiliateBox title="Our Top Rated Sites" offers={topSites.slice(0, 3)} />

      <div className="bg-card rounded-xl p-8 mt-8">
        <h2 className="text-xl font-bold text-text-primary mb-4">How We Rate Casinos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-text-primary mb-2">🔒 Security & Licensing</h3>
            <p className="text-sm text-text-secondary">We only recommend sites with valid licenses from recognized regulators.</p>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-2">💰 Bonuses & Promotions</h3>
            <p className="text-sm text-text-secondary">We evaluate welcome bonuses, ongoing promotions, and wagering requirements.</p>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-2">💳 Payment Methods</h3>
            <p className="text-sm text-text-secondary">We test deposit and withdrawal speed, fees, and available payment options.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
