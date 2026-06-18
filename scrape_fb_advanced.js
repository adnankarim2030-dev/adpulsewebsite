const { chromium } = require('playwright');
const fs = require('fs');
const https = require('https');
const path = require('path');

const BRANDS = [
  { name: 'diners', keywords: ['diners'] },
  { name: 'imtiaz', keywords: ['imtiaz'] },
  { name: 'chase', keywords: ['chase', 'chaseup', 'chase value'] },
  { name: 'bmw', keywords: ['bmw', 'dewan'] },
  { name: 'gfs', keywords: ['gfs'] },
  { name: 'youngs', keywords: ['youngs', 'young\'s'] },
  { name: 'sahar', keywords: ['sahar'] },
  { name: 'sumsum', keywords: ['sumsum'] },
  { name: 'kifayah', keywords: ['kifayah'] }
];

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1280, height: 1600 });
  
  console.log('Navigating to AdPulse Facebook page...');
  try {
    // Use domcontentloaded to avoid waiting for heavy third-party assets and trackers
    await page.goto('https://www.facebook.com/adpulse.pk', { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    console.log('Page loaded (DOM Content Loaded). Waiting 8 seconds for dynamic layout...');
    await page.waitForTimeout(8000);
  } catch (err) {
    console.warn('Navigation warning/error:', err.message);
    // Continue anyway if the DOM has loaded some content
  }
  
  try {
    const closeBtn = await page.$('[aria-label="Close"]');
    if (closeBtn) {
      await closeBtn.click();
      console.log('Closed Facebook login modal.');
      await page.waitForTimeout(1000);
    }
  } catch(e) {}

  console.log('Scrolling down to load posts...');
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, 1200));
    await page.waitForTimeout(3000);
  }

  console.log('Extracting posts and image associations...');
  const postsData = await page.evaluate(() => {
    function getPostTextAndImage(img) {
      let current = img.parentElement;
      let depth = 0;
      let textContent = '';
      
      while (current && depth < 12) {
        const textDivs = current.querySelectorAll('div[dir="auto"], span[dir="auto"]');
        if (textDivs.length > 0) {
          textContent = Array.from(textDivs).map(el => el.textContent).join(' ');
          if (textContent.trim().length > 20) {
            break;
          }
        }
        current = current.parentElement;
        depth++;
      }
      return textContent;
    }

    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .map(img => {
        const src = img.src;
        if (!src || !src.includes('scontent') || src.includes('emoji')) return null;
        
        // Ensure image is large enough
        if (img.naturalWidth < 180 || img.naturalHeight < 180) {
          if (img.width < 180 || img.height < 180) return null;
        }
        
        const postText = getPostTextAndImage(img);
        return { src, postText };
      })
      .filter(x => x !== null);
  });

  console.log(`Found ${postsData.length} candidate images.`);

  const dir = path.join(__dirname, 'public', 'images', 'services', 'outdoor-gallery');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const brandCounts = {};
  BRANDS.forEach(b => brandCounts[b.name] = 0);
  brandCounts['general'] = 0;

  const downloaded = [];

  for (const item of postsData) {
    const textLower = item.postText.toLowerCase();
    
    let matchedBrand = null;
    for (const brand of BRANDS) {
      if (brand.keywords.some(keyword => textLower.includes(keyword))) {
        matchedBrand = brand.name;
        break;
      }
    }
    
    if (!matchedBrand) {
      if (textLower.includes('ooh') || textLower.includes('billboard') || textLower.includes('outdoor') || textLower.includes('campaign')) {
        matchedBrand = 'general';
      }
    }

    if (matchedBrand) {
      // Limit to 3 images per brand
      brandCounts[matchedBrand] = (brandCounts[matchedBrand] || 0) + 1;
      if (brandCounts[matchedBrand] > 3) continue;

      const filename = `${matchedBrand}_ooh_${brandCounts[matchedBrand]}.jpg`;
      const filePath = path.join(dir, filename);
      
      console.log(`Matching: ${filename} -> Text: "${item.postText.substring(0, 70).replace(/\n/g, ' ')}..."`);
      
      await new Promise((resolve) => {
        https.get(item.src, (res) => {
          if (res.statusCode === 200) {
            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              downloaded.push(filename);
              resolve();
            });
          } else {
            resolve();
          }
        }).on('error', () => resolve());
      });
    }
  }

  console.log(`Downloaded ${downloaded.length} brand-wise images:`, downloaded.join(', '));
  await browser.close();
})();
