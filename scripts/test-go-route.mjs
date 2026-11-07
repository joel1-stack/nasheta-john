// End-to-end test of src/app/go/[slug]/route.ts against an in-memory campaign
// store (no network, no production data).
// Run: node --experimental-strip-types scripts/test-go-route.mjs
import { register } from "node:module"
import { pathToFileURL } from "node:url"
import path from "node:path"
import assert from "node:assert/strict"

const root = path.resolve(import.meta.dirname, "..")
const hooks = `
const root = ${JSON.stringify(pathToFileURL(root + "/").href)}
const stubs = {
  "@/lib/firebase": "data:text/javascript,export const getDb=()=>globalThis.__DB",
  "firebase/firestore": "data:text/javascript," + encodeURIComponent(\`
    export const doc=(db,c,id)=>({c,id});
    export const collection=(db,c)=>({c});
    export const serverTimestamp=()=>'ts';
    export const increment=(n)=>({inc:n});
    export const getDoc=async(ref)=>{ if(globalThis.__FAIL) throw new Error('down'); const d=globalThis.__STORE.get(ref.id); return {exists:()=>!!d,data:()=>d,ref} };
    export const updateDoc=async(ref,patch)=>{ const d=globalThis.__STORE.get(ref.id); if(patch.clicks) d.clicks=(d.clicks||0)+patch.clicks.inc };
    export const addDoc=async(c,row)=>{ globalThis.__CLICKS.push(row) };
  \`),
  "next/server": "data:text/javascript," + encodeURIComponent(\`
    export class NextResponse extends Response {
      static redirect(url,init){ const s=typeof init==='number'?init:(init&&init.status)||307; return new Response(null,{status:s,headers:{Location:String(url),...(init&&init.headers||{})}}) }
    }
    export class NextRequest {}
  \`),
}
export async function resolve(spec, ctx, next) {
  if (stubs[spec]) return { url: stubs[spec], shortCircuit: true }
  if (spec.startsWith("@/")) return next(new URL("src/" + spec.slice(2) + (spec.endsWith(".ts")?"":".ts"), root).href, ctx)
  return next(spec, ctx)
}
`
register("data:text/javascript," + encodeURIComponent(hooks))

const { GET } = await import(pathToFileURL(path.join(root, "src/app/go/[slug]/route.ts")).href)

globalThis.__DB = {}
globalThis.__STORE = new Map([
  ["camp1", { url: "https://partner.example/offer?aff=PARTNER1", clicks: 0 }],
  ["camp-off", { url: "https://partner.example/x", active: false }],
  ["camp-bad", { url: "javascript:alert(1)" }],
  ["camp-rel", { url: "/relative" }],
])
globalThis.__CLICKS = []

const call = (slug, qs = "", referer) => GET(
  { nextUrl: { origin: "https://www.igamingubuntu.com", searchParams: new URLSearchParams(qs) }, headers: new Headers(referer ? { referer } : {}) },
  { params: Promise.resolve({ slug }) },
)
let n = 0
const t = async (name, fn) => { await fn(); n++; console.log("ok -", name) }

await t("valid campaign redirects 302 with partner params intact", async () => {
  const r = await call("camp1")
  assert.equal(r.status, 302)
  assert.equal(r.headers.get("location"), "https://partner.example/offer?aff=PARTNER1")
})
await t("response is noindex and uncached", async () => {
  const r = await call("camp1")
  assert.match(r.headers.get("x-robots-tag"), /noindex/)
  assert.equal(r.headers.get("cache-control"), "no-store")
})
await t("utm params pass through, junk params dropped, partner aff not overwritten", async () => {
  const r = await call("camp1", "utm_source=igub&utm_medium=article&aff=HACK&redirect=https://evil.example")
  assert.equal(r.headers.get("location"), "https://partner.example/offer?aff=PARTNER1&utm_source=igub&utm_medium=article")
})
await t("click is counted and logged with referer", async () => {
  const before = globalThis.__STORE.get("camp1").clicks
  await call("camp1", "", "https://www.igamingubuntu.com/some-article")
  assert.equal(globalThis.__STORE.get("camp1").clicks, before + 1)
  assert.equal(globalThis.__CLICKS.at(-1).placement, "https://www.igamingubuntu.com/some-article")
  assert.equal(globalThis.__CLICKS.at(-1).linkId, "camp1")
})
await t("unknown slug is 404 noindex, not a homepage redirect", async () => {
  const r = await call("nope"); assert.equal(r.status, 404); assert.match(r.headers.get("x-robots-tag"), /noindex/); assert.equal(r.headers.get("location"), null)
})
await t("malformed slugs are 404", async () => { for (const s of ["a b", "../x", "x/y", "", "-bad"]) assert.equal((await call(s)).status, 404, s) })
await t("inactive campaign is 404", async () => assert.equal((await call("camp-off")).status, 404))
await t("unsafe or relative destination is 404 and is not counted", async () => {
  const clicks = globalThis.__CLICKS.length
  assert.equal((await call("camp-bad")).status, 404); assert.equal((await call("camp-rel")).status, 404)
  assert.equal(globalThis.__CLICKS.length, clicks)
})
await t("database failure is 503 with Retry-After, never a guess", async () => {
  globalThis.__FAIL = true; const r = await call("camp1"); globalThis.__FAIL = false
  assert.equal(r.status, 503); assert.equal(r.headers.get("retry-after"), "60")
})
await t("no database configured is 503", async () => {
  const db = globalThis.__DB; globalThis.__DB = null; const r = await call("camp1"); globalThis.__DB = db; assert.equal(r.status, 503)
})
console.log(`${n} tests passed`)
