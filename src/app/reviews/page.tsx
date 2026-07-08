import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import AffiliateBox from "@/components/AffiliateBox"

const casinoReviews = [
  { name: "SportPesa", rating: 4.8, bonus: "200% up to KES 5,000", payments: "M-Pesa, Airtel, Card", license: "BCLB Kenya", logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&q=80" },
  { name: "Betika", rating: 4.6, bonus: "Free Bet on Deposit", payments: "M-Pesa, Card", license: "BCLB Kenya", logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80" },
  { name: "1xBet", rating: 4.5, bonus: "100% + $100 Free Bet", payments: "M-Pesa, Crypto, Card", license: "Curacao", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&q=80" },
  { name: "Betway", rating: 4.7, bonus: "Up to $50 Free Bets", payments: "M-Pesa, Card, Bank", license: "MGA, UKGC", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80" },
  { name: "22Bet", rating: 4.4, bonus: "100% Welcome Bonus", payments: "M-Pesa, Crypto, Card", license: "Curacao", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80" },
]

const topSites = casinoReviews.map((c) => ({
  operatorName: c.name,
  bonusText: `${c.bonus} — ${c.payments}`,
  url: `https://${c.name.toLowerCase()}.com/?ref=igamingubuntu`,
}))

const ratingCriteria = [
  {
    title: "Security & Licensing",
    desc: "We only recommend sites with valid licenses from recognized regulators like BCLB (Kenya), NLRC (Nigeria), and MGA.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
  },
  {
    title: "Bonuses & Promotions",
    desc: "We evaluate welcome bonuses, ongoing promotions, wagering requirements, and overall value for the bettor.",
    img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80",
  },
  {
    title: "Payment Methods",
    desc: "We test deposit and withdrawal speed, fees, and available options including M-Pesa, Tigo-Pesa, Airtel Money, and bank transfers.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80",
  },
]

export default function ReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1200&q=80" alt="Casino reviews" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Casino & Betting Site Reviews</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Honest, expert reviews of the best betting sites and online casinos in Africa. We only recommend licensed, trusted operators.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      <div className="overflow-x-auto mb-8 rounded-xl border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-ubuntu-purple/10 to-ubuntu-orange/10">
              <th className="text-left p-4 font-semibold text-text-primary">Operator</th>
              <th className="text-left p-4 font-semibold text-text-primary">Rating</th>
              <th className="text-left p-4 font-semibold text-text-primary">Bonus</th>
              <th className="text-left p-4 font-semibold text-text-primary hidden md:table-cell">Payments</th>
              <th className="text-left p-4 font-semibold text-text-primary hidden lg:table-cell">License</th>
              <th className="text-center p-4 font-semibold text-text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {casinoReviews.map((c, i) => (
              <tr key={c.name} className={`${i % 2 === 0 ? "bg-white" : "bg-card/30"} border-t border-border hover:bg-card/50 transition`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-card shrink-0">
                      <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-text-primary">{c.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gold font-bold text-lg">{c.rating}</span>
                  <span className="text-text-muted text-sm">/5</span>
                </td>
                <td className="p-4 text-sm text-text-secondary">{c.bonus}</td>
                <td className="p-4 text-sm text-text-secondary hidden md:table-cell">{c.payments}</td>
                <td className="p-4 text-sm text-text-muted hidden lg:table-cell">{c.license}</td>
                <td className="p-4 text-center">
                  <a
                    href={topSites.find((s) => s.operatorName === c.name)?.url || "#"}
                    target="_blank"
                    rel="nofollow sponsored"
                    className="inline-block bg-gold text-black font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-gold/90 transition shadow-md shadow-gold/20"
                  >
                    Join Now
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdSlot position="in-content-1" className="mb-8 rounded-xl overflow-hidden" />

      <AffiliateBox title="Our Top Rated Sites for 2026" offers={topSites.slice(0, 3)} />

      <div className="bg-card rounded-xl p-8 mt-8 border border-border">
        <h2 className="text-xl font-bold text-text-primary mb-6">How We Rate Casinos & Betting Sites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ratingCriteria.map((criterion) => (
            <div key={criterion.title} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group">
              <div className="h-32 overflow-hidden">
                <img src={criterion.img} alt={criterion.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-text-primary mb-2">{criterion.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{criterion.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
