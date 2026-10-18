// Run: npx tsx scripts/blog-utils.test.ts
import assert from 'node:assert/strict';
import { formatInline, headingId } from '../lib/blog-utils';

assert.match(formatInline('[guide](/guides/x)'), /<a href="\/guides\/x"[^>]*>guide<\/a>/);
assert.match(formatInline('[src](https://example.com/a?b=1&c=2)'), /href="https:\/\/example.com\/a\?b=1&amp;c=2" rel="noopener"/);
assert.doesNotMatch(formatInline('[x](javascript:alert(1))'), /<a /);
assert.doesNotMatch(formatInline('[x](http://plain.example)'), /<a /);
assert.doesNotMatch(formatInline('[x](https://e.com/"onmouseover="alert(1))'), /"onmouseover/);
assert.equal(formatInline('<script>'), '&lt;script&gt;');
assert.equal(formatInline('**bold**'), '<strong class="font-semibold text-primary dark:text-white">bold</strong>');
assert.equal(headingId('Step 1: Set up WhatsApp Business properly'), 'step-1-set-up-whatsapp-business-properly');
console.log('blog-utils self-check: all passed');
