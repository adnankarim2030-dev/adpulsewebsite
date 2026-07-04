import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

async function testResend(apiKey, fromEmail, toEmail, subject, text, html) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `"AdPulse Diagnostics" <${fromEmail}>`,
      to: toEmail,
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API failed: ${response.status} ${errorText}`);
  }

  return await response.json();
}

async function testBrevo(apiKey, fromEmail, toEmail, subject, text, html) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'AdPulse Diagnostics', email: fromEmail },
      to: [{ email: toEmail }],
      subject: subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo API failed: ${response.status} ${errorText}`);
  }

  return await response.json();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const testRecipient = searchParams.get('to') || 'info@adpulse.pk';

  const user = process.env.SMTP_USER || 'info@adpulse.pk';
  const resendKey = process.env.RESEND_API_KEY;
  const brevoKey = process.env.BREVO_API_KEY;

  const testSubject = 'AdPulse API Diagnostic Test';
  const testText = `This is a test email sent from the AdPulse website diagnostic tool.`;
  const testHtml = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2>AdPulse Diagnostic Test</h2>
      <p>This is a test email sent from the AdPulse website diagnostic tool.</p>
      <hr />
      <ul>
        <li><strong>Time:</strong> ${new Date().toISOString()}</li>
        <li><strong>Sender:</strong> ${user}</li>
        <li><strong>Recipient:</strong> ${testRecipient}</li>
      </ul>
    </div>
  `;

  // Test Resend API
  if (resendKey) {
    try {
      const data = await testResend(resendKey, user, testRecipient, testSubject, testText, testHtml);
      return NextResponse.json({
        success: true,
        method: 'Resend HTTP API',
        send: data,
        config: {
          user,
          hasResendKey: true,
          resendKeyLength: resendKey.length,
        }
      });
    } catch (err) {
      return NextResponse.json({
        success: false,
        method: 'Resend HTTP API',
        error: {
          message: err.message,
          stack: err.stack,
        },
        config: {
          user,
          hasResendKey: true,
        }
      }, { status: 500 });
    }
  }

  // Test Brevo API
  if (brevoKey) {
    try {
      const data = await testBrevo(brevoKey, user, testRecipient, testSubject, testText, testHtml);
      return NextResponse.json({
        success: true,
        method: 'Brevo HTTP API',
        send: data,
        config: {
          user,
          hasBrevoKey: true,
          brevoKeyLength: brevoKey.length,
        }
      });
    } catch (err) {
      return NextResponse.json({
        success: false,
        method: 'Brevo HTTP API',
        error: {
          message: err.message,
          stack: err.stack,
        },
        config: {
          user,
          hasBrevoKey: true,
        }
      }, { status: 500 });
    }
  }

  // Test SMTP Fallback
  const host = process.env.SMTP_HOST || 'mail.adpulse.pk';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const pass = process.env.SMTP_PASSWORD;

  const configSummary = {
    host,
    port,
    secure,
    user,
    hasPassword: !!pass,
    passwordLength: pass ? pass.length : 0,
    hasResendKey: false,
    hasBrevoKey: false,
  };

  if (!pass) {
    return NextResponse.json({
      success: false,
      message: 'SMTP_PASSWORD environment variable is missing or empty.',
      config: configSummary
    }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });

  // Test Connection
  let verifyResult;
  try {
    verifyResult = await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
        } else {
          resolve('SMTP server is ready to take messages');
        }
      });
    });
  } catch (verifyError) {
    return NextResponse.json({
      success: false,
      step: 'verify',
      error: {
        message: verifyError.message,
        code: verifyError.code,
        command: verifyError.command,
        stack: verifyError.stack,
      },
      config: configSummary
    }, { status: 500 });
  }

  // Send SMTP test mail
  try {
    const info = await transporter.sendMail({
      from: `"AdPulse Diagnostics" <${user}>`,
      to: testRecipient,
      subject: 'AdPulse SMTP Diagnostic Test',
      text: testText,
      html: testHtml,
    });

    return NextResponse.json({
      success: true,
      method: 'Nodemailer SMTP Fallback',
      verify: verifyResult,
      send: {
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected
      },
      config: configSummary
    });
  } catch (sendError) {
    return NextResponse.json({
      success: false,
      method: 'Nodemailer SMTP Fallback',
      step: 'send',
      error: {
        message: sendError.message,
        code: sendError.code,
        command: sendError.command,
        stack: sendError.stack,
      },
      config: configSummary
    }, { status: 500 });
  }
}
