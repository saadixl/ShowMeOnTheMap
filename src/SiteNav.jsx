import { APP_DISPLAY_NAME } from './appMeta.js'
import './SiteNav.css'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/map', label: 'Map' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/how-to', label: 'How to use' },
  { href: '/contact', label: 'Contact' },
]

export function SiteNav() {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '/'

  const isActive = (href) => {
    if (href === '/blog') {
      return currentPath === '/blog' || currentPath.startsWith('/blog/')
    }
    if (href === '/') {
      return currentPath === '/'
    }
    return currentPath === href
  }

  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="/">
          {APP_DISPLAY_NAME}
        </a>
        <nav className="site-nav__links" aria-label="Site navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className={`site-nav__link${isActive(link.href) ? ' site-nav__link--active' : ''}`}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
