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

    const links = await targetPage.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map(a => a.href);
    });

    console.log(links);

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
