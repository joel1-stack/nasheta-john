import Link from "next/link"
import AdSlot from "@/components/AdSlot"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-ubuntu-purple to-ubuntu-orange p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shrink-0 shadow-xl">
            <img src="/images/nasheta.png" alt="Nasheta" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
            <p className="text-white/80 mt-1 max-w-xl">The person behind iGamingUbuntu — and why clients trust me with their content.</p>
          </div>
        </div>
      </div>

      {/* The story */}
      <div className="bg-white rounded-xl border border-border p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">My Story</h2>
        <div className="space-y-4 text-text-secondary leading-relaxed">
          <p>
            I started writing about iGaming in 2016, back when African betting markets were still finding their feet online. 
            I saw a gap — most content about betting was written for European or American audiences, 
            copied poorly for African readers, or just didn't exist in local context.
          </p>
          <p>
            So I built iGamingUbuntu to fix that. Every article I write is researched for the specific market it targets — 
            whether that's a Kenyan bettor checking M-Pesa deposit limits or a Nigerian punter comparing Bet9ja odds.
          </p>
          <p>
            Over the years I've written for affiliate site owners, sportsbook operators, casino marketing teams, 
            and content agencies that needed to scale their African iGaming output. 
            The common thread: they needed someone who understood both the global affiliate industry and the local African betting culture.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-text-primary mb-3">What I Specialise In</h2>
          <ul className="space-y-3 text-sm text-text-secondary">
            {[
              "SEO-optimised match reports that rank within hours of the final whistle",
              "Casino and sportsbook reviews that drive affiliate conversions",
              "Beginner-friendly betting guides that turn readers into depositing players",
              "Industry news and regulatory coverage for African markets",
              "Content strategy for affiliate sites scaling to 50+ articles per week",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg className="w-4 h-4 text-ubuntu-green mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-text-primary mb-3">Why That Matters</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            When you hire a writer who doesn't understand your market, you get generic content that doesn't rank and doesn't convert.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            I write for your specific audience — whether they're depositing via M-Pesa in Nairobi, 
            betting with Bet9ja in Lagos, or claiming a bonus in pounds from London. 
            That market knowledge is what turns a content budget into an ROI.
          </p>
        </div>
      </div>

      {/* Markets */}
      <div className="bg-card rounded-xl p-8 mb-8 border border-border">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Markets I Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Africa", desc: "Kenya, Nigeria, South Africa, Ghana, Tanzania — local knowledge, local payment methods, local regulations." },
            { name: "United Kingdom", desc: "UKGC-regulated content, responsible gambling compliance, Premier League-focused betting content." },
            { name: "United States", desc: "State-by-state sports betting coverage, US audience tone, regulated market compliance." },
            { name: "Canada", desc: "Ontario-regulated content, Canadian sports focus (hockey, basketball), bilingual consideration." },
          ].map((m) => (
            <div key={m.name} className="bg-white rounded-lg p-4 border border-border">
              <h3 className="font-bold text-text-primary mb-1">{m.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <AdSlot position="in-content-1" className="mb-8 rounded-xl overflow-hidden" />

      {/* CTA */}
      <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ubuntu-orange/90 to-ubuntu-purple/90" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Let's Work Together</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">Tell me about your content needs — I'll send you a quote within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/work-with-me" className="inline-flex items-center gap-2 bg-white text-ubuntu-orange px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition shadow-xl">
              Work With Me
              <span>→</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
