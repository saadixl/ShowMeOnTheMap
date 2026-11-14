import { getCountryDisplayName, MAP_ALPHA2_CODES_SORTED } from './countryCatalog.js'

/**
 * Short educational list of countries often described as spanning more than one
 * continental region (definitions vary). Only codes present on our map GeoJSON.
 */
const TRANSCONTINENTAL_RAW = [
  { alpha2: 'RU', note: 'Europe & Asia' },
  { alpha2: 'KZ', note: 'Europe & Asia' },
  { alpha2: 'TR', note: 'Europe & Asia' },
  { alpha2: 'AZ', note: 'Europe & Asia' },
  { alpha2: 'GE', note: 'Europe & Asia' },
  { alpha2: 'EG', note: 'Africa & Asia' },
  { alpha2: 'ID', note: 'Asia & Oceania' },
  { alpha2: 'US', note: 'North America & Oceania' },
  { alpha2: 'PG', note: 'Asia & Oceania' },
  { alpha2: 'PA', note: 'North & South America' },
  { alpha2: 'CL', note: 'Americas & Oceania' },
  { alpha2: 'DK', note: 'Europe & North America' },
  { alpha2: 'EC', note: 'South America & Oceania' },
]

/** Default zoom when only transcontinental highlights are active. */
export const TRANSCONTINENTAL_DEFAULT_ZOOM = 1.15

/** @type {ReadonlyArray<{ id: string, label: string, note: string }>} */
export const TRANSCONTINENTAL_OPTIONS = TRANSCONTINENTAL_RAW.filter((o) =>
  MAP_ALPHA2_CODES_SORTED.includes(o.alpha2),
).map((o) => ({
  id: o.alpha2,
  label: getCountryDisplayName(o.alpha2),
  note: o.note,
}))

/** @type {ReadonlySet<string>} */
export const TRANSCONTINENTAL_IDS = new Set(
  TRANSCONTINENTAL_OPTIONS.map((o) => o.id),
)

/**
 * @param {string | null | undefined} alpha2
 * @param {boolean} overlayOn
 */
export function countryMatchesTranscontinental(alpha2, overlayOn) {
  if (!overlayOn || !alpha2) {
    return false
  }
  const u = String(alpha2).toUpperCase()
  return TRANSCONTINENTAL_IDS.has(u)
}
