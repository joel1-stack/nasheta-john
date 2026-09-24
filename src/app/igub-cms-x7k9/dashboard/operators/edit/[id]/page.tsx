"use client"

import { FormEvent, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getOperatorById, updateOperator } from "@/lib/firestoreService"
import type { Operator } from "@/types"

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 transition"
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

const COUNTRIES = ["Kenya", "Nigeria", "South Africa", "Ghana", "Tanzania", "Uganda", "Zambia", "Other"]

export default function EditOperatorPage() {
  const { user, loading: authLoading } = useAuth()
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    slug: "",
    logo: "",
    brand: "",
    website: "",
    type: "sportsbook" as Operator["type"],
    countries: [] as string[],
    license: "",
    payments: "",
    minDeposit: "",
    maxPayout: "",
    welcomeOffer: "",
    rating: 4,
    prosText: "",
    consText: "",
    affiliateUrl: "",
    trackingUrl: "",
    status: "active" as Operator["status"],
    notes: "",
    lastVerified: "",
    nextReview: "",
  })

  useEffect(() => {
    if (!user || !id) return
    ;(async () => {
      const op = await getOperatorById(id)
      if (!op) {
        setError("Operator not found")
        setLoading(false)
        return
      }
      setForm({
        name: op.name || "",
        slug: op.slug || "",
        logo: op.logo || "",
        brand: op.brand || "",
        website: op.website || "",
        type: op.type || "sportsbook",
        countries: op.countries || [],
        license: op.license || "",
        payments: op.payments || "",
        minDeposit: op.minDeposit || "",
        maxPayout: op.maxPayout || "",
        welcomeOffer: op.welcomeOffer || "",
        rating: op.rating || 0,
        prosText: (op.pros || []).join("\n"),
        consText: (op.cons || []).join("\n"),
        affiliateUrl: op.affiliateUrl || "",
        trackingUrl: op.trackingUrl || "",
        status: op.status || "active",
        notes: op.notes || "",
        lastVerified: op.lastVerified || "",
        nextReview: op.nextReview || "",
      })
      setLoading(false)
    })()
  }, [user, id])

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  const toggleCountry = (c: string) =>
    setForm((f) => ({
      ...f,
      countries: f.countries.includes(c) ? f.countries.filter((x) => x !== c) : [...f.countries, c],
    }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError("Name is required")
      return
    }
    setSaving(true)
    setError("")
    try {
      await updateOperator(id, {
        name: form.name.trim(),
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        logo: form.logo,
        brand: form.brand,
        website: form.website,
        type: form.type,
        countries: form.countries,
        license: form.license,
        payments: form.payments,
        minDeposit: form.minDeposit,
        maxPayout: form.maxPayout,
        welcomeOffer: form.welcomeOffer,
        rating: Number(form.rating) || 0,
        pros: form.prosText.split("\n").map((s) => s.trim()).filter(Boolean),
        cons: form.consText.split("\n").map((s) => s.trim()).filter(Boolean),
        affiliateUrl: form.affiliateUrl,
        trackingUrl: form.trackingUrl,
        status: form.status,
        notes: form.notes,
        lastVerified: form.lastVerified || new Date().toISOString().split("T")[0],
        nextReview: form.nextReview,
      })
      router.push("/igub-cms-x7k9/dashboard/operators")
    } catch (err: any) {
      setError(err?.message || "Failed to update operator")
    }
    setSaving(false)
  }

  const verifyNow = () => {
    const today = new Date().toISOString().split("T")[0]
    const next = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    setForm((f) => ({ ...f, lastVerified: today, nextReview: next }))
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Operator</h1>
          <p className="text-gray-400 mt-1">{form.name}</p>
        </div>
        <button onClick={verifyNow} className="text-sm text-[#f59e0b] hover:underline cursor-pointer">
          Mark verified today
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
        )}

        <section className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name *</label>
              <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input className={inputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input className={inputClass} value={form.logo} onChange={(e) => set("logo", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input className={inputClass} value={form.website} onChange={(e) => set("website", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select className={inputClass + " bg-[#0F0A1A]"} value={form.type} onChange={(e) => set("type", e.target.value)}>
                <option value="sportsbook">Sportsbook</option>
                <option value="casino">Casino</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass + " bg-[#0F0A1A]"} value={form.status} onChange={(e) => set("status", e.target.value)}>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Countries available</label>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCountry(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    form.countries.includes(c) ? "bg-[#E95420] text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Last verified</label>
              <input type="date" className={inputClass} value={form.lastVerified} onChange={(e) => set("lastVerified", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Next review</label>
              <input type="date" className={inputClass} value={form.nextReview} onChange={(e) => set("nextReview", e.target.value)} />
            </div>
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">Offer & Payments</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Welcome offer</label>
              <input className={inputClass} value={form.welcomeOffer} onChange={(e) => set("welcomeOffer", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>License</label>
              <input className={inputClass} value={form.license} onChange={(e) => set("license", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Payment methods</label>
              <input className={inputClass} value={form.payments} onChange={(e) => set("payments", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Minimum deposit</label>
              <input className={inputClass} value={form.minDeposit} onChange={(e) => set("minDeposit", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Maximum payout</label>
              <input className={inputClass} value={form.maxPayout} onChange={(e) => set("maxPayout", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Rating (0–5)</label>
              <input type="number" min={0} max={5} step={0.1} className={inputClass} value={form.rating} onChange={(e) => set("rating", e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pros (one per line)</label>
              <textarea rows={4} className={inputClass} value={form.prosText} onChange={(e) => set("prosText", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Cons (one per line)</label>
              <textarea rows={4} className={inputClass} value={form.consText} onChange={(e) => set("consText", e.target.value)} />
            </div>
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">Affiliate</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Affiliate URL</label>
              <input className={inputClass} value={form.affiliateUrl} onChange={(e) => set("affiliateUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Tracking URL</label>
              <input className={inputClass} value={form.trackingUrl} onChange={(e) => set("trackingUrl", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Internal notes</label>
            <textarea rows={3} className={inputClass} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#E95420] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/igub-cms-x7k9/dashboard/operators")}
            className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  )
}
