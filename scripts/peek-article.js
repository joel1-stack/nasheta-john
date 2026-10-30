/**
 * Prints the field shape of the newest published article, so a script that
 * writes new ones can match it exactly.
 */
const fs = require("fs")
const path = require("path")
const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")

function loadEnv() {
  const file = path.join(__dirname, "..", ".env.local")
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=([\s\S]*)$/)
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "")
  }
}

loadEnv()
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  }),
})

async function main() {
  const snap = await getFirestore().collection("articles").get()
  const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  docs.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
  console.log("total articles:", docs.length)
  const a = docs.find((d) => d.status === "published") || docs[0]
  console.log("\nnewest published:", a.slug)
  for (const [k, v] of Object.entries(a)) {
    let shown
    if (v && typeof v === "object" && typeof v.toDate === "function") {
      shown = "<Timestamp " + v.toDate().toISOString() + ">"
    } else if (typeof v === "string") {
      shown = v.length > 110 ? v.slice(0, 110) + " …(" + v.length + " chars)" : v
    } else {
      shown = JSON.stringify(v)
    }
    console.log("  %s (%s): %s", k, Array.isArray(v) ? "array" : typeof v, shown)
  }
  console.log("\ncategories in use:",
    JSON.stringify([...new Set(docs.map((d) => d.category))]))
  console.log("statuses in use:",
    JSON.stringify([...new Set(docs.map((d) => d.status))]))
  console.log("authors in use:",
    JSON.stringify([...new Set(docs.map((d) => d.author))].slice(0, 6)))
  console.log("countries in use:",
    JSON.stringify([...new Set(docs.map((d) => d.country))].slice(0, 20)))
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
