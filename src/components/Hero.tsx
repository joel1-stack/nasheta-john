import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-white">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-ubuntu-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-ubuntu-purple/5 rounded-full blur-3xl" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `radial-gradient(circle at 25px 25px, #E95420 1px, transparent 0)`, backgroundSize: '50px 50px' }} />

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-ubuntu-orange/10 text-ubuntu-orange text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-ubuntu-orange rounded-full animate-pulse" />
              Africa's iGaming Authority
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ background: "linear-gradient(135deg, #E95420, #772953)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              iGaming Content<br />That Ranks & Converts
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
              I write the articles that drive players to betting sites, casinos, and sportsbooks across Africa. 
              <span className="text-ubuntu-orange font-semibold"> 10+ years.</span> 
              <span className="text-ubuntu-orange font-semibold"> 50+ operators.</span> Real results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-2 bg-ubuntu-orange text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-ubuntu-orange/20"
              >
                Read Latest Tips
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-ubuntu-orange text-ubuntu-orange px-8 py-3.5 rounded-xl font-semibold hover:bg-ubuntu-orange hover:text-white transition-all duration-200"
              >
                Hire Me
              </Link>
            </div>

            <div className="flex gap-8 mt-10 pt-8 border-t border-border">
              {[
                { val: "10+", label: "Years" },
                { val: "500+", label: "Articles" },
                { val: "50+", label: "Operators" },
                { val: "15", label: "Markets" },
              ].map((s, i) => (
                <div key={s.label} className={`text-center animate-fade-up delay-${i + 1}`}>
                  <span className="text-2xl font-bold text-text-primary">{s.val}</span>
                  <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center animate-fade-up delay-3">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=80"
                  alt="iGamingUbuntu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gold text-black text-sm font-bold px-4 py-2 rounded-lg shadow-lg animate-scale-in delay-4">
                Trusted by 50+ Operators
              </div>
              <div className="absolute -top-3 -left-3 bg-ubuntu-green text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-scale-in delay-5">
                ✓ Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
