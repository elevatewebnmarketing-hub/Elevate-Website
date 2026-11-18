import { NextResponse } from 'next/server';
import { followUpDue } from '@/backend/visibility-leads';
import { emailHtml, esc, notifyOwner } from '@/backend/notify';
import { apiFail } from '@/backend/http';

/**
 * Daily "nobody falls through the cracks" email (Vercel Cron, see vercel.json; same CRON_SECRET as billing).
 * Lists leads still marked New after 20 hours, and website checks from the last 7 days with no lead and no follow-up.
 * Process: Claude-Motion-Graphics/business/operations/lead-follow-up.md.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET is not set' }, { status: 503 });
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { leads, checks } = await followUpDue(20);
    if (!leads.length && !checks.length) return NextResponse.json({ sent: false, leads: 0, checks: 0 });

    const day = (iso: string) => new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Lagos' });
    const leadRows = leads
      .map((l) => {
        const wa = l.phone ? ` · <a href="https://wa.me/${l.phone.replace(/[^\d]/g, '')}">WhatsApp ${esc(l.phone)}</a>` : '';
        return `<li><b>${esc(l.name)}</b> (${esc(l.form ?? 'form')}, ${day(l.created_at)})${wa}${l.email ? ` · ${esc(l.email)}` : ''}${l.website ? `<br>${esc(l.website)}` : ''}</li>`;
      })
      .join('');
    const checkRows = checks
      .map((c) => `<li><a href="${esc(c.url)}">${esc(c.host)}</a>: ${c.score}/100 (${day(c.createdAt)})${c.utmSource ? ` · from ${esc(c.utmSource)}` : ''}</li>`)
      .join('');

    const sent = await notifyOwner(
      `Follow up today: ${leads.length} lead${leads.length === 1 ? '' : 's'}, ${checks.length} website check${checks.length === 1 ? '' : 's'}`,
      emailHtml(`${leads.length ? `<p><b>Leads still marked New</b> (promise: a human reply within 1 business day). Reply, then set each to Contacted:</p><ul>${leadRows}</ul>` : ''}
${checks.length ? `<p><b>Website checks with no details left</b> (last 7 days). Look each site up; if it's a real local business that fits, see the one-message rule in lead-follow-up.md, then mark it Followed up or Not a fit:</p><ul>${checkRows}</ul>` : ''}
<p><a href="https://www.elevatewebandmarketing.com/admin/leads">Open Leads in the admin</a></p>`)
    );
    return NextResponse.json({ sent, leads: leads.length, checks: checks.length });
  } catch (error) {
    return apiFail(error, 'Lead follow-up reminder');
  }
}
