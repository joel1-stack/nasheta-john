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
  status: "published" | "draft"
  views: number
  createdAt: string
  updatedAt: string
}

export interface AffiliateLink {
  id: string
  articleId: string
  operatorName: string
  url: string
  trackingId: string
  bonusText: string
  clicks: number
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
