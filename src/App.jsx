import { WorldMap } from './WorldMap.jsx'
import { SiteFooter } from './SiteFooter.jsx'
import { SiteNav } from './SiteNav.jsx'
import { LandingPage } from './pages/LandingPage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { HowToPage } from './pages/HowToPage.jsx'
import { PrivacyPage } from './pages/PrivacyPage.jsx'
import { TermsPage } from './pages/TermsPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { BlogIndexPage } from './pages/BlogIndexPage.jsx'
import { BlogPostPage } from './pages/BlogPostPage.jsx'
import './App.css'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const search = typeof window !== 'undefined' ? window.location.search : ''
  const isEmbed = new URLSearchParams(search).get('embed') === '1'

  if (path === '/about') return <AboutPage />
  if (path === '/how-to') return <HowToPage />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/terms') return <TermsPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/blog' || path === '/blog/') return <BlogIndexPage />
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length).replace(/\/$/, '')
    return <BlogPostPage slug={slug} />
  }

  /* Map page (explicit /map route or embed mode) */
  if (path === '/map' || isEmbed) {
    if (isEmbed) {
      return (
        <div className="app app--embed">
          <main className="app-main">
            <WorldMap />
          </main>
        </div>
      )
    }
    return (
      <div className="app app--with-nav">
        <SiteNav />
        <main className="app-main">
          <WorldMap />
          <SiteFooter />
        </main>
      </div>
    )
  }

  /* Landing page (home) */
  return <LandingPage />
}

export default App
