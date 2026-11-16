import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import TikTokViewContent from '@/components/analytics/TikTokViewContent';
import { getServiceBySlug, type ServicePageConfig, type ServiceDetail, type DetailSection } from '@/lib/services-content';
import { siteConfig } from '@/lib/site-config';
import { formatInline } from '@/lib/blog-utils';
import SearchConsoleEvidence from '@/components/sections/SearchConsoleEvidence';
import AuthorBio from '@/components/sections/AuthorBio';
import GoogleMapEmbed from '@/components/sections/GoogleMapEmbed';

const fmtDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

interface Props {
  config: ServicePageConfig;
  detail: ServiceDetail;
  /** Middle breadcrumb; location pages pass null (they have no hub page yet). */
  parent?: { name: string; href: string } | null;
}

const DEFAULT_TRUST = ['Office in Asaba, serving Abuja and all of Nigeria', 'Working since 2023', '50+ websites built', 'Replies within 48 hours'];
const h2 ='font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-5';
const body = 'text-text/80 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-[68ch]';
const sectionCls = 'scroll-mt-32';
const card = 'bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6';

function ContactButtons({ service, onDark = false }: { service: string; onDark?: boolean }) {
  const message = encodeURIComponent(`Hi Elevate, I'd like to ask about ${service}.`);
  const secondaryText = onDark ? 'text-white border-white/30' : 'text-primary dark:text-white border-gray-200 dark:border-white/20';
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`}
        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 transition-colors"
      >
        <MessageCircle size={20} /> WhatsApp us
      </a>
      <a
        href={`tel:+${siteConfig.whatsappNumber}`}
        className={`inline-flex items-center justify-center gap-2 px-6 py-4 border-2 ${secondaryText} font-heading font-semibold rounded-xl hover:border-accent hover:text-accent transition-colors`}
      >
        <Phone size={20} /> Call {siteConfig.phone}
      </a>
      <Link
        href="/get-quote"
        className={`inline-flex items-center justify-center gap-2 px-6 py-4 ${onDark ? 'text-white' : 'text-primary dark:text-white'} font-heading font-semibold hover:text-accent transition-colors`}
      >
        Request a quote <ArrowRight size={20} />
      </Link>
    </div>
  );
}

export default function ServiceDetailPage({
  config,
  detail,
  parent = { name: 'Services', href: '/services' },
}: Props) {
  const heading = (key: DetailSection, fallback: string) => detail.headings?.[key] ?? fallback;
  /** An empty heading override means "no heading": the section continues the one above it. */
  const H2 = ({ text }: { text: string }) => (text ? <h2 className={h2}>{text}</h2> : null);
  const paras = (list?: string[], className = 'space-y-4 mb-6') =>
    list && list.length > 0 ? (
      <div className={className}>
        {list.map((p) => (
          <p key={p} className={body} dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
        ))}
      </div>
    ) : null;
  const intro = (key: DetailSection) => paras(detail.intros?.[key]);
  const outro = (key: DetailSection) => paras(detail.outros?.[key], 'space-y-4 mt-6');

  const related = detail.related
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServicePageConfig => s !== null);

  return (
    <>
      <TikTokViewContent contentName={config.title} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <article className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
          <header className={`grid ${detail.keyTakeaways ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]' : ''} gap-10 lg:gap-14 items-start pb-14 lg:pb-16 border-b border-gray-200 dark:border-white/10`}>
            <div>
            <nav aria-label="Breadcrumb" className="text-sm text-text/60 dark:text-gray-400 mb-6">
              <Link href="/" className="hover:text-accent">Home</Link>
              <span className="mx-2">/</span>
              {parent && (
                <>
                  <Link href={parent.href} className="hover:text-accent">{parent.name}</Link>
                  <span className="mx-2">/</span>
                </>
              )}
              <span aria-current="page">{config.title}</span>
            </nav>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
              {detail.h1}
            </h1>
            <p className="text-accent font-heading font-semibold text-lg mb-3">{config.subtitle}</p>
            <p className="text-sm text-text/60 dark:text-gray-400 mb-6">
              By <Link href="/about" className="hover:text-accent">Ufuoma Onakpoyan</Link>, founder
              {detail.updated && <> · Updated {fmtDate(detail.updated)}</>}
            </p>
            <div className="space-y-4 mb-8">
              {detail.intro.map((p) => (
                <p key={p} className={body} dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
              ))}
            </div>
            <ContactButtons service={config.title} />
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text/70 dark:text-gray-400">
              {(detail.trust ?? DEFAULT_TRUST).map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Check size={14} className="text-accent" aria-hidden />{t}</li>
              ))}
            </ul>
            </div>
            {detail.keyTakeaways && (
              <div className="p-6 lg:p-7 rounded-card-lg bg-primary text-white lg:mt-12 shadow-soft-lg">
                <p className="font-heading font-semibold text-xl text-white mb-4">The short answer</p>
                <ul className="space-y-3 [&_a]:text-accent">
                  {detail.keyTakeaways.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-white/90 leading-relaxed">
                      <Check size={18} className="text-accent mt-1 flex-shrink-0" aria-hidden />
                      <span dangerouslySetInnerHTML={{ __html: formatInline(t) }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem] gap-12 xl:gap-16 pt-14 lg:pt-16">
          <div className="min-w-0 space-y-16">

          {detail.problems.length > 0 && (
          <section id="who" className={sectionCls}>
              <H2 text={heading('problems', 'Who this is for')} />
              {intro('problems')}
              <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {detail.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-text/80 dark:text-gray-300 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden />
                    <span dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="included" className={sectionCls}>
            <H2 text={heading('included', "What's included")} />
            {intro('included')}
            <div className={`grid sm:grid-cols-2 ${detail.included.length % 3 === 0 ? 'xl:grid-cols-3' : 'sm:[&>*:last-child:nth-child(odd)]:col-span-2'} gap-4`}>
              {detail.included.map((item) => (
                <div key={item.title} className={card}>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2 flex items-start gap-2">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    {item.title}
                  </h3>
                  <p className="text-sm text-text/80 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(item.detail) }} />
                </div>
              ))}
            </div>
            {outro('included')}
          </section>

          {detail.compare && (
            <section className={detail.compare.heading ? undefined : '!mt-8'}>
              <H2 text={detail.compare.heading} />
              <div className="overflow-x-auto rounded-card-lg border border-gray-200 dark:border-white/10">
                <table className="w-full min-w-[34rem] text-left text-sm sm:text-base">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      {detail.compare.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-heading font-semibold text-primary dark:text-white">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.compare.rows.map((row) => (
                      <tr key={row.join('|')} className="border-t border-gray-100 dark:border-white/5 align-top">
                        {row.map((c, i) => (
                          <td key={i} className="px-4 py-3 text-text/80 dark:text-gray-300">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section id="process" className={sectionCls}>
            <H2 text={heading('process', 'How it works')} />
            {intro('process')}
            <ol className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              {detail.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-white font-heading font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-primary dark:text-white">{step.title}</h3>
                    <p className="text-text/80 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(step.detail) }} />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="pricing" className={`${sectionCls} ${heading('pricing', 'Pricing') ? '' : '!mt-8'}`}>
            <H2 text={heading('pricing', 'Pricing')} />
            {intro('pricing')}
            <p className={`${body} mb-4`}>{detail.pricing.summary}</p>
            {detail.pricing.table && (
              <div className="overflow-x-auto rounded-card-lg border border-gray-200 dark:border-white/10 mb-4">
                <table className="w-full text-left text-sm sm:text-base">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      {detail.pricing.table.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-heading font-semibold text-primary dark:text-white">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.pricing.table.rows.map((row) => (
                      <tr key={row.join('|')} className="border-t border-gray-100 dark:border-white/5 align-top">
                        {row.map((c, i) => (
                          <td key={i} className={`px-4 py-3 ${i === 0 ? 'text-primary dark:text-white font-medium' : 'text-text/80 dark:text-gray-300'}`}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <ul className={detail.pricing.points.length ? 'space-y-2 mb-4' : 'hidden'}>
              {detail.pricing.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-text/80 dark:text-gray-300">
                  <Check className="text-accent flex-shrink-0 mt-1" size={16} />
                  <span dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
                </li>
              ))}
            </ul>
            {outro('pricing')}
            {detail.pricing.figure && (
              <figure className="my-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={detail.pricing.figure.src}
                  alt={detail.pricing.figure.alt}
                  width={detail.pricing.figure.width}
                  height={detail.pricing.figure.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-card-lg border border-gray-200 dark:border-white/10"
                />
              </figure>
            )}
            <Link href="/pricing" className="text-accent font-medium hover:underline">
              See all packages and prices
            </Link>
          </section>

          <section id="proof" className={sectionCls}>
            <H2 text={heading('proof', 'Recent work')} />
            {intro('proof')}
            <div className={`grid ${detail.proof.length > 1 ? 'md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2' : ''} gap-4`}>
              {detail.proof.map((p) => (
                <div key={p.name} className={card}>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener" className="hover:text-accent">
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <p className="text-text/80 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(p.detail) }} />
                </div>
              ))}
            </div>
            {detail.evidenceIds?.map((id) => <div key={id} className="mt-4"><SearchConsoleEvidence id={id} /></div>)}
            {outro('proof')}
            <p className="mt-6 text-text/80 dark:text-gray-300">
              Want to know where your business stands?{' '}
              <Link href="/ai-visibility-check" className="text-accent font-semibold hover:underline">
                Run the free AI visibility check
              </Link>{' '}
              or send your business name on WhatsApp and we’ll look for you.
            </p>
          </section>

          {detail.localContext.length > 0 && (
          <section id="local" className={sectionCls}>
              <H2 text={detail.localHeading ?? heading('local', 'Working with businesses in Abuja')} />
              {intro('local')}
              <div className="space-y-4">
                {detail.localContext.map((p) => (
                  <p key={p} className={body} dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
                ))}
              </div>
              {detail.showMap && <GoogleMapEmbed className="mt-6" />}
            </section>
          )}

          <section id="why" className={sectionCls}>
            <H2 text={heading('whyUs', 'Why work with us')} />
            {intro('whyUs')}
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {detail.whyUs.map((p) => (
                <li key={p} className="flex items-start gap-3 text-text/80 dark:text-gray-300 leading-relaxed">
                  <Check className="text-accent flex-shrink-0 mt-1.5" size={18} />
                  <span dangerouslySetInnerHTML={{ __html: formatInline(p) }} />
                </li>
              ))}
            </ul>
            {outro('whyUs')}
          </section>

          <section id="faq" className={sectionCls}>
            <H2 text={heading('faqs', 'Frequently asked questions')} />
            {intro('faqs')}
            <div className="space-y-3">
              {detail.faqs.map((f) => (
                <details key={f.q} className={`${card} group`}>
                  <summary className="font-heading font-semibold text-primary dark:text-white cursor-pointer">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-text/80 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(f.a) }} />
                </details>
              ))}
            </div>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className={h2}>Related services</h2>
              <ul className={`grid sm:grid-cols-2 ${related.length % 3 === 0 ? 'xl:grid-cols-3' : 'sm:[&>*:last-child:nth-child(odd)]:col-span-2'} gap-3`}>
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className={`${card} flex items-center justify-between hover:border-accent transition-colors`}
                    >
                      <span className="font-heading font-semibold text-primary dark:text-white">
                        {parent === null ? r.title : r.detail?.h1 ?? r.title}
                      </span>
                      <ArrowRight className="text-accent" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {detail.nearby && detail.nearby.length > 0 && (
            <section>
              <h2 className={h2}>Areas we cover</h2>
              <ul className="flex flex-wrap gap-3">
                {detail.nearby.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="inline-block px-4 py-2 rounded-xl border border-gray-200 dark:border-white/20 text-primary dark:text-white hover:border-accent hover:text-accent transition-colors">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="p-8 bg-primary rounded-card-lg">
            <h2 className="font-heading font-bold text-2xl text-white mb-3">{detail.cta?.heading ?? `Talk to us about ${config.title}`}</h2>
            {detail.cta?.text && <p className="text-white/90 mb-3">{detail.cta.text}</p>}
            <p className="text-white/80 mb-6">
              {siteConfig.companyName}, office in Asaba, serving Abuja and all of Nigeria. Phone and WhatsApp {siteConfig.phone}. Email{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent hover:underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
            <ContactButtons service={config.title} onDark />
          </section>
          <AuthorBio />
          </div>
          <aside className="hidden lg:block" aria-label="Contact and page sections">
            <div className="sticky top-28 space-y-6">
              <div className={card}>
                <p className="font-heading font-semibold text-lg text-primary dark:text-white mb-1">Talk to us</p>
                <p className="text-sm text-text/70 dark:text-gray-400 mb-4">We reply within 48 hours, usually the same day on WhatsApp.</p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi Elevate, I'd like to ask about ${config.title}.`)}`}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                  >
                    <MessageCircle size={18} aria-hidden /> WhatsApp us
                  </a>
                  <a
                    href={`tel:+${siteConfig.whatsappNumber}`}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 border border-gray-200 dark:border-white/20 text-primary dark:text-white font-heading font-semibold rounded-xl hover:border-accent hover:text-accent transition-colors"
                  >
                    <Phone size={18} aria-hidden /> {siteConfig.phone}
                  </a>
                  <Link href="/get-quote" className="inline-flex items-center justify-center gap-1.5 min-h-[44px] text-sm font-semibold text-primary dark:text-white hover:text-accent">
                    Request a quote <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
              <nav aria-label="On this page" className="px-1">
                <p className="font-heading font-semibold text-sm text-primary dark:text-white mb-3">On this page</p>
                <ul className="space-y-2 text-sm border-l border-gray-200 dark:border-white/10">
                  {[
                    detail.problems.length > 0 && ['who', heading('problems', 'Who this is for')],
                    ['included', heading('included', "What's included")],
                    ['process', heading('process', 'How it works')],
                    heading('pricing', 'Pricing') && ['pricing', heading('pricing', 'Pricing')],
                    ['proof', heading('proof', 'Recent work')],
                    detail.localContext.length > 0 && ['local', detail.localHeading ?? heading('local', 'Working with businesses in Abuja')],
                    ['why', heading('whyUs', 'Why work with us')],
                    ['faq', heading('faqs', 'Frequently asked questions')],
                  ]
                    .filter((x): x is [string, string] => Array.isArray(x) && Boolean(x[1]))
                    .map(([id, label]) => (
                      <li key={id}>
                        <a href={`#${id}`} className="block -ml-px pl-3 border-l border-transparent text-text/70 dark:text-gray-400 hover:text-accent hover:border-accent leading-snug">
                          {label}
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
