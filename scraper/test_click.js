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

    console.log('Navigating to /problems...');
    await targetPage.goto('https://www.deep-ml.com/problems', { waitUntil: 'networkidle2' });
    
    // Wait for the problem list to render
    await new Promise(r => setTimeout(r, 3000));
    
    console.log('Finding problem elements...');
    const url = await targetPage.evaluate(() => {
        // Try to find anything that looks like a problem row or card
        // Deep-ML usually has cards or rows for each problem
        // Let's find any text that looks like a problem title, e.g. 'Implement Sigmoid'
        
        // Find elements that contain text but have no children (leaf nodes)
        const allDivs = Array.from(document.querySelectorAll('div, span, p, a, button'));
        for (let el of allDivs) {
            if (el.textContent && el.textContent.includes('Sigmoid in NumPy')) {
                // Click it!
                el.click();
                return 'Clicked Sigmoid in NumPy';
            }
        }
        
        // If not found, click the first thing that looks like a problem button
        const buttons = Array.from(document.querySelectorAll('a, button, [role="button"], div[class*="hover"], div[class*="cursor-pointer"]'));
        for (let btn of buttons) {
            if (btn.textContent.includes('Easy') || btn.textContent.includes('Medium') || btn.textContent.includes('Hard')) {
                btn.click();
                return 'Clicked a difficulty row: ' + btn.textContent.substring(0, 30);
            }
        }
        
        return 'Could not find a problem element to click';
    });
    
    console.log(url);
    
    // Wait for navigation
    await new Promise(r => setTimeout(r, 4000));
    console.log('Current URL after click:', targetPage.url());

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
