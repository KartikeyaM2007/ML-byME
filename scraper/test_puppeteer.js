const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Fetching browser WS endpoint...');
    const res = await fetch('http://localhost:9222/json/version');
    const data = await res.json();
    console.log('WS endpoint:', data.webSocketDebuggerUrl);

    console.log('Connecting to browser...');
    const browser = await puppeteer.connect({
      browserWSEndpoint: data.webSocketDebuggerUrl,
      defaultViewport: null
    });

    const pages = await browser.pages();
    console.log(`Found ${pages.length} pages.`);
    
    // Find the deep-ml.com page
    let targetPage = pages.find(p => p.url().includes('deep-ml.com'));
    
    if (targetPage) {
        console.log('Found Deep ML page:', targetPage.url());
        const title = await targetPage.title();
        console.log('Title:', title);
    } else {
        console.log('Deep ML page not found. Available pages:');
        pages.forEach(p => console.log(' - ' + p.url()));
        
        console.log('Using the first page to navigate to Deep ML...');
        targetPage = pages[0];
        await targetPage.goto('https://www.deep-ml.com/problems', { waitUntil: 'networkidle2' });
        console.log('Navigated to:', targetPage.url());
    }

    browser.disconnect();
    console.log('Disconnected');
  } catch (error) {
    console.error('Error connecting to Chrome:', error.message);
  }
})();
