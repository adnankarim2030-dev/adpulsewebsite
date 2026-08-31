"use client";
import React, { useEffect, useState } from 'react';
import './test-hero.css';

export default function AdvancedHeroTest() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Using the actual Latest Campaigns from AdPulse website
  const campaigns = [
    {
      title: "TVC Campaigns",
      description: "High-impact cinematic television commercials and video showreels crafted for premium brand recall. Featuring our work with top national brands.",
      videoId: "3fMrYlwwfYI", // Idemitsu Dealers Meet
      color: "#00cc66", // Green theme
      shadow: "rgba(0, 204, 102, 0.4)"
    },
    {
      title: "OOH & Retail",
      description: "Immersive out-of-home advertising, digital billboards, and retail marketing campaigns across Pakistan.",
      videoId: "68bC80ZdzfY", // Chase Up
      color: "#0066ff", // Blue theme
      shadow: "rgba(0, 102, 255, 0.4)"
    },
    {
      title: "Real Estate & 3D",
      description: "Extensive real estate marketing, including TVC production and 3D visualization for mega projects.",
      videoId: "WoAeLUmc3xo", // GFS Builders
      color: "#ff0033", // Red theme
      shadow: "rgba(255, 0, 51, 0.4)"
    }
  ];

  return (
    <div className="test-hero-wrapper">
      <div className="test-hero-header">
        <p>Advanced 3D Experience</p>
        <h1>Latest Campaigns</h1>
      </div>
      
      <div className="sticky-3d-container">
        {campaigns.map((camp, i) => {
          const threshold = i * 700;
          let progress = (scrollY - threshold) / 700;
          if (progress < 0) progress = 0;
          if (progress > 1.5) progress = 1.5;

          const scale = 1 - (progress * 0.15); 
          const yOffset = progress * -80; 
          const zOffset = progress * -500; 
          const opacity = 1 - (progress * 0.6); 
          const zIndex = 10 - i;

          return (
            <div 
              key={i} 
              className="campaign-3d-card"
              style={{
                transform: `translate3d(0px, ${yOffset}px, ${zOffset}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                borderColor: camp.color,
                boxShadow: `0 30px 60px ${camp.shadow}`
              }}
            >
              <div className="glow-overlay" style={{ background: `radial-gradient(circle at center, transparent 30%, ${camp.color}40 150%)` }}></div>
              <div className="card-content">
                <div className="card-text">
                  <h2 style={{color: camp.color}}>{camp.title}</h2>
                  <p>{camp.description}</p>
                </div>
                <div className="card-video">
                  <iframe 
                    src={`https://www.youtube.com/embed/${camp.videoId}?autoplay=1&mute=1&loop=1&playlist=${camp.videoId}&controls=0`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="spacer-section">
        <h2 style={{color: '#fff', fontSize: '2rem'}}>End of 3D Showcase. Scroll up.</h2>
      </div>
    </div>
  )
}
