const fs = require('fs');
const path = require('path');

function run() {
    const jsonPath = path.join(__dirname, '../src/data/problemDetails.json');
    if (!fs.existsSync(jsonPath)) {
        console.error('problemDetails.json not found.');
        return;
    }

    const details = fs.readFileSync(jsonPath, 'utf8');

    const tsPath = path.join(__dirname, '../src/data/problemDetails.ts');
    let tsContent = fs.readFileSync(tsPath, 'utf8');
    
    const startToken = 'export const problemDetails: ProblemDetailData[] = ';
    const startIdx = tsContent.indexOf(startToken);
    
    if (startIdx !== -1) {
        const before = tsContent.slice(0, startIdx);
        // find next export
        const nextExportIdx = tsContent.indexOf('export const ', startIdx + 10);
        const after = nextExportIdx !== -1 ? tsContent.slice(nextExportIdx) : '';
        
        const newCode = `${startToken}${details};\\n\\n`;
        fs.writeFileSync(tsPath, before + newCode + after, 'utf8');
        console.log('Successfully updated problemDetails.ts!');
    } else {
        console.error('Could not find start token in problemDetails.ts');
    }
}

run();
