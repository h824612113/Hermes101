const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const TEMPLATES_DIR = path.join(__dirname, 'screenshot-templates');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'days', 'day2');

async function render(browser, htmlFile, outputFile, width, height, clipSelector) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  
  const htmlPath = path.join(TEMPLATES_DIR, htmlFile);
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  const el = clipSelector ? await page.$(clipSelector) : null;
  if (el) {
    await el.screenshot({ path: outputFile, type: 'jpeg', quality: 90 });
  } else {
    await page.screenshot({ path: outputFile, type: 'jpeg', quality: 90, fullPage: true });
  }
  console.log(`✓ ${path.basename(outputFile)}`);
  await page.close();
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const jobs = [
    // Server pricing card
    { html: 'hetzner-pricing.html', out: 'hetzner-pricing.jpg', w: 600, h: 500, clip: '.card' },
    // Telegram chat mockups
    { html: 'botfather.html', out: 'botfather.jpg', w: 450, h: 760, clip: '.phone' },
    { html: 'bot-token.html', out: 'bot-token.jpg', w: 580, h: 400, clip: '.card' },
    // Terminal mockups
    { html: 'install-security.html', out: 'install-security.jpg', w: 720, h: 520, clip: '.terminal' },
    { html: 'onboarding-mode.html', out: 'onboarding-mode.jpg', w: 720, h: 500, clip: '.terminal' },
    { html: 'model-provider.html', out: 'model-provider.jpg', w: 720, h: 550, clip: '.terminal' },
    { html: 'select-channel.html', out: 'select-channel.jpg', w: 720, h: 580, clip: '.terminal' },
    { html: 'telegram-allowfrom.html', out: 'telegram-allowfrom.jpg', w: 720, h: 480, clip: '.terminal' },
    { html: 'dashboard-ready.html', out: 'dashboard-ready.jpg', w: 720, h: 520, clip: '.terminal' },
    // First chat phone mockup
    { html: 'first-chat.html', out: 'first-chat.jpg', w: 450, h: 760, clip: '.phone' },
  ];

  for (const j of jobs) {
    const out = path.join(OUTPUT_DIR, j.out);
    await render(browser, j.html, out, j.w, j.h, j.clip);
  }

  await browser.close();
  console.log('\nDone! All screenshots rendered.');
}

main().catch(e => { console.error(e); process.exit(1); });
