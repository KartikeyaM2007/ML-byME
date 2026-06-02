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

    console.log('Navigating to problem 2...');
    await targetPage.goto('https://www.deep-ml.com/problems/2', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('Evaluating DOM...');
    const problemData = await targetPage.evaluate(() => {
        const titleEl = document.querySelector('h1');
        const title = titleEl ? titleEl.textContent : '';
        
        // Find difficulty
        let difficulty = '';
        document.querySelectorAll('span, div').forEach(el => {
            if (['Easy', 'Medium', 'Hard'].includes(el.textContent.trim()) && el.children.length === 0) {
                difficulty = el.textContent.trim();
            }
        });
        
        // Find tags
        const tags = [];
        // Tags are usually rendered next to difficulty
        // We can just grab all badge-like spans
        
        // Find the main prompt/statement
        // The statement is typically the content after h1 but before Examples
        // Let's grab the HTML of the main container and let our script process it
        let mainContentHtml = '';
        let examplesText = '';
        let constraintsText = '';
        
        // To be accurate, let's grab all <p>, <pre>, <ul>, <div> inside the main area
        // But Next.js DOM is messy. We'll just grab the innerHTML of the div that contains 'Example 1:'
        let bestDiv = null;
        document.querySelectorAll('div').forEach(el => {
            if (el.textContent.includes('Example 1') && el.textContent.includes(title)) {
                // Find the smallest div that contains it
                if (!bestDiv || el.innerText.length < bestDiv.innerText.length) {
                    bestDiv = el;
                }
            }
        });
        
        return {
            title,
            difficulty,
            html: bestDiv ? bestDiv.innerHTML : ''
        };
    });
    
    console.log('Data:', problemData.title, problemData.difficulty);
    console.log('HTML Length:', problemData.html.length);

    browser.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
})();
