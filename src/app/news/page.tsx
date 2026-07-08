import Link from "next/link"
import AdSlot from "@/components/AdSlot"

export default function NewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=80" alt="iGaming News" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">iGaming News</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Latest developments, regulatory updates, and industry news across African iGaming markets.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { title: "Kenya BCLB Issues New Licensing Guidelines for 2026", slug: "/news/regulation", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", cat: "Regulation Watch" },
          { title: "Nigerian Betting Market Grows 34% in Q2 2026", slug: "/news/industry", img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", cat: "Industry News" },
          { title: "South Africa's National Gambling Bill Amendments Explained", slug: "/news/regulation", img: "https://images.unsplash.com/photo-1588182472590-d8e4c7a36b63?w=800&q=80", cat: "Regulation Watch" },
          { title: "Ghana Gaming Commission Launches New Operator Portal", slug: "/news/industry", img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80", cat: "Industry News" },
        ].map((article, i) => (
          <Link key={i} href={article.slug} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-5">
              <span className="text-xs text-ubuntu-orange font-medium bg-ubuntu-orange/10 px-2 py-0.5 rounded">{article.cat}</span>
              <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition mt-2">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
