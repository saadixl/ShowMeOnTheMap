import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { numericToAlpha2 } from 'i18n-iso-countries'
import { geoArea, geoCentroid, geoNaturalEarth1, geoPath } from 'd3-geo'
import { countriesGeo } from './countriesGeo.js'
import {
  EMPIRE_OPTIONS,
  countryInEmpire,
  getEmpireOption,
} from './empireTerritories.js'
import {
  TRAFFIC_OPTIONS,
  countryMatchesTrafficSide,
} from './trafficSides.js'
import {
  LANGUAGE_OPTIONS,
  countryInLanguage,
  getLanguageOption,
} from './languageRegions.js'
import {
  RELIGION_OPTIONS,
  countryInReligion,
  getReligionOption,
} from './religionRegions.js'
import {
  CONTINENT_OPTIONS,
  countryInContinent,
  getContinentOption,
} from './continentRegions.js'
import {
  TRANSCONTINENTAL_OPTIONS,
  countryMatchesTranscontinental,
} from './transcontinentalCountries.js'
import {
  parseOverlayFromSearchParams,
  writeOverlayToSearchParams,
} from './overlayUrlCodes.js'
import {
  EXTRA_OVERLAY_CATEGORIES,
  EXTRA_SECTIONS,
  countryInAnyExtraOverlay,
  getExtraOverlayColor,
  hasAnyExtraSelection,
} from './extraOverlays.js'

/** Emoji icons for extra-overlay section headers. */
const SECTION_ICON = {
  Geography: '🌍',
  Environment: '🌿',
  History: '🏛️',
  Politics: '⚖️',
  Economy: '💰',
  Demographics: '📊',
  Culture: '🎭',
  Fun: '🎮',
}
import { requestVisitorGeolocation } from './visitorLocation.js'
import {
  getCountryDisplayName,
  MAP_ALPHA2_CODES_SORTED,
} from './countryCatalog.js'
import { useFirebaseAuth } from './useFirebaseAuth.js'
import { useUserRtdb } from './useUserRtdb.js'
import { GameModal } from './GameModal.jsx'
import { FindCountryGame } from './FindCountryGame.jsx'
import { CapitalQuizGame } from './CapitalQuizGame.jsx'
import './WorldMap.css'

/** Small 5-point star centered at (0, 0) in map coordinates (scales with zoom). */
const VISITOR_STAR_PATH =
  'M0,-7.2L1.76,-2.4L6.8,-2.4L2.8,0.96L4.4,6.88L0,4.16L-4.4,6.88L-2.8,0.96L-6.8,-2.4L-1.76,-2.4Z'

const CHAR_WIDTH_FACTOR = 0.52

const ZOOM_MIN = 0.65
const ZOOM_MAX = 20
const ZOOM_DEFAULT = 1.38

const URL_Z = 'z'
const URL_X = 'x'
const URL_Y = 'y'
const URL_SYNC_DEBOUNCE_MS = 200
const ZOOM_BUTTON_STEP = 0.12

function clampZoom(value) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value))
}

function readMapParamsFromLocation() {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  const zRaw = p.get(URL_Z)
  const xRaw = p.get(URL_X)
  const yRaw = p.get(URL_Y)
  if (zRaw == null && xRaw == null && yRaw == null) return null

  let mapZoom = ZOOM_DEFAULT
  if (zRaw != null) {
    const z = Number.parseFloat(zRaw)
    if (Number.isFinite(z)) mapZoom = clampZoom(z)
  }

  const px = xRaw != null ? Number.parseFloat(xRaw) : 0
  const py = yRaw != null ? Number.parseFloat(yRaw) : 0
  return {
    mapZoom,
    pan: {
      x: Number.isFinite(px) ? px : 0,
      y: Number.isFinite(py) ? py : 0,
    },
  }
}

function readOverlayFromLocation() {
  if (typeof window === 'undefined') {
    return {
      empireIds: [],
      languageIds: [],
      religionIds: [],
      continentIds: [],
      traffic: null,
      transcontinentalOverlay: false,
      visitedOverlay: false,
    }
  }
  return parseOverlayFromSearchParams(
    new URLSearchParams(window.location.search),
  )
}

const LS_LOCATION_BANNER_DISMISSED = 'smotm_location_banner_dismissed'
const LS_VISITOR_COUNTRY_CODE = 'smotm_visitor_country_code'

function readBoolFromLocalStorage(key) {
  if (typeof window === 'undefined') return false
  try {
    const v = window.localStorage.getItem(key)
    return v === '1' || v === 'true'
  } catch {
    return false
  }
}

function writeBoolToLocalStorage(key, value) {
  if (typeof window === 'undefined') return
  try {
    if (!value) {
      window.localStorage.removeItem(key)
      return
    }
    window.localStorage.setItem(key, '1')
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

function readStringFromLocalStorage(key) {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(key)
    return v ? v : null
  } catch {
    return null
  }
}

function writeStringToLocalStorage(key, value) {
  if (typeof window === 'undefined') return
  try {
    if (!value) {
      window.localStorage.removeItem(key)
      return
    }
    window.localStorage.setItem(key, value)
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}

function zoomProjectionAroundViewCenter(projection, width, height, k) {
  const [tx, ty] = projection.translate()
  const cx = width / 2
  const cy = height / 2
  projection.scale(projection.scale() * k)
  projection.translate([cx + k * (tx - cx), cy + k * (ty - cy)])
}

/**
 * When interactive zoom changes from prevZoom to nextZoom, return pan so the
 * lon/lat at the viewport center before zoom stays at the center after.
 */
function computePanPreservingViewportCenter(
  width,
  height,
  pan,
  prevZoom,
  nextZoom,
) {
  if (prevZoom === nextZoom) {
    return pan
  }
  const projOld = geoNaturalEarth1()
  projOld.fitSize([width, height], EUROPE_FIT_BBOX)
  zoomProjectionAroundViewCenter(projOld, width, height, prevZoom)
  const contentX = width / 2 - pan.x
  const contentY = height / 2 - pan.y
  const inverted = projOld.invert([contentX, contentY])
  if (
    !inverted ||
    !Number.isFinite(inverted[0]) ||
    !Number.isFinite(inverted[1])
  ) {
    return pan
  }
  const projNew = geoNaturalEarth1()
  projNew.fitSize([width, height], EUROPE_FIT_BBOX)
  zoomProjectionAroundViewCenter(projNew, width, height, nextZoom)
  const projected = projNew(inverted)
  if (
    !projected ||
    !Number.isFinite(projected[0]) ||
    !Number.isFinite(projected[1])
  ) {
    return pan
  }
  return {
    x: width / 2 - projected[0],
    y: height / 2 - projected[1],
  }
}

function featureAlpha2(feature) {
  const numericId = feature.id != null ? String(feature.id) : ''
  const numIso = Number.parseInt(numericId, 10)
  return Number.isFinite(numIso) ? numericToAlpha2(numIso) : null
}

/** @param {object[]} feats GeoJSON features from countriesGeo */
function computePanFromFeatureSubset(feats, w, h, zoom) {
  if (feats.length === 0) {
    return { x: 0, y: 0 }
  }
  const projection = geoNaturalEarth1()
  const path = geoPath(projection)
  projection.fitSize([w, h], EUROPE_FIT_BBOX)
  zoomProjectionAroundViewCenter(projection, w, h, zoom)

  // Robust center: median of per-country projected centroids.
  // This avoids giant geometries (e.g. RU) skewing "center of bounds", and behaves well for wide overlays.
  const xs = []
  const ys = []
  for (const f of feats) {
    const [lon, lat] = geoCentroid(f)
    const p = projection([lon, lat])
    if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) {
      continue
    }
    xs.push(p[0])
    ys.push(p[1])
  }

  const median = (arr) => {
    const s = [...arr].sort((a, b) => a - b)
    const mid = Math.floor(s.length / 2)
    return s.length % 2 === 1 ? s[mid] : (s[mid - 1] + s[mid]) / 2
  }

  if (xs.length > 0 && ys.length > 0) {
    const cx = median(xs)
    const cy = median(ys)
    return { x: w / 2 - cx, y: h / 2 - cy }
  }

  // Fallback (rare): projected bounds of the full set.
  const collection = { type: 'FeatureCollection', features: feats }
  const b = path.bounds(collection)
  const cx = (b[0][0] + b[1][0]) / 2
  const cy = (b[0][1] + b[1][1]) / 2
  if (!Number.isFinite(cx) || !Number.isFinite(cy)) {
    return { x: 0, y: 0 }
  }
  return { x: w / 2 - cx, y: h / 2 - cy }
}

/** Union of countries matching any active overlay (deduped). */
function computePanToOverlayUnion(
  empireIds,
  languageIds,
  religionIds,
  continentIds,
  transcontinentalOverlay,
  w,
  h,
  zoom,
  traffic,
  extraSel,
) {
  const seen = new Set()
  const feats = []
  for (const f of countriesGeo.features) {
    const a2 = featureAlpha2(f)
    if (!a2) {
      continue
    }
    if (
      countryInOverlay(
        a2,
        empireIds,
        traffic ?? null,
        languageIds,
        religionIds,
        continentIds,
        transcontinentalOverlay,
        false,
        new Set(),
        extraSel ?? {},
      )
    ) {
      const key = f.id != null ? String(f.id) : JSON.stringify(f.geometry)
      if (!seen.has(key)) {
        seen.add(key)
        feats.push(f)
      }
    }
  }
  if (feats.length === 0) {
    return { x: 0, y: 0 }
  }
  return computePanFromFeatureSubset(feats, w, h, zoom)
}

/** Geographic bounds used only to set projection scale/translate (Europe-forward framing). */
const EUROPE_FIT_BBOX = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-32, 33],
        [72, 33],
        [72, 82],
        [-32, 82],
        [-32, 33],
      ],
    ],
  },
}

function mapLabelCode(numericId, name) {
  const alpha2 = numericToAlpha2(numericId)
  if (alpha2) return alpha2
  if (name) return name.slice(0, 3).toUpperCase()
  return '?'
}

function fontSizeForLabel(text, maxWidth, minSide) {
  let fs = Math.min(15, Math.max(6.5, minSide / 3.4))
  const tw = (t, size) => t.length * size * CHAR_WIDTH_FACTOR
  while (fs > 4 && tw(text, fs) > maxWidth) fs -= 0.4
  return fs
}

function featureForLabelPlacement(feature) {
  const g = feature?.geometry
  if (!g) return feature
  if (g.type === 'Polygon') return feature
  if (g.type !== 'MultiPolygon') return feature

  // Some countries (e.g. France) include overseas territories; centroid can land far away.
  // Use the largest polygon by geographic area for label placement/bounds.
  let best = null
  let bestArea = -Infinity
  for (const coords of g.coordinates) {
    const poly = { type: 'Polygon', coordinates: coords }
    const a = geoArea(poly)
    if (a > bestArea) {
      bestArea = a
      best = poly
    }
  }
  if (!best) return feature
  return { ...feature, geometry: best }
}

/**
 * @param {string | null | undefined} alpha2
 * @param {readonly string[]} empireIds
 * @param {{ lht: boolean, rht: boolean } | null} traffic
 * @param {readonly string[]} languageIds
 * @param {readonly string[]} religionIds
 * @param {readonly string[]} continentIds
 * @param {boolean} transcontinentalOverlay
 * @param {boolean} visitedHighlightOn
 * @param {ReadonlySet<string>} visitedAlpha2Set
 * @param {Record<string, string[]>} extraSel
 */
function countryInOverlay(
  alpha2,
  empireIds,
  traffic,
  languageIds,
  religionIds,
  continentIds,
  transcontinentalOverlay,
  visitedHighlightOn,
  visitedAlpha2Set,
  extraSel,
) {
  if (
    empireIds.length > 0 &&
    empireIds.some((id) => countryInEmpire(alpha2, id))
  ) {
    return true
  }
  if (
    languageIds.length > 0 &&
    languageIds.some((id) => countryInLanguage(alpha2, id))
  ) {
    return true
  }
  if (
    religionIds.length > 0 &&
    religionIds.some((id) => countryInReligion(alpha2, id))
  ) {
    return true
  }
  if (
    continentIds.length > 0 &&
    continentIds.some((id) => countryInContinent(alpha2, id))
  ) {
    return true
  }
  if (traffic) {
    if (
      traffic.lht &&
      countryMatchesTrafficSide(alpha2, 'lht')
    ) {
      return true
    }
    if (
      traffic.rht &&
      countryMatchesTrafficSide(alpha2, 'rht')
    ) {
      return true
    }
  }
  if (countryMatchesTranscontinental(alpha2, transcontinentalOverlay)) {
    return true
  }
  if (
    visitedHighlightOn &&
    alpha2 &&
    visitedAlpha2Set.has(String(alpha2).toUpperCase())
  ) {
    return true
  }
  if (countryInAnyExtraOverlay(alpha2, extraSel)) {
    return true
  }
  return false
}

/**
 * @param {string | null | undefined} alpha2
 * @param {readonly string[]} empireIds
 * @returns {string[]}
 */
function empiresMatchingCountry(alpha2, empireIds) {
  if (!alpha2 || empireIds.length === 0) {
    return []
  }
  return empireIds.filter((id) => countryInEmpire(alpha2, id))
}

/**
 * Single highlight class per country: empire / language / cross-category / traffic / extra.
 * @param {string | null | undefined} alpha2
 * @param {readonly string[]} empireIds
 * @param {readonly string[]} languageIds
 * @param {readonly string[]} religionIds
 * @param {readonly string[]} continentIds
 * @param {boolean} transcontinentalOverlay
 * @param {{ lht: boolean, rht: boolean } | null} traffic
 * @param {boolean} visitedHighlightOn
 * @param {ReadonlySet<string>} visitedAlpha2Set
 * @param {Record<string, string[]>} extraSel
 */
function mapHighlightClass(
  alpha2,
  empireIds,
  languageIds,
  religionIds,
  continentIds,
  transcontinentalOverlay,
  traffic,
  visitedHighlightOn,
  visitedAlpha2Set,
  extraSel,
) {
  const hasV = Boolean(
    visitedHighlightOn &&
    alpha2 &&
    visitedAlpha2Set.has(String(alpha2).toUpperCase()),
  )
  const trafficClsEarly = trafficHighlightClass(alpha2, traffic)
  const hasTrafficMatch = trafficClsEarly !== ''
  const hasExtra = countryInAnyExtraOverlay(alpha2, extraSel)

  const em = empiresMatchingCountry(alpha2, empireIds)
  const ln = languagesMatchingCountry(alpha2, languageIds)
  const rg = religionsMatchingCountry(alpha2, religionIds)
  const cn = continentsMatchingCountry(alpha2, continentIds)
  if (em.length >= 2) {
    return hasV ? 'country--overlay-mixed' : 'country--empire-overlap'
  }
  if (ln.length >= 2) {
    return hasV ? 'country--overlay-mixed' : 'country--language-overlap'
  }
  if (rg.length >= 2) {
    return hasV ? 'country--overlay-mixed' : 'country--religion-overlap'
  }
  const hasE = em.length >= 1
  const hasL = ln.length >= 1
  const hasR = rg.length >= 1
  const hasC = cn.length >= 1
  const hasTc = countryMatchesTranscontinental(alpha2, transcontinentalOverlay)
  const nCat =
    (hasE ? 1 : 0) +
    (hasL ? 1 : 0) +
    (hasR ? 1 : 0) +
    (hasC ? 1 : 0) +
    (hasV ? 1 : 0) +
    (hasTrafficMatch ? 1 : 0) +
    (hasTc ? 1 : 0) +
    (hasExtra ? 1 : 0)
  if (nCat >= 2) {
    if (
      hasE &&
      hasL &&
      !hasR &&
      !hasC &&
      !hasV &&
      !hasTrafficMatch &&
      !hasTc &&
      !hasExtra
    ) {
      return 'country--overlay-cross'
    }
    return 'country--overlay-mixed'
  }
  if (em.length === 1) {
    return `country--empire-${em[0]}`
  }
  if (ln.length === 1) {
    return `country--lang-${ln[0]}`
  }
  if (rg.length === 1) {
    return `country--religion-${rg[0]}`
  }
  if (cn.length === 1) {
    return `country--continent-${cn[0]}`
  }
  if (hasTc) {
    return 'country--transcontinental'
  }
  if (hasV) {
    return 'country--visited-user'
  }
  if (hasExtra) {
    return 'country--extra-overlay'
  }
  return trafficClsEarly
}

/**
 * @param {string | null | undefined} alpha2
 * @param {{ lht: boolean, rht: boolean } | null} traffic
 */
function trafficHighlightClass(alpha2, traffic) {
  if (!traffic) {
    return ''
  }
  if (traffic.lht && countryMatchesTrafficSide(alpha2, 'lht')) {
    return 'country--traffic-lht'
  }
  if (traffic.rht && countryMatchesTrafficSide(alpha2, 'rht')) {
    return 'country--traffic-rht'
  }
  return ''
}

/**
 * @param {string | null | undefined} alpha2
 * @param {readonly string[]} languageIds
 * @returns {string[]}
 */
function languagesMatchingCountry(alpha2, languageIds) {
  if (!alpha2 || languageIds.length === 0) {
    return []
  }
  return languageIds.filter((id) => countryInLanguage(alpha2, id))
}

/**
 * @param {string | null | undefined} alpha2
 * @param {readonly string[]} religionIds
 * @returns {string[]}
 */
function religionsMatchingCountry(alpha2, religionIds) {
  if (!alpha2 || religionIds.length === 0) {
    return []
  }
  return religionIds.filter((id) => countryInReligion(alpha2, id))
}

/**
 * @param {string | null | undefined} alpha2
 * @param {readonly string[]} continentIds
 * @returns {string[]}
 */
function continentsMatchingCountry(alpha2, continentIds) {
  if (!alpha2 || continentIds.length === 0) {
    return []
  }
  return continentIds.filter((id) => countryInContinent(alpha2, id))
}

/**
 * Compute the zoom multiplier that fits all overlay-matching countries in the
 * viewport with some padding.  Uses d3-geo's fitExtent against the base
 * projection to derive the scale ratio.
 */
function computeFitZoom(
  empireIds,
  languageIds,
  religionIds,
  continentIds,
  transcontinentalOverlay,
  traffic,
  visitedHighlightOn,
  visitedAlpha2Set,
  extraSel,
  w,
  h,
) {
  if (w <= 0 || h <= 0) {
    return null
  }
  const feats = []
  const seen = new Set()
  for (const f of countriesGeo.features) {
    const a2 = featureAlpha2(f)
    if (!a2) {
      continue
    }
    if (
      countryInOverlay(
        a2,
        empireIds,
        traffic,
        languageIds,
        religionIds,
        continentIds,
        transcontinentalOverlay,
        visitedHighlightOn,
        visitedAlpha2Set,
        extraSel,
      )
    ) {
      const key = f.id != null ? String(f.id) : JSON.stringify(f.geometry)
      if (!seen.has(key)) {
        seen.add(key)
        feats.push(f)
      }
    }
  }
  if (feats.length === 0) {
    return null
  }
  const collection = { type: 'FeatureCollection', features: feats }
  const baseProj = geoNaturalEarth1()
  baseProj.fitSize([w, h], EUROPE_FIT_BBOX)
  const baseScale = baseProj.scale()
  const fitProj = geoNaturalEarth1()
  const pad = Math.min(w, h) * 0.1
  fitProj.fitExtent(
    [
      [pad, pad],
      [w - pad, h - pad],
    ],
    collection,
  )
  const fitScale = fitProj.scale()
  const zoom = fitScale / baseScale
  return clampZoom(zoom)
}

export function WorldMap() {
  const containerRef = useRef(null)
  const mapViewportRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const [loginPopoverOpen, setLoginPopoverOpen] = useState(false)
  const loginPopoverCloseTimerRef = useRef(/** @type {number | null} */ (null))
  const [mapZoom, setMapZoom] = useState(() => {
    const fromUrl = readMapParamsFromLocation()
    return fromUrl?.mapZoom ?? ZOOM_DEFAULT
  })
  const [pan, setPan] = useState(() => {
    const fromUrl = readMapParamsFromLocation()
    return fromUrl?.pan ?? { x: 0, y: 0 }
  })
  const [isMapDragging, setIsMapDragging] = useState(false)
  const [overlayPanelOpen, setOverlayPanelOpen] = useState(false)
  const [selectedEmpireIds, setSelectedEmpireIds] = useState(
    () => readOverlayFromLocation().empireIds,
  )
  const [trafficOverlay, setTrafficOverlay] = useState(
    () => readOverlayFromLocation().traffic,
  )
  const [selectedLanguageIds, setSelectedLanguageIds] = useState(
    () => readOverlayFromLocation().languageIds,
  )
  const [selectedReligionIds, setSelectedReligionIds] = useState(
    () => readOverlayFromLocation().religionIds,
  )
  const [selectedContinentIds, setSelectedContinentIds] = useState(
    () => readOverlayFromLocation().continentIds,
  )
  const [transcontinentalOverlay, setTranscontinentalOverlay] = useState(
    () => readOverlayFromLocation().transcontinentalOverlay ?? false,
  )
  const [visitedCountriesOverlay, setVisitedCountriesOverlay] = useState(
    () => readOverlayFromLocation().visitedOverlay ?? false,
  )
  /** Extra generic overlays — { [categoryId]: string[] } of selected option IDs. */
  const [extraSelections, setExtraSelections] = useState(
    /** @type {Record<string, string[]>} */ ({}),
  )
  const extraSelectionsRef = useRef(extraSelections)
  const [visitCountryPickerOpen, setVisitCountryPickerOpen] = useState(false)
  const [sessionVisitorCountryCode, setSessionVisitorCountryCode] = useState(
    () => readStringFromLocalStorage(LS_VISITOR_COUNTRY_CODE),
  )
  const [sessionBannerDismissed, setSessionBannerDismissed] = useState(() =>
    readBoolFromLocalStorage(LS_LOCATION_BANNER_DISMISSED),
  )
  const [locationRequestBusy, setLocationRequestBusy] = useState(false)
  const [locationHint, setLocationHint] = useState(/** @type {string | null} */ (null))
  const {
    user: authUser,
    ready: authReady,
    busy: authBusy,
    error: authError,
    loginWithGoogle,
    logout: logoutFirebase,
    configured: firebaseConfigured,
  } = useFirebaseAuth()
  const {
    visitorCountryCode: visitorCountryCodeRtdb,
    bannerDismissed: bannerDismissedRtdb,
    visitedCodes,
    visitedSet,
    loading: userRtdbLoading,
    error: visitedRtdbError,
    saveVisitorCountryCode,
    saveBannerDismissed,
    clearVisitorCountryCode,
    addCountry,
    removeCountry,
  } = useUserRtdb(authUser)

  const VALID_GAMES = ['find-country', 'capital-quiz']
  const [gameModalOpen, setGameModalOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    const p = new URLSearchParams(window.location.search)
    return p.has('game') && !VALID_GAMES.includes(p.get('game'))
  })
  const [activeGame, setActiveGame] = useState(() => {
    if (typeof window === 'undefined') return null
    const p = new URLSearchParams(window.location.search)
    const g = p.get('game')
    return VALID_GAMES.includes(g) ? g : null
  })
  const gameGuessRef = useRef(null)
  const [gameCorrectSet, setGameCorrectSet] = useState(new Set())
  const [gameWrongFlash, setGameWrongFlash] = useState(null)
  const [gameRevealCorrect, setGameRevealCorrect] = useState(null)
  const gameWrongTimer = useRef(null)

  const visitorCountryCodeDisplay = authUser
    ? visitorCountryCodeRtdb
    : sessionVisitorCountryCode
  const bannerDismissedDisplay = authUser ? bannerDismissedRtdb : sessionBannerDismissed

  const showLocationBanner = useMemo(() => {
    if (firebaseConfigured && !authReady) {
      return false
    }
    if (authUser && userRtdbLoading) {
      return false
    }
    if (visitorCountryCodeDisplay) {
      return false
    }
    if (bannerDismissedDisplay) {
      return false
    }
    return true
  }, [
    firebaseConfigured,
    authReady,
    authUser,
    userRtdbLoading,
    visitorCountryCodeDisplay,
    bannerDismissedDisplay,
  ])

  const handleLogout = useCallback(async () => {
    try {
      await clearVisitorCountryCode()
    } catch {
      // Still sign out if RTDB delete fails (offline / rules).
    }
    await logoutFirebase()
  }, [clearVisitorCountryCode, logoutFirebase])
  const prevAuthUserRef = useRef(authUser)
  const panRef = useRef(pan)
  const mapZoomRef = useRef(mapZoom)

  const selectedEmpireIdsRef = useRef(selectedEmpireIds)
  const selectedLanguageIdsRef = useRef(selectedLanguageIds)
  const selectedReligionIdsRef = useRef(selectedReligionIds)
  const selectedContinentIdsRef = useRef(selectedContinentIds)
  const trafficOverlayRef = useRef(trafficOverlay)
  const transcontinentalOverlayRef = useRef(transcontinentalOverlay)

  useEffect(() => {
    selectedEmpireIdsRef.current = selectedEmpireIds
    selectedLanguageIdsRef.current = selectedLanguageIds
    selectedReligionIdsRef.current = selectedReligionIds
    selectedContinentIdsRef.current = selectedContinentIds
    trafficOverlayRef.current = trafficOverlay
    transcontinentalOverlayRef.current = transcontinentalOverlay
    extraSelectionsRef.current = extraSelections
  }, [
    selectedEmpireIds,
    selectedLanguageIds,
    selectedReligionIds,
    selectedContinentIds,
    trafficOverlay,
    transcontinentalOverlay,
    extraSelections,
  ])

  const empireSelectionKey = useMemo(
    () => [...selectedEmpireIds].sort().join(','),
    [selectedEmpireIds],
  )

  const languageSelectionKey = useMemo(
    () => [...selectedLanguageIds].sort().join(','),
    [selectedLanguageIds],
  )

  const religionSelectionKey = useMemo(
    () => [...selectedReligionIds].sort().join(','),
    [selectedReligionIds],
  )

  const continentSelectionKey = useMemo(
    () => [...selectedContinentIds].sort().join(','),
    [selectedContinentIds],
  )

  const extraSelectionKey = useMemo(
    () =>
      Object.entries(extraSelections)
        .filter(([, v]) => v.length > 0)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${[...v].sort().join('+')}`)
        .join(','),
    [extraSelections],
  )

  const trafficKey = useMemo(
    () =>
      trafficOverlay
        ? `${trafficOverlay.lht ? 'l' : ''}${trafficOverlay.rht ? 'r' : ''}`
        : '',
    [trafficOverlay],
  )

  const toggleEmpire = useCallback((empireId) => {
    setSelectedEmpireIds((prev) =>
      prev.includes(empireId)
        ? prev.filter((id) => id !== empireId)
        : [...prev, empireId],
    )
  }, [])

  const toggleTrafficSide = useCallback((side) => {
    setTrafficOverlay((prev) => {
      const base = prev ?? { lht: false, rht: false }
      const next = { ...base, [side]: !base[side] }
      const active = next.lht || next.rht
      return active ? next : null
    })
  }, [])

  const toggleLanguage = useCallback((languageId) => {
    setSelectedLanguageIds((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId],
    )
  }, [])

  const toggleReligion = useCallback((religionId) => {
    setSelectedReligionIds((prev) =>
      prev.includes(religionId)
        ? prev.filter((id) => id !== religionId)
        : [...prev, religionId],
    )
  }, [])

  const toggleContinent = useCallback((continentId) => {
    setSelectedContinentIds((prev) =>
      prev.includes(continentId)
        ? prev.filter((id) => id !== continentId)
        : [...prev, continentId],
    )
  }, [])

  const toggleTranscontinentalOverlay = useCallback(() => {
    setTranscontinentalOverlay((prev) => !prev)
  }, [])

  const toggleExtraOption = useCallback((categoryId, optionId) => {
    setExtraSelections((prev) => {
      const current = prev[categoryId] || []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      const updated = { ...prev }
      if (next.length > 0) {
        updated[categoryId] = next
      } else {
        delete updated[categoryId]
      }
      return updated
    })
  }, [])

  const clearAllOverlays = useCallback(() => {
    setSelectedEmpireIds([])
    setSelectedLanguageIds([])
    setSelectedReligionIds([])
    setSelectedContinentIds([])
    setTranscontinentalOverlay(false)
    setTrafficOverlay(null)
    setVisitedCountriesOverlay(false)
    setExtraSelections({})
    setMapZoom(ZOOM_DEFAULT)
    setPan({ x: 0, y: 0 })
  }, [])
  const extraOverlayActive = hasAnyExtraSelection(extraSelections)
  const canClearOverlays =
    selectedEmpireIds.length > 0 ||
    selectedLanguageIds.length > 0 ||
    selectedReligionIds.length > 0 ||
    selectedContinentIds.length > 0 ||
    transcontinentalOverlay ||
    trafficOverlay != null ||
    visitedCountriesOverlay ||
    extraOverlayActive
  const dragRef = useRef(null)
  const [[width, height], setSize] = useState(() =>
    typeof window !== 'undefined'
      ? [window.innerWidth, window.innerHeight]
      : [960, 540],
  )

  useEffect(() => {
    const el = mapViewportRef.current
    if (!el) return

    const update = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (w <= 0 || h <= 0) return
      setSize([w, h])
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    panRef.current = pan
    mapZoomRef.current = mapZoom
  }, [pan, mapZoom])

  useEffect(() => {
    if (prevAuthUserRef.current && !authUser) {
      setVisitedCountriesOverlay(false)
    }
    prevAuthUserRef.current = authUser
  }, [authUser])

  const prevAuthUidRef = useRef(/** @type {string | undefined} */ (undefined))
  useEffect(() => {
    const uid = authUser?.uid
    if (prevAuthUidRef.current !== uid) {
      prevAuthUidRef.current = uid
      setSessionVisitorCountryCode(null)
      setSessionBannerDismissed(false)
    }
  }, [authUser])

  const applyInteractiveZoom = useCallback(
    (nextZoom) => {
      const clamped = clampZoom(nextZoom)
      const prev = mapZoomRef.current
      if (Math.abs(clamped - prev) < 1e-9) {
        return
      }
      setPan((p) =>
        computePanPreservingViewportCenter(width, height, p, prev, clamped),
      )
      setMapZoom(clamped)
      mapZoomRef.current = clamped
    },
    [width, height],
  )

  const handleDeclineLocationPrompt = useCallback(() => {
    if (authUser) {
      void saveBannerDismissed()
    } else {
      setSessionBannerDismissed(true)
      writeBoolToLocalStorage(LS_LOCATION_BANNER_DISMISSED, true)
    }
    setLocationHint(null)
  }, [authUser, saveBannerDismissed])

  const handleAllowLocation = useCallback(() => {
    if (locationRequestBusy) {
      return
    }
    setLocationHint(null)
    setLocationRequestBusy(true)
    requestVisitorGeolocation((a2, reason) => {
      setLocationRequestBusy(false)
      if (a2) {
        if (authUser) {
          void saveVisitorCountryCode(a2)
        } else {
          setSessionVisitorCountryCode(a2)
          writeStringToLocalStorage(LS_VISITOR_COUNTRY_CODE, a2)
        }
        return
      }
      if (reason === 'denied' || reason === 'unsupported') {
        if (authUser) {
          void saveBannerDismissed()
        } else {
          setSessionBannerDismissed(true)
          writeBoolToLocalStorage(LS_LOCATION_BANNER_DISMISSED, true)
        }
        return
      }
      if (reason === 'no-country') {
        setLocationHint(
          'We could not match your position to a country on this map.',
        )
        return
      }
      setLocationHint('Location could not be read. You can try again.')
    })
  }, [
    locationRequestBusy,
    authUser,
    saveVisitorCountryCode,
    saveBannerDismissed,
  ])

  useLayoutEffect(() => {
    const hasAny =
      selectedEmpireIds.length > 0 ||
      selectedLanguageIds.length > 0 ||
      selectedReligionIds.length > 0 ||
      selectedContinentIds.length > 0 ||
      transcontinentalOverlay ||
      trafficOverlay != null ||
      hasAnyExtraSelection(extraSelections)
    if (!hasAny) {
      return
    }
    // Compute the zoom that fits all highlighted countries, then pan to center.
    const z = computeFitZoom(
      selectedEmpireIds,
      selectedLanguageIds,
      selectedReligionIds,
      selectedContinentIds,
      transcontinentalOverlay,
      trafficOverlay,
      false,
      new Set(),
      extraSelections,
      width,
      height,
    )
    // eslint-disable-next-line react-hooks/set-state-in-effect -- align zoom+pan to overlay bounds after selection change
    if (z != null) {
      setMapZoom(z)
    }
    const nextPan = computePanToOverlayUnion(
      selectedEmpireIds,
      selectedLanguageIds,
      selectedReligionIds,
      selectedContinentIds,
      transcontinentalOverlay,
      width,
      height,
      z ?? mapZoom,
      trafficOverlay,
      extraSelections,
    )
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPan(nextPan)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    empireSelectionKey,
    languageSelectionKey,
    religionSelectionKey,
    continentSelectionKey,
    transcontinentalOverlay,
    trafficKey,
    extraSelectionKey,
    width,
    height,
  ])

  useEffect(() => {
    if (!overlayPanelOpen || typeof window === 'undefined') {
      return undefined
    }
    const onKey = (e) => {
      if (e.key !== 'Escape') {
        return
      }
      setOverlayPanelOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlayPanelOpen])

  const anyConfirmOpen = logoutConfirmOpen
  useEffect(() => {
    if (!anyConfirmOpen || typeof window === 'undefined') {
      return undefined
    }
    const onKey = (e) => {
      if (e.key !== 'Escape') {
        return
      }
      setLogoutConfirmOpen(false)
    }
    const onPointerDown = (e) => {
      const t = e.target
      if (!(t instanceof Element)) {
        return
      }
      if (t.closest('[data-confirm-root="1"]')) {
        return
      }
      setLogoutConfirmOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [anyConfirmOpen])

  const openLoginPopover = useCallback(() => {
    if (loginPopoverCloseTimerRef.current != null) {
      window.clearTimeout(loginPopoverCloseTimerRef.current)
      loginPopoverCloseTimerRef.current = null
    }
    setLoginPopoverOpen(true)
  }, [])

  const scheduleCloseLoginPopover = useCallback(() => {
    if (typeof window === 'undefined') {
      setLoginPopoverOpen(false)
      return
    }
    if (loginPopoverCloseTimerRef.current != null) {
      window.clearTimeout(loginPopoverCloseTimerRef.current)
    }
    loginPopoverCloseTimerRef.current = window.setTimeout(() => {
      loginPopoverCloseTimerRef.current = null
      setLoginPopoverOpen(false)
    }, 120)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      params.set(URL_Z, clampZoom(mapZoom).toFixed(4))
      params.set(URL_X, String(Math.round(pan.x)))
      params.set(URL_Y, String(Math.round(pan.y)))
      writeOverlayToSearchParams(params, {
        empireIds: selectedEmpireIds,
        languageIds: selectedLanguageIds,
        religionIds: selectedReligionIds,
        continentIds: selectedContinentIds,
        traffic: trafficOverlay,
        transcontinentalOverlay,
        visitedOverlay: visitedCountriesOverlay,
      })
      if (activeGame) {
        params.set('game', activeGame)
      } else if (gameModalOpen) {
        params.set('game', '')
      } else {
        params.delete('game')
      }
      const qs = params.toString()
      const next =
        `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`
      window.history.replaceState(null, '', next)
    }, URL_SYNC_DEBOUNCE_MS)
    return () => window.clearTimeout(id)
  }, [
    mapZoom,
    pan,
    selectedEmpireIds,
    selectedLanguageIds,
    selectedReligionIds,
    selectedContinentIds,
    trafficOverlay,
    transcontinentalOverlay,
    visitedCountriesOverlay,
    activeGame,
    gameModalOpen,
  ])

  const handleMapPointerDown = useCallback((e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsMapDragging(true)
    setTooltip(null)
    dragRef.current = {
      pointerId: e.pointerId,
      ox: e.clientX,
      oy: e.clientY,
      px: panRef.current.x,
      py: panRef.current.y,
    }
  }, [])

  const handleMapPointerMove = useCallback((e) => {
    const d = dragRef.current
    if (!d || d.pointerId !== e.pointerId) return
    e.preventDefault()
    setPan({
      x: d.px + (e.clientX - d.ox),
      y: d.py + (e.clientY - d.oy),
    })
  }, [])

  const handleMapPointerUp = useCallback((e) => {
    const d = dragRef.current
    if (!d || d.pointerId !== e.pointerId) return
    dragRef.current = null
    setIsMapDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    const dx = e.clientX - d.ox
    const dy = e.clientY - d.oy
    const isTap = Math.abs(dx) < 5 && Math.abs(dy) < 5
    if (isTap && gameGuessRef.current) {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const g = el?.closest?.('g[data-alpha2]')
      const a2 = g?.getAttribute('data-alpha2')
      if (a2) gameGuessRef.current(a2)
    }
  }, [])

  const items = useMemo(() => {
    const projection = geoNaturalEarth1()
    const path = geoPath(projection)
    projection.fitSize([width, height], EUROPE_FIT_BBOX)
    zoomProjectionAroundViewCenter(projection, width, height, mapZoom)

    return countriesGeo.features.map((feature) => {
      const labelFeature = featureForLabelPlacement(feature)
      const name = feature.properties?.name ?? ''
      const numericId = feature.id != null ? String(feature.id) : ''
      const label = mapLabelCode(numericId, name)
      const numIso = Number.parseInt(numericId, 10)
      const alpha2 =
        Number.isFinite(numIso) ? numericToAlpha2(numIso) : null

      const d = path(feature)
      if (!d) return null

      const [[x0, y0], [x1, y1]] = path.bounds(labelFeature)
      const bw = Math.max(1, x1 - x0)
      const bh = Math.max(1, y1 - y0)
      const minSide = Math.min(bw, bh)
      const maxWidth = bw * 0.88

      const fontSize = fontSizeForLabel(label, maxWidth, minSide)
      let [cx, cy] = path.centroid(labelFeature)
      if (!Number.isFinite(cx) || !Number.isFinite(cy)) {
        cx = (x0 + x1) / 2
        cy = (y0 + y1) / 2
      }

      return {
        key: numericId || name || d.slice(0, 24),
        d,
        cx,
        cy,
        label,
        fontSize,
        fullName: name,
        alpha2,
      }
    }).filter(Boolean)
  }, [width, height, mapZoom])

  const visibleCountryCodes = useMemo(() => {
    const codes = []
    for (const item of items) {
      if (!item?.alpha2) continue
      const sx = item.cx + pan.x
      const sy = item.cy + pan.y
      if (sx > -50 && sx < width + 50 && sy > -50 && sy < height + 50) {
        codes.push(item.alpha2.toUpperCase())
      }
    }
    return codes
  }, [items, pan, width, height])

  const handleGameCorrect = useCallback((alpha2) => {
    setGameCorrectSet((s) => new Set(s).add(alpha2.toUpperCase()))
  }, [])

  const handleGameWrong = useCallback(
    (guessedAlpha2, correctAlpha2) => {
      setGameWrongFlash(guessedAlpha2?.toUpperCase() ?? null)
      setGameRevealCorrect(correctAlpha2?.toUpperCase() ?? null)
      if (gameWrongTimer.current) clearTimeout(gameWrongTimer.current)
      gameWrongTimer.current = setTimeout(() => {
        setGameWrongFlash(null)
        setGameRevealCorrect(null)
      }, 2500)
      setGameCorrectSet((s) => new Set(s).add(correctAlpha2.toUpperCase()))
      const feat = countriesGeo.features.find((f) => {
        const n = Number.parseInt(String(f.id), 10)
        return Number.isFinite(n) && numericToAlpha2(n)?.toUpperCase() === correctAlpha2.toUpperCase()
      })
      if (feat) {
        const targetZoom = 4
        const newPan = computePanFromFeatureSubset([feat], width, height, targetZoom)
        setMapZoom(targetZoom)
        mapZoomRef.current = targetZoom
        setPan(newPan)
      }
    },
    [width, height],
  )

  const handleGameReset = useCallback(() => {
    setGameCorrectSet(new Set())
    setGameWrongFlash(null)
    setGameRevealCorrect(null)
    if (gameWrongTimer.current) clearTimeout(gameWrongTimer.current)
  }, [])

  const visitorStarPosition = useMemo(() => {
    if (!visitorCountryCodeDisplay) {
      return null
    }
    const u = visitorCountryCodeDisplay.toUpperCase()
    const it = items.find((i) => i && String(i.alpha2).toUpperCase() === u)
    return it
      ? { cx: it.cx, cy: it.cy - Math.min(10, it.fontSize + 4) }
      : null
  }, [items, visitorCountryCodeDisplay])

  const visitedHighlightOn = useMemo(
    () =>
      Boolean(
        visitedCountriesOverlay && authUser && visitedSet.size > 0,
      ),
    [visitedCountriesOverlay, authUser, visitedSet],
  )

  const overlayActive =
    selectedEmpireIds.length > 0 ||
    selectedLanguageIds.length > 0 ||
    selectedReligionIds.length > 0 ||
    selectedContinentIds.length > 0 ||
    transcontinentalOverlay ||
    (trafficOverlay != null &&
      (trafficOverlay.lht || trafficOverlay.rht)) ||
    visitedHighlightOn ||
    extraOverlayActive
  const svgOverlayClass = [
    selectedEmpireIds.length > 0 && 'world-map--empire-active',
    selectedLanguageIds.length > 0 && 'world-map--language-active',
    selectedReligionIds.length > 0 && 'world-map--religion-active',
    selectedContinentIds.length > 0 && 'world-map--continent-active',
    transcontinentalOverlay && 'world-map--transcontinental-active',
    trafficOverlay?.lht && 'world-map--traffic-lht-active',
    trafficOverlay?.rht && 'world-map--traffic-rht-active',
    visitedHighlightOn && 'world-map--visited-active',
  ]
    .filter(Boolean)
    .join(' ')

  const selectionSummary = useMemo(() => {
    const hasEmpires = selectedEmpireIds.length > 0
    const hasLanguages = selectedLanguageIds.length > 0
    const hasReligions = selectedReligionIds.length > 0
    const hasContinents = selectedContinentIds.length > 0
    const hasTraffic =
      trafficOverlay != null &&
      (trafficOverlay.lht || trafficOverlay.rht)
    const hasTranscontinental = transcontinentalOverlay
    const hasVisited = visitedHighlightOn
    if (
      !hasEmpires &&
      !hasLanguages &&
      !hasReligions &&
      !hasContinents &&
      !hasTraffic &&
      !hasTranscontinental &&
      !hasVisited
    ) {
      return { kind: /** @type {const} */ ('none') }
    }
    const empireItems = hasEmpires
      ? selectedEmpireIds.map((id) => {
          const meta = getEmpireOption(id)
          return {
            id,
            title: meta?.label ?? id,
            years: meta?.years ?? '',
          }
        })
      : []
    const languageItems = hasLanguages
      ? selectedLanguageIds.map((id) => {
          const meta = getLanguageOption(id)
          return {
            id,
            title: meta?.label ?? id,
            years: meta?.note ?? '',
          }
        })
      : []
    const religionItems = hasReligions
      ? selectedReligionIds.map((id) => {
          const meta = getReligionOption(id)
          return {
            id,
            title: meta?.label ?? id,
            years: meta?.note ?? '',
          }
        })
      : []
    const continentItems = hasContinents
      ? selectedContinentIds.map((id) => {
          const meta = getContinentOption(id)
          return {
            id,
            title: meta?.label ?? id,
            years: meta?.note ?? '',
          }
        })
      : []
    const trafficSummaryItems =
      hasTraffic && trafficOverlay
        ? TRAFFIC_OPTIONS.filter((o) => trafficOverlay[o.id])
            .map((o) => ({
              id: o.id,
              title: o.label,
            }))
        : []
    const transcontinentalSummarySubtitle = hasTranscontinental
      ? `${TRANSCONTINENTAL_OPTIONS.length} countries highlighted`
      : ''
    let visitedSummarySubtitle = ''
    if (hasVisited && visitedCodes.length > 0) {
      if (visitedCodes.length <= 3) {
        visitedSummarySubtitle = visitedCodes
          .map((c) => getCountryDisplayName(c))
          .join(', ')
      } else {
        visitedSummarySubtitle = `${visitedCodes.length} countries`
      }
    }
    return {
      kind: /** @type {const} */ ('mixed'),
      hasEmpires,
      hasLanguages,
      hasReligions,
      hasContinents,
      hasTraffic,
      hasTranscontinental,
      hasVisited,
      empireItems,
      languageItems,
      religionItems,
      continentItems,
      visitedSummarySubtitle,
      trafficSummaryItems,
      transcontinentalSummarySubtitle,
    }
  }, [
    selectedEmpireIds,
    selectedLanguageIds,
    selectedReligionIds,
    selectedContinentIds,
    transcontinentalOverlay,
    trafficOverlay,
    visitedHighlightOn,
    visitedCodes,
  ])

  return (
    <div className="world-map-wrap" ref={containerRef}>
      <div
        className={`right-rail${overlayPanelOpen ? ' right-rail--panel-open' : ''}`}
        aria-label="Quick actions"
      >
        <div className="right-rail__inner">
          <button
            type="button"
            className="right-rail__icon-btn right-rail__icon-btn--overlays"
            aria-label={overlayPanelOpen ? 'Close map overlays panel' : 'Map overlays'}
            aria-expanded={overlayPanelOpen}
            aria-controls="map-overlay-panel"
            data-tooltip={overlayPanelOpen ? 'Close overlays' : 'Map overlays'}
            onClick={() => setOverlayPanelOpen((o) => !o)}
          >
            <svg
              className="right-rail__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h12v2H4v-2z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="right-rail__icon-btn right-rail__icon-btn--recenter"
            aria-label="Recenter map"
            data-tooltip="Recenter map"
            onClick={() => setPan({ x: 0, y: 0 })}
          >
            <svg
              className="right-rail__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 2v3M12 19v3M2 12h3M19 12h3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="right-rail__zoom" aria-label="Map zoom">
            <button
              type="button"
              className="right-rail__icon-btn right-rail__icon-btn--zoom-step right-rail__icon-btn--zoom-in"
              aria-label="Zoom in"
              data-tooltip="Zoom in"
              disabled={mapZoom >= ZOOM_MAX - 1e-6}
              onClick={() =>
                applyInteractiveZoom(mapZoomRef.current + ZOOM_BUTTON_STEP)
              }
            >
              +
            </button>
            <input
              className="right-rail__zoom-slider"
              type="range"
              min={ZOOM_MIN}
              max={ZOOM_MAX}
              step={0.01}
              value={mapZoom}
              aria-label="Zoom"
              onChange={(e) => {
                const v = Number(e.target.value)
                applyInteractiveZoom(Number.isFinite(v) ? v : ZOOM_DEFAULT)
              }}
            />
            <button
              type="button"
              className="right-rail__icon-btn right-rail__icon-btn--zoom-step right-rail__icon-btn--zoom-out"
              aria-label="Zoom out"
              data-tooltip="Zoom out"
              disabled={mapZoom <= ZOOM_MIN + 1e-6}
              onClick={() =>
                applyInteractiveZoom(mapZoomRef.current - ZOOM_BUTTON_STEP)
              }
            >
              −
            </button>
            <div className="right-rail__zoom-value" aria-live="polite">
              {mapZoom.toFixed(2)}×
            </div>
          </div>
          <button
            type="button"
            className="right-rail__icon-btn right-rail__icon-btn--clear"
            aria-label="Clear highlight"
            data-tooltip="Clear highlight"
            disabled={!canClearOverlays}
            onClick={clearAllOverlays}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="right-rail__icon"
            >
              <path
                fill="currentColor"
                d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm4.12 13.54-1.58 1.58L12 13.58l-2.54 2.54-1.58-1.58L10.42 12 7.88 9.46l1.58-1.58L12 10.42l2.54-2.54 1.58 1.58L13.58 12Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className={`right-rail__icon-btn right-rail__icon-btn--game${activeGame ? ' right-rail__icon-btn--game-active' : ''}`}
            aria-label="Games"
            data-tooltip="Games"
            onClick={() => {
              if (activeGame) {
                setActiveGame(null)
                gameGuessRef.current = null
                handleGameReset()
              } else {
                setGameModalOpen(true)
              }
            }}
          >
            <svg
              className="right-rail__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M21 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM7 13H5v-2h2v2Zm4 0H9v-2h2v2Zm4 0h-2v-2h2v2Zm4 0h-2v-2h2v2Z"
              />
            </svg>
          </button>

          {firebaseConfigured ? (
            !authReady ? (
              <button
                type="button"
                className="right-rail__icon-btn"
                aria-label="Auth loading"
                title="Loading…"
                disabled
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="right-rail__icon"
                >
                  <path
                    fill="currentColor"
                    d="M12 4a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6V4Z"
                  />
                </svg>
              </button>
            ) : authUser ? (
              <div
                className="right-rail__logout-wrap"
                data-confirm-root="1"
              >
                <button
                  type="button"
                  className="right-rail__icon-btn right-rail__icon-btn--account right-rail__icon-btn--danger"
                  aria-label={
                    authBusy
                      ? 'Signing out'
                      : `Account (${authUser.email ?? authUser.displayName ?? 'signed in'})`
                  }
                  aria-haspopup="dialog"
                  aria-expanded={logoutConfirmOpen}
                  data-tooltip={authBusy ? 'Signing out…' : 'Account'}
                  disabled={authBusy}
                  onClick={() => setLogoutConfirmOpen((o) => !o)}
                >
                  {authUser.photoURL ? (
                    <img
                      className="right-rail__avatar"
                      src={authUser.photoURL}
                      alt={
                        authUser.displayName ?? authUser.email ?? 'Signed in user'
                      }
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="right-rail__icon"
                    >
                      <path
                        fill="currentColor"
                        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.02-8 4.5V20h16v-1.5c0-2.48-3.58-4.5-8-4.5Z"
                      />
                    </svg>
                  )}
                </button>
                {logoutConfirmOpen ? (
                  <div
                    className="right-rail__confirm"
                    role="dialog"
                    aria-label="Confirm logout"
                  >
                    <div className="right-rail__confirm-title">
                      Log out?
                    </div>
                    <div className="right-rail__confirm-actions">
                      <button
                        type="button"
                        className="right-rail__confirm-btn right-rail__confirm-btn--ghost"
                        onClick={() => setLogoutConfirmOpen(false)}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className="right-rail__confirm-btn right-rail__confirm-btn--danger"
                        onClick={async () => {
                          setLogoutConfirmOpen(false)
                          await handleLogout()
                        }}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                className="right-rail__login-wrap"
                onMouseEnter={openLoginPopover}
                onMouseLeave={scheduleCloseLoginPopover}
                data-confirm-root="1"
              >
                <button
                  type="button"
                  className="right-rail__icon-btn right-rail__icon-btn--login right-rail__icon-btn--google"
                  aria-label={authBusy ? 'Signing in' : 'Log in'}
                  aria-haspopup="dialog"
                  aria-expanded={loginPopoverOpen}
                  data-tooltip={authBusy ? 'Signing in…' : 'Log in'}
                  disabled={authBusy}
                  onFocus={openLoginPopover}
                  onBlur={scheduleCloseLoginPopover}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="right-rail__icon"
                  >
                    <path
                      fill="currentColor"
                      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.02-8 4.5V20h16v-1.5c0-2.48-3.58-4.5-8-4.5Z"
                    />
                  </svg>
                </button>
                {loginPopoverOpen ? (
                  <div
                    className="right-rail__confirm"
                    role="dialog"
                    aria-label="Log in"
                    onMouseEnter={openLoginPopover}
                    onMouseLeave={scheduleCloseLoginPopover}
                  >
                    <div className="right-rail__confirm-title">
                      Log in
                    </div>
                    <div className="right-rail__confirm-actions">
                      <button
                        type="button"
                        className="right-rail__confirm-btn right-rail__confirm-btn--google"
                        disabled={authBusy}
                        onClick={() => {
                          setLoginPopoverOpen(false)
                          loginWithGoogle()
                        }}
                      >
                        Login with Google
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )
          ) : null}

          {authError ? (
            <div className="right-rail__error" role="alert" title={authError}>
              !
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={`map-ui-column${overlayPanelOpen ? ' map-ui-column--panel-open' : ''}`}
      >
      {showLocationBanner ? (
        <div
          className="location-consent-banner"
          role="dialog"
          aria-labelledby="location-consent-title"
          aria-describedby="location-consent-desc"
        >
          <p id="location-consent-title" className="location-consent-banner__title">
            Show your country?
          </p>
          <p id="location-consent-desc" className="location-consent-banner__desc">
            We use a one-time browser position to match you to a country on this
            map and show a star there. If you&apos;re signed in, that country
            code is stored in your account so the star can return on your next
            visit. While signed out, we store the derived country code in your
            browser&apos;s local storage so the star can return on your next
            visit. We do not store raw GPS coordinates.
          </p>
          {locationHint ? (
            <p className="location-consent-banner__hint" role="status">
              {locationHint}
            </p>
          ) : null}
          <div className="location-consent-banner__actions">
            <button
              type="button"
              className="location-consent-banner__btn location-consent-banner__btn--primary"
              disabled={locationRequestBusy}
              onClick={handleAllowLocation}
            >
              {locationRequestBusy ? 'Waiting…' : 'Allow location'}
            </button>
            <button
              type="button"
              className="location-consent-banner__btn location-consent-banner__btn--ghost"
              disabled={locationRequestBusy}
              onClick={handleDeclineLocationPrompt}
            >
              No thanks
            </button>
          </div>
        </div>
      ) : null}
      <div className="overlay-top-controls">
        {activeGame === 'find-country' ? (
          <FindCountryGame
            visibleCountries={visibleCountryCodes}
            onGuess={gameGuessRef}
            onCorrect={handleGameCorrect}
            onWrong={handleGameWrong}
            onReset={handleGameReset}
            onEnd={() => {
              setActiveGame(null)
              gameGuessRef.current = null
              setGameCorrectSet(new Set())
              setGameWrongFlash(null)
              setGameRevealCorrect(null)
              if (gameWrongTimer.current) clearTimeout(gameWrongTimer.current)
            }}
          />
        ) : activeGame === 'capital-quiz' ? (
          <CapitalQuizGame
            visibleCountries={visibleCountryCodes}
            onGuess={gameGuessRef}
            onCorrect={handleGameCorrect}
            onWrong={handleGameWrong}
            onReset={handleGameReset}
            onEnd={() => {
              setActiveGame(null)
              gameGuessRef.current = null
              setGameCorrectSet(new Set())
              setGameWrongFlash(null)
              setGameRevealCorrect(null)
              if (gameWrongTimer.current) clearTimeout(gameWrongTimer.current)
            }}
          />
        ) : (
        <div
          className={`overlay-selection-summary${
            selectionSummary.kind === 'none'
              ? ' overlay-selection-summary--empty'
              : ' overlay-selection-summary--mixed'
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasEmpires
              ? ' overlay-selection-summary--has-empires'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasEmpires &&
            selectionSummary.empireItems.length > 1
              ? ' overlay-selection-summary--multi-empires'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasLanguages
              ? ' overlay-selection-summary--has-languages'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasLanguages &&
            selectionSummary.languageItems.length > 1
              ? ' overlay-selection-summary--multi-languages'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasReligions
              ? ' overlay-selection-summary--has-religions'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasReligions &&
            selectionSummary.religionItems.length > 1
              ? ' overlay-selection-summary--multi-religions'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasContinents
              ? ' overlay-selection-summary--has-continents'
              : ''
          }${
            selectionSummary.kind === 'mixed' &&
            selectionSummary.hasContinents &&
            selectionSummary.continentItems.length > 1
              ? ' overlay-selection-summary--multi-continents'
              : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {selectionSummary.kind === 'none' ? (
            <>
              <span className="overlay-selection-summary__label">
                No overlay
              </span>
              <span className="overlay-selection-summary__hint">
                Open menu to choose
              </span>
            </>
          ) : null}
          {selectionSummary.kind === 'mixed' &&
          selectionSummary.hasContinents ? (
            <div
              className={`overlay-selection-summary__empire-list${
                selectionSummary.continentItems.length > 1
                  ? ' overlay-selection-summary__empire-list--multi'
                  : ''
              }`}
            >
              {selectionSummary.continentItems.map((item) => (
                <div
                  key={`c-${item.id}`}
                  className="overlay-selection-summary__empire-row"
                >
                  <span
                    className={`overlay-selection-summary__swatch overlay-selection-summary__swatch--continent-${item.id}`}
                    aria-hidden
                  />
                  <span className="overlay-selection-summary__text">
                    <span className="overlay-selection-summary__title">
                      {item.title}
                    </span>
                    <span className="overlay-selection-summary__years">
                      {item.years}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {selectionSummary.kind === 'mixed' &&
          selectionSummary.hasLanguages ? (
            <div
              className={`overlay-selection-summary__empire-list${
                selectionSummary.languageItems.length > 1
                  ? ' overlay-selection-summary__empire-list--multi'
                  : ''
              }`}
            >
              {selectionSummary.languageItems.map((item) => (
                <div
                  key={`l-${item.id}`}
                  className="overlay-selection-summary__empire-row"
                >
                  <span
                    className={`overlay-selection-summary__swatch overlay-selection-summary__swatch--lang-${item.id}`}
                    aria-hidden
                  />
                  <span className="overlay-selection-summary__text">
                    <span className="overlay-selection-summary__title">
                      {item.title}
                    </span>
                    <span className="overlay-selection-summary__years">
                      {item.years}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {selectionSummary.kind === 'mixed' &&
          selectionSummary.hasEmpires ? (
            <div
              className={`overlay-selection-summary__empire-list${
                selectionSummary.empireItems.length > 1
                  ? ' overlay-selection-summary__empire-list--multi'
                  : ''
              }`}
            >
              {selectionSummary.empireItems.map((item) => (
                <div
                  key={`e-${item.id}`}
                  className="overlay-selection-summary__empire-row"
                >
                  <span
                    className={`overlay-selection-summary__swatch overlay-selection-summary__swatch--empire-${item.id}`}
                    aria-hidden
                  />
                  <span className="overlay-selection-summary__text">
                    <span className="overlay-selection-summary__title">
                      {item.title}
                    </span>
                    <span className="overlay-selection-summary__years">
                      {item.years}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {selectionSummary.kind === 'mixed' &&
          selectionSummary.hasReligions ? (
            <div
              className={`overlay-selection-summary__empire-list${
                selectionSummary.religionItems.length > 1
                  ? ' overlay-selection-summary__empire-list--multi'
                  : ''
              }`}
            >
              {selectionSummary.religionItems.map((item) => (
                <div
                  key={`r-${item.id}`}
                  className="overlay-selection-summary__empire-row"
                >
                  <span
                    className={`overlay-selection-summary__swatch overlay-selection-summary__swatch--religion-${item.id}`}
                    aria-hidden
                  />
                  <span className="overlay-selection-summary__text">
                    <span className="overlay-selection-summary__title">
                      {item.title}
                    </span>
                    <span className="overlay-selection-summary__years">
                      {item.years}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {selectionSummary.kind === 'mixed' &&
          selectionSummary.hasVisited ? (
            <div className="overlay-selection-summary__empire-list">
              <div className="overlay-selection-summary__empire-row">
                <span
                  className="overlay-selection-summary__swatch overlay-selection-summary__swatch--visited"
                  aria-hidden
                />
                <span className="overlay-selection-summary__text">
                  <span className="overlay-selection-summary__title">
                    Countries I&apos;ve visited
                  </span>
                  <span className="overlay-selection-summary__years">
                    {selectionSummary.visitedSummarySubtitle}
                  </span>
                </span>
              </div>
            </div>
          ) : null}
          {selectionSummary.kind === 'mixed' && selectionSummary.hasTraffic ? (
            <div
              className={`overlay-selection-summary__traffic-rows${
                selectionSummary.trafficSummaryItems.length > 1
                  ? ' overlay-selection-summary__traffic-rows--multi'
                  : ''
              }`}
            >
              {selectionSummary.trafficSummaryItems.map((item) => (
                <div
                  key={`t-${item.id}`}
                  className="overlay-selection-summary__traffic-row"
                >
                  <span
                    className={`overlay-selection-summary__swatch overlay-selection-summary__swatch--traffic-${item.id}`}
                    aria-hidden
                  />
                  <span className="overlay-selection-summary__text">
                    <span className="overlay-selection-summary__title">
                      {item.title}
                    </span>
                    <span className="overlay-selection-summary__years">
                      {item.id === 'lht'
                        ? 'General rule by country · cyan on map'
                        : 'General rule by country · orange on map'}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {selectionSummary.kind === 'mixed' &&
          selectionSummary.hasTranscontinental ? (
            <div className="overlay-selection-summary__empire-list">
              <div className="overlay-selection-summary__empire-row">
                <span
                  className="overlay-selection-summary__swatch overlay-selection-summary__swatch--transcontinental"
                  aria-hidden
                />
                <span className="overlay-selection-summary__text">
                  <span className="overlay-selection-summary__title">
                    Transcontinental countries
                  </span>
                  <span className="overlay-selection-summary__years">
                    {selectionSummary.transcontinentalSummarySubtitle}
                  </span>
                </span>
              </div>
            </div>
          ) : null}
        </div>
        )}
      </div>
      </div>
      <div
        className={`map-zoom-dock${overlayPanelOpen ? ' map-zoom-dock--panel-open' : ''}`}
      >
        {/* moved zoom controls to right rail */}
      </div>
      {overlayPanelOpen ? (
        <button
          type="button"
          className="empire-panel-scrim"
          aria-label="Close panel"
          onClick={() => setOverlayPanelOpen(false)}
        />
      ) : null}
      <aside
        id="map-overlay-panel"
        className={`empire-side-panel${overlayPanelOpen ? ' empire-side-panel--open' : ''}`}
        aria-hidden={!overlayPanelOpen}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="empire-side-panel-inner">
          <div className="empire-side-panel-head">
            <h2 className="empire-side-panel-title">Map overlays</h2>
            <button
              type="button"
              className="empire-side-panel-close"
              aria-label="Close"
              onClick={() => setOverlayPanelOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="empire-side-panel-categories">
          {EXTRA_SECTIONS.map((section) => {
            const cats = EXTRA_OVERLAY_CATEGORIES.filter((c) => c.section === section)
            /* ── count active selections (core + extra) per section ── */
            let coreCount = 0
            if (section === 'Geography') {
              coreCount = selectedContinentIds.length + (transcontinentalOverlay ? 1 : 0)
            } else if (section === 'History') {
              coreCount = selectedEmpireIds.length
            } else if (section === 'Demographics') {
              coreCount = selectedLanguageIds.length + selectedReligionIds.length
            } else if (section === 'Fun') {
              coreCount = (trafficOverlay?.lht ? 1 : 0) + (trafficOverlay?.rht ? 1 : 0) + (visitedCountriesOverlay ? 1 : 0)
            }
            const extraCount = cats.reduce(
              (sum, cat) => sum + (extraSelections[cat.id]?.length || 0),
              0,
            )
            const activeCount = coreCount + extraCount
            return (
              <details key={section} className="extra-overlay-section">
                <summary className="extra-overlay-section-title">
                  <span className="extra-overlay-section-icon" aria-hidden>{SECTION_ICON[section] ?? '📌'}</span>
                  <span className="extra-overlay-section-label">{section}</span>
                  {activeCount > 0 ? (
                    <span className="extra-overlay-section-badge">{activeCount}</span>
                  ) : null}
                </summary>
                <div className="extra-overlay-section-grid">
                  {/* ── Core fieldsets embedded in their section ── */}
                  {section === 'Geography' ? (
                    <>
                      <fieldset className="empire-fieldset empire-fieldset--extra">
                        <legend className="empire-fieldset-legend">Continents</legend>
                        {CONTINENT_OPTIONS.map(({ id, label, note }) => (
                          <label key={id} className="empire-check-row empire-check-row--with-meta">
                            <span className={`continent-option-swatch continent-option-swatch--${id}`} aria-hidden />
                            <input type="checkbox" name={`continent-${id}`} value={id} checked={selectedContinentIds.includes(id)} onChange={() => toggleContinent(id)} />
                            <span className="empire-check-text">
                              <span className="empire-check-title">{label}</span>
                              <span className="empire-check-years">{note}</span>
                            </span>
                          </label>
                        ))}
                      </fieldset>
                      <fieldset className="empire-fieldset empire-fieldset--extra empire-fieldset--transcontinental-block">
                        <legend className="empire-fieldset-legend">Transcontinental countries</legend>
                        <label className="empire-check-row empire-check-row--with-meta empire-check-row--transcontinental">
                          <span className="transcontinental-option-swatch" aria-hidden />
                          <input type="checkbox" name="transcontinental-overlay" checked={transcontinentalOverlay} onChange={toggleTranscontinentalOverlay} />
                          <span className="empire-check-text">
                            <span className="empire-check-title">Highlight on map</span>
                            <span className="empire-check-years">All {TRANSCONTINENTAL_OPTIONS.length} in this curated set</span>
                          </span>
                        </label>
                      </fieldset>
                    </>
                  ) : null}
                  {section === 'History' ? (
                    <fieldset className="empire-fieldset empire-fieldset--extra empire-fieldset--wide-grid">
                      <legend className="empire-fieldset-legend">Historical empires</legend>
                      <div className="empire-fieldset-grid-3">
                        {EMPIRE_OPTIONS.map(({ id, label, years }) => (
                          <label key={id} className="empire-check-row empire-check-row--with-meta">
                            <span className={`empire-option-swatch empire-option-swatch--${id}`} aria-hidden />
                            <input type="checkbox" name={`historical-empire-${id}`} value={id} checked={selectedEmpireIds.includes(id)} onChange={() => toggleEmpire(id)} />
                            <span className="empire-check-text">
                              <span className="empire-check-title">{label}</span>
                              <span className="empire-check-years">{years}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                  {section === 'Demographics' ? (
                    <>
                      <fieldset className="empire-fieldset empire-fieldset--extra">
                        <legend className="empire-fieldset-legend">Major language regions</legend>
                        {LANGUAGE_OPTIONS.map(({ id, label, note }) => (
                          <label key={id} className="empire-check-row empire-check-row--with-meta">
                            <span className={`lang-option-swatch lang-option-swatch--${id}`} aria-hidden />
                            <input type="checkbox" name={`language-region-${id}`} value={id} checked={selectedLanguageIds.includes(id)} onChange={() => toggleLanguage(id)} />
                            <span className="empire-check-text">
                              <span className="empire-check-title">{label}</span>
                              <span className="empire-check-years">{note}</span>
                            </span>
                          </label>
                        ))}
                      </fieldset>
                      <fieldset className="empire-fieldset empire-fieldset--extra">
                        <legend className="empire-fieldset-legend">Major religions</legend>
                        {RELIGION_OPTIONS.map(({ id, label, note }) => (
                          <label key={id} className="empire-check-row empire-check-row--with-meta">
                            <span className={`religion-option-swatch religion-option-swatch--${id}`} aria-hidden />
                            <input type="checkbox" name={`religion-region-${id}`} value={id} checked={selectedReligionIds.includes(id)} onChange={() => toggleReligion(id)} />
                            <span className="empire-check-text">
                              <span className="empire-check-title">{label}</span>
                              <span className="empire-check-years">{note}</span>
                            </span>
                          </label>
                        ))}
                      </fieldset>
                    </>
                  ) : null}
                  {section === 'Fun' ? (
                    <>
                      <fieldset className="empire-fieldset empire-fieldset--extra empire-fieldset--driving-side">
                        <legend className="empire-fieldset-legend">Driving side</legend>
                        {TRAFFIC_OPTIONS.map(({ id, label }) => (
                          <label key={id} className="empire-check-row empire-check-row--traffic">
                            <span className={`traffic-option-legend-swatch traffic-option-legend-swatch--${id}`} aria-hidden title={id === 'lht' ? 'Left-hand traffic (cyan on map)' : 'Right-hand traffic (orange on map)'} />
                            <input type="checkbox" name={`traffic-${id}`} value={id} checked={Boolean(trafficOverlay?.[id])} onChange={() => toggleTrafficSide(id)} />
                            <span>{label}</span>
                          </label>
                        ))}
                      </fieldset>
                    </>
                  ) : null}
                  {/* ── Extra overlay categories ── */}
                  {cats.map((cat) => (
                    <fieldset key={cat.id} className="empire-fieldset empire-fieldset--extra">
                      <legend className="empire-fieldset-legend">{cat.label}</legend>
                      {cat.options.map((opt) => (
                        <label
                          key={opt.id}
                          className="empire-check-row empire-check-row--with-meta"
                        >
                          <span
                            className="extra-option-swatch"
                            style={{ background: opt.stroke }}
                            aria-hidden
                          />
                          <input
                            type="checkbox"
                            name={`extra-${cat.id}-${opt.id}`}
                            value={opt.id}
                            checked={(extraSelections[cat.id] || []).includes(opt.id)}
                            onChange={() => toggleExtraOption(cat.id, opt.id)}
                          />
                          <span className="empire-check-text">
                            <span className="empire-check-title">{opt.label}</span>
                          </span>
                        </label>
                      ))}
                      {cat.note ? (
                        <p className="extra-overlay-note">{cat.note}</p>
                      ) : null}
                    </fieldset>
                  ))}
                  {/* ── Visited countries: sign-in prompt (Fun section, not logged in) ── */}
                  {section === 'Fun' && firebaseConfigured && !authUser ? (
                    <fieldset className="empire-fieldset empire-fieldset--extra visited-countries-fieldset">
                      <legend className="empire-fieldset-legend">
                        Countries I&apos;ve visited
                      </legend>
                      <p className="visited-countries-hint">
                        Sign in to track and highlight countries you&apos;ve visited.
                      </p>
                      <div className="empire-google-auth-wrap">
                        <button
                          type="button"
                          className="empire-google-auth-btn empire-google-auth-btn--login"
                          disabled={authBusy || !authReady}
                          onClick={loginWithGoogle}
                        >
                          {authBusy ? 'Signing in…' : 'Sign in with Google'}
                        </button>
                      </div>
                    </fieldset>
                  ) : null}
                  {/* ── Visited countries (Fun section, auth only) ── */}
                  {section === 'Fun' && authUser ? (
                    <fieldset className="empire-fieldset empire-fieldset--extra visited-countries-fieldset">
                      <legend className="empire-fieldset-legend">
                        Countries I&apos;ve visited
                      </legend>
                      <label className="empire-check-row empire-check-row--with-meta empire-check-row--visited-master">
                        <span className="visited-option-swatch" aria-hidden />
                        <input
                          type="checkbox"
                          name="visited-countries-overlay"
                          checked={visitedCountriesOverlay}
                          onChange={() =>
                            setVisitedCountriesOverlay((v) => !v)
                          }
                        />
                        <span className="empire-check-text">
                          <span className="empire-check-title">Show on map</span>
                          <span className="empire-check-years">
                            Uses the countries you add below
                          </span>
                        </span>
                      </label>
                      {userRtdbLoading ? (
                        <p className="visited-countries-hint">Loading your list…</p>
                      ) : null}
                      {visitedRtdbError ? (
                        <p className="empire-google-auth-error" role="alert">
                          {visitedRtdbError}
                        </p>
                      ) : null}
                      <ul className="visited-countries-list">
                        {visitedCodes.map((code) => (
                          <li key={code} className="visited-countries-list__item">
                            <span className="visited-countries-list__name">
                              {getCountryDisplayName(code)}
                            </span>
                            <button
                              type="button"
                              className="visited-countries-list__remove"
                              aria-label={`Remove ${getCountryDisplayName(code)}`}
                              onClick={() => removeCountry(code)}
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                      {visitCountryPickerOpen ? (
                        <select
                          className="visited-countries-select"
                          aria-label="Choose country to add"
                          value=""
                          onChange={(e) => {
                            const v = e.target.value
                            if (v) {
                              void addCountry(v)
                              e.target.value = ''
                              setVisitCountryPickerOpen(false)
                            }
                          }}
                        >
                          <option value="">Choose a country…</option>
                          {MAP_ALPHA2_CODES_SORTED.filter((c) => !visitedSet.has(c)).map(
                            (code) => (
                              <option key={code} value={code}>
                                {getCountryDisplayName(code)}
                              </option>
                            ),
                          )}
                        </select>
                      ) : null}
                      <button
                        type="button"
                        className="visited-countries-add-btn"
                        disabled={
                          !visitCountryPickerOpen &&
                          visitedSet.size >= MAP_ALPHA2_CODES_SORTED.length
                        }
                        onClick={() => setVisitCountryPickerOpen((o) => !o)}
                      >
                        {visitCountryPickerOpen ? 'Cancel' : '+ Add country'}
                      </button>
                    </fieldset>
                  ) : null}
                </div>
              </details>
            )
          })}
          </div>
          <div
            className={`empire-panel-actions${
              firebaseConfigured ? ' empire-panel-actions--with-auth' : ''
            }`}
          >
            {/* moved Clear + Auth actions to right rail */}
          </div>
        </div>
      </aside>
      <div className="map-viewport" ref={mapViewportRef}>
        <svg
          className={`world-map${isMapDragging ? ' world-map--dragging' : ''}${svgOverlayClass ? ` ${svgOverlayClass}` : ''}`}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="World map, countries labeled with ISO codes; hover for full name. Drag to pan."
          onPointerDown={handleMapPointerDown}
          onPointerMove={handleMapPointerMove}
          onPointerUp={handleMapPointerUp}
          onPointerCancel={handleMapPointerUp}
          onDragStart={(e) => e.preventDefault()}
        >
          <title>World map</title>
          <defs>
          <pattern
            id="empire-overlap-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <rect width="7" height="7" fill="#352a48" />
            <path
              d="M0 7 L7 0 M-1.5 2.5 L2.5 -1.5 M4.5 8.5 L8.5 4.5"
              fill="none"
              stroke="#c9a24d"
              strokeWidth="1.15"
              strokeOpacity="0.65"
            />
            <path
              d="M0 0 L7 7 M-1.5 4.5 L4.5 -1.5 M2.5 8.5 L8.5 2.5"
              fill="none"
              stroke="#5a8ab8"
              strokeWidth="0.9"
              strokeOpacity="0.4"
            />
          </pattern>
          <pattern
            id="overlay-cross-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <rect width="7" height="7" fill="#2a2438" />
            <path
              d="M0 3.5 L7 3.5 M3.5 0 L3.5 7"
              fill="none"
              stroke="#b86b9e"
              strokeWidth="0.85"
              strokeOpacity="0.55"
            />
            <path
              d="M0 0 L7 7 M0 7 L7 0"
              fill="none"
              stroke="#6bc4a8"
              strokeWidth="0.75"
              strokeOpacity="0.45"
            />
          </pattern>
          <pattern
            id="religion-overlap-hatch"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <rect width="7" height="7" fill="#2d2238" />
            <path
              d="M0 0 L7 7 M7 0 L0 7"
              fill="none"
              stroke="#c9a0e0"
              strokeWidth="1"
              strokeOpacity="0.55"
            />
          </pattern>
          <pattern
            id="overlay-mixed-hatch"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <rect width="8" height="8" fill="#1e2834" />
            <circle cx="2" cy="2" r="1.1" fill="#7eb8d4" fillOpacity="0.55" />
            <circle cx="6" cy="6" r="1.1" fill="#d4a85c" fillOpacity="0.5" />
            <path
              d="M0 4 L8 4"
              stroke="#94a3b8"
              strokeWidth="0.7"
              strokeOpacity="0.45"
            />
          </pattern>
          <radialGradient id="ocean-gradient" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#1a6fa0" />
            <stop offset="50%" stopColor="#1b5a85" />
            <stop offset="100%" stopColor="#0e3a5c" />
          </radialGradient>
        </defs>
        <rect className="world-map-ocean" x="0" y="0" width={width} height={height} />
        <g
          className="map-pan-layer"
          transform={`translate(${pan.x},${pan.y})`}
        >
          {items.map(({ key, d, cx, cy, label, fontSize, fullName, alpha2 }) => {
            const inOverlay = countryInOverlay(
              alpha2,
              selectedEmpireIds,
              trafficOverlay,
              selectedLanguageIds,
              selectedReligionIds,
              selectedContinentIds,
              transcontinentalOverlay,
              visitedHighlightOn,
              visitedSet,
              extraSelections,
            )
            const faded = overlayActive && !inOverlay
            const hi = mapHighlightClass(
              alpha2,
              selectedEmpireIds,
              selectedLanguageIds,
              selectedReligionIds,
              selectedContinentIds,
              transcontinentalOverlay,
              trafficOverlay,
              visitedHighlightOn,
              visitedSet,
              extraSelections,
            )
            const extraColor = hi === 'country--extra-overlay'
              ? getExtraOverlayColor(alpha2, extraSelections)
              : null
            const extraStyle = extraColor
              ? {
                  '--xfill': extraColor.fill,
                  '--xstroke': extraColor.stroke,
                  '--xtext': extraColor.text,
                  '--xhover': extraColor.hover,
                }
              : undefined
            const a2Upper = alpha2?.toUpperCase()
            const isGameCorrect = activeGame && a2Upper && gameCorrectSet.has(a2Upper)
            const isGameWrongFlash = activeGame && a2Upper && gameWrongFlash === a2Upper
            const isGameReveal = activeGame && a2Upper && gameRevealCorrect === a2Upper
            return (
            <g
              key={key}
              className={`country${inOverlay && hi ? ` ${hi}` : ''}${faded ? ' country--faded' : ''}${activeGame ? ' country--game-clickable' : ''}${isGameCorrect ? ' country--game-correct' : ''}${isGameWrongFlash ? ' country--game-wrong-flash' : ''}${isGameReveal ? ' country--game-reveal' : ''}`}
              style={extraStyle}
              data-alpha2={alpha2 ?? ''}
              onMouseEnter={(ev) =>
                activeGame !== 'find-country' && setTooltip({
                  fullName,
                  x: ev.clientX,
                  y: ev.clientY,
                })
              }
              onMouseMove={(ev) =>
                activeGame !== 'find-country' && setTooltip({
                  fullName,
                  x: ev.clientX,
                  y: ev.clientY,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              <path d={d} vectorEffect="non-scaling-stroke" />
              {activeGame !== 'find-country' && (
              <text x={cx} y={cy} fontSize={fontSize}>
                {label}
              </text>
              )}
            </g>
            )
          })}
          {visitorStarPosition ? (
            <g
              className="visitor-location-star"
              transform={`translate(${visitorStarPosition.cx},${visitorStarPosition.cy})`}
              role="img"
              aria-label="Your approximate location (country)"
            >
              <path
                d={VISITOR_STAR_PATH}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ) : null}
        </g>
        </svg>
        {tooltip?.fullName ? (
          <div
            className="country-tooltip"
            style={{
              left: tooltip.x + 14,
              top: tooltip.y + 14,
            }}
            role="status"
            aria-live="polite"
          >
            {tooltip.fullName}
          </div>
        ) : null}
      </div>
      <GameModal
        open={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        onSelectGame={(id) => setActiveGame(id)}
      />
    </div>
  )
}
