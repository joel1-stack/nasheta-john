import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="w-48 h-48 rounded-full bg-card flex items-center justify-center border-4 border-gold/30 shrink-0">
          <span className="text-5xl">🎲</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">About iGamingUbuntu</h1>
          <p className="text-text-secondary leading-relaxed">
            iGamingUbuntu is your trusted source for iGaming content, betting site reviews, and affiliate guides across Africa. 
            We help players find the best betting sites, understand the odds, and bet responsibly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">📝</div>
          <h3 className="font-bold text-text-primary mb-2">500+ Articles</h3>
          <p className="text-sm text-text-secondary">Published across African iGaming markets</p>
        </div>
        <div className="bg-card rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="font-bold text-text-primary mb-2">50+ Operators</h3>
          <p className="text-sm text-text-secondary">Partners including SportPesa, Betika, 1xBet</p>
        </div>
        <div className="bg-card rounded-xl p-6 text-center">
          <div className="text-3xl mb-3">🌍</div>
          <h3 className="font-bold text-text-primary mb-2">15 Markets</h3>
          <p className="text-sm text-text-secondary">Covering Kenya, Nigeria, SA, Ghana, Tanzania & more</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">What We Do</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            We write expert content about sports betting, casino games, and iGaming across Africa. 
            Every article is researched, fact-checked, and optimized for Google so bettors can find the information they need.
          </p>
          <p>
            Through our affiliate partnerships with leading operators, we earn a commission when readers sign up through our links. 
            This allows us to keep producing free, high-quality content for the African betting community.
          </p>
          <p>
            Our content covers: betting site reviews, bonus guides, how-to articles, match previews, 
            regulatory updates, and responsible gambling resources.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Want to work together?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="bg-ubuntu-orange text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
