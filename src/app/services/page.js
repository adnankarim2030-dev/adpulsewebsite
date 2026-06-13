import Link from 'next/link';
import { services } from '@/data/services';
import './services.css';

export const metadata = {
  title: "Our Services & Pricing Packages | AdPulse Media Agency",
  description: "Explore the full suite of marketing services offered by AdPulse IMC. From TVC production and OOH media to digital marketing, electronic media buying, and transparent pricing packages.",
  keywords: "advertising services karachi, media buying packages, tvc production cost pakistan, outdoor media billboard pricing",
  openGraph: {
    title: "Our Services & Pricing Packages | AdPulse Media Agency",
    description: "Explore the full suite of marketing services offered by AdPulse IMC and transparent pricing packages.",
    url: "https://adpulse.pk/services",
    type: "website",
  }
};

export default function ServicesPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header services-hero">
        <div className="container">
          <h1>OUR SERVICES</h1>
          <p>Comprehensive digital solutions to accelerate your growth.</p>
        </div>
      </div>

      <section className="container section-padding">
        <div className="services-list">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className={`service-detail-row ${index % 2 !== 0 ? 'reverse' : ''}`}
              id={service.slug}
            >
              <div className="service-detail-content">
                <span className="service-number">{service.number}</span>
                <h2>{service.title}</h2>
                <p>{service.tagline}</p>
                <ul className="service-features">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="service-actions">
                  <Link href={`/services/${service.slug}`} className="btn-primary mt-sm">
                    LEARN MORE →
                  </Link>
                  <Link href="/contact" className="btn-outline mt-sm">
                    GET A QUOTE →
                  </Link>
                </div>
              </div>
              <div className="service-detail-image">
                <img src={service.image} alt={service.shortTitle} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="pricing-section bg-gradient-gray section-padding" id="packages">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">PACKAGES</span>
            <h2>DIGITAL GROWTH SOLUTIONS</h2>
            <p className="section-tagline">Complete digital growth solutions for businesses of all sizes</p>
          </div>
          <div className="pricing-grid">
            {/* Package 01 */}
            <div className="pricing-card">
              <div className="package-badge-num">01</div>
              <h3>BRAND FOUNDATION</h3>
              <div className="package-subtitle">CORE SMM + WEBSITE SETUP</div>
              <p className="package-target">Ideal for Startups, Solos & Local Businesses</p>
              
              <ul className="package-features-list">
                <li className="feature-category">Website Development</li>
                <li>✓ 3-5 Page Responsive WordPress Website</li>
                <li>✓ Domain, Hosting & SSL Setup</li>
                <li>✓ Contact Form & WhatsApp Integration</li>
                <li>✓ Basic SEO Setup</li>
                
                <li className="feature-category">Social Media Management</li>
                <li>✓ 2 Platforms (Facebook & Instagram)</li>
                <li>✓ 12 Custom Posts Per Month</li>
                <li>✓ Static Designs & Carousels</li>
                <li>✓ Content Scheduling & Hashtag Research</li>
                
                <li className="feature-category">AI Content Creation</li>
                <li>✓ AI Captions & Content Ideas</li>
                <li>✓ AI Graphic Assistance</li>
                <li>✓ Content Calendar Planning</li>
                
                <li className="feature-category">Paid Advertising</li>
                <li>✓ Basic Meta Ads (Boosting Campaigns)</li>
                <li>✓ Ad Budget Management up to PKR 20,000</li>
                
                <li className="feature-category">Reporting & Support</li>
                <li>✓ Monthly Performance Report</li>
                <li>✓ Reach & Engagement Analysis</li>
                <li>✓ Initial Discovery & Bi-Monthly Check-ins</li>
              </ul>
              
              <div className="package-footer-info">
                <span className="retainer-badge">MINIMUM RETAINER: 4 MONTHS</span>
              </div>
              <Link href="/contact?package=brand-foundation" className="btn-outline w-full text-center">CHOOSE PACKAGE</Link>
            </div>

            {/* Package 02 (Featured) */}
            <div className="pricing-card featured">
              <div className="featured-badge">MOST POPULAR</div>
              <div className="package-badge-num">02</div>
              <h3>OMNI-CHANNEL SCALE</h3>
              <div className="package-subtitle">GROWTH SMM + CORPORATE WEBSITE</div>
              <p className="package-target">Ideal for SMEs, Services & Growing Brands</p>
              
              <ul className="package-features-list">
                <li className="feature-category">Website Development</li>
                <li>✓ 5-10 Page Custom Corporate Website</li>
                <li>✓ Blog Setup</li>
                <li>✓ Custom UI/UX Design</li>
                <li>✓ WhatsApp API & CRM Integration</li>
                <li>✓ Lead Forms & Advanced SEO</li>
                
                <li className="feature-category">Social Media Management</li>
                <li>✓ 3 Platforms (Facebook, Instagram, TikTok / LinkedIn)</li>
                <li>✓ 16-20 Custom Posts Per Month</li>
                <li>✓ Advanced Copywriting & Content Strategy</li>
                
                <li className="feature-category">Video Content</li>
                <li>✓ 2-3 Professionally Edited Reels / TikToks</li>
                <li>✓ Short-form Video Editing (10-15 sec)</li>
                <li>✓ Motion Graphics & Transitions</li>
                
                <li className="feature-category">AI Services</li>
                <li>✓ AI Content Creation & AI Blog Writing</li>
                <li>✓ AI Ad Copy & Image Generation</li>
                <li>✓ AI Marketing Automation Support</li>
                
                <li className="feature-category">Paid Advertising</li>
                <li>✓ Lead Generation / Message Campaigns</li>
                <li>✓ Ad Budget Management up to PKR 75,000</li>
                <li>✓ Campaign Optimization & Targeting</li>
                
                <li className="feature-category">Reporting & Support</li>
                <li>✓ Detailed Monthly Report</li>
                <li>✓ Campaign Analysis & Recommendations</li>
                <li>✓ Monthly 30-Minute Strategy Call</li>
              </ul>
              
              <div className="package-footer-info">
                <span className="retainer-badge">MINIMUM RETAINER: 6 MONTHS</span>
              </div>
              <Link href="/contact?package=omni-channel-scale" className="btn-primary w-full text-center">CHOOSE PACKAGE</Link>
            </div>

            {/* Package 03 */}
            <div className="pricing-card">
              <div className="package-badge-num">03</div>
              <h3>PERFORMANCE ENTERPRISE</h3>
              <div className="package-subtitle">PREMIUM SMM + E-COMMERCE STORE</div>
              <p className="package-target">Ideal for E-Commerce & High-Growth Businesses</p>
              
              <ul className="package-features-list">
                <li className="feature-category">E-Commerce Development</li>
                <li>✓ WooCommerce / Shopify Store (Up to 500 Products)</li>
                <li>✓ Product Categories, Filters & Landing Pages</li>
                <li>✓ Sales Funnels & Conversion Optimization</li>
                
                <li className="feature-category">Payment & Shipping Integrations</li>
                <li>✓ EasyPaisa, JazzCash, Credit / Debit Cards</li>
                <li>✓ Bank Transfer & COD Options</li>
                <li>✓ Integrated Courier Services</li>
                
                <li className="feature-category">Social Media Management</li>
                <li>✓ 4-5 Platforms (FB, IG, TikTok, LinkedIn, YouTube)</li>
                <li>✓ 22-35 Premium Posts Per Month</li>
                <li>✓ Premium Content Strategy & Branding</li>
                
                <li className="feature-category">Premium Video & AI Video Ads</li>
                <li>✓ 5-8 High-Definition Reels & Videos</li>
                <li>✓ AI UGC Videos & AI Spokesperson Videos</li>
                <li>✓ AI Product Ads & Voiceovers</li>
                
                <li className="feature-category">Performance Marketing</li>
                <li>✓ Full-Funnel Campaigns (Up to 5 Active)</li>
                <li>✓ Conversion, Retargeting & Custom Audiences</li>
                <li>✓ Ad Budget Management up to PKR 150,000*</li>
                
                <li className="feature-category">Reporting & Strategy</li>
                <li>✓ Live Google Looker Studio Dashboard</li>
                <li>✓ ROI Tracking & Multi-Source Reporting</li>
                <li>✓ Bi-Weekly Calls & Quarterly Business Review</li>
              </ul>
              
              <div className="package-footer-info">
                <span className="retainer-badge">MINIMUM RETAINER: 6 MONTHS</span>
              </div>
              <Link href="/contact?package=performance-enterprise" className="btn-outline w-full text-center">CHOOSE PACKAGE</Link>
            </div>
          </div>

          {/* Included in all packages */}
          <div className="included-all-packages">
            <h3 className="included-title text-center">INCLUDED IN ALL PACKAGES</h3>
            <div className="included-grid">
              <div className="included-item">
                <div className="included-icon">👔</div>
                <h4>Dedicated Account Manager</h4>
                <p>Your single point of contact for seamless campaign execution.</p>
              </div>
              <div className="included-item">
                <div className="included-icon">👥</div>
                <h4>Community Engagement</h4>
                <p>Proactive interaction and page moderation for your audience.</p>
              </div>
              <div className="included-item">
                <div className="included-icon">🤖</div>
                <h4>AI-Powered Solutions</h4>
                <p>Cutting-edge automation for rapid ideation and performance analysis.</p>
              </div>
              <div className="included-item">
                <div className="included-icon">🔒</div>
                <h4>Secure & Reliable Development</h4>
                <p>Robust development standards, hosting setups, and security protocols.</p>
              </div>
              <div className="included-item">
                <div className="included-icon">⏱️</div>
                <h4>Timely Delivery & Support</h4>
                <p>Consistent, on-time asset deployment and direct support assistance.</p>
              </div>
              <div className="included-item">
                <div className="included-icon">📈</div>
                <h4>Data-Driven Growth</h4>
                <p>Marketing decisions backed by transparent analytics and deep reporting.</p>
              </div>
            </div>
          </div>

          {/* Our 5-Step Growth Process */}
          <div className="growth-process-section">
            <h3 className="process-title text-center">OUR 5-STEP GROWTH PROCESS</h3>
            <div className="process-flow">
              <div className="process-step">
                <div className="step-num">01</div>
                <h4>Discovery & Strategy</h4>
                <p>We analyze your brand, competitors, and target audience to build a solid road map.</p>
              </div>
              <div className="process-arrow">➔</div>
              <div className="process-step">
                <div className="step-num">02</div>
                <h4>Planning & Content</h4>
                <p>We design custom UI/UX, structure calendars, and map out campaign funnels.</p>
              </div>
              <div className="process-arrow">➔</div>
              <div className="process-step">
                <div className="step-num">03</div>
                <h4>Execution & Campaigns</h4>
                <p>We build the assets, launch platforms, and run targeted high-ROI ad campaigns.</p>
              </div>
              <div className="process-arrow">➔</div>
              <div className="process-step">
                <div className="step-num">04</div>
                <h4>Analysis & Reporting</h4>
                <p>We track key indicators, calculate conversions, and deliver visual dashboards.</p>
              </div>
              <div className="process-arrow">➔</div>
              <div className="process-step">
                <div className="step-num">05</div>
                <h4>Optimization & Scale</h4>
                <p>We optimize ad performance, refine strategies, and scale your brand to new heights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
