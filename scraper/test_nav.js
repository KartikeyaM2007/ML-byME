const puppeteer = require('puppeteer');

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

    console.log('Navigating to /problems/3...');
    await targetPage.goto('https://www.deep-ml.com/problems/3', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    const dataExtracted = await targetPage.evaluate(() => {
        // Looking for the title (which is usually the largest text or specific structure)
        const h1s = Array.from(document.querySelectorAll('h1')); // They might not use h1?
        // Let's just grab the innerText
        return document.body.innerText.substring(0, 1000);
    });
    
    console.log('Content:\\n' + dataExtracted);

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
