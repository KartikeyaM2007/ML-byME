const puppeteer = require('puppeteer-core');
const fs = require('fs');
async function run() {
    const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
    const pages = await browser.pages();
    let i = 0;
    for (const page of pages) {
        try {
            await page.screenshot({path: `screenshot_${i}.png`});
            console.log(`Saved screenshot_${i}.png for ${await page.title()}`);
            i++;
        } catch(e) {
            console.error('Failed for tab', i, e.message);
        }
    }
    await browser.disconnect();
}
run();
