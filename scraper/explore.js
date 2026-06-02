const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Fetching browser WS endpoint...');
    const res = await fetch('http://localhost:9222/json/version');
    const data = await res.json();
    const browser = await puppeteer.connect({
      browserWSEndpoint: data.webSocketDebuggerUrl,
      defaultViewport: null
    });

    const pages = await browser.pages();
    let targetPage = pages.find(p => p.url().includes('deep-ml.com'));
    if (!targetPage) targetPage = pages[0];

    console.log('Navigating to sigmoid-numpy...');
    await targetPage.goto('https://www.deep-ml.com/problems/sigmoid-numpy', { waitUntil: 'networkidle2' });

    console.log('Evaluating DOM...');
    const domData = await targetPage.evaluate(() => {
      // Get all text and elements to see the structure
      const getMarkdown = (el) => {
        if (!el) return '';
        let html = el.innerHTML;
        return html; // Just grab HTML for now to see structure
      };

      const h1 = document.querySelector('h1');
      const title = h1 ? h1.textContent : '';

      // The original site usually puts Examples, Hints etc in specific div classes or tags
      // Let's grab all headings and their following content
      const sections = [];
      document.querySelectorAll('h1, h2, h3, h4, p, ul, ol, div').forEach(el => {
         if (el.tagName.match(/^H\d$/)) {
             sections.push({ type: 'heading', text: el.textContent });
         } else if (el.tagName === 'P') {
             sections.push({ type: 'paragraph', text: el.textContent.substring(0, 100) });
         }
      });

      return {
        title,
        html: document.body.innerHTML.substring(0, 1500),
        sections: sections.slice(0, 20)
      };
    });

    console.log('DOM Data:', JSON.stringify(domData, null, 2));

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
