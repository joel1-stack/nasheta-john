import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Contact the iGamingUbuntu Editorial Desk",
  description:
    "Contact the iGamingUbuntu editorial desk about content, corrections, advertising or partnership enquiries.",
  path: "/contact",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
