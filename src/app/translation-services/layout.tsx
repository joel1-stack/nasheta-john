import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "iGaming Translation and Localisation | iGamingUbuntu",
  description:
    "Localised casino and betting content for African and international markets, adapted for local payments, rules and search terms.",
  path: "/translation-services",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
