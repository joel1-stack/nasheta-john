import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#110B18] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold bg-gradient-to-r from-[#E95420] to-[#FFD700] bg-clip-text text-transparent mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-[#409824] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#409824]/90 transition shadow-lg shadow-[#409824]/20"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/5 transition"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
