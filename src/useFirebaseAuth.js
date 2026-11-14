import { useCallback, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { firebaseApp } from './firebase.js'

function getAuthIfReady() {
  return firebaseApp ? getAuth(firebaseApp) : null
}

/**
 * Google sign-in state and actions. No-ops when Firebase env is not configured.
 */
export function useFirebaseAuth() {
  const [user, setUser] = useState(/** @type {import('firebase/auth').User | null} */ (null))
  const [ready, setReady] = useState(() => firebaseApp == null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(/** @type {string | null} */ (null))

  useEffect(() => {
    if (!firebaseApp) {
      return undefined
    }
    const auth = getAuth(firebaseApp)
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setReady(true)
    })
    return () => unsub()
  }, [])

  const loginWithGoogle = useCallback(async () => {
    const auth = getAuthIfReady()
    if (!auth) {
      setError('Sign-in is not configured.')
      return
    }
    setError(null)
    setBusy(true)
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      await signInWithPopup(auth, provider)
    } catch (e) {
      const code = e && typeof e === 'object' && 'code' in e ? String(e.code) : ''
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError(null)
      } else {
        const msg =
          e && typeof e === 'object' && 'message' in e && typeof e.message === 'string'
            ? e.message
            : 'Sign-in failed.'
        setError(msg)
      }
    } finally {
      setBusy(false)
    }
  }, [])

  const logout = useCallback(async () => {
    const auth = getAuthIfReady()
    if (!auth) return
    setError(null)
    setBusy(true)
    try {
      await firebaseSignOut(auth)
    } catch (e) {
      const msg =
        e && typeof e === 'object' && 'message' in e && typeof e.message === 'string'
          ? e.message
          : 'Sign out failed.'
      setError(msg)
    } finally {
      setBusy(false)
    }
  }, [])

  return {
    user,
    ready,
    busy,
    error,
    loginWithGoogle,
    logout,
    configured: firebaseApp != null,
  }
}
