import { SitePageShell } from './SitePageShell.jsx'
import './HowToPage.css'
import './ContentCards.css'

const SCREENSHOTS = [
  { src: '/screenshots/1', caption: 'Overlay categories — Geography, History, Demographics and more' },
  { src: '/screenshots/2', caption: 'Sign in with Google to save visited countries' },
  { src: '/screenshots/3', caption: 'Single overlay — Ottoman Empire highlighted on the map' },
  {
    src: '/screenshots/4',
    caption:
      'Multi-overlay — Ottoman Empire + Arabic language (overlaps shown with textures)',
  },
  {
    src: '/screenshots/5',
    caption:
      'Driving side overlay — left-hand (cyan) vs right-hand (orange) traffic',
  },
]

export function HowToPage() {
  return (
    <SitePageShell title="How to use" description="Step-by-step guide for using ShowMeOnTheMap — pan, zoom, select overlays, combine map layers, sign in, and share your view.">
      <p className="content-intro">
        ShowMeOnTheMap is a single-page interactive map. The URL updates as
        you pan/zoom and toggle overlays, so you can share exactly what
        you&apos;re looking at.
      </p>

      <div className="content-cards">
        {/* Basics + Overlays row */}
        <div className="content-grid">
          <div className="content-card content-card--accent">
            <div className="content-card__header">
              <span className="content-card__icon">🗺️</span>
              <h2 className="content-card__title">Basics</h2>
            </div>
            <ul className="content-card__list">
              <li><strong>Pan</strong> — drag the map to move around</li>
              <li><strong>Zoom</strong> — use the vertical zoom control in the right sidebar (slider and +/- buttons)</li>
              <li><strong>Recenter</strong> — click the target icon in the right sidebar</li>
            </ul>
          </div>

          <div className="content-card content-card--accent">
            <div className="content-card__header">
              <span className="content-card__icon">🔲</span>
              <h2 className="content-card__title">Overlays</h2>
            </div>
            <ul className="content-card__list">
              <li>Open the overlays menu from the right sidebar (menu icon) to choose categories</li>
              <li>Combine overlays (e.g. an empire + a language) to see overlaps</li>
              <li>Use the <strong>Clear</strong> button to reset to the default view</li>
            </ul>
          </div>
        </div>

        {/* Sign in + Sharing row */}
        <div className="content-grid">
          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">👤</span>
              <h2 className="content-card__title">Sign in</h2>
            </div>
            <ul className="content-card__list">
              <li>Click the <strong>user</strong> button in the right sidebar, then choose <strong>Login with Google</strong></li>
              <li>When signed in, your profile avatar appears in the sidebar. Tap it to log out</li>
            </ul>
          </div>

          <div className="content-card">
            <div className="content-card__header">
              <span className="content-card__icon">🔗</span>
              <h2 className="content-card__title">Sharing</h2>
            </div>
            <ul className="content-card__list">
              <li>Copy the page URL from your browser to share your current view</li>
              <li>The link includes your zoom/pan and overlay selection so others see the same highlight</li>
            </ul>
          </div>
        </div>

        {/* Screenshots */}
        <div className="content-card">
          <div className="content-card__header">
            <span className="content-card__icon">📸</span>
            <h2 className="content-card__title">Screenshots</h2>
          </div>
          <div className="howto-gallery" role="list" aria-label="App screenshots">
            {SCREENSHOTS.map((s) => (
              <figure key={s.src} className="howto-shot" role="listitem">
                <picture>
                  <source srcSet={`${s.src}.webp`} type="image/webp" />
                  <img className="howto-shot__img" src={`${s.src}.png`} alt={s.caption} />
                </picture>
                <figcaption className="howto-shot__cap">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </SitePageShell>
  )
}
