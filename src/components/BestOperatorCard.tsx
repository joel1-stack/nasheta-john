"use client"

import { useState, type ReactNode } from "react"

export interface BestOperator {
  name: string
  initials: string
  badgeColor: string
  /** Path to a real logo image; falls back to the initials badge if missing or broken. */
  logo?: string
  rating: number
  bestFor: string
  features: string[]
  minDeposit?: string
  payoutTime?: string
  games?: string
  siteUrl: string
}

interface BestOperatorCardProps {
  operator: BestOperator
  rank: number
}

/** Rank badge: a "#1 PICK" style ribbon for the top three, nothing for the rest. */
function RankRibbon({ rank }: { rank: number }): ReactNode {
  if (rank > 3) return null
  return (
    <span className="absolute top-0 right-0 bg-brand-ink text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg">
      #{rank} PICK
    </span>
  )
}

export default function BestOperatorCard({ operator, rank }: BestOperatorCardProps) {
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = !!operator.logo && !logoFailed

  return (
    <div className="relative bg-white rounded-xl border border-gray-200 p-5 flex flex-col hover:shadow-lg transition-shadow">
      <RankRibbon rank={rank} />

      <div className="flex items-center gap-3 mb-3">
        {showLogo ? (
          <div className="w-11 h-11 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={operator.logo}
              alt={`${operator.name} logo`}
              width={44}
              height={44}
              className="w-full h-full object-contain"
              onError={() => setLogoFailed(true)}
            />
          </div>
        ) : (
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: operator.badgeColor }}
          >
            {operator.initials}
          </div>
        )}
        <div>
          <h3 className="font-bold text-brand-deep leading-tight">{operator.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-amber-500 font-semibold">{operator.rating.toFixed(1)}</span>
            <span className="text-gray-400">/5</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">Best for: {operator.bestFor}</p>

      <ul className="space-y-1.5 mb-4">
        {operator.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {(operator.minDeposit || operator.payoutTime) && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {operator.minDeposit && (
            <div className="border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10px] uppercase text-gray-400">Min Deposit</p>
              <p className="text-sm font-medium text-brand-deep">{operator.minDeposit}</p>
            </div>
          )}
          {operator.payoutTime && (
            <div className="border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10px] uppercase text-gray-400">Payout</p>
              <p className="text-sm font-medium text-brand-deep">{operator.payoutTime}</p>
            </div>
          )}
        </div>
      )}

      {operator.games && (
        <div className="border border-gray-100 rounded-lg px-3 py-2 mb-4">
          <p className="text-[10px] uppercase text-gray-400">Games</p>
          <p className="text-sm font-medium text-brand-deep">{operator.games}</p>
        </div>
      )}

      <div className="mt-auto">
        <a
          href={operator.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-brand-teal text-white font-bold py-2.5 rounded-lg text-sm hover:bg-brand-teal-dark transition"
        >
          Visit Site
        </a>
        <p className="text-[10px] text-gray-400 text-center mt-2 leading-relaxed">18+ Only. Please gamble responsibly.</p>
      </div>
    </div>
  )
}
