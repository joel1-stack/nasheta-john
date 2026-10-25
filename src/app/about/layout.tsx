import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "About | iGamingUbuntu",
  description:
    "Who writes iGamingUbuntu, how we research African betting and casino markets, and the editorial standards behind every article.",
  path: "/about",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
