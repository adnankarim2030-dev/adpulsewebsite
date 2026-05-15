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
            { name: "Young's Food", sector: "FMCG Campaign", logo: "youngsfood.com", youtubeId: "ntIAakOpHr4", desc: "Engaging digital content and recipe series designed to build community." },
            { name: "Chase Up", sector: "Retail Marketing", logo: "chaseup.com.pk", youtubeId: "68bC80ZdzfY", desc: "Targeted seasonal promotional campaigns that resulted in record-breaking sales." },
            { name: "BMW Dewan Motors", sector: "Luxury Automotive", logo: "dewanmotors.com.pk", youtubeId: "MDNJxzXePoM", desc: "Premium brand positioning and elite customer engagement events." },
            { name: "GFS Builders", sector: "Real Estate & TVC", logo: "gfsbuilders.com.pk", youtubeId: "WoAeLUmc3xo", desc: "Extensive real estate marketing, including TVC production and 3D visualization." },
            { name: "Diners", sector: "Apparel Marketing", logo: "diners.com.pk", youtubeId: "eWxt66xPk-U", desc: "Premium menswear catalog shoots and targeted performance marketing." },
            { name: "Oxford", sector: "E-commerce", logo: "oxford.com.pk", youtubeId: "fV97GrCtuYc", desc: "E-commerce optimization and paid social scaling to increase transactions." },
            { name: "Imtiaz Super Market", sector: "Retail Giant", logo: "imtiaz.com.pk", youtubeId: "4nAkivqPt1U", desc: "Mega-store launch event management and widespread OOH advertising." },
            { name: "Sunridge", sector: "Food & Agriculture", logo: "sunridgefoods.com", youtubeId: "6_x2Gy7m0Zk", desc: "Nationwide health awareness campaigns and premium packaging rollout." },
            { name: "Sumsum Group", sector: "Builders & Developers", logo: "sumsumgroup.com", youtubeId: "ZPCBua_tSz8", desc: "Comprehensive brand identity and property showcase campaigns." },
            { name: "HMR Waterfront", sector: "Luxury Real Estate", logo: "hmrwaterfront.com", youtubeId: "R1Xg_HQ7hUc", desc: "Exclusive launch event and premium digital branding for waterfront living." },
            { name: "Honda Motorcycles", sector: "Automotive", logo: "atlashonda.com.pk", youtubeId: "In2AcIr-jMY", desc: "Dynamic product launch campaigns and interactive digital ads for new models." },
            { name: "Sindh Police", sector: "Public Service", logo: "sindhpolice.gov.pk", youtubeId: "d2T9vqyqngQ", desc: "Public awareness campaigns and official communication strategy design." }
          ].map((project, idx) => (
            <div className="portfolio-item" key={idx}>
              <div className="portfolio-img">
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
