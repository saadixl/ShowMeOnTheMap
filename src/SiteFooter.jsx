import { APP_DISPLAY_NAME } from './appMeta.js'
import './SiteFooter.css'

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer__inner">
        <nav className="site-footer__nav" aria-label="Pages">
          <a className="site-footer__link" href="/">
            Home
          </a>
          <a className="site-footer__link" href="/map">
            Map
          </a>
          <a className="site-footer__link" href="/blog">
            Blog
          </a>
          <a className="site-footer__link" href="/about">
            About
          </a>
          <a className="site-footer__link" href="/how-to">
            How to use
          </a>
          <a className="site-footer__link" href="/privacy">
            Privacy
          </a>
          <a className="site-footer__link" href="/terms">
            Terms
          </a>
          <a className="site-footer__link" href="/contact">
            Contact
          </a>
        </nav>
        <p className="site-footer__brand">© {new Date().getFullYear()} {APP_DISPLAY_NAME}. All rights reserved.</p>
      </div>
    </footer>
  )
}

