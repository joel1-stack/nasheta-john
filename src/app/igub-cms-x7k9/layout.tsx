import type { Metadata } from "next"
import { AuthProvider } from "@/lib/auth-context"

export const metadata: Metadata = {
  title: {
    default: "Admin Login",
    template: "%s | iGamingUbuntu CMS",
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0F0A1A]">{children}</div>
    </AuthProvider>
  )
}
