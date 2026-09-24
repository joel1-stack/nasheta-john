"use client"

import { FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { getSiteSettings, saveSiteSettings } from "@/lib/firestoreService"
import type { SiteSettings } from "@/types"

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 transition"
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5"

const defaults: Omit<SiteSettings, "id"> = {
  siteName: "iGamingUbuntu",
  tagline: "The Pulse of African iGaming Business",
  contactEmail: "info@igamingubuntu.com",
  twitter: "https://x.com/SalvageNasheta",
  linkedin: "",
  affiliateDisclosure:
    "This site contains affiliate links. We may earn a commission if you sign up through our links, at no extra cost to you.",
  responsibleGambling:
    "Gambling can be addictive. Please play responsibly. Must be 18+ or of legal age in your jurisdiction.",
  primaryCountry: "Kenya",
}

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<Omit<SiteSettings, "id">>(defaults)

  useEffect(() => {
    if (!user) return
    ;(async () => {
      const s = await getSiteSettings()
      if (s) {
        setForm({
          siteName: s.siteName || defaults.siteName,
          tagline: s.tagline || defaults.tagline,
          contactEmail: s.contactEmail || defaults.contactEmail,
          twitter: s.twitter || "",
          linkedin: s.linkedin || "",
          affiliateDisclosure: s.affiliateDisclosure || defaults.affiliateDisclosure,
          responsibleGambling: s.responsibleGambling || defaults.responsibleGambling,
          primaryCountry: s.primaryCountry || defaults.primaryCountry,
        })
      }
      setLoading(false)
    })()
  }, [user])

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await saveSiteSettings(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading)
    return (
      <div className="p-8 text-center text-gray-400">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      </div>
    )
  if (!user) return null

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Site identity, contact, and compliance copy</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">Site</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Site name</label>
              <input className={inputClass} value={form.siteName} onChange={(e) => set("siteName", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input className={inputClass} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Contact email</label>
              <input type="email" className={inputClass} value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Primary country</label>
              <input className={inputClass} value={form.primaryCountry || ""} onChange={(e) => set("primaryCountry", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>X / Twitter</label>
              <input className={inputClass} value={form.twitter || ""} onChange={(e) => set("twitter", e.target.value)} placeholder="https://x.com/..." />
            </div>
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input className={inputClass} value={form.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/..." />
            </div>
          </div>
        </section>

        <section className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-bold text-white">Compliance</h2>
          <div>
            <label className={labelClass}>Affiliate disclosure</label>
            <textarea rows={3} className={inputClass} value={form.affiliateDisclosure} onChange={(e) => set("affiliateDisclosure", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Responsible gambling notice</label>
            <textarea rows={3} className={inputClass} value={form.responsibleGambling} onChange={(e) => set("responsibleGambling", e.target.value)} />
          </div>
        </section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#E95420] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition shadow-lg shadow-[#E95420]/20 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-sm text-green-400">Saved.</span>}
        </div>
      </form>
    </div>
  )
}
