import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Global Markets | iGamingUbuntu",
  description:
    "iGaming content for UK, US, Canadian and European markets, including UKGC compliance, state-by-state regulation and localisation.",
  path: "/global",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
