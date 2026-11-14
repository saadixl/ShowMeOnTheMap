import { useEffect } from 'react'
import { APP_DISPLAY_NAME } from '../appMeta.js'
import { SiteNav } from '../SiteNav.jsx'
import './LandingPage.css'

const HERO_OVERLAYS = [
  { url: '/map?e=Ot', img: '/screenshots/3.png', label: 'Ottoman Empire' },
  { url: '/map?e=Ot&l=Ar', img: '/screenshots/4.png', label: 'Empire + Language' },
  { url: '/map?t=lht,rht', img: '/screenshots/5.png', label: 'Driving Side' },
]

const CATEGORIES = [
  {
    icon: '🌍',
    title: 'Geography',
    desc: 'Continents, transcontinental countries, landlocked nations, and island states.',
    color: '#38bdf8',
  },
  {
    icon: '🏛️',
    title: 'History',
    desc: '14 historical empires, WWII alliances, former Soviet Union, and Yugoslavia.',
    color: '#a78bfa',
  },
  {
    icon: '📊',
    title: 'Demographics',
    desc: 'Major languages, world religions, HDI, life expectancy, literacy, and population density.',
    color: '#34d399',
  },
  {
    icon: '⚖️',
    title: 'Politics',
    desc: 'Government types, UN membership, NATO, EU, and nuclear weapons states.',
    color: '#fb923c',
  },
  {
    icon: '💰',
    title: 'Economy',
    desc: 'Income groups, OPEC members, and global economic classifications.',
    color: '#facc15',
  },
  {
    icon: '🎮',
    title: 'Fun',
    desc: 'FIFA World Cup hosts, Olympic hosts, driving side, and track your visited countries.',
    color: '#f472b6',
  },
]

const FEATURES = [
  {
    icon: '🔗',
    title: 'Shareable URLs',
    desc: 'Every overlay combo generates a unique link you can share with anyone.',
  },
  {
    icon: '🔍',
    title: 'Auto-fit zoom',
    desc: 'The map automatically zooms to fit all highlighted countries on screen.',
  },
  {
    icon: '🧩',
    title: 'Combine overlays',
    desc: 'Stack empires with languages, religions with continents — see where they intersect.',
  },
  {
    icon: '✈️',
    title: 'Visited countries',
    desc: 'Sign in with Google to track and display the countries you\'ve been to.',
  },
]

const FOOTER_LINKS = [
  { href: '/map', label: 'Map' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/how-to', label: 'How to use' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
]

export function LandingPage() {
  useEffect(() => {
    document.title = `${APP_DISPLAY_NAME} — Interactive World Map with Country Overlays`
  }, [])

  return (
    <div className="landing">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="landing__hero">
        <div className="landing__hero-bg" aria-hidden />
        <div className="landing__hero-content">
          <div className="landing__hero-badge">Free &amp; open to explore</div>
          <h1 className="landing__hero-title">
            Explore the world through
            <span className="landing__hero-gradient"> interactive overlays</span>
          </h1>
          <p className="landing__hero-sub">
            Visualize countries by empire, language, religion, continent, driving side,
            and 40+ more data layers. Combine overlays to discover patterns across
            geography, history, and culture.
          </p>
          <div className="landing__hero-actions">
            <a className="landing__cta landing__cta--primary" href="/map">
              Open the map
            </a>
            <a className="landing__cta landing__cta--ghost" href="/how-to">
              How it works
            </a>
          </div>
        </div>

        {/* Preview cards */}
        <div className="landing__previews" aria-label="Map preview examples">
          {HERO_OVERLAYS.map((o) => (
            <a key={o.url} className="landing__preview-card" href={o.url}>
              <img
                className="landing__preview-img"
                src={o.img}
                alt={o.label}
                loading="lazy"
                width="400"
                height="280"
              />
              <span className="landing__preview-label">{o.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="landing__section">
        <h2 className="landing__section-title">
          <span className="landing__section-tag">Overlay categories</span>
          Everything you want to see on a map
        </h2>
        <div className="landing__categories">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className="landing__cat-card"
              style={{ '--cat-color': c.color }}
            >
              <span className="landing__cat-icon">{c.icon}</span>
              <h3 className="landing__cat-title">{c.title}</h3>
              <p className="landing__cat-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing__section landing__section--dark">
        <h2 className="landing__section-title">
          <span className="landing__section-tag">Features</span>
          Built for exploration
        </h2>
        <div className="landing__features">
          {FEATURES.map((f) => (
            <div key={f.title} className="landing__feat-card">
              <span className="landing__feat-icon">{f.icon}</span>
              <h3 className="landing__feat-title">{f.title}</h3>
              <p className="landing__feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="landing__section landing__section--cta">
        <h2 className="landing__cta-heading">Ready to explore?</h2>
        <p className="landing__cta-sub">
          No signup required. Just open the map and start discovering.
        </p>
        <a className="landing__cta landing__cta--primary landing__cta--lg" href="/map">
          Open the map
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <div className="landing__footer-inner">
          <nav className="landing__footer-nav" aria-label="Footer navigation">
            {FOOTER_LINKS.map((l) => (
              <a key={l.href} className="landing__footer-link" href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <p className="landing__footer-brand">
            &copy; {new Date().getFullYear()} {APP_DISPLAY_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
