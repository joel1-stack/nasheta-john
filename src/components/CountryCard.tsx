import Link from "next/link"
import type { Country } from "@/types"

interface CountryCardProps {
  country: Country
}

function getFlagUrl(slug: string): string {
  const map: Record<string, string> = {
    kenya: "ke", nigeria: "ng", "south-africa": "za",
    ghana: "gh", tanzania: "tz", uganda: "ug",
  }
  return `https://flagcdn.com/32x24/${map[slug] || slug}.png`
}

const countryImages: Record<string, string> = {
  kenya: "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&q=80",
  nigeria: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
  "south-africa": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80",
  ghana: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
  tanzania: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&q=80",
}

export default function CountryCard({ country }: CountryCardProps) {
  const img = countryImages[country.slug] || "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=600&q=80"

  return (
    <Link href={`/${country.slug}`} className="group block bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={img} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
      </div>
      <div className="p-5">
        <img src={getFlagUrl(country.slug)} alt={country.name} className="w-8 h-6 rounded shadow-sm mb-2 object-cover" />
        <h3 className="font-bold text-text-primary group-hover:text-ubuntu-orange transition-colors mb-1">{country.name}</h3>
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{country.description}</p>
        <p className="text-xs text-ubuntu-orange font-medium mt-3 group-hover:translate-x-1 transition-transform">
          {country.articleCount} articles →
        </p>
      </div>
    </Link>
  )
}
