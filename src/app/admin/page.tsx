"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuthInstance } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const auth = getAuthInstance()
      if (!auth) throw new Error("Firebase not initialized")
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin/dashboard")
    } catch (err: any) {
      const code = err.code || ""
      if (code === "auth/invalid-credential" || code === "auth/user-not-found") {
        setError("Invalid email or password")
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.")
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Check your connection.")
      } else {
        setError(err.message || "Login failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-border p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ubuntu-orange to-gold flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">IG</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Login</h1>
          <p className="text-sm text-text-secondary mt-1">iGamingUbuntu Dashboard</p>
        </div>

        {error && (
          <div className="bg-ubuntu-red/10 text-ubuntu-red text-sm p-3 rounded-lg mb-4">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ubuntu-orange/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ubuntu-orange text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
