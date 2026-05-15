import Link from 'next/link';
import { FaFilm, FaBullhorn, FaRegCalendarAlt, FaUsers, FaCogs, FaMapSigns, FaLaptopCode, FaNewspaper, FaTv, FaDesktop, FaBus } from 'react-icons/fa';
import './home.css';

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

export default function Home() {
  // ── All brands with logo URLs ──
  // logo: public URL or null (renders styled text fallback)
  const row1Brands = [
    { name: "Young's",      sector: "Food & FMCG",          logo: "https://logo.clearbit.com/youngsfood.com" },
    { name: "Kifayah",      sector: "Pharmacy & Supermarket", logo: "https://logo.clearbit.com/kifayah.pk", text: "KIFAYAH" },
    { name: "Imtiaz",       sector: "Retail Giant",          logo: "https://logo.clearbit.com/imtiaz.com.pk", text: "★Imtiaz" },
    { name: "Chase Up",     sector: "Department Store",      logo: "https://logo.clearbit.com/chaseup.com.pk", text: "CHASE UP" },
    { name: "Chase Value",  sector: "Retail Store",          logo: "https://logo.clearbit.com/chasevalue.pk", text: "ChaseValue" },
    { name: "Sunridge",     sector: "Food & Agriculture",    logo: "https://logo.clearbit.com/sunridgefoods.com", text: "Sünridge" },
    { name: "MTJ",          sector: "Fashion & Apparel",     logo: "https://logo.clearbit.com/mtjonline.com", text: "MTJ" },
    { name: "Diners",       sector: "Premium Clothing",      logo: "https://logo.clearbit.com/diners.com.pk", text: "DINERS" },
    { name: "Sahar",        sector: "Luxury Apparel",        logo: "https://logo.clearbit.com/sahar.pk", text: "SAHAR" },
    { name: "Oxford",       sector: "Apparel Brand",         logo: "https://logo.clearbit.com/oxford.com.pk", text: "OXFORD" },
    { name: "Sohaye",       sector: "Women's Fashion",       logo: "https://logo.clearbit.com/sohaye.com", text: "SOHAYE" },
    { name: "Nine Figures", sector: "Corporate Brand",       logo: null, text: "9F" },
    { name: "Maazjee",      sector: "Traditional Wear",      logo: "https://logo.clearbit.com/maazjee.com", text: "MAAZJEE" },
    { name: "Idemitsu",     sector: "Lubricants",            logo: "https://logo.clearbit.com/idemitsu.com", text: "IDEMITSU" },
    { name: "Suzuki",       sector: "Automotive",            logo: "https://logo.clearbit.com/suzukipakistan.com", text: "SUZUKI" },
    { name: "Toyota",       sector: "Automotive",            logo: "https://logo.clearbit.com/toyota-indus.com", text: "TOYOTA" },
    { name: "BMW / Dewan",  sector: "BMW Importer",          logo: "https://logo.clearbit.com/dewanmotors.com.pk", text: "BMW" },
    { name: "GFS Builders", sector: "Real Estate",           logo: "https://logo.clearbit.com/gfsbuilders.com.pk", text: "GFS" },
  ];

  const row2Brands = [
    { name: "HMR Waterfront",    sector: "Premium Real Estate",    logo: "https://logo.clearbit.com/hmrwaterfront.com", text: "HMR WATERFRONT" },
    { name: "Sumsum Group",      sector: "Builders & Developers",   logo: "https://logo.clearbit.com/sumsumgroup.com", text: "SUMSUM GROUP" },
    { name: "Falaknaz Group",    sector: "Real Estate",             logo: "https://logo.clearbit.com/falaknazgroup.com", text: "FALAKNAZ" },
    { name: "Siddiqsons",        sector: "Corporate Giant",         logo: "https://logo.clearbit.com/siddiqsons.com", text: "SIDDIQSONS" },
    { name: "9th Ave.",          sector: "Commercial Center",       logo: null, text: "9TH AVE." },
    { name: "Saima Waterfront",  sector: "Luxury Living",           logo: "https://logo.clearbit.com/saimawaterfront.com", text: "Saima Waterfront" },
    { name: "Xefan Group",       sector: "Enterprise",              logo: null, text: "XEFAN GROUP" },
    { name: "Abbott",            sector: "Healthcare & Pharma",     logo: "https://logo.clearbit.com/abbott.com.pk", text: "ABBOTT" },
    { name: "PJBF",              sector: "Pak-Japan Business Forum",logo: "https://logo.clearbit.com/pjbf.org.pk", text: "Pakistan Japan Business Forum" },
    { name: "Consulate of Japan",sector: "Diplomatic Mission",      logo: "https://logo.clearbit.com/pk.emb-japan.go.jp", text: "JAPAN" },
    { name: "UPITC",             sector: "UzbekPak Trade Centre",   logo: null, text: "UPITC" },
    { name: "Z Group",           sector: "Forward Thinking",        logo: null, text: "Z GROUP" },
    { name: "Greenwich Uni.",    sector: "Higher Education",        logo: "https://logo.clearbit.com/greenwich.edu.pk", text: "Greenwich University" },
    { name: "DEBS",              sector: "Schooling System",        logo: null, text: "DEBS" },
    { name: "SBBDU",             sector: "University",              logo: "https://logo.clearbit.com/sbbwu.edu.pk", text: "SBBDU" },
    { name: "Igloo",             sector: "Ice Cream & Dairy",       logo: "https://logo.clearbit.com/igloo.com.pk", text: "IGLOO" },
    { name: "Suaad",             sector: "Apparel Brand",           logo: "https://logo.clearbit.com/suaad.pk", text: "SUAAD" },
    { name: "Sindh Health",      sector: "Emergency Response",      logo: "https://logo.clearbit.com/shcc.org.pk", text: "SINDH" },
    { name: "Sindh Police",      sector: "Special Security Unit",   logo: "https://logo.clearbit.com/sindhpolice.gov.pk", text: "SSU" },
    { name: "25 Mech Division",  sector: "Armed Forces",            logo: "https://logo.clearbit.com/pakistanarmy.gov.pk", text: "25 MECH" },
    { name: "Pakistan Navy",     sector: "Naval Force",             logo: "https://logo.clearbit.com/paknavy.gov.pk", text: "PAKISTAN NAVY" },
  ];

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
              <span className="hero-line">We Create.</span>
              <span className="hero-line">We Connect.</span>
              <span className="hero-line highlight">We AdPulse.</span>
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
          
          {/* Row 1: Scrolling Left */}
          <div className="trusted-marquee">
            <div className="trusted-track">
              {[...row1Brands, ...row1Brands].map((brand, i) => (
                <div key={i} className="trusted-brand-card">
                  <div className="brand-logo-wrap">
                    <BrandLogo brand={brand} />
                  </div>
                  <span className="brand-sector">{brand.sector}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="trusted-marquee" style={{ marginTop: '1.5rem' }}>
            <div className="trusted-track reverse">
              {[...row2Brands, ...row2Brands].map((brand, i) => (
                <div key={i} className="trusted-brand-card">
                  <div className="brand-logo-wrap">
                    <BrandLogo brand={brand} />
                  </div>
                  <span className="brand-sector">{brand.sector}</span>
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
              <div className="service-card tilt-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>TVC PRODUCTIONS</h3>
                <p>Concept & script development, shoot of TVC, DVC & documentaries</p>
                <Link href="/services/tvc-production" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaMapSigns /></div>
                <h3>OUTDOOR MEDIA ADVERTISING</h3>
                <p>Hoardings, streamers, digital screens & transit advertising</p>
                <Link href="/services/outdoor-media" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaCogs /></div>
                <h3>MEDIA BUYING & PLANNING</h3>
                <p>Print, electronic & digital release</p>
                <Link href="/services/media-buying" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaRegCalendarAlt /></div>
                <h3>CORPORATE EVENTS</h3>
                <p>Planning, designing, execution & management</p>
                <Link href="/services/corporate-events" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaUsers /></div>
                <h3>PR & PROMOTION</h3>
                <p>Media PR & brand amplification plan</p>
                <Link href="/services/pr-promotion" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaBullhorn /></div>
                <h3>BTL MARKETING</h3>
                <p>Concept, planning & nationwide activation</p>
                <Link href="/services/btl-marketing" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaLaptopCode /></div>
                <h3>DIGITAL MARKETING SERVICES</h3>
                <p>Comprehensive digital campaigns to boost online presence and engagement</p>
                <Link href="/services/digital-marketing" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>AI VIDEO ADS CREATIVE</h3>
                <p>Cutting-edge AI-generated video commercials and content</p>
                <Link href="/services/ai-video-ads" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaNewspaper /></div>
                <h3>PRINT MEDIA RELEASE</h3>
                <p>Strategic press releases & placements across leading print publications</p>
                <Link href="/services/print-media-release" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaTv /></div>
                <h3>ELECTRONIC MEDIA</h3>
                <p>TV & radio campaigns that capture mass audiences across Pakistan</p>
                <Link href="/services/electronic-media" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaDesktop /></div>
                <h3>DIGITAL DISPLAY</h3>
                <p>Eye-catching digital display ads that convert across platforms and screens</p>
                <Link href="/services/digital-display" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaBus /></div>
                <h3>TRANSIT ADVERTISING</h3>
                <p>Mobile brand exposure through buses, vehicles & transit network placements</p>
                <Link href="/services/transit-advertising" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>

              {/* Set 2 (Duplicated for seamless infinite scrolling) */}
              <div className="service-card tilt-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>TVC PRODUCTIONS</h3>
                <p>Concept & script development, shoot of TVC, DVC & documentaries</p>
                <Link href="/services/tvc-production" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaMapSigns /></div>
                <h3>OUTDOOR MEDIA ADVERTISING</h3>
                <p>Hoardings, streamers, digital screens & transit advertising</p>
                <Link href="/services/outdoor-media" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaCogs /></div>
                <h3>MEDIA BUYING & PLANNING</h3>
                <p>Print, electronic & digital release</p>
                <Link href="/services/media-buying" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaRegCalendarAlt /></div>
                <h3>CORPORATE EVENTS</h3>
                <p>Planning, designing, execution & management</p>
                <Link href="/services/corporate-events" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaUsers /></div>
                <h3>PR & PROMOTION</h3>
                <p>Media PR & brand amplification plan</p>
                <Link href="/services/pr-promotion" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaBullhorn /></div>
                <h3>BTL MARKETING</h3>
                <p>Concept, planning & nationwide activation</p>
                <Link href="/services/btl-marketing" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaLaptopCode /></div>
                <h3>DIGITAL MARKETING SERVICES</h3>
                <p>Comprehensive digital campaigns to boost online presence and engagement</p>
                <Link href="/services/digital-marketing" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaFilm /></div>
                <h3>AI VIDEO ADS CREATIVE</h3>
                <p>Cutting-edge AI-generated video commercials and content</p>
                <Link href="/services/ai-video-ads" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaNewspaper /></div>
                <h3>PRINT MEDIA RELEASE</h3>
                <p>Strategic press releases & placements across leading print publications</p>
                <Link href="/services/print-media-release" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaTv /></div>
                <h3>ELECTRONIC MEDIA</h3>
                <p>TV & radio campaigns that capture mass audiences across Pakistan</p>
                <Link href="/services/electronic-media" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaDesktop /></div>
                <h3>DIGITAL DISPLAY</h3>
                <p>Eye-catching digital display ads that convert across platforms and screens</p>
                <Link href="/services/digital-display" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
              <div className="service-card tilt-card">
                <div className="service-icon"><FaBus /></div>
                <h3>TRANSIT ADVERTISING</h3>
                <p>Mobile brand exposure through buses, vehicles & transit network placements</p>
                <Link href="/services/transit-advertising" className="text-red font-bold card-link">LEARN MORE <span className="arrow">→</span></Link>
              </div>
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
            <div className="project-card reveal-up tilt-card">
              <div className="project-img">
                <img src="/images/portfolio/fitfuel.png" alt="FitFuel" />
                <div className="project-overlay">
                  <span className="project-tag">Social Media</span>
                  <Link href="/portfolio" className="project-view">View Project →</Link>
                </div>
              </div>
              <div className="project-info">
                <h4>FitFuel</h4>
                <p>Social Media Campaign</p>
              </div>
            </div>
            <div className="project-card reveal-up tilt-card">
              <div className="project-img">
                <img src="/images/portfolio/burgerhouse.png" alt="Burger House" />
                <div className="project-overlay">
                  <span className="project-tag">Paid Ads</span>
                  <Link href="/portfolio" className="project-view">View Project →</Link>
                </div>
              </div>
              <div className="project-info">
                <h4>Burger House</h4>
                <p>Paid Ads Campaign</p>
              </div>
            </div>
            <div className="project-card reveal-up tilt-card">
              <div className="project-img">
                <img src="/images/portfolio/urbanpeaks.png" alt="Urban Peaks" />
                <div className="project-overlay">
                  <span className="project-tag">Branding</span>
                  <Link href="/portfolio" className="project-view">View Project →</Link>
                </div>
              </div>
              <div className="project-info">
                <h4>Urban Peaks</h4>
                <p>Branding & Design</p>
              </div>
            </div>
            <div className="project-card reveal-up tilt-card">
              <div className="project-img">
                <img src="/images/portfolio/technova.png" alt="TechNova" />
                <div className="project-overlay">
                  <span className="project-tag">Video</span>
                  <Link href="/portfolio" className="project-view">View Project →</Link>
                </div>
              </div>
              <div className="project-info">
                <h4>TechNova</h4>
                <p>Video Production</p>
              </div>
            </div>
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
