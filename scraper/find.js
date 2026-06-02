const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scraper/deep_ml_problems.html', 'utf8');
const $ = cheerio.load(html);

let found = false;
$('*').each((i, el) => {
    if($(el).text() === 'Implement Sigmoid in NumPy') {
        console.log('Exact match:', $(el).prop('tagName'), $(el).attr('href') || 'No href', $(el).html().substring(0, 100));
        
        // Let's traverse up to find an 'a' tag
        let parent = $(el).parent();
        for (let i = 0; i < 5; i++) {
            if (parent.prop('tagName') === 'A') {
                console.log('Parent A tag:', parent.attr('href'));
            }
            parent = parent.parent();
        }
        
        found = true;
    }
});

if(!found) console.log('Not found');
