import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getPastDate } from '@/data/blogs';
import '../blog.css';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = blogPosts.find((p) => String(p.id) === id);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: `${post.title} | AdPulse IMC Blog`,
    description: post.excerpt,
    keywords: `adpulse blog, marketing insight pakistan, ${post.title.toLowerCase()}`,
    openGraph: {
      title: `${post.title} | AdPulse IMC Blog`,
      description: post.excerpt,
      url: `https://adpulse.pk/blog/${post.id}`,
      type: "article",
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const post = blogPosts.find((p) => String(p.id) === id);
  if (!post) notFound();

  // Find other recent posts to recommend
  const otherPosts = blogPosts.filter((p) => String(p.id) !== id).slice(0, 2);

  return (
    <div className="page-wrapper">
      <div className="container blog-detail-wrapper">
        <Link href="/blog" className="back-to-blog">
          ← BACK TO INSIGHTS
        </Link>

        <article className="blog-article">
          <div className="article-header">
            <span className="article-emoji">{post.emoji}</span>
            <div className="article-meta">
              <span className="article-date">{getPastDate(post.daysAgo)}</span>
              <span className="article-dot">•</span>
              <span className="article-readtime">{post.readTime}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="article-excerpt">{post.excerpt}</p>
          </div>

          <hr className="article-divider" />

          <div 
            className="article-body" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Recommended Posts */}
        <section className="recommended-section">
          <h3>RECENT ARTICLES</h3>
          <div className="blog-grid" style={{ marginTop: '1.5rem' }}>
            {otherPosts.map((other) => (
              <div key={other.id} className="blog-card">
                <div className="blog-img-placeholder">
                  {other.emoji}
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{getPastDate(other.daysAgo)}</span>
                    <span className="blog-read-time">{other.readTime}</span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.2rem 0 0.75rem', textCombineUpright: 'none', textAlign: 'left', lineHeight: 1.3 }}>{other.title}</h4>
                  <p style={{ fontSize: '0.88rem', marginBottom: '1.2rem' }}>{other.excerpt}</p>
                  <Link href={`/blog/${other.id}`} className="read-more">READ ARTICLE →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
