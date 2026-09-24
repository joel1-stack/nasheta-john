"use client"

import { FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { getCategories, createCategory, updateCategory, deleteCategory, getArticles } from "@/lib/firestoreService"
import type { Category } from "@/types"

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 transition"

export default function CategoriesPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const [cats, arts] = await Promise.all([getCategories(), getArticles()])
      const c: Record<string, number> = {}
      arts.forEach((a) => {
        if (a.category) c[a.category] = (c[a.category] || 0) + 1
      })
      setCounts(c)
      setCategories(cats)
      setLoading(false)
    })()
  }, [user])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      if (editId) {
        await updateCategory(editId, { name: name.trim(), slug, description })
        setCategories((prev) => prev.map((c) => (c.id === editId ? { ...c, name: name.trim(), slug, description } : c)))
      } else {
        const id = await createCategory({ name: name.trim(), slug, description })
        if (id) setCategories((prev) => [...prev, { id, name: name.trim(), slug, description }].sort((a, b) => a.name.localeCompare(b.name)))
      }
      setName("")
      setDescription("")
      setEditId(null)
    } finally {
      setBusy(false)
    }
  }

  const startEdit = (c: Category) => {
    setEditId(c.id)
    setName(c.name)
    setDescription(c.description || "")
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Articles keep their category string.")) return
    await deleteCategory(id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
    if (editId === id) {
      setEditId(null)
      setName("")
      setDescription("")
    }
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  const usedButUnmanaged = Object.keys(counts).filter((c) => !categories.some((x) => x.name === c))

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <p className="text-gray-400 mt-1">Taxonomy for articles across the publication</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
        <h2 className="font-bold text-white">{editId ? "Edit Category" : "New Category"}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Name *</label>
            <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Sports Betting" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
            <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional" />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={busy}
            className="bg-[#E95420] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#CC4A1C] transition disabled:opacity-50"
          >
            {busy ? "Saving..." : editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null)
                setName("")
                setDescription("")
              }}
              className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-white/20 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6">
        <h2 className="font-bold text-white mb-4">All Categories</h2>
        {categories.length === 0 && usedButUnmanaged.length === 0 ? (
          <p className="text-sm text-gray-400">No categories yet.</p>
        ) : (
          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">/{c.slug}{c.description ? ` — ${c.description}` : ""}</p>
                </div>
                <span className="text-sm text-gray-400 bg-white/10 px-2.5 py-1 rounded-full">
                  {counts[c.name] || 0} articles
                </span>
                <button onClick={() => startEdit(c)} className="text-sm text-[#f59e0b] font-medium cursor-pointer">
                  Edit
                </button>
                <button onClick={() => handleDelete(c.id)} className="text-sm text-red-400 cursor-pointer">
                  Delete
                </button>
              </div>
            ))}
            {usedButUnmanaged.map((name) => (
              <div key={name} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl opacity-70">
                <div className="flex-1">
                  <p className="font-medium text-white">{name}</p>
                  <p className="text-xs text-gray-500">Used on articles — not in category collection</p>
                </div>
                <span className="text-sm text-gray-400 bg-white/10 px-2.5 py-1 rounded-full">{counts[name]} articles</span>
                <button
                  onClick={() => setName(name)}
                  className="text-sm text-[#f59e0b] font-medium cursor-pointer"
                  title="Add to managed categories"
                >
                  Adopt
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
