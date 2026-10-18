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

/**
 * Bold plus [text](/path) and [text](https://...) links. Text is HTML-escaped first, so quotes can't break out
 * of the href; only same-site paths and https URLs become links (no javascript: or data: URLs).
 */
export function formatInline(raw: string): string {
  return escapeHtml(raw)
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-primary dark:text-white">$1</strong>')
    .replace(/\[([^\]]+)\]\((\/[a-z0-9\-/#?=&;]*)\)/gi, '<a href="$2" class="text-accent font-medium underline underline-offset-2 hover:no-underline">$1</a>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^\s()<>]+)\)/g, '<a href="$2" rel="noopener" class="text-accent font-medium underline underline-offset-2 hover:no-underline">$1</a>');
}

/** Heading text to an id for in-page links, e.g. "Step 1: Set up" -> "step-1-set-up". */
export function headingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
