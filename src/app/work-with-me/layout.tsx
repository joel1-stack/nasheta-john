import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Work With Nasheta John, iGaming Writer and Editor | iGamingUbuntu",
  description:
    "Hire an experienced iGaming writer and editor for casino reviews, betting guides, news and SEO landing pages.",
  path: "/work-with-me",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
