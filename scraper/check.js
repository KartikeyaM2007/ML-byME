const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  
  console.log("Navigating to login page...");
  await page.goto('https://www.tensortonic.com/login', { waitUntil: 'networkidle2' });
  
  console.log("Please log in. Waiting for URL to change...");
  while (page.url().includes('login') || page.url().includes('signup')) {
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log("Logged in! Navigating to a problem page to analyze...");
  await page.goto('https://www.tensortonic.com/problems/policy-gradient-loss', { waitUntil: 'networkidle2' });
  
  // Wait a bit for React to render
  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.content();
  fs.writeFileSync('page_dump.html', html);
  
  console.log("Dumped HTML to page_dump.html. Closing browser...");
  await browser.close();
})();
