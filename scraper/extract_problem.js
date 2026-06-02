const fs = require('fs');
const cheerio = require('cheerio');

const cookieStr = '__Secure-better-auth.state=lNRNZ16IhIlLm0cZAPiyDxmsOJdPv6Ov.w%2FW2QnjwLnAfmRmjLk5OkvvYqGDmld7i7FpFBP4aHis%3D; __Secure-better-auth.session_token=7kA8hjuFSgs0sjMD2GRulEvkZPI01Nyj.xy0a0JkbIkzp5KUg5K2o%2BHzG%2BkhZ11hVCLKQNzdN0UY%3D';

async function extractProblem(slug) {
  const url = `https://www.tensortonic.com/problems/${slug}`;
  console.log("Fetching", url);
  const res = await fetch(url, {
    headers: {
      'Cookie': cookieStr,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  fs.writeFileSync('problem_dump.html', html);
  
  const $ = cheerio.load(html);
  const title = $('h1').first().text().trim();
  console.log("Extracted title:", title);
  
  // Try to find __next_f strings that might contain the problem data
  const scripts = $('script').map((i, el) => $(el).text()).get();
  let foundData = false;
  for (const script of scripts) {
    if (script.includes(slug) && script.includes('statement')) {
      console.log("Found a script tag containing statement and slug!");
      foundData = true;
      break;
    }
  }
  
  console.log("Found data in RSC payload?", foundData);
}

extractProblem('info-nce-loss');
