import Link from "next/link"
import type { Metadata } from "next"
import SectionHeader from "@/components/SectionHeader"
import { searchArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"
import { formatDate } from "@/lib/utils"

// Search result pages are thin by design: keep them out of the index.
export const metadata: Metadata = {
  title: "Search iGamingUbuntu",
  robots: { index: false, follow: true },
}

export const dynamic = "force-dynamic"

const SUGGESTIONS = ["Kenya", "Nigeria", "South Africa", "Ghana", "licence", "tax", "M-Pesa"]

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q || "").trim().slice(0, 80)
  const hits = q.length >= 2 ? await searchArticles(q, 60) : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <SectionHeader title="Search" description="Search news, regulation and markets." crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <form action="/search" method="get" role="search" className="flex gap-2 mb-8">
        <input
          name="q"
          defaultValue={q}
          type="search"
          aria-label="Search articles"
          placeholder="Search news, regulation, markets..."
          className="flex-1 h-12 rounded-lg border border-gray-300 px-4 text-base"
        />
        <button type="submit" className="h-12 px-5 rounded-lg bg-[#0F1F16] text-white font-medium">Search</button>
      </form>

      {q.length === 0 && (
        <div>
          <p className="text-gray-600 mb-3">Type a country, regulator or topic. Or try:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((t) => (
              <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="text-sm bg-[#EEF4EC] text-[#173D33] px-3 py-1.5 rounded-full hover:bg-[#A7F432]/40">{t}</Link>
            ))}
          </div>
        </div>
      )}

      {q.length === 1 && <p className="text-gray-600">Type at least two characters.</p>}

      {q.length >= 2 && hits.length === 0 && (
        <div>
          <p className="text-gray-700 mb-3">No stories match &ldquo;{q}&rdquo;. Check the spelling, or browse by section:</p>
          <ul className="list-disc pl-5 space-y-1 text-[#409824]">
            <li><Link href="/news/regulation" className="hover:underline">Regulation Watch</Link></li>
            <li><Link href="/news/industry" className="hover:underline">Industry News</Link></li>
            <li><Link href="/countries" className="hover:underline">Country guides</Link></li>
            <li><Link href="/regulators" className="hover:underline">Regulators directory</Link></li>
          </ul>
        </div>
      )}

      {hits.length > 0 && (
        <>
          <p className="text-sm text-gray-500 mb-4">{hits.length}{hits.length === 60 ? "+" : ""} result{hits.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;</p>
          <ul className="divide-y divide-gray-200">
            {hits.map(({ article: a }) => (
              <li key={a.slug} className="py-4">
                <Link href={articlePath(a)} className="font-semibold text-[#111827] hover:text-[#409824]">{a.title}</Link>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-[#2C6E5E] font-medium">{a.category}</span> · {formatDate(a.createdAt)}
                </p>
                {a.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{a.excerpt}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
