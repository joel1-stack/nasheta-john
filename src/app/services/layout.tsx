import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "iGaming Content, SEO and Link Building Services | iGamingUbuntu",
  description:
    "iGaming SEO content, editing, translation and link building for betting, casino and affiliate brands in Africa and global markets.",
  path: "/services",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
