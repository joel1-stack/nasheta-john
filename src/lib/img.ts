// Ask Cloudinary for an auto-format (WebP/AVIF), auto-quality image at the
// width the slot actually needs, instead of the full-size original. Leaves
// non-Cloudinary URLs and URLs that already carry a transformation alone.
export function optimizedImage(url: string, width: number): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url
  const [head, tail] = url.split("/upload/")
  if (!/^v\d+\//.test(tail)) return url
  return `${head}/upload/f_auto,q_auto,w_${width}/${tail}`
}
