import Link from 'next/link';
import { FaFilm, FaBullhorn, FaRegCalendarAlt, FaUsers, FaCogs, FaMapSigns, FaLaptopCode, FaRobot } from 'react-icons/fa';
import { services } from '@/data/services';
import './home.css';

export const metadata = {
  title: "AdPulse Media Agency",
  description: "Elevate your brand with AdPulse IMC, Karachi's leading full-service advertising agency. Specializing in TVC production, outdoor media, media buying, digital marketing, and corporate events.",
  keywords: "media agency karachi, advertising agency pakistan, tvc production karachi, digital marketing agency, outdoor advertising, OOH karachi, media planning and buying, BTL marketing pakistan",
  openGraph: {
    title: "AdPulse Media Agency",
    description: "Elevate your brand with AdPulse IMC, Karachi's leading full-service advertising agency. Specializing in TVC production, outdoor media, and digital marketing.",
    url: "https://adpulse.pk",
    siteName: "AdPulse IMC",
    type: "website",
  }
};

const BrandLogo = ({ brand }) => {
  if (brand.logo && !brand.logo.includes('placeholder.png')) {
    return <img src={brand.logo} alt={brand.name} className="brand-logo-img" loading="lazy" />;
  }
  return (
    <div className="brand-logo-text">
      <span>{brand.text || brand.name}</span>
    </div>
  );
};

const serviceIcons = {
  'tvc-production': FaFilm,
  'outdoor-media': FaMapSigns,
  'media-buying': FaCogs,
  'corporate-events': FaRegCalendarAlt,
  'pr-promotion': FaUsers,
  'btl-marketing': FaBullhorn,
  'digital-marketing': FaLaptopCode,
  'ai-video-ads': FaRobot
};

export default function Home() {
  // ── All brands with logo URLs ──
  // logo: public URL or null (renders styled text fallback)
  const row1Brands = [
    { name: "Young's",      sector: "Food & FMCG",          logo: "/images/brands/YOUNGS.png" },
    { name: "Kifayah",      sector: "Pharmacy & Supermarket", logo: "/images/brands/KIFAYA.png" },
    { name: "Imtiaz",       sector: "Retail Giant",          logo: "/images/brands/IMTIAZ LOGO.png" },
    { name: "Chase Up",     sector: "Department Store",      logo: "/images/brands/CHASEUP LOGO.png" },
    { name: "Chase Value",  sector: "Retail Store",          logo: "/images/brands/CHASE VALUE.png" },
    { name: "Sunridge",     sector: "Food & Agriculture",    logo: "/images/brands/SUNDRIGE.png" },
    { name: "MTJ",          sector: "Fashion & Apparel",     logo: "/images/brands/MTJ.png" },
    { name: "Diners",       sector: "Premium Clothing",      logo: "/images/brands/DINNERS.png" },
    { name: "Sahar",        sector: "Luxury Apparel",        logo: "/images/brands/SAHAR.png" },
    { name: "Oxford",       sector: "Apparel Brand",         logo: "/images/brands/OXFORD.png" },
    { name: "Sohaye",       sector: "Women's Fashion",       logo: "/images/brands/SOHAYE.png" },
    { name: "Nine Figures", sector: "Corporate Brand",       logo: "/images/brands/9F.png" },
    { name: "Maazjee",      sector: "Traditional Wear",      logo: "/images/brands/MAAZJEE.png" },
    { name: "Idemitsu",     sector: "Lubricants",            logo: "/images/brands/LUBRICANTS.png" },
    { name: "Suzuki",       sector: "Automotive",            logo: "/images/brands/SUZUKI.png" },
    { name: "Toyota",       sector: "Automotive",            logo: "/images/brands/TOYOTA.png" },
    { name: "BMW / Dewan",  sector: "BMW Importer",          logo: "/images/brands/DEWAN MOTORS.png" },
    { name: "GFS Builders", sector: "Real Estate",           logo: "/images/brands/GFS.png" },
    { name: "Armani",       sector: "Luxury Fashion",        logo: "/images/brands/ARMANI.png" },
    { name: "YD",           sector: "Corporate Group",       logo: "/images/brands/YD.png" },
    { name: "Z Group",      sector: "Forward Thinking",      logo: "/images/brands/Z GROUP OF COMPANIES.png" }
  ];

  const row2Brands = [
    { name: "HMR Waterfront",    sector: "Premium Real Estate",    logo: "/images/brands/HMR.png" },
    { name: "Sumsum Group",      sector: "Builders & Developers",   logo: "/images/brands/SUMSUM.png" },
    { name: "Falaknaz Group",    sector: "Real Estate",             logo: "/images/brands/FALAKNAZ LOGO.png" },
    { name: "Siddiqsons",        sector: "Corporate Giant",         logo: "/images/brands/SIDDIQSONS.png" },
    { name: "Saima Waterfront",  sector: "Luxury Living",           logo: "/images/brands/SAIMA.png" },
    { name: "Xefan Group",       sector: "Enterprise",              logo: "/images/brands/XEFAN.png" },
    { name: "Abbott",            sector: "Healthcare & Pharma",     logo: "/images/brands/ABBOT LOGO.png" },
    { name: "Consulate of Japan",sector: "Diplomatic Mission",      logo: "/images/brands/CONSULATE GENERAL.png" },
    { name: "Consulate of China",sector: "Diplomatic Mission",      logo: "/images/brands/CONSULAT GENERAL CHINA.png" },
    { name: "UzbekPak Trade",    sector: "UPITC",                   logo: "/images/brands/UPIC UZBEKPAK.png" },
    { name: "Greenwich Uni.",    sector: "Higher Education",        logo: "/images/brands/GREENWICH.png" },
    { name: "DEBS",              sector: "Schooling System",        logo: "/images/brands/DEBS.png" },
    { name: "SBBDU",             sector: "University",              logo: "/images/brands/SHAHEED BENAZIR.png" },
    { name: "Igloo",             sector: "Ice Cream & Dairy",       logo: "/images/brands/IGLOO.png" },
    { name: "Suaad",             sector: "Apparel Brand",           logo: "/images/brands/SUAD.png" },
    { name: "Sindh Health",      sector: "Emergency Response",      logo: "/images/brands/SINDH LOGO.png" },
    { name: "SSU Police",        sector: "Special Security Unit",   logo: "/images/brands/PROUD TO POLICE PROTECT.png" },
    { name: "Sindh Police",      sector: "Law Enforcement",         logo: "/images/brands/SINDH POLICE.png" },
    { name: "25 Mech Division",  sector: "Armed Forces",            logo: "/images/brands/25 MECHANIZED DIVISIONS.png" },
    { name: "Pakistan Navy",     sector: "Naval Force",             logo: "/images/brands/PAKISTAN LOGO.png" },
    { name: "Sindh Govt.",       sector: "Information Dept.",       logo: "/images/brands/SINDH INFORMATION DEPARTMENT.png" }
  ];

  const allBrands = [...row1Brands, ...row2Brands];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-wrapper">
        {/* Animated background particles */}
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="hero container">
          <div className="hero-content">
            <div className="hero-badge reveal-up">
              <span className="badge-dot"></span>
              ADPULSE IMC (PVT) LTD.
            </div>
            <h1 className="reveal-up">
              <span className="hero-line">We Don’t Just Create</span>
              <span className="hero-line">Campaigns,</span>
              <span className="hero-line">We Create</span>
              <span className="hero-line highlight">Impact.</span>
            </h1>
            <p className="reveal-up">ADPULSE IMC is a full-service media agency – elevating brands through advertising, storytelling, and digital experiences.</p>
            <div className="hero-divider reveal-up"></div>
            <p className="hero-subtext reveal-up">From powerful content to performance-driven ads, we help brands connect, engage, and grow.</p>
            <div className="hero-buttons reveal-up">
              <Link href="/services" className="btn-primary magnetic">
                <span>EXPLORE SERVICES</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/portfolio" className="btn-outline magnetic">VIEW OUR WORK →</Link>
            </div>
          </div>
          <div className="hero-image reveal-scale">
            {/* Circular Graphic with 'A' Logo */}
            <div className="graphic-circle" data-parallax="0.15">
               <img src="/logo.png" alt="AdPulse Hero Logo" style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Marquee */}
      <section className="trusted-section">
        <div className="container">
          <p className="trusted-label reveal-fade">Trusted by Leading Brands</p>
          
          {/* Single Combined Row: Scrolling Left */}
          <div className="trusted-marquee">
            <div className="trusted-track">
              {[...allBrands, ...allBrands].map((brand, i) => (
                <div key={i} className="trusted-brand-card">
                  <div className="brand-logo-wrap">
                    <BrandLogo brand={brand} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section bg-gradient-gray">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="subtitle">WHAT WE DO</span>
            <h2>OUR SERVICES</h2>
          </div>
                              <div className="services-marquee">
            <div className="services-marquee-track">
              {/* Set 1 */}
              {services.map((service, idx) => {
                const Icon = serviceIcons[service.slug] || FaFilm;
                return (
                  <div className="service-card tilt-card" key={`set1-${idx}`}>
                    <div className="service-icon"><Icon /></div>
                    <h3>{service.title}</h3>
                    <p>{service.tagline}</p>
                    <Link href={`/services/${service.slug}`} className="text-red font-bold card-link">
                      LEARN MORE <span className="arrow">→</span>
                    </Link>
                  </div>
                );
              })}

              {/* Set 2 (Duplicated for seamless infinite scrolling) */}
              {services.map((service, idx) => {
                const Icon = serviceIcons[service.slug] || FaFilm;
                return (
                  <div className="service-card tilt-card" key={`set2-${idx}`}>
                    <div className="service-icon"><Icon /></div>
                    <h3>{service.title}</h3>
                    <p>{service.tagline}</p>
                    <Link href={`/services/${service.slug}`} className="text-red font-bold card-link">
                      LEARN MORE <span className="arrow">→</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section — Animated Counters */}
      <section className="stats-section container" data-stagger>
        <div className="stat-item reveal-up tilt-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3 data-count="250+">0</h3>
            <p>HAPPY CLIENTS</p>
          </div>
        </div>
        <div className="stat-item reveal-up tilt-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3 data-count="1200+">0</h3>
            <p>PROJECTS COMPLETED</p>
          </div>
        </div>
        <div className="stat-item reveal-up tilt-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3 data-count="98%">0</h3>
            <p>CLIENT SATISFACTION</p>
          </div>
        </div>
        <div className="stat-item reveal-up tilt-card">
          <div className="stat-icon">🏅</div>
          <div className="stat-info">
            <h3 data-count="15+">0</h3>
            <p>YEARS OF EXPERIENCE</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="subtitle">OUR WORK</span>
            <h2>FEATURED PROJECTS</h2>
          </div>
          <div className="projects-grid" data-stagger>
            {[
              { name: "BMW Dewan Motors", sector: "Luxury Automotive", logo: "dewanmotors.com.pk", youtubeId: "g9eQ8jU-wJg", title: "BMW Dewan Motors", subtitle: "Grand Opening Showcase" },
              { name: "Young's Food", sector: "FMCG Campaign", logo: "youngsfood.com", youtubeId: "ntIAakOpHr4", title: "Young's Food", subtitle: "Engaging Digital Series" },
              { name: "Chase Up", sector: "Retail Marketing", logo: "chaseup.com.pk", youtubeId: "68bC80ZdzfY", title: "Chase Up", subtitle: "Seasonal Promotions" },
              { name: "GFS Builders", sector: "Real Estate & TVC", logo: "gfsbuilders.com.pk", youtubeId: "WoAeLUmc3xo", title: "GFS Builders & Developers", subtitle: "Marketing & TVC Production" }
            ].map((project, idx) => (
              <div className="project-card reveal-up tilt-card" key={idx}>
                <div className="project-img">
                  <div className="portfolio-video-bg">
                    <iframe 
                      src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1`}
                      title={project.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="portfolio-iframe"
                    ></iframe>
                  </div>
                  <div className="project-overlay">
                    <span className="project-tag">{project.sector}</span>
                    <Link href="/portfolio" className="project-view">View Project →</Link>
                  </div>
                </div>
                <div className="project-info">
                  <h4>{project.title}</h4>
                  <p>{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="center-btn reveal-up">
             <Link href="/portfolio" className="btn-primary magnetic">VIEW ALL PROJECTS →</Link>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process-section container">
        <div className="section-header reveal-up">
          <span className="subtitle">OUR PROCESS</span>
          <h2>HOW WE WORK</h2>
        </div>
        <div className="process-timeline" data-stagger>
          <div className="process-step reveal-up tilt-card">
             <div className="step-icon">💬</div>
             <h3>01</h3>
             <h4>DISCOVER</h4>
             <p>We understand your brand and goals.</p>
          </div>
          <div className="process-step reveal-up tilt-card">
             <div className="step-icon">💡</div>
             <h3>02</h3>
             <h4>STRATEGIZE</h4>
             <p>We create a custom strategy for action.</p>
          </div>
          <div className="process-step reveal-up tilt-card">
             <div className="step-icon">⚙️</div>
             <h3>03</h3>
             <h4>EXECUTE</h4>
             <p>We bring the strategy to life with precision.</p>
          </div>
          <div className="process-step reveal-up tilt-card">
             <div className="step-icon">📊</div>
             <h3>04</h3>
             <h4>OPTIMIZE</h4>
             <p>We analyze, optimize and scale results.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-gradient-red">
        <div className="container cta-inner reveal-up">
           <div className="cta-content">
             <h2>LET'S GROW YOUR BRAND TOGETHER</h2>
             <p>Have a project in mind? Let's create something amazing!</p>
           </div>
           <Link href="/contact" className="btn-primary magnetic cta-btn">GET IN TOUCH →</Link>
        </div>
      </section>

    </div>
  );
}
