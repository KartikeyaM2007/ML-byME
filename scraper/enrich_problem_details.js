/**
 * Fill in thin/stub problem details using research metadata + ML templates.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildRichDetail, isThin, loadTopicMeta } = require('./problem_detail_generator');

const DATA = path.join(__dirname, '../src/data');
const DETAILS_API = path.join(DATA, 'problemDetails.api.json');

const topicMeta = loadTopicMeta();
let details = JSON.parse(fs.readFileSync(DETAILS_API, 'utf8'));

let enriched = 0;
let skipped = 0;

details = details.map((d) => {
  if (!isThin(d)) {
    skipped += 1;
    return d;
  }
  const meta = topicMeta[d.slug];
  const rich = buildRichDetail(d.slug, meta, d);
  enriched += 1;
  return { ...d, ...rich };
});

fs.writeFileSync(DETAILS_API, JSON.stringify(details, null, 2));
execSync('node merge_api_data.js', { cwd: __dirname, stdio: 'inherit' });

const stillThin = details.filter(isThin).length;
console.log(`Enriched ${enriched} details, kept ${skipped} existing, still thin: ${stillThin}`);

if (stillThin > 0) process.exit(1);
