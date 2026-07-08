interface Props {
  position?: "top" | "bottom"
  color?: string
  flip?: boolean
}

export default function WaveSeparator({ position = "bottom", color = "#ffffff", flip }: Props) {
  return (
    <div className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 w-full z-20 pointer-events-none`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`w-full h-auto ${flip ? "rotate-180" : ""}`}>
        <path
          d="M0,60 C240,120 480,0 720,50 C960,100 1200,20 1440,60 L1440,0 L0,0 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
