import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import SectionHeader from "@/components/SectionHeader"
import { DIRECTORY_PAGES, MIN_DIRECTORY_ENTRIES, getDirectoryPage } from "@/lib/directory"
import { staticPageMetadata } from "@/lib/pageMeta"
import { SITE_URL } from "@/lib/site"
import { queryArticles } from "@/lib/serverArticles"
import { articlePath } from "@/lib/navigation"
import { formatDate } from "@/lib/utils"
import { faqPageLd } from "@/lib/structuredData"

export const revalidate = 300

export function generateStaticParams() {
  return DIRECTORY_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = getDirectoryPage(slug)
  if (!page) return {}
  return staticPageMetadata({ title: page.seoTitle, description: page.description, path: `/directory/${page.slug}` })
}

export default async function DirectoryPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getDirectoryPage(slug)
  if (!page || page.entries.length < MIN_DIRECTORY_ENTRIES) notFound()

  const coverage = page.coverage
    ? (await queryArticles({ category: page.coverage.categories, page: 1, perPage: 200 })).articles
    : []

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    description: page.description,
    url: `${SITE_URL}/directory/${page.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.entries.map((e, i) => ({ "@type": "ListItem", position: i + 1, name: e.name, ...(e.website ? { url: e.website } : {}) })),
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-5 pb-16 animate-fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {page.faq && page.faq.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(page.faq.map((f) => ({ question: f.question, answer: f.answer })))) }} />
      )}
      <SectionHeader
        title={page.title}
        description={page.description}
        crumbs={[{ label: "Home", href: "/" }, { label: page.entryLabel }]}
        path={`/directory/${page.slug}`}
      />
      <p className="max-w-3xl text-gray-600 mb-6">{page.intro}</p>
      <ul className="grid gap-4 md:grid-cols-2 mb-8">
        {page.entries.map((e) => (
          <li key={e.name} className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-[#111827] mb-1">{e.name}</h2>
            <p className="text-sm text-gray-600 mb-3">{e.summary}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {e.website && (
                <a href={e.website} target="_blank" rel="noopener noreferrer nofollow" className="text-[#409824] hover:underline">
                  Official website
                </a>
              )}
              {e.ours && (
                <Link href={e.ours.href} className="text-[#409824] hover:underline">{e.ours.label}</Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      {page.coverage && coverage.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#111827] mb-4">{page.coverage.heading}</h2>
          <ul className="divide-y divide-gray-200 bg-white rounded-xl border border-gray-200">
            {coverage.map((a) => (
              <li key={a.slug} className="p-4">
                <Link href={articlePath(a)} className="font-medium text-[#111827] hover:text-[#409824]">{a.title}</Link>
                <p className="text-xs text-gray-500 mt-1">{formatDate(a.createdAt)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {page.faq && page.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#111827] mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {page.faq.map((f) => (
              <div key={f.question} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-[#111827] mb-1.5">{f.question}</h3>
                <p className="text-sm text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <p className="text-xs text-gray-500 max-w-3xl">
        Editorial listing, last checked 6 November 2026. Inclusion is not an endorsement, a rating or a paid placement, and no company has paid to appear here.
        Descriptions summarise what each company says about itself. Spotted an error or a company we should add?{" "}
        <Link href="/contact" className="text-[#409824] hover:underline">Tell us</Link>.
      </p>
    </div>
  )
}
