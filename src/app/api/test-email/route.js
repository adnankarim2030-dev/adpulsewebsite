import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  const host = process.env.SMTP_HOST || 'mail.adpulse.pk';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'info@adpulse.pk';
  const pass = process.env.SMTP_PASSWORD;

  const debugInfo = {
    configuredHost: host,
    configuredPort: port,
    configuredSecure: secure,
    configuredUser: user,
    hasPassword: !!pass,
    passwordLength: pass ? pass.length : 0,
  };

  if (!pass) {
    return NextResponse.json({
      success: false,
      error: 'SMTP_PASSWORD is not configured in cPanel environment variables.',
      debugInfo
    }, { status: 400 });
  }

  // Set up Nodemailer with full logging enabled
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    },
    debug: true,
    logger: true
  });

  try {
    // Verify connection configuration
    console.log('Testing SMTP connection...');
    await transporter.verify();
    
    // Attempt to send a test email
    const info = await transporter.sendMail({
      from: `"AdPulse Test" <${user}>`,
      to: 'adnankarim2030@gmail.com', // Test recipient
      subject: 'AdPulse System Email Diagnostic Test',
      text: 'If you receive this, your website SMTP relay is working perfectly.',
      html: '<p>If you receive this, your website SMTP relay is working perfectly.</p>'
    });

    return NextResponse.json({
      success: true,
      message: 'SMTP connection verified and test email sent successfully!',
      messageId: info.messageId,
      response: info.response,
      debugInfo
    });
  } catch (error) {
    console.error('SMTP Diagnostic Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown SMTP error',
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      stack: error.stack,
      debugInfo
    }, { status: 500 });
  }
}
