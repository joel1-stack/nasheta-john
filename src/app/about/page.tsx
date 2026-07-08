import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="Team working" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shrink-0 shadow-xl">
            <img src="/images/nasheta.png" alt="Nasheta" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">About iGamingUbuntu</h1>
            <p className="text-white/80 mt-2 max-w-xl">
              Your trusted source for iGaming content, betting site reviews, and affiliate guides across Africa.
              We help bettors find the best sites, understand odds, and play responsibly.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { value: "500+", label: "Articles Published", desc: "Across African iGaming markets", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&q=80" },
          { value: "50+", label: "Operator Partners", desc: "Including SportPesa, Betika, 1xBet", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&q=80" },
          { value: "15", label: "Markets Covered", desc: "Kenya, Nigeria, SA, Ghana, Tanzania & more", img: "https://images.unsplash.com/photo-1526778548025-fa2f459b5fe7?w=100&q=80" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 text-center border border-border hover:shadow-md transition animate-fade-up">
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg overflow-hidden">
              <img src={stat.img} alt={stat.label} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-text-secondary">{stat.label}</p>
            <p className="text-xs text-text-muted mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-8 mb-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">What We Do</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            We write expert content about sports betting, casino games, and iGaming across Africa.
            Every article is researched, fact-checked, and optimized so bettors can find the information they need.
          </p>
          <p>
            Through our affiliate partnerships with leading operators, we earn a commission when readers sign up through our links.
            This allows us to keep producing free, high-quality content for the African betting community.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Betting Site Reviews", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80" },
              { label: "Bonus Guides", img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&q=80" },
              { label: "Match Previews", img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200&q=80" },
              { label: "Regulatory Updates", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=80" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-lg overflow-hidden border border-border group cursor-default">
                <div className="h-20 overflow-hidden">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <p className="text-sm font-medium text-text-primary p-2.5 text-center">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-ubuntu-green/10 to-ubuntu-green/5 rounded-xl p-8 mb-8 border border-ubuntu-green/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-ubuntu-green/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-ubuntu-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Responsible Gambling Commitment</h2>
            <p className="text-text-secondary leading-relaxed">
              We promote responsible gambling. Our content includes responsible gambling messaging on every page.
              We never encourage chasing losses or betting more than you can afford. If you or someone you know needs help,
              please contact your local responsible gambling organization.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-ubuntu-red/10 text-ubuntu-red text-xs px-3 py-1 rounded-full font-medium">18+ Only</span>
              <span className="bg-ubuntu-orange/10 text-ubuntu-orange text-xs px-3 py-1 rounded-full font-medium">Set Deposit Limits</span>
              <span className="bg-ubuntu-green/10 text-ubuntu-green text-xs px-3 py-1 rounded-full font-medium">Gamble Responsibly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-white rounded-xl p-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Want to work together?</h2>
        <p className="text-text-secondary mb-6">Have a question, partnership inquiry, or feedback? We'd love to hear from you.</p>
        <Link href="/contact" className="inline-block bg-ubuntu-orange text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition shadow-md shadow-ubuntu-orange/20">
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
