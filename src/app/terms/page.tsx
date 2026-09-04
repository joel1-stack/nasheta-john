"use client"

import Link from "next/link"

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using the iGamingUbuntu website (nasheta-john.vercel.app) and its services (collectively, the "Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the Site.

These terms apply to all visitors, users, and others who access or use the Site. By using the Site on behalf of an organization, you represent that you have the authority to bind that organization to these terms.`,
  },
  {
    title: "2. Description of Services",
    content: `iGamingUbuntu provides editorial content, information, guides, reviews, and analysis related to the iGaming and sports betting industry across African markets. Our services include:

- Publishing news articles, guides, and reviews related to betting, casino, and iGaming
- Providing market-specific content for Kenya, Nigeria, South Africa, Ghana, Tanzania, and other African markets
- Offering content writing, translation, editing, and link building services for iGaming brands
- Newsletter subscriptions for editorial content delivery
- Affiliate marketing through referral links to third-party operators

We reserve the right to modify, suspend, or discontinue any part of the Site or services at any time without prior notice.`,
  },
  {
    title: "3. Eligibility",
    content: `The Site and its content are intended for individuals who are at least 18 years of age. By using the Site, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these terms.

The Site provides information about gambling and betting activities. It does not facilitate or encourage gambling where it is illegal. Users are responsible for ensuring that their use of the Site and any gambling activities comply with applicable laws in their jurisdiction.`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on the Site, including but not limited to text, articles, guides, reviews, graphics, logos, images, videos, and software, is the property of iGamingUbuntu or its content creators and is protected by copyright, trademark, and other intellectual property laws.

You may not:
- Reproduce, distribute, or create derivative works from any content without written permission
- Use any content for commercial purposes without authorization
- Scrape, crawl, or use automated tools to extract content from the Site
- Remove or modify any copyright, trademark, or other proprietary notices

You may share links to our articles on social media or other platforms, provided that proper attribution is given.`,
  },
  {
    title: "5. User Conduct",
    content: `When using the Site, you agree not to:

- Use the Site for any unlawful purpose or in violation of any local, national, or international law
- Attempt to gain unauthorized access to any portion of the Site or its systems
- Interfere with or disrupt the Site or servers connected to the Site
- Use the Site to transmit spam, chain letters, or other unsolicited communications
- Impersonate any person or entity
- Collect or harvest personal information of other users
- Use automated systems, bots, or scrapers to access the Site`,
  },
  {
    title: "6. Affiliate Links and Third-Party Content",
    content: `The Site contains affiliate links to third-party iGaming operators, betting sites, and casinos. When you click on these links and sign up or make a purchase, we may earn a commission at no additional cost to you.

Important disclosures:

- We are not responsible for the content, products, or services offered by third-party sites
- We do not guarantee the accuracy of information provided by third-party operators
- Your interactions with third-party sites are governed by their own terms and privacy policies
- We encourage you to review the terms of any third-party site before engaging with their services
- Affiliate relationships do not influence our editorial content or reviews

All opinions expressed on the Site are our own and are not influenced by affiliate partnerships.`,
  },
  {
    title: "7. Disclaimer of Warranties",
    content: `The Site and all content, products, and services are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied.

To the fullest extent permitted by law, iGamingUbuntu disclaims all warranties, including but not limited to:

- Implied warranties of merchantability, fitness for a particular purpose, and non-infringement
- Warranties that the Site will be uninterrupted, error-free, or secure
- Warranties regarding the accuracy, reliability, or completeness of content
- Warranties that the Site or its servers are free of viruses or harmful components

The information on the Site is provided for general information purposes only and should not be relied upon as the sole basis for making decisions. Any reliance on the information on this Site is at your own risk.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, iGamingUbuntu and its owners, operators, affiliates, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:

- Loss of profits, data, use, or goodwill
- Losses resulting from gambling activities based on information from the Site
- Damages arising from third-party products or services
- Any unauthorized access to or use of our servers or personal information

Our total liability for any claims arising from or related to the Site shall not exceed the amount you paid us, if any, in the past six months.`,
  },
  {
    title: "9. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless iGamingUbuntu and its operators from any claims, liabilities, damages, losses, and expenses (including legal fees) arising from:

- Your use of the Site
- Your violation of these Terms
- Your violation of any rights of another party
- Your gambling activities undertaken based on information from the Site`,
  },
  {
    title: "10. Responsible Gambling",
    content: `We are committed to promoting responsible gambling. Our content is for informational purposes only and does not encourage excessive or irresponsible gambling.

We encourage all readers to:
- Set strict budgets and time limits for gambling activities
- Never gamble with money you cannot afford to lose
- Seek help if gambling becomes a problem
- Use self-exclusion tools offered by licensed operators

If you or someone you know has a gambling problem, please seek help from a professional gambling addiction service. Resources include:

- GamCare: www.gamcare.org.uk
- Gamblers Anonymous: www.gamblersanonymous.org
- National Council on Problem Gambling: www.ncpgambling.org`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with applicable international laws. Any disputes arising under these terms shall be resolved through good-faith negotiation first, and if unresolved, through binding arbitration.

If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    title: "12. Changes to These Terms",
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after changes are posted constitutes acceptance of the revised terms.

We recommend reviewing this page periodically for any updates.`,
  },
  {
    title: "13. Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us:

Email: salvagekyalo@gmail.com
Website: https://nasheta-john.vercel.app/contact`,
  },
]

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-200/60">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/40" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          <span className="inline-block bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">Terms of Service</h1>
          <p className="text-gray-500 mt-3 text-sm">Last updated: September 4, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-10">
          Welcome to iGamingUbuntu. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. By accessing or using the Site, you agree to be bound by these Terms. Please read them carefully before using the Site.
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
