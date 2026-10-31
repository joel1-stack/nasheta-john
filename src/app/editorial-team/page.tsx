import Link from "next/link"
import type { Metadata } from "next"
import TeamGrid from "@/components/TeamGrid"
import { ScrollReveal } from "@/lib/scrollReveal"
import { TEAM } from "@/lib/team"
import { teamProfileLd } from "@/lib/structuredData"

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "The people who report, edit and rank iGamingUbuntu: who covers African betting regulation, what each of them works on, and how to join us.",
  alternates: { canonical: "/editorial-team" },
}

export default function EditorialTeamPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamProfileLd(TEAM)) }}
      />

      {/* Intro */}
      <section className="bg-brand-ink relative overflow-hidden">
        <span className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-brand-teal/20" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-20">
          <p className="text-xs font-semibold text-brand-lime uppercase tracking-[0.2em] mb-4">The newsroom</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight">
            Meet our <span className="text-brand-lime">team.</span>
          </h1>
          <p className="text-lg text-brand-mint/80 mt-6 max-w-2xl leading-relaxed">
            A small newsroom that reads the gazettes, the regulator notices and the court
            lists itself. Every story on this site has a name against it.
          </p>
        </div>
      </section>

      {/* The team */}
      <section className="bg-brand-mint">
        <div className="max-w-5xl mx-auto px-4 pb-16 md:pb-20">
          <TeamGrid />
        </div>
      </section>

      {/* How we work together */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-deep tracking-tight mb-6">
              How the desk works
            </h2>
            <div className="space-y-4 text-[#2B2F36] leading-relaxed text-[17px]">
              <p>
                We cover regulation market by market rather than chasing every press release.
                A story earns its place when it changes what an operator, an affiliate or a
                bettor has to do differently.
              </p>
              <p>
                Reporting and search are not separate jobs here. A piece is researched, written
                and then checked for whether a reader, or a machine answering a reader, can
                actually find the answer in it.
              </p>
              <p>
                Everything is sourced. Where a claim comes from a regulator, a gazette or a
                company statement, we say so, and we correct in the open when we get it wrong.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-7 text-sm">
              <Link href="/editorial-policy" className="font-semibold text-brand-teal-dark hover:underline">
                Editorial policy &rarr;
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/corrections" className="font-semibold text-brand-teal-dark hover:underline">
                Corrections policy &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Join */}
      <section className="bg-brand-ink">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-light text-white tracking-tight">
              Want a byline here?
            </h2>
            <p className="text-brand-mint/80 mt-4 mb-8 max-w-xl mx-auto leading-relaxed">
              We work with writers and analysts who know one African market properly. Tell us
              which one, and send something you have written, to{" "}
              <a href="mailto:info@igamingubuntu.com" className="text-brand-lime underline underline-offset-4">
                info@igamingubuntu.com
              </a>
              .
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-lime text-brand-ink px-7 py-3 rounded-lg font-bold hover:brightness-110 transition"
            >
              Get in touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
