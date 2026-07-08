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
  Timestamp,
  increment,
} from "firebase/firestore"
import type { Article, AffiliateLink } from "@/types"

const ARTICLES = "articles"
const AFFILIATE_LINKS = "affiliateLinks"
const CLICKS = "clicks"

function toArticle(d: any): Article {
  const data = d.data()
  return {
    id: d.id,
    ...data,
    tags: data.tags || [],
    createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
  } as Article
}

export async function getArticles(): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []
  const snap = await getDocs(collection(fb, ARTICLES))
  const results = snap.docs.map(toArticle)
  results.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
  return results
}

export async function getArticlesByCategory(category: string, country?: string, limitCount?: number): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const snap = await getDocs(collection(fb, ARTICLES))
    let results = snap.docs.map(toArticle).filter(a => a.status === "published" && a.category === category)
    if (country && country !== "general") results = results.filter(a => a.country === country)
    results.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    return limitCount ? results.slice(0, limitCount) : results
  } catch {
    return []
  }
}

export async function getAllPublishedArticles(limitCount?: number): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const snap = await getDocs(collection(fb, ARTICLES))
    let results = snap.docs.map(toArticle).filter(a => a.status === "published")
    results.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    return limitCount ? results.slice(0, limitCount) : results
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
    const snap = await getDocs(collection(fb, ARTICLES))
    const match = snap.docs.map(toArticle).find(a => a.slug === slug && a.status === "published")
    return match || null
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
  const updateData: any = { ...data, updatedAt: serverTimestamp() }
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
    const snap = await getDocs(collection(fb, AFFILIATE_LINKS))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AffiliateLink)).filter(l => l.articleId === articleId)
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
  await updateDoc(doc(fb, AFFILIATE_LINKS, linkId), { clicks: increment(1) })
}
