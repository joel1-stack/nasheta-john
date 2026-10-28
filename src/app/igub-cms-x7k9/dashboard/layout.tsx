"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { FiLogOut, FiPlus } from "react-icons/fi"
import CmsSidebar from "@/components/cms/CmsSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/igub-cms-x7k9")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#3B8F7B]/20 border-t-[#3B8F7B] rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const email = user.email || ""
  const initial = (email[0] || "A").toUpperCase()
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="min-h-screen">
      <CmsSidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#E1EAE0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <p className="text-sm text-[#5F7068] hidden sm:block">{today}</p>
            <div className="flex items-center gap-3 ml-auto">
              <Link
                href="/igub-cms-x7k9/dashboard/new"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#0F1F16] text-[#A7F432] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#173D33] transition"
              >
                <FiPlus size={15} /> New article
              </Link>
              <div className="flex items-center gap-2.5 pl-3 border-l border-[#E1EAE0]">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A7F432] to-[#3B8F7B] text-[#0F1F16] font-bold flex items-center justify-center shadow-inner">
                  {initial}
                </span>
                <span className="hidden md:block text-sm font-medium text-[#0F1F16] max-w-[180px] truncate">{email}</span>
              </div>
              <button
                onClick={() => {
                  signOut().then(() => router.replace("/igub-cms-x7k9"))
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[#5F7068] hover:bg-[#FEE2E2] hover:text-[#B91C1C] transition cursor-pointer"
                aria-label="Log out"
                title="Log out"
              >
                <FiLogOut size={17} />
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
