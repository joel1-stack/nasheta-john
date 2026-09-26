"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0F0A1A]">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E95420] to-[#FFD700] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#E95420]/30">
            <span className="text-white font-bold text-xl">IG</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">iGamingUbuntu Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4">{error}</div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 transition"
                placeholder="admin@igamingubuntu.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E95420] text-white py-3 rounded-lg font-semibold hover:bg-[#CC4A1C] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-[#E95420]/20"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <p className="text-sm text-gray-400 text-center">A 6-digit code was sent to <strong>{email}</strong>. Check that inbox.</p>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 transition"
                placeholder="123456"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E95420] text-white py-3 rounded-lg font-semibold hover:bg-[#CC4A1C] transition disabled:opacity-50 cursor-pointer shadow-lg shadow-[#E95420]/20"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-sm text-gray-400 hover:text-white transition"
            >
              &larr; Back
            </button>
          </form>
        )}
      </div>
    </div>
  )
}