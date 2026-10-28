"use client"

import { useState } from "react"
import type { IconType } from "react-icons"
import { FaEnvelope, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { FiCheck, FiLink } from "react-icons/fi"

interface Network {
  label: string
  icon: IconType
  color: string
  href: string
}

function networks(title: string, url: string): Network[] {
  const t = encodeURIComponent(title)
  const u = encodeURIComponent(url)
  return [
    { label: "WhatsApp", icon: FaWhatsapp, color: "#25D366", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { label: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", icon: FaXTwitter, color: "#0F1419", href: `https://x.com/intent/tweet?text=${t}&url=${u}` },
    { label: "Facebook", icon: FaFacebookF, color: "#1877F2", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "Email", icon: FaEnvelope, color: "#3B8F7B", href: `mailto:?subject=${t}&body=${u}` },
  ]
}

/** Round button that fills with the network's colour on hover. */
const roundButton =
  "group relative w-10 h-10 rounded-full bg-white border border-[#E1EAE0] text-[#173D33] flex items-center justify-center " +
  "shadow-[0_1px_2px_rgba(15,31,22,0.06),0_4px_12px_-6px_rgba(15,31,22,0.25)] transition-all duration-200 " +
  "hover:-translate-y-0.5 hover:text-white hover:border-transparent hover:bg-[var(--net)] hover:shadow-[0_10px_20px_-8px_var(--net)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B8F7B]/50"

function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {}
      }}
      className={roundButton}
      style={{ ["--net" as string]: "#0F1F16" }}
      aria-label={copied ? "Link copied" : "Copy link"}
      title={copied ? "Link copied" : "Copy link"}
    >
      {copied ? <FiCheck size={16} /> : <FiLink size={16} />}
    </button>
  )
}

/**
 * Share controls. "inline" sits under the headline; "card" is the
 * end-of-article panel with a short prompt.
 */
export default function ShareButtons({ title, url, variant = "inline" }: { title: string; url: string; variant?: "inline" | "card" }) {
  const list = networks(title, url)
  const buttons = (
    <div className="flex items-center gap-2">
      {list.map(({ label, icon: Icon, color, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          className={roundButton}
          style={{ ["--net" as string]: color }}
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
        >
          <Icon size={15} />
        </a>
      ))}
      <CopyLink url={url} />
    </div>
  )

  if (variant === "card") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-[#E1EAE0] bg-gradient-to-br from-[#F3F8F1] to-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#A7F432]/15" aria-hidden="true" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2C6E5E]">Share this story</p>
          <p className="text-sm text-[#33433B] mt-1">Know someone in the industry who should read this?</p>
        </div>
        <div className="relative">{buttons}</div>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-[#F3F8F1] border border-[#E1EAE0] pl-4 pr-1.5 py-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2C6E5E]">Share</span>
      {buttons}
    </div>
  )
}
