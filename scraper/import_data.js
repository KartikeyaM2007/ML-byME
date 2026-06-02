const fs = require('fs');
const path = require('path');

function run() {
    const scrapedPath = path.join(__dirname, 'scraped_data.json');
    if (!fs.existsSync(scrapedPath)) {
        console.error('scraped_data.json not found.');
        return;
    }

    const scraped = JSON.parse(fs.readFileSync(scrapedPath, 'utf8'));

    const newTonicProblems = [];
    const newProblemDetails = [];

    for (let i = 0; i < scraped.length; i++) {
        const prob = scraped[i];
        if (!prob || !prob.title || prob.error) continue;

        const id = newTonicProblems.length + 1;
        
        // Generate a clean slug
        const slug = prob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        // Extract category from markdown
        let md = prob.rawMarkdown;
        let category = "Machine Learning"; // fallback
        
        // Find the title header
        const titleLine = `# ${prob.title}`;
        const titleIdx = md.indexOf(titleLine);
        if (titleIdx !== -1) {
            md = md.slice(titleIdx + titleLine.length).trim();
            // The next line usually looks like "EasyLinear Algebra" or "MediumDeep Learning"
            const nextLine = md.split('\\n')[0].trim();
            
            // It might contain "Easy", "Medium", "Hard" followed by Category
            const catMatch = nextLine.match(/^(?:Easy|Medium|Hard)(.*)$/i);
            if (catMatch && catMatch[1]) {
                category = catMatch[1].trim();
            }
        }
        
        // Fix up the prompt to skip the Difficulty+Category line
        let prompt = md;
        if (prompt.startsWith('Easy') || prompt.startsWith('Medium') || prompt.startsWith('Hard')) {
            const firstNewline = prompt.indexOf('\\n');
            if (firstNewline !== -1) {
                prompt = prompt.slice(firstNewline).trim();
            }
        }

        // Add to tonicProblems
        newTonicProblems.push({
            id,
            slug,
            title: prob.title,
            categories: category ? [category] : [],
            difficulty: prob.difficulty ? prob.difficulty.charAt(0).toUpperCase() + prob.difficulty.slice(1) : "Easy"
        });

        // Add to problemDetails
        newProblemDetails.push({
            slug,
            title: prob.title,
            difficulty: prob.difficulty ? prob.difficulty.charAt(0).toUpperCase() + prob.difficulty.slice(1) : "Easy",
            categories: category ? [category] : [],
            prompt: prompt,
            examples: "",
            hints: [],
            starterCode: prob.starterCode || "",
            url: `https://www.deep-ml.com/problems/${prob.id}`,
            scraped: true
        });
    }

    // Overwrite problemDetails.json
    const detailsPath = path.join(__dirname, '../src/data/problemDetails.json');
    fs.writeFileSync(detailsPath, JSON.stringify(newProblemDetails, null, 2), 'utf8');

    // Overwrite tonicProblems in tensortonic.ts
    const tsPath = path.join(__dirname, '../src/data/tensortonic.ts');
    let tsContent = fs.readFileSync(tsPath, 'utf8');
    
    // Replace export const tonicProblems: TonicProblem[] = [ ... ];
    const startToken = 'export const tonicProblems: TonicProblem[] = [';
    const startIdx = tsContent.indexOf(startToken);
    
    // Find the end of the array (next top-level "];" or similar)
    if (startIdx !== -1) {
        // Find the next export or end of file
        const nextExportIdx = tsContent.indexOf('export const ', startIdx + 10);
        let endIdx = nextExportIdx !== -1 ? nextExportIdx : tsContent.length;
        
        // We will just substring to the end of the array.
        // Actually, let's use a regex or string replacement carefully
        const before = tsContent.slice(0, startIdx);
        let after = nextExportIdx !== -1 ? tsContent.slice(nextExportIdx) : '';
        
        // If there was no next export, we just append
        const newArrayCode = `export const tonicProblems: TonicProblem[] = ${JSON.stringify(newTonicProblems, null, 2)};\\n\\n`;
        
        fs.writeFileSync(tsPath, before + newArrayCode + after, 'utf8');
    }

    console.log(`Successfully imported ${newTonicProblems.length} problems!`);
}

run();
