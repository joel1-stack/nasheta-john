"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { getBanners, saveBanners, isBannerLive } from "@/lib/firestoreService"
import ImageUpload from "@/components/ImageUpload"
import type { Banner, BannerZone } from "@/types"

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 transition"
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

const ZONES: { value: BannerZone; label: string; size: string; where: string }[] = [
  { value: "header", label: "Header", size: "728 × 90", where: "Top of section pages" },
  { value: "sidebar", label: "Sidebar", size: "300 × 250", where: "Article and section sidebars" },
  { value: "in-article", label: "In article", size: "728 × 90", where: "Below the article text" },
]

const emptyBanner = (): Banner => ({
  id: crypto.randomUUID(),
  advertiser: "",
  zone: "sidebar",
  imageUrl: "",
  linkUrl: "",
  alt: "",
  startDate: "",
  endDate: "",
  active: true,
})

export default function BannersPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState<Banner[]>([])
  const [editing, setEditing] = useState<Banner | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!user) return
    ;(async () => {
      setBanners(await getBanners())
      setLoading(false)
    })()
  }, [user])

  const persist = async (next: Banner[], note: string) => {
    setSaving(true)
    setMessage("")
    try {
      await saveBanners(next)
      setBanners(next)
      setMessage(note)
    } catch {
      setMessage("Could not save. Check your connection and try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editing) return
    if (!editing.advertiser || !editing.imageUrl || !/^https?:\/\//.test(editing.linkUrl)) {
      setMessage("Advertiser, image and a full link (starting with https://) are required.")
      return
    }
    const exists = banners.some((b) => b.id === editing.id)
    const next = exists ? banners.map((b) => (b.id === editing.id ? editing : b)) : [...banners, editing]
    await persist(next, "Banner saved. It shows on the site within a minute.")
    setEditing(null)
  }

  const toggle = (b: Banner) => persist(banners.map((x) => (x.id === b.id ? { ...x, active: !x.active } : x)), "Updated.")

  const remove = (b: Banner) => {
    if (!confirm(`Remove the ${b.advertiser} banner?`)) return
    persist(banners.filter((x) => x.id !== b.id), "Banner removed.")
  }

  const set = <K extends keyof Banner>(key: K, value: Banner[K]) => setEditing((prev) => (prev ? { ...prev, [key]: value } : prev))

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Banners</h1>
          <p className="text-gray-400 mt-1">Paid advertiser banners. Empty spots stay hidden on the site.</p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(emptyBanner())}
            className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 text-sm"
          >
            + Add Banner
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {ZONES.map((z) => (
          <div key={z.value} className="bg-white/5 rounded-xl border border-white/10 p-4">
            <p className="text-white font-semibold">{z.label}</p>
            <p className="text-xs text-gray-400 mt-1">{z.where}</p>
            <p className="text-xs text-gray-400">Image size: {z.size} px</p>
            <p className="text-xs text-[#409824] mt-2">
              {banners.filter((b) => b.zone === z.value && isBannerLive(b)).length} live (up to 2 show)
            </p>
          </div>
        ))}
      </div>

      {message && <p className="text-sm text-gray-200 bg-white/5 border border-white/10 rounded-lg px-4 py-3">{message}</p>}

      {editing && (
        <form onSubmit={handleSave} className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">{banners.some((b) => b.id === editing.id) ? "Edit banner" : "New banner"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Advertiser</label>
              <input className={inputClass} value={editing.advertiser} onChange={(e) => set("advertiser", e.target.value)} placeholder="e.g. Betika" />
            </div>
            <div>
              <label className={labelClass}>Where it shows</label>
              <select className={inputClass} value={editing.zone} onChange={(e) => set("zone", e.target.value as BannerZone)}>
                {ZONES.map((z) => (
                  <option key={z.value} value={z.value} className="bg-[#110B18]">
                    {z.label} ({z.size})
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Link (where a click goes)</label>
              <input className={inputClass} value={editing.linkUrl} onChange={(e) => set("linkUrl", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className={labelClass}>Start date (optional)</label>
              <input type="date" className={inputClass} value={editing.startDate || ""} onChange={(e) => set("startDate", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>End date (optional)</label>
              <input type="date" className={inputClass} value={editing.endDate || ""} onChange={(e) => set("endDate", e.target.value)} />
            </div>
          </div>
          <ImageUpload
            label="Banner image"
            folder="banners"
            value={editing.imageUrl}
            onChange={(url) => set("imageUrl", url)}
            alt={editing.alt}
            onAltChange={(alt) => set("alt", alt)}
          />
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={editing.active} onChange={(e) => set("active", e.target.checked)} />
            Active
          </label>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="bg-[#409824] text-white px-6 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50">
              {saving ? "Saving..." : "Save banner"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-lg text-sm text-gray-300 border border-white/10">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 divide-y divide-white/10">
        {banners.length === 0 && <p className="p-6 text-gray-400 text-sm">No banners yet. Add one when an advertiser sends their image and link.</p>}
        {banners.map((b) => {
          const live = isBannerLive(b)
          return (
            <div key={b.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
              {b.imageUrl && <img src={b.imageUrl} alt={b.alt || b.advertiser} className="h-14 w-auto max-w-[220px] object-contain rounded bg-white/5" />}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold">{b.advertiser}</p>
                <p className="text-xs text-gray-400 truncate">
                  {ZONES.find((z) => z.value === b.zone)?.label} · {b.linkUrl}
                </p>
                <p className="text-xs text-gray-400">
                  {b.startDate || "Any start"} → {b.endDate || "No end date"}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${live ? "bg-[#409824]/20 text-[#86EFAC]" : "bg-white/10 text-gray-400"}`}>
                {live ? "Live" : b.active ? "Scheduled / expired" : "Off"}
              </span>
              <div className="flex gap-2">
                <button onClick={() => setEditing(b)} className="text-sm text-gray-200 px-3 py-1.5 rounded border border-white/10 hover:bg-white/5">Edit</button>
                <button onClick={() => toggle(b)} className="text-sm text-gray-200 px-3 py-1.5 rounded border border-white/10 hover:bg-white/5">
                  {b.active ? "Turn off" : "Turn on"}
                </button>
                <button onClick={() => remove(b)} className="text-sm text-red-300 px-3 py-1.5 rounded border border-red-400/30 hover:bg-red-500/10">Remove</button>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-500">
        Banner clicks are recorded in Google Analytics as the event <code>ad_click</code>, with the advertiser name, so you can report results to advertisers.
      </p>
    </div>
  )
}
