import { getDb } from "./firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  query,
  where,
  orderBy,
  limit as fbLimit,
  startAfter,
  DocumentSnapshot,
} from "firebase/firestore"
import type { Article, AffiliateLink } from "@/types"

const ARTICLES = "articles"
const AFFILIATE_LINKS = "affiliateLinks"
const CLICKS = "clicks"
const SUBSCRIBERS = "subscribers"

const PAGE_SIZE = 12

function toArticle(d: DocumentSnapshot): Article {
  const data = d.data()!
  return {
    id: d.id,
    ...data,
    tags: data.tags || [],
    createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
  } as Article
}

// Paginated published articles
export async function getPublishedArticlesPage(
  pageNum: number = 1,
  pageSize: number = PAGE_SIZE,
  category?: string,
  country?: string
): Promise<{ articles: Article[]; hasMore: boolean; total: number }> {
  const fb = getDb()
  if (!fb) return { articles: [], hasMore: false, total: 0 }

  try {
    // Build constraints
    const constraints: any[] = [
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
    ]

    if (category && category !== "All") {
      constraints.splice(1, 0, where("category", "==", category))
    }
    if (country && country !== "general") {
      constraints.splice(1, 0, where("country", "==", country))
    }

    // Get total count (approximate with a count query if available, otherwise fetch all)
    const countSnap = await getDocs(query(collection(fb, ARTICLES), ...constraints))
    const total = countSnap.size

    // If total is within first page, no need for cursor
    if (pageNum === 1) {
      const q = query(collection(fb, ARTICLES), ...constraints, fbLimit(pageSize))
      const snap = await getDocs(q)
      const articles = snap.docs.map(toArticle)
      return { articles, hasMore: total > pageSize, total }
    }

    // For page 2+, use cursor-based pagination
    // Get the last doc of previous page
    const prevConstraints = [...constraints, fbLimit(pageSize * (pageNum - 1))]
    const prevSnap = await getDocs(query(collection(fb, ARTICLES), ...prevConstraints))
    const lastDoc = prevSnap.docs[prevSnap.docs.length - 1]

    if (!lastDoc) return { articles: [], hasMore: false, total }

    const q = query(
      collection(fb, ARTICLES),
      ...constraints,
      startAfter(lastDoc),
      fbLimit(pageSize)
    )
    const snap = await getDocs(q)
    const articles = snap.docs.map(toArticle)
    const hasMore = pageNum * pageSize < total

    return { articles, hasMore, total }
  } catch {
    return { articles: [], hasMore: false, total: 0 }
  }
}

// Get all published articles (for admin, sidebar, etc.)
export async function getAllPublishedArticles(limitCount?: number): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const constraints: any[] = [
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
    ]
    if (limitCount) constraints.push(fbLimit(limitCount))
    const snap = await getDocs(query(collection(fb, ARTICLES), ...constraints))
    return snap.docs.map(toArticle)
  } catch {
    return []
  }
}

// Get all articles (admin - includes drafts)
export async function getArticles(): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, ARTICLES), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    return snap.docs.map(toArticle)
  } catch {
    return []
  }
}

// Get articles by category with pagination
export async function getArticlesByCategory(
  category: string,
  country?: string,
  limitCount?: number
): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const constraints: any[] = [
      where("status", "==", "published"),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
    ]
    if (country && country !== "general") {
      constraints.splice(2, 0, where("country", "==", country))
    }
    if (limitCount) constraints.push(fbLimit(limitCount))
    const snap = await getDocs(query(collection(fb, ARTICLES), ...constraints))
    return snap.docs.map(toArticle)
  } catch {
    return []
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  const fb = getDb()
  if (!fb) return null
  const snap = await getDoc(doc(fb, ARTICLES, id))
  if (!snap.exists()) return null
  return toArticle(snap)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fb = getDb()
  if (!fb) return null
  try {
    const q = query(
      collection(fb, ARTICLES),
      where("slug", "==", slug),
      where("status", "==", "published"),
      fbLimit(1)
    )
    const snap = await getDocs(q)
    if (snap.empty) return null
    return toArticle(snap.docs[0])
  } catch {
    return null
  }
}

export async function createArticle(data: Omit<Article, "id" | "createdAt" | "updatedAt">): Promise<string | null> {
  const fb = getDb()
  if (!fb) return null
  const ref = await addDoc(collection(fb, ARTICLES), {
    ...data,
    tags: typeof data.tags === "string" ? (data.tags as string).split(",").map((t: string) => t.trim()) : data.tags,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<void> {
  const fb = getDb()
  if (!fb) return
  const updateData: Record<string, any> = { ...data, updatedAt: serverTimestamp() }
  if (typeof data.tags === "string") {
    updateData.tags = (data.tags as string).split(",").map((t: string) => t.trim())
  }
  await updateDoc(doc(fb, ARTICLES, id), updateData)
}

export async function deleteArticle(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await deleteDoc(doc(fb, ARTICLES, id))
}

export async function incrementViews(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await updateDoc(doc(fb, ARTICLES, id), { views: increment(1) })
}

export async function getAffiliateLinks(articleId: string): Promise<AffiliateLink[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, AFFILIATE_LINKS), where("articleId", "==", articleId))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AffiliateLink))
  } catch {
    return []
  }
}

export async function createAffiliateLink(data: Omit<AffiliateLink, "id">): Promise<string | null> {
  const fb = getDb()
  if (!fb) return null
  const ref = await addDoc(collection(fb, AFFILIATE_LINKS), { ...data, clicks: 0 })
  return ref.id
}

export async function updateAffiliateLink(id: string, data: Partial<AffiliateLink>): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await updateDoc(doc(fb, AFFILIATE_LINKS, id), data)
}

export async function deleteAffiliateLink(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await deleteDoc(doc(fb, AFFILIATE_LINKS, id))
}

export async function trackClick(linkId: string, placement: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await addDoc(collection(fb, CLICKS), {
    linkId,
    placement,
    timestamp: serverTimestamp(),
  })
}

export async function addSubscriber(email: string, country?: string): Promise<string | null> {
  const fb = getDb()
  if (!fb) return null
  try {
    const ref = await addDoc(collection(fb, SUBSCRIBERS), {
      email,
      country: country || "",
      subscribedAt: serverTimestamp(),
    })
    return ref.id
  } catch {
    return null
  }
}

export async function getSubscribers(): Promise<any[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const snap = await getDocs(collection(fb, SUBSCRIBERS))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch {
    return []
  }
}
