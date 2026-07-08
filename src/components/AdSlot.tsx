interface AdSlotProps {
  position: "leaderboard-top" | "sidebar-1" | "sidebar-2" | "in-content-1" | "in-content-2" | "footer-banner"
  className?: string
}

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const sizes: Record<string, string> = {
    "leaderboard-top": "w-full min-h-[90px]",
    "sidebar-1": "w-full min-h-[250px]",
    "sidebar-2": "w-full min-h-[250px]",
    "in-content-1": "w-full min-h-[90px]",
    "in-content-2": "w-full min-h-[90px]",
    "footer-banner": "w-full min-h-[90px]",
  }

  const labels: Record<string, string> = {
    "leaderboard-top": "Leaderboard Ad",
    "sidebar-1": "Sidebar Ad",
    "sidebar-2": "Sidebar Ad",
    "in-content-1": "In-Content Ad",
    "in-content-2": "In-Content Ad",
    "footer-banner": "Footer Ad",
  }

  return (
    <div className={`ad-container ${sizes[position]} ${className}`}>
      <span className="text-xs text-text-muted uppercase tracking-wider">{labels[position]}</span>
    </div>
  )
}
