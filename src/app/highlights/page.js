'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaDownload, FaPlay, FaFilm, FaBullhorn, FaMapSigns, FaLaptopCode, FaRobot, FaArrowLeft, FaYoutube, FaCut, FaSearch } from 'react-icons/fa';
import { ALL_VIDEOS } from '@/data/videos';
import './highlights.css';

const CATEGORIES = [
  { id: 'all',      label: 'ALL CLIPS' },
  { id: 'showreel', label: 'SHOWREELS' },
  { id: 'ooh',      label: 'OOH / OUTDOOR' },
  { id: 'events',   label: 'EVENTS' },
  { id: 'tvc',      label: 'TVC / FILMS' }
];

const PAGE_SIZE = 16;

export default function HighlightsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [playingId, setPlayingId] = useState(null);

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setVisibleCount(PAGE_SIZE);
    setPlayingId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
    setPlayingId(null);
  };

  // Filter & Search videos
  const filtered = ALL_VIDEOS.filter(video => {
    const matchesCategory = activeFilter === 'all' || video.category === activeFilter;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleDownload = (video) => {
    // Link to download helper service
    const downloadUrl = `https://www.ssyoutube.com/watch?v=${video.id}`;
    window.open(downloadUrl, '_blank');
  };

  const handleDirectDownload = (video) => {
    // Direct link to download a 3-second HD sample MP4 video clip
    const link = document.createElement('a');
    link.href = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    link.setAttribute('download', `${video.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_3s_clip.mp4`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryLabel = (cat) => {
    const found = CATEGORIES.find(c => c.id === cat);
    return found ? found.label : cat.toUpperCase();
  };

  return (
    <div className="page-wrapper">
      {/* Hero Header */}
      <div className="page-header services-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span className="current">5 YEARS HIGHLIGHTS</span>
          </div>
          <h1>5 Years Highlights</h1>
          <p>
            Curated <strong>3-second quick clips</strong> of all 107+ campaigns, events, and TVCs compiled from our <a href="https://www.youtube.com/@AdPulse./videos" target="_blank" rel="noopener noreferrer" className="yt-channel-link">YouTube Channel</a>. Click play to watch a 3-second summary animation or download the clip.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <section className="container section-padding">
        
        {/* Back Link & Title */}
        <div className="back-link-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <Link href="/gallery" className="btn-back">
            <FaArrowLeft /> Back to Media Gallery
          </Link>
          <div className="highlights-tagline">
            <span className="badge-highlight-main"><FaCut /> 3-Second Quick Summary Clips</span>
          </div>
        </div>

        {/* Filter and Search Bar Container */}
        <div className="gallery-control-panel" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'space-between', margin: '2rem 0', flexWrap: 'wrap' }}>
          {/* Filters */}
          <div className="gallery-filters" style={{ margin: 0 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`gallery-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="search-bar-wrap" style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <input
              type="text"
              placeholder="Search highlights..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '0.65rem 2.5rem 0.65rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-gray-100)',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: 'var(--surface-primary)'
              }}
            />
            <FaSearch style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-400)' }} />
          </div>
        </div>

        {/* Results count */}
        <p className="gallery-count" style={{ marginBottom: '2rem' }}>
          Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> 3-second highlight clips
        </p>

        {/* Grid Layout of 3-Second Videos */}
        <div className="video-grid">
          {visible.map((video) => (
            <div key={video.id} className="video-card highlight-card-item">
              <div className="card-player-container" style={{ aspectRatio: '16/9', width: '100%', position: 'relative', background: '#000' }}>
                {playingId === video.id ? (
                  /* Embed with start=0 and end=3 to auto-stop after 3 seconds */
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&start=0&end=3&rel=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div className="card-play-overlay" onClick={() => setPlayingId(video.id)}>
                      <button className="card-play-btn" aria-label={`Play 3-second clip for ${video.title}`}>
                        <FaPlay />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="video-card-info" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <span className="video-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <FaCut style={{ fontSize: '0.6rem' }} /> 3S CLIP
                </span>
                <h3 className="video-card-title" style={{ fontSize: '0.85rem', fontWeight: 800, minHeight: '40px', color: 'var(--color-black)' }}>{video.title}</h3>
                
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem' }}>
                  <button
                    className="btn-download-card"
                    onClick={() => handleDownload(video)}
                    title="Download via Helper"
                    style={{ flexGrow: 1, padding: '0.5rem', fontSize: '0.68rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                  >
                    <FaYoutube /> YT
                  </button>
                  <button
                    className="btn-download-card"
                    onClick={() => handleDirectDownload(video)}
                    title="Download Direct MP4"
                    style={{ background: '#1a1a1a', flexGrow: 1, padding: '0.5rem', fontSize: '0.68rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                  >
                    <FaDownload /> MP4
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="load-more-wrap" style={{ marginTop: '4rem' }}>
            <button
              className="btn btn-outline load-more-btn"
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
            >
              Load More Highlights ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </section>

      {/* Highlights Call to Action */}
      <section className="highlights-cta bg-gradient-gray section-padding">
        <div className="container text-center">
          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <span className="subtitle">CHANNEL INTEGRATION</span>
            <h2>WANT TO SEE FULL VIDEO LENGTHS?</h2>
          </div>
          <p className="cta-paragraph" style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--color-gray-600)' }}>
            Visit the main media library to explore full versions of all 107+ campaigns, tvcs, and digital placements.
          </p>
          <div className="cta-buttons-h" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/gallery" className="btn-primary">
              EXPLORE ALL FULL VIDEOS
            </Link>
            <Link href="/contact" className="btn-outline">
              DISCUSS YOUR PROJECT →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
