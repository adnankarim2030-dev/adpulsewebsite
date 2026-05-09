"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo" onClick={closeMenu}>
          <img src="/logo.jpg" alt="AdPulse Logo" style={{ height: '80px', width: 'auto', mixBlendMode: 'multiply' }} />
        </Link>
        <div className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link href="/" onClick={closeMenu}>HOME</Link>
          <Link href="/services" onClick={closeMenu}>SERVICES</Link>
          <Link href="/portfolio" onClick={closeMenu}>PORTFOLIO</Link>
          <Link href="/about" onClick={closeMenu}>ABOUT US</Link>
          <Link href="/blog" onClick={closeMenu}>BLOG</Link>
          <Link href="/contact" onClick={closeMenu}>CONTACT</Link>
          <Link href="/contact" className="btn-teal mobile-btn" onClick={closeMenu}>REQUEST A QUOTE</Link>
        </nav>
        <Link href="/contact" className="btn-teal desktop-btn">REQUEST A QUOTE</Link>
      </div>
    </header>
  );
}
