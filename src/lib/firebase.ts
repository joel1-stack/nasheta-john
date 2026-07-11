import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "./firebaseConfig"

let _app: any = null
let _db: any = null
let _auth: any = null
let _initAttempted = false

function initFirebase() {
  if (_initAttempted) return
  _initAttempted = true
  if (typeof window === "undefined") return
  if (!firebaseConfig.apiKey) { console.warn("Firebase: no API key"); return }
  try {
    _app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
    _db = getFirestore(_app)
  } catch (e) {
    console.error("Firebase init error (db):", e)
  }
  try {
    _auth = getAuth(_app)
  } catch (e) {
    console.error("Firebase init error (auth):", e)
  }
}

export function getDb() {
  initFirebase()
  return _db
}

export function getAuthInstance() {
  initFirebase()
  return _auth
}
