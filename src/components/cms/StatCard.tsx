// Pages still pass the old theme colours; show them in the brand palette.
const PALETTE: Record<string, string> = {
  "#E95420": "#3B8F7B",
  "#409824": "#A7F432",
  "#772953": "#173D33",
  "#FFD700": "#E2B93B",
  "#f59e0b": "#E2B93B",
}

/** Dashboard number tile: white raised card with a coloured accent bar. */
export default function StatCard({
  title,
  value,
  color,
  hint,
}: {
  title: string
  value: string | number
  color: string
  hint?: string
}) {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-[#E1EAE0] p-5 shadow-[0_1px_2px_rgba(15,31,22,0.05),0_10px_30px_-12px_rgba(15,31,22,0.18)]">
      <span className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full" style={{ background: PALETTE[color] || color }} aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wider text-[#5F7068] mb-2">{title}</p>
      <p className="text-3xl font-extrabold text-[#0F1F16] tracking-tight">{value}</p>
      {hint ? <p className="text-xs text-[#8A9A92] mt-1">{hint}</p> : null}
    </div>
  )
}
