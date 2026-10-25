import type { NextConfig } from "next";
import { REMOVED_DEMO_SLUGS } from "./src/lib/site";

const nextConfig: NextConfig = {
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
    optimizePackageImports: ["react-icons"],
  },
  async redirects() {
    return [
      // 10 hardcoded demo/seed articles: deleted from the code, 301 to /blog.
      ...REMOVED_DEMO_SLUGS.map((slug) => ({
        source: `/blog/${slug}`,
        destination: "/blog",
        statusCode: 301,
      })),
      // Apex domain straight to www in one hop (see also vercel.json).
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "igamingubuntu.com" }],
        destination: "https://www.igamingubuntu.com/:path*",
        statusCode: 301,
      },
      { source: "/admin", destination: "/igub-cms-x7k9", permanent: true },
      { source: "/admin/:path*", destination: "/igub-cms-x7k9/:path*", permanent: true },
    ]
  },
};

export default nextConfig;
