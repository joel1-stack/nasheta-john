import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AdSlot from "@/components/AdSlot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "iGamingUbuntu — Africa's iGaming Content & Affiliate Authority",
  description:
    "Expert iGaming content, betting site reviews, and affiliate guides across Kenya, Nigeria, South Africa, Ghana, and Tanzania.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-white text-text-primary antialiased`}>
        <Navbar />
        <AdSlot position="leaderboard-top" />
        <main className="flex-1">{children}</main>
        <AdSlot position="footer-banner" />
        <Footer />
      </body>
    </html>
  )
}
