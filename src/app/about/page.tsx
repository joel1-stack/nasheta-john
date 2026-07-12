import Link from "next/link"

const values = [
  {
    title: "Market-first content",
    desc: "Every piece we write is researched for its specific target market. African betting, UKGC compliance, US state-by-state regulation. No generic outsourcing.",
  },
  {
    title: "Editorial discipline",
    desc: "Journalistic standards applied to SEO content. Research, structure, fact-checking, and readability before we publish a single word.",
  },
  {
    title: "Reliability at scale",
    desc: "98% on-time delivery across 5,000+ pieces. Structured workflows, clear milestones, and dedicated account management keep production predictable.",
  },
  {
    title: "ROI-focused",
    desc: "Content that ranks and converts. Every deliverable ties back to a business goal. We measure what matters and optimise continuously.",
  },
]

const timeline = [
  { year: "2016", event: "Nasheta John began writing about African iGaming markets, identifying a gap in locally relevant content." },
  { year: "2018", event: "First retainer clients. Expanded from single articles to full content strategy and editorial calendars." },
  { year: "2020", event: "Launched translation and localisation services. Grew team to support multilingual production across 12 languages." },
  { year: "2022", event: "Added link building and outreach. Surpassed 2,000 pieces delivered with 50+ active clients." },
  { year: "2024", event: "Full-service agency. Content operations, CMS management, and dedicated account teams. 5,000+ pieces served." },
]

const sectors = ["Publishing", "iGaming", "SaaS", "E-commerce", "Finance", "Health", "Travel"]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in relative z-10">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-[#0E1358] to-[#1B2385]">
        <div className="absolute inset-0">
          <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-[#110B18]/40" />
        <div className="relative z-10 p-8 md:p-14 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shrink-0 shadow-xl">
              <img src="/images/nasheta.png" alt="Nasheta John" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">We help brands own their space through content that works.</h1>
              <p className="text-white/80 text-lg mt-2 max-w-xl">iGamingUbuntu is an editorial content agency built for businesses that need SEO content that ranks, converts, and scales.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 glass-card text-ubuntu-orange px-6 py-3 rounded-xl font-bold hover:glass-card/90 transition shadow-lg">
              Start a project
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:glass-card/10 transition">
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Our mission</h2>
        <p className="text-text-secondary text-lg leading-relaxed">
          To provide the editorial firepower that content marketing campaigns need to succeed in competitive markets.
          We combine journalistic rigour with SEO discipline to produce content that drives measurable business results.
        </p>
      </div>

      {/* Founder */}
      <div className="glass-card rounded-xl border border-border p-8 md:p-10 mb-14">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 shadow-md">
            <img src="/images/nasheta.png" alt="Nasheta John" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-1">Founded by Nasheta John</h2>
            <p className="text-sm text-text-muted mb-4">Content strategist and iGaming specialist since 2016</p>
            <div className="space-y-3 text-text-secondary leading-relaxed text-sm">
              <p>
                Nasheta started writing about African iGaming markets in 2016 when most betting content was copied from European sources.
                He saw an opportunity to deliver locally relevant, well-researched content that served both operators and bettors.
              </p>
              <p>
                What began as a solo writing operation grew into a full-service content agency. Today, iGamingUbuntu works with operators,
                affiliate networks, and content agencies across Africa, the UK, the US, and Canada. The founding principle remains the same:
                understand the market, respect the reader, and deliver content that performs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">What we stand for</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {values.map((v) => (
            <div key={v.title} className="glass-card rounded-xl border border-border p-6">
              <h3 className="font-bold text-text-primary mb-2">{v.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-xl border border-border p-8 mb-14">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Our journey</h2>
        <div className="relative">
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-0.5 bg-ubuntu-orange/20" />
          <div className="space-y-6">
            {timeline.map((t) => (
              <div key={t.year} className="flex items-start gap-6">
                <div className="w-20 shrink-0 text-right">
                  <span className="font-bold text-ubuntu-orange text-sm">{t.year}</span>
                </div>
                <div className="w-3 h-3 rounded-full bg-ubuntu-orange mt-1.5 shrink-0 relative z-10" />
                <p className="text-sm text-text-secondary leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sectors */}
      <div className="text-center mb-14">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Industries we serve</h2>
        <p className="text-text-secondary text-sm mb-6 max-w-xl mx-auto">Our editorial team produces content for a wide range of sectors.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {sectors.map((s) => (
            <div key={s} className="glass-card border border-border rounded-xl px-5 py-2.5 text-sm font-medium text-text-secondary hover:border-ubuntu-orange/30 transition">{s}</div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
        {[
          { num: "5,000+", label: "pieces delivered" },
          { num: "12+", label: "languages" },
          { num: "98%", label: "on-time delivery" },
          { num: "50+", label: "active clients" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl border border-border p-6 text-center">
            <p className="text-3xl font-bold text-ubuntu-orange">{s.num}</p>
            <p className="text-sm text-text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white text-center">
        <div className="absolute inset-0">
          <img src="/images/Green Data Network (ABSTRACT + TECH).png" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ubuntu-orange/90 to-ubuntu-purple/90" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to work together?</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">Tell us about your content needs. We will send you a tailored proposal within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 glass-card text-ubuntu-orange px-8 py-3 rounded-xl font-bold hover:glass-card/90 transition shadow-xl">
              Start a project
              <span>&rarr;</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:glass-card/10 transition">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
