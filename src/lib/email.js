import nodemailer from 'nodemailer';

export async function sendLeadEmails(lead) {
  const host = process.env.SMTP_HOST || 'mail.adpulse.pk';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false'; // default to true (SSL) for port 465
  const user = process.env.SMTP_USER || 'info@adpulse.pk';
  const pass = process.env.SMTP_PASSWORD;

  if (!pass) {
    console.warn('SMTP password (SMTP_PASSWORD) is not configured in environment variables. Skipping email sending. Lead details:', lead);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  // 1. Email to the user (sender)
  const senderMailOptions = {
    from: `"AdPulse Media Agency" <${user}>`,
    to: lead.email,
    subject: 'Thank you for contacting AdPulse Media Agency',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #C41E1E; margin: 0;">AdPulse IMC</h1>
        </div>
        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Hello ${lead.name},</h2>
        <p>Thank you for reaching out to <strong>AdPulse Media Agency</strong>. We have received your inquiry and our team is already reviewing it.</p>
        
        <h3 style="color: #666; margin-top: 20px;">Your Message Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${lead.service ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Service:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${lead.service}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Message:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${lead.message}</td></tr>
        </table>
        
        <p style="margin-top: 20px;">One of our representatives will get in touch with you shortly.</p>
        <p>If you have any urgent questions, feel free to contact us at <strong>+92 3008463041</strong> or reply directly to this email.</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0 20px 0;" />
        <p style="font-size: 0.8em; color: #777; text-align: center;">
          <strong>AdPulse IMC (Pvt) Ltd.</strong><br />
          Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi<br />
          <a href="https://www.adpulse.pk" style="color: #C41E1E;">www.adpulse.pk</a>
        </p>
      </div>
    `,
  };

  // 2. Email to info@adpulse.pk (admin)
  const adminMailOptions = {
    from: `"AdPulse Website" <${user}>`,
    to: 'info@adpulse.pk',
    subject: `New Lead Received: ${lead.name} - ${lead.service || 'General Inquiry'}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 5px;">
        <h2 style="color: #C41E1E; border-bottom: 1px solid #C41E1E; padding-bottom: 10px;">New Lead Details</h2>
        <p>A new contact form submission has been received on the AdPulse website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 150px;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${lead.email}">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service Interested</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${lead.service || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
            <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${lead.message}</td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(senderMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
    console.log('Lead emails successfully sent.');
    return true;
  } catch (error) {
    console.error('Error sending lead emails:', error);
    return false;
  }
}
