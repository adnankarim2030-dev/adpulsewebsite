import Link from 'next/link';
import { blogPosts, getPastDate } from '@/data/blogs';
import './blog.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Insights & Marketing News | AdPulse IMC",
  description: "Stay ahead with the latest advertising trends, media planning insights, outdoor advertising strategies, and BTL marketing tips from the expert team at AdPulse IMC Karachi.",
  keywords: "marketing blogs karachi, adpulse insights, media agency articles, advertising news pakistan, OOH media blog",
  openGraph: {
    title: "Insights & Marketing News | AdPulse IMC",
    description: "Stay ahead with the latest advertising trends, media planning insights, and marketing tips.",
    url: "https://adpulse.pk/blog",
    type: "website",
  }
};

export default function BlogPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>INSIGHTS & NEWS</h1>
          <p>Expert perspectives on marketing, branding, and media from the AdPulse team.</p>
        </div>
      </div>

      <section className="container section-padding">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-img-placeholder">
                {post.emoji}
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{getPastDate(post.daysAgo)}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="read-more">READ FULL ARTICLE →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section bg-gradient-red">
        <div className="container cta-inner">
           <div className="cta-content">
             <h2>GET OUR LATEST INSIGHTS</h2>
             <p>Subscribe to our newsletter for the latest marketing trends and agency updates.</p>
           </div>
           <div className="newsletter-form">
              <input type="email" placeholder="Your Email Address" />
              <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>SUBSCRIBE</button>
           </div>
        </div>
      </section>
    </div>
  );
}
