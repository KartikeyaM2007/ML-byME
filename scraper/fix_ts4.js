const fs = require('fs');

// Fix Home.tsx tabIndex="0" to tabIndex={0}
const homePath = '../src/Home.tsx';
let home = fs.readFileSync(homePath, 'utf8');
home = home.replace(/tabIndex="0"/g, 'tabIndex={0}');
home = home.replace(/tabIndex="-1"/g, 'tabIndex={-1}');
fs.writeFileSync(homePath, home);

// Fix main.tsx void check
const mainPath = '../src/main.tsx';
let main = fs.readFileSync(mainPath, 'utf8');
main = main.replace(/if \(false/g, 'if (false)');
fs.writeFileSync(mainPath, main);

console.log('Fixed final two hard errors');
