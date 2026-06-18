const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1200 });

  console.log('Navigating...');
  try {
    await page.goto('https://www.facebook.com/adpulse.pk', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Page loaded. Waiting 10 seconds...');
    await page.waitForTimeout(10000);
    
    // Save screenshot
    const screenshotPath = path.join(__dirname, 'fb_screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log('Screenshot saved to:', screenshotPath);
  } catch (err) {
    console.error('Error:', err.message);
  }

  await browser.close();
})();
