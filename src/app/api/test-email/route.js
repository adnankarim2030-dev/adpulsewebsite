import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const testRecipient = searchParams.get('to') || 'info@adpulse.pk';

  const host = process.env.SMTP_HOST || 'mail.adpulse.pk';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'info@adpulse.pk';
  const pass = process.env.SMTP_PASSWORD;

  const configSummary = {
    host,
    port,
    secure,
    user,
    hasPassword: !!pass,
    passwordLength: pass ? pass.length : 0,
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
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Test 1: Verify Connection
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

  // Test 2: Send Test Mail
  try {
    const info = await transporter.sendMail({
      from: `"AdPulse Diagnostics" <${user}>`,
      to: testRecipient,
      subject: 'AdPulse SMTP Diagnostic Test',
      text: `This is a test email sent from the AdPulse website diagnostic tool.\n\nTime: ${new Date().toISOString()}\nHost: ${host}\nPort: ${port}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2>AdPulse SMTP Diagnostic Test</h2>
          <p>This is a test email sent from the AdPulse website diagnostic tool.</p>
          <hr />
          <ul>
            <li><strong>Time:</strong> ${new Date().toISOString()}</li>
            <li><strong>SMTP Host:</strong> ${host}</li>
            <li><strong>SMTP Port:</strong> ${port}</li>
            <li><strong>Secure:</strong> ${secure.toString()}</li>
            <li><strong>User:</strong> ${user}</li>
          </ul>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
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
