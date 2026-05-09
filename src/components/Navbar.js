"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaFilm, FaMapSigns, FaCogs, FaRegCalendarAlt, FaUsers, FaBullhorn, FaLaptopCode, FaRobot, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import './Navbar.css';

const serviceLinks = [
  { href: '/services/tvc-production', label: 'TVC Productions', icon: FaFilm, desc: 'TV commercials & documentaries' },
  { href: '/services/outdoor-media', label: 'Outdoor Media', icon: FaMapSigns, desc: 'Hoardings & digital screens' },
  { href: '/services/media-buying', label: 'Media Buying', icon: FaCogs, desc: 'Print, electronic & digital' },
  { href: '/services/corporate-events', label: 'Corporate Events', icon: FaRegCalendarAlt, desc: 'Planning & execution' },
  { href: '/services/pr-promotion', label: 'PR & Promotion', icon: FaUsers, desc: 'Brand amplification' },
  { href: '/services/btl-marketing', label: 'BTL Marketing', icon: FaBullhorn, desc: 'Nationwide activations' },
  { href: '/services/digital-marketing', label: 'Digital Marketing', icon: FaLaptopCode, desc: 'Online campaigns' },
  { href: '/services/ai-video-ads', label: 'AI Video Ads', icon: FaRobot, desc: 'AI-generated creatives' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimerRef = useRef(null);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  // Scroll-aware navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimerRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  const isActive = (href) => pathname === href;

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link href="/" className="logo magnetic" onClick={closeMenu}>
          <img src="/logo.png" alt="AdPulse Logo" />
        </Link>

        {/* Hamburger toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link href="/" onClick={closeMenu} className={isActive('/') ? 'active-link' : ''}>
            <span className="nav-text">HOME</span>
          </Link>

          {/* Services with mega dropdown */}
          <div
            className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`}
            ref={dropdownRef}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              href="/services"
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                } else {
                  closeMenu();
                }
              }}
              className={isActive('/services') ? 'active-link' : ''}
            >
              <span className="nav-text">SERVICES</span>
              <FaChevronDown className="dropdown-arrow" />
            </Link>

            <div className="mega-dropdown">
              <div className="mega-dropdown-inner">
                <div className="mega-grid">
                  {serviceLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="mega-item"
                        onClick={closeMenu}
                      >
                        <div className="mega-item-icon"><Icon /></div>
                        <div className="mega-item-content">
                          <span className="mega-item-label">{s.label}</span>
                          <span className="mega-item-desc">{s.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mega-footer">
                  <Link href="/services" className="mega-footer-link" onClick={closeMenu}>
                    VIEW ALL SERVICES <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/portfolio" onClick={closeMenu} className={isActive('/portfolio') ? 'active-link' : ''}>
            <span className="nav-text">PORTFOLIO</span>
          </Link>
          <Link href="/gallery" onClick={closeMenu} className={isActive('/gallery') ? 'active-link' : ''}>
            <span className="nav-text">MEDIA GALLERY</span>
          </Link>
          <Link href="/about" onClick={closeMenu} className={isActive('/about') ? 'active-link' : ''}>
            <span className="nav-text">ABOUT US</span>
          </Link>
          <Link href="/blog" onClick={closeMenu} className={isActive('/blog') ? 'active-link' : ''}>
            <span className="nav-text">BLOG</span>
          </Link>
          <Link href="/contact" onClick={closeMenu} className={isActive('/contact') ? 'active-link' : ''}>
            <span className="nav-text">CONTACT</span>
          </Link>
          <Link href="/contact" className="btn-primary mobile-btn" onClick={closeMenu}>REQUEST A QUOTE</Link>
        </nav>

        <Link href="/contact" className="btn-primary desktop-btn magnetic">
          <span>REQUEST A QUOTE</span>
          <span className="btn-shine"></span>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar"></div>
      </div>
    </header>
  );
}
