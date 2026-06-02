(async function() {
  const scrapedData = [];
  
  // 1. Find all internal links on the current page that we want to scrape
  // E.g., /study-plans/pandas, /ml-math/calculus/chain-rule, etc.
  const links = Array.from(document.querySelectorAll('a'))
    .map(a => a.getAttribute('href'))
    .filter(href => href && href.startsWith('/') && href.length > 1)
    // Filter out common non-content pages or things we already have
    .filter(href => !href.startsWith('/problems/') && href !== '/problems' && href !== '/dashboard' && href !== '/leaderboard');
  
  const uniqueUrls = [...new Set(links)];
  
  console.log(`Found ${uniqueUrls.length} unique deep links to scrape on this page.`);
  if (uniqueUrls.length === 0) {
    console.log("No deep links found. Make sure you are on a page like /study-plans or /ml-math that links to sub-pages.");
    return;
  }

  // 2. Load Turndown for Markdown conversion
  await new Promise((resolve) => {
    if (window.TurndownService) return resolve();
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/turndown/dist/turndown.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });

  const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  
  // Keep the LaTeX math rule
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

  console.log(`Starting DOM extraction...`);

  // 3. Fetch each URL and extract the content
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    console.log(`[${i+1}/${uniqueUrls.length}] Fetching ${url}...`);
    
    try {
      const res = await fetch(url);
      const html = await res.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      let title = url;
      const h1 = doc.querySelector('h1');
      if (h1) title = h1.textContent.trim();
      
      // Attempt to find the main container
      const containers = doc.querySelectorAll('div, article, section, main');
      let bestContainer = null;
      let maxScore = 0;
      
      for (let el of containers) {
        if (el.className && typeof el.className === 'string' && el.className.match(/nav|menu|sidebar|header|footer/i)) continue;
        const score = el.querySelectorAll('p, h2, h3, ul, ol, .katex, code, pre').length;
        if (score > maxScore) {
          maxScore = score;
          bestContainer = el;
        }
      }
      
      let markdown = "";
      if (bestContainer) {
        markdown = turndownService.turndown(bestContainer);
      } else {
        markdown = turndownService.turndown(doc.body);
      }
      
      // Also grab Next.js raw data if available (very useful for deep nested JSON content)
      let nextData = null;
      const nextScript = doc.querySelector('script#__NEXT_DATA__');
      if (nextScript) {
        try {
          nextData = JSON.parse(nextScript.textContent);
        } catch (e) {}
      }
      
      scrapedData.push({
        url: url,
        title: title,
        markdown: markdown,
        nextData: nextData ? "Included" : "None" // We can optionally include full nextData if needed, but it might be huge
      });
      
      console.log(`  ✅ Successfully scraped ${url}`);
      
      // Delay to prevent rate limiting
      await new Promise(r => setTimeout(r, 600));

    } catch (err) {
      console.error(`  ❌ Error fetching ${url}:`, err);
    }
  }

  console.log(`Finished extracting ${scrapedData.length} pages!`);
  
  if (scrapedData.length > 0) {
    const blob = new Blob([JSON.stringify(scrapedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deep_pages_data.json';
    a.click();
  }
})();
