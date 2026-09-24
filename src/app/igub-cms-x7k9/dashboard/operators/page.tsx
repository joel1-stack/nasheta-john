"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getOperators, deleteOperator } from "@/lib/firestoreService"
import StatCard from "@/components/cms/StatCard"
import type { Operator } from "@/types"

export default function OperatorsPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [operators, setOperators] = useState<Operator[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "sportsbook" | "casino" | "both">("all")

  useEffect(() => {
    if (!user) return
    ;(async () => {
      setOperators(await getOperators())
      setLoading(false)
    })()
  }, [user])

  const filtered = operators.filter((o) => {
    if (typeFilter !== "all" && o.type !== typeFilter && o.type !== "both") return false
    if (search && !o.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this operator permanently?")) return
    await deleteOperator(id)
    setOperators((prev) => prev.filter((o) => o.id !== id))
    setDeleteId(null)
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Operators</h1>
          <p className="text-gray-400 mt-1">Sportsbooks and casino brands referenced across the site</p>
        </div>
        <Link
          href="/igub-cms-x7k9/dashboard/operators/new"
          className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 text-sm"
        >
          + Add Operator
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={operators.length} color="#E95420" />
        <StatCard title="Active" value={operators.filter((o) => o.status === "active").length} color="#409824" />
        <StatCard title="Sportsbooks" value={operators.filter((o) => o.type === "sportsbook" || o.type === "both").length} color="#3B82F6" />
        <StatCard title="Casinos" value={operators.filter((o) => o.type === "casino" || o.type === "both").length} color="#772953" />
      </div>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search operators..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50"
          />
          <div className="flex gap-2">
            {(["all", "sportsbook", "casino", "both"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  typeFilter === t ? "bg-[#E95420] text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-medium text-white mb-1">No operators yet</p>
            <p className="text-sm text-gray-400 mb-4">Add operators once — reference them across articles.</p>
            <Link
              href="/igub-cms-x7k9/dashboard/operators/new"
              className="bg-[#E95420] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#CC4A1C] transition inline-block"
            >
              + Add First Operator
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-left text-sm font-semibold text-white">Operator</th>
                  <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">Type</th>
                  <th className="p-4 text-left text-sm font-semibold text-white hidden lg:table-cell">Countries</th>
                  <th className="p-4 text-left text-sm font-semibold text-white">Rating</th>
                  <th className="p-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="p-4 text-left text-sm font-semibold text-white hidden md:table-cell">Last verified</th>
                  <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {o.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={o.logo} alt={o.name} className="w-8 h-8 rounded-lg object-cover bg-white/10" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                            {o.name?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <Link
                            href={`/igub-cms-x7k9/dashboard/operators/edit/${o.id}`}
                            className="font-medium text-white hover:text-[#E95420] transition"
                          >
                            {o.name}
                          </Link>
                          {o.welcomeOffer && (
                            <p className="text-xs text-gray-500 truncate max-w-xs">{o.welcomeOffer}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-300 bg-white/10 px-2.5 py-1 rounded-full capitalize">{o.type}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-400">
                      {(o.countries || []).slice(0, 3).join(", ") || "—"}
                      {(o.countries || []).length > 3 ? ` +${o.countries.length - 3}` : ""}
                    </td>
                    <td className="p-4 text-sm text-[#f59e0b] font-semibold">{o.rating || 0}/5</td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          o.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : o.status === "paused"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-400">{o.lastVerified || "—"}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/igub-cms-x7k9/dashboard/operators/edit/${o.id}`}
                          className="text-sm text-[#f59e0b] hover:text-[#f59e0b]/80 font-medium"
                        >
                          Edit
                        </Link>
                        {deleteId === o.id ? (
                          <div className="flex gap-2">
                            <button onClick={() => handleDelete(o.id)} className="text-sm text-red-400 font-semibold cursor-pointer">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteId(null)} className="text-sm text-gray-400 cursor-pointer">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteId(o.id)}
                            className="text-sm text-red-400 hover:text-red-300 font-medium cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
