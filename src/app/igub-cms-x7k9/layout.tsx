import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import "./cms.css"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" })

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
      <div className={`cms min-h-screen ${jakarta.className}`}>{children}</div>
    </AuthProvider>
  )
}
