import Link from "next/link"
import Newsletter from "./Newsletter"

export default function Footer() {
  return (
    <footer className="bg-ubuntu-purple text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">iGamingUbuntu</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Africa&apos;s iGaming content authority. Expert reviews, betting guides, and industry news across the continent.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="/" className="block hover:text-white transition">Home</Link>
              <Link href="/blog" className="block hover:text-white transition">Blog</Link>
              <Link href="/reviews" className="block hover:text-white transition">Reviews</Link>
              <Link href="/guides" className="block hover:text-white transition">Guides</Link>
              <Link href="/about" className="block hover:text-white transition">About</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Countries</h4>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="/kenya" className="block hover:text-white transition">Kenya</Link>
              <Link href="/nigeria" className="block hover:text-white transition">Nigeria</Link>
              <Link href="/south-africa" className="block hover:text-white transition">South Africa</Link>
              <Link href="/ghana" className="block hover:text-white transition">Ghana</Link>
              <Link href="/tanzania" className="block hover:text-white transition">Tanzania</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <div className="space-y-2 text-sm text-white/70">
              <Link href="/privacy" className="block hover:text-white transition">Privacy Policy</Link>
              <Link href="/affiliate-disclosure" className="block hover:text-white transition">Affiliate Disclosure</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mb-8">
          <Newsletter />
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-sm text-white/50">
          <p className="mb-2">
            This site contains affiliate links. We may earn a commission when you sign up through our links. 
            Please gamble responsibly. 18+ only.
          </p>
          <p>&copy; {new Date().getFullYear()} iGamingUbuntu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
