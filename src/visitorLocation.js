import { geoArea, geoContains } from 'd3-geo'
import { numericToAlpha2 } from 'i18n-iso-countries'
import { countriesGeo } from './countriesGeo.js'

function featureAlpha2(feature) {
  const numericId = feature.id != null ? String(feature.id) : ''
  const numIso = Number.parseInt(numericId, 10)
  return Number.isFinite(numIso) ? numericToAlpha2(numIso) : null
}

/**
 * @param {number} lon
 * @param {number} lat
 * @returns {string | null} uppercased ISO alpha-2
 */
export function findAlpha2ForCoordinates(lon, lat) {
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
    return null
  }
  const point = /** @type {[number, number]} */ ([lon, lat])
  /** Prefer the smallest polygon that contains the point so enclaves and small states win over simplified neighbors (e.g. Singapore vs Malaysia). */
  let bestAlpha2 = /** @type {string | null} */ (null)
  let bestArea = Infinity
  for (const feature of countriesGeo.features) {
    try {
      if (!geoContains(feature, point)) {
        continue
      }
      const a2 = featureAlpha2(feature)
      if (!a2) {
        continue
      }
      const area = geoArea(feature)
      if (area < bestArea) {
        bestArea = area
        bestAlpha2 = String(a2).toUpperCase()
      }
    } catch {
      /* invalid geometry for contains */
    }
  }
  return bestAlpha2
}

/**
 * @typedef {'ok' | 'no-country' | 'denied' | 'error' | 'unsupported'} VisitorGeolocationReason
 */

/**
 * Request browser geolocation (call from a button tap for clearer permission UX).
 * @param {(alpha2: string | null, reason: VisitorGeolocationReason) => void} onResolved
 */
export function requestVisitorGeolocation(onResolved) {
  if (typeof window === 'undefined') {
    onResolved(null, 'unsupported')
    return
  }
  if (!navigator.geolocation) {
    onResolved(null, 'unsupported')
    return
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const a2 = findAlpha2ForCoordinates(
        pos.coords.longitude,
        pos.coords.latitude,
      )
      onResolved(a2, a2 ? 'ok' : 'no-country')
    },
    (err) => {
      const denied = err && /** @type {GeolocationPositionError} */ (err).code === 1
      onResolved(null, denied ? 'denied' : 'error')
    },
    {
      maximumAge: 86_400_000,
      timeout: 15_000,
      enableHighAccuracy: false,
    },
  )
}
