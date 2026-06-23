import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import ServiceImageSlider from '@/components/ServiceImageSlider';
import './service-detail.css';


export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.shortTitle} — AdPulse Media Agency`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Find adjacent services for navigation
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <div className="page-wrapper">
      {/* Hero Banner */}
      <div className="service-hero">
        <div className="service-hero-bg">
          <img src="/images/services_hero_bg.png" alt={service.shortTitle} />
          <div className="service-hero-overlay"></div>
        </div>
        <div className="container service-hero-content">
          <h1>{service.title}</h1>
          <p>{service.tagline}</p>
          <Link href="/contact" className="btn-primary">GET A QUOTE →</Link>
        </div>
      </div>

      {/* Overview Section */}
      <section className="container section-padding">
        <div className="service-overview-grid">
          <div className="service-overview-text">
            <span className="subtitle" style={{ textAlign: 'left' }}>ABOUT THIS SERVICE</span>
            <h2>What We Offer</h2>
            <p>{service.description}</p>
            <Link href="/contact" className="btn-primary mt-sm">START YOUR PROJECT →</Link>
          </div>
          <div className="service-overview-image">
            {service.images && service.images.length > 0 ? (
              <ServiceImageSlider images={service.images} alt={service.shortTitle} />
            ) : (
              <img src={service.image} alt={service.shortTitle} />
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gradient-gray section-padding">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">CAPABILITIES</span>
            <h2>WHAT'S INCLUDED</h2>
          </div>
          <div className="service-features-grid">
            {service.features.map((feature, i) => (
              <div key={i} className="service-feature-card">
                <span className="feature-number">{String(i + 1).padStart(2, '0')}</span>
                <h3>{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container section-padding">
        <div className="section-header">
          <span className="subtitle">WHY ADPULSE</span>
          <h2>WHY CHOOSE US</h2>
        </div>
        <div className="why-choose-grid">
          {service.whyChoose.map((reason, i) => (
            <div key={i} className="why-choose-card">
              <div className="why-choose-icon">✓</div>
              <p>{reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section bg-gradient-red">
        <div className="container cta-inner">
          <div className="cta-content">
            <h2>READY TO GET STARTED?</h2>
            <p>Let's discuss how our {service.shortTitle} services can grow your brand.</p>
          </div>
          <Link href="/contact" className="btn-primary" style={{ backgroundColor: '#b30000' }}>REQUEST A QUOTE →</Link>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="service-nav-section container">
        <div className="service-nav">
          {prevService ? (
            <Link href={`/services/${prevService.slug}`} className="service-nav-link prev">
              <span className="service-nav-label">← PREVIOUS</span>
              <span className="service-nav-title">{prevService.shortTitle}</span>
            </Link>
          ) : <div></div>}
          {nextService ? (
            <Link href={`/services/${nextService.slug}`} className="service-nav-link next">
              <span className="service-nav-label">NEXT →</span>
              <span className="service-nav-title">{nextService.shortTitle}</span>
            </Link>
          ) : <div></div>}
        </div>
      </section>
    </div>
  );
}
