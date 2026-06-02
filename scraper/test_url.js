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

    // Try /problem/
    console.log('Navigating to /problem/sigmoid-numpy...');
    await targetPage.goto('https://www.deep-ml.com/problem/sigmoid-numpy', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    let title = await targetPage.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? h1.textContent : 'No h1';
    });
    console.log('/problem/ title:', title);

    if (title === 'No h1' || title.includes('404')) {
        // Try /problems/
        console.log('Navigating to /problems/sigmoid-numpy...');
        await targetPage.goto('https://www.deep-ml.com/problems/sigmoid-numpy', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        
        title = await targetPage.evaluate(() => {
            const h1 = document.querySelector('h1');
            return h1 ? h1.textContent : 'No h1';
        });
        console.log('/problems/ title:', title);
    }

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
