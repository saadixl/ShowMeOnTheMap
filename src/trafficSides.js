/**
 * Left-hand traffic (LHT) by ISO 3166-1 alpha-2.
 * RHT = all other resolved countries on the map (approximation; borders & exceptions exist).
 * Sources vary for territories; treat as educational overlay only.
 */

/** @type {readonly string[]} */
const LHT_ALPHA2 = [
  'AG',
  'AI',
  'AU',
  'BB',
  'BD',
  'BM',
  'BN',
  'BS',
  'BT',
  'BW',
  'CK',
  'CY',
  'DM',
  'FJ',
  'FK',
  'GD',
  'GG',
  'GY',
  'ID',
  'IE',
  'IM',
  'IN',
  'JE',
  'JM',
  'JP',
  'KE',
  'KI',
  'KN',
  'KY',
  'LC',
  'LK',
  'LS',
  'MS',
  'MT',
  'MU',
  'MV',
  'MW',
  'MY',
  'MZ',
  'NA',
  'NR',
  'NP',
  'NU',
  'NZ',
  'PG',
  'PK',
  'PN',
  'SB',
  'SC',
  'SG',
  'SR',
  'SZ',
  'TC',
  'TH',
  'TK',
  'TL',
  'TO',
  'TT',
  'TV',
  'TZ',
  'UG',
  'GB',
  'VC',
  'VG',
  'VI',
  'VU',
  'WS',
  'ZA',
  'ZM',
  'ZW',
]

const LHT_SET = new Set(LHT_ALPHA2)

export const TRAFFIC_OPTIONS = [
  { id: 'lht', label: 'Drive on the left' },
  { id: 'rht', label: 'Drive on the right' },
]

/** Default map zoom (×) when a driving-side overlay is selected. */
export const TRAFFIC_DEFAULT_ZOOM = 1

/**
 * @param {string | null | undefined} alpha2
 */
export function isLeftHandTraffic(alpha2) {
  if (!alpha2) {
    return false
  }
  return LHT_SET.has(String(alpha2).toUpperCase())
}

/**
 * @param {string | null | undefined} alpha2
 * @param {'lht' | 'rht'} side
 */
export function countryMatchesTrafficSide(alpha2, side) {
  if (!alpha2) {
    return false
  }
  const lht = isLeftHandTraffic(alpha2)
  return side === 'lht' ? lht : !lht
}
