const fs = require('fs');
const cheerio = require('cheerio');

const cookieStr = '__Secure-better-auth.state=lNRNZ16IhIlLm0cZAPiyDxmsOJdPv6Ov.w%2FW2QnjwLnAfmRmjLk5OkvvYqGDmld7i7FpFBP4aHis%3D; __Secure-better-auth.session_token=7kA8hjuFSgs0sjMD2GRulEvkZPI01Nyj.xy0a0JkbIkzp5KUg5K2o%2BHzG%2BkhZ11hVCLKQNzdN0UY%3D';

async function testFetch() {
  const res = await fetch('https://www.tensortonic.com/problems/policy-gradient-loss', {
    headers: {
      'Cookie': cookieStr,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  fs.writeFileSync('problem_dump.html', html);
  
  const $ = cheerio.load(html);
  console.log("Title:", $('h1').first().text());
  console.log("Welcome back present?", html.includes('Welcome back'));
}

testFetch();
