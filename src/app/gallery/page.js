'use client';

import { useState } from 'react';
import { ALL_VIDEOS } from '@/data/videos';
import './gallery.css';

const CATEGORIES = [
  { id: 'all',      label: 'ALL VIDEOS' },
  { id: 'showreel', label: 'SHOWREEL'   },
  { id: 'ooh',      label: 'OOH / OUTDOOR' },
  { id: 'events',   label: 'EVENTS'    },
  { id: 'tvc',      label: 'TVC / FILMS' },
];

const PAGE_SIZE = 12;

export default function MediaGalleryPage() {
  const [activeFilter, setActiveFilter]   = useState('all');
  const [visibleCount, setVisibleCount]   = useState(PAGE_SIZE);
  const [playingId, setPlayingId]         = useState(null);

  const filtered = activeFilter === 'all'
    ? ALL_VIDEOS
    : ALL_VIDEOS.filter(v => v.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (id) => {
    setActiveFilter(id);
    setVisibleCount(PAGE_SIZE);
    setPlayingId(null);
  };

  const categoryLabel = (cat) =>
    CATEGORIES.find(c => c.id === cat)?.label.replace(' / OUTDOOR','').replace(' / FILMS','') || cat.toUpperCase();

  return (
    <div className="page-wrapper">

      {/* ── Hero ── */}
      <div className="page-header">
        <div className="container">
          <h1>MEDIA GALLERY</h1>
          <p>
            Live videos from our YouTube channel — campaigns, events, TVCs &amp; more.{' '}
            <a
              href="https://www.youtube.com/@AdPulse./videos"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-channel-link"
            >
              View Full Channel ↗
            </a>
          </p>
        </div>
      </div>

      {/* ── Video Grid Section ── */}
      <section className="container section-padding">

        {/* Filter tabs */}
        <div className="gallery-filters">
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

        {/* Results count */}
        <p className="gallery-count">
          Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> videos
        </p>

        {/* Video Grid */}
        <div className="video-grid">
          {visible.map(video => (
            <div key={video.id} className="video-card">
              {playingId === video.id ? (
                /* ── Live embedded player ── */
                <div className="video-player-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                /* ── Thumbnail (click to play) ── */
                <div
                  className="video-thumb-wrap"
                  onClick={() => setPlayingId(video.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setPlayingId(video.id)}
                  aria-label={`Play: ${video.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="video-thumb-img"
                    loading="lazy"
                  />
                  <div className="video-thumb-overlay">
                    <div className="play-circle">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Card info */}
              <div className="video-card-info">
                <span className="video-badge">{categoryLabel(video.category)}</span>
                <h3 className="video-card-title">{video.title}</h3>
                <div className="video-card-actions">
                  <button
                    className="btn-play-inline"
                    onClick={() => setPlayingId(playingId === video.id ? null : video.id)}
                  >
                    {playingId === video.id ? '■ Stop' : '▶ Play'}
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-yt-link"
                  >
                    YouTube ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="load-more-wrap">
            <button
              className="btn btn-outline load-more-btn"
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
            >
              Load More Videos ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </section>

      {/* ── Stats Banner ── */}
      <section className="gallery-stats bg-gradient-gray">
        <div className="container">
          <div className="gallery-stats-grid">
            <div className="gallery-stat">
              <h3>100+</h3>
              <p>VIDEOS PRODUCED</p>
            </div>
            <div className="gallery-stat">
              <h3>50+</h3>
              <p>OOH CAMPAIGNS</p>
            </div>
            <div className="gallery-stat">
              <h3>200+</h3>
              <p>EVENTS MANAGED</p>
            </div>
            <div className="gallery-stat">
              <h3>500+</h3>
              <p>MEDIA ASSETS</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
