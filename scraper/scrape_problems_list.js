const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setCookie(
    {
      name: '__Secure-better-auth.state',
      value: 'lNRNZ16IhIlLm0cZAPiyDxmsOJdPv6Ov.w%2FW2QnjwLnAfmRmjLk5OkvvYqGDmld7i7FpFBP4aHis%3D',
      domain: '.tensortonic.com',
      secure: true,
      httpOnly: true
    },
    {
      name: '__Secure-better-auth.session_token',
      value: '7kA8hjuFSgs0sjMD2GRulEvkZPI01Nyj.xy0a0JkbIkzp5KUg5K2o%2BHzG%2BkhZ11hVCLKQNzdN0UY%3D',
      domain: '.tensortonic.com',
      secure: true,
      httpOnly: true
    }
  );
  
  await page.goto('https://www.tensortonic.com/problems', { waitUntil: 'networkidle2' });
  const html = await page.content();
  fs.writeFileSync('problems_page_dump.html', html);
  
  await browser.close();
})();
