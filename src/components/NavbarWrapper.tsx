"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

/** One menu on every public page; the CMS has its own sidebar. */
export default function NavbarWrapper() {
  const pathname = usePathname()
  if (pathname.startsWith("/igub-cms-x7k9")) return null
  return <Navbar />
}
