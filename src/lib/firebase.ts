import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { firebaseConfig } from "./firebaseConfig"

let _app: any = null
let _db: any = null
let _auth: any = null
let _storage: any = null
let _initAttempted = false
let _authAttempted = false
let _storageAttempted = false

// Public pages only ever read Firestore. Auth and Storage start on first use,
// so readers do not download the Firebase Auth iframe script (about 90 KB and
// main-thread time) just to see an article. Only the CMS asks for them.
function initFirebase() {
  if (_initAttempted) return
  _initAttempted = true
  if (!firebaseConfig.apiKey) { console.warn("Firebase: no API key"); return }
  try {
    _app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
    _db = getFirestore(_app)
  } catch (e) {
    console.error("Firebase init error (db):", e)
  }
}

export function getDb() {
  initFirebase()
  return _db
}

export function getAuthInstance() {
  initFirebase()
  if (!_authAttempted && _app) {
    _authAttempted = true
    try {
      _auth = getAuth(_app)
    } catch (e) {
      console.error("Firebase init error (auth):", e)
    }
  }
  return _auth
}

export function getStorageInstance() {
  initFirebase()
  if (!_storageAttempted && _app) {
    _storageAttempted = true
    try {
      _storage = getStorage(_app)
    } catch (e) {
      console.error("Firebase init error (storage):", e)
    }
  }
  return _storage
}
