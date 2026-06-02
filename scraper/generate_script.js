const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/problemDetails.partial.json', 'utf8'));

const placeholderStart = "Machine Learning Problem\n\nDifficulty:";
const slugsToFix = data
  .filter(p => !p.statement.startsWith(placeholderStart))
  .map(p => p.slug)
  .filter(slug => !['logistic-regression-training', 'pad-sequences', 'matrix-transpose', 'positional-encoding', 'gradient-descent-quadratic', 'sigmoid-numpy'].includes(slug));

const scriptCode = `
(async function() {
  const slugsToFix = ${JSON.stringify(slugsToFix)};
  const fixedProblems = [];

  // Dynamically load Turndown.js to convert HTML back to Markdown
  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/turndown/dist/turndown.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });

  const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
  
  // Custom rule to perfectly extract LaTeX from KaTeX/MathJax rendered elements
  turndownService.addRule('math', {
    filter: function (node) {
      return node.nodeName === 'SPAN' && (node.classList.contains('katex') || node.classList.contains('math'));
    },
    replacement: function (content, node) {
      const annotation = node.querySelector('annotation');
      if (annotation) {
        return '$' + annotation.textContent.trim() + '$';
      }
      const script = node.querySelector('script[type^="math/tex"]');
      if (script) {
        return '$' + script.textContent.trim() + '$';
      }
      return '$' + node.textContent.trim() + '$';
    }
  });

  console.log(\`Starting DOM extraction for \${slugsToFix.length} problems...\`);

  for (let i = 0; i < slugsToFix.length; i++) {
    const slug = slugsToFix[i];
    console.log(\`[\${i+1}/\${slugsToFix.length}] Fetching \${slug}...\`);
    
    try {
      const res = await fetch(\`https://www.tensortonic.com/problems/\${slug}\`);
      const html = await res.text();
      
      // Parse the HTML directly without needing an iframe
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      let title = slug;
      const h1 = doc.querySelector('h1');
      if (h1) title = h1.textContent.trim();
      
      // Find the main content container (usually the one with the most text/paragraphs)
      const containers = doc.querySelectorAll('div, article, section, main');
      let bestContainer = null;
      let maxScore = 0;
      
      for (let el of containers) {
        if (el.className && typeof el.className === 'string' && el.className.match(/nav|menu|sidebar|header|footer/i)) continue;
        const score = el.querySelectorAll('p, h2, h3, ul, ol, .katex').length;
        if (score > maxScore) {
          maxScore = score;
          bestContainer = el;
        }
      }
      
      let statementMarkdown = "";
      if (bestContainer) {
        statementMarkdown = turndownService.turndown(bestContainer);
      } else {
        statementMarkdown = turndownService.turndown(doc.body);
      }
      
      // Extract starter code (Monaco editor or generic pre tag)
      let starterCode = "";
      const monacoLines = doc.querySelectorAll('.view-lines .view-line');
      if (monacoLines.length > 0) {
        starterCode = Array.from(monacoLines).map(l => l.textContent).join('\\n');
      } else {
        const pre = doc.querySelector('pre');
        if (pre) starterCode = pre.textContent;
      }
      
      if (statementMarkdown.length > 50) {
        console.log(\`  ✅ Successfully converted HTML to Markdown with LaTeX for \${slug}\`);
        fixedProblems.push({
          slug: slug,
          title: title,
          statement: statementMarkdown,
          starterCode: starterCode
        });
      } else {
        console.log(\`  ❌ Extracted statement was too short, parsing failed for \${slug}\`);
      }
      
      // Short delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 600));

    } catch (err) {
      console.error(\`  ❌ Error fetching \${slug}:\`, err);
    }
  }

  console.log(\`Finished extracting \${fixedProblems.length} problems!\`);
  
  if (fixedProblems.length > 0) {
    const blob = new Blob([JSON.stringify(fixedProblems, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fixed_scraped_problems.json';
    a.click();
  }
})();
`;

fs.writeFileSync('scraper/browser_script.txt', scriptCode.trim());
console.log('Generated DOM to Markdown scraper for ' + slugsToFix.length + ' problems!');
