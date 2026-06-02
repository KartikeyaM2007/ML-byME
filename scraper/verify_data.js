/**
 * Static data integrity checks (no browser).
 */
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '../src/data');
const failures = [];

function fail(msg) {
  failures.push(msg);
  console.error('FAIL', msg);
}

function ok(msg) {
  console.log('OK', msg);
}

const tonicSrc = fs.readFileSync(path.join(DATA, 'tensortonic.ts'), 'utf8');
const detailsSrc = fs.readFileSync(path.join(DATA, 'problemDetails.ts'), 'utf8');
const researchSrc = fs.readFileSync(path.join(DATA, 'researchPapers.ts'), 'utf8');

const tonicMatch = tonicSrc.match(/export const tonicProblems[\s\S]*?= (\[[\s\S]*?\]);/);
const tonicArr = tonicMatch ? JSON.parse(tonicMatch[1]) : [];
const slugs = tonicArr.map((p) => p.slug);
const detailsMatch = detailsSrc.match(/export const problemDetails[\s\S]*?= (\[[\s\S]*?\]);/);
const detailsArr = detailsMatch ? JSON.parse(detailsMatch[1]) : [];
const detailSlugs = detailsArr.map((d) => d.slug);
const problemIds = [...researchSrc.matchAll(/"problemId":\s*"([^"]+)"/g)].map((m) => m[1]);

const slugSet = new Set(slugs);
const detailSet = new Set(detailSlugs);

ok(`${slugs.length} problems in tonicProblems`);
ok(`${detailSlugs.length} entries in problemDetails`);

if (slugs.length < 200) fail(`Expected 200+ problems, got ${slugs.length}`);
if (new Set(slugs).size !== slugs.length) fail('Duplicate slugs in tonicProblems');

const mustHave = [
  'sigmoid-numpy',
  'transformers-tokenization',
  'transformers-embedding',
  'pad-sequences',
];
for (const s of mustHave) {
  if (!slugSet.has(s)) fail(`Missing slug: ${s}`);
  else ok(`slug present: ${s}`);
}

for (const s of mustHave) {
  if (!detailSet.has(s)) fail(`Missing detail: ${s}`);
}

let researchMissing = 0;
for (const pid of problemIds) {
  if (!slugSet.has(pid)) researchMissing++;
  if (!detailSet.has(pid)) fail(`Research problemId without detail: ${pid}`);
}
if (researchMissing > 0) fail(`${researchMissing} research problemIds missing from tonicProblems`);
else ok(`All ${problemIds.length} research problemIds in problem list`);

if (!detailsSrc.includes('def tokenize')) fail('transformers-tokenization missing tokenize starter');
else ok('Tokenization starter code present');

if (tonicSrc.includes('"id": "sigmoid')) fail('tonicProblems may have slug in id field (corrupt list)');
else ok('Problem id/slug shape looks valid');

const papers = (researchSrc.match(/"id":\s*"transformer"/g) || []).length;
const paperCount = (researchSrc.match(/"architectureType"/g) || []).length;
if (paperCount < 15) fail(`Expected 15+ research papers, got ${paperCount}`);
else ok(`Research papers loaded (${paperCount})`);

const { isThin } = require('./problem_detail_generator');
const thin = detailsArr.filter(isThin).length;
if (thin > 0) fail(`${thin} thin/stub problem details remain`);
else ok('All problem details are fully specified');

if (failures.length) {
  console.error(`\n${failures.length} data check(s) failed.`);
  process.exit(1);
}
console.log('\nAll data integrity checks passed.');
