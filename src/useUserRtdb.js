/* eslint-disable react-hooks/set-state-in-effect -- RTDB listener + reset when uid scope changes */
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { getDatabase, onValue, ref, remove, update } from 'firebase/database'
import { firebaseApp } from './firebase.js'

const LEGACY_VISITOR_COUNTRY_KEY = 'visitor-alpha2'

/** One DB instance per app — avoids repeated getDatabase() on writes. */
let cachedDb = null
function getDb() {
  if (!firebaseApp) return null
  if (!cachedDb) cachedDb = getDatabase(firebaseApp)
  return cachedDb
}

/**
 * @param {unknown} v Value at `/users/<uid>`
 * @returns {{
 *   visitorCountryCode: string | null,
 *   bannerDismissed: boolean,
 *   visitedCodes: readonly string[],
 * }}
 */
function parseUserSnapshot(v) {
  let visitorCountryCode = null
  let bannerDismissed = false
  /** @type {string[]} */
  const visitedCodes = []

  if (!v || typeof v !== 'object' || Array.isArray(v)) {
    return { visitorCountryCode, bannerDismissed, visitedCodes }
  }

  const raw = v['visitor-country-code'] ?? v[LEGACY_VISITOR_COUNTRY_KEY]
  if (typeof raw === 'string' && /^[A-Z]{2}$/i.test(raw)) {
    visitorCountryCode = String(raw).toUpperCase()
  }

  bannerDismissed = v['location-banner-dismissed'] === true

  const visitedObj = v['visited-countries']
  if (visitedObj && typeof visitedObj === 'object' && !Array.isArray(visitedObj)) {
    for (const k of Object.keys(visitedObj)) {
      const u = String(k).toUpperCase()
      if (/^[A-Z]{2}$/.test(u)) {
        visitedCodes.push(u)
      }
    }
  }
  visitedCodes.sort()

  return { visitorCountryCode, bannerDismissed, visitedCodes }
}

/**
 * Single RTDB subscription to `/users/<uid>` for visitor country, banner prefs,
 * and visited countries — avoids duplicate listeners on overlapping paths.
 *
 * @param {import('firebase/auth').User | null} user
 */
export function useUserRtdb(user) {
  const uid = user?.uid ?? null

  const [visitorCountryCode, setVisitorCountryCode] = useState(
    /** @type {string | null} */ (null),
  )
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [visitedCodes, setVisitedCodes] = useState(
    /** @type {readonly string[]} */ ([]),
  )
  const [loading, setLoading] = useState(() => Boolean(uid && firebaseApp))
  const [error, setError] = useState(/** @type {string | null} */ (null))

  const visitedSet = useMemo(() => new Set(visitedCodes), [visitedCodes])

  useLayoutEffect(() => {
    if (!uid || !firebaseApp) {
      return
    }
    setLoading(true)
  }, [uid])

  useEffect(() => {
    if (!uid || !firebaseApp) {
      const t = globalThis.setTimeout(() => {
        setVisitorCountryCode(null)
        setBannerDismissed(false)
        setVisitedCodes([])
        setLoading(false)
        setError(null)
      }, 0)
      return () => globalThis.clearTimeout(t)
    }

    setLoading(true)
    const db = getDb()
    const rUser = ref(db, `users/${uid}`)
    const unsub = onValue(
      rUser,
      (snap) => {
        const parsed = parseUserSnapshot(snap.val())
        setVisitorCountryCode(parsed.visitorCountryCode)
        setBannerDismissed(parsed.bannerDismissed)
        setVisitedCodes(parsed.visitedCodes)
        setLoading(false)
        setError(null)
      },
      (err) => {
        setError(err?.message ?? 'Failed to load account data.')
        setLoading(false)
      },
    )

    return () => unsub()
  }, [uid])

  const saveVisitorCountryCode = useCallback(
    async (alpha2) => {
      if (!uid) return
      const db = getDb()
      if (!db) return
      const code = String(alpha2).toUpperCase()
      if (!/^[A-Z]{2}$/.test(code)) return
      await update(ref(db, `users/${uid}`), {
        'visitor-country-code': code,
        [LEGACY_VISITOR_COUNTRY_KEY]: null,
        'location-banner-dismissed': null,
      })
    },
    [uid],
  )

  const saveBannerDismissed = useCallback(async () => {
    if (!uid) return
    const db = getDb()
    if (!db) return
    await update(ref(db, `users/${uid}`), {
      'location-banner-dismissed': true,
    })
  }, [uid])

  const clearVisitorCountryCode = useCallback(async () => {
    if (!uid) return
    const db = getDb()
    if (!db) return
    await update(ref(db, `users/${uid}`), {
      'visitor-country-code': null,
      [LEGACY_VISITOR_COUNTRY_KEY]: null,
    })
  }, [uid])

  const addCountry = useCallback(
    async (alpha2) => {
      if (!uid) return
      const db = getDb()
      if (!db) return
      const code = String(alpha2).toUpperCase()
      if (!/^[A-Z]{2}$/.test(code)) return
      await update(ref(db, `users/${uid}/visited-countries`), {
        [code]: true,
      })
    },
    [uid],
  )

  const removeCountry = useCallback(
    async (alpha2) => {
      if (!uid) return
      const db = getDb()
      if (!db) return
      const code = String(alpha2).toUpperCase()
      await remove(ref(db, `users/${uid}/visited-countries/${code}`))
    },
    [uid],
  )

  return {
    visitorCountryCode,
    bannerDismissed,
    visitedCodes,
    visitedSet,
    loading,
    error,
    saveVisitorCountryCode,
    saveBannerDismissed,
    clearVisitorCountryCode,
    addCountry,
    removeCountry,
  }
}
