const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.facebook.com/adpulse.pk');
  
  // Wait a bit for images to load
  await page.waitForTimeout(5000);
  
  // Try to close login modal if it appears
  try {
    await page.click('[aria-label="Close"]', { timeout: 2000 });
  } catch(e) {}
  
  await page.evaluate(() => window.scrollBy(0, 1500));
  await page.waitForTimeout(3000);
  await page.evaluate(() => window.scrollBy(0, 1500));
  await page.waitForTimeout(3000);

  const imageUrls = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images
      .map(img => img.src)
      .filter(src => src && src.includes('scontent') && !src.includes('emoji'));
  });

  console.log(`Found ${imageUrls.length} images.`);
  
  const uniqueUrls = [...new Set(imageUrls)].slice(0, 10);
  const dir = path.join(__dirname, 'public', 'images', 'portfolio');
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const downloadedImages = [];

  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    const filePath = path.join(dir, `fb_img_${i+1}.jpg`);
    
    await new Promise((resolve) => {
      https.get(url, (res) => {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          downloadedImages.push(`fb_img_${i+1}.jpg`);
          resolve();
        });
      }).on('error', () => resolve());
    });
  }

  console.log("Downloaded images: ", downloadedImages.join(', '));
  await browser.close();
})();
