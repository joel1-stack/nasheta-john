import { getDb } from "@/lib/firebase"
import { collection, getDocs, type DocumentSnapshot } from "firebase/firestore"
import type { Article } from "@/types"
import { asLiveArticle, REMOVED_DEMO_SLUG_SET } from "@/lib/site"

function serializeDoc(d: DocumentSnapshot): Article {
  const data = d.data() || {}
  return {
    id: d.id,
    ...data,
    tags: data.tags || [],
    createdAt: data.createdAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.createdAt || "",
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.()?.split("T")[0] || data.updatedAt || "",
  } as Article
}

export interface QueryOptions {
  category?: string
  country?: string
  search?: string
  page?: number
  perPage?: number
  /** Exclude one slug (used by the "Related articles" block). */
  excludeSlug?: string
  /** "newest" (default) sorts by publish date, "popular" by real view count. */
  sort?: "newest" | "popular"
}

export interface QueryResult {
  articles: Article[]
  total: number
  hasMore: boolean
  page: number
  totalPages: number
}

function dateValue(article: Article): string {
  return article.createdAt || article.updatedAt || ""
}

function normalize(value?: string): string {
  return (value || "").trim().toLowerCase().replace(/[\s_]+/g, "-")
}

/** Tolerates "Regulation" vs "Regulations" and similar CMS inconsistencies. */
function normalizeCategory(value?: string): string {
  return normalize(value).replace(/s$/, "")
}

export function sameCategory(a?: string, b?: string): boolean {
  const left = normalizeCategory(a)
  const right = normalizeCategory(b)
  return !!left && left === right
}

/** All publicly visible articles, newest first. */
export async function getAllPublicArticles(): Promise<Article[]> {
  const fb = getDb()
  if (!fb) return []

  try {
    const snap = await getDocs(collection(fb, "articles"))
    return snap.docs
      .map(serializeDoc)
      .map((a) => asLiveArticle(a))
      .filter((a): a is Article => !!a && !!a.slug)
      // A demo slug that still exists in Firestore must never be listed again.
      .filter((a) => !REMOVED_DEMO_SLUG_SET.has(a.slug))
      .sort((a, b) => dateValue(b).localeCompare(dateValue(a)))
  } catch (err) {
    console.error("getAllPublicArticles failed:", err)
    return []
  }
}

export async function queryArticles(opts: QueryOptions = {}): Promise<QueryResult> {
  const { category, country, search, page = 1, perPage = 12, excludeSlug, sort = "newest" } = opts
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1

  let articles = await getAllPublicArticles()

  if (category && category !== "All") {
    articles = articles.filter((a) => sameCategory(a.category, category))
  }
  if (country && country !== "general") {
    articles = articles.filter((a) =>
      (a.country || "")
        .split(",")
        .map((c) => normalize(c))
        .includes(normalize(country))
    )
  }
  if (search) {
    const s = search.toLowerCase()
    articles = articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(s) ||
        a.excerpt?.toLowerCase().includes(s) ||
        a.category?.toLowerCase().includes(s) ||
        a.tags?.some((t) => t.toLowerCase().includes(s))
    )
  }
  if (excludeSlug) {
    articles = articles.filter((a) => a.slug !== excludeSlug)
  }
  if (sort === "popular") {
    articles = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0))
  }

  const total = articles.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (safePage - 1) * perPage
  const paged = articles.slice(start, start + perPage)

  return { articles: paged, total, hasMore: start + perPage < total, page: safePage, totalPages }
}

/**
 * Related articles: same country first, then same category, newest first.
 * Never includes the current article and never repeats a slug.
 */
export async function getRelatedArticles(article: Article, count = 4): Promise<Article[]> {
  const all = await getAllPublicArticles()
  const pool = all.filter((a) => a.slug !== article.slug)
  const targetCountry = normalize((article.country || "").split(",")[0])
  const targetCategory = normalize(article.category)

  const picked: Article[] = []
  const seen = new Set<string>()

  const push = (candidate: Article) => {
    if (picked.length >= count || seen.has(candidate.slug)) return
    seen.add(candidate.slug)
    picked.push(candidate)
  }

  if (targetCountry && targetCountry !== "general") {
    pool
      .filter((a) =>
        (a.country || "")
          .split(",")
          .map((c) => normalize(c))
          .includes(targetCountry)
      )
      .forEach(push)
  }

  if (targetCategory) {
    pool.filter((a) => sameCategory(a.category, article.category)).forEach(push)
  }

  // Fill up with the newest remaining articles so the block is never empty.
  pool.forEach(push)

  return picked.slice(0, count)
}

export async function getPopularArticles(count = 5): Promise<Article[]> {
  const all = await getAllPublicArticles()
  return all
    .filter((a) => (a.views || 0) > 0)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, count)
}

/** Latest published articles, used by the homepage and the article sidebar. */
export async function getLatestArticles(count = 12): Promise<Article[]> {
  const all = await getAllPublicArticles()
  return all.slice(0, count)
}
