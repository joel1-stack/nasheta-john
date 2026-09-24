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
import type { Article, AffiliateLink, ContactMessage, Operator, Category, SiteSettings, ClickEvent } from "@/types"

const ARTICLES = "articles"
const AFFILIATE_LINKS = "affiliateLinks"
const CLICKS = "clicks"
const SUBSCRIBERS = "subscribers"
const CONTACT_MESSAGES = "contactMessages"
const OPERATORS = "operators"
const CATEGORIES = "categories"
const SETTINGS = "settings"

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

export async function addContactMessage(data: {
  name: string
  email: string
  projectType: string
  message: string
}): Promise<string | null> {
  const fb = getDb()
  if (!fb) return null
  try {
    const ref = await addDoc(collection(fb, CONTACT_MESSAGES), {
      ...data,
      read: false,
      createdAt: serverTimestamp(),
    })
    return ref.id
  } catch {
    return null
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, CONTACT_MESSAGES), orderBy("createdAt", "desc"))
    const snap = await getDocs(q)
    return snap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt?.toDate?.()?.toLocaleString?.() || "",
      } as ContactMessage
    })
  } catch {
    return []
  }
}

export async function markContactMessageRead(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await updateDoc(doc(fb, CONTACT_MESSAGES, id), { read: true })
}

export async function deleteContactMessage(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await deleteDoc(doc(fb, CONTACT_MESSAGES, id))
}

function toDateStr(value: any): string {
  return value?.toDate?.()?.toISOString?.()?.split("T")[0] || value || ""
}

// --- Operators ---

export async function getOperators(): Promise<Operator[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, OPERATORS), orderBy("name", "asc"))
    const snap = await getDocs(q)
    return snap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        ...data,
        countries: data.countries || [],
        pros: data.pros || [],
        cons: data.cons || [],
        rating: data.rating || 0,
        createdAt: toDateStr(data.createdAt),
        updatedAt: toDateStr(data.updatedAt),
      } as Operator
    })
  } catch {
    return []
  }
}

export async function getOperatorById(id: string): Promise<Operator | null> {
  const fb = getDb()
  if (!fb) return null
  try {
    const snap = await getDoc(doc(fb, OPERATORS, id))
    if (!snap.exists()) return null
    const data = snap.data()
    return { id: snap.id, ...data, countries: data.countries || [], pros: data.pros || [], cons: data.cons || [] } as Operator
  } catch {
    return null
  }
}

export async function createOperator(data: Omit<Operator, "id">): Promise<string | null> {
  const fb = getDb()
  if (!fb) return null
  const ref = await addDoc(collection(fb, OPERATORS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateOperator(id: string, data: Partial<Operator>): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await updateDoc(doc(fb, OPERATORS, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteOperator(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await deleteDoc(doc(fb, OPERATORS, id))
}

// --- All affiliate links (standalone manager) ---

export async function getAllAffiliateLinks(): Promise<AffiliateLink[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, AFFILIATE_LINKS), orderBy("clicks", "desc"))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AffiliateLink))
  } catch {
    return []
  }
}

// --- Categories ---

export async function getCategories(): Promise<Category[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, CATEGORIES), orderBy("name", "asc"))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category))
  } catch {
    return []
  }
}

export async function createCategory(data: Omit<Category, "id">): Promise<string | null> {
  const fb = getDb()
  if (!fb) return null
  const ref = await addDoc(collection(fb, CATEGORIES), data)
  return ref.id
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await updateDoc(doc(fb, CATEGORIES, id), data)
}

export async function deleteCategory(id: string): Promise<void> {
  const fb = getDb()
  if (!fb) return
  await deleteDoc(doc(fb, CATEGORIES, id))
}

// --- Site settings ---

const SETTINGS_DOC = "site"

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const fb = getDb()
  if (!fb) return null
  try {
    const snap = await getDoc(doc(fb, SETTINGS, SETTINGS_DOC))
    if (!snap.exists()) return null
    const data = snap.data()
    return { id: snap.id, ...data, updatedAt: toDateStr(data.updatedAt) } as SiteSettings
  } catch {
    return null
  }
}

export async function saveSiteSettings(data: Omit<SiteSettings, "id">): Promise<void> {
  const fb = getDb()
  if (!fb) return
  const { setDoc } = await import("firebase/firestore")
  await setDoc(doc(fb, SETTINGS, SETTINGS_DOC), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

// --- Clicks ---

export async function getClickEvents(limitCount = 200): Promise<ClickEvent[]> {
  const fb = getDb()
  if (!fb) return []
  try {
    const q = query(collection(fb, CLICKS), orderBy("timestamp", "desc"), fbLimit(limitCount))
    const snap = await getDocs(q)
    return snap.docs.map((d) => {
      const data = d.data()
      return { id: d.id, ...data, timestamp: toDateStr(data.timestamp) } as ClickEvent
    })
  } catch {
    return []
  }
}
