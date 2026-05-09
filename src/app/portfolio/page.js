import Link from 'next/link';
import './portfolio.css';

export default function PortfolioPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>OUR WORK</h1>
          <p>Explore our latest projects and see how we've helped brands grow.</p>
        </div>
      </div>

      <section className="container section-padding">
        <div className="portfolio-grid">
          {/* Project 1 */}
          <div className="portfolio-item">
            <div className="portfolio-img">
              <img src="/images/portfolio/fitfuel.png" alt="FitFuel Campaign" />
            </div>
            <div className="portfolio-content">
              <span className="tag">Social Media</span>
              <h3>FitFuel Campaign</h3>
              <p>A comprehensive social media strategy that increased engagement by 300% and drove a 50% increase in online sales within 3 months.</p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="portfolio-item">
            <div className="portfolio-img">
              <img src="/images/portfolio/burgerhouse.png" alt="Burger House ROAS" />
            </div>
            <div className="portfolio-content">
              <span className="tag">Paid Ads</span>
              <h3>Burger House ROAS</h3>
              <p>Targeted local ad campaigns that brought foot traffic to 5 new locations, achieving a 4.5x Return on Ad Spend (ROAS).</p>
            </div>
          </div>

          {/* Project 3 */}
          <div className="portfolio-item">
            <div className="portfolio-img">
              <img src="/images/portfolio/urbanpeaks.png" alt="Urban Peaks Identity" />
            </div>
            <div className="portfolio-content">
              <span className="tag">Branding</span>
              <h3>Urban Peaks Identity</h3>
              <p>Complete brand overhaul for a luxury real estate developer, including logo, website UI, and marketing collateral.</p>
            </div>
          </div>

          {/* Project 4 */}
          <div className="portfolio-item">
            <div className="portfolio-img">
              <img src="/images/portfolio/technova.png" alt="TechNova Launch" />
            </div>
            <div className="portfolio-content">
              <span className="tag">Video Production</span>
              <h3>TechNova Launch</h3>
              <p>Produced a high-energy product launch video that garnered over 1 million views across YouTube and LinkedIn in the first week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-gradient-red" style={{marginTop: 0}}>
        <div className="container cta-inner">
           <div className="cta-content">
             <h2>READY TO BE OUR NEXT SUCCESS STORY?</h2>
             <p>Let's discuss how we can achieve similar results for your brand.</p>
           </div>
           <Link href="/contact" className="btn-primary" style={{backgroundColor: '#b30000'}}>START A PROJECT →</Link>
        </div>
      </section>
    </div>
  );
}
