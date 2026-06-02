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

    console.log('Navigating to problems page...');
    await targetPage.goto('https://www.deep-ml.com/problems', { waitUntil: 'networkidle2' });

    console.log('Extracting links...');
    const links = await targetPage.evaluate(() => {
      const aTags = Array.from(document.querySelectorAll('a'));
      return aTags.map(a => a.href).filter(href => href.includes('/problem/'));
    });

    console.log('Found problem links:', links.slice(0, 10));

    if (links.length > 0) {
        console.log('Navigating to first problem: ', links[0]);
        await targetPage.goto(links[0], { waitUntil: 'networkidle2' });
        
        const title = await targetPage.evaluate(() => {
            const h1 = document.querySelector('h1');
            return h1 ? h1.textContent : 'No h1';
        });
        console.log('Title:', title);
    }

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
