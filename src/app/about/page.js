import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './about.css';

export const metadata = {
  title: "About Us | AdPulse Media Agency",
  description: "Learn about AdPulse IMC, a premier 360 media agency in Karachi. Meet our leadership, including CEO Khurram Jaffrani, and explore our APNS & PBA accredited marketing services.",
  keywords: "adpulse team, khurram jaffrani, apns accredited agency, pba member agency karachi, about adpulse",
  openGraph: {
    title: "About Us | AdPulse Media Agency",
    description: "Learn about AdPulse IMC, a premier 360 media agency in Karachi. Meet our leadership and explore our accredited marketing services.",
    url: "https://adpulse.pk/about",
    type: "website",
  }
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Noel Francis",
      role: "Business Director",
      experience: "20 Years +",
      expertise: "TVC Production, Event Management, Business Development",
      image: "/images/about/Noel Francis.png"
    },
    {
      name: "Shoaib Jaffrani",
      role: "Head Of Client Service",
      experience: "5 Years +",
      expertise: "Brand Management, Budgeting, Operations, Vendor Management",
      image: "/images/about/Shoaib Jaffrani.png"
    },
    {
      name: "Naeem Ahmed",
      role: "Head Of Media Buying & Planning",
      experience: "23 Years +",
      expertise: "Media Buying & Planning",
      image: "/images/about/Naeem Ahmed.png"
    },
    {
      name: "Kashif Aghani",
      role: "Manager Business Development",
      experience: "20 Years +",
      expertise: "Client Management, Programs Execution, CRM",
      image: "/images/about/Kashif Aghani.png"
    },
    {
      name: "Syeda Musfira",
      role: "Client Service & Operations Executive",
      experience: "4 Years +",
      expertise: "Client Relations Management, Operations Coordination, BTL Activations",
      image: "/images/about/Syeda Musfira.png"
    },
    {
      name: "Syed Abeel Ahmed",
      role: "Creative Manager",
      experience: "7 Years +",
      expertise: "Branding, Conceptualization, Lay outing, Animation, Corporate Communications",
      image: "/images/about/Syed Abeel Ahmed.png"
    },
    {
      name: "Adnan Karim",
      role: "Digital Marketing Manager",
      experience: "15 Years +",
      expertise: "Digital Marketing, Social Media, E-Commerce, AI Creative Ads",
      image: "/images/about/Adnan Karim.png"
    }
  ];

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
              <img src="/images/about/CEO.jpg" alt="Khurram Jaffrani - CEO" />
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

      {/* Chairman's Message */}
      <section className="founder-section section-padding" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="founder-grid">
            <div className="founder-image">
              <img src="/images/about/Faisal Mubin Ganatra.jpg" alt="Faisal Mubin Ganatra - Chairman" />
            </div>
            <div className="founder-content">
              <span className="subtitle">A MESSAGE FROM OUR CHAIRMAN</span>
              <h2>CHAIRMAN'S MESSAGE</h2>
              <p>Faisal Mubin Ganatra is a seasoned business leader, entrepreneur, and fellow member of the Institute of Chartered Accountants of Pakistan (ICAP). With over two decades of corporate leadership as CEO, COO, and CFO in multinational and leading national organizations—including Shan Foods, PepsiCo, and AES Thermal Power—he brings unparalleled strategic vision to AdPulse IMC.</p>
              <p>We believe in establishing long-term business partnerships built on the core values of integrity, trust, and exceptional service. By marrying creative marketing concepts with solid business economics, we help brands not only reach their audiences but generate sustainable commercial success.</p>
              <p>
                Our mission is to translate creative ideas into real market results. We are proud of our dedicated team of professionals who strive daily to exceed client expectations. Thank you for your continued trust in AdPulse IMC.
              </p>
              <br/>
              <p>Best Regards,</p>
              <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem', textTransform: 'uppercase'}}>CHAIRMAN</h4>
              <h4 style={{marginBottom: 0, textTransform: 'uppercase'}}>FAISAL MUBIN GANATRA</h4>
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
          <div className="vm-image-col">
            <img src="/images/about/about_billboard.jpg" alt="AdPulse Billboard" />
          </div>
          <div className="vm-text-col">
            <div className="vm-section">
              <span className="vm-badge">Vision</span>
              <p>To become Pakistan's most trusted and innovative integrated media and marketing agency, empowering brands through creative excellence, strategic communication, and impactful 360° marketing solutions.</p>
            </div>
            
            <div className="vm-section">
              <span className="vm-badge">Mission</span>
              <p>Our mission is to deliver innovative, result-oriented, and integrated marketing solutions that help brands grow, engage, and connect with their audiences effectively. Through creativity, technology, market insight, and ethical business practices, we provide end-to-end services across <strong>Out-of-Home (OOH), Print Media, Electronic Media, Digital Media, Creative production, and event management.</strong></p>
            </div>
            
            <div className="vm-commitment">
              <h4>We are committed to:</h4>
              <ul className="vm-commit-list">
                <li>Creating impactful campaigns that drive measurable business results</li>
                <li>Delivering seamless 360° marketing solutions under one roof</li>
                <li>Building long-term partnerships through trust, integrity, and professionalism</li>
                <li>Continuously evolving with industry trends and emerging technologies</li>
                <li>Fostering a culture of creativity, collaboration, and excellence within our team</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-section section-padding" id="team" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="subtitle" style={{ display: 'block', marginBottom: '0.5rem' }}>THE EXPERTS</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-black)', textAlign: 'center' }}>Meet Our Team</h2>
          </div>
          
          <div className="team-marquee">
            <div className="team-marquee-track">
              {/* Set 1 */}
              {teamMembers.map((member, idx) => (
                <div className="team-card" key={`set1-${idx}`}>
                  <div className="team-photo">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-desc">
                    Experience: {member.experience}<br />
                    Expertise: {member.expertise}
                  </p>
                  <span className="team-role">{member.role}</span>
                  <div className="team-socials">
                    <a href="#" className="social-link"><FaFacebookF /></a>
                    <a href="#" className="social-link"><FaInstagram /></a>
                    <a href="#" className="social-link"><FaLinkedinIn /></a>
                    <a href="#" className="social-link"><FaYoutube /></a>
                  </div>
                </div>
              ))}
              
              {/* Set 2 */}
              {teamMembers.map((member, idx) => (
                <div className="team-card" key={`set2-${idx}`}>
                  <div className="team-photo">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-desc">
                    Experience: {member.experience}<br />
                    Expertise: {member.expertise}
                  </p>
                  <span className="team-role">{member.role}</span>
                  <div className="team-socials">
                    <a href="#" className="social-link"><FaFacebookF /></a>
                    <a href="#" className="social-link"><FaInstagram /></a>
                    <a href="#" className="social-link"><FaLinkedinIn /></a>
                    <a href="#" className="social-link"><FaYoutube /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
