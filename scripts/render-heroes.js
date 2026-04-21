const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const TEMPLATES_DIR = path.join(__dirname, 'hero-templates');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'days');

async function renderHero(browser, htmlFile, outputFile, width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  
  const htmlPath = path.join(TEMPLATES_DIR, htmlFile);
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  // Screenshot the .hero or .og element
  const el = await page.$('.hero, .og');
  if (el) {
    await el.screenshot({ path: outputFile, type: 'jpeg', quality: 90 });
    console.log(`✓ ${outputFile}`);
  } else {
    console.log(`✗ No .hero/.og element found in ${htmlFile}`);
  }
  await page.close();
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Hero images (800x800)
  const heroes = [
    { html: 'day1.html', out: path.join(OUTPUT_DIR, 'day1-hero.jpg') },
    { html: 'day2.html', out: path.join(OUTPUT_DIR, 'day2', 'day2-hero.jpg') },
    { html: 'day3.html', out: path.join(OUTPUT_DIR, 'day3', 'day3-hero.jpg') },
    { html: 'day4.html', out: path.join(OUTPUT_DIR, 'day4', 'day4-hero.jpg') },
    { html: 'day5.html', out: path.join(OUTPUT_DIR, 'day5', 'day5-hero.jpg') },
    { html: 'day6.html', out: path.join(OUTPUT_DIR, 'day6', 'day6-hero.jpg') },
    { html: 'day7.html', out: path.join(OUTPUT_DIR, 'day7', 'day7-hero.jpg') },
  ];

  for (const h of heroes) {
    // Ensure output dir exists
    const dir = path.dirname(h.out);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await renderHero(browser, h.html, h.out, 800, 800);
  }

  // OG image (1200x630)
  const ogOut = path.join(__dirname, '..', 'public', 'og-image.png');
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  const ogPath = path.join(TEMPLATES_DIR, 'og-image.html');
  await page.goto(`file://${ogPath}`, { waitUntil: 'networkidle0' });
  const el = await page.$('.og');
  if (el) {
    await el.screenshot({ path: ogOut, type: 'png' });
    console.log(`✓ ${ogOut}`);
  }
  await page.close();

  await browser.close();
  console.log('\nDone! All hero images rendered.');
}

main().catch(e => { console.error(e); process.exit(1); });
