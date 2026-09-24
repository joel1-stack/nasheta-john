"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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
      <header className="border-b border-white/10 bg-white/5 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold bg-gradient-to-r from-[#E95420] to-[#FFD700] bg-clip-text text-transparent">iGUB CMS</span>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/igub-cms-x7k9/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</a>
              <a href="/igub-cms-x7k9/dashboard/new" className="text-gray-300 hover:text-white transition">New Article</a>
              <a href="/igub-cms-x7k9/dashboard/media" className="text-gray-300 hover:text-white transition">Media Library</a>
              <a href="/igub-cms-x7k9/dashboard/affiliates" className="text-gray-300 hover:text-white transition">Affiliates</a>
              <a href="/igub-cms-x7k9/dashboard/analytics" className="text-gray-300 hover:text-white transition">Analytics</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={() => { signOut().then(() => router.replace("/igub-cms-x7k9")) }}
              className="text-sm text-gray-400 hover:text-red-400 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
