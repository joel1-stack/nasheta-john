import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "Privacy Policy | iGamingUbuntu",
  description:
    "How iGamingUbuntu collects, uses and protects your data, including cookies, analytics and newsletter subscriptions.",
  path: "/privacy",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
