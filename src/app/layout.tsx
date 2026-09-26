import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavbarWrapper from "@/components/NavbarWrapper"
import FooterWrapper from "@/components/FooterWrapper"
import ContentProtection from "@/components/ContentProtection"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.igamingubuntu.com"),
  title: {
    default: "iGamingUbuntu — The Pulse of African iGaming Business",
    template: "%s | iGamingUbuntu",
  },
  description:
    "B2B intelligence, regulatory tracking, and fintech updates driving the future of sports betting and digital casino operations across Africa.",
  keywords: ["iGaming", "betting", "casino", "Africa", "Kenya", "Nigeria", "South Africa", "Ghana", "Tanzania", "affiliate", "sports betting", "B2B intelligence", "regulatory tracking", "fintech"],
  authors: [{ name: "Nasheta John" }],
  creator: "iGamingUbuntu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.igamingubuntu.com",
    siteName: "iGamingUbuntu",
    title: "iGamingUbuntu — The Pulse of African iGaming Business",
    description: "B2B intelligence, regulatory tracking, and fintech updates driving the future of sports betting and digital casino operations across Africa.",
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
    site: "@SalvageNasheta",
    creator: "@SalvageNasheta",
    title: "iGamingUbuntu — The Pulse of African iGaming Business",
    description: "B2B intelligence, regulatory tracking, and fintech updates driving the future of sports betting and digital casino operations across Africa.",
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
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" href="/favicon.png" sizes="512x512" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    name: "iGamingUbuntu",
                    url: "https://www.igamingubuntu.com",
                    logo: "https://www.igamingubuntu.com/favicon.png",
                    description:
                      "B2B intelligence, regulatory tracking, and fintech updates for the iGaming industry across Africa.",
                    founder: { "@type": "Person", name: "Nasheta John" },
                    sameAs: ["https://x.com/SalvageNasheta", "https://t.me/nashetajohn"],
                  },
                  {
                    "@type": "WebSite",
                    name: "iGamingUbuntu",
                    url: "https://www.igamingubuntu.com",
                  },
                ],
              }),
            }}
          />
        </head>
        <body className={`${inter.className} min-h-full flex flex-col bg-[#110B18] text-text-primary antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[#E95420] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <ContentProtection />
        <NavbarWrapper />
         <main id="main-content" className="flex-1 bg-[#110B18]">
          {children}
        </main>
        <FooterWrapper />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
