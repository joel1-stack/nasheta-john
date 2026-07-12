"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"

const blogPaths = ["/blog", "/news", "/sports", "/casinos", "/events", "/press", "/the-desk", "/guides", "/reviews"]

export default function FooterWrapper() {
  const pathname = usePathname()
  const isBlogPath = blogPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))
  return <Footer hideNav={isBlogPath} />
}
