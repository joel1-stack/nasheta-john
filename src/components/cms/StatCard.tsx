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
    <div className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-5">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white" style={{ color }}>
        {value}
      </p>
      {hint ? <p className="text-xs text-gray-500 mt-1">{hint}</p> : null}
    </div>
  )
}
