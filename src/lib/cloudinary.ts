const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""

export const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "igamingubuntu"

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET)
}

export function uploadToCloudinary(
  file: File,
  options: { folder?: string; onProgress?: (pct: number) => void } = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      reject(
        new Error(
          "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in the environment."
        )
      )
      return
    }

    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", UPLOAD_PRESET)
    form.append("folder", options.folder || CLOUDINARY_FOLDER)

    const xhr = new XMLHttpRequest()
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`)
    xhr.timeout = 120_000

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        options.onProgress?.(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      let body: { secure_url?: string; error?: { message?: string } } | null = null
      try {
        body = JSON.parse(xhr.responseText)
      } catch {
        body = null
      }
      if (xhr.status >= 200 && xhr.status < 300 && body?.secure_url) {
        resolve(body.secure_url)
      } else if (body?.error?.message) {
        reject(new Error(body.error.message))
      } else {
        reject(new Error(`Upload failed (HTTP ${xhr.status}).`))
      }
    }

    xhr.onerror = () => reject(new Error("Network error during upload. Check your connection and retry."))
    xhr.ontimeout = () => reject(new Error("Upload timed out after 2 minutes."))
    xhr.onabort = () => reject(new Error("Upload was cancelled."))

    xhr.send(form)
  })
}
