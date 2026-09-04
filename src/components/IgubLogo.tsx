export function IgubLogo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: { w: 32, h: 28, text: 10 }, md: { w: 40, h: 34, text: 13 }, lg: { w: 56, h: 48, text: 18 } }
  const s = sizes[size]

  return (
    <svg viewBox="0 0 120 50" width={s.w * 2.4} height={s.h * 1.4} className={className} xmlns="http://www.w3.org/2000/svg">
      {/* African continent silhouette */}
      <g transform="translate(2, 2) scale(0.38)">
        <path
          d="M60 0 C55 2 50 5 48 8 C42 14 38 18 35 22 C30 28 26 36 24 42 C22 48 20 56 19 62 C18 68 18 74 20 80 C22 86 25 92 28 96 C30 99 32 102 32 106 C32 110 30 114 28 118 C26 122 24 128 24 134 C24 140 26 146 28 150 C30 154 32 158 32 162 C32 166 30 170 28 174 C26 178 26 182 28 186 C30 190 34 194 38 196 C42 198 46 198 50 196 C54 194 58 190 60 186 C62 182 64 178 66 174 C68 170 68 166 66 162 C64 158 60 154 58 150 C56 146 54 140 54 134 C54 128 56 122 58 118 C60 114 62 110 62 106 C62 102 64 98 66 94 C70 88 74 82 76 76 C78 70 80 64 80 58 C80 52 78 46 76 40 C74 34 70 28 66 22 C64 18 62 14 60 10 C58 6 58 2 60 0 Z"
          fill="currentColor"
          opacity="0.9"
        />
        {/* Madagascar */}
        <ellipse cx="82" cy="160" rx="4" ry="10" fill="currentColor" opacity="0.7" transform="rotate(15 82 160)" />
      </g>
      {/* iGUB text */}
      <text x="52" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="22" fill="currentColor" letterSpacing="-0.5">
        iGUB
      </text>
    </svg>
  )
}

export function IgubFullLogo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const textColor = dark ? "#111827" : "#FCFBFB"
  const accentColor = "#409824"

  return (
    <svg viewBox="0 0 120 50" width="90" height="38" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* African continent */}
      <g transform="translate(2, 6) scale(0.28)">
        <path
          d="M60 0 C55 2 50 5 48 8 C42 14 38 18 35 22 C30 28 26 36 24 42 C22 48 20 56 19 62 C18 68 18 74 20 80 C22 86 25 92 28 96 C30 99 32 102 32 106 C32 110 30 114 28 118 C26 122 24 128 24 134 C24 140 26 146 28 150 C30 154 32 158 32 162 C32 166 30 170 28 174 C26 178 26 182 28 186 C30 190 34 194 38 196 C42 198 46 198 50 196 C54 194 58 190 60 186 C62 182 64 178 66 174 C68 170 68 166 66 162 C64 158 60 154 58 150 C56 146 54 140 54 134 C54 128 56 122 58 118 C60 114 62 110 62 106 C62 102 64 98 66 94 C70 88 74 82 76 76 C78 70 80 64 80 58 C80 52 78 46 76 40 C74 34 70 28 66 22 C64 18 62 14 60 10 C58 6 58 2 60 0 Z"
          fill={accentColor}
          opacity="0.9"
        />
        <ellipse cx="82" cy="160" rx="4" ry="10" fill={accentColor} opacity="0.7" transform="rotate(15 82 160)" />
      </g>
      {/* iGUB text */}
      <text x="24" y="35" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="26" fill={textColor} letterSpacing="-0.5">
        iGUB
      </text>
    </svg>
  )
}

export function AfricaMapIcon({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 120" width={size} height={size * 1.2} className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 0 C45 2 40 5 38 8 C32 14 28 18 25 22 C20 28 16 36 14 42 C12 48 10 56 9 62 C8 68 8 74 10 80 C12 86 15 92 18 96 C20 99 22 102 22 106 C22 110 20 114 18 118 C16 122 14 128 14 134 C14 140 16 146 18 150 C20 154 22 158 22 162 C22 166 20 170 18 174 C16 178 16 182 18 186 C20 190 24 194 28 196 C32 198 36 198 40 196 C44 194 48 190 50 186 C52 182 54 178 56 174 C58 170 58 166 56 162 C54 158 50 154 48 150 C46 146 44 140 44 134 C44 128 46 122 48 118 C50 114 52 110 52 106 C52 102 54 98 56 94 C60 88 64 82 66 76 C68 70 70 64 70 58 C70 52 68 46 66 40 C64 34 60 28 56 22 C54 18 52 14 50 10 C48 6 48 2 50 0 Z"
        fill="currentColor"
      />
      <ellipse cx="72" cy="160" rx="4" ry="10" fill="currentColor" opacity="0.7" transform="rotate(15 72 160)" />
    </svg>
  )
}

export function AfricaWatermark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path
        d="M100 0 C90 4 80 10 76 16 C64 28 56 36 50 44 C40 56 32 72 28 84 C24 96 20 112 18 124 C16 136 16 148 20 160 C24 172 30 184 36 192 C40 198 44 204 44 212 C44 220 40 228 36 236 C32 244 28 256 28 268 C28 280 32 292 36 300 C40 308 44 316 44 324 C44 332 40 340 36 348 C32 356 32 364 36 372 C40 380 48 388 56 392 C64 396 72 396 80 392 C88 388 96 380 100 372 C104 364 108 356 112 348 C116 340 116 332 112 324 C108 316 100 308 96 300 C92 292 88 280 88 268 C88 256 92 244 96 236 C100 228 104 220 104 212 C104 204 108 196 112 188 C120 176 128 164 132 152 C136 140 140 128 140 116 C140 104 136 92 132 80 C128 68 120 56 112 44 C108 36 104 28 100 20 C96 12 96 4 100 0 Z"
        fill="currentColor"
      />
      <ellipse cx="144" cy="320" rx="8" ry="20" fill="currentColor" opacity="0.6" transform="rotate(15 144 320)" />
    </svg>
  )
}
