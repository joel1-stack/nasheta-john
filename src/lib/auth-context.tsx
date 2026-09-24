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

async function readJson(res: Response) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return {
      success: false,
      error: res.ok ? "Unexpected server response" : `Server error (${res.status})`,
    }
  }
}

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
      return await readJson(res)
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
      const data = await readJson(res)
      if (!data.success) return data

      if (!data.customToken) {
        return { success: false, error: "Login failed: no session token" }
      }

      const auth = getAuthInstance()
      if (!auth) {
        return { success: false, error: "Firebase auth is not initialized" }
      }

      try {
        await signInWithCustomToken(auth, data.customToken)
      } catch (e: any) {
        return {
          success: false,
          error: e?.message || "Firebase sign-in failed",
        }
      }

      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.message || "Failed to verify OTP" }
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
