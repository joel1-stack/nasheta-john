import Link from "next/link"
import type { Country } from "@/types"

interface CountryCardProps {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/${country.slug}`} className="block bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-ubuntu-orange/30 transition group">
      <div className="text-4xl mb-3">{country.flag}</div>
      <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition mb-1">{country.name}</h3>
      <p className="text-sm text-text-secondary line-clamp-2">{country.description}</p>
      <p className="text-xs text-text-muted mt-3">{country.articleCount} articles</p>
    </Link>
  )
}
