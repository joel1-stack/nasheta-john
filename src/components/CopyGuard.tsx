"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Discourages copying our articles on public pages: text cannot be
 * selected, and a copy (Ctrl+C, menu) puts a link to the page on the
 * clipboard instead of our text. Links still work normally, including the
 * right-click menu (open in new tab, copy link address). Form fields and
 * the CMS are not affected. This stops casual copying only; nothing on the
 * web can stop someone determined (screenshots, page source).
 */
export default function CopyGuard() {
  const pathname = usePathname()
  const active = !pathname.startsWith("/igub-cms-x7k9")

  useEffect(() => {
    if (!active) return
    document.body.classList.add("protect-copy")

    const isEditable = (node: EventTarget | null) =>
      node instanceof HTMLElement && !!node.closest("input, textarea, select, [contenteditable='true']")

    const onCopy = (e: ClipboardEvent) => {
      if (isEditable(e.target) || isEditable(document.activeElement)) return
      e.preventDefault()
      e.clipboardData?.setData("text/plain", `Read this on iGamingUbuntu: ${window.location.href}`)
    }

    document.addEventListener("copy", onCopy)
    document.addEventListener("cut", onCopy)
    return () => {
      document.body.classList.remove("protect-copy")
      document.removeEventListener("copy", onCopy)
      document.removeEventListener("cut", onCopy)
    }
  }, [active])

  return null
}
