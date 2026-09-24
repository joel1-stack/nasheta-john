import Link from "next/link"

interface Crumb {
  label: string
  href?: string
}

interface SectionHeaderProps {
  title: string
  description?: string
  crumbs?: Crumb[]
  count?: number
}

export default function SectionHeader({ title, description, crumbs, count }: SectionHeaderProps) {
  const items: Crumb[] = crumbs && crumbs.length > 0 ? crumbs : [{ label: "Home", href: "/" }, { label: title }]

  return (
    <div className="border-b border-gray-200/60 bg-white -mx-4 sm:-mx-5 px-4 sm:px-5 pt-6 pb-5 mb-6">
      <nav className="text-[13px] text-[#6B7280] mb-3 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
        {items.map((c, i) => (
          <span key={`${c.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-300" aria-hidden="true">&rsaquo;</span>}
            {c.href ? (
              <Link href={c.href} className="hover:text-[#1A1F2B] transition">{c.label}</Link>
            ) : (
              <span className="text-[#1A1F2B] font-medium">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[22px] sm:text-[28px] font-bold text-[#111827] tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">{description}</p>
          )}
        </div>
        {typeof count === "number" && count > 0 && (
          <p className="text-xs text-gray-400 shrink-0">{count} articles</p>
        )}
      </div>
    </div>
  )
}
