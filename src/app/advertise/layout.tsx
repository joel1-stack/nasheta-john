import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Advertise With iGamingUbuntu: Sponsored Articles and Banners",
  description:
    "Reach operators, affiliates and suppliers in African iGaming with sponsored articles, press releases, banner placements and newsletter slots.",
  path: "/advertise",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
