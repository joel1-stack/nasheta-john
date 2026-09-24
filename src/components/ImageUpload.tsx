"use client"

import { useRef, useState } from "react"
import { getStorageInstance } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  folder?: string
  className?: string
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  folder = "articles",
  className = "",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFile = async (file: File) => {
    setUploading(true)
    setError("")
    try {
      const storage = getStorageInstance()
      if (!storage) throw new Error("Storage not initialized")
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`
      const fileRef = ref(storage, `${folder}/${fileName}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      onChange(url)
    } catch (e: any) {
      setError(e.message || "Upload failed")
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
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
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
