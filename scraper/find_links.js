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

    console.log('Extracting all visible problem titles and links...');
    const problems = await targetPage.evaluate(() => {
        // Deep-ML uses Next.js routing, sometimes <a> tags don't have clear hrefs or they are just divs.
        // Let's find all text nodes that look like a problem title
        const elements = Array.from(document.querySelectorAll('div, span, a, h3, h4'));
        const results = [];
        
        for (let el of elements) {
            // A problem title usually doesn't have child elements (just text) and is relatively short
            if (el.children.length === 0 && el.textContent.trim().length > 3 && el.textContent.trim().length < 50) {
                // If the parent is clickable
                let curr = el;
                let href = null;
                for (let i = 0; i < 5; i++) {
                    if (curr.tagName === 'A' && curr.href) {
                        href = curr.href;
                        break;
                    }
                    curr = curr.parentElement;
                    if (!curr) break;
                }
                
                if (href && href.includes('/question/')) {
                    results.push({ text: el.textContent.trim(), href });
                }
            }
        }
        return results;
    });

    console.log('Found:', problems.slice(0, 10));

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
