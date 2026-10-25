import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "iGaming SEO Content Writing for Casinos and Sportsbooks | iGamingUbuntu",
  description:
    "Casino reviews, betting guides, bonus pages and affiliate landing pages written to rank on Google and convert readers into players.",
  path: "/seo-content-writing",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
