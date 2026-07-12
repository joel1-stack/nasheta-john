"use client"

import { useState, useEffect, useRef } from "react"

interface LetterRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
  highlight?: string
  highlightClassName?: string
}

export default function LetterReveal({
  text,
  className = "",
  delay = 300,
  stagger = 40,
  as: Tag = "h1",
  highlight,
  highlightClassName = "text-[#409824]",
}: LetterRevealProps) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  if (!highlight) {
    const letters = text.split("")
    return (
      <Tag className={className}>
        <span ref={ref} className="inline">
          {letters.map((char, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300 ease-out"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
                transitionDelay: `${i * stagger}ms`,
                filter: started ? "blur(0)" : "blur(4px)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </Tag>
    )
  }

  const parts = text.split(highlight)
  const lettersBefore = parts[0].split("")
  const lettersHighlight = highlight.split("")
  const lettersAfter = (parts[1] || "").split("")

  return (
    <Tag className={className}>
      <span ref={ref} className="inline">
        {lettersBefore.map((char, i) => (
          <span
            key={`b${i}`}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
              transitionDelay: `${i * stagger}ms`,
              filter: started ? "blur(0)" : "blur(4px)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {lettersHighlight.map((char, i) => (
          <span
            key={`h${i}`}
            className={`inline-block transition-all duration-300 ease-out ${highlightClassName}`}
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
              transitionDelay: `${(lettersBefore.length + i) * stagger}ms`,
              filter: started ? "blur(0)" : "blur(4px)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {lettersAfter.map((char, i) => (
          <span
            key={`a${i}`}
            className="inline-block transition-all duration-300 ease-out"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
              transitionDelay: `${(lettersBefore.length + lettersHighlight.length + i) * stagger}ms`,
              filter: started ? "blur(0)" : "blur(4px)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </Tag>
  )
}
