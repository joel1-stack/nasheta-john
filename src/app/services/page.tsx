import Link from "next/link"
import AdSlot from "@/components/AdSlot"

const contentTypes = [
  { id: "match-articles", title: "Match Result Articles", for: "Sportsbooks, affiliate sites, news publishers", approach: "SEO-optimised match reports published within hours of the final whistle. Each article includes live odds tables, next-match predictions, and embedded affiliate CTAs." },
  { id: "casino-reviews", title: "Casino & Betting Reviews", for: "Affiliate site owners, casino operators", approach: "Deep-dive operator reviews with comparison tables, bonus breakdowns, wagering requirement analysis, and compliant affiliate disclosure." },
  { id: "betting-guides", title: "Betting Guides & Tutorials", for: "New market entrants, content managers", approach: "Beginner-friendly guides that explain odds, bet types, payment methods, and strategies — written to convert readers into depositing players." },
  { id: "industry-news", title: "Industry News & Press Releases", for: "PR agencies, operator marketing teams", approach: "Timely, accurate coverage of regulatory changes, market launches, licensing updates, and operator announcements." },
]

const marketList = [
  { id: "kenya", name: "Kenya", diff: "M-Pesa-first economy, BCLB-regulated, strong mobile betting culture. Content needs to address local leagues (KPL), tax awareness (20% withholding), and Swahili-English bilingual readers." },
  { id: "nigeria", name: "Nigeria", diff: "Largest African betting market. Bet9ja dominant, Bank Transfer preferred. Content must acknowledge Naija betting slang, Premier League obsession, and NLRC regulations." },
  { id: "south-africa", name: "South Africa", diff: "HollywoodBets market leader, ZAR currency, NGB-regulated. Readers expect UK-standard content quality with local rugby and cricket coverage." },
  { id: "ghana", name: "Ghana", diff: "MTN MoMo dominant, Gaming Commission regulated. Premier League focus, growing casino interest, and Vodafone Cash as secondary payment." },
  { id: "tanzania", name: "Tanzania", diff: "Tigo-Pesa and M-Pesa dual payment culture, Gaming Board regulated. Content should address Swahili-speaking audience and local league interest." },
  { id: "global", name: "UK, US & Canada", diff: "Mature regulated markets demanding authoritative, compliant content. UKGC and MGA compliance essential. Readers expect deeper analysis, responsible gambling prominence, and native English quality." },
]

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="Services" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Services</h1>
          <p className="text-white/80 mt-1 max-w-2xl">iGaming content tailored for your market, your audience, and your revenue goals.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-12 rounded-xl overflow-hidden" />

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Content Types */}
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
            <svg className="w-6 h-6 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Content Types
          </h2>
          <div className="space-y-4">
            {contentTypes.map((ct, i) => (
              <div key={ct.id} id={ct.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 className="font-bold text-text-primary text-lg mb-1">{ct.title}</h3>
                <p className="text-xs text-ubuntu-orange font-medium mb-2">For: {ct.for}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{ct.approach}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Markets */}
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6 pb-3 border-b border-border flex items-center gap-2">
            <svg className="w-6 h-6 text-ubuntu-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Markets
          </h2>
          <div className="space-y-4">
            {marketList.map((m, i) => (
              <div key={m.id} id={m.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 className="font-bold text-text-primary text-lg mb-1">{m.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{m.diff}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AdSlot position="in-content-1" className="mb-12 rounded-xl overflow-hidden" />

      {/* Pricing note */}
      <div className="bg-card rounded-xl p-8 mb-8 text-center border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Pricing</h2>
        <p className="text-text-secondary max-w-xl mx-auto leading-relaxed mb-6">
          I don't publish fixed rates because every project is different — volume, market complexity, research depth, and deadlines all factor in. 
          Tell me what you need, and I'll quote you a fair price within 24 hours.
        </p>
        <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-ubuntu-orange text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition shadow-md shadow-ubuntu-orange/20">
          Request A Quote
          <span>→</span>
        </Link>
      </div>

      {/* Bottom CTA */}
      <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ubuntu-orange/90 to-ubuntu-purple/90" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Scale Your Content?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">Let's talk about what you need. I'll deliver articles that rank, convert, and grow your affiliate revenue.</p>
          <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-white text-ubuntu-orange px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition shadow-xl">
            Work With Me
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
