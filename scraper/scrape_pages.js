const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function run() {
    try {
        const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
        const pages = await browser.pages();
        let targetPage = pages.find(p => p.url().includes('tensortonic.com'));
        if (!targetPage) targetPage = await browser.newPage();
        
        const urls = [
            'https://www.tensortonic.com/',
            'https://www.tensortonic.com/research',
            'https://www.tensortonic.com/ml-math',
            'https://www.tensortonic.com/problems',
            'https://www.tensortonic.com/study-plans/cuda-basics'
        ];
        
        for (const url of urls) {
            await targetPage.goto(url, {waitUntil: 'domcontentloaded'});
            try {
                // Wait for a nav or a main tag which indicates the page has rendered
                await targetPage.waitForSelector('nav, main', {timeout: 10000});
            } catch(e) {
                console.log('No nav or main found for ' + url);
            }
            // Give it time for animations to settle
            await new Promise(r => setTimeout(r, 2000));
            const dom = await targetPage.evaluate(() => document.body.outerHTML);
            const slug = url.split('/').pop() || 'home';
            fs.writeFileSync('tensortonic_dom_' + (slug === '' ? 'home' : slug) + '.html', dom);
            console.log('Saved ' + slug);
        }
        await browser.disconnect();
    } catch (e) {
        console.error(e);
    }
}
run();
