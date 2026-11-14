import { useEffect } from 'react'
import { APP_DISPLAY_NAME } from '../appMeta.js'
import { SiteNav } from '../SiteNav.jsx'
import './SitePageShell.css'

const SITE_URL = 'https://showmeonthemap.com'

const FOOTER_LINKS = [
  { href: '/map', label: 'Map' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/how-to', label: 'How to use' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
]

/**
 * Update or create a <meta> tag in <head>.
 * @param {string} attr - 'name' or 'property'
 * @param {string} key
 * @param {string} content
 */
function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * @param {{ title?: string, description?: string, children: React.ReactNode }} props
 */
export function SitePageShell({ title, description, children }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${APP_DISPLAY_NAME}` : APP_DISPLAY_NAME
    document.title = fullTitle

    // Per-page canonical
    const path = window.location.pathname.replace(/\/$/, '') || '/'
    const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl)
    }

    // Per-page meta description
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    // Per-page OG/Twitter title
    setMeta('property', 'og:title', fullTitle)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('property', 'og:url', canonicalUrl)
  }, [title, description])

  const content = (
    <>
      <div className="site-page__title-bar">
        <h1 className="site-page__title">{title}</h1>
      </div>
      <main className="site-page__main">{children}</main>
      <footer className="site-page__footer">
        <nav className="site-page__footer-nav" aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} className="site-page__footer-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p className="site-page__footer-copy">
          &copy; {new Date().getFullYear()} {APP_DISPLAY_NAME}. All rights reserved.
        </p>
      </footer>
    </>
  )

  return (
    <div className="site-page">
      <SiteNav />
      {content}
    </div>
  )
}

