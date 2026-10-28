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

const pill =
  "bg-white text-brand-deep font-semibold px-4 py-2 rounded hover:bg-brand-teal hover:text-white transition"

/** Each section has its own background: ink, mint, white, teal, mint, ink. */
export default function AboutPage() {
  return (
    <div>
      {/* Intro */}
      <section className="bg-brand-ink relative overflow-hidden">
        <span className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-teal/20" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
          <p className="text-xs font-semibold text-brand-lime uppercase tracking-[0.2em] mb-4">Who We Are</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight">
            We follow Africa&apos;s betting markets <span className="text-brand-lime">so you don&apos;t have to.</span>
          </h1>
          <p className="text-lg text-brand-mint/80 mt-6 max-w-2xl leading-relaxed">
            Every week a new tax, a new licence rule or a court case changes how betting works somewhere in Africa.
            We track it, check it, and tell you what it means.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/" className="inline-flex items-center gap-2 bg-brand-lime text-brand-ink px-7 py-3 rounded-lg font-bold hover:brightness-110 transition">
              Read the latest news <span>&rarr;</span>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/5 transition">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* How it started */}
      <section className="bg-brand-mint">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-deep tracking-tight mb-6">How it started</h2>
            <div className="space-y-4 text-[#2B2F36] leading-relaxed text-[17px]">
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
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-deep tracking-tight mb-8">What we cover</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {coverage.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 80}>
                <div className="rounded-lg border border-brand-teal/20 border-t-4 border-t-brand-teal bg-white p-6 h-full shadow-sm">
                  <h3 className="text-lg font-semibold text-brand-deep mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-brand-teal">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-8">How we work</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="flex gap-4">
                  <span className="text-2xl font-semibold text-brand-lime w-8 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{p.title}</h3>
                    <p className="text-sm text-white/85 leading-relaxed">{p.desc}</p>
                    {p.link && (
                      <Link href={p.link.href} className="inline-block text-sm font-semibold text-brand-lime hover:underline mt-2">
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
      <section className="bg-brand-mint">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-xl shadow-brand-deep/20 max-w-[300px] mx-auto md:mx-0 border-4 border-white">
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
                <p className="text-xs font-semibold text-brand-teal-dark uppercase tracking-[0.2em] mb-3">Meet the editor</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-brand-deep tracking-tight">Nasheta John</h2>
                <p className="text-brand-teal-dark mt-1 font-medium">Founder and Editor</p>
                <div className="space-y-4 text-[#2B2F36] leading-relaxed mt-6">
                  <p>
                    Nasheta has written about African betting since 2016, first for operators and affiliate sites,
                    and now for iGamingUbuntu.
                  </p>
                  <p>
                    Most days start on regulator websites from Kenya to South Africa and end with a story that explains,
                    in a few minutes, what changed and who it affects.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-6 text-sm">
                  <a href="https://www.linkedin.com/in/nashetajohnigaming/" target="_blank" rel="noopener noreferrer" className={pill}>LinkedIn</a>
                  <a href="https://x.com/SalvageNasheta" target="_blank" rel="noopener noreferrer" className={pill}>X</a>
                  <Link href="/editorial-team" className={pill}>Editorial team</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Get in touch */}
      <section className="bg-brand-ink">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">Got a story, a correction or a press release?</h2>
            <p className="text-brand-mint/80 mt-4 mb-8 max-w-xl mx-auto leading-relaxed">
              Write to us at{" "}
              <a href="mailto:info@igamingubuntu.com" className="text-brand-lime underline underline-offset-4">info@igamingubuntu.com</a>.
              If you want to reach our readers, see how advertising works.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-brand-lime text-brand-ink px-7 py-3 rounded-lg font-bold hover:brightness-110 transition">
                Contact us
              </Link>
              <Link href="/advertise" className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/5 transition">
                Advertise with us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
