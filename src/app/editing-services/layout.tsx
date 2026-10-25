import type { Metadata } from "next"
import { staticPageMetadata } from "@/lib/pageMeta"

export const metadata: Metadata = staticPageMetadata({
  title: "iGaming Editing and Content Audits | iGamingUbuntu",
  description:
    "Editing, fact-checking and compliance-aware rewrites for casino, betting and affiliate content across African and global markets.",
  path: "/editing-services",
})
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
