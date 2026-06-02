const fs = require('fs');
let code = fs.readFileSync('src/main.tsx', 'utf8');
code = code.replace(/import \{ deepPages \} from '\.\/data\/studyPlanDetails';\n?/, '');
fs.writeFileSync('src/main.tsx', code);
