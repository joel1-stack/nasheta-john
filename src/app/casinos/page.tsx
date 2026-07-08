"use client"

import { useState } from "react"
import CasinoOfferCard from "@/components/CasinoOfferCard"
import AdSlot from "@/components/AdSlot"
import type { CasinoOffer } from "@/components/CasinoOfferCard"

const allCasinos: CasinoOffer[] = [
  {
    name: "SportPesa", rating: 4.8, market: "kenya",
    logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&q=80",
    bonus: ["200% Welcome Bonus up to KES 5,000", "Instant M-Pesa deposits and withdrawals", "Live betting on all major leagues"],
    ctaLabel: "Get Bonus", affiliateUrl: "https://sportpesa.com/?ref=igamingubuntu",
  },
  {
    name: "Betika", rating: 4.6, market: "kenya",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80",
    bonus: ["Free Bet on First Deposit", "M-Pesa Express withdrawals in minutes", "Daily jackpot pools"],
    ctaLabel: "Claim Free Bet", affiliateUrl: "https://betika.com/?aff=igamingubuntu",
  },
  {
    name: "1xBet", rating: 4.5, market: "global",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&q=80",
    bonus: ["100% Deposit Bonus up to $100", "$100 Free Bet on registration", "Live streaming of 50,000+ events"],
    ctaLabel: "Get Bonus", affiliateUrl: "https://1xbet.com/?btag=igamingubuntu",
  },
  {
    name: "Betway", rating: 4.7, market: "global",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80",
    bonus: ["Up to $50 in Free Bets", "Trusted global brand with local support", "Cash-out feature on all sports"],
    ctaLabel: "Claim Bonus", affiliateUrl: "https://betway.com/?aff=igamingubuntu",
  },
  {
    name: "22Bet", rating: 4.4, market: "nigeria",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80",
    bonus: ["100% Welcome Bonus up to $50", "Daily enhanced odds on major leagues", "Crypto and bank transfer accepted"],
    ctaLabel: "Get Bonus", affiliateUrl: "https://22bet.com/?btag=igamingubuntu",
  },
  {
    name: "HollywoodBets", rating: 4.6, market: "south-africa",
    logo: "https://images.unsplash.com/photo-1588182472590-d8e4c7a36b63?w=100&q=80",
    bonus: ["SA's favourite bookmaker", "Competitive odds on all markets", "Easy EFT and card payouts"],
    ctaLabel: "Bet Now", affiliateUrl: "https://hollywoodbets.com/?ref=igamingubuntu",
  },
  {
    name: "Bet9ja", rating: 4.5, market: "nigeria",
    logo: "https://images.unsplash.com/photo-1554224154-26032dfc0dbe?w=100&q=80",
    bonus: ["Nigeria's #1 betting platform", "Best odds on Premier League", "Quick bank transfer withdrawals"],
    ctaLabel: "Join Now", affiliateUrl: "https://bet9ja.com/?ref=igamingubuntu",
  },
  {
    name: "Melbet", rating: 4.3, market: "ghana",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80",
    bonus: ["100% Welcome Bonus up to GHS 500", "MTN MoMo and Vodafone Cash accepted", "Wide range of betting markets"],
    ctaLabel: "Get Bonus", affiliateUrl: "https://melbet.com/?ref=igamingubuntu",
  },
  {
    name: "Betway Ghana", rating: 4.5, market: "ghana",
    logo: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=100&q=80",
    bonus: ["Up to GHS 500 in Free Bets", "MoMo deposit and withdrawal", "Trusted international brand"],
    ctaLabel: "Claim Bonus", affiliateUrl: "https://betway.com/?aff=igamingubuntu",
  },
  {
    name: "1xBet Tanzania", rating: 4.4, market: "tanzania",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&q=80",
    bonus: ["100% Bonus up to TZS 200,000", "Tigo-Pesa and M-Pesa accepted", "Live betting and streaming"],
    ctaLabel: "Get Bonus", affiliateUrl: "https://1xbet.com/?btag=igamingubuntu",
  },
]

const markets = ["global", "kenya", "nigeria", "south-africa", "ghana", "tanzania"]
const types = ["All", "New", "Best", "Mobile", "Payment Method"]

export default function CasinosPage() {
  const [market, setMarket] = useState("global")
  const [type, setType] = useState("All")

  const filtered = allCasinos.filter((c) => {
    if (market !== "global" && c.market !== market) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-ubuntu-purple to-gold/70">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1200&q=80" alt="Casino Directory" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Casino Directory</h1>
          <p className="text-white/80 mt-1 max-w-2xl">Find the best online casinos and betting sites for your market. Expert reviewed and ranked.</p>
        </div>
      </div>

      <AdSlot position="leaderboard-top" className="mb-8 rounded-xl overflow-hidden" />

      {/* Market filter pills - horizontal scrollable on mobile */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Market</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {markets.map((m) => (
            <button
              key={m}
              onClick={() => setMarket(m)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                market === m
                  ? "bg-ubuntu-orange text-white shadow-md shadow-ubuntu-orange/20"
                  : "bg-card text-text-secondary hover:text-ubuntu-orange hover:bg-ubuntu-orange/5"
              }`}
            >
              {m === "south-africa" ? "South Africa" : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Type filter pills */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Type</h2>
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                type === t
                  ? "bg-ubuntu-orange text-white"
                  : "bg-card text-text-secondary hover:text-ubuntu-orange"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-text-muted mb-6">{filtered.length} casinos found</p>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filtered.map((casino) => (
          <CasinoOfferCard key={casino.name} offer={casino} placement="directory" />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto mb-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-text-secondary">No casinos found for this filter.</p>
          <p className="text-sm text-text-muted mt-1">Try a different market or type.</p>
        </div>
      )}

      <AdSlot position="in-content-1" className="rounded-xl overflow-hidden" />
    </div>
  )
}
