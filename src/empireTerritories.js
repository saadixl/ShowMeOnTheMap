/**
 * ISO 3166-1 alpha-2 sets for simplified “maximum extent” style overlays.
 * Modern borders ≠ historical boundaries; for map visualization only.
 */

/**
 * @typedef {{ id: string, label: string, years: string }} EmpireOption
 */

/** @type {readonly EmpireOption[]} */
export const EMPIRE_OPTIONS = [
  {
    id: 'persian',
    label: 'Persian Empire',
    years: 'c. 550–330 BCE',
  },
  {
    id: 'rashidun',
    label: 'Rashidun Caliphate',
    years: '632–661 CE',
  },
  {
    id: 'umayyad',
    label: 'Umayyad Caliphate',
    years: '661–750 CE',
  },
  {
    id: 'abbasid',
    label: 'Abbasid Caliphate',
    years: '750–1258 CE',
  },
  {
    id: 'ottoman',
    label: 'Ottoman Empire',
    years: '1299–1922 CE',
  },
  {
    id: 'british',
    label: 'British Empire',
    years: 'c. 1583–1997 CE',
  },
  {
    id: 'mongol',
    label: 'Mongol Empire',
    years: '1206–1368 CE',
  },
  {
    id: 'roman',
    label: 'Roman Empire',
    years: '27 BCE – 476 CE',
  },
  {
    id: 'spanish',
    label: 'Spanish Empire',
    years: '1492–1976 CE',
  },
  {
    id: 'french',
    label: 'French Colonial Empire',
    years: 'c. 1534–1980 CE',
  },
  {
    id: 'byzantine',
    label: 'Byzantine Empire',
    years: '330–1453 CE',
  },
  {
    id: 'mughal',
    label: 'Mughal Empire',
    years: '1526–1857 CE',
  },
  {
    id: 'portuguese',
    label: 'Portuguese Empire',
    years: 'c. 1415–1999 CE',
  },
  {
    id: 'dutch',
    label: 'Dutch Empire',
    years: 'c. 1602–1975 CE',
  },
]

/**
 * @param {string} id
 * @returns {EmpireOption | null}
 */
export function getEmpireOption(id) {
  const found = EMPIRE_OPTIONS.find((o) => o.id === id)
  return found ?? null
}

/** Default map zoom (×) when this empire overlay is selected (clamped in UI). */
export const EMPIRE_DEFAULT_ZOOM = /** @type {const} */ ({
  persian: 3.15,
  rashidun: 3.73,
  umayyad: 3.25,
  abbasid: 3.37,
  ottoman: 3.73,
  british: 1,
  mongol: 2.33,
  roman: 2.8,
  spanish: 1,
  french: 1.35,
  byzantine: 2.8,
  mughal: 3.5,
  portuguese: 1,
  dutch: 1,
})

/**
 * @param {string} id
 */
export function getEmpireDefaultZoom(id) {
  const z = EMPIRE_DEFAULT_ZOOM[id]
  return typeof z === 'number' ? z : 1.38
}

/** Achaemenid core + satrapies → modern states (very approximate). */
const PERSIAN_A2 = [
  'IR',
  'IQ',
  'TR',
  'SY',
  'LB',
  'JO',
  'PS',
  'IL',
  'EG',
  'CY',
  'LY',
  'TN',
  'AF',
  'PK',
  'TM',
  'UZ',
  'TJ',
  'KG',
  'KZ',
  'SA',
  'AE',
  'OM',
  'YE',
  'BH',
  'KW',
  'QA',
  'GE',
  'AM',
  'AZ',
  'GR',
  'BG',
]

/** ~632–661: Arabia, Levant, Mesopotamia, Persia, Egypt, parts of Libya. */
const RASHIDUN_A2 = [
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
  'IL',
  'EG',
  'LY',
  'IR',
  'AF',
  'TR',
  'CY',
]

/** ~661–750: adds Al-Andalus, Maghrib, Transoxiana, Sindh (PK). */
const UMAYYAD_A2 = [
  ...RASHIDUN_A2,
  'TN',
  'DZ',
  'MA',
  'ES',
  'PT',
  'SD',
  'TM',
  'UZ',
  'TJ',
  'KG',
  'KZ',
  'GE',
  'AM',
  'AZ',
  'PK',
]

/** ~750–1258: eastern caliphate; Iberia omitted (lost early); strong Iraq–Iran–Khurasan–river frontiers. */
const ABBASID_A2 = [
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
  'IL',
  'EG',
  'LY',
  'TN',
  'DZ',
  'MA',
  'IR',
  'AF',
  'TR',
  'CY',
  'PK',
  'TM',
  'UZ',
  'TJ',
  'KG',
  'KZ',
  'GE',
  'AM',
  'AZ',
  'SD',
]

const OTTOMAN_A2 = [
  'TR',
  'GR',
  'BG',
  'RS',
  'BA',
  'ME',
  'MK',
  'AL',
  'HR',
  'RO',
  'MD',
  'UA',
  'HU',
  'SK',
  'CY',
  'SY',
  'LB',
  'IL',
  'PS',
  'JO',
  'IQ',
  'SA',
  'KW',
  'BH',
  'QA',
  'AE',
  'OM',
  'YE',
  'EG',
  'LY',
  'TN',
  'DZ',
  'SD',
  'GE',
  'AM',
  'AZ',
]

/** Major territories / dominions / crown colonies (modern successor states). */
const BRITISH_A2 = [
  /* Europe */
  'GB',
  'IE',
  'MT',
  'CY',
  /* Africa */
  'EG',
  'SD',
  'SS',
  'KE',
  'UG',
  'TZ',
  'ZM',
  'ZW',
  'MW',
  'ZA',
  'NA',
  'BW',
  'LS',
  'SZ',
  'NG',
  'GH',
  'SL',
  'GM',
  'MU',
  'SC',
  'SO',
  'ER',
  /* Asia & Middle East */
  'IN',
  'PK',
  'BD',
  'LK',
  'MM',
  'MY',
  'SG',
  'BN',
  'MV',
  'IL',
  'PS',
  'JO',
  'IQ',
  'KW',
  'BH',
  'QA',
  'AE',
  'OM',
  'YE',
  /* Americas & Caribbean */
  'US',
  'CA',
  'JM',
  'BS',
  'BZ',
  'GY',
  'TT',
  'BB',
  'AG',
  'KN',
  'LC',
  'VC',
  'GD',
  'DM',
  /* Oceania */
  'AU',
  'NZ',
  'PG',
  'FJ',
  'SB',
  'VU',
  'TO',
  'WS',
  'TV',
  'KI',
  'NR',
]

const MONGOL_A2 = [
  'MN',
  'CN',
  'KP',
  'KR',
  'KZ',
  'KG',
  'UZ',
  'TJ',
  'TM',
  'AF',
  'IR',
  'IQ',
  'SY',
  'TR',
  'GE',
  'AM',
  'AZ',
  'RU',
  'BY',
  'UA',
  'MD',
  'PL',
  'SK',
  'HU',
  'RO',
  'BG',
]

/** Roman Empire at maximum extent under Trajan (~117 CE): Mediterranean, Western Europe, North Africa, Near East. */
const ROMAN_A2 = [
  /* Europe */
  'IT',
  'ES',
  'PT',
  'FR',
  'GB',
  'BE',
  'NL',
  'LU',
  'CH',
  'AT',
  'SI',
  'HR',
  'BA',
  'RS',
  'ME',
  'MK',
  'AL',
  'GR',
  'BG',
  'RO',
  'HU',
  /* North Africa */
  'EG',
  'LY',
  'TN',
  'DZ',
  'MA',
  /* Middle East */
  'TR',
  'CY',
  'SY',
  'LB',
  'IL',
  'PS',
  'JO',
  'IQ',
  'AM',
]

/** Spanish Empire at maximum extent (~16th–18th century): Americas, Philippines, parts of Europe & Africa. */
const SPANISH_A2 = [
  /* Europe */
  'ES',
  'PT',
  'NL',
  'BE',
  'LU',
  'IT',
  /* Americas */
  'MX',
  'GT',
  'HN',
  'SV',
  'NI',
  'CR',
  'PA',
  'CU',
  'DO',
  'HT',
  'JM',
  'TT',
  'CO',
  'VE',
  'EC',
  'PE',
  'BO',
  'CL',
  'AR',
  'PY',
  'UY',
  'US',
  /* Africa */
  'GQ',
  'EH',
  'MA',
  /* Asia & Oceania */
  'PH',
]

/** French Colonial Empire at maximum extent: Africa, Indochina, Levant mandates, Americas, Pacific. */
const FRENCH_A2 = [
  /* Europe */
  'FR',
  /* North Africa */
  'DZ',
  'TN',
  'MA',
  'MR',
  /* West Africa */
  'SN',
  'ML',
  'GN',
  'CI',
  'BF',
  'NE',
  'BJ',
  'TG',
  /* Central Africa */
  'TD',
  'CM',
  'CF',
  'GA',
  'CG',
  /* East Africa & Indian Ocean */
  'DJ',
  'KM',
  'MG',
  /* Asia (Indochina & Levant mandates) */
  'VN',
  'KH',
  'LA',
  'LB',
  'SY',
  /* Americas */
  'CA',
  'HT',
  /* Oceania */
  'VU',
  'NC',
]

/** Byzantine Empire at peak under Justinian I (~555 CE): Eastern Mediterranean, North Africa, Italy. */
const BYZANTINE_A2 = [
  /* Europe */
  'GR',
  'BG',
  'AL',
  'MK',
  'RS',
  'ME',
  'BA',
  'HR',
  'SI',
  'RO',
  'IT',
  'MT',
  /* North Africa */
  'EG',
  'LY',
  'TN',
  /* Middle East */
  'TR',
  'CY',
  'SY',
  'LB',
  'IL',
  'PS',
  'JO',
  'GE',
  'AM',
  /* Spain – small coastal strip */
  'ES',
]

/** Mughal Empire at peak under Aurangzeb (~1700 CE): Indian subcontinent. */
const MUGHAL_A2 = [
  'IN',
  'PK',
  'BD',
  'AF',
]

/** Portuguese Empire at maximum extent: Brazil, Africa, Indian Ocean, East Asia. */
const PORTUGUESE_A2 = [
  /* Europe */
  'PT',
  /* Americas */
  'BR',
  /* Africa */
  'AO',
  'MZ',
  'GW',
  'CV',
  'ST',
  /* Asia & Oceania */
  'TL',
  'LK',
  'IN',
  'MY',
]

/** Dutch Empire at maximum extent: East Indies, Southern Africa, Caribbean, Atlantic. */
const DUTCH_A2 = [
  /* Europe */
  'NL',
  'BE',
  'LU',
  /* Asia */
  'ID',
  'LK',
  'MY',
  'TW',
  /* Africa */
  'ZA',
  'GH',
  /* Americas */
  'SR',
  'GY',
]

function toSet(list) {
  return new Set(list.map((c) => c.toUpperCase()))
}

const SETS = {
  persian: toSet(PERSIAN_A2),
  rashidun: toSet(RASHIDUN_A2),
  umayyad: toSet(UMAYYAD_A2),
  abbasid: toSet(ABBASID_A2),
  ottoman: toSet(OTTOMAN_A2),
  british: toSet(BRITISH_A2),
  mongol: toSet(MONGOL_A2),
  roman: toSet(ROMAN_A2),
  spanish: toSet(SPANISH_A2),
  french: toSet(FRENCH_A2),
  byzantine: toSet(BYZANTINE_A2),
  mughal: toSet(MUGHAL_A2),
  portuguese: toSet(PORTUGUESE_A2),
  dutch: toSet(DUTCH_A2),
}

/**
 * @param {string | null | undefined} alpha2
 * @param {string | null | undefined} empireId
 */
export function countryInEmpire(alpha2, empireId) {
  if (!empireId || !alpha2) {
    return false
  }
  const set = SETS[empireId]
  if (!set) {
    return false
  }
  return set.has(String(alpha2).toUpperCase())
}
