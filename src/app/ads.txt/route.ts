/**
 * ads.txt - https://www.igamingubuntu.com/ads.txt
 *
 * Authorised digital sellers file. AdSense requires this to exist at the root
 * domain, otherwise ads.txt returns 404 and demand is limited.
 * Keep the publisher ID in sync with the AdSense script in src/app/layout.tsx
 * and confirm the exact line in AdSense > Sites before changing it.
 */
export const dynamic = "force-static"

const ADS_TXT = `google.com, pub-5956809831211575, DIRECT, f08c47fec0942fa0
`

export async function GET(): Promise<Response> {
  return new Response(ADS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
