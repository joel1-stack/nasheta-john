// Blog Post Model
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  date: Date | string;
  updatedDate?: Date | string;
  readTime: number;
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  affiliateLinks?: AffiliateLink[];
  relatedPostIds?: string[];
}

export interface AffiliateLink {
  id: string;
  text: string;
  url: string;
  domain: string;
  type: 'primary' | 'secondary';
  utmCampaign?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
}

// Service/Portfolio Models
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  link?: string;
  metrics?: string;
}

export interface Portfolio {
  id: string;
  title: string;
  category: string;
  metric: string;
  icon: string;
  link?: string;
}

// Testimonial Model
export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

// Author Model
export interface Author {
  id: string;
  name: string;
  bio: string;
  image: string;
  title: string;
  email?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    telegram?: string;
    whatsapp?: string;
  };
}
