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
  kenya: "/images/full backgound.png",
  nigeria: "/images/Green Data Network (ABSTRACT + TECH).png",
  "south-africa": "/images/sports betting analytics.png",
  ghana: "/images/full backgound.png",
  tanzania: "/images/Green Data Network (ABSTRACT + TECH).png",
}

export default function CountryCard({ country }: CountryCardProps) {
  const img = countryImages[country.slug] || "/images/full backgound.png"

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
