const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const res = await fetch('http://localhost:9222/json/version');
    const data = await res.json();
    const browser = await puppeteer.connect({
      browserWSEndpoint: data.webSocketDebuggerUrl,
      defaultViewport: null
    });

    const pages = await browser.pages();
    let targetPage = pages.find(p => p.url().includes('deep-ml.com'));
    if (!targetPage) targetPage = pages[0];

    console.log('Navigating to problems page...');
    await targetPage.goto('https://www.deep-ml.com/problems', { waitUntil: 'networkidle2' });
    
    // Wait an extra 3 seconds for React to mount and fetch data
    await new Promise(r => setTimeout(r, 3000));

    const html = await targetPage.content();
    fs.writeFileSync('scraper/deep_ml_problems.html', html);
    console.log('Saved to deep_ml_problems.html');

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
