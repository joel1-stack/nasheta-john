import Link from "next/link"
import { breadcrumbLd } from "@/lib/structuredData"

export interface Crumb {
  label: string
  href: string
}

/**
 * Visible breadcrumb plus matching BreadcrumbList JSON-LD. `current` is the
 * page itself; every other crumb must be a real page.
 */
export default function Breadcrumbs({ trail, current, path }: { trail: Crumb[]; current: string; path: string }) {
  const ld = breadcrumbLd([...trail.map((c) => ({ name: c.label, path: c.href })), { name: current, path }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav aria-label="Breadcrumb" className="text-[13px] text-[#6B7280] mb-4 flex items-center gap-2 flex-wrap">
        {trail.map((c) => (
          <span key={c.href} className="flex items-center gap-2">
            <Link href={c.href} className="hover:text-[#1A1F2B] transition">{c.label}</Link>
            <span className="text-gray-300" aria-hidden="true">&rsaquo;</span>
          </span>
        ))}
        <span className="text-[#1A1F2B] font-medium">{current}</span>
      </nav>
    </>
  )
}
