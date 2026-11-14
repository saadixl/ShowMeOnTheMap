/**
 * Compact URL codes for map overlays.
 * Keys: `e` empires, `l` languages, `r` religions, `ct` continents, `t` traffic,
 * `tcx` transcontinental highlight (`tcx=1`). Legacy: comma-separated alpha-2 still enables overlay.
 */
import { TRANSCONTINENTAL_IDS } from './transcontinentalCountries.js'

/** @type {Readonly<Record<string, string>>} empire id → two-letter code */
export const EMPIRE_TO_URL_CODE = /** @type {const} */ ({
  persian: 'Pe',
  rashidun: 'Ra',
  umayyad: 'Um',
  abbasid: 'Ab',
  ottoman: 'Ot',
  british: 'Br',
  mongol: 'Mo',
  roman: 'Ro',
  spanish: 'Sp',
  french: 'Fc',
  byzantine: 'Bz',
  mughal: 'Mg',
  portuguese: 'Pg',
  dutch: 'Du',
})

/** @type {Readonly<Record<string, string>>} */
const URL_CODE_TO_EMPIRE = Object.fromEntries(
  Object.entries(EMPIRE_TO_URL_CODE).map(([id, code]) => [code, id]),
)

/** @type {Readonly<Record<string, string>>} language id → two-letter code */
export const LANGUAGE_TO_URL_CODE = /** @type {const} */ ({
  english: 'En',
  mandarin: 'Md',
  hindi: 'Hi',
  spanish: 'Sp',
  french: 'Fr',
  arabic: 'Ar',
  bengali: 'Be',
})

/** @type {Readonly<Record<string, string>>} */
const URL_CODE_TO_LANGUAGE = Object.fromEntries(
  Object.entries(LANGUAGE_TO_URL_CODE).map(([id, code]) => [code, id]),
)

/** @type {Readonly<Record<string, string>>} religion id → two-letter code */
export const RELIGION_TO_URL_CODE = /** @type {const} */ ({
  christianity: 'Xt',
  islam: 'Mu',
  hinduism: 'Hd',
  buddhism: 'Bd',
  judaism: 'Jm',
  sikhism: 'Sk',
})

/** @type {Readonly<Record<string, string>>} */
const URL_CODE_TO_RELIGION = Object.fromEntries(
  Object.entries(RELIGION_TO_URL_CODE).map(([id, code]) => [code, id]),
)

/** @type {Readonly<Record<string, string>>} continent id → two-letter code */
export const CONTINENT_TO_URL_CODE = /** @type {const} */ ({
  africa: 'Af',
  asia: 'As',
  europe: 'Eu',
  'north-america': 'Nm',
  'south-america': 'Sm',
  oceania: 'Oc',
  antarctica: 'An',
})

/** @type {Readonly<Record<string, string>>} */
const URL_CODE_TO_CONTINENT = Object.fromEntries(
  Object.entries(CONTINENT_TO_URL_CODE).map(([id, code]) => [code, id]),
)

/**
 * @param {URLSearchParams} params
 * @returns {{
 *   empireIds: string[]
 *   languageIds: string[]
 *   religionIds: string[]
 *   continentIds: string[]
 *   traffic: { lht: boolean, rht: boolean } | null
 *   transcontinentalOverlay: boolean
 *   visitedOverlay: boolean
 * }}
 */
export function parseOverlayFromSearchParams(params) {
  const empireIds = []
  const eRaw = params.get('e')
  if (eRaw != null && eRaw.trim() !== '') {
    for (const part of eRaw.split(',')) {
      const code = part.trim()
      const id = URL_CODE_TO_EMPIRE[code]
      if (id) {
        empireIds.push(id)
      }
    }
  }

  const languageIds = []
  const lRaw = params.get('l')
  if (lRaw != null && lRaw.trim() !== '') {
    for (const part of lRaw.split(',')) {
      const code = part.trim()
      const id = URL_CODE_TO_LANGUAGE[code]
      if (id) {
        languageIds.push(id)
      }
    }
  }

  const religionIds = []
  const rRaw = params.get('r')
  if (rRaw != null && rRaw.trim() !== '') {
    for (const part of rRaw.split(',')) {
      const code = part.trim()
      const id = URL_CODE_TO_RELIGION[code]
      if (id) {
        religionIds.push(id)
      }
    }
  }

  const continentIds = []
  const ctRaw = params.get('ct')
  if (ctRaw != null && ctRaw.trim() !== '') {
    for (const part of ctRaw.split(',')) {
      const code = part.trim()
      const id = URL_CODE_TO_CONTINENT[code]
      if (id) {
        continentIds.push(id)
      }
    }
  }

  let traffic = null
  const tRaw = params.get('t')
  if (tRaw != null && tRaw.trim() !== '') {
    let lht = false
    let rht = false
    for (const part of tRaw.split(',')) {
      const p = part.trim()
      if (p === 'lht') {
        lht = true
      }
      if (p === 'rht') {
        rht = true
      }
    }
    if (lht || rht) {
      traffic = { lht, rht }
    }
  }

  let transcontinentalOverlay = false
  const tcxRaw = params.get('tcx')
  if (tcxRaw != null && tcxRaw.trim() !== '') {
    const trimmed = tcxRaw.trim()
    if (trimmed === '1') {
      transcontinentalOverlay = true
    } else {
      for (const part of tcxRaw.split(',')) {
        const code = part.trim().toUpperCase()
        if (code.length === 2 && TRANSCONTINENTAL_IDS.has(code)) {
          transcontinentalOverlay = true
          break
        }
      }
    }
  }

  const visitedOverlay = params.get('vc') === '1'

  return {
    empireIds,
    languageIds,
    religionIds,
    continentIds,
    traffic,
    transcontinentalOverlay,
    visitedOverlay,
  }
}

/**
 * Writes overlay keys into existing search params (mutates `params`).
 * @param {URLSearchParams} params
 * @param {{
 *   empireIds: readonly string[]
 *   languageIds: readonly string[]
 *   religionIds: readonly string[]
 *   continentIds: readonly string[]
 *   traffic: { lht: boolean, rht: boolean } | null
 *   transcontinentalOverlay?: boolean
 *   visitedOverlay?: boolean
 * }} overlay
 */
export function writeOverlayToSearchParams(params, overlay) {
  params.delete('e')
  params.delete('l')
  params.delete('r')
  params.delete('ct')
  params.delete('t')
  params.delete('tcx')
  params.delete('vc')

  if (overlay.empireIds.length > 0) {
    const codes = [...overlay.empireIds]
      .sort()
      .map((id) => EMPIRE_TO_URL_CODE[id])
      .filter((c) => typeof c === 'string')
    if (codes.length > 0) {
      params.set('e', codes.join(','))
    }
  }

  if (overlay.languageIds.length > 0) {
    const codes = [...overlay.languageIds]
      .sort()
      .map((id) => LANGUAGE_TO_URL_CODE[id])
      .filter((c) => typeof c === 'string')
    if (codes.length > 0) {
      params.set('l', codes.join(','))
    }
  }

  if (overlay.religionIds.length > 0) {
    const codes = [...overlay.religionIds]
      .sort()
      .map((id) => RELIGION_TO_URL_CODE[id])
      .filter((c) => typeof c === 'string')
    if (codes.length > 0) {
      params.set('r', codes.join(','))
    }
  }

  const continentIds = overlay.continentIds ?? []
  if (continentIds.length > 0) {
    const codes = [...continentIds]
      .sort()
      .map((id) => CONTINENT_TO_URL_CODE[id])
      .filter((c) => typeof c === 'string')
    if (codes.length > 0) {
      params.set('ct', codes.join(','))
    }
  }

  const tr = overlay.traffic
  if (tr && (tr.lht || tr.rht)) {
    const parts = []
    if (tr.lht) {
      parts.push('lht')
    }
    if (tr.rht) {
      parts.push('rht')
    }
    if (parts.length > 0) {
      params.set('t', parts.join(','))
    }
  }

  if (overlay.transcontinentalOverlay) {
    params.set('tcx', '1')
  }

  if (overlay.visitedOverlay) {
    params.set('vc', '1')
  }
}
