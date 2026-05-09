import Link from 'next/link';
import { FaFilm, FaBullhorn, FaRegCalendarAlt, FaUsers, FaCogs, FaMapSigns, FaLaptopCode } from 'react-icons/fa';
import './home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content">
          <h1>DRIVING BRANDS.<br/>CREATING IMPACT.</h1>
          <p>We are AdPulse Media Agency - Your Growth Partner in the Digital World.</p>
          <div className="hero-divider"></div>
          <p className="hero-subtext">From powerful content to performance-driven ads, we help brands connect, engage, and grow.</p>
          <div className="hero-buttons">
            <Link href="/services" className="btn-primary">OUR SERVICES →</Link>
            <Link href="/portfolio" className="btn-outline">VIEW OUR WORK →</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Circular Graphic with 'A' Logo */}
          <div className="graphic-circle">
             <img src="/logo.jpg" alt="AdPulse Hero Logo" style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain', zIndex: 1 }} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section bg-gradient-gray">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">WHAT WE DO</span>
            <h2>OUR SERVICES</h2>
          </div>
                              <div className="services-marquee">
            <div className="services-marquee-track">
              {/* Set 1 */}
              <div className="service-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>TVC PRODUCTIONS</h3>
                <p>Concept & script development, shoot of TVC, DVC & documentaries</p>
                <Link href="/services#production" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaMapSigns /></div>
                <h3>OUTDOOR MEDIA ADVERTISING</h3>
                <p>Hoardings, streamers, digital screens & transit advertising</p>
                <Link href="/services#outdoor-media" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaCogs /></div>
                <h3>MEDIA BUYING & PLANNING</h3>
                <p>Print, electronic & digital release</p>
                <Link href="/services#media-buying" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaRegCalendarAlt /></div>
                <h3>CORPORATE EVENTS</h3>
                <p>Planning, designing, execution & management</p>
                <Link href="/services#corporate-events" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaUsers /></div>
                <h3>PR & PROMOTION</h3>
                <p>Media PR & brand amplification plan</p>
                <Link href="/services#pr-promotion" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaBullhorn /></div>
                <h3>BTL MARKETING</h3>
                <p>Concept, planning & nationwide activation</p>
                <Link href="/services#btl-marketing" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaLaptopCode /></div>
                <h3>DIGITAL MARKETING SERVICES</h3>
                <p>Comprehensive digital campaigns to boost online presence and engagement</p>
                <Link href="/services#digital-marketing" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>AI VIDEO ADS CREATIVE</h3>
                <p>Cutting-edge AI-generated video commercials and content</p>
                <Link href="/services#ai-video" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              
              {/* Set 2 (Duplicated for seamless infinite scrolling) */}
              <div className="service-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>TVC PRODUCTIONS</h3>
                <p>Concept & script development, shoot of TVC, DVC & documentaries</p>
                <Link href="/services#production" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaMapSigns /></div>
                <h3>OUTDOOR MEDIA ADVERTISING</h3>
                <p>Hoardings, streamers, digital screens & transit advertising</p>
                <Link href="/services#outdoor-media" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaCogs /></div>
                <h3>MEDIA BUYING & PLANNING</h3>
                <p>Print, electronic & digital release</p>
                <Link href="/services#media-buying" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaRegCalendarAlt /></div>
                <h3>CORPORATE EVENTS</h3>
                <p>Planning, designing, execution & management</p>
                <Link href="/services#corporate-events" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaUsers /></div>
                <h3>PR & PROMOTION</h3>
                <p>Media PR & brand amplification plan</p>
                <Link href="/services#pr-promotion" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaBullhorn /></div>
                <h3>BTL MARKETING</h3>
                <p>Concept, planning & nationwide activation</p>
                <Link href="/services#btl-marketing" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaLaptopCode /></div>
                <h3>DIGITAL MARKETING SERVICES</h3>
                <p>Comprehensive digital campaigns to boost online presence and engagement</p>
                <Link href="/services#digital-marketing" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
              <div className="service-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>AI VIDEO ADS CREATIVE</h3>
                <p>Cutting-edge AI-generated video commercials and content</p>
                <Link href="/services#ai-video" className="text-red font-bold">LEARN MORE ?</Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section container">
        <div className="stat-item">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>150+</h3>
            <p>HAPPY CLIENTS</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>300+</h3>
            <p>PROJECTS COMPLETED</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>5X</h3>
            <p>AVERAGE GROWTH</p>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🏅</div>
          <div className="stat-info">
            <h3>100%</h3>
            <p>CLIENT SATISFACTION</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">OUR WORK</span>
            <h2>FEATURED PROJECTS</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-img bg-dark">
                {/* Placeholder for project image */}
                <div className="project-placeholder">FITFUEL</div>
              </div>
              <div className="project-info">
                <h4>FitFuel</h4>
                <p>Social Media Campaign</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img bg-dark">
                <div className="project-placeholder">BURGER HOUSE</div>
              </div>
              <div className="project-info">
                <h4>Burger House</h4>
                <p>Paid Ads Campaign</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img bg-dark">
                <div className="project-placeholder">LUXURY LIVING</div>
              </div>
              <div className="project-info">
                <h4>Urban Peaks</h4>
                <p>Branding & Design</p>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img bg-dark">
                <div className="project-placeholder">NEXT GEN TECH</div>
              </div>
              <div className="project-info">
                <h4>TechNova</h4>
                <p>Video Production</p>
              </div>
            </div>
          </div>
          <div className="center-btn">
             <Link href="/portfolio" className="btn-primary">VIEW ALL PROJECTS →</Link>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process-section container">
        <div className="section-header">
          <span className="subtitle">OUR PROCESS</span>
          <h2>HOW WE WORK</h2>
        </div>
        <div className="process-timeline">
          <div className="process-step">
             <div className="step-icon">💬</div>
             <h3>01</h3>
             <h4>DISCOVER</h4>
             <p>We understand your brand and goals.</p>
          </div>
          <div className="process-step">
             <div className="step-icon">💡</div>
             <h3>02</h3>
             <h4>STRATEGIZE</h4>
             <p>We create a custom strategy for action.</p>
          </div>
          <div className="process-step">
             <div className="step-icon">⚙️</div>
             <h3>03</h3>
             <h4>EXECUTE</h4>
             <p>We bring the strategy to life with precision.</p>
          </div>
          <div className="process-step">
             <div className="step-icon">📊</div>
             <h3>04</h3>
             <h4>OPTIMIZE</h4>
             <p>We analyze, optimize and scale results.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-gradient-red">
        <div className="container cta-inner">
           <div className="cta-content">
             <h2>LET'S GROW YOUR BRAND TOGETHER</h2>
             <p>Have a project in mind? Let's create something amazing!</p>
           </div>
           <Link href="/contact" className="btn-primary" style={{backgroundColor: '#b30000'}}>GET IN TOUCH →</Link>
        </div>
      </section>

    </div>
  );
}
