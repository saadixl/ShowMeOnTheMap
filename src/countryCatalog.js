import { getName, numericToAlpha2, registerLocale } from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { countriesGeo } from './countriesGeo.js'

registerLocale(enLocale)

/** Uppercase ISO alpha-2 codes present on the map, sorted by English name. */
export const MAP_ALPHA2_CODES_SORTED = (() => {
  const s = new Set()
  for (const f of countriesGeo.features) {
    const numericId = f.id != null ? String(f.id) : ''
    const numIso = Number.parseInt(numericId, 10)
    const a2 = Number.isFinite(numIso) ? numericToAlpha2(numIso) : null
    if (a2) {
      s.add(String(a2).toUpperCase())
    }
  }
  return [...s].sort((a, b) => {
    const na = getName(a, 'en') ?? a
    const nb = getName(b, 'en') ?? b
    return na.localeCompare(nb, 'en')
  })
})()

/**
 * @param {string} alpha2Upper
 */
export function getCountryDisplayName(alpha2Upper) {
  const u = String(alpha2Upper).toUpperCase()
  return getName(u, 'en') ?? u
}
