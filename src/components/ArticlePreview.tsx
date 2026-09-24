"use client"

interface ArticlePreviewProps {
  open: boolean
  onClose: () => void
  title: string
  excerpt: string
  content: string
  category?: string
  featuredImage?: string
  status?: string
}

export default function ArticlePreview({
  open,
  onClose,
  title,
  excerpt,
  content,
  category,
  featuredImage,
  status,
}: ArticlePreviewProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#FAFAF8] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0F0A1A] text-white px-5 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">Preview</span>
            {status && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                {status}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none cursor-pointer">&times;</button>
        </div>

        <div className="p-6 md:p-8">
          {category && (
            <span className="bg-emerald-50 text-emerald-600 px-3 py-0.5 rounded-full font-medium text-xs">{category}</span>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mt-3 mb-4 leading-tight">{title || "Untitled article"}</h1>
          {excerpt && <p className="text-gray-500 text-base mb-5 leading-relaxed">{excerpt}</p>}
          {featuredImage && (
            <div className="rounded-xl overflow-hidden mb-5">
              <img src={featuredImage} alt="" className="w-full h-48 object-cover" />
            </div>
          )}
          <div
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed prose-headings:text-[#111827] prose-a:text-[#f59e0b]"
            dangerouslySetInnerHTML={{ __html: content || "<p>No content yet.</p>" }}
          />
        </div>
      </div>
    </div>
  )
}
