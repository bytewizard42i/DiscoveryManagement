import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('http://localhost:8080/docs/pitch-deck-week3.html', {
  waitUntil: 'networkidle0',
  timeout: 30000
});

// Hide the navigation overlay before printing
await page.evaluate(() => {
  const nav = document.getElementById('nav');
  if (nav) nav.style.display = 'none';
});

await page.pdf({
  path: '/home/js/utils_AutoDiscovery_legal/docs/pitch-deck-week3.pdf',
  width: '1920px',
  height: '1080px',
  printBackground: true,
  preferCSSPageSize: true
});

console.log('PDF generated: docs/pitch-deck-week3.pdf');
await browser.close();
