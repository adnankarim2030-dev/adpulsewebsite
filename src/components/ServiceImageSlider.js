'use client';

import { useState, useEffect } from 'react';

export default function ServiceImageSlider({ images, alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isVideo = (url) => {
    return url.startsWith('video:') || url.includes('video.php') || url.includes('.mp4');
  };

  const getVideoUrl = (url) => {
    if (url.startsWith('video:')) {
      return url.slice(6);
    }
    return url;
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const currentSlide = images[currentIndex];
    const isCurrentVid = isVideo(currentSlide);

    // Pause auto-sliding if hovered or if the current slide is a video
    if (isHovered || isCurrentVid) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500); // Slide every 4.5 seconds
    return () => clearInterval(interval);
  }, [images, currentIndex, isHovered]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div 
      className="service-slider-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="service-slider-slides">
        {images.map((img, index) => {
          const isVid = isVideo(img);
          return (
            <div
              key={index}
              className={`service-slider-slide ${index === currentIndex ? 'active' : ''}`}
            >
              {isVid ? (
                <iframe
                  src={getVideoUrl(img)}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden', borderRadius: 'inherit' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              ) : (
                <img src={img} alt={`${alt} - Slide ${index + 1}`} />
              )}
            </div>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          {/* Left/Right controls */}
          <button className="slider-control prev" onClick={handlePrev} aria-label="Previous image">
            ‹
          </button>
          <button className="slider-control next" onClick={handleNext} aria-label="Next image">
            ›
          </button>

          {/* Indicators */}
          <div className="slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
