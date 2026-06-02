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
    
    console.log('Current URL before click:', targetPage.url());

    // Click the problem "Matrix-Vector Dot Product"
    console.log('Clicking Matrix-Vector Dot Product...');
    await targetPage.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        for (let el of elements) {
            if (el.children.length === 0 && el.textContent.trim() === 'Matrix-Vector Dot Product') {
                el.click();
                if (el.parentElement) el.parentElement.click();
                if (el.parentElement && el.parentElement.parentElement) el.parentElement.parentElement.click();
                return;
            }
        }
    });

    // Wait for the DOM to change (problem title appears)
    await new Promise(r => setTimeout(r, 4000));
    
    console.log('New URL:', targetPage.url());
    
    // Extract everything
    const dataExtracted = await targetPage.evaluate(() => {
        const text = document.body.innerText;
        return text.substring(0, 1000);
    });
    
    console.log('Content:\\n' + dataExtracted);

    // Go back
    await targetPage.goBack();

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
