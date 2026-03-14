/**
 * Strip HTML tags from pasted content (e.g. from Word, Google Docs)
 * so they don't show as text in blog posts.
 */
export function stripHtmlTags(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/<\/p>|<\/div>|<\/h[1-6]>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
