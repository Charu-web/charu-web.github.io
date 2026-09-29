const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static server for dist/
const distDir = path.join(__dirname, 'dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(4173, async () => {
  console.log('Static server started at http://localhost:4173');
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // 1. Desktop Test
    console.log('\n--- 1. Testing Desktop View (1440x900) ---');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });

    // Check all project titles
    const projectTitles = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim());
      return titles;
    });
    console.log('Rendered Project Titles in Portfolio:', projectTitles);

    const hasNewYuvaHub = projectTitles.some(t => t.includes('YuvaHub — Naukri Mahotsav 2026'));
    const hasOldYuvaHub = projectTitles.some(t => t === 'YuvaHub');
    const hasPixelArt = projectTitles.some(t => t.includes('Pixel Art'));
    const hasNeonSpace = projectTitles.some(t => t.includes('Neon Space'));

    console.log('✓ YuvaHub — Naukri Mahotsav 2026 present:', hasNewYuvaHub);
    console.log('✓ Original YuvaHub preserved:', hasOldYuvaHub);
    console.log('✓ Existing projects preserved (Pixel Art, Neon Space):', hasPixelArt && hasNeonSpace);

    // Verify links for the new project card
    const cardLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a')).map(a => ({
        href: a.href,
        text: a.innerText.trim(),
        title: a.title,
        ariaLabel: a.getAttribute('aria-label')
      }));
      return links.filter(l => (l.href || '').includes('cozy-sable') || (l.href || '').includes('yuvahub'));
    });
    console.log('YuvaHub Project Links:', cardLinks);

    // Take Desktop Screenshot of Projects Section
    await page.evaluate(() => {
      const el = document.getElementById('projects') || document.getElementById('work');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'portfolio_desktop_projects.png') });
    console.log('Desktop screenshot saved: portfolio_desktop_projects.png');

    // 2. Mobile View Test
    console.log('\n--- 2. Testing Mobile View (375x812) ---');
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
      const el = document.getElementById('projects') || document.getElementById('work');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'portfolio_mobile_projects.png') });
    console.log('Mobile screenshot saved: portfolio_mobile_projects.png');

    await browser.close();
    server.close();
    console.log('\nAll local tests completed successfully!');
  } catch (err) {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  }
});
