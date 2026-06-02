const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scraper/deep_ml_problems.html', 'utf8');
const $ = cheerio.load(html);
const links = [];
$('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('problem')) {
        links.push(href);
    }
});
console.log(links);
