const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '../src/data');

function extractSlugsFromTs(file, arrayName) {
  const src = fs.readFileSync(path.join(DATA, file), 'utf8');
  const re = new RegExp(`export const ${arrayName}[\\s\\S]*?= (\\[[\\s\\S]*?\\]);`);
  const m = src.match(re);
  if (!m) return [];
  return JSON.parse(m[1]).map((p) => p.slug);
}

const listApi = JSON.parse(fs.readFileSync(path.join(DATA, 'tensortonic.api.json'), 'utf8'));
const detailsApi = JSON.parse(fs.readFileSync(path.join(DATA, 'problemDetails.api.json'), 'utf8'));
const researchApi = JSON.parse(fs.readFileSync(path.join(DATA, 'researchProblems.api.json'), 'utf8'));

const tonicSlugs = extractSlugsFromTs('tensortonic.ts', 'tonicProblems');
const detailSrc = fs.readFileSync(path.join(DATA, 'problemDetails.ts'), 'utf8');
const detailSlugs = new Set([...detailSrc.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]));

const listSet = new Set(listApi.map((p) => p.slug));
const detailApiSet = new Set(detailsApi.map((d) => d.slug));

const missingFromDetails = tonicSlugs.filter((s) => !detailSlugs.has(s));
const missingFromApi = listApi.filter((p) => !detailApiSet.has(p.slug));
const thinDetails = detailsApi.filter(
  (d) => !d.prompt || d.prompt.length < 40 || !d.starterCode || d.starterCode.includes('NotImplementedError'),
);

const dupTonic = tonicSlugs.length - new Set(tonicSlugs).size;

console.log({
  tonicProblems: tonicSlugs.length,
  problemDetailsTs: detailSlugs.size,
  apiList: listApi.length,
  apiDetails: detailsApi.length,
  dupTonicSlugs: dupTonic,
  missingFromDetails: missingFromDetails.length,
  missingFromApi: missingFromApi.length,
  thinOrStubDetails: thinDetails.length,
});

if (missingFromDetails.length) {
  console.log('\nMissing from problemDetails.ts:', missingFromDetails);
}
if (missingFromApi.length) {
  console.log('\nMissing from problemDetails.api.json:', missingFromApi.map((p) => p.slug));
}

fs.writeFileSync(
  path.join(DATA, 'audit_details.json'),
  JSON.stringify(
    {
      missingFromDetails,
      missingFromApi: missingFromApi.map((p) => ({ slug: p.slug, title: p.title })),
      thinSlugs: thinDetails.map((d) => d.slug),
    },
    null,
    2,
  ),
);
