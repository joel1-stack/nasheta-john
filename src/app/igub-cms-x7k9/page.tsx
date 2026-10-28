"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { IgubFullLogo } from "@/components/IgubLogo"

const field =
  "w-full px-4 py-3.5 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/60 text-center text-base backdrop-blur-md focus:outline-none focus:bg-white/20 focus:border-[#A7F432]/70 transition"
const outlineButton =
  "w-full py-3 rounded-xl border-2 border-white/85 text-white font-semibold tracking-wide hover:bg-white hover:text-[#0F1F16] transition disabled:opacity-50 cursor-pointer"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { sendOTP, verifyOTP } = useAuth()
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await sendOTP(email)
    if (res.success) {
      setStep("otp")
    } else {
      setError(res.error || "Failed to send OTP")
    }
    setLoading(false)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await verifyOTP(email, otp)
    if (res.success) {
      router.push("/igub-cms-x7k9/dashboard")
    } else {
      setError(res.error || "Invalid OTP")
    }
    setLoading(false)
  }

  return (
    <div className="cms-raw relative min-h-screen overflow-hidden bg-[#0F1F16] text-white flex flex-col">
      {/* Forest-light backdrop: deep green, soft beams falling from the top. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#2C6E5E_0%,#173D33_35%,#0F1F16_75%)]" />
        <div className="absolute -top-20 left-[38%] w-40 h-[140%] rotate-[18deg] bg-gradient-to-b from-[#EAF3E7]/25 via-[#A7F432]/10 to-transparent blur-2xl" />
        <div className="absolute -top-20 left-[48%] w-24 h-[140%] rotate-[14deg] bg-gradient-to-b from-[#EAF3E7]/20 via-[#EAF3E7]/5 to-transparent blur-xl" />
        <div className="absolute -top-20 left-[56%] w-56 h-[140%] rotate-[22deg] bg-gradient-to-b from-[#A7F432]/15 via-[#3B8F7B]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-[#3B8F7B]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(15,31,22,0.85))]" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <Link href="/" aria-label="iGamingUbuntu home">
          <IgubFullLogo />
        </Link>
        <Link href="/" className="text-sm font-medium text-white/85 hover:text-[#A7F432] transition">
          Back to site
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A7F432]">Editor access</p>
          <h1 className="text-3xl font-light mt-3">Welcome back</h1>
          <p className="text-sm text-white/65 mt-2">
            {step === "email" ? "We will email you a one-time code." : (
              <>A 6-digit code was sent to <span className="text-white font-medium">{email}</span>.</>
            )}
          </p>

          {error && (
            <div className="mt-6 bg-[#7F1D1D]/50 border border-red-300/30 text-red-100 text-sm px-4 py-3 rounded-xl backdrop-blur">{error}</div>
          )}

          {step === "email" ? (
            <form onSubmit={handleSendOTP} className="mt-8 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-label="Admin email"
                className={field}
                placeholder="admin email"
              />
              <button type="submit" disabled={loading} className={outlineButton}>
                {loading ? "Sending code..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="mt-8 space-y-4">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                aria-label="One-time code"
                className={`${field} tracking-[0.5em] font-semibold`}
                placeholder="••••••"
              />
              <button type="submit" disabled={loading} className={outlineButton}>
                {loading ? "Verifying..." : "Verify code"}
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-sm text-white/60 hover:text-white transition"
              >
                &larr; Use a different email
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-center gap-6 py-6 text-sm text-white/75">
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/contact" className="hover:text-white transition">Help</Link>
        <Link href="/privacy" className="hover:text-white transition">Privacy &amp; Terms</Link>
      </footer>
    </div>
  )
}
