"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { getAuthInstance } from "@/lib/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, getMetadata } from "firebase/storage"
import { getApp } from "firebase/app"

export default function MediaLibraryPage() {
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState<{ name: string; url: string; size: number; time: string }[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (!user) return
    loadImages()
  }, [user])

  const loadImages = async () => {
    try {
      getAuthInstance()
      const storage = getStorage(getApp())
      const imagesRef = ref(storage, "articles")
      const res = await listAll(imagesRef)
      const urls = await Promise.all(res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        const metadata = await getMetadata(itemRef)
        return {
          name: itemRef.name,
          url,
          size: metadata.size,
          time: new Date(metadata.timeCreated).toLocaleDateString(),
        }
      }))
      setImages(urls.sort((a, b) => b.time.localeCompare(a.time)))
    } catch (e) {
      console.error("Failed to load images:", e)
    }
    setLoading(false)
  }

  const handleUpload = async (files: FileList) => {
    setUploading(true)
    getAuthInstance()
    const storage = getStorage(getApp())
    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`
      const fileRef = ref(storage, `articles/${fileName}`)
      await uploadBytes(fileRef, file)
    }
    await loadImages()
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleUpload(e.target.files)
  }

  if (authLoading || loading) return <div className="p-8 text-center text-gray-400">Loading...</div>
  if (!user) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Media Library</h1>
          <p className="text-gray-400 mt-1">Manage your article images and assets</p>
        </div>
        <label className="bg-[#E95420] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#CC4A1C] transition cursor-pointer">
          Upload Images
          <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
        </label>
      </div>

      <div 
        className={`bg-white/5 backdrop-blur rounded-2xl border-2 border-dashed p-12 text-center transition ${
          dragActive ? "border-[#E95420] bg-[#E95420]/10" : "border-white/10 hover:border-[#E95420]/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false) }}
        onDrop={handleDrop}
      >
        <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" id="file-upload" />
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-300 mb-2">Drag & drop images here, or click to browse</p>
        <p className="text-xs text-gray-500">Supports: JPG, PNG, WebP, AVIF (max 10MB each)</p>
        {uploading && <p className="mt-4 text-[#E95420]">Uploading...</p>}
      </div>

      {images.length === 0 ? (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-medium text-white mb-1">No images yet</p>
          <p className="text-sm text-gray-400 mb-4">Upload your first image to get started.</p>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-bold text-white">{images.length} images</h2>
            <span className="text-sm text-gray-400">Click to copy URL</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
            {images.map((img) => (
              <div key={img.name} className="group relative bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-[#E95420]/50 transition">
                <img src={img.url} alt={img.name} className="w-full h-32 object-cover" loading="lazy" />
                <div className="p-3">
                  <p className="text-xs text-white truncate font-medium">{img.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{img.time} • {(img.size / 1024).toFixed(1)} KB</p>
                </div>
                <button 
                  onClick={() => { navigator.clipboard.writeText(img.url); alert("URL copied!"); }}
                  className="absolute bottom-2 right-2 bg-[#E95420] text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  Copy URL
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}