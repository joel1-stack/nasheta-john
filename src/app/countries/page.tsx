import Link from "next/link"
import type { Metadata } from "next"
import SectionHeader from "@/components/SectionHeader"
import { COUNTRY_LINKS } from "@/lib/navigation"
import { TOPICS } from "@/lib/topics"
import { queryArticles } from "@/lib/serverArticles"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Country Guides: African Gambling Regulation by Market",
  description:
    "Find our gambling regulation, licensing, tax and payments coverage by country, plus topic pages and the directory of African gambling regulators.",
  path: "/countries",
})

export const revalidate = 600

/** Where to start for a market: our country pages, topic pages and the regulator directory. */
export default async function CountriesPage() {
  const counts = await Promise.all(
    COUNTRY_LINKS.map(async (c) => {
      const slug = c.href.replace("/", "")
      const { total } = await queryArticles({ country: slug, perPage: 1 })
      return { ...c, total }
    }),
  )

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader
        title="Country Guides"
        description="Gambling regulation, licensing, tax and payments coverage by market."
        crumbs={[{ label: "Home", href: "/" }, { label: "Country Guides" }]}
        path="/countries"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {counts.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <h2 className="font-bold text-[#111827]">{c.label}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {c.total > 0 ? `${c.total} article${c.total === 1 ? "" : "s"} tagged to this market` : "Market overview"}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mb-4">Topics</h2>
      <ul className="space-y-2 mb-10">
        {TOPICS.map((t) => (
          <li key={t.slug}>
            <Link href={`/topics/${t.slug}`} className="text-[#409824] hover:underline font-medium">{t.title}</Link>
            <span className="text-sm text-gray-500"> - {t.description}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold text-[#111827] mb-4">Reference</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/regulators" className="text-[#409824] hover:underline font-medium">Regulators directory</Link>
          <span className="text-sm text-gray-500"> - official websites of gambling regulators and lottery bodies.</span>
        </li>
        <li>
          <Link href="/news/regulation" className="text-[#409824] hover:underline font-medium">Regulation Watch</Link>
          <span className="text-sm text-gray-500"> - all of our regulation news.</span>
        </li>
      </ul>
    </div>
  )
}
