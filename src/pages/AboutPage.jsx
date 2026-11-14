import { SitePageShell } from './SitePageShell.jsx'
import './ContentCards.css'

export function AboutPage() {
  return (
    <SitePageShell title="About" description="Learn about ShowMeOnTheMap — a free interactive world map for exploring countries by continent, language, religion, historical empire, and more.">
      <p className="content-intro">
        ShowMeOnTheMap is a free, interactive world map designed for curious
        explorers, students, teachers, and anyone who wants to understand
        the world at a glance.
      </p>

      <div className="content-cards">
        {/* Row 1: What + Why */}
        <div className="content-grid">
          <div className="content-card content-card--accent">
            <div className="content-card__header">
              <span className="content-card__icon">🌍</span>
              <h2 className="content-card__title">What is ShowMeOnTheMap?</h2>
            </div>
            <p className="content-card__body">
              Choose from a growing library of data overlays to color-code
              countries by continent, primary language, major religion,
              historical empire, driving side, and more.
            </p>
          </div>

          <div className="content-card content-card--accent">
            <div className="content-card__header">
              <span className="content-card__icon">💡</span>
              <h2 className="content-card__title">Why we built it</h2>
            </div>
            <p className="content-card__body">
              Geography shapes culture, commerce, and daily life, yet most
              map tools focus on directions rather than understanding. We
              wanted a single place where you could instantly see patterns.
              No sign-up required, no data downloaded.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="content-card">
          <div className="content-card__header">
            <span className="content-card__icon">⚙️</span>
            <h2 className="content-card__title">How it works</h2>
          </div>
          <ul className="content-card__list">
            <li><strong>Overlays</strong> — open the sidebar menu and toggle any combination of categories. The map recolors in real time.</li>
            <li><strong>Pan and zoom</strong> — drag to pan, use the zoom slider or scroll wheel to zoom, and click recenter to reset.</li>
            <li><strong>Shareable URLs</strong> — the address bar updates as you navigate, so you can copy and share exactly what you see.</li>
            <li><strong>Visited countries</strong> — sign in with Google to track which countries you have visited.</li>
            <li><strong>Location star</strong> — optionally allow browser geolocation to display a star on your home country.</li>
          </ul>
        </div>

        {/* Available overlays */}
        <div className="content-card">
          <div className="content-card__header">
            <span className="content-card__icon">🗂️</span>
            <h2 className="content-card__title">Available overlays</h2>
          </div>
          <div className="content-grid">
            <ul className="content-card__list">
              <li><strong>Continents</strong> — Africa, Asia, Europe, North America, South America, Oceania, Antarctica</li>
              <li><strong>Languages</strong> — major language families and lingua francas by country</li>
              <li><strong>Religions</strong> — predominant religion or belief system by country</li>
            </ul>
            <ul className="content-card__list">
              <li><strong>Historical empires</strong> — territories of notable empires through history</li>
              <li><strong>Driving side</strong> — left-hand vs. right-hand traffic by country</li>
              <li><strong>Transcontinental</strong> — countries that span more than one continental region</li>
            </ul>
          </div>
        </div>

        {/* Combining overlays */}
        <div className="content-card">
          <div className="content-card__header">
            <span className="content-card__icon">🧩</span>
            <h2 className="content-card__title">Combining overlays</h2>
          </div>
          <p className="content-card__body">
            Activate multiple overlays at once to discover where categories
            intersect. When countries belong to more than one active group,
            the map uses stripe and hatch patterns to show the overlap.
          </p>
        </div>

        {/* Bottom row: Data + Privacy */}
        <div className="content-grid">
          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">🔐</span>
              <h2 className="content-card__title">Data &amp; privacy</h2>
            </div>
            <p className="content-card__body">
              If you sign in with Google, we store your visited countries
              list and derived country code under your Firebase account.
              We do not store raw GPS coordinates. Signed-out users get
              browser local storage only.
            </p>
          </div>

          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">📖</span>
              <h2 className="content-card__title">Open data</h2>
            </div>
            <p className="content-card__body">
              Country geometries come from Natural Earth via world-atlas and
              TopoJSON. Country names use i18n-iso-countries. Empire, language,
              religion, and driving-side data are curated from publicly
              available sources.
            </p>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="content-card">
          <div className="content-card__header">
            <span className="content-card__icon">⚠️</span>
            <h2 className="content-card__title">Disclaimers</h2>
          </div>
          <p className="content-card__body">
            All overlays are for educational purposes only. Borders,
            classifications, language distributions, religious demographics,
            and traffic rules vary by source and change over time.
          </p>
        </div>
      </div>
    </SitePageShell>
  )
}
