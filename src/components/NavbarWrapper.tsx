"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import BlogNavbar from "./BlogNavbar"

const blogPaths = ["/blog", "/news", "/sports", "/casinos", "/events", "/press", "/the-desk", "/guides", "/reviews"]

export default function NavbarWrapper() {
  const pathname = usePathname()
  const isBlogPath = blogPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))
  return isBlogPath ? <BlogNavbar /> : <Navbar />
}
