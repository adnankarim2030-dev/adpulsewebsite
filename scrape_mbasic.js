const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');

(async () => {
  console.log('Launching browser for mbasic...');
  const browser = await chromium.launch({ headless: true });
  
  // Set user agent in context options
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36'
  });
  const page = await context.newPage();
  
  console.log('Navigating to mbasic Facebook page...');
  try {
    await page.goto('https://mbasic.facebook.com/adpulse.pk', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Page loaded. Waiting 5 seconds...');
    await page.waitForTimeout(5000);

    // Let's print some HTML snippets to see if we got posts
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Body Text Snippet (first 500 chars):');
    console.log(bodyText.substring(0, 500));

    // Save screenshot
    const screenshotPath = path.join(__dirname, 'mbasic_screenshot.png');
    await page.screenshot({ path: screenshotPath });
    console.log('Screenshot saved to:', screenshotPath);
  } catch (err) {
    console.error('Error:', err.message);
  }

  await browser.close();
})();
