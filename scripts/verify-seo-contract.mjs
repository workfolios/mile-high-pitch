import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const canonical = 'https://workfolios.github.io/mile-high-pitch/';
const socialImage = canonical + 'assets/mhp2019-event-preview.jpg';
const pageTitle = 'Mile High Pitch 2019 | Denver Startup Pitch Competition';
const preview = 'assets/mile-high-pitch-2019-required-assets/mile-high-pitch-winner-boogaloo-beds-2019.jpg';

const html = readFileSync('dist/index.html', 'utf8');
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const htmlSource = readFileSync('index.html', 'utf8');

function verifyTag(label, pattern) {
  assert.match(html, pattern, label);
  console.log('PASS:', label);
}

verifyTag('Approved page title', /<title>Mile High Pitch 2019 \| Denver Startup Pitch Competition<\/title>/);
verifyTag('Specific meta description', /<meta name="description" content="A historical event portfolio documenting Mile High Pitch 2019,/);
verifyTag('Self-referencing canonical', /<link rel="canonical" href="https:\/\/workfolios\.github\.io\/mile-high-pitch\/"\s*\/>/);
verifyTag('Intentional public indexing directive', /<meta name="robots" content="index,follow,max-image-preview:large"\s*\/>/);
verifyTag('OG website identity', /<meta property="og:type" content="website"\s*\/>/);
verifyTag('OG canonical URL', /<meta property="og:url" content="https:\/\/workfolios\.github\.io\/mile-high-pitch\/"\s*\/>/);
verifyTag('OG preview image', /<meta property="og:image" content="https:\/\/workfolios\.github\.io\/mile-high-pitch\/assets\/mhp2019-event-preview\.jpg"\s*\/>/);
verifyTag('Twitter summary card', /<meta name="twitter:card" content="summary_large_image"\s*\/>/);
verifyTag('Twitter preview asset', /<meta name="twitter:image" content="https:\/\/workfolios\.github\.io\/mile-high-pitch\/assets\/mhp2019-event-preview\.jpg"\s*\/>/);
verifyTag('Pages JS/CSS project subpath', /\/mile-high-pitch\/assets\//);
assert.ok(!/<meta[^>]+content="noindex/i.test(html), 'Unexpected noindex');

const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json"\s*>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'Exactly one search-facing JSON-LD block');
const json = JSON.parse(scripts[0][1]);
assert.equal(json['@context'], 'https://schema.org');
const graph = json['@graph'];
assert.equal(graph.length, 2);
const website = graph.find((node) => node['@type'] === 'WebSite');
const webpage = graph.find((node) => node['@type'] === 'WebPage');
assert.equal(website.url, canonical);
assert.equal(webpage.url, canonical);
assert.equal(webpage.name, pageTitle);
assert.equal(webpage.about['@type'], 'Event');
assert.equal(webpage.about.startDate, '2019-11-21');
assert.equal(webpage.about.location.address.addressLocality, 'Denver');
console.log('PASS: factual historical-event WebPage / WebSite JSON-LD');

assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 1);
assert.ok(sitemap.includes('<loc>' + canonical + '</loc>'));
assert.ok(!sitemap.includes('<lastmod>'), 'Unverified lastmod must not be invented');
console.log('PASS: single-canonical-route XML sitemap');

const sourceImageBytes = readFileSync(preview);
const distImageBytes = readFileSync('dist/assets/mhp2019-event-preview.jpg');
assert.deepEqual(distImageBytes, sourceImageBytes, 'Social preview must reuse exact approved photo bytes');
console.log('PASS: original approved event photograph copied unchanged');

assert.ok(!htmlSource.includes('http://localhost'), 'No development canonical');
assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
console.log('PASS: canonical uniqueness and no placeholder references');
console.log('SEO build-artifact contract: PASS');
