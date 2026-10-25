import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Terms of Service | iGamingUbuntu",
  description:
    "The terms that apply to reading and using iGamingUbuntu, including content usage, affiliate links and responsible gambling.",
  path: "/terms",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
