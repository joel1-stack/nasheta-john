"use client"

import { useEffect, useRef } from "react"

interface AdSlotProps {
  position: "leaderboard-top" | "sidebar-1" | "sidebar-2" | "in-content-1" | "in-content-2" | "footer-banner"
  className?: string
}

const adConfigs: Record<string, { width: string; height: string; label: string }> = {
  "leaderboard-top": { width: "728px", height: "90px", label: "Advertisement" },
  "sidebar-1": { width: "300px", height: "250px", label: "Advertisement" },
  "sidebar-2": { width: "300px", height: "250px", label: "Advertisement" },
  "in-content-1": { width: "728px", height: "90px", label: "Advertisement" },
  "in-content-2": { width: "728px", height: "90px", label: "Advertisement" },
  "footer-banner": { width: "728px", height: "90px", label: "Advertisement" },
}

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const config = adConfigs[position] || adConfigs["sidebar-1"]

  useEffect(() => {
    // Push ad to Google AdSense if available
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({})
      }
    } catch {}
  }, [])

  return (
    <div className={`ad-container rounded-xl overflow-hidden ${className}`} ref={adRef}>
      {/* Google AdSense - uncomment when you have your AdSense publisher ID */}
      {/* <ins className="adsbygoogle"
        style={{ display: "block", width: config.width, height: config.height }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins> */}

      {/* Placeholder - visible until AdSense is configured */}
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[90px] bg-gradient-to-r from-[#1B2385]/5 to-[#772953]/5 border border-dashed border-white/10 rounded-xl">
        <svg className="w-6 h-6 text-white/20 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-[10px] text-white/20 uppercase tracking-wider">{config.label}</p>
      </div>
    </div>
  )
}
