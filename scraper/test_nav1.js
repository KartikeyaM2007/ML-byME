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

    console.log('Navigating to problem 1...');
    await targetPage.goto('https://www.deep-ml.com/problems/1', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('Evaluating DOM...');
    const domData = await targetPage.evaluate(() => {
        let titleEl = document.querySelector('h1');
        return {
            url: window.location.href,
            title: titleEl ? titleEl.textContent : 'No h1'
        };
    });
    
    console.log('Data:', domData);

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
