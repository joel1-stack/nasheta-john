export type ArticleStatus =
  | "published"
  | "draft"
  | "review"
  | "scheduled"
  | "sponsored"
  | "press-release"

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  country: string
  featuredImage: string
  tags: string[]
  readTime: number
  author: string
  status: ArticleStatus
  views: number
  createdAt: string
  updatedAt: string
  scheduledAt?: string
  // SEO fields
  seoTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  noindex?: boolean
  ogImage?: string
  // Author fields
  authorName?: string
  authorBio?: string
  authorPhoto?: string
  // Sponsored/Press
  sponsorName?: string
  pressReleaseSource?: string
}

export interface AffiliateLink {
  id: string
  articleId: string
  operatorName: string
  url: string
  trackingId: string
  bonusText: string
  clicks: number
  imageUrl?: string
  ctaLabel?: string
  campaign?: string
  network?: string
  destination?: string
  country?: string
  placement?: string
  status?: "active" | "paused" | "expired"
  updatedAt?: string
}

export interface Operator {
  id: string
  name: string
  slug: string
  logo?: string
  brand?: string
  website?: string
  type: "sportsbook" | "casino" | "both"
  countries: string[]
  license?: string
  payments?: string
  minDeposit?: string
  maxPayout?: string
  welcomeOffer?: string
  rating: number
  pros: string[]
  cons: string[]
  affiliateUrl?: string
  trackingUrl?: string
  status: "active" | "paused" | "archived"
  lastVerified?: string
  nextReview?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  articleCount?: number
}

export interface SiteSettings {
  id: string
  siteName: string
  tagline: string
  contactEmail: string
  twitter?: string
  linkedin?: string
  affiliateDisclosure: string
  responsibleGambling: string
  primaryCountry?: string
  updatedAt?: string
}

export interface ClickEvent {
  id: string
  linkId: string
  placement?: string
  timestamp?: string
}

export interface Country {
  id: string
  name: string
  slug: string
  flag: string
  description: string
  articleCount: number
}

export interface AdSlot {
  id: string
  name: string
  size: string
  type: "adsense" | "direct" | "placeholder"
  code: string
  active: boolean
  position: "leaderboard-top" | "sidebar-1" | "sidebar-2" | "in-content-1" | "in-content-2" | "footer-banner"
}

export interface Subscriber {
  id: string
  email: string
  country: string
  subscribedAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  projectType: string
  message: string
  read: boolean
  createdAt: string
}
