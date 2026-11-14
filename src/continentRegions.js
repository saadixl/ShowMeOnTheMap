/**
 * ISO 3166-1 alpha-2 → continent id for Natural Earth 110m countries dataset.
 * Transcontinental states use a single assignment (e.g. RU → europe, TR → asia).
 */

/** @typedef {{ id: string, label: string, note: string }} ContinentOption */

/** @type {readonly ContinentOption[]} */
export const CONTINENT_OPTIONS = [
  {
    id: 'africa',
    label: 'Africa',
    note: 'African continent — simplified mapping',
  },
  {
    id: 'asia',
    label: 'Asia',
    note: 'Asian continent — simplified mapping',
  },
  {
    id: 'europe',
    label: 'Europe',
    note: 'European continent — simplified mapping',
  },
  {
    id: 'north-america',
    label: 'North America',
    note: 'Including Caribbean and Central America',
  },
  {
    id: 'south-america',
    label: 'South America',
    note: 'South American continent',
  },
  {
    id: 'oceania',
    label: 'Oceania',
    note: 'Australia, NZ, and Pacific states in dataset',
  },
  {
    id: 'antarctica',
    label: 'Antarctica',
    note: 'Antarctic treaty area in dataset',
  },
]

/** @type {Readonly<Record<string, string>>} */
export const ALPHA2_TO_CONTINENT = /** @type {const} */ ({
  AE: 'asia',
  AF: 'asia',
  AL: 'europe',
  AM: 'asia',
  AO: 'africa',
  AQ: 'antarctica',
  AR: 'south-america',
  AT: 'europe',
  AU: 'oceania',
  AZ: 'asia',
  BA: 'europe',
  BD: 'asia',
  BE: 'europe',
  BF: 'africa',
  BG: 'europe',
  BI: 'africa',
  BJ: 'africa',
  BN: 'asia',
  BO: 'south-america',
  BR: 'south-america',
  BS: 'north-america',
  BT: 'asia',
  BW: 'africa',
  BY: 'europe',
  BZ: 'north-america',
  CA: 'north-america',
  CD: 'africa',
  CF: 'africa',
  CG: 'africa',
  CH: 'europe',
  CI: 'africa',
  CL: 'south-america',
  CM: 'africa',
  CN: 'asia',
  CO: 'south-america',
  CR: 'north-america',
  CU: 'north-america',
  CY: 'asia',
  CZ: 'europe',
  DE: 'europe',
  DJ: 'africa',
  DK: 'europe',
  DO: 'north-america',
  DZ: 'africa',
  EC: 'south-america',
  EE: 'europe',
  EG: 'africa',
  EH: 'africa',
  ER: 'africa',
  ES: 'europe',
  ET: 'africa',
  FI: 'europe',
  FJ: 'oceania',
  FK: 'south-america',
  FR: 'europe',
  GA: 'africa',
  GB: 'europe',
  GE: 'asia',
  GH: 'africa',
  GL: 'north-america',
  GM: 'africa',
  GN: 'africa',
  GQ: 'africa',
  GR: 'europe',
  GT: 'north-america',
  GW: 'africa',
  GY: 'south-america',
  HN: 'north-america',
  HR: 'europe',
  HT: 'north-america',
  HU: 'europe',
  ID: 'asia',
  IE: 'europe',
  IL: 'asia',
  IN: 'asia',
  IQ: 'asia',
  IR: 'asia',
  IS: 'europe',
  IT: 'europe',
  JM: 'north-america',
  JO: 'asia',
  JP: 'asia',
  KE: 'africa',
  KG: 'asia',
  KH: 'asia',
  KP: 'asia',
  KR: 'asia',
  KW: 'asia',
  KZ: 'asia',
  LA: 'asia',
  LB: 'asia',
  LK: 'asia',
  LR: 'africa',
  LS: 'africa',
  LT: 'europe',
  LU: 'europe',
  LV: 'europe',
  LY: 'africa',
  MA: 'africa',
  MD: 'europe',
  ME: 'europe',
  MG: 'africa',
  MK: 'europe',
  ML: 'africa',
  MM: 'asia',
  MN: 'asia',
  MR: 'africa',
  MW: 'africa',
  MX: 'north-america',
  MY: 'asia',
  MZ: 'africa',
  NA: 'africa',
  NC: 'oceania',
  NE: 'africa',
  NG: 'africa',
  NI: 'north-america',
  NL: 'europe',
  NO: 'europe',
  NP: 'asia',
  NZ: 'oceania',
  OM: 'asia',
  PA: 'north-america',
  PE: 'south-america',
  PG: 'oceania',
  PH: 'asia',
  PK: 'asia',
  PL: 'europe',
  PR: 'north-america',
  PS: 'asia',
  PT: 'europe',
  PY: 'south-america',
  QA: 'asia',
  RO: 'europe',
  RS: 'europe',
  RU: 'europe',
  RW: 'africa',
  SA: 'asia',
  SB: 'oceania',
  SD: 'africa',
  SE: 'europe',
  SI: 'europe',
  SK: 'europe',
  SL: 'africa',
  SN: 'africa',
  SO: 'africa',
  SR: 'south-america',
  SS: 'africa',
  SV: 'north-america',
  SY: 'asia',
  SZ: 'africa',
  TD: 'africa',
  TF: 'oceania',
  TG: 'africa',
  TH: 'asia',
  TJ: 'asia',
  TL: 'asia',
  TM: 'asia',
  TN: 'africa',
  TR: 'asia',
  TT: 'north-america',
  TW: 'asia',
  TZ: 'africa',
  UA: 'europe',
  UG: 'africa',
  US: 'north-america',
  UY: 'south-america',
  UZ: 'asia',
  VE: 'south-america',
  VN: 'asia',
  VU: 'oceania',
  YE: 'asia',
  ZA: 'africa',
  ZM: 'africa',
  ZW: 'africa',
})

/**
 * @param {string} id
 * @returns {ContinentOption | null}
 */
export function getContinentOption(id) {
  const found = CONTINENT_OPTIONS.find((o) => o.id === id)
  return found ?? null
}

/** Default map zoom when this continent overlay is selected (clamped in UI). */
export const CONTINENT_DEFAULT_ZOOM = /** @type {const} */ ({
  africa: 2.12,
  asia: 2.12,
  europe: 2.5,
  'north-america': 2.2,
  'south-america': 2.2,
  oceania: 2.5,
  antarctica: 2.2,
})

/**
 * @param {string} id
 */
export function getContinentDefaultZoom(id) {
  const z = CONTINENT_DEFAULT_ZOOM[id]
  return typeof z === 'number' ? z : 1.05
}

/**
 * @param {string | null | undefined} alpha2
 * @param {string} continentId
 */
export function countryInContinent(alpha2, continentId) {
  if (!alpha2) {
    return false
  }
  return ALPHA2_TO_CONTINENT[alpha2] === continentId
}
