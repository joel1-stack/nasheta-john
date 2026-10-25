import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Affiliate Disclosure | iGamingUbuntu",
  description:
    "How iGamingUbuntu uses affiliate links, which operators we work with, and how affiliate relationships are kept separate from editorial.",
  path: "/affiliate-disclosure",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
