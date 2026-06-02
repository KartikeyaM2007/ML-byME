const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/USER/.gemini/antigravity-ide/brain/4c94ae50-0900-4e4f-8898-31bd7616da90/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = transcript.split('\\n');

let recovered = '';
for (let i = 0; i < lines.length; i++) {
  try {
    if (!lines[i]) continue;
    const log = JSON.parse(lines[i]);
    if (log.type === 'PLANNER_RESPONSE' && log.content && log.content.includes('cat src\\\\main.tsx')) {
        // Look at subsequent TOOL_RESPONSE
        for (let j = i + 1; j < lines.length; j++) {
             const respLog = JSON.parse(lines[j]);
             if (respLog.source === 'SYSTEM' && respLog.content && respLog.content.includes('The command completed successfully.')) {
                 // The stdout is the file content
                 const match = respLog.content.match(/Output:\\s*([\\s\\S]*?)\\s*$/);
                 if (match) {
                     recovered = match[1];
                     
                     // The output might have been truncated if it was too long!
                     if (recovered.includes('<truncated')) {
                         console.log('File was truncated!');
                     }
                 }
                 break;
             }
        }
    }
  } catch (e) {}
}

if (recovered) {
    fs.writeFileSync('src/main_recovered.tsx', recovered);
    console.log('Recovered main.tsx from cat command!');
} else {
    console.log('Failed to recover');
}
