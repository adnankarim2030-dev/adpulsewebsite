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
          {[
            { name: "Young's Food", sector: "FMCG Campaign", logo: "youngsfood.com", desc: "Engaging digital content and recipe series designed to build community." },
            { name: "Chase Up", sector: "Retail Marketing", logo: "chaseup.com.pk", desc: "Targeted seasonal promotional campaigns that resulted in record-breaking sales." },
            { name: "MTJ (Tariq Jamil)", sector: "Fashion & Apparel", logo: "mtjonline.com", desc: "High-end fashion shoot and video production for seasonal launch." },
            { name: "GFS Builders", sector: "Real Estate & TVC", logo: "gfsbuilders.com.pk", desc: "Extensive real estate marketing, including TVC production and 3D visualization." },
            { name: "Diners", sector: "Apparel Marketing", logo: "diners.com.pk", desc: "Premium menswear catalog shoots and targeted performance marketing." },
            { name: "Oxford", sector: "E-commerce", logo: "oxford.com.pk", desc: "E-commerce optimization and paid social scaling to increase transactions." },
            { name: "Suzuki Pakistan", sector: "Automotive", logo: "suzukipakistan.com", desc: "Dynamic product launch campaigns and interactive digital ads for new vehicle models." },
            { name: "Toyota Indus", sector: "Automotive", logo: "toyota-indus.com", desc: "Full-scale media planning and buying for flagship vehicle promotions." },
            { name: "BMW Dewan Motors", sector: "Luxury Automotive", logo: "dewanmotors.com.pk", desc: "Premium brand positioning and elite customer engagement events." },
            { name: "Abbott", sector: "Healthcare", logo: "abbott.com.pk", desc: "Educational healthcare campaigns reaching millions of families across Pakistan." },
            { name: "HMR Waterfront", sector: "Luxury Real Estate", logo: "hmrwaterfront.com", desc: "Exclusive launch event and premium digital branding for waterfront living." },
            { name: "Sumsum Group", sector: "Builders & Developers", logo: "sumsumgroup.com", desc: "Comprehensive brand identity and property showcase campaigns." },
            { name: "Falaknaz Group", sector: "Real Estate", logo: "falaknazgroup.com", desc: "Nationwide OOH advertising and aggressive digital lead generation." },
            { name: "Siddiqsons", sector: "Corporate Branding", logo: "siddiqsons.com", desc: "Corporate documentary and B2B communication strategy." },
            { name: "Saima Waterfront", sector: "Real Estate", logo: "saimawaterfront.com", desc: "High-impact social media coverage and immersive virtual tours." },
            { name: "Greenwich University", sector: "Education", logo: "greenwich.edu.pk", desc: "Student enrollment campaigns through targeted digital and print media." },
            { name: "SBBDU", sector: "Higher Education", logo: "sbbwu.edu.pk", desc: "Academic excellence promotion and extensive PR management." },
            { name: "Igloo", sector: "Ice Cream & Dairy", logo: "igloo.com.pk", desc: "Vibrant summer campaigns and engaging influencer activations." },
            { name: "Suaad", sector: "Women's Apparel", logo: "suaad.pk", desc: "Visually stunning catalog designs and high-ROAS social media ads." },
            { name: "Sindh Police", sector: "Public Service", logo: "sindhpolice.gov.pk", desc: "Public awareness campaigns and official communication strategy design." }
          ].map((project, idx) => (
            <div className="portfolio-item" key={idx}>
              <div className="portfolio-img">
                <div className="portfolio-logo-frame">
                  <img src={`https://logo.clearbit.com/${project.logo}`} alt={project.name} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<h3 style='color:var(--color-primary);font-size:1.5rem;font-weight:900;'>${project.name}</h3>`; }} />
                </div>
              </div>
              <div className="portfolio-content">
                <span className="tag">{project.sector}</span>
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
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
