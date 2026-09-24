"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
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
      <div className="min-h-screen bg-[#0F0A1A] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#E95420] rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0F0A1A]">
      <CmsSidebar />
      <div className="lg:pl-64">
        <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">iGamingUbuntu CMS</span>
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm text-gray-400">{user?.email}</span>
              <button
                onClick={() => {
                  signOut().then(() => router.replace("/igub-cms-x7k9"))
                }}
                className="text-sm text-gray-400 hover:text-red-400 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}
