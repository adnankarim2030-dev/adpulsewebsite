import './gallery.css';

export const metadata = {
  title: 'Media Gallery — AdPulse Media Agency',
  description: 'Explore our media gallery showcasing TVCs, brand activations, corporate events, outdoor campaigns, and behind-the-scenes production content.',
};

export default function MediaGalleryPage() {
  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'tvc', label: 'TVC PRODUCTION' },
    { id: 'events', label: 'EVENTS' },
    { id: 'outdoor', label: 'OUTDOOR' },
    { id: 'digital', label: 'DIGITAL' },
    { id: 'btl', label: 'BTL' },
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'tvc',
      image: '/images/services/production.png',
      title: 'TVC Production Studio',
      description: 'Behind the scenes of our professional TVC studio setup',
    },
    {
      id: 2,
      category: 'outdoor',
      image: '/images/services/outdoor.png',
      title: 'Outdoor Billboard Campaign',
      description: 'High-impact digital billboard at a premium Karachi location',
    },
    {
      id: 3,
      category: 'events',
      image: '/images/services/events.png',
      title: 'Corporate Gala Night',
      description: 'Full-scale corporate event production and management',
    },
    {
      id: 4,
      category: 'digital',
      image: '/images/portfolio/fitfuel.png',
      title: 'FitFuel Social Campaign',
      description: 'Digital-first social media campaign for FitFuel',
    },
    {
      id: 5,
      category: 'tvc',
      image: '/images/services/aivideo.png',
      title: 'AI-Powered Video Ads',
      description: 'Cutting-edge AI video production for modern brands',
    },
    {
      id: 6,
      category: 'btl',
      image: '/images/services/btl.png',
      title: 'Nationwide Brand Activation',
      description: 'BTL activation at a major product launch event',
    },
    {
      id: 7,
      category: 'digital',
      image: '/images/portfolio/burgerhouse.png',
      title: 'Burger House Paid Ads',
      description: 'Performance-driven paid advertising campaign',
    },
    {
      id: 8,
      category: 'events',
      image: '/images/services/pr.png',
      title: 'Media PR & Press Event',
      description: 'Strategic PR event with leading media personalities',
    },
    {
      id: 9,
      category: 'outdoor',
      image: '/images/services/mediabuying.png',
      title: 'Media Planning Session',
      description: 'Strategic media buying and planning meeting with clients',
    },
    {
      id: 10,
      category: 'digital',
      image: '/images/portfolio/urbanpeaks.png',
      title: 'Urban Peaks Branding',
      description: 'Complete branding and digital identity package',
    },
    {
      id: 11,
      category: 'tvc',
      image: '/images/portfolio/technova.png',
      title: 'TechNova Product Launch',
      description: 'Cinematic product launch video for TechNova',
    },
    {
      id: 12,
      category: 'digital',
      image: '/images/services/digital.png',
      title: 'Digital Marketing Hub',
      description: 'Comprehensive digital marketing campaign execution',
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>MEDIA GALLERY</h1>
          <p>A visual showcase of our work across TVCs, events, outdoor, and digital campaigns.</p>
        </div>
      </div>

      <section className="container section-padding">
        {/* Category Filter Tabs */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`gallery-filter-btn ${cat.id === 'all' ? 'active' : ''}`}
              data-category={cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item" data-category={item.category}>
              <div className="gallery-img">
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-cat">{item.category.toUpperCase()}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="gallery-stats bg-gradient-gray">
        <div className="container">
          <div className="gallery-stats-grid">
            <div className="gallery-stat">
              <h3>500+</h3>
              <p>MEDIA ASSETS PRODUCED</p>
            </div>
            <div className="gallery-stat">
              <h3>50+</h3>
              <p>TVC COMMERCIALS</p>
            </div>
            <div className="gallery-stat">
              <h3>200+</h3>
              <p>EVENTS MANAGED</p>
            </div>
            <div className="gallery-stat">
              <h3>100+</h3>
              <p>OUTDOOR CAMPAIGNS</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
