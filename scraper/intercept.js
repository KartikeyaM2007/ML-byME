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

    console.log('Intercepting network requests...');
    
    // Set up request interception
    targetPage.on('response', async (response) => {
        const url = response.url();
        if (url.includes('json') || url.includes('api') || url.includes('trpc') || url.includes('graphql')) {
            try {
                const text = await response.text();
                if (text.includes('Sigmoid in NumPy')) {
                    console.log('\\nFOUND IT in URL:', url);
                    console.log('Sample data:', text.substring(0, 500));
                }
            } catch (e) {}
        }
    });

    console.log('Reloading page to capture requests...');
    await targetPage.reload({ waitUntil: 'networkidle2' });

    console.log('Waiting an extra 5 seconds...');
    await new Promise(r => setTimeout(r, 5000));

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
