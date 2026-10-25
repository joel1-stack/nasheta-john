import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "iGaming Link Building and Sponsored Placements | iGamingUbuntu",
  description:
    "Editorial placements and outreach for betting and casino brands, with clearly labelled sponsored links on relevant iGaming news sites.",
  path: "/link-building-services",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
