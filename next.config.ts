import type { NextConfig } from "next";

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
      { source: "/admin", destination: "/igub-cms-x7k9", permanent: true },
      { source: "/admin/:path*", destination: "/igub-cms-x7k9/:path*", permanent: true },
    ]
  },
};

export default nextConfig;
