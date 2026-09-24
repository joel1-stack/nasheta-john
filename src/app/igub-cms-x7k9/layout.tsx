"use client"

import { AuthProvider } from "@/lib/auth-context"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0F0A1A]">{children}</div>
    </AuthProvider>
  )
}
