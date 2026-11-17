/**
 * Client workflow: lead statuses, project stages, the default "what we need from you" list,
 * and the launch checklist (from Claude-Motion-Graphics/business/operations/launch-checklist.md; keep in step).
 */

export const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'call_booked', label: 'Call booked' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number]['value'];

export interface Lead {
  id: string;
  createdAt: string;
  status: LeadStatus;
  form: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  website: string;
  service: string;
  projectType: string;
  industry: string;
  timeline: string;
  budget: string;
  message: string;
  page: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  notes: string;
  invoiceId: string | null;
}

export const PROJECT_STAGES = [
  { value: 'onboarding', label: 'Onboarding', client: 'We are collecting your answers and deposit.' },
  { value: 'content', label: 'Content', client: 'We are gathering your text, photos and logins.' },
  { value: 'design', label: 'Design and build', client: 'We are designing and building your website.' },
  { value: 'review', label: 'Your review', client: 'Your website is ready for you to check and send changes.' },
  { value: 'launch', label: 'Launch', client: 'Final checks before your website goes live.' },
  { value: 'live', label: 'Live', client: 'Your website is live.' },
] as const;
export type ProjectStage = (typeof PROJECT_STAGES)[number]['value'];

export interface ProjectItem {
  id: string;
  label: string;
  hint: string;
  sort: number;
  done: boolean;
  doneAt: string | null;
  clientNote: string;
}

export interface FeedbackRound {
  id: string;
  round: number;
  items: { page: string; change: string }[];
  submittedName: string;
  submittedAt: string;
  status: 'received' | 'done';
}

export interface Handover {
  pages?: string;
  adminUrl?: string;
  leadsEmail?: string;
  registrar?: string;
  launchDate?: string;
  carePlan?: string;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  publicToken: string;
  title: string;
  stage: ProjectStage;
  clientName: string;
  clientBusiness: string;
  clientEmail: string;
  clientPhone: string;
  stagingUrl: string;
  liveUrl: string;
  roundsIncluded: number;
  launchApprovedAt: string | null;
  launchApprovedName: string;
  launchChecklist: Record<string, boolean>;
  handover: Handover;
  notes: string;
  leadId: string | null;
  intakeId: string | null;
  invoiceId: string | null;
}

/** Starting list of what we need from a website client. Editable per project. */
export const DEFAULT_PROJECT_ITEMS: { label: string; hint: string }[] = [
  { label: 'Fill in the onboarding form', hint: 'Your business, services, areas and goals.' },
  { label: 'Logo', hint: 'Original file (PNG or SVG), not a screenshot. Paste a Google Drive or WeTransfer link.' },
  { label: 'Photos of your work, team or premises', hint: 'Original files, not WhatsApp copies. Paste a link to a folder.' },
  { label: 'Reviews or testimonials you have permission to show', hint: 'Paste them here or send a link.' },
  { label: 'Domain access or a name you want registered', hint: 'Add us as a user at your registrar. Never send passwords here.' },
  { label: 'Google Business Profile access', hint: 'Add hello@elevatewebandmarketing.com as a manager.' },
  { label: 'Who approves the website', hint: 'Name and WhatsApp of the person who signs off.' },
];

export const LAUNCH_CHECKLIST: { group: string; items: { id: string; label: string }[] }[] = [
  {
    group: 'Content and structure',
    items: [
      { id: 'pages', label: 'One page per main service (and key area), each with a unique title and description' },
      { id: 'h1', label: 'One H1 per page, headings in order' },
      { id: 'service-pages', label: 'Service pages say what, for whom, where, how much, with proof and a call to action' },
      { id: 'proof', label: 'Previous jobs and testimonials on the page (with permission)' },
      { id: 'nap', label: 'Name, address/area and phone match the Google Business Profile exactly' },
      { id: 'contact', label: 'Call, WhatsApp and form on every page' },
      { id: 'privacy', label: 'Privacy policy (and cookie notice if analytics cookies are used)' },
    ],
  },
  {
    group: 'Technical SEO',
    items: [
      { id: 'ssr', label: 'Pages server-rendered: content visible without JavaScript' },
      { id: 'sitemap', label: 'sitemap.xml lists all public pages' },
      { id: 'robots', label: 'robots.txt allows Google, Bing and AI search crawlers; blocks /admin' },
      { id: 'canonical', label: 'Canonical URLs; www/bare domain redirect to one version; HTTPS only' },
      { id: 'redirects', label: '301 redirects from old URLs (if replacing a site)' },
      { id: 'schema', label: 'Structured data: LocalBusiness, Service, FAQPage (real FAQs), BreadcrumbList' },
      { id: 'og', label: 'Open Graph image and title for link previews' },
      { id: 'images', label: 'Images compressed, with alt text and set dimensions' },
      { id: 'cwv', label: 'PageSpeed Insights mobile: Core Web Vitals pass' },
      { id: '404', label: '404 page with a link home' },
    ],
  },
  {
    group: 'Forms and tracking',
    items: [
      { id: 'forms', label: 'Every form submits, thanks the visitor, reaches the owner and is stored in the admin' },
      { id: 'spam', label: 'Spam protection works' },
      { id: 'phone-test', label: 'Click-to-call and WhatsApp tested on a real phone' },
      { id: 'ga4', label: 'GA4 with form, call and WhatsApp events' },
      { id: 'utm', label: 'UTM parameters kept through the form' },
    ],
  },
  {
    group: 'Go-live',
    items: [
      { id: 'dns', label: 'DNS pointed to Vercel; SSL on both domain versions' },
      { id: 'gsc', label: 'Search Console verified, sitemap submitted, key pages inspected' },
      { id: 'bing', label: 'Bing Webmaster Tools verified, sitemap submitted, IndexNow on' },
      { id: 'gbp', label: 'Google Business Profile: website link, services, hours, photos updated' },
      { id: 'uptime', label: 'UptimeRobot monitor added' },
      { id: 'client-admin', label: 'Client admin login created (own email, strong password, 2FA if available)' },
    ],
  },
  {
    group: 'Final QA',
    items: [
      { id: 'devices', label: 'Checked on iPhone, Android and desktop (Chrome and Safari)' },
      { id: 'client-check', label: 'Client checked spelling, phone numbers, prices and addresses' },
      { id: 'placeholders', label: 'No placeholder text or test data left' },
      { id: 'ai-check', label: 'Free AI visibility check run on the live site; result saved for the 30-day report' },
    ],
  },
];

export const LAUNCH_ITEM_COUNT = LAUNCH_CHECKLIST.reduce((n, g) => n + g.items.length, 0);

const httpsOrEmpty = (v: unknown) => {
  const s = String(v ?? '').trim();
  if (!s) return '';
  try {
    const u = new URL(s);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : '';
  } catch {
    return '';
  }
};
const UUIDRE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Clean project input from the admin form. */
export function sanitizeProject(b: Record<string, unknown>) {
  const str = (v: unknown, max = 300) => String(v ?? '').trim().slice(0, max);
  const title = str(b.title, 160);
  const clientName = str(b.clientName, 160);
  if (!title) return { error: 'Give the project a title' } as const;
  if (!clientName) return { error: 'Client name is required' } as const;
  const stage = PROJECT_STAGES.some((s) => s.value === b.stage) ? (b.stage as ProjectStage) : 'onboarding';
  const checklist: Record<string, boolean> = {};
  const ids = new Set(LAUNCH_CHECKLIST.flatMap((g) => g.items.map((i) => i.id)));
  for (const [k, v] of Object.entries((b.launchChecklist ?? {}) as Record<string, unknown>)) if (ids.has(k) && v === true) checklist[k] = true;
  const h = (b.handover ?? {}) as Record<string, unknown>;
  const rounds = Math.max(0, Math.min(10, Math.round(Number(b.roundsIncluded ?? 2)) || 0));
  return {
    value: {
      title,
      stage,
      clientName,
      clientBusiness: str(b.clientBusiness, 160),
      clientEmail: str(b.clientEmail, 200),
      clientPhone: str(b.clientPhone, 60),
      stagingUrl: httpsOrEmpty(b.stagingUrl),
      liveUrl: httpsOrEmpty(b.liveUrl),
      roundsIncluded: rounds,
      launchChecklist: checklist,
      handover: {
        pages: str(h.pages, 1000),
        adminUrl: httpsOrEmpty(h.adminUrl),
        leadsEmail: str(h.leadsEmail, 200),
        registrar: str(h.registrar, 120),
        launchDate: /^\d{4}-\d{2}-\d{2}$/.test(String(h.launchDate ?? '')) ? String(h.launchDate) : '',
        carePlan: str(h.carePlan, 200),
      },
      notes: str(b.notes, 5000),
      leadId: typeof b.leadId === 'string' && UUIDRE.test(b.leadId) ? b.leadId : null,
      intakeId: typeof b.intakeId === 'string' && UUIDRE.test(b.intakeId) ? b.intakeId : null,
      invoiceId: typeof b.invoiceId === 'string' && UUIDRE.test(b.invoiceId) ? b.invoiceId : null,
    },
  } as const;
}

export function emptyProject(): Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'publicToken' | 'launchApprovedAt' | 'launchApprovedName'> {
  return {
    title: '',
    stage: 'onboarding',
    clientName: '',
    clientBusiness: '',
    clientEmail: '',
    clientPhone: '',
    stagingUrl: '',
    liveUrl: '',
    roundsIncluded: 2,
    launchChecklist: {},
    handover: {},
    notes: '',
    leadId: null,
    intakeId: null,
    invoiceId: null,
  };
}
