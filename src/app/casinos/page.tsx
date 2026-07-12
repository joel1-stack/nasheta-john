import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function CasinoDirectoryPage() {
  const subs = [
    { title: "New Casinos", href: "/casinos/new", desc: "Recently launched operators reviewed" },
    { title: "Best Casinos", href: "/casinos/best", desc: "Top-rated casinos by our expert team" },
    { title: "Mobile Casinos", href: "/casinos/mobile", desc: "Optimised for mobile betting on the go" },
    { title: "Payment Methods", href: "/casinos/payments", desc: "M-Pesa, Airtel, Bank Transfer and more" },
    { title: "By Market", href: "/casinos/market", desc: "Filter by Kenya, Nigeria, SA, Ghana, Global" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/full backgound.png" alt="Casino Directory" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Casino Directory</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Expert reviews of online casinos available to African players.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {subs.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white border border-border rounded-xl p-4 hover:shadow-md hover:border-ubuntu-orange/30 transition-all group">
            <h3 className="font-semibold text-text-primary group-hover:text-ubuntu-orange transition">{s.title}</h3>
            <p className="text-sm text-text-secondary mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Casino Reviews</h2>
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
