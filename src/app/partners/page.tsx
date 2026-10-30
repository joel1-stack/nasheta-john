import Link from "next/link"
import type { Metadata } from "next"
import { ScrollReveal } from "@/lib/scrollReveal"

export const metadata: Metadata = {
  title: "Media Partners and Event Partnerships",
  description:
    "The events and organisations iGamingUbuntu works with as an official media partner, and how to arrange a media partnership for your own African iGaming event.",
  alternates: { canonical: "/partners" },
}

interface Partner {
  name: string
  role: string
  organiser: string
  dates: string
  location: string
  href: string
  blurb: string
  /** Logo in /public/images/partners. Falls back to initials when absent. */
  logo?: string
}

const mediaPartners: Partner[] = [
  {
    name: "Sports Betting West Africa+ 2027",
    role: "Official Media Partner",
    organiser: "Eventus International",
    dates: "6 – 8 October 2027",
    location: "Dakar, Senegal",
    href: "https://www.sportsbettingevents.com/sbwa",
    blurb:
      "West Africa's sports betting and iGaming summit, bringing operators, regulators, suppliers and affiliates to Dakar. We carry the build-up, the announcements and daily recaps from the floor.",
  },
]

const offer = [
  {
    title: "Pre-event coverage",
    desc: "Announcements, speaker news and agenda highlights published as news, not as adverts.",
  },
  {
    title: "Daily recaps",
    desc: "What was said and what it means for African operators, written the same day.",
  },
  {
    title: "Social amplification",
    desc: "Every story goes out on LinkedIn and X with a designed card built for the headline.",
  },
  {
    title: "A permanent home",
    desc: "Coverage stays on the site and keeps working in search long after the doors close.",
  },
]

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z+ ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

export default function PartnersPage() {
  return (
    <div>
      {/* Intro */}
      <section className="bg-brand-ink relative overflow-hidden">
        <span className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-teal/20" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
          <p className="text-xs font-semibold text-brand-lime uppercase tracking-[0.2em] mb-4">Partners</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight">
            The events we cover <span className="text-brand-lime">from the inside.</span>
          </h1>
          <p className="text-lg text-brand-mint/80 mt-6 max-w-2xl leading-relaxed">
            iGamingUbuntu partners with the conferences and summits that shape African betting.
            A partnership buys no coverage and changes no verdict &mdash; it gets us in the room
            so our readers hear what was said.
          </p>
        </div>
      </section>

      {/* Current partnerships */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-deep tracking-tight mb-8">
              Official media partnerships
            </h2>
          </ScrollReveal>

          <div className="space-y-5">
            {mediaPartners.map((p, i) => (
              <ScrollReveal key={p.href} delay={i * 80}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border border-brand-teal/20 border-t-4 border-t-brand-teal bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid md:grid-cols-[150px_1fr] gap-6 items-start">
                    <div className="flex items-center justify-center h-24 rounded-lg bg-brand-mint border border-brand-teal/15">
                      {p.logo ? (
                        <img
                          src={p.logo}
                          alt={`${p.name} logo`}
                          width={150}
                          height={96}
                          className="max-h-16 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-semibold tracking-tight text-brand-teal-dark">
                          {initials(p.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-teal-dark bg-brand-teal/10 px-2.5 py-1 rounded-full mb-3">
                        {p.role}
                      </span>
                      <h3 className="text-xl font-semibold text-brand-deep group-hover:text-brand-teal-dark transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-brand-teal-dark font-medium mt-1">
                        {p.dates} &middot; {p.location} &middot; organised by {p.organiser}
                      </p>
                      <p className="text-[15px] text-gray-600 leading-relaxed mt-3">{p.blurb}</p>
                      <span className="inline-block text-sm font-semibold text-brand-teal-dark mt-4 group-hover:underline">
                        Visit the event site &rarr;
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What partners get */}
      <section className="bg-brand-teal">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-8">
              What a media partnership includes
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {offer.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 80}>
                <div className="flex gap-4">
                  <span className="text-2xl font-semibold text-brand-lime w-8 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{o.title}</h3>
                    <p className="text-sm text-white/85 leading-relaxed">{o.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section className="bg-brand-ink">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
              Running an event in Africa?
            </h2>
            <p className="text-brand-mint/80 mt-4 mb-8 max-w-xl mx-auto leading-relaxed">
              We take on a small number of media partnerships each year so every one gets real
              coverage. Tell us about your event at{" "}
              <a href="mailto:info@igamingubuntu.com" className="text-brand-lime underline underline-offset-4">
                info@igamingubuntu.com
              </a>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-lime text-brand-ink px-7 py-3 rounded-lg font-bold hover:brightness-110 transition"
              >
                Talk to us
              </Link>
              <Link
                href="/advertise"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white/5 transition"
              >
                Advertise with us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
