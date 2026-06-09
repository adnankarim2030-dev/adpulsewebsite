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
