"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function AffiliateStatsRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace("/igub-cms-x7k9/dashboard/affiliate-links")
    } else if (!loading && !user) {
      router.replace("/igub-cms-x7k9")
    }
  }, [user, loading, router])

  return (
    <div className="p-8 text-center text-gray-400">
      <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin mx-auto" />
      <p className="mt-4 text-sm">Opening Affiliate Links…</p>
    </div>
  )
}
