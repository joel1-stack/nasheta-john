"use client"

import { useEffect } from "react"

export default function ContentProtection() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey && (e.key === "c" || e.key === "C") ||
        e.ctrlKey && (e.key === "u" || e.key === "U") ||
        e.ctrlKey && (e.key === "s" || e.key === "S") ||
        e.ctrlKey && (e.key === "p" || e.key === "P") ||
        e.ctrlKey && (e.key === "a" || e.key === "A") ||
        e.metaKey && (e.key === "c" || e.key === "C") ||
        e.metaKey && (e.key === "u" || e.key === "U") ||
        e.metaKey && (e.key === "s" || e.key === "S") ||
        e.metaKey && (e.key === "p" || e.key === "P") ||
        e.metaKey && (e.key === "a" || e.key === "A") ||
        e.key === "F12" ||
        e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i") ||
        e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j") ||
        e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")
      ) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return null
}
