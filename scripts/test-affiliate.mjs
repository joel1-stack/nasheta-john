// Run: node --experimental-strip-types scripts/test-affiliate.mjs
import assert from "node:assert/strict"
import { buildDestination, isValidSlug, isTrackingParam } from "../src/lib/affiliate.ts"

const q = (s) => new URLSearchParams(s)
let n = 0
const t = (name, fn) => { fn(); n++; console.log("ok -", name) }

t("slug accepts ids", () => { assert.ok(isValidSlug("sportpesa-ke")); assert.ok(isValidSlug("a_1")) })
t("slug rejects junk", () => { for (const s of ["", "../x", "a b", "a/b", "-x", "x".repeat(65), "x?y"]) assert.ok(!isValidSlug(s), s) })
t("plain destination unchanged", () => assert.equal(buildDestination("https://partner.example/offer?aff=123", q("")).href, "https://partner.example/offer?aff=123"))
t("utm params are added", () => assert.equal(buildDestination("https://partner.example/offer", q("utm_source=igub&utm_medium=article")).href, "https://partner.example/offer?utm_source=igub&utm_medium=article"))
t("partner's own params are never overwritten", () => assert.equal(buildDestination("https://partner.example/o?utm_source=partner&aff=9", q("utm_source=igub&utm_campaign=x")).href, "https://partner.example/o?utm_source=partner&aff=9&utm_campaign=x"))
t("non-tracking params are dropped", () => assert.equal(buildDestination("https://partner.example/o", q("redirect=https://evil.example&utm_term=a")).href, "https://partner.example/o?utm_term=a"))
t("existing encoding and fragment survive", () => assert.equal(buildDestination("https://p.example/a%20b?x=1%262#frag", q("subid=z")).href, "https://p.example/a%20b?x=1%262&subid=z#frag"))
t("non-http destinations are refused", () => { for (const u of ["javascript:alert(1)", "ftp://x.example", "/relative", "", "not a url"]) assert.equal(buildDestination(u, q("")), null, u) })
t("long values are capped", () => assert.ok(buildDestination("https://p.example/", q("utm_term=" + "a".repeat(500))).searchParams.get("utm_term").length <= 200))
t("tracking whitelist", () => { assert.ok(isTrackingParam("utm_source")); assert.ok(isTrackingParam("subid2")); assert.ok(!isTrackingParam("url")) })
console.log(`${n} tests passed`)
