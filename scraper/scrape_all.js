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

    const scrapedData = [];
    
    // Loop up to 75
    for (let id = 1; id <= 75; id++) {
        console.log(`[${id}/5] Fetching ID ${id}...`);
        try {
            await targetPage.goto(`https://www.deep-ml.com/problems/${id}`, { waitUntil: 'networkidle2' });
            await new Promise(r => setTimeout(r, 2000));
            
            await targetPage.addScriptTag({ url: 'https://unpkg.com/turndown/dist/turndown.js' });
            
            const problem = await targetPage.evaluate((currentId) => {
                // Find difficulty first
                let difficulty = 'easy';
                let diffEl = null;
                document.querySelectorAll('span, div').forEach(el => {
                    const text = el.textContent.trim();
                    if (['Easy', 'Medium', 'Hard'].includes(text) && el.children.length === 0) {
                        difficulty = text.toLowerCase();
                        diffEl = el;
                    }
                });
                
                // Find title
                let title = '';
                if (diffEl) {
                    let prev = diffEl.parentElement;
                    while (prev && prev.previousElementSibling) {
                        prev = prev.previousElementSibling;
                        if (prev.textContent.trim().length > 0) {
                            title = prev.textContent.trim();
                            break;
                        }
                    }
                }
                
                // Fallback title extraction
                if (!title) {
                    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
                    for (let h of headings) {
                        const txt = h.textContent.trim();
                        if (txt && txt !== 'Machine Learning Practice Problems' && txt !== 'Deep-ML') {
                            title = txt;
                            break;
                        }
                    }
                }

                if (!title || title === 'Page Not Found') return { error: 'Redirected or not found' };
                
                let starterCode = '';
                const monacoLines = document.querySelectorAll('.view-lines .view-line');
                if (monacoLines.length > 0) {
                    starterCode = Array.from(monacoLines).map(l => l.textContent.replace(/\\u00a0/g, ' ')).join('\\n');
                } else {
                    const pre = document.querySelector('pre');
                    if (pre) starterCode = pre.textContent;
                }
                
                if (!window.TurndownService) return { error: 'No Turndown' };
                
                const turndownService = new window.TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
                turndownService.addRule('math', {
                    filter: function (node) {
                        return node.nodeName === 'SPAN' && (node.classList.contains('katex') || node.classList.contains('math'));
                    },
                    replacement: function (content, node) {
                        const annotation = node.querySelector('annotation');
                        if (annotation) return '$' + annotation.textContent.trim() + '$';
                        const script = node.querySelector('script[type^="math/tex"]');
                        if (script) return '$' + script.textContent.trim() + '$';
                        return '$' + node.textContent.trim() + '$';
                    }
                });
                
                let bestContainer = null;
                let maxP = -1;
                document.querySelectorAll('div, section, article').forEach(el => {
                    if (el.className && typeof el.className === 'string' && el.className.match(/nav|menu|sidebar|header/i)) return;
                    const pCount = el.querySelectorAll('p, h2, h3, ul').length;
                    if (pCount > maxP && pCount < 50) {
                        maxP = pCount;
                        bestContainer = el;
                    }
                });
                
                let rawMarkdown = '';
                if (bestContainer) {
                    rawMarkdown = turndownService.turndown(bestContainer);
                }
                
                return {
                    id: currentId,
                    title,
                    difficulty,
                    starterCode,
                    rawMarkdown
                };
            }, id);
            
            if (problem && !problem.error) {
                console.log(`  ✅ Extracted: ${problem.title}`);
                scrapedData.push(problem);
            } else {
                console.log(`  ❌ Extract failed: ${problem ? problem.error : 'null'}`);
            }
            
        } catch (err) {
            console.error(`  ❌ Error on ID ${id}:`, err.message);
        }
    }
    
    fs.writeFileSync('scraped_data.json', JSON.stringify(scrapedData, null, 2));
    console.log(`\\nFinished! Saved ${scrapedData.length} problems to scraped_data.json`);

    browser.disconnect();
  } catch (error) {
    console.error('Fatal Error:', error);
  }
})();
