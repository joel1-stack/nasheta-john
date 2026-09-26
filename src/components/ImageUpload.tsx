"use client"

import { useRef, useState } from "react"
import { getAuthInstance, getStorageInstance } from "@/lib/firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  folder?: string
  className?: string
}

const MAX_FILE_SIZE = 8 * 1024 * 1024
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"])

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  folder = "articles",
  className = "",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const handleFile = async (file: File) => {
    setError("")
    setProgress(0)

    if (!ALLOWED_TYPES.has(file.type)) {
      setError("Unsupported image type. Use JPG, PNG, WebP, or GIF.")
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image is too large. Maximum size is 8 MB.")
      return
    }

    setUploading(true)

    try {
      const auth = getAuthInstance()
      const user = auth?.currentUser
      if (!user) throw new Error("Your admin session has expired. Sign in again and retry.")

      const storage = getStorageInstance()
      if (!storage) throw new Error("Firebase Storage is not initialized.")

      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
      const fileName = `${Date.now()}-${safeName}`
      const fileRef = ref(storage, `${folder}/${fileName}`)
      const task = uploadBytesResumable(fileRef, file, { contentType: file.type })

      await new Promise<void>((resolve, reject) => {
        let settled = false
        const finish = (fn: () => void) => {
          if (settled) return
          settled = true
          fn()
        }

        const timeout = window.setTimeout(() => {
          task.cancel()
          finish(() => reject(new Error("Upload timed out. Check Firebase Storage rules and try again.")))
        }, 60_000)

        task.on(
          "state_changed",
          (snapshot) => {
            setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
          },
          (uploadError) => {
            window.clearTimeout(timeout)
            finish(() => reject(uploadError))
          },
          () => {
            window.clearTimeout(timeout)
            finish(resolve)
          }
        )
      })

      const url = await getDownloadURL(fileRef)
      onChange(url)
      setProgress(100)
    } catch (e: any) {
      const code = e?.code || ""
      const message =
        code === "storage/unauthorized"
          ? "Firebase Storage denied this upload. Check Storage Rules and make sure you are signed in."
          : code === "storage/unauthenticated"
            ? "Your admin session is not authenticated. Sign in again and retry."
            : code === "storage/quota-exceeded"
              ? "Firebase Storage quota has been exceeded."
              : code === "storage/object-not-found"
                ? "The uploaded file could not be found after upload."
                : e?.message || "Upload failed."
      setError(message)
      setProgress(0)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 focus:border-[#E95420]/50 transition"
          placeholder="https://... or upload"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition disabled:opacity-50 cursor-pointer whitespace-nowrap"
        >
          {uploading ? `Uploading ${progress}%` : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void handleFile(file)
            e.target.value = ""
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      {value && (
        <div className="mt-2 rounded-lg overflow-hidden border border-white/10 max-h-40">
          <img src={value} alt="Preview" className="w-full h-32 object-cover" />
        </div>
      )}
    </div>
  )
}
