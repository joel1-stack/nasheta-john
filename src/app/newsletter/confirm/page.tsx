import Link from "next/link"

export default function NewsletterConfirmPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold text-text-primary mb-4">Thanks for Subscribing!</h1>
      <p className="text-text-secondary mb-8">
        You&apos;re now on the iGamingUbuntu mailing list. We&apos;ll send you betting tips, bonus offers, and iGaming insights.
      </p>
      <Link href="/" className="text-ubuntu-orange font-medium hover:underline">
        Back to Home →
      </Link>
    </div>
  )
}
