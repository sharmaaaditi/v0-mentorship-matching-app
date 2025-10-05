import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

// Keep config on the client with NEXT_PUBLIC_ keys (safe to expose for Firebase web SDK)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  // measurementId optional
}

let app: FirebaseApp
let auth: Auth
let db: Firestore

function ensureConfig(obj: Record<string, string | undefined>) {
  for (const [k, v] of Object.entries(obj)) {
    if (!v) {
      throw new Error(`[Firebase] Missing env var: ${k}`)
    }
  }
}
ensureConfig(firebaseConfig)

if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

auth = getAuth(app)
db = getFirestore(app)

export { app, auth, db }
