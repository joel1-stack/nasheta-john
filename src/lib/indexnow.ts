const BASE_URL = "https://www.igamingubuntu.com"

export function submitToIndexNow(urls: string[]): void {
  if (!urls.length) return
  fetch("/api/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls: urls.map((u) => (u.startsWith(BASE_URL) ? u : `${BASE_URL}${u.startsWith("/") ? "" : "/"}${u}`)) }),
  }).catch(() => {})
}
