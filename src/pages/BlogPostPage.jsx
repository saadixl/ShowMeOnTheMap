import { SitePageShell } from './SitePageShell.jsx'
import { getPostBySlug } from '../blog/posts.jsx'
import '../blog/blog.css'

/** @param {{ slug: string }} props */
export function BlogPostPage({ slug }) {
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <SitePageShell
        title="Post not found"
        description="That blog post does not exist."
      >
        <p>
          We couldn&apos;t find a post at that URL. Head back to the{' '}
          <a href="/blog">blog index</a> to see everything available.
        </p>
      </SitePageShell>
    )
  }

  const { Body } = post

  return (
    <SitePageShell title={post.title} description={post.description}>
      <p className="blog-post__meta">
        <time dateTime={post.date}>{post.date}</time>
      </p>
      <Body />
      <a className="blog-post__back" href="/blog">
        ← All posts
      </a>
    </SitePageShell>
  )
}
