"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

/** One footer on every public page; none in the CMS. */
export default function FooterWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith("/igub-cms-x7k9")) return null
  return <Footer />
}
