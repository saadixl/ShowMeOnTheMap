/**
 * ISO 3166-1 alpha-2 sets for “where this language has major official or national use”.
 * Simplified; multilingual countries may appear under several languages.
 */

/**
 * @typedef {{ id: string, label: string, note: string }} LanguageOption
 */

/** @type {readonly LanguageOption[]} */
export const LANGUAGE_OPTIONS = [
  {
    id: 'english',
    label: 'English',
    note: 'Major official or national use',
  },
  {
    id: 'mandarin',
    label: 'Mandarin (Chinese)',
    note: 'Standard Chinese, major official use',
  },
  {
    id: 'hindi',
    label: 'Hindi',
    note: 'Major official use (India)',
  },
  {
    id: 'spanish',
    label: 'Spanish',
    note: 'Major official use',
  },
  {
    id: 'french',
    label: 'French',
    note: 'Major official use',
  },
  {
    id: 'arabic',
    label: 'Arabic',
    note: 'Major official use',
  },
  {
    id: 'bengali',
    label: 'Bengali',
    note: 'Bangladesh & large communities',
  },
]

/**
 * @param {string} id
 * @returns {LanguageOption | null}
 */
export function getLanguageOption(id) {
  const found = LANGUAGE_OPTIONS.find((o) => o.id === id)
  return found ?? null
}

/** Default map zoom when this language overlay is selected (clamped in UI). */
export const LANGUAGE_DEFAULT_ZOOM = /** @type {const} */ ({
  english: 1.02,
  mandarin: 3.15,
  hindi: 4.1,
  spanish: 1.12,
  french: 1.35,
  arabic: 2.75,
  bengali: 4.05,
})

/**
 * @param {string} id
 */
export function getLanguageDefaultZoom(id) {
  const z = LANGUAGE_DEFAULT_ZOOM[id]
  return typeof z === 'number' ? z : 1.38
}

/** Major English use at state level (official, co-official, or dominant). */
const ENGLISH_A2 = [
  'US',
  'GB',
  'IE',
  'CA',
  'AU',
  'NZ',
  'ZA',
  'JM',
  'TT',
  'BB',
  'BS',
  'BZ',
  'GY',
  'SG',
  'PH',
  'IN',
  'PK',
  'NG',
  'KE',
  'UG',
  'TZ',
  'ZW',
  'BW',
  'NA',
  'LS',
  'SZ',
  'GH',
  'LR',
  'SL',
  'GM',
  'RW',
  'MW',
  'SS',
  'FJ',
  'SB',
  'KI',
  'TV',
  'NR',
  'PW',
  'MH',
  'FM',
  'VU',
  'AG',
  'DM',
  'GD',
  'KN',
  'LC',
  'VC',
  'MS',
  'KY',
  'BM',
  'MT',
  'CY',
]

const MANDARIN_A2 = ['CN', 'TW', 'SG']

const HINDI_A2 = ['IN']

const SPANISH_A2 = [
  'ES',
  'MX',
  'GT',
  'HN',
  'SV',
  'NI',
  'CR',
  'PA',
  'CU',
  'DO',
  'AR',
  'BO',
  'CL',
  'CO',
  'EC',
  'PY',
  'PE',
  'UY',
  'VE',
  'GQ',
]

const FRENCH_A2 = [
  'FR',
  'BE',
  'LU',
  'MC',
  'CH',
  'CA',
  'SN',
  'CI',
  'ML',
  'BF',
  'NE',
  'TD',
  'CM',
  'CF',
  'GA',
  'CG',
  'CD',
  'DJ',
  'KM',
  'SC',
  'MU',
  'MG',
  'HT',
  'BI',
  'RW',
  'BJ',
  'TG',
  'GN',
  'MR',
  'TN',
  'DZ',
  'MA',
  'VU',
  'NC',
  'PF',
]

const ARABIC_A2 = [
  'SA',
  'YE',
  'OM',
  'AE',
  'QA',
  'BH',
  'KW',
  'IQ',
  'SY',
  'LB',
  'JO',
  'PS',
  'EG',
  'DZ',
  'MA',
  'TN',
  'LY',
  'SD',
  'SO',
  'DJ',
  'MR',
  'KM',
  'TD',
  'ER',
]

const BENGALI_A2 = ['BD', 'IN']

function toSet(list) {
  return new Set(list.map((c) => c.toUpperCase()))
}

const SETS = {
  english: toSet(ENGLISH_A2),
  mandarin: toSet(MANDARIN_A2),
  hindi: toSet(HINDI_A2),
  spanish: toSet(SPANISH_A2),
  french: toSet(FRENCH_A2),
  arabic: toSet(ARABIC_A2),
  bengali: toSet(BENGALI_A2),
}

/**
 * @param {string | null | undefined} alpha2
 * @param {string | null | undefined} languageId
 */
export function countryInLanguage(alpha2, languageId) {
  if (!languageId || !alpha2) {
    return false
  }
  const set = SETS[languageId]
  if (!set) {
    return false
  }
  return set.has(String(alpha2).toUpperCase())
}
