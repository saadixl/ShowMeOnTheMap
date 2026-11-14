/**
 * Generic extra overlays for the world map.
 * All data is approximate and for educational / visualization purposes only.
 * Modern borders ≠ historical boundaries; classifications are simplified.
 */

const $ = (s) => s.trim().split(/\s+/)

/* ═══════════════════════════════════════════════════════════════════════
   UI section ordering
   ═══════════════════════════════════════════════════════════════════════ */

/** Ordered list of section names shown in the side panel. */
export const EXTRA_SECTIONS = [
  'Geography',
  'Environment',
  'History',
  'Politics',
  'Economy',
  'Demographics',
  'Culture',
  'Fun',
]

/* ═══════════════════════════════════════════════════════════════════════
   Category definitions — each has: id, label, section, note, defaultZoom,
   and options[].  Every option carries its own colour set + alpha-2 list.
   ═══════════════════════════════════════════════════════════════════════ */

/** @type {readonly object[]} */
export const EXTRA_OVERLAY_CATEGORIES = [
  /* ── POLITICS ───────────────────────────────────────────────────── */
  {
    id: 'gov-type',
    label: 'Government type',
    section: 'Politics',
    note: 'Simplified classification (2024)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'republic',
        label: 'Republic',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`US FR DE IT PT GR PL CZ SK HU RO BG SI HR RS ME MK AL EE LV LT
          UA BY MD GE AM AZ TR CY MT IS IE FI CH AT RU KZ KG UZ TJ TM MN
          IN PK BD LK MV NP MM ID PH SG TW KR IR IQ SY LB IL PS EG LY TN
          DZ SD SS SO DJ YE NG GH KE UG TZ ZA ZW BW NA MW MZ MG ZM SN ML
          BF NE TD CF GA CG CD CM CI GN GW SL LR GM BJ TG RW BI AO GQ CV
          ST MU SC KM MX GT HN SV NI CR PA CO VE EC PE BO CL AR PY UY BR
          GY TT DO HT BB DM FJ WS KI NR MH FM PW TL`),
      },
      {
        id: 'const-monarchy',
        label: 'Constitutional monarchy',
        fill: '#2a1a3a',
        stroke: '#8b5cf6',
        text: '#c4b5fd',
        hover: '#342448',
        codes: $(`GB AU NZ CA JM BS BZ AG KN LC VC GD PG SB TV TO
          SE NO DK NL BE LU ES JP TH MY KH BT JO KW BH MA LS`),
      },
      {
        id: 'abs-monarchy',
        label: 'Absolute monarchy',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $('SA BN OM QA AE SZ'),
      },
      {
        id: 'one-party',
        label: 'One-party state',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $('CN CU VN LA KP ER'),
      },
    ],
  },
  {
    id: 'nato',
    label: 'NATO members',
    section: 'Politics',
    note: 'North Atlantic Treaty Organization (2024)',
    defaultZoom: 2.5,
    options: [
      {
        id: 'member',
        label: 'Member state',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`US CA GB FR DE IT NL BE LU NO DK IS PT ES GR TR
          PL CZ HU SK AL HR SI RO BG EE LV LT MK ME FI SE`),
      },
    ],
  },
  {
    id: 'eu',
    label: 'EU members',
    section: 'Politics',
    note: 'European Union (2024)',
    defaultZoom: 3.0,
    options: [
      {
        id: 'member',
        label: 'Member state',
        fill: '#1a1a4a',
        stroke: '#6366f1',
        text: '#a5b4fc',
        hover: '#242454',
        codes: $(`AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT
          LV LT LU MT NL PL PT RO SK SI ES SE`),
      },
    ],
  },
  {
    id: 'g20',
    label: 'G20 members',
    section: 'Politics',
    note: 'Group of Twenty (19 countries + EU/AU)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'member',
        label: 'Member',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $('AR AU BR CA CN FR DE IN ID IT JP MX RU SA ZA KR TR GB US'),
      },
    ],
  },
  {
    id: 'nuclear',
    label: 'Nuclear weapons states',
    section: 'Politics',
    note: 'Countries possessing nuclear weapons',
    defaultZoom: 1.2,
    options: [
      {
        id: 'declared',
        label: 'Declared',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $('US RU GB FR CN IN PK KP'),
      },
      {
        id: 'undeclared',
        label: 'Undeclared / suspected',
        fill: '#2a2018',
        stroke: '#f97316',
        text: '#fdba74',
        hover: '#342a22',
        codes: $('IL'),
      },
    ],
  },
  {
    id: 'un-founders',
    label: 'UN founding members',
    section: 'Politics',
    note: 'Original signatories (1945)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'founder',
        label: 'Founding member',
        fill: '#1a2a34',
        stroke: '#06b6d4',
        text: '#67e8f9',
        hover: '#22343e',
        codes: $(`US GB FR RU CN AR AU BY BE BO BR CA CL CO CR CU DK DO EC EG
          SV ET GR GT HT HN IN IR IQ JO LB LR LU MX NL NZ NI NO PA PY
          PE PH PL SA ZA SY TR UA UY VE`),
      },
    ],
  },
  {
    id: 'asean',
    label: 'ASEAN members',
    section: 'Politics',
    note: 'Association of Southeast Asian Nations',
    defaultZoom: 3.5,
    options: [
      {
        id: 'member',
        label: 'Member state',
        fill: '#1a2a30',
        stroke: '#14b8a6',
        text: '#5eead4',
        hover: '#223438',
        codes: $('BN KH ID LA MY MM PH SG TH VN'),
      },
    ],
  },

  /* ── HISTORY ────────────────────────────────────────────────────── */
  {
    id: 'ww2',
    label: 'WWII alliances',
    section: 'History',
    note: 'Major belligerents (1939–1945, simplified)',
    defaultZoom: 1.1,
    options: [
      {
        id: 'allied',
        label: 'Allied Powers',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`US GB FR RU CN CA AU NZ IN PK BD LK ZA BR PL GR NO NL BE LU
          DK CZ SK PH MX ET EG RS BA SI HR ME MK AL`),
      },
      {
        id: 'axis',
        label: 'Axis Powers',
        fill: '#4a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#5c2424',
        codes: $('DE JP IT HU RO BG FI TH AT'),
      },
    ],
  },
  {
    id: 'soviet',
    label: 'Former Soviet Union',
    section: 'History',
    note: '15 post-Soviet states (dissolved 1991)',
    defaultZoom: 1.8,
    options: [
      {
        id: 'ussr',
        label: 'Post-Soviet state',
        fill: '#4a1a1a',
        stroke: '#dc2626',
        text: '#fca5a5',
        hover: '#5c2424',
        codes: $('RU UA BY MD GE AM AZ KZ KG UZ TJ TM EE LV LT'),
      },
    ],
  },
  {
    id: 'yugoslavia',
    label: 'Former Yugoslavia',
    section: 'History',
    note: '7 successor states (dissolved 1991–2006)',
    defaultZoom: 5.5,
    options: [
      {
        id: 'yugo',
        label: 'Successor state',
        fill: '#1a2a4a',
        stroke: '#6366f1',
        text: '#a5b4fc',
        hover: '#242e54',
        codes: $('RS HR BA SI ME MK XK'),
      },
    ],
  },

  /* ── GEOGRAPHY ──────────────────────────────────────────────────── */
  {
    id: 'landlocked',
    label: 'Landlocked countries',
    section: 'Geography',
    note: 'No coastline / no direct ocean access',
    defaultZoom: 1.1,
    options: [
      {
        id: 'yes',
        label: 'Landlocked',
        fill: '#2a2018',
        stroke: '#a16207',
        text: '#d4a74c',
        hover: '#342a22',
        codes: $(`AF AM AT AZ BY BT BO BW BF BI CF TD CZ ET HU KZ KG LA LS LU
          MW ML MD MN NE NP MK PY RW RS SK SS SZ CH TJ TM UG UZ ZM ZW`),
      },
    ],
  },
  {
    id: 'island',
    label: 'Island nations',
    section: 'Geography',
    note: 'Countries entirely or primarily on islands',
    defaultZoom: 1.05,
    options: [
      {
        id: 'yes',
        label: 'Island nation',
        fill: '#1a2a30',
        stroke: '#0891b2',
        text: '#22d3ee',
        hover: '#223438',
        codes: $(`JP PH ID LK MG CU JM HT DO TT BS BB IS IE GB CY MT SG NZ AU
          FJ SB PG VU KI TV NR TO WS MV MU SC BH TL BN AG KN LC VC GD
          DM ST CV KM FM MH PW`),
      },
    ],
  },

  /* ── ECONOMY ────────────────────────────────────────────────────── */
  {
    id: 'gdp',
    label: 'GDP per capita',
    section: 'Economy',
    note: 'World Bank income classification (~2024)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'high',
        label: 'High income',
        fill: '#1a3a2a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a34',
        codes: $(`US CA AU NZ JP KR SG TW GB FR DE IT ES PT NL BE LU CH AT SE NO
          DK FI IS IE PL CZ SK HU HR SI EE LV LT RO BG GR CY MT AE QA
          SA KW BH OM IL CL UY TT PA BS AG MU SC GQ`),
      },
      {
        id: 'upper-mid',
        label: 'Upper-middle income',
        fill: '#1a2a18',
        stroke: '#84cc16',
        text: '#bef264',
        hover: '#223422',
        codes: $(`CN RU TR MX BR AR CO PE EC DO CR JM GY MY TH ID KZ AZ GE BY
          ZA BW NA GA LY IQ AL ME MK RS BA MD FJ TO MV PY TM DZ JO LB`),
      },
      {
        id: 'lower-mid',
        label: 'Lower-middle income',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`IN PK BD LK NP MM VN PH KH LA TL EG PS SY IR MA TN NG GH KE
          CI CM SN BJ ZM ZW TZ AO UZ KG TJ BO HN NI SV GT BZ HT CU VE
          VU SB KI PG MR CV KM`),
      },
      {
        id: 'low',
        label: 'Low income',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $(`AF BF BI CF TD CD ER ET GM GN GW KP LR MG MW ML MZ NE RW SL
          SO SS SD TG UG YE`),
      },
    ],
  },
  {
    id: 'opec',
    label: 'OPEC members',
    section: 'Economy',
    note: 'Organization of the Petroleum Exporting Countries',
    defaultZoom: 2.0,
    options: [
      {
        id: 'member',
        label: 'Member',
        fill: '#1a3a1a',
        stroke: '#15803d',
        text: '#4ade80',
        hover: '#224a24',
        codes: $('DZ AO CG GQ GA IR IQ KW LY NG SA AE VE'),
      },
    ],
  },
  {
    id: 'eurozone',
    label: 'Eurozone',
    section: 'Economy',
    note: 'Countries using the euro (€) as currency',
    defaultZoom: 3.0,
    options: [
      {
        id: 'member',
        label: 'Eurozone member',
        fill: '#1a2a18',
        stroke: '#84cc16',
        text: '#bef264',
        hover: '#223422',
        codes: $('AT BE HR CY EE FI FR DE GR IE IT LV LT LU MT NL PT SK SI ES'),
      },
    ],
  },

  /* ── DEMOGRAPHICS ───────────────────────────────────────────────── */
  {
    id: 'hdi',
    label: 'Human Development Index',
    section: 'Demographics',
    note: 'UNDP classification (approximate, ~2023)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'very-high',
        label: 'Very high (≥0.800)',
        fill: '#1a2a34',
        stroke: '#06b6d4',
        text: '#67e8f9',
        hover: '#22343e',
        codes: $(`US CA AU NZ JP KR SG GB FR DE IT ES PT NL BE LU CH AT SE NO DK
          FI IS IE PL CZ SK HU HR SI EE LV LT RO BG GR CY MT AE QA SA
          KW BH IL AR CL UY CR TT MY KZ RU BY TR GE AL MK RS ME BA`),
      },
      {
        id: 'high',
        label: 'High (0.700–0.799)',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`MX BR CO PE EC DO PA JM VE PY BO GY CN TH VN PH ID AZ TM UZ
          MN AM MD UA KG TJ ZA BW NA MU SC LK MV EG TN MA DZ LY JO LB
          PS IR IQ FJ TO WS`),
      },
      {
        id: 'medium',
        label: 'Medium (0.550–0.699)',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`IN BD NP MM KH LA TL NG GH KE CM SN BJ ZM ZW TZ UG AO SY HN
          NI SV GT BZ HT VU SB KI PG MR CV KM DJ GA CG RW`),
      },
      {
        id: 'low',
        label: 'Low (<0.550)',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $(`AF PK BF BI CF TD CD ER ET GM GN GW KP LR MG MW ML MZ NE SL
          SO SS SD TG YE`),
      },
    ],
  },
  {
    id: 'life-exp',
    label: 'Life expectancy',
    section: 'Demographics',
    note: 'Approximate tiers (~2023)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'high',
        label: 'High (75+)',
        fill: '#1a3a2a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a34',
        codes: $(`US CA AU NZ JP KR SG TW CN MY TH VN GB FR DE IT ES PT NL BE LU
          CH AT SE NO DK FI IS IE PL CZ SK HU HR SI EE LV LT RO BG GR
          CY MT AE QA KW BH IL CL UY CR PA CU AR MX CO TR GE AL MK MV`),
      },
      {
        id: 'medium',
        label: 'Medium (65–75)',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`RU BR PE EC DO VE BO PY GY IN PK BD LK NP ID PH KH LA MM KZ
          AZ AM BY TM UZ KG TJ MN EG MA TN DZ LY IR IQ JO LB PS SY ZA
          BW NA MU LS SZ ZM ZW GT HN SV NI BZ HT JM TT BS BB DM AG FJ
          TO PG SB VU RW BJ SN SC`),
      },
      {
        id: 'low',
        label: 'Low (<65)',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $(`AF NG GH KE UG TZ MW MZ MG ML BF NE TD CF GA CG CD CM CI GN
          GW SL LR BI AO GQ CV ST KM DJ ER ET SO SS SD YE KP MR GM TG`),
      },
    ],
  },
  {
    id: 'pop-density',
    label: 'Population density',
    section: 'Demographics',
    note: 'Approximate people per km² (~2024)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'high',
        label: 'High (>150/km²)',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $(`BD SG BH NL KR RW IN BE PH JP LK IL VN GB DE IT CH HT KW QA
          NP PK MT MV GM`),
      },
      {
        id: 'medium',
        label: 'Medium (50–150/km²)',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`FR ES PT GR CY PL CZ SK HU HR SI AT DK IE CN TH MY ID KH AZ
          GE AM TR JO EG MA TN NG GH UG TZ KE CI CM SN BJ TG MW MX GT
          SV HN NI CR PA CU DO JM TT CO EC FJ RO BG RS MK AL ME BA LV
          LT MM SC BF GW SL LR`),
      },
      {
        id: 'low',
        label: 'Low (<50/km²)',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`US CA RU AU NZ BR AR CL UY PY VE BO PE SE NO FI IS UA BY MD MN
          KZ KG UZ TJ TM AF IR SA OM YE IQ LY DZ SD SS CF TD NE ML MR
          GA CG CD AO MZ MG NA BW ZA ZM ZW LS SZ BI SO DJ ER ET LA BT`),
      },
    ],
  },
  {
    id: 'literacy',
    label: 'Literacy rate',
    section: 'Demographics',
    note: 'Approximate adult literacy (~2023)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'high',
        label: 'High (95%+)',
        fill: '#1a3a2a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a34',
        codes: $(`US CA AU NZ JP KR SG TW CN GB FR DE IT ES PT NL BE LU CH AT SE
          NO DK FI IS IE PL CZ SK HU HR SI EE LV LT RO BG GR CY MT RU
          UA BY MD GE AM AZ KZ KG UZ TJ TM MN AR CL UY CR PA CU BR CO
          EC PE DO MX TT JM MY TH VN PH ID IL TR AL MK RS ME BA SA AE
          QA KW BH OM`),
      },
      {
        id: 'medium',
        label: 'Medium (70–95%)',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`IN BD LK NP KH LA MM TL EG MA TN DZ LY IR IQ JO LB PS SY YE
          ZA BW NA MU LS SZ ZM ZW GH KE UG TZ RW BO PY HN NI GT SV BZ
          HT GY FJ TO PG SB VU`),
      },
      {
        id: 'low',
        label: 'Low (<70%)',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $(`AF PK NG CM CI SN ML BF NE TD CF GA CG CD GN GW SL LR GM BJ
          TG BI AO MW MZ MG KM DJ ER ET SO SS SD GQ ST MR`),
      },
    ],
  },

  /* ── CULTURE ────────────────────────────────────────────────────── */
  {
    id: 'writing',
    label: 'Writing systems',
    section: 'Culture',
    note: 'Primary official script (simplified)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'latin',
        label: 'Latin script',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`US CA MX GT HN SV NI CR PA CU DO JM TT BS BB BZ GY AG KN LC
          VC GD DM CO VE EC PE BO CL AR PY UY BR GB IE FR DE IT ES PT NL
          BE LU CH AT SE NO DK FI IS PL CZ SK HU HR SI RO AL EE LV LT
          MT CY TR AZ NG GH KE TZ ZA ZW BW NA MW MZ MG ZM SN ML BF NE
          TD CF GA CG CD CM CI GN GW SL LR GM BJ TG RW BI AO GQ CV ST
          MU SC LS SZ SS DJ SO UG ID MY SG PH VN TL AU NZ FJ SB PG VU
          KI TV NR TO WS FM MH PW TM UZ HT`),
      },
      {
        id: 'arabic',
        label: 'Arabic script',
        fill: '#1a3a2a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a34',
        codes: $('SA AE QA KW BH OM YE IQ SY JO PS IR EG LY TN DZ MA MR SD AF PK'),
      },
      {
        id: 'cyrillic',
        label: 'Cyrillic script',
        fill: '#3a1a1a',
        stroke: '#ef4444',
        text: '#fca5a5',
        hover: '#4a2424',
        codes: $('RU UA BY BG RS MK KZ KG TJ MN'),
      },
      {
        id: 'cjk',
        label: 'CJK characters',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $('CN TW JP KR KP'),
      },
      {
        id: 'south-se-asian',
        label: 'South & SE Asian',
        fill: '#2a2018',
        stroke: '#f97316',
        text: '#fdba74',
        hover: '#342a22',
        codes: $('IN NP BD LK BT MV TH KH MM LA'),
      },
      {
        id: 'other-script',
        label: 'Other script',
        fill: '#2a1a3a',
        stroke: '#a855f7',
        text: '#d8b4fe',
        hover: '#342448',
        codes: $('GR GE AM IL ET ER'),
      },
    ],
  },
  {
    id: 'independence',
    label: 'Independence era',
    section: 'Culture',
    note: 'Approximate period of modern sovereignty',
    defaultZoom: 1.05,
    options: [
      {
        id: 'pre-1900',
        label: 'Pre-1900',
        fill: '#2a1a3a',
        stroke: '#a855f7',
        text: '#d8b4fe',
        hover: '#342448',
        codes: $(`US HT AR CL CO EC VE MX PE BR PY UY BO CR SV GT HN NI PA CU
          DO LR GB FR DE IT ES PT NL BE LU CH AT SE NO DK IS GR BG RO RS
          AL JP CN TH IR ET OM RU NP CA`),
      },
      {
        id: '1900-1959',
        label: '1900–1959',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $(`TR IE FI PL EE LV LT CZ SK HU AU NZ ZA EG IQ JO LB SY AF MN
          SA IL IN PK LK MM ID PH MA TN LY SD GH GN KR KP`),
      },
      {
        id: '1960-1991',
        label: '1960–1991',
        fill: '#1a3a2a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a34',
        codes: $(`DZ AO BJ BW BF BI CV CM CF TD KM CG CD CI DJ GQ GA GM GW KE
          LS MG MW ML MR MU MZ NE NG RW ST SN SC SL SO SZ TZ TG UG ZM
          ZW MY SG BN KH LA VN BD YE AE QA KW BH JM TT BS BB BZ GY AG
          KN LC VC GD DM FJ WS TO NR KI PG SB VU TV FM MH NA MV`),
      },
      {
        id: '1992-plus',
        label: '1992+',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`UA BY MD GE AM AZ KZ KG TJ TM UZ HR SI BA MK ME ER SS PW TL`),
      },
    ],
  },
  /* ── FUN ─────────────────────────────────────────────────────── */
  {
    id: 'fifa',
    label: 'FIFA World Cup',
    section: 'Fun',
    note: 'Winners and host countries (men\'s)',
    defaultZoom: 1.1,
    options: [
      {
        id: 'winners',
        label: 'Winners',
        fill: '#2a2818',
        stroke: '#eab308',
        text: '#fde047',
        hover: '#343222',
        codes: $('BR DE IT AR FR UY GB ES'),
      },
      {
        id: 'hosts',
        label: 'Host countries',
        fill: '#1a3a2a',
        stroke: '#22c55e',
        text: '#86efac',
        hover: '#224a34',
        codes: $('UY IT FR BR CH SE CL GB MX DE AR ES US KR JP ZA RU QA CA'),
      },
    ],
  },
  {
    id: 'olympic-hosts',
    label: 'Olympic hosts (Summer)',
    section: 'Fun',
    note: 'Countries that have hosted Summer Olympics',
    defaultZoom: 1.2,
    options: [
      {
        id: 'host',
        label: 'Host country',
        fill: '#2a2018',
        stroke: '#f97316',
        text: '#fdba74',
        hover: '#342a22',
        codes: $('GR FR US GB SE BE NL DE FI AU IT JP MX CA RU KR ES CN BR'),
      },
    ],
  },
  {
    id: 'mcdonalds',
    label: "McDonald's presence",
    section: 'Fun',
    note: 'Countries with McDonald\'s restaurants (~2024)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'yes',
        label: "Has McDonald's",
        fill: '#3a1a18',
        stroke: '#dc2626',
        text: '#fca5a5',
        hover: '#44242a',
        codes: $(`US CA MX GT SV HN NI CR PA CO VE EC PE CL AR UY PY BR DO JM
          TT BS GB IE FR DE IT ES PT NL BE LU CH AT SE NO DK FI PL CZ SK
          HU RO BG GR CY MT HR SI EE LV LT RS ME BA MK AL MD UA JP KR
          CN TW SG MY TH PH ID VN IN PK LK AZ GE KZ TR IL JO LB SA AE
          QA KW BH OM EG MA ZA MU AU NZ FJ`),
      },
    ],
  },
  {
    id: 'commonwealth',
    label: 'Commonwealth of Nations',
    section: 'Fun',
    note: '56-member intergovernmental organisation',
    defaultZoom: 1.05,
    options: [
      {
        id: 'member',
        label: 'Member',
        fill: '#2a1a3a',
        stroke: '#a855f7',
        text: '#d8b4fe',
        hover: '#342448',
        codes: $(`AG AU BS BD BB BZ BW BN CM CA CY DM FJ GA GM GH GD GY IN JM
          KE KI LS MW MY MV MT MU MZ NA NR NZ NG PK PG RW KN LC VC WS
          SC SL SG SB ZA LK SZ TZ TG TO TT TV UG GB VU ZM`),
      },
    ],
  },

  /* ── POLITICS (extra) ───────────────────────────────────────────── */
  {
    id: 'brics',
    label: 'BRICS members',
    section: 'Politics',
    note: 'Original (2009) + 2024 expanded members (Indonesia declined)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'original',
        label: 'Original members (2009)',
        fill: '#2a2010',
        stroke: '#d97706',
        text: '#fcd34d',
        hover: '#342a18',
        codes: $('BR RU IN CN ZA'),
      },
      {
        id: 'expanded',
        label: '2024 expanded members',
        fill: '#1a2010',
        stroke: '#a16207',
        text: '#fde68a',
        hover: '#222a18',
        codes: $('EG ET IR AE SA'),
      },
    ],
  },
  {
    id: 'arab-league',
    label: 'Arab League members',
    section: 'Politics',
    note: 'League of Arab States — 22 member states',
    defaultZoom: 2.5,
    options: [
      {
        id: 'member',
        label: 'Member state',
        fill: '#1a2e1a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#223a22',
        codes: $(`DZ BH KM DJ EG IQ JO KW LB LY MR MA OM PS QA SA SO SD SY
          TN AE YE`),
      },
    ],
  },

  /* ── GEOGRAPHY (extra) ──────────────────────────────────────────── */
  {
    id: 'climate',
    label: 'Climate zones',
    section: 'Geography',
    note: 'Dominant Köppen climate classification (simplified)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'tropical',
        label: 'Tropical',
        fill: '#1a3a1a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a22',
        codes: $(`BR CO EC PE VE GY SR GF BO PA CR NI HN GT BZ MX TT BB GD
          LC VC KN AG DM JM HT DO CU BS TZ KE UG RW BI CD CG GA CM NG
          CI GH BJ TG SL LR GN GW GM SN BF CF SS ET DJ SO MG MZ MW ZM
          AO CV ST GQ IN BD LK TH MM MY ID PH SG BN PG SB VU FJ TO WS
          KI TV NR MH FM PW TL`),
      },
      {
        id: 'arid',
        label: 'Arid / Desert',
        fill: '#2a2010',
        stroke: '#d97706',
        text: '#fcd34d',
        hover: '#342a18',
        codes: $(`SA AE QA KW BH OM YE JO SY IQ EG LY TN DZ MA MR SD ER
          AF PK IR UZ TM KZ MN NE ML TD NM NA BW ZW LS SZ CL AR AU`),
      },
      {
        id: 'mediterranean',
        label: 'Mediterranean',
        fill: '#2a2a10',
        stroke: '#ca8a04',
        text: '#fde68a',
        hover: '#343418',
        codes: $(`ES PT IT GR TR CY MT AL ME RS MK HR BA IL LB PS MA TN DZ
          AU ZA CL`),
      },
      {
        id: 'temperate',
        label: 'Temperate / Oceanic',
        fill: '#1a2a2a',
        stroke: '#0891b2',
        text: '#67e8f9',
        hover: '#223434',
        codes: $(`GB IE FR DE NL BE LU CH AT DK SE NO PL CZ SK HU RO BG
          EE LV LT MD UA BY GE AM AZ NZ US CA AR UY BR CL`),
      },
      {
        id: 'continental',
        label: 'Continental',
        fill: '#1a1a3a',
        stroke: '#6366f1',
        text: '#a5b4fc',
        hover: '#222254',
        codes: $(`RU KZ KG TJ MN CN KP KR JP FI SE NO PL CZ SK HU RO
          EE LV LT BY UA US CA`),
      },
      {
        id: 'subarctic',
        label: 'Subarctic / Tundra',
        fill: '#2a1a3a',
        stroke: '#a855f7',
        text: '#d8b4fe',
        hover: '#342448',
        codes: $('RU CA NO SE FI IS MN'),
      },
      {
        id: 'polar',
        label: 'Polar',
        fill: '#1e2a34',
        stroke: '#bae6fd',
        text: '#e0f2fe',
        hover: '#263444',
        codes: $('AQ IS GL'),
      },
    ],
  },

  /* ── ECONOMY (extra) ────────────────────────────────────────────── */
  {
    id: 'main-export',
    label: 'Main export category',
    section: 'Economy',
    note: 'Primary export by revenue (approximate, ~2023)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'oil-gas',
        label: 'Oil & Gas',
        fill: '#2a1a10',
        stroke: '#ea580c',
        text: '#fdba74',
        hover: '#342418',
        codes: $(`SA AE KW QA BH OM IR IQ LY DZ AO CG GQ GA NG SD SS YE
          AZ TM KZ UZ RU NO VE EC BO TT GY`),
      },
      {
        id: 'agriculture',
        label: 'Agriculture & Food',
        fill: '#1a3a10',
        stroke: '#65a30d',
        text: '#bef264',
        hover: '#224a18',
        codes: $(`BR AR UY PY BO ET KE TZ UG MZ MW ZM ZW MG BI RW CI GH
          SN GM GN GW SL BF ML NE TD CM CF BJ TG CG CD AO MR CV ST
          GQ DJ SO ER KM IN NP BD LK MM KH LA VN TL PG SB FJ TO WS
          KI TV NR PW FM MH BZ GY SR HN GT SV NI CR PA CU HT JM BB
          DM GD KN LC VC AG TT DO`),
      },
      {
        id: 'manufacturing',
        label: 'Manufacturing & Industry',
        fill: '#1a1a3a',
        stroke: '#6366f1',
        text: '#a5b4fc',
        hover: '#222252',
        codes: $(`CN JP KR TW DE PL CZ SK HU RO BG HR SI RS ME MK AL BA
          BE NL AT CH LU PT ES IT FR TR MX TH MY ID PH VN BD PK IN
          EG MA TN UA BY`),
      },
      {
        id: 'mining',
        label: 'Mining & Minerals',
        fill: '#2a2010',
        stroke: '#b45309',
        text: '#fcd34d',
        hover: '#342a18',
        codes: $(`AU ZA NA BW ZM CD MZ GH ML GN ER TG BF LR SL CL PE BO
          BR MN KZ KG TJ AF CU JM GY SR PA NR`),
      },
      {
        id: 'services',
        label: 'Services & Finance',
        fill: '#1a2a3a',
        stroke: '#0ea5e9',
        text: '#7dd3fc',
        hover: '#223444',
        codes: $(`US GB IE LU MT CY PA BS BB DM LC KN VC GD AG TT SG HK
          MO LI MC SM VA IS MT MV SC MU`),
      },
      {
        id: 'technology',
        label: 'Technology',
        fill: '#1a3a2a',
        stroke: '#059669',
        text: '#6ee7b7',
        hover: '#224a34',
        codes: $('US IL TW KR JP SG FI SE NL CA DE'),
      },
    ],
  },

  /* ── FUN (extra) ────────────────────────────────────────────────── */
  {
    id: 'space',
    label: 'Countries with space programs',
    section: 'Fun',
    note: 'Space agency status and orbital launch capability',
    defaultZoom: 1.1,
    options: [
      {
        id: 'launch',
        label: 'Active launch capability (can reach orbit independently)',
        fill: '#1a3054',
        stroke: '#3b82f6',
        text: '#93c5fd',
        hover: '#223a5e',
        codes: $('US RU CN JP IN KP KR IL IR NZ'),
      },
      {
        id: 'agency',
        label: 'Own space agency',
        fill: '#2a2418',
        stroke: '#f59e0b',
        text: '#fcd34d',
        hover: '#342e22',
        codes: $(`US RU CN JP IN KP KR IL IR NZ AU AR BR CA MX PK TR UA
          SA AE TH MY ID VN EG NG KE ZA`),
      },
      {
        id: 'esa',
        label: 'ESA member',
        fill: '#1a2a4a',
        stroke: '#818cf8',
        text: '#c7d2fe',
        hover: '#223454',
        codes: $(`AT BE CZ DK EE FI FR DE GR HU IE IT LV LT LU NL NO PL
          PT RO SK SI ES SE CH GB`),
      },
    ],
  },

  /* ── ENVIRONMENT ───────────────────────────────────────────────── */
  {
    id: 'natural-disaster-risk',
    label: 'Natural Disaster Risk',
    section: 'Environment',
    note: 'Primary natural disaster risk by country (approximate)',
    defaultZoom: 1.05,
    options: [
      {
        id: 'earthquake',
        label: 'Earthquake Zone',
        fill: '#3a1a0a',
        stroke: '#f97316',
        text: '#fdba74',
        hover: '#4a2412',
        codes: $(`JP ID PH CL PE TR IR NP PK AF NZ PG SB VU TO WS FJ
          GR IT MX GT SV HN NI CR PA EC BO CO VE
          AL MK RO BG RS ME BA HR PT
          AM GE AZ KG TJ UZ KZ
          DZ MA MM CN IN RU TW`),
      },
      {
        id: 'cyclone',
        label: 'Cyclone / Hurricane Zone',
        fill: '#0a1e2e',
        stroke: '#0ea5e9',
        text: '#7dd3fc',
        hover: '#122436',
        codes: $(`BD MM IN PH JP CN VN TH TW
          MG MZ TZ KM MU SC
          FJ VU SB PG AU
          US MX CU DO HT JM BS BZ HN NI GT SV
          TO WS FM MH KI TV NR PW
          AG KN LC VC GD DM TT BB`),
      },
      {
        id: 'flood',
        label: 'Flood-Prone',
        fill: '#0a1a3a',
        stroke: '#2563eb',
        text: '#93c5fd',
        hover: '#122244',
        codes: $(`BD PK IN NG GH CM SD SS ET MZ ZM ZW MW
          BO PY AR BR TH VN KH LA ID CN
          NL DE CZ PL HU RS RO IQ EG
          CD AO NI HN CO MX BI`),
      },
      {
        id: 'volcanic',
        label: 'Volcanic Activity',
        fill: '#2a0a0a',
        stroke: '#b91c1c',
        text: '#fca5a5',
        hover: '#3a1212',
        codes: $(`ID PH JP PG VU TO WS NZ IS IT GR
          CD ET TZ KE CM KM CV
          EC CO CL PE BO
          GT SV NI CR MX US RU SB FJ`),
      },
      {
        id: 'drought',
        label: 'Drought / Desertification',
        fill: '#2a2210',
        stroke: '#ca8a04',
        text: '#fde68a',
        hover: '#342a18',
        codes: $(`SO ET KE ER DJ SD SS NE ML BF TD MR SN GM
          LY EG DZ MA SY IQ JO YE AF PK IR
          NA BW ZW AU CL`),
      },
      {
        id: 'low-risk',
        label: 'Low Risk',
        fill: '#0a2a14',
        stroke: '#4ade80',
        text: '#bbf7d0',
        hover: '#123a1c',
        codes: $(`SE NO FI DK IE GB FR DE AT CH LU BE NL
          CA AR UY EE LV LT BY`),
      },
    ],
  },

  /* ── CULTURE (extra) ────────────────────────────────────────────── */
  {
    id: 'tea-coffee',
    label: 'Tea vs Coffee culture',
    section: 'Culture',
    note: 'Dominant beverage preference by cultural tradition',
    defaultZoom: 1.05,
    options: [
      {
        id: 'tea',
        label: 'Tea-dominant',
        fill: '#1a3a2a',
        stroke: '#16a34a',
        text: '#86efac',
        hover: '#224a34',
        codes: $(`CN JP KR TW MN IN BD LK NP BT PK AF IR IQ SY JO LB IL
          SA AE QA KW BH OM YE EG MA TN DZ LY SD GB IE RU UA BY KZ
          KG UZ TJ TM AZ GE AM TR MM VN ID MY`),
      },
      {
        id: 'coffee',
        label: 'Coffee-dominant',
        fill: '#2a1a10',
        stroke: '#92400e',
        text: '#fcd34d',
        hover: '#342418',
        codes: $(`US CA MX GT HN SV NI CR PA CO VE EC PE BO CL AR PY UY
          BR GY TT JM DO HT CU BS BB DM GD KN LC VC AG FR DE IT ES
          PT NL BE LU CH AT SE NO DK FI IS PL CZ SK HU HR SI RO BG
          GR CY MT AL ME RS MK BA EE LV LT ET KE UG TZ RW BI MG
          CM CI GH SN ML BF NE GN GW SL LR GM BJ TG CF CG CD GA
          AO MZ MW ZM ZW NA BW SO DJ ER MR CV ST KM GQ AU NZ FJ
          TO PG SB WS KI TV NR FM MH PW TL`),
      },
      {
        id: 'mixed',
        label: 'Mixed / Both popular',
        fill: '#1a1a2a',
        stroke: '#94a3b8',
        text: '#cbd5e1',
        hover: '#222234',
        codes: $(`ZA MU SC LS SZ KM NG TD SS CF MZ MW KH LA TH PH SG BN
          LK MV`),
      },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════════
   Pre-built Sets for fast lookup
   ═══════════════════════════════════════════════════════════════════════ */

/** @type {Record<string, Record<string, Set<string>>>} */
const OPTION_SETS = {}
for (const cat of EXTRA_OVERLAY_CATEGORIES) {
  /** @type {Record<string, Set<string>>} */
  const map = {}
  for (const opt of cat.options) {
    map[opt.id] = new Set(opt.codes.map((c) => c.toUpperCase()))
  }
  OPTION_SETS[cat.id] = map
}

/** @type {Record<string, object>} */
const CATEGORIES_MAP = Object.fromEntries(
  EXTRA_OVERLAY_CATEGORIES.map((c) => [c.id, c]),
)

/* ═══════════════════════════════════════════════════════════════════════
   Exported helpers
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * @param {string | null | undefined} alpha2
 * @param {string} categoryId
 * @param {string} optionId
 * @returns {boolean}
 */
export function countryMatchesExtraOption(alpha2, categoryId, optionId) {
  if (!alpha2 || !categoryId || !optionId) return false
  const optMap = OPTION_SETS[categoryId]
  if (!optMap) return false
  const s = optMap[optionId]
  if (!s) return false
  return s.has(String(alpha2).toUpperCase())
}

/**
 * @param {string | null | undefined} alpha2
 * @param {Record<string, string[]>} selections  — { categoryId: [optionIds] }
 * @returns {boolean}
 */
export function countryInAnyExtraOverlay(alpha2, selections) {
  if (!alpha2 || !selections) return false
  const upper = String(alpha2).toUpperCase()
  for (const catId of Object.keys(selections)) {
    const optIds = selections[catId]
    if (!optIds || optIds.length === 0) continue
    const optMap = OPTION_SETS[catId]
    if (!optMap) continue
    for (const optId of optIds) {
      const s = optMap[optId]
      if (s && s.has(upper)) return true
    }
  }
  return false
}

/** Mixed-overlay sentinel colour. */
const MIXED_COLOR = {
  fill: '#1e2834',
  stroke: '#94a3b8',
  text: '#cbd5e1',
  hover: '#283444',
  mixed: true,
}

/**
 * Returns the first matching option colour for a country, or a "mixed" sentinel
 * when the country matches options across multiple categories.
 * @param {string | null | undefined} alpha2
 * @param {Record<string, string[]>} selections
 * @returns {object | null}
 */
export function getExtraOverlayColor(alpha2, selections) {
  if (!alpha2 || !selections) return null
  const upper = String(alpha2).toUpperCase()
  /** @type {object[]} */
  const matches = []
  for (const cat of EXTRA_OVERLAY_CATEGORIES) {
    const optIds = selections[cat.id]
    if (!optIds || optIds.length === 0) continue
    const optMap = OPTION_SETS[cat.id]
    if (!optMap) continue
    for (const optId of optIds) {
      const s = optMap[optId]
      if (s && s.has(upper)) {
        const opt = cat.options.find((o) => o.id === optId)
        if (opt) matches.push(opt)
      }
    }
  }
  if (matches.length === 0) return null
  if (matches.length === 1) return matches[0]
  return MIXED_COLOR
}

/**
 * Compute combined default zoom for active extra overlay categories.
 * @param {Record<string, string[]>} selections
 * @returns {number | null}
 */
export function getExtraDefaultZoom(selections) {
  if (!selections) return null
  const zooms = []
  for (const cat of EXTRA_OVERLAY_CATEGORIES) {
    const optIds = selections[cat.id]
    if (optIds && optIds.length > 0) {
      zooms.push(cat.defaultZoom)
    }
  }
  if (zooms.length === 0) return null
  return Math.min(...zooms)
}

/**
 * @param {string} id
 * @returns {object | undefined}
 */
export function getExtraCategory(id) {
  return CATEGORIES_MAP[id]
}

/**
 * Check whether any extra overlay is active.
 * @param {Record<string, string[]>} selections
 * @returns {boolean}
 */
export function hasAnyExtraSelection(selections) {
  if (!selections) return false
  for (const catId of Object.keys(selections)) {
    const optIds = selections[catId]
    if (optIds && optIds.length > 0) return true
  }
  return false
}
