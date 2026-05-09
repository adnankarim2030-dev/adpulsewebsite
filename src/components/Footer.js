"use client";
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col brand-col reveal-up">
          <Link href="/" className="logo">
            <img src="/logo.png" alt="AdPulse Logo" style={{ height: '90px', width: 'auto', marginBottom: '1rem' }} />
          </Link>
          <p>Elevate Your Brand with Data-Driven Media Strategies. We empower your business in a connected world.</p>
          <span className="brand-badge">MEDIA AGENCY</span>
        </div>
        <div className="footer-col reveal-up">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/about#team">Our Team</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Career</Link></li>
          </ul>
        </div>
        <div className="footer-col reveal-up">
          <h4>OUR SERVICES</h4>
          <ul>
            <li><Link href="/services/digital-marketing">Digital Advertising</Link></li>
            <li><Link href="/services/pr-promotion">Public Relations</Link></li>
            <li><Link href="/services/btl-marketing">BTL Marketing</Link></li>
            <li><Link href="/services/tvc-production">TVC Production</Link></li>
            <li><Link href="/services/outdoor-media">Outdoor Media</Link></li>
          </ul>
        </div>
        <div className="footer-col contact-col reveal-up">
          <h4>CONTACT US</h4>
          <div className="contact-item">
            <FaPhoneAlt className="contact-item-icon" />
            <p>+92 21 37526834</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-item-icon" />
            <p>info@adpulse.pk</p>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-item-icon" />
            <p>Office #213, 2nd Floor, Pak Tower<br/>Block 5 Clifton, Karachi</p>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button className="back-to-top magnetic" onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp />
      </button>

      <div className="footer-bottom-wrapper">
        <div className="container footer-bottom">
          <p>© 2024 ADPULSE IMC (PVT) LTD. ALL RIGHTS RESERVED. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
