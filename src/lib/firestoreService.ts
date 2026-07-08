import { db } from "./firebase"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
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
  const q = query(collection(db, ARTICLES), orderBy("createdAt", "desc"))
  const snap = await getDocs(q)
  return snap.docs.map(toArticle)
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!db) return null
  const snap = await getDoc(doc(db, ARTICLES, id))
  if (!snap.exists()) return null
  return toArticle(snap)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!db) return null
  const q = query(collection(db, ARTICLES), where("slug", "==", slug), where("status", "==", "published"))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return toArticle(snap.docs[0])
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
  const q = query(collection(db, AFFILIATE_LINKS), where("articleId", "==", articleId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AffiliateLink))
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
