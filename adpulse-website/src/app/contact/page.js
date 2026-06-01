'use client';

import { useState } from 'react';
import './contact.css';
import { submitLead } from '@/actions/submitLead';

export default function ContactPage() {
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  async function handleSubmit(formData) {
    setStatus('loading');
    const result = await submitLead(formData);
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>LET'S TALK</h1>
          <p>Ready to accelerate your brand's growth? Reach out to us today.</p>
        </div>
      </div>

      <section className="container section-padding contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>GET IN TOUCH</h2>
            <p>Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3>Office Location</h3>
                <p>Office #213, 2nd Floor, Pak Tower<br/>Block 5 Clifton, Karachi</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📞</div>
                <h3>Let's Stay in Touch</h3>
                <p>+92 3008463041<br/>www.adpulse.pk</p>
              </div>
              <div className="info-card">
                <div className="info-icon">✉️</div>
                <h3>Email</h3>
                <p>info@adpulse.pk</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>SEND US A MESSAGE</h3>
            
            {status === 'success' ? (
              <div className="success-message">
                <h4>Thank you!</h4>
                <p>Your message has been received. We will get back to you shortly.</p>
              </div>
            ) : (
              <form action={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required placeholder="John Doe" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required placeholder="john@example.com" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" name="service">
                    <option value="">Select a service...</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="ads">Paid Advertising</option>
                    <option value="branding">Branding & Design</option>
                    <option value="video">Video Production</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" required rows="5" placeholder="Tell us about your project..."></textarea>
                </div>
                
                <button type="submit" className="btn-primary form-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE →'}
                </button>
                
                {status === 'error' && (
                  <p className="error-message">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
