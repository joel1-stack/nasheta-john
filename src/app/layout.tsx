import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavbarWrapper from "@/components/NavbarWrapper"
import FooterWrapper from "@/components/FooterWrapper"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://nasheta-john.vercel.app"),
  title: {
    default: "iGamingUbuntu — Africa's iGaming Content & Affiliate Authority",
    template: "%s | iGamingUbuntu",
  },
  description:
    "Expert iGaming content, betting site reviews, and affiliate guides across Kenya, Nigeria, South Africa, Ghana, and Tanzania.",
  keywords: ["iGaming", "betting", "casino", "Africa", "Kenya", "Nigeria", "South Africa", "Ghana", "Tanzania", "affiliate", "sports betting", "content writing"],
  authors: [{ name: "Nasheta John" }],
  creator: "iGamingUbuntu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nasheta-john.vercel.app",
    siteName: "iGamingUbuntu",
    title: "iGamingUbuntu — Africa's iGaming Content & Affiliate Authority",
    description: "Expert iGaming content, betting site reviews, and affiliate guides across Kenya, Nigeria, South Africa, Ghana, and Tanzania.",
    images: [
      {
        url: "/images/nasheta.png",
        width: 800,
        height: 600,
        alt: "iGamingUbuntu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iGamingUbuntu — Africa's iGaming Content & Affiliate Authority",
    description: "Expert iGaming content, betting site reviews, and affiliate guides across Kenya, Nigeria, South Africa, Ghana, and Tanzania.",
    images: ["/images/nasheta.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
        <head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </head>
        <body className={`${inter.className} min-h-full flex flex-col bg-[#110B18] text-text-primary antialiased`}>
        <NavbarWrapper />
         <main className="flex-1 bg-[#110B18]">
          {children}
        </main>
        <FooterWrapper />
      </body>
    </html>
  )
}
