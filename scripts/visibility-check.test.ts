/**
 * Self-check for lib/visibility-check.ts. Run: npx tsx scripts/visibility-check.test.ts
 * Network-free: covers the SSRF guard and the HTML/robots parsing.
 */
import assert from 'node:assert/strict';
import { isPrivateAddress, normaliseUrl, visibleWords, jsonLdTypes, robotsBlocks } from '../lib/visibility-check';

// SSRF guard: private, loopback, link-local and mapped addresses are rejected
for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0', '::1', 'fd00::1', 'fe80::1', '::ffff:127.0.0.1', 'not-an-ip']) {
  assert.equal(isPrivateAddress(ip), true, `${ip} should be private`);
}
for (const ip of ['8.8.8.8', '172.32.0.1', '104.21.1.1', '2606:4700::1111']) {
  assert.equal(isPrivateAddress(ip), false, `${ip} should be public`);
}
for (const bad of ['localhost', 'http://localhost:3000', 'ftp://example.com', 'https://example.com:8080', 'https://user:pw@example.com', 'intranet', 'printer.local']) {
  assert.throws(() => normaliseUrl(bad), `${bad} should be rejected`);
}
assert.equal(normaliseUrl('example.com').toString(), 'https://example.com/');
assert.equal(normaliseUrl('http://example.com/page').protocol, 'http:');

// Words: scripts, styles and tags don't count
assert.equal(visibleWords('<html><script>var a = "lots of words here"</script><h1>Hello world</h1><p>Two more</p></html>'), 4);
assert.equal(visibleWords('<div id="root"></div>'), 0);

// JSON-LD types, including @graph and arrays; invalid JSON ignored
const html = `<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"ProfessionalService"},{"@type":["WebSite","Thing"]}]}</script><script type="application/ld+json">{bad json</script>`;
assert.deepEqual(jsonLdTypes(html).sort(), ['ProfessionalService', 'Thing', 'WebSite']);

// robots.txt: specific group wins over *, shared groups, Allow: / overrides
const robots = `User-agent: *\nDisallow: /admin/\n\nUser-agent: GPTBot\nUser-agent: ClaudeBot\nDisallow: /\n\nUser-agent: PerplexityBot\nDisallow: /\nAllow: /`;
assert.equal(robotsBlocks(robots, 'GPTBot'), true);
assert.equal(robotsBlocks(robots, 'ClaudeBot'), true);
assert.equal(robotsBlocks(robots, 'PerplexityBot'), false);
assert.equal(robotsBlocks(robots, 'Googlebot'), false);
assert.equal(robotsBlocks('User-agent: *\nDisallow: /', 'Googlebot'), true);

console.log('visibility-check self-check: all passed');
