"use client"

import { useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSetup, setShowSetup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!auth) {
      const hasApiKey = !!(process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "").startsWith("AIza")
      if (!hasApiKey) setShowSetup(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (!auth) { throw new Error("Firebase not configured") }
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin/dashboard")
    } catch (err: any) {
      setError(err.message === "Firebase not configured" ? "Firebase is not configured. See setup guide below." : "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  if (showSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-border p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Admin Setup Required</h1>
            <p className="text-sm text-text-secondary mt-1">Connect Firebase to use the admin dashboard</p>
          </div>

          <div className="bg-ubuntu-orange/5 border border-ubuntu-orange/20 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-text-primary mb-3 text-sm">Step-by-Step Setup</h2>
            <ol className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-2">
                <span className="font-bold text-ubuntu-orange shrink-0">1.</span>
                <span>Go to <a href="https://console.firebase.google.com/project/nasheta-105b3/settings/general/" target="_blank" className="text-ubuntu-orange underline">Firebase Console → Project Settings</a></span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-ubuntu-orange shrink-0">2.</span>
                <span>Under "Your apps", click <strong>"Add app"</strong> → <strong>"Web"</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-ubuntu-orange shrink-0">3.</span>
                <span>Register the app (nickname: "nasheta-web") and copy the <code className="bg-card px-1 rounded">firebaseConfig</code> object</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-ubuntu-orange shrink-0">4.</span>
                <span>Open <code className="bg-card px-1 rounded">.env.local</code> in the project root and paste the values</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-ubuntu-orange shrink-0">5.</span>
                <span>Enable <strong>Authentication</strong> → <strong>Sign-in method</strong> → <strong>Email/Password</strong> in Firebase Console</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-ubuntu-orange shrink-0">6.</span>
                <span>Go to <strong>Firestore Database</strong> → <strong>Create database</strong> → Start in <strong>test mode</strong></span>
              </li>
            </ol>
          </div>

          <div className="bg-card rounded-xl p-4">
            <p className="text-sm font-medium text-text-primary mb-2">Expected .env.local format:</p>
            <pre className="text-xs text-text-secondary bg-white border border-border rounded-lg p-3 overflow-x-auto">
{`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nasheta-105b3.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nasheta-105b3
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nasheta-105b3.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=470224547103
NEXT_PUBLIC_FIREBASE_APP_ID=1:470224547103:web:...`}
            </pre>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full mt-6 bg-ubuntu-orange text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
          >
            Reload After Setup
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-border p-8 w-full max-w-sm">
        <div className="text-center mb-6">
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
