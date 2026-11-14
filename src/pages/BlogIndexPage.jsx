import { SitePageShell } from './SitePageShell.jsx'
import { POSTS } from '../blog/posts.jsx'
import '../blog/blog.css'

export function BlogIndexPage() {
  return (
    <SitePageShell
      title="Blog"
      description="Articles about world geography, history, language, and religion — each illustrated with a live interactive map you can explore."
    >
      <p>
        Short reads about how the world looks when you stop using
        textbook borders and start using overlay maps. Every post embeds
        a live, interactive version of the map showing the pattern under
        discussion — click any embed to open the full map in a new tab.
      </p>

      {/* ── Top row: featured + latest sidebar ── */}
      <div className="blog-top">
        {POSTS[0] && (
          <a className="blog-featured" href={`/blog/${POSTS[0].slug}`}>
            <h2 className="blog-featured__title">{POSTS[0].title}</h2>
            <p className="blog-featured__meta">
              <time dateTime={POSTS[0].date}>{POSTS[0].date}</time>
            </p>
            <p className="blog-featured__excerpt">{POSTS[0].excerpt}</p>
          </a>
        )}
        <aside className="blog-latest">
          <h3 className="blog-latest__heading">Latest posts</h3>
          <ul className="blog-latest__list">
            {POSTS.slice(0, 5).map((post) => (
              <li key={post.slug} className="blog-latest__item">
                <a className="blog-latest__link" href={`/blog/${post.slug}`}>
                  {post.title}
                </a>
                <time className="blog-latest__date" dateTime={post.date}>{post.date}</time>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ── Remaining posts grid ── */}
      {POSTS.length > 1 && (
        <ul className="blog-list">
          {POSTS.slice(1).map((post) => (
            <li key={post.slug} className="blog-list__item">
              <h2 className="blog-list__title">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>
              <p className="blog-list__meta">
                <time dateTime={post.date}>{post.date}</time>
              </p>
              <p className="blog-list__excerpt">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </SitePageShell>
  )
}
