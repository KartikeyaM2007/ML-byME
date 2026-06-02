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

    // Click the problem "Matrix-Vector Dot Product"
    console.log('Clicking Matrix-Vector Dot Product...');
    await targetPage.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        for (let el of elements) {
            if (el.children.length === 0 && el.textContent.trim() === 'Matrix-Vector Dot Product') {
                el.click();
                
                // Also try clicking the parent if the text node itself isn't clickable
                if (el.parentElement) el.parentElement.click();
                if (el.parentElement && el.parentElement.parentElement) el.parentElement.parentElement.click();
                return;
            }
        }
    });

    // Wait for navigation
    await new Promise(r => setTimeout(r, 4000));
    
    console.log('New URL:', targetPage.url());

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
