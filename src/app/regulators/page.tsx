import Link from "next/link"
import type { Metadata } from "next"
import SectionHeader from "@/components/SectionHeader"
import { staticPageMetadata } from "@/lib/pageMeta"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = staticPageMetadata({
  title: "African Gambling Regulators Directory: Official Websites",
  description:
    "A directory of gambling regulators and lottery bodies across Africa with links to their official websites and our coverage of each market.",
  path: "/regulators",
})

interface Body {
  country: string
  name: string
  site: string
  /** Our own page for this market, when we have one. */
  ours?: { label: string; href: string }
}

/**
 * Each official site below is one that African gaming publishers cite as a
 * primary source (checked 2026-11-06). Names are the bodies' own names.
 * Add a row only for a body you have confirmed; never guess a regulator.
 */
const REGULATORS: Body[] = [
  { country: "Kenya", name: "Gambling Regulatory Authority (GRA)", site: "https://gra.go.ke", ours: { label: "Kenya hub", href: "/kenya" } },
  { country: "Nigeria (Lagos)", name: "Lagos State Lotteries and Gaming Authority (LSLGA)", site: "https://lslga.org", ours: { label: "Nigeria hub", href: "/nigeria" } },
  { country: "South Africa", name: "National Gambling Board", site: "https://ngb.org.za", ours: { label: "South Africa hub", href: "/south-africa" } },
  { country: "South Africa (Limpopo)", name: "Limpopo Gambling Board", site: "https://lgb.org.za", ours: { label: "South Africa hub", href: "/south-africa" } },
  { country: "South Africa (North West)", name: "North West Gambling Board", site: "https://nwgb.co.za", ours: { label: "South Africa hub", href: "/south-africa" } },
  { country: "South Africa (Mpumalanga)", name: "Mpumalanga Economic Regulator", site: "https://meronline.org.za", ours: { label: "South Africa hub", href: "/south-africa" } },
  { country: "Ghana", name: "National Lottery Authority (NLA)", site: "https://www.nla.com.gh", ours: { label: "Ghana hub", href: "/ghana" } },
  { country: "Tanzania", name: "Gaming Board of Tanzania", site: "https://gamingboard.go.tz", ours: { label: "Tanzania hub", href: "/tanzania" } },
  { country: "Uganda", name: "National Lotteries and Gaming Regulatory Board (NLGRB)", site: "https://lgrb.go.ug", ours: { label: "Uganda coverage", href: "/topics/uganda" } },
  { country: "Botswana", name: "Botswana Gambling Authority", site: "https://gamblingauthority.co.bw" },
  { country: "Liberia", name: "National Lottery Authority (NLA)", site: "https://nla.gov.lr" },
  { country: "Mauritius", name: "Gambling Regulatory Authority (GRA)", site: "https://gra.govmu.org" },
  { country: "Senegal", name: "LONASE (Loterie Nationale Sénégalaise)", site: "https://www.lonase.sn", ours: { label: "National lotteries coverage", href: "/topics/national-lotteries" } },
  { country: "Côte d'Ivoire", name: "LONACI (Loterie Nationale de Côte d'Ivoire)", site: "https://lonaci.ci" },
  { country: "Burkina Faso", name: "LONAB (Loterie Nationale Burkinabè)", site: "https://lonab.bf" },
]

const BODIES: Body[] = [
  { country: "Kenya", name: "Association of Gaming Operators Kenya (AGOK)", site: "https://agok.org" },
  { country: "South Africa", name: "South African Responsible Gambling Foundation", site: "https://responsiblegambling.org.za" },
]

export default function RegulatorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "African gambling regulators and lottery bodies",
    url: `${SITE_URL}/regulators`,
    itemListElement: REGULATORS.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: `${r.name}, ${r.country}`, url: r.site })),
  }
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeader
        title="African Gambling Regulators Directory"
        description="Official websites of gambling regulators and lottery bodies, with our coverage of each market."
        crumbs={[{ label: "Home", href: "/" }, { label: "Regulators" }]}
      />
      <p className="max-w-3xl text-gray-600 mb-6">
        Regulator notices are the primary source for most of what we report. This directory lists the official websites we use
        and links to our coverage of each market. It is not complete: we add a body only after confirming it, and the list grows as we
        cover more countries. Always check the regulator&apos;s own site for the current licensing position, because rules and
        contact details change.
      </p>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr><th className="p-3">Country</th><th className="p-3">Regulator or body</th><th className="p-3">Official website</th><th className="p-3">Our coverage</th></tr>
          </thead>
          <tbody>
            {REGULATORS.map((r) => (
              <tr key={r.name + r.country} className="border-t border-gray-100">
                <td className="p-3 whitespace-nowrap">{r.country}</td>
                <td className="p-3 font-medium text-[#111827]">{r.name}</td>
                <td className="p-3"><a href={r.site} target="_blank" rel="noopener noreferrer" className="text-[#409824] hover:underline">{r.site.replace(/^https?:\/\/(www\.)?/, "")}</a></td>
                <td className="p-3">{r.ours ? <Link href={r.ours.href} className="text-[#409824] hover:underline">{r.ours.label}</Link> : <span className="text-gray-400">Regulation news below</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-[#111827] mt-10 mb-3">Industry and responsible-gambling bodies</h2>
      <ul className="space-y-2 text-sm text-gray-700">
        {BODIES.map((b) => (
          <li key={b.name}>
            <a href={b.site} target="_blank" rel="noopener noreferrer" className="text-[#409824] hover:underline font-medium">{b.name}</a>{" "}
            <span className="text-gray-500">({b.country})</span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-600 mt-8">
        See the latest regulatory reporting in <Link href="/news/regulation" className="text-[#409824] hover:underline">Regulation news</Link>.
        Spotted a missing or outdated entry? <Link href="/contact" className="text-[#409824] hover:underline">Tell us</Link>.
      </p>
    </div>
  )
}
