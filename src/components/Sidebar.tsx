import AdSlot from "./AdSlot"
import Newsletter from "./Newsletter"
import Link from "next/link"
import Image from "next/image"
import { MOST_READ_MIN_ARTICLES, SHOW_MOST_READ } from "@/lib/site"
import type { Article } from "@/types"

interface SidebarProps {
  popularPosts?: Article[]
}

function getFlagUrl(slug: string): string {
  const map: Record<string, string> = {
    kenya: "ke", nigeria: "ng", "south-africa": "za",
    ghana: "gh", tanzania: "tz",
  }
  return `https://flagcdn.com/20x15/${map[slug] || slug}.png`
}

const categories = [
  { name: "Kenya", slug: "kenya" },
  { name: "Nigeria", slug: "nigeria" },
  { name: "South Africa", slug: "south-africa" },
  { name: "Ghana", slug: "ghana" },
  { name: "Tanzania", slug: "tanzania" },
  { name: "Casino Reviews", slug: "reviews" },
  { name: "Sports Betting", slug: "blog" },
  { name: "Tips & Guides", slug: "guides" },
]

export default function Sidebar({ popularPosts }: SidebarProps) {
  // Developer-placeholder offer boxes are hidden until real, active campaigns
  // from the CMS "Affiliate Links" section exist (see AffiliateBanner).

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <AdSlot position="sidebar-1" />

      {/* "Most Read" is disabled until there is a real readership: the previous
          version listed sample articles with invented view counts. When
          SHOW_MOST_READ is enabled it only appears with real tracked views for
          at least MOST_READ_MIN_ARTICLES articles. */}
      {SHOW_MOST_READ && popularPosts && popularPosts.length >= MOST_READ_MIN_ARTICLES && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-fade-up shadow-sm">
          <div className="flex items-center justify-between mb-4 border-l-4 border-[#22C55E] pl-3">
            <h3 className="font-bold text-[#1A1F2B] text-sm uppercase tracking-wide">Most Read</h3>
            <Link href="/blog" className="text-xs text-[#22C55E] font-medium hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {popularPosts.slice(0, 5).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group items-start">
                <span className="text-[#F59E0B] font-extrabold text-xl w-8 shrink-0 leading-none pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    width={80}
                    height={60}
                    loading="lazy"
                    className="w-20 h-[60px] rounded-md object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-[#1A1F2B] group-hover:text-[#22C55E] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] mt-1.5">
                    <span>{post.views.toLocaleString()} views</span>
                    <span>· {post.readTime || 3} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdSlot position="sidebar-2" />

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <h3 className="font-bold text-[#111827] mb-4 pb-3 border-b border-gray-100">Explore</h3>
        <div className="grid grid-cols-1 gap-1">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#111827] hover:bg-gray-50 px-3 py-2 rounded-lg transition-all">
              {["kenya", "nigeria", "south-africa", "ghana", "tanzania"].includes(cat.slug) ? (
                <Image src={getFlagUrl(cat.slug)} alt={cat.name} width={20} height={15} loading="lazy" className="w-5 h-3.5 rounded object-cover" />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-xs bg-amber-50 text-[#f59e0b] rounded">◆</span>
              )}
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <Newsletter />
    </aside>
  )
}
