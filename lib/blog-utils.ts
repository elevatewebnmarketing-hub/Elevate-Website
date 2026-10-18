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

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Bold plus [text](/path) links. Only same-site paths become links, so post text can't inject outside URLs. */
export function formatInline(raw: string): string {
  return escapeHtml(raw)
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-primary dark:text-white">$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[a-z0-9\-/#?=&;]*)\)/gi, '<a href="$2" class="text-accent font-medium underline underline-offset-2 hover:no-underline">$1</a>');
}
