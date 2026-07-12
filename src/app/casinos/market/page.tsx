import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import CategoryArticleList from "@/components/CategoryArticleList"

export default function ByMarketPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-orange to-ubuntu-purple">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/full backgound.png" alt="By Market" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Casinos by Market</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Filter online casinos by your country — Kenya, Nigeria, South Africa, Ghana, and more.</p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 mb-8">
        <Link href="/casinos" className="text-sm text-ubuntu-orange hover:underline font-medium">&larr; Back to Casino Directory</Link>
        <span className="text-sm text-text-secondary mx-1">|</span>
        <Link href="/casinos/new" className="text-sm text-text-secondary hover:text-ubuntu-orange">New Casinos</Link>
        <span className="text-sm text-text-secondary">|</span>
        <Link href="/casinos/best" className="text-sm text-text-secondary hover:text-ubuntu-orange">Best Casinos</Link>
        <span className="text-sm text-text-secondary">|</span>
        <Link href="/casinos/mobile" className="text-sm text-text-secondary hover:text-ubuntu-orange">Mobile Casinos</Link>
      </nav>

      <AdSlot position="leaderboard-top" className="mb-8" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {[
          { name: "Kenya", slug: "kenya", flag: "ke" },
          { name: "Nigeria", slug: "nigeria", flag: "ng" },
          { name: "South Africa", slug: "south-africa", flag: "za" },
          { name: "Ghana", slug: "ghana", flag: "gh" },
          { name: "Tanzania", slug: "tanzania", flag: "tz" },
        ].map((market) => (
          <Link
            key={market.slug}
            href={`/casinos?country=${market.slug}`}
            className="bg-white border border-border rounded-xl p-4 text-center hover:shadow-md hover:border-ubuntu-orange/30 transition-all group"
          >
            <img src={`https://flagcdn.com/48x36/${market.flag}.png`} alt={market.name} className="w-10 h-7.5 mx-auto mb-2 rounded object-cover" />
            <p className="text-sm font-medium text-text-primary group-hover:text-ubuntu-orange transition">{market.name}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-6">Latest Casino Reviews</h2>
      <CategoryArticleList category="Casino Reviews" />
    </div>
  )
}
