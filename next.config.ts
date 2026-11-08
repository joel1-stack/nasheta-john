import type { NextConfig } from "next";
import { REMOVED_DEMO_SLUGS } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Do not advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "firebasestorage.app" },
      { protocol: "https", hostname: "*.firebasestorage.app" },
      { protocol: "https", hostname: "**.bing.net" },
      { protocol: "https", hostname: "th.bing.com" },
      { protocol: "https", hostname: "www.igamingtoday.com" },
      { protocol: "https", hostname: "africanigaming.org" },
      { protocol: "https", hostname: "www.cafonline.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["react-icons", "firebase", "firebase/firestore", "date-fns"],
  },
  // Next 16 builds with Turbopack, which does not take a webpack splitChunks
  // config. Chunk count is therefore reduced by shipping less client code,
  // not by re-bundling. See reports/crawl-budget-2026-11-02.md.
  async redirects() {
    return [
      // 10 hardcoded demo/seed articles: deleted from the code, 301 home.
      ...REMOVED_DEMO_SLUGS.map((slug) => ({
        source: `/blog/${slug}`,
        destination: "/",
        statusCode: 301,
      })),
      // Apex domain straight to www in one hop (see also vercel.json).
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "igamingubuntu.com" }],
        destination: "https://www.igamingubuntu.com/:path*",
        statusCode: 301,
      },
      // Former writing-services pages: the site is a media publication only now.
      ...["/work-with-me", "/link-building-services", "/services"].map((source) => ({
        source,
        destination: "/advertise",
        statusCode: 301,
      })),
      ...["/seo-content-writing", "/editing-services", "/translation-services", "/global"].map((source) => ({
        source,
        destination: "/about",
        statusCode: 301,
      })),
      // /casinos/reviews was linked at some point but never existed; the casino
      // coverage lives at /casinos.
      { source: "/casinos/reviews", destination: "/casinos", statusCode: 301 },
      // The /blog and /news listing pages were merged into the front page.
      // Old /blog/<slug> article links are redirected by src/app/blog/[slug],
      // straight to the article's section address.
      {
        source: "/blog",
        has: [{ type: "query" as const, key: "page", value: "(?<p>[2-9]|[1-9]\\d+)" }],
        destination: "/page/:p",
        statusCode: 301,
      },
      { source: "/blog", destination: "/", statusCode: 301 },
      // The article sitemap used to be called blog-sitemap.xml; keep old submissions working.
      { source: "/blog-sitemap.xml", destination: "/articles-sitemap.xml", statusCode: 301 },
      { source: "/news", destination: "/", statusCode: 301 },
      // The old /reviews page held placeholder ratings that nobody had verified.
      // Real reviews live in the casino hub and are added one tested operator at a time.
      { source: "/reviews", destination: "/casinos", statusCode: 301 },
      { source: "/admin", destination: "/igub-cms-x7k9", permanent: true },
      { source: "/admin/:path*", destination: "/igub-cms-x7k9/:path*", permanent: true },
    ]
  },
};

export default nextConfig;
