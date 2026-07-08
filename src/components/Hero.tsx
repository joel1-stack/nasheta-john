import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ background: "linear-gradient(135deg, #E95420, #772953)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              iGaming Content<br />That Ranks & Converts
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
              I write the articles that drive players to betting sites, casinos, and sportsbooks across Africa. 
              10+ years. 50+ operators. Real results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/blog" className="bg-ubuntu-orange text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                Read Latest Tips
              </Link>
              <Link href="/contact" className="border-2 border-ubuntu-orange text-ubuntu-orange px-6 py-3 rounded-lg font-medium hover:bg-ubuntu-orange hover:text-white transition">
                Hire Me
              </Link>
            </div>
            <div className="flex gap-8 mt-10 pt-8 border-t border-border">
              <div><span className="text-2xl font-bold text-text-primary">10+</span><p className="text-xs text-text-muted">Years</p></div>
              <div><span className="text-2xl font-bold text-text-primary">500+</span><p className="text-xs text-text-muted">Articles</p></div>
              <div><span className="text-2xl font-bold text-text-primary">50+</span><p className="text-xs text-text-muted">Operators</p></div>
              <div><span className="text-2xl font-bold text-text-primary">15</span><p className="text-xs text-text-muted">Markets</p></div>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-72 h-72 rounded-full bg-card flex items-center justify-center border-4 border-gold/30">
              <span className="text-6xl">🎲</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
