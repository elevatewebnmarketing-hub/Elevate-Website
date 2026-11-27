import test from 'node:test';
import assert from 'node:assert/strict';
import { getContentPath, getPortfolioServicePath, getRelatedPosts } from '../lib/content-paths.ts';
import { trackSearchEnquiry } from '../lib/search-measurement.ts';

test('readers get relevant commercial next steps', () => {
  assert.ok(getContentPath('whatsapp-marketing-nigeria-small-business').links.some(link => link.href === '/services/facebook-instagram-ads'));
  assert.ok(getContentPath('website-maintenance-checklist').links.some(link => link.href === '/services/website-maintenance'));
  assert.ok(getContentPath('seo-basics-for-small-business').links.some(link => link.href === '/services/local-seo'));
  assert.equal(getPortfolioServicePath('website-development'), '/services/website-design');
  assert.equal(getPortfolioServicePath('seo-optimization'), '/services/local-seo');
  assert.equal(getPortfolioServicePath('unknown'), null);
});

test('related posts prefer the same topic without repeating the current article', () => {
  const posts = [
    { id: '1', slug: 'seo-basics' }, { id: '2', slug: 'website-maintenance' },
    { id: '3', slug: 'google-search' }, { id: '4', slug: 'new-website' },
  ];
  assert.equal(getRelatedPosts(posts[0], posts)[0].id, '3');
  assert.ok(getRelatedPosts(posts[0], posts).every(post => post.id !== '1'));
  assert.deepEqual(getRelatedPosts(posts[0], [posts[0]]), []);
});

test('measurement excludes private routes and sends no form or query data', () => {
  for (const path of ['/admin', '/admin/leads', '/i/secret', '/p/secret', '/onboarding', '/invoice-generator']) {
    globalThis.window = { location: { pathname: path } };
    trackSearchEnquiry('enquiry_click', 'whatsapp');
    assert.equal(window.dataLayer, undefined, path);
  }
  globalThis.window = { location: { pathname: '/services/local-seo', search: '?email=private@example.com' } };
  trackSearchEnquiry('enquiry_form_success', 'form');
  assert.deepEqual(window.dataLayer, [{ event: 'enquiry_form_success', enquiry_channel: 'form', page_path: '/services/local-seo' }]);
  delete globalThis.window;
  assert.doesNotThrow(() => trackSearchEnquiry('enquiry_click', 'phone'));
});
