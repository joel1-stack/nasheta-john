"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {
  signInWithCustomToken,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth"
import { getAuthInstance } from "./firebase"

interface AuthContextType {
  user: User | null
  loading: boolean
  sendOTP: (email: string) => Promise<{ success: boolean; error?: string }>
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuthInstance()
    if (!auth) { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const sendOTP = async (email: string) => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      return data
    } catch {
      return { success: false, error: "Failed to send OTP" }
    }
  }

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      })
      const data = await res.json()
      if (data.success && data.customToken) {
        const auth = getAuthInstance()
        if (auth) {
          await signInWithCustomToken(auth, data.customToken)
        }
      }
      return data
    } catch {
      return { success: false, error: "Failed to verify OTP" }
    }
  }

  const signOut = async () => {
    const auth = getAuthInstance()
    if (auth) await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, sendOTP, verifyOTP, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}