import Hero from "@/components/Hero"
import LatestPosts from "@/components/LatestPosts"
import CountryCard from "@/components/CountryCard"
import Newsletter from "@/components/Newsletter"
import AdSlot from "@/components/AdSlot"
import Link from "next/link"
import type { Article, Country } from "@/types"

const sampleArticles: Article[] = [
  {
    id: "1", slug: "argentina-vs-egypt-world-cup-2026", title: "Argentina vs Egypt 3-2: Full Result & Best Odds for Next Match",
    excerpt: "Argentina came from 2-0 down to beat Egypt 3-2 in a thrilling World Cup Round of 16 match. Get the full result and best betting odds for the quarterfinal.",
    category: "Sports Betting", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    tags: ["World Cup", "Argentina", "Egypt", "Betting"],
    readTime: 4, author: "iGamingUbuntu", status: "published", views: 2848, content: "", createdAt: "2026-07-08", updatedAt: "2026-07-08",
  },
  {
    id: "2", slug: "top-5-online-casinos-kenya-2026", title: "Top 5 Online Casinos in Kenya 2026: Expert Reviews & Bonuses",
    excerpt: "We review the best online casinos available in Kenya for 2026. Compare bonuses, game selection, M-Pesa support, and our expert ratings.",
    category: "Casino Reviews", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&q=80",
    tags: ["Kenya", "Casino", "Reviews"],
    readTime: 8, author: "iGamingUbuntu", status: "published", views: 1956, content: "", createdAt: "2026-07-07", updatedAt: "2026-07-07",
  },
  {
    id: "3", slug: "world-cup-2026-betting-guide", title: "World Cup 2026 Betting Guide: Tips, Odds & Best Sites",
    excerpt: "Complete betting guide for the 2026 FIFA World Cup. Learn how to bet, where to get the best odds, and which betting sites to use in Africa.",
    category: "Betting Tips", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    tags: ["World Cup", "Betting", "Guide"],
    readTime: 6, author: "iGamingUbuntu", status: "published", views: 3421, content: "", createdAt: "2026-07-06", updatedAt: "2026-07-06",
  },
  {
    id: "4", slug: "sportpesa-welcome-bonus-2026", title: "SportPesa Welcome Bonus 2026: How to Claim Your 200% Match",
    excerpt: "Step-by-step guide to claiming the SportPesa welcome bonus. Get 200% up to KES 5,000 on your first deposit. Terms and conditions explained.",
    category: "Bonuses", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    tags: ["SportPesa", "Bonus", "Kenya"],
    readTime: 5, author: "iGamingUbuntu", status: "published", views: 4521, content: "", createdAt: "2026-07-05", updatedAt: "2026-07-05",
  },
  {
    id: "5", slug: "best-betting-sites-nigeria-2026", title: "Top 10 Best Betting Sites in Nigeria 2026: Ranked & Reviewed",
    excerpt: "Find the best betting sites in Nigeria for 2026. Compare bonuses, odds, payment methods like Bank Transfer and our expert ratings.",
    category: "Sports Betting", country: "nigeria",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    tags: ["Nigeria", "Betting", "Reviews"],
    readTime: 10, author: "iGamingUbuntu", status: "published", views: 3187, content: "", createdAt: "2026-07-04", updatedAt: "2026-07-04",
  },
  {
    id: "6", slug: "m-pesa-betting-sites-2026", title: "M-Pesa Betting Sites 2026: Best Operators Accepting Mobile Money",
    excerpt: "Complete list of betting sites that accept M-Pesa in 2026. Compare deposit limits, processing times, and welcome bonuses for mobile money users.",
    category: "Guides", country: "kenya",
    featuredImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    tags: ["M-Pesa", "Kenya", "Mobile Money"],
    readTime: 7, author: "iGamingUbuntu", status: "published", views: 2734, content: "", createdAt: "2026-07-03", updatedAt: "2026-07-03",
  },
]

const countries: Country[] = [
  { id: "ke", name: "Kenya", slug: "kenya", flag: "", description: "Best betting sites, M-Pesa guides, and local operator reviews for Kenyan bettors.", articleCount: 120 },
  { id: "ng", name: "Nigeria", slug: "nigeria", flag: "", description: "Nigerian betting market, Naija bonuses, and sportsbook reviews for Nigerian players.", articleCount: 85 },
  { id: "za", name: "South Africa", slug: "south-africa", flag: "", description: "SA betting guides, Hollywoodbets reviews, and local regulations for South African bettors.", articleCount: 64 },
  { id: "gh", name: "Ghana", slug: "ghana", flag: "", description: "Ghana betting sites, Premier League tips, and mobile money guides for Ghanaian players.", articleCount: 42 },
  { id: "tz", name: "Tanzania", slug: "tanzania", flag: "", description: "Tanzania sports betting, casino reviews, and Tigo-Pesa guides for Tanzanian bettors.", articleCount: 38 },
]

const services = [
  { title: "Match Result Articles", desc: "SEO-optimised match reports with integrated betting odds and affiliate CTAs that rank on Google within hours.", img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80" },
  { title: "Casino & Betting Reviews", desc: "In-depth operator reviews with comparison tables, bonus breakdowns, and compliant affiliate disclosure.", img: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=600&q=80" },
  { title: "Betting Guides & Tutorials", desc: "Beginner-friendly how-to content that converts readers into depositing players at your preferred operators.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" },
  { title: "Industry News & Press Releases", desc: "Timely coverage of regulatory changes, market launches, and operator announcements across African markets.", img: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=80" },
]

const processSteps = [
  { step: "01", title: "Brief", desc: "You tell me the topic, target market, and key affiliate links to include." },
  { step: "02", title: "Research", desc: "I research the latest odds, regulations, and competitor content for that market." },
  { step: "03", title: "Write & Optimise", desc: "I write the article with SEO, readability, and conversion elements baked in." },
  { step: "04", title: "Deliver & Deploy", desc: "You receive the finished article ready to publish — or I deploy it directly to your CMS." },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <AdSlot position="leaderboard-top" className="max-w-6xl mx-auto px-4 mb-8" />

      {/* Intro Strip */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-up">
          <p className="text-lg text-text-secondary leading-relaxed">
            I write iGaming content that ranks in Google and converts readers into depositing players. 
            From match reports that pull in World Cup traffic to casino reviews that drive affiliate signups — 
            every article is built for the African betting audience.
          </p>
          <p className="text-sm text-text-muted mt-3">
            Covering <span className="text-ubuntu-orange font-medium">Kenya</span>,{' '}
            <span className="text-ubuntu-orange font-medium">Nigeria</span>,{' '}
            <span className="text-ubuntu-orange font-medium">South Africa</span>,{' '}
            <span className="text-ubuntu-orange font-medium">Ghana</span>,{' '}
            <span className="text-ubuntu-orange font-medium">Tanzania</span>,{' '}
            and global markets.
          </p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=60" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/95" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-primary mb-3">What I Write</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Content types that drive traffic, engagement, and affiliate revenue across every African iGaming market.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Link key={s.title} href="/services" className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition-colors mb-1">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-16 bg-gradient-to-br from-ubuntu-orange/5 via-white to-ubuntu-purple/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Why Work With Me</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Three reasons clients choose iGamingUbuntu over generic content mills.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Speed Without Sacrifice",
                desc: "Need 50 articles this week? I deliver high-quality, researched content at scale — no plagiarism, no shortcuts, no missed deadlines.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
              },
              {
                title: "Deep Market Knowledge",
                desc: "I understand African betting audiences — M-Pesa, MoMo, local leagues, regulatory nuances, and what makes a Kenyan bettor different from a Nigerian one.",
                img: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=400&q=80",
              },
              {
                title: "Native + Global Perspective",
                desc: "I write for African readers with global standards. Articles are localised, compliant with UK/African regulations, and built for international affiliate programmes.",
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
              },
            ].map((item, i) => (
              <div key={item.title} className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="h-40 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-text-primary text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Snapshot */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=60" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ubuntu-purple/95 to-[#1a0a2e]/95" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-white/60 max-w-lg mx-auto">From brief to published article in four straightforward steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((p, i) => (
              <div key={p.step} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-16 h-16 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center mx-auto mb-4 text-gold font-bold text-xl">
                  {p.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 left-[60%] w-[calc(80%)] h-px border-t border-dashed border-gold/20" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-8">Trusted by Industry Leaders</h2>
          <div className="flex flex-wrap items-center justify-center gap-10 text-text-muted">
            {["SportPesa", "Betika", "1xBet", "Betway", "22Bet", "Melbet", "HollywoodBets", "Bet9ja"].map((brand) => (
              <span key={brand} className="text-lg font-bold opacity-30 hover:opacity-60 hover:text-ubuntu-orange transition-all duration-300">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <LatestPosts articles={sampleArticles} />

      {/* Country section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1526778548025-fa2f459b5fe7?w=1920&q=60" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/95" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Explore by Country</h2>
            <p className="text-text-secondary max-w-lg mx-auto">Country-specific betting guides, top sites, and local operator reviews tailored for each African market.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {countries.map((c) => (
              <CountryCard key={c.slug} country={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=85" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ubuntu-orange/90 to-ubuntu-purple/90" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-up">Ready to Scale Your iGaming Content?</h2>
          <p className="text-white/70 text-lg mb-8 animate-fade-up delay-1">
            Let's talk about your content needs. I'll deliver articles that rank, convert, and grow your affiliate revenue.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up delay-2">
            <Link
              href="/work-with-me"
              className="inline-flex items-center gap-2 bg-white text-ubuntu-orange px-8 py-3.5 rounded-xl font-bold hover:bg-white/90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Work With Me
              <span>→</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
            >
              View Sample Work
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Stay Ahead of the Game</h2>
            <p className="text-text-secondary mb-6">Get the latest betting tips, bonus offers, and iGaming insights delivered to your inbox.</p>
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  )
}
