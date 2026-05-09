import Link from 'next/link';
import './blog.css';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "How to Scale Your Brand with Outdoor Media",
      excerpt: "Outdoor advertising remains one of the most effective ways to build brand trust and local awareness in Karachi. Learn the strategies that work.",
      date: "Oct 12, 2026",
      emoji: "🏙️"
    },
    {
      id: 2,
      title: "The Future of AI in Digital Marketing",
      excerpt: "Discover how AdPulse is leveraging artificial intelligence to create high-converting video ads and personalized campaigns at scale.",
      date: "Oct 05, 2026",
      emoji: "🤖"
    },
    {
      id: 3,
      title: "Why TVCs Still Matter in the Digital Age",
      excerpt: "While digital is growing, the prestige and reach of a well-produced TV commercial are unparalleled for established brands seeking impact.",
      date: "Sep 28, 2026",
      emoji: "🎬"
    },
    {
      id: 4,
      title: "5 Strategies for Nationwide Brand Activation",
      excerpt: "BTL marketing requires precision and local insight. Here are 5 strategies we use to ensure nationwide success for our clients.",
      date: "Sep 20, 2026",
      emoji: "🎯"
    }
  ];

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
          {posts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-img-placeholder">
                {post.emoji}
              </div>
              <div className="blog-content">
                <span className="blog-date">{post.date}</span>
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
