import nodemailer from 'nodemailer';

async function sendViaResend(apiKey, fromName, fromEmail, toEmail, subject, html) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.id;
}

async function sendViaBrevo(apiKey, fromName, fromEmail, toEmail, subject, html) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: fromName, email: fromEmail },
      to: [{ email: toEmail }],
      subject: subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.messageId;
}

export async function sendLeadEmails(lead) {
  const user = process.env.SMTP_USER || 'info@adpulse.pk';
  const resendKey = process.env.RESEND_API_KEY;
  const brevoKey = process.env.BREVO_API_KEY;

  // Render HTML templates
  const customerHtml = `
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
  `;

  const adminHtml = `
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
  `;

  const customerSubject = 'Thank you for contacting AdPulse Media Agency';
  const adminSubject = `New Lead Received: ${lead.name} - ${lead.service || 'General Inquiry'}`;

  let senderSuccess = false;
  let adminSuccess = false;

  // Option A: Send via Resend API if key is present
  if (resendKey) {
    console.log('Sending emails using Resend HTTP API...');
    try {
      const customerMsgId = await sendViaResend(resendKey, 'AdPulse Media Agency', user, lead.email, customerSubject, customerHtml);
      console.log('Customer confirmation email sent successfully via Resend:', customerMsgId);
      senderSuccess = true;
    } catch (err) {
      console.error('Failed to send customer email via Resend API:', err.message);
    }

    try {
      const adminMsgId = await sendViaResend(resendKey, 'AdPulse Website', user, 'info@adpulse.pk', adminSubject, adminHtml);
      console.log('Admin notification email sent successfully via Resend:', adminMsgId);
      adminSuccess = true;
    } catch (err) {
      console.error('Failed to send admin email via Resend API:', err.message);
    }

    return senderSuccess || adminSuccess;
  }

  // Option B: Send via Brevo API if key is present
  if (brevoKey) {
    console.log('Sending emails using Brevo HTTP API...');
    try {
      const customerMsgId = await sendViaBrevo(brevoKey, 'AdPulse Media Agency', user, lead.email, customerSubject, customerHtml);
      console.log('Customer confirmation email sent successfully via Brevo:', customerMsgId);
      senderSuccess = true;
    } catch (err) {
      console.error('Failed to send customer email via Brevo API:', err.message);
    }

    try {
      const adminMsgId = await sendViaBrevo(brevoKey, 'AdPulse Website', user, 'info@adpulse.pk', adminSubject, adminHtml);
      console.log('Admin notification email sent successfully via Brevo:', adminMsgId);
      adminSuccess = true;
    } catch (err) {
      console.error('Failed to send admin email via Brevo API:', err.message);
    }

    return senderSuccess || adminSuccess;
  }

  // Option C: Fallback to standard Nodemailer SMTP
  console.log('API keys not configured. Falling back to Nodemailer SMTP...');
  const host = process.env.SMTP_HOST || 'mail.adpulse.pk';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const pass = process.env.SMTP_PASSWORD;

  if (!pass) {
    console.warn('SMTP password (SMTP_PASSWORD) is not configured. Skipping email sending. Lead:', lead);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });

  try {
    const info = await transporter.sendMail({
      from: `"AdPulse Media Agency" <${user}>`,
      to: lead.email,
      subject: customerSubject,
      html: customerHtml,
    });
    console.log('Customer confirmation email sent successfully via SMTP:', info.messageId);
    senderSuccess = true;
  } catch (err) {
    console.error('Failed to send customer confirmation email via SMTP:', err.message);
  }

  try {
    const info = await transporter.sendMail({
      from: `"AdPulse Website" <${user}>`,
      to: 'info@adpulse.pk',
      subject: adminSubject,
      html: adminHtml,
    });
    console.log('Admin notification email sent successfully via SMTP:', info.messageId);
    adminSuccess = true;
  } catch (err) {
    console.error('Failed to send admin notification email via SMTP:', err.message);
  }

  return senderSuccess || adminSuccess;
}
