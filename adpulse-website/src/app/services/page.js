import Link from 'next/link';
import './services.css';

export default function ServicesPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>OUR SERVICES</h1>
          <p>Comprehensive digital solutions to accelerate your growth.</p>
        </div>
      </div>

      <section className="container section-padding">
        <div className="services-list">
          {/* Service 1 */}
          <div className="service-detail-row" id="production">
            <div className="service-detail-content">
              <h2>PRODUCTION</h2>
              <p>Concept & script development, shoot of TVC, DVC & documentaries.</p>
              <ul className="service-features">
                <li>✓ Concept & Script Development</li>
                <li>✓ TV Commercials (TVC)</li>
                <li>✓ Digital Video Commercials (DVC)</li>
                <li>✓ Documentaries</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">PRODUCTION</span>
            </div>
          </div>

          {/* Service 2 */}
          <div className="service-detail-row reverse" id="btl-marketing">
            <div className="service-detail-content">
              <h2>BTL MARKETING</h2>
              <p>Concept, planning & nationwide activation.</p>
              <ul className="service-features">
                <li>✓ Concept & Strategy Planning</li>
                <li>✓ Nationwide Brand Activations</li>
                <li>✓ Experiential Marketing</li>
                <li>✓ Direct Consumer Engagement</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">BTL MARKETING</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="service-detail-row" id="corporate-events">
            <div className="service-detail-content">
              <h2>CORPORATE EVENTS</h2>
              <p>Planning, designing, execution & management.</p>
              <ul className="service-features">
                <li>✓ Event Planning & Strategy</li>
                <li>✓ Stage Design & Setup</li>
                <li>✓ Flawless Execution</li>
                <li>✓ Complete Event Management</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">EVENTS</span>
            </div>
          </div>

          {/* Service 4 */}
          <div className="service-detail-row reverse" id="pr-promotion">
            <div className="service-detail-content">
              <h2>PR & PROMOTION</h2>
              <p>Media PR & brand amplification plan.</p>
              <ul className="service-features">
                <li>✓ Media Public Relations</li>
                <li>✓ Brand Amplification Strategies</li>
                <li>✓ Press Releases & Coverage</li>
                <li>✓ Influencer Outreach</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">PR & PROMOTION</span>
            </div>
          </div>

          {/* Service 5 */}
          <div className="service-detail-row" id="media-buying">
            <div className="service-detail-content">
              <h2>MEDIA BUYING & PLANNING</h2>
              <p>Print, electronic & digital release.</p>
              <ul className="service-features">
                <li>✓ Media Strategy & Planning</li>
                <li>✓ Print Media Releases</li>
                <li>✓ Electronic Media (TV/Radio)</li>
                <li>✓ Digital Media Placements</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">MEDIA BUYING</span>
            </div>
          </div>

          {/* Service 6 */}
          <div className="service-detail-row reverse" id="outdoor-media">
            <div className="service-detail-content">
              <h2>OUTDOOR MEDIA ADVERTISING</h2>
              <p>Hoardings, streamers, digital screens & transit advertising.</p>
              <ul className="service-features">
                <li>✓ Billboards & Hoardings</li>
                <li>✓ Streamers & Banners</li>
                <li>✓ Digital OOH Screens</li>
                <li>✓ Transit & Vehicle Advertising</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">OUTDOOR ADS</span>
            </div>
          </div>

          {/* Service 7 */}
          <div className="service-detail-row" id="digital-marketing">
            <div className="service-detail-content">
              <h2>DIGITAL MARKETING</h2>
              <p>Comprehensive digital campaigns to boost online presence, engagement, and conversion.</p>
              <ul className="service-features">
                <li>✓ Social Media Management</li>
                <li>✓ SEO & Content Marketing</li>
                <li>✓ Email & Influencer Campaigns</li>
                <li>✓ Analytics & Conversion Optimization</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE →</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">DIGITAL MARKETING</span>
            </div>
          </div>

        </div>

          {/* Service 8 */}
          <div className="service-detail-row reverse" id="ai-video">
            <div className="service-detail-content">
              <h2>AI VIDEO ADS CREATIVE</h2>
              <p>Cutting-edge AI-generated video commercials and content designed for maximum engagement and virality.</p>
              <ul className="service-features">
                <li>? Generative AI Video Content</li>
                <li>? Automated Ad Variations</li>
                <li>? High-Speed Video Rendering</li>
                <li>? Cost-Effective Campaigns</li>
              </ul>
              <Link href="/contact" className="btn-primary mt-sm">GET A QUOTE ?</Link>
            </div>
            <div className="service-detail-image bg-dark">
              <span className="placeholder-text">AI VIDEO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="pricing-section bg-gradient-gray section-padding">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">PACKAGES</span>
            <h2>TRANSPARENT PRICING</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>STARTER</h3>
              <div className="price">$999<span>/mo</span></div>
              <p>Perfect for small businesses looking to establish a presence.</p>
              <ul>
                <li>Basic Social Media Management</li>
                <li>$500 Ad Spend Management</li>
                <li>Monthly Reporting</li>
              </ul>
              <Link href="/contact" className="btn-outline">CHOOSE STARTER</Link>
            </div>
            <div className="pricing-card featured">
              <div className="featured-badge">MOST POPULAR</div>
              <h3>GROWTH</h3>
              <div className="price">$2,499<span>/mo</span></div>
              <p>For brands ready to scale their digital impact.</p>
              <ul>
                <li>Advanced Social Media</li>
                <li>Up to $5,000 Ad Spend Mgt</li>
                <li>Bi-weekly Strategy Calls</li>
                <li>Basic Content Creation</li>
              </ul>
              <Link href="/contact" className="btn-primary">CHOOSE GROWTH</Link>
            </div>
            <div className="pricing-card">
              <h3>ENTERPRISE</h3>
              <div className="price">Custom</div>
              <p>Comprehensive solutions for large-scale operations.</p>
              <ul>
                <li>Full Omnichannel Strategy</li>
                <li>Unlimited Ad Spend Mgt</li>
                <li>Dedicated Account Manager</li>
                <li>Full Video Production</li>
              </ul>
              <Link href="/contact" className="btn-outline">CONTACT US</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

