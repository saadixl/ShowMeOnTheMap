import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const canInit =
  typeof firebaseConfig.apiKey === 'string' &&
  firebaseConfig.apiKey.length > 0 &&
  typeof firebaseConfig.projectId === 'string' &&
  firebaseConfig.projectId.length > 0 &&
  typeof firebaseConfig.appId === 'string' &&
  firebaseConfig.appId.length > 0

/** @type {import('firebase/app').FirebaseApp | null} */
export const firebaseApp = canInit ? initializeApp(firebaseConfig) : null

/** Resolved after {@link initFirebaseAnalytics}; use for logEvent etc. */
/** @type {import('firebase/analytics').Analytics | null} */
export let analytics = null

/**
 * Call once from the client entry (e.g. main.jsx). No-ops if config is missing
 * or Analytics is not supported (SSR, blocked cookies, etc.).
 */
export async function initFirebaseAnalytics() {
  if (!firebaseApp || typeof window === 'undefined') {
    return null
  }
  const supported = await isSupported()
  if (!supported) {
    return null
  }
  try {
    analytics = getAnalytics(firebaseApp)
    return analytics
  } catch {
    return null
  }
}
