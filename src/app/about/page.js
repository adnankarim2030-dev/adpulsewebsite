import './about.css';

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>ABOUT US</h1>
          <p>We are the driving force behind digital success stories.</p>
        </div>
      </div>

      <section className="container section-padding">
        <div className="about-grid">
          <div className="about-content">
            <span className="subtitle">WHO WE ARE</span>
            <h2>PREMIER 360 MEDIA AGENCY</h2>
            <p>AdPulse IMC is a premier 360 media agency specializing in advertising and marketing solutions, headquartered in Karachi with a comprehensive nationwide presence.</p>
            <p>We offer expert services in TVC productions, media planning, corporate events, public relations, and high-impact OOH campaigns. As a distinguished member of both the Pakistan Broadcasting Association (PBA) and the All Pakistan Newspapers Society (APNS), we pride ourselves on bridging the gap between visionary creative strategy and seamless, impactful execution.</p>
            
            <div className="about-stats">
              <div className="a-stat">
                <h3>PBA</h3>
                <span>Member</span>
              </div>
              <div className="a-stat">
                <h3>APNS</h3>
                <span>Member</span>
              </div>
              <div className="a-stat">
                <h3>360°</h3>
                <span>Solutions</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/images/about/agency_collage.png" alt="AdPulse Agency" />
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="founder-section bg-gradient-gray section-padding">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-image">
              <img src="/images/about/ceo.png" alt="Khurram Jaffrani - CEO" />
            </div>
            <div className="founder-content">
              <span className="subtitle">A MESSAGE FROM OUR CEO</span>
              <h2>FOUNDER'S VISION</h2>
              <p>AdPulse IMC is a media agency that specializes in building brands. Our agency is powered by a synergy of talented creatives and strategic thinkers who work tirelessly to craft engaging, effective solutions tailored to the evolving needs of our clients.</p>
              <p>We believe that every brand possesses a unique narrative waiting to be told. To do this effectively, we dive deep into the heart of your business and the psyche of your audience. This allows us to develop brand identities and messaging that don't just reach your target market&mdash;they resonate with them, capturing the true essence of your brand.</p>
              <p>
                Our commitment: <strong>Exceptional service and results that Exceed Expectations.</strong><br/>
                We are fueled by a passion for what we do and a steadfast dedication to your success. Thank you for trusting us to be the heartbeat of your brand's journey.
              </p>
              <br/>
              <p>Keep Smiling,</p>
              <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem', textTransform: 'uppercase'}}>CHIEF EXECUTIVE OFFICER</h4>
              <h4 style={{marginBottom: 0, textTransform: 'uppercase'}}>KHURRAM JAFFRANI</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container section-padding">
        <div className="section-header">
          <span className="subtitle">OUR PURPOSE</span>
          <h2>VISION & MISSION</h2>
        </div>
        <div className="vision-mission-grid">
          <div className="vm-card">
            <h3 className="vm-title">Our Vision</h3>
            <p>Our mission is to offer a distinguished marketing service for businesses within the Pakistani market. We believe that knowledge, integrity, and honesty make the core of this distinction. These qualities are manifested through the composition of our team and its culture.</p>
          </div>
          <div className="vm-card">
            <h3 className="vm-title">Our Mission</h3>
            <ul className="vm-list">
              <li>Deliver innovative, result-driven marketing solutions that create real business impact</li>
              <li>Leverage the latest technology and data insights to drive smarter campaigns</li>
              <li>Continuously enhance our knowledge to stay ahead in the evolving market</li>
              <li>Build a strong, ethical, and high-performance corporate culture</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-section bg-gradient-gray section-padding" id="team">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">THE EXPERTS</span>
            <h2>MEET OUR TEAM</h2>
          </div>
          <div className="team-grid">
            
            <div className="team-card">
              <div className="team-photo">
                <img src="/images/team/noel.png" alt="Noel Francis" />
              </div>
              <h3>Noel Francis</h3>
              <span className="team-role">Business Director</span>
              <div className="team-details">
                <p><strong>Experience:</strong> 20 Years +</p>
                <p><strong>Expertise:</strong> TVC Production, Event Management, Business Development</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src="/images/team/shoaib.png" alt="Shoaib Jaffrani" />
              </div>
              <h3>Shoaib Jaffrani</h3>
              <span className="team-role">Head Of Client Service</span>
              <div className="team-details">
                <p><strong>Experience:</strong> 5 Years +</p>
                <p><strong>Expertise:</strong> Operations, Budgeting, Vendor Management</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src="/images/team/naeem.png" alt="Naeem Ahmed" />
              </div>
              <h3>Naeem Ahmed</h3>
              <span className="team-role">Head Of Media Buying & Planning</span>
              <div className="team-details">
                <p><strong>Experience:</strong> 23 Years +</p>
                <p><strong>Expertise:</strong> Media Buying & Planning</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src="/images/team/kashif.png" alt="Kashif Aghani" />
              </div>
              <h3>Kashif Aghani</h3>
              <span className="team-role">Manager Business Development</span>
              <div className="team-details">
                <p><strong>Experience:</strong> 20 Years +</p>
                <p><strong>Expertise:</strong> Client Management, Programs Execution, CRM</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src="/images/team/abeel.png" alt="Syed Abeel Ahmed" />
              </div>
              <h3>Syed Abeel Ahmed</h3>
              <span className="team-role">Creative Manager</span>
              <div className="team-details">
                <p><strong>Experience:</strong> 7 Years +</p>
                <p><strong>Expertise:</strong> Branding Conceptualization, Layouting, Animation, Corporate Communications</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src="/images/team/adnan.png" alt="Adnan Karim" />
              </div>
              <h3>Adnan Karim</h3>
              <span className="team-role">Digital Marketing Manager</span>
              <div className="team-details">
                <p><strong>Experience:</strong> 15 Years +</p>
                <p><strong>Expertise:</strong> Digital Marketing Brand Management, Social Media, BTL Activation, E-Commerce, AI Creative Ads</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
