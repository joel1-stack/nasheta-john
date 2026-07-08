import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Full background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&q=85"
          alt="iGaming content strategy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Animated decorative orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-ubuntu-orange/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-20 w-[30rem] h-[30rem] bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-ubuntu-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.8s" }} />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 25px 25px, #E95420 2px, transparent 0)`, backgroundSize: '50px 50px' }} />

      <div className="max-w-6xl mx-auto px-4 py-24 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-ubuntu-orange/10 text-ubuntu-orange text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up">
              <span className="w-2 h-2 bg-ubuntu-orange rounded-full animate-ping" />
              Africa's iGaming Authority
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-up delay-1"
              style={{ background: "linear-gradient(135deg, #E95420 0%, #772953 50%, #FFD700 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              iGaming Content<br />
              <span className="text-text-primary" style={{ background: "none", WebkitTextFillColor: "#111" }}>
                That Ranks & Converts
              </span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl animate-fade-up delay-2">
              I write the articles that drive players to betting sites, casinos, and sportsbooks across Africa. 
              <span className="text-ubuntu-orange font-semibold"> 10+ years.</span> 
              <span className="text-ubuntu-orange font-semibold"> 50+ operators.</span> Real results.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-3">
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-2 bg-ubuntu-orange text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-ubuntu-orange/20 hover:shadow-xl hover:shadow-ubuntu-orange/30 hover:-translate-y-0.5"
              >
                Read Latest Tips
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-ubuntu-orange text-ubuntu-orange px-8 py-3.5 rounded-xl font-semibold hover:bg-ubuntu-orange hover:text-white hover:shadow-lg hover:shadow-ubuntu-orange/20 transition-all duration-200"
              >
                Work With Me
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-border animate-fade-up delay-4">
              {[
                { val: "10+", label: "Years Experience" },
                { val: "500+", label: "Articles Written" },
                { val: "50+", label: "Operator Partners" },
                { val: "15", label: "Markets Covered" },
              ].map((s, i) => (
                <div key={s.label} className="text-center">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-ubuntu-orange to-ubuntu-purple bg-clip-text text-transparent">{s.val}</span>
                  <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center animate-fade-up delay-3">
            <div className="relative">
              {/* Main image */}
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=85"
                  alt="iGamingUbuntu"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating badges */}
              <div className="absolute -bottom-4 -right-4 bg-gold text-black text-sm font-bold px-5 py-3 rounded-xl shadow-xl animate-scale-in delay-4 hover:scale-105 transition-transform">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-ping" />
                  Trusted by 50+ Operators
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-ubuntu-green text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl animate-scale-in delay-5 hover:scale-105 transition-transform flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                Verified Professional
              </div>
              <div className="absolute top-1/2 -right-8 bg-white text-text-primary text-xs font-semibold px-3 py-2 rounded-lg shadow-lg animate-scale-in delay-5 hidden md:block hover:scale-105 transition-transform">
                📍 Nairobi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
