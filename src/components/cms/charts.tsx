/**
 * Small dependency-free SVG charts for the CMS, in the brand palette.
 * They render on the client inside CMS pages; every bar/slice has a <title>
 * so hovering shows the exact value.
 */

export const CHART_COLORS = ["#3B8F7B", "#A7F432", "#173D33", "#7FC8B5", "#E2B93B", "#C9E9A0", "#2C6E5E", "#94A39B"]

const INK = "#0F1F16"
const MUTED = "#8A9A92"
const GRID = "#E1EAE0"

/** Circular score gauge, 0–100. */
export function Gauge({ value, label, size = 180 }: { value: number; label?: string; size?: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  const stroke = 14
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const color = v >= 80 ? "#3B8F7B" : v >= 60 ? "#E2B93B" : "#C2410C"
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label || "Score"}: ${v} out of 100`}>
      <defs>
        <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A7F432" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={GRID} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#gauge-grad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(v / 100) * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="48%" textAnchor="middle" fontSize={size * 0.24} fontWeight={800} fill={INK}>
        {v}
      </text>
      {label && (
        <text x="50%" y="64%" textAnchor="middle" fontSize={12} fill={MUTED}>
          {label}
        </text>
      )}
    </svg>
  )
}

/** Vertical bar chart with value labels on top. */
export function BarChart({
  data,
  height = 200,
  color = "#3B8F7B",
  highlightLast = true,
}: {
  data: { label: string; value: number }[]
  height?: number
  color?: string
  highlightLast?: boolean
}) {
  const max = Math.max(1, ...data.map((d) => d.value))
  const w = 100 / Math.max(1, data.length)
  const top = 18
  const bottom = 22
  const plot = height - top - bottom
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }} role="img">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1="0" x2="100" y1={top + plot * (1 - f)} y2={top + plot * (1 - f)} stroke={GRID} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * plot
        const x = i * w + w * 0.2
        const last = highlightLast && i === data.length - 1
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${d.value}`}</title>
            <rect x={x} y={top + plot - h} width={w * 0.6} height={Math.max(h, 0.8)} rx="1" fill={last ? "#A7F432" : color} />
          </g>
        )
      })}
    </svg>
  )
}

/** Labels row for BarChart (HTML, so text is not stretched by the SVG). */
export function BarLabels({ labels }: { labels: string[] }) {
  return (
    <div className="flex mt-1">
      {labels.map((l, i) => (
        <span key={`${l}-${i}`} className="flex-1 text-center text-[10px] text-[#8A9A92] truncate">
          {l}
        </span>
      ))}
    </div>
  )
}

/** Donut chart with a centre total and a legend. */
export function Donut({
  data,
  size = 170,
  centerLabel = "Total",
}: {
  data: { label: string; value: number; color?: string }[]
  size?: number
  centerLabel?: string
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const stroke = 26
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${centerLabel}: ${total}`} className="shrink-0">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={GRID} strokeWidth={stroke} />
        {total > 0 &&
          data.map((d, i) => {
            const len = (d.value / total) * c
            const el = (
              <circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color || CHART_COLORS[i % CHART_COLORS.length]}
                strokeWidth={stroke}
                strokeDasharray={`${len} ${c - len}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              >
                <title>{`${d.label}: ${d.value}`}</title>
              </circle>
            )
            offset += len
            return el
          })}
        <text x="50%" y="47%" textAnchor="middle" fontSize={size * 0.18} fontWeight={800} fill={INK}>
          {total}
        </text>
        <text x="50%" y="61%" textAnchor="middle" fontSize={11} fill={MUTED}>
          {centerLabel}
        </text>
      </svg>
      <ul className="space-y-1.5 text-sm w-full">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color || CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className="text-[#33433B] truncate">{d.label}</span>
            <span className="ml-auto font-semibold text-[#0F1F16]">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Horizontal bars with labels and counts (issue breakdowns, rankings). */
export function HBars({
  data,
  color = "#3B8F7B",
  max: forcedMax,
}: {
  data: { label: string; value: number; href?: string; color?: string }[]
  color?: string
  max?: number
}) {
  const max = forcedMax || Math.max(1, ...data.map((d) => d.value))
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.label}>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-[#33433B]">{d.label}</span>
            <span className="font-semibold text-[#0F1F16]">{d.value}</span>
          </div>
          <div className="h-2 rounded-full bg-[#EEF4EC] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(d.value / max) * 100}%`, background: d.color || color }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Card shell used by chart panels. */
export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`bg-white rounded-2xl border border-[#E1EAE0] p-6 shadow-[0_1px_2px_rgba(15,31,22,0.05),0_10px_30px_-12px_rgba(15,31,22,0.18)] ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="font-bold text-[#0F1F16]">{title}</h2>
          {subtitle && <p className="text-xs text-[#8A9A92] mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
