/**
 * ISO 3166-1 alpha-2 sets for simplified “majority or large national tradition” religion overlays.
 * Many countries are plural; borders ≠ theology; for visualization only.
 */

/**
 * @typedef {{ id: string, label: string, note: string }} ReligionOption
 */

/** @type {readonly ReligionOption[]} */
export const RELIGION_OPTIONS = [
  {
    id: 'christianity',
    label: 'Christianity',
    note: 'Majority Christian tradition (very broad)',
  },
  {
    id: 'islam',
    label: 'Islam',
    note: 'Majority Muslim tradition (very broad)',
  },
  {
    id: 'hinduism',
    label: 'Hinduism',
    note: 'Majority Hindu tradition',
  },
  {
    id: 'buddhism',
    label: 'Buddhism',
    note: 'Majority Buddhist tradition',
  },
  {
    id: 'judaism',
    label: 'Judaism',
    note: 'Jewish-majority state / primary map use',
  },
  {
    id: 'sikhism',
    label: 'Sikhism',
    note: 'Majority Sikh tradition (mainly Punjab region → India)',
  },
]

/**
 * @param {string} id
 * @returns {ReligionOption | null}
 */
export function getReligionOption(id) {
  const found = RELIGION_OPTIONS.find((o) => o.id === id)
  return found ?? null
}

export const RELIGION_DEFAULT_ZOOM = /** @type {const} */ ({
  christianity: 1.05,
  islam: 2.09,
  hinduism: 4.05,
  buddhism: 3.1,
  judaism: 5.8,
  sikhism: 4.1,
})

/**
 * @param {string} id
 */
export function getReligionDefaultZoom(id) {
  const z = RELIGION_DEFAULT_ZOOM[id]
  return typeof z === 'number' ? z : 1.38
}

/** Majority / plurality Christian (simplified global set). */
const CHRISTIANITY_A2 = [
  'US',
  'CA',
  'MX',
  'GT',
  'HN',
  'SV',
  'NI',
  'CR',
  'PA',
  'CU',
  'DO',
  'JM',
  'TT',
  'BB',
  'BS',
  'BZ',
  'AR',
  'BO',
  'CL',
  'CO',
  'EC',
  'PE',
  'VE',
  'UY',
  'PY',
  'BR',
  'GY',
  'GF',
  'GB',
  'IE',
  'FR',
  'DE',
  'IT',
  'ES',
  'PT',
  'NL',
  'BE',
  'CH',
  'AT',
  'SE',
  'NO',
  'DK',
  'FI',
  'IS',
  'PL',
  'CZ',
  'SK',
  'HU',
  'RO',
  'BG',
  'GR',
  'CY',
  'MT',
  'SI',
  'HR',
  'RS',
  'ME',
  'MK',
  'EE',
  'LV',
  'LT',
  'UA',
  'MD',
  'GE',
  'AM',
  'PH',
  'AU',
  'NZ',
  'PG',
  'FJ',
  'SB',
  'VU',
  'WS',
  'TO',
  'KI',
  'TV',
  'NR',
  'PW',
  'MH',
  'FM',
  'ZA',
  'NG',
  'KE',
  'GH',
  'UG',
  'TZ',
  'ZW',
  'BW',
  'NA',
  'LS',
  'SZ',
  'MW',
  'RW',
  'SS',
  'ET',
  'ER',
  'CD',
  'AO',
  'MZ',
  'MG',
  'CM',
  'GA',
  'GQ',
  'ST',
  'CV',
  'TL',
  'KR',
]

/** Majority Muslim (simplified; many secular states included). */
const ISLAM_A2 = [
  'SA',
  'YE',
  'OM',
  'AE',
  'QA',
  'BH',
  'KW',
  'IQ',
  'IR',
  'SY',
  'LB',
  'JO',
  'PS',
  'EG',
  'LY',
  'TN',
  'DZ',
  'MA',
  'SD',
  'SO',
  'DJ',
  'MR',
  'KM',
  'TD',
  'ER',
  'NE',
  'ML',
  'SN',
  'GM',
  'GN',
  'GW',
  'BF',
  'CI',
  'NG',
  'AF',
  'PK',
  'BD',
  'MV',
  'MY',
  'BN',
  'ID',
  'UZ',
  'TJ',
  'TM',
  'KG',
  'KZ',
  'AZ',
  'TR',
  'AL',
  'BA',
  'XK',
]

const HINDUISM_A2 = ['IN', 'NP', 'MU']

const BUDDHISM_A2 = [
  'TH',
  'MM',
  'KH',
  'LA',
  'LK',
  'BT',
  'MN',
  'JP',
  'TW',
  'VN',
  'SG',
  'KR',
]

const JUDAISM_A2 = ['IL']

const SIKHISM_A2 = ['IN']

function toSet(list) {
  return new Set(list.map((c) => c.toUpperCase()))
}

const SETS = {
  christianity: toSet([...new Set(CHRISTIANITY_A2)]),
  islam: toSet(ISLAM_A2),
  hinduism: toSet(HINDUISM_A2),
  buddhism: toSet(BUDDHISM_A2),
  judaism: toSet(JUDAISM_A2),
  sikhism: toSet(SIKHISM_A2),
}

/**
 * @param {string | null | undefined} alpha2
 * @param {string | null | undefined} religionId
 */
export function countryInReligion(alpha2, religionId) {
  if (!religionId || !alpha2) {
    return false
  }
  const set = SETS[religionId]
  if (!set) {
    return false
  }
  return set.has(String(alpha2).toUpperCase())
}
