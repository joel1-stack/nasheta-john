import { db } from "./firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  increment,
} from "firebase/firestore"
import type { Article, AffiliateLink } from "@/types"

const ARTICLES = "articles"
const AFFILIATE_LINKS = "affiliateLinks"
const CLICKS = "clicks"

function toArticle(doc: any): Article {
  const d = doc.data()
  return {
    id: doc.id,
    ...d,
    tags: d.tags || [],
    createdAt: d.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || d.createdAt || "",
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || d.updatedAt || "",
  } as Article
}

export async function getArticles(): Promise<Article[]> {
  if (!db) return []
  const snap = await getDocs(collection(db, ARTICLES))
  const results = snap.docs.map(toArticle)
  results.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
  return results
}

export async function getArticlesByCategory(category: string, country?: string, limitCount?: number): Promise<Article[]> {
  if (!db) return []
  try {
    const snap = await getDocs(collection(db, ARTICLES))
    let results = snap.docs.map(toArticle).filter(a => a.status === "published" && a.category === category)
    if (country && country !== "general") results = results.filter(a => a.country === country)
    results.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    return limitCount ? results.slice(0, limitCount) : results
  } catch {
    return []
  }
}

export async function getAllPublishedArticles(limitCount?: number): Promise<Article[]> {
  if (!db) return []
  try {
    const snap = await getDocs(collection(db, ARTICLES))
    let results = snap.docs.map(toArticle).filter(a => a.status === "published")
    results.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    return limitCount ? results.slice(0, limitCount) : results
  } catch {
    return []
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!db) return null
  const snap = await getDoc(doc(db, ARTICLES, id))
  if (!snap.exists()) return null
  return toArticle(snap)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!db) return null
  try {
    const snap = await getDocs(collection(db, ARTICLES))
    const match = snap.docs.map(toArticle).find(a => a.slug === slug && a.status === "published")
    return match || null
  } catch {
    return null
  }
}

export async function createArticle(data: Omit<Article, "id" | "createdAt" | "updatedAt">): Promise<string | null> {
  if (!db) return null
  const ref = await addDoc(collection(db, ARTICLES), {
    ...data,
    tags: typeof data.tags === "string" ? (data.tags as string).split(",").map((t: string) => t.trim()) : data.tags,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<void> {
  if (!db) return
  const updateData: any = { ...data, updatedAt: serverTimestamp() }
  if (typeof data.tags === "string") {
    updateData.tags = (data.tags as string).split(",").map((t: string) => t.trim())
  }
  await updateDoc(doc(db, ARTICLES, id), updateData)
}

export async function deleteArticle(id: string): Promise<void> {
  if (!db) return
  await deleteDoc(doc(db, ARTICLES, id))
}

export async function incrementViews(id: string): Promise<void> {
  if (!db) return
  await updateDoc(doc(db, ARTICLES, id), { views: increment(1) })
}

// Affiliate links
export async function getAffiliateLinks(articleId: string): Promise<AffiliateLink[]> {
  if (!db) return []
  try {
    const snap = await getDocs(collection(db, AFFILIATE_LINKS))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AffiliateLink)).filter(l => l.articleId === articleId)
  } catch {
    return []
  }
}

export async function createAffiliateLink(data: Omit<AffiliateLink, "id">): Promise<string | null> {
  if (!db) return null
  const ref = await addDoc(collection(db, AFFILIATE_LINKS), { ...data, clicks: 0 })
  return ref.id
}

export async function updateAffiliateLink(id: string, data: Partial<AffiliateLink>): Promise<void> {
  if (!db) return
  await updateDoc(doc(db, AFFILIATE_LINKS, id), data)
}

export async function deleteAffiliateLink(id: string): Promise<void> {
  if (!db) return
  await deleteDoc(doc(db, AFFILIATE_LINKS, id))
}

// Click tracking
export async function trackClick(linkId: string, placement: string): Promise<void> {
  if (!db) return
  await addDoc(collection(db, CLICKS), {
    linkId,
    placement,
    timestamp: serverTimestamp(),
  })
  await updateDoc(doc(db, AFFILIATE_LINKS, linkId), { clicks: increment(1) })
}
