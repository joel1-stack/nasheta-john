import Link from "next/link"
import Image from "next/image"
import { ScrollReveal } from "@/lib/scrollReveal"

const coverage = [
  {
    title: "Rules and licences",
    desc: "Who is allowed to operate, what a licence costs, and what changed this month.",
  },
  {
    title: "Taxes",
    desc: "Excise duty, GGR tax and tax on winnings. We explain who pays, how much, and from when.",
  },
  {
    title: "Operators and deals",
    desc: "Launches, partnerships, results and exits across the continent.",
  },
  {
    title: "Players and safety",
    desc: "Responsible gambling campaigns, illegal operators, and what actually protects bettors.",
  },
]

const principles = [
  {
    title: "We show our sources",
    desc: "Gazettes, court records, regulator notices and company statements. We link to them so you can check our work.",
  },
  {
    title: "Paid content is labelled",
    desc: "If someone paid for a story, it says so at the top. Advertisers do not choose what we cover.",
  },
  {
    title: "We fix mistakes in the open",
    desc: "When we get something wrong, we correct it and note the change.",
    link: { label: "Read our corrections policy", href: "/corrections" },
  },
  {
    title: "We stay with each market",
    desc: "Kenya is not Nigeria, and Ghana is not South Africa. Each country gets its own coverage, not a copy and paste.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#110B18]">
      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] mb-4">Who We Are</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#FCFBFB] leading-tight tracking-tight">
          We follow Africa&apos;s betting markets so you don&apos;t have to.
        </h1>
        <p className="text-lg text-[#B5ABB3] mt-6 max-w-2xl leading-relaxed">
          Every week a new tax, a new licence rule or a court case changes how betting works somewhere in Africa.
          We track it, check it, and tell you what it means.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Link href="/" className="inline-flex items-center gap-2 bg-[#409824] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">
            Read the latest news <span>&rarr;</span>
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-7 py-3 rounded-xl font-semibold hover:bg-white/5 transition">
            Contact us
          </Link>
        </div>
      </section>

      {/* How it started */}
      <section className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-light text-[#FCFBFB] tracking-tight mb-6">How it started</h2>
            <div className="space-y-4 text-[#B5ABB3] leading-relaxed text-[17px]">
              <p>
                iGamingUbuntu began with a simple problem. Most betting news about Africa was written from far away,
                copied from European sites, or a week late. People working in Nairobi, Lagos and Johannesburg deserved better.
              </p>
              <p>
                So we built a newsroom that stays close to the markets it covers. We read the regulator notices, the
                court lists and the budget speeches ourselves, then write about them in plain English.
              </p>
              <p>
                Our readers are operators, affiliates, regulators, investors and suppliers. Most of them are busy, so
                we keep stories short and get to the point.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What we cover */}
      <section className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-light text-[#FCFBFB] tracking-tight mb-8">What we cover</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {coverage.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="glass-card rounded-2xl border border-white/5 p-6 h-full">
                  <h3 className="text-lg font-medium text-[#FCFBFB] mb-2">{c.title}</h3>
                  <p className="text-sm text-[#B5ABB3] leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-light text-[#FCFBFB] tracking-tight mb-8">How we work</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="flex gap-4">
                  <span className="text-2xl font-light text-[#409824] w-8 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium text-[#FCFBFB] mb-1">{p.title}</h3>
                    <p className="text-sm text-[#B5ABB3] leading-relaxed">{p.desc}</p>
                    {p.link && (
                      <Link href={p.link.href} className="inline-block text-sm text-[#409824] hover:underline mt-2">
                        {p.link.label} &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the editor */}
      <section className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30 max-w-[300px] mx-auto md:mx-0">
                <Image
                  src="/images/nasheta-john-portrait.jpg"
                  alt="Nasheta John, founder and editor of iGamingUbuntu"
                  width={720}
                  height={1052}
                  sizes="300px"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#409824] uppercase tracking-[0.2em] mb-3">Meet the editor</p>
                <h2 className="text-2xl md:text-3xl font-light text-[#FCFBFB] tracking-tight">Nasheta John</h2>
                <p className="text-[#8A8494] mt-1">Founder and Editor</p>
                <div className="space-y-4 text-[#B5ABB3] leading-relaxed mt-6">
                  <p>
                    Nasheta has written about African betting since 2016, first for operators and affiliate sites,
                    and now for iGamingUbuntu.
                  </p>
                  <p>
                    Most days start on regulator websites from Kenya to South Africa and end with a story that explains,
                    in a few minutes, what changed and who it affects.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-6 text-sm">
                  <a href="https://www.linkedin.com/in/nashetajohnigaming/" target="_blank" rel="noopener noreferrer" className="text-[#409824] hover:underline">LinkedIn</a>
                  <a href="https://x.com/SalvageNasheta" target="_blank" rel="noopener noreferrer" className="text-[#409824] hover:underline">X</a>
                  <Link href="/editorial-team" className="text-[#409824] hover:underline">Editorial team</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Get in touch */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-light text-[#FCFBFB] tracking-tight">Got a story, a correction or a press release?</h2>
            <p className="text-[#B5ABB3] mt-4 mb-8 max-w-xl mx-auto leading-relaxed">
              Write to us at{" "}
              <a href="mailto:info@igamingubuntu.com" className="text-[#FCFBFB] underline underline-offset-4">info@igamingubuntu.com</a>.
              If you want to reach our readers, see how advertising works.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#409824] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20">
                Contact us
              </Link>
              <Link href="/advertise" className="inline-flex items-center gap-2 border border-[#B5ABB3]/40 text-[#FCFBFB] px-7 py-3 rounded-xl font-semibold hover:bg-white/5 transition">
                Advertise with us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
