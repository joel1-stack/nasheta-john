"use client"

import Link from "next/link"

const sections = [
  {
    title: "1. Introduction",
    content: `iGamingUbuntu ("we", "us", "our") operates the website nasheta-john.vercel.app (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, subscribe to our newsletter, or interact with our content and services.`,
  },
  {
    title: "2. Information We Collect",
    content: `We may collect information about you in a variety of ways. The information we may collect via the Site includes:

Personal Data: Name and email address when you subscribe to our newsletter, submit a contact form, or otherwise voluntarily provide such information.

Derivational Data: Browser type, operating system, IP address, referring URLs, pages viewed, time spent on pages, and other analytical data collected automatically when you access the Site.

Cookies and Tracking Technologies: We use cookies, web beacons, and similar tracking technologies to track activity on our Site and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:

- Operate and maintain the Site
- Send you newsletters and marketing communications (only if you have subscribed)
- Respond to your inquiries and provide customer support
- Analyze Site usage to improve content and user experience
- Track affiliate referrals and commissions
- Detect, prevent, and address technical issues and fraud
- Comply with legal obligations`,
  },
  {
    title: "4. Affiliate Disclosure",
    content: `The Site contains affiliate links to third-party iGaming operators, betting sites, and casinos. When you click on an affiliate link and sign up or make a purchase, we may earn a commission at no additional cost to you.

We only recommend products and services that we have researched and believe provide value to our readers. Our editorial content is not influenced by affiliate partnerships. Affiliate relationships do not affect the independence of our reviews, guides, or recommendations.

All affiliate links are clearly identified where they appear.`,
  },
  {
    title: "5. Google AdSense",
    content: `We use Google AdSense to display advertisements on the Site. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites on the internet.

Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and/or other sites on the internet. You can opt out of personalized advertising by visiting Google's Ad Settings.

For more information on how Google uses data, visit: https://policies.google.com/technologies/partner-sites`,
  },
  {
    title: "6. Third-Party Services",
    content: `We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related functions, or assist us in analysing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

Third-party services we use include:

- Google Analytics (website analytics)
- Google AdSense (advertising)
- Firebase (newsletter subscriptions and database)
- Vercel (website hosting)`,
  },
  {
    title: "7. Data Security",
    content: `We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that no security system is impenetrable, and we cannot guarantee the absolute security of your data.

No method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.`,
  },
  {
    title: "8. Your Data Protection Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

- The right to access – You have the right to request copies of your personal data.
- The right to rectification – You have the right to request correction of inaccurate data.
- The right to erasure – You have the right to request deletion of your personal data.
- The right to restrict processing – You have the right to request restriction of processing.
- The right to object – You have the right to object to our processing of your data.
- The right to data portability – You have the right to request transfer of your data.

To exercise any of these rights, please contact us at salvagekyalo@gmail.com.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our Site is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal data from a child under 18, we will take steps to delete that information.

Given the nature of our content (iGaming and betting), the Site is strictly intended for adults aged 18 and over.`,
  },
  {
    title: "10. International Data Transfers",
    content: `Your information may be transferred to and maintained on servers located outside of your country or other governmental jurisdiction where data protection laws may differ. If you are located outside the jurisdiction where our servers are located, please be aware that your data may be transferred to, stored, and processed in those jurisdictions.

By using the Site, you consent to such transfers.`,
  },
  {
    title: "11. Changes to This Privacy Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.

Changes to this Privacy Policy are effective when they are posted on this page.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have questions or concerns about this Privacy Policy, please contact us:

Email: salvagekyalo@gmail.com
Website: https://nasheta-john.vercel.app/contact`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 mt-3 text-sm">Last updated: September 4, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-10">
          iGamingUbuntu (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website nasheta-john.vercel.app (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, subscribe to our newsletter, or interact with our content and services. Please read this policy carefully.
        </p>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#111827] mb-3">{section.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#f59e0b] hover:underline font-medium text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
