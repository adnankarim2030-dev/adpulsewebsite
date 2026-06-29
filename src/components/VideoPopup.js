'use client';

import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import './VideoPopup.css';

export default function VideoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if popup has already been shown in this browser session
    const hasBeenShown = sessionStorage.getItem('adpulse_video_popup_shown');
    if (!hasBeenShown) {
      setIsOpen(true);
      // Disable scrolling when modal is open
      document.body.style.overflow = 'hidden';
      // Mark as shown for this session
      sessionStorage.setItem('adpulse_video_popup_shown', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="video-popup-overlay" onClick={handleClose}>
      <div className="video-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="video-popup-close-btn" onClick={handleClose} aria-label="Close popup">
          <FaTimes />
        </button>

        {/* Video Wrapper */}
        <div className="video-popup-player-wrapper">
          <video
            ref={videoRef}
            src="/AdPulse 5 Years Celebration.mp4"
            autoPlay
            muted={isMuted}
            controls
            playsInline
            className="video-popup-element"
            onPlay={() => {
              // Ensure volume is set properly when played
              if (videoRef.current) {
                setIsMuted(videoRef.current.muted);
              }
            }}
          />
        </div>

        {/* Mute/Unmute Quick Toggle Overlay */}
        <button className="video-popup-mute-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          <span>{isMuted ? "Unmute" : "Mute"}</span>
        </button>
      </div>
    </div>
  );
}
