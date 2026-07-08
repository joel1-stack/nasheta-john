import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

let _app: any = null
let _db: any = null
let _auth: any = null

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

function initFirebase() {
  if (typeof window === "undefined") return
  if (_app) return
  if (!firebaseConfig.apiKey) return
  try {
    _app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
    _db = getFirestore(_app)
    _auth = getAuth(_app)
  } catch (e) {
    console.error("Firebase init error:", e)
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
