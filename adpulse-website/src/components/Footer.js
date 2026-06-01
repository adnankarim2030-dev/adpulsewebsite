import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col brand-col">
          <Link href="/" className="logo">
            <img src="/logo.jpg" alt="AdPulse Logo" style={{ height: '90px', width: 'auto', marginBottom: '1rem', mixBlendMode: 'multiply' }} />
          </Link>
          <p style={{color: '#111'}}>Elevate Your Brand with Data-Driven Media Strategies. We empower your business in a connected world.</p>
        </div>
        <div className="footer-col">
          <h4 style={{color: '#111'}}>QUICK LINKS</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/about#team">Our Team</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Career</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 style={{color: '#111'}}>OUR SERVICES</h4>
          <ul>
            <li><Link href="/services#digital">Digital Advertising</Link></li>
            <li><Link href="/services#pr">Public Relations</Link></li>
            <li><Link href="/services#branding">Brand Development</Link></li>
            <li><Link href="/services#video">Video Production</Link></li>
            <li><Link href="/services#research">Market Research</Link></li>
          </ul>
        </div>
        <div className="footer-col contact-col">
          <h4 style={{color: '#111'}}>CONTACT US</h4>
          <p style={{color: '#111'}}>+92 3008463041</p>
          <p style={{color: '#111'}}>info@adpulse.pk</p>
          <p style={{color: '#111'}}>Office #213, 2nd Floor, Pak Tower<br/>Block 5 Clifton, Karachi</p>
          <div className="social-links colored-icons">
            <a href="https://facebook.com" className="fb" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" className="ig" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" className="in" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com" className="yt" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom-wrapper">
        <div className="container footer-bottom">
          <p>© 2024 ADPULSE IMC (PVT) LTD. ALL RIGHTS RESERVED. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
