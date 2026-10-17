import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import TikTokViewContent from '@/components/analytics/TikTokViewContent';
import { getServiceBySlug, type ServicePageConfig, type ServiceDetail } from '@/lib/services-content';
import { siteConfig } from '@/lib/site-config';

interface Props {
  config: ServicePageConfig;
  detail: ServiceDetail;
  /** Middle breadcrumb; location pages pass null (they have no hub page yet). */
  parent?: { name: string; href: string } | null;
}

const h2 = 'font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-5';
const body = 'text-text/80 dark:text-gray-300 text-base sm:text-lg leading-relaxed';
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
  const related = detail.related
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServicePageConfig => s !== null);

  return (
    <>
      <TikTokViewContent contentName={config.title} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 min-h-screen bg-background dark:bg-slate-900">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <header>
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
            <p className="text-accent font-heading font-semibold text-lg mb-6">{config.subtitle}</p>
            <div className="space-y-4 mb-8">
              {detail.intro.map((p) => (
                <p key={p} className={body}>{p}</p>
              ))}
            </div>
            <ContactButtons service={config.title} />
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text/70 dark:text-gray-400">
              <li>Based in Abuja, serving all of Nigeria</li>
              <li>Working since 2023</li>
              <li>50+ websites built</li>
              <li>Replies within 48 hours</li>
            </ul>
          </header>

          <section>
            <h2 className={h2}>Who this is for</h2>
            <ul className="space-y-3">
              {detail.problems.map((p) => (
                <li key={p} className={`flex items-start gap-3 ${body}`}>
                  <span className="text-accent mt-1">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={h2}>What's included</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {detail.included.map((item) => (
                <div key={item.title} className={card}>
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-2 flex items-start gap-2">
                    <Check className="text-accent flex-shrink-0 mt-1" size={18} />
                    {item.title}
                  </h3>
                  <p className="text-sm text-text/80 dark:text-gray-300 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={h2}>How it works</h2>
            <ol className="space-y-5">
              {detail.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-white font-heading font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-primary dark:text-white">{step.title}</h3>
                    <p className="text-text/80 dark:text-gray-300 leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className={h2}>Pricing</h2>
            <p className={`${body} mb-4`}>{detail.pricing.summary}</p>
            <ul className="space-y-2 mb-4">
              {detail.pricing.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-text/80 dark:text-gray-300">
                  <Check className="text-accent flex-shrink-0 mt-1" size={16} />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="text-accent font-medium hover:underline">
              See all packages and prices
            </Link>
          </section>

          <section>
            <h2 className={h2}>Recent work</h2>
            <div className="space-y-4">
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
                  <p className="text-text/80 dark:text-gray-300 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className={h2}>{detail.localHeading ?? 'Working with businesses in Abuja'}</h2>
            <div className="space-y-4">
              {detail.localContext.map((p) => (
                <p key={p} className={body}>{p}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className={h2}>Why work with us</h2>
            <ul className="space-y-3">
              {detail.whyUs.map((p) => (
                <li key={p} className={`flex items-start gap-3 ${body}`}>
                  <Check className="text-accent flex-shrink-0 mt-1.5" size={18} />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={h2}>Frequently asked questions</h2>
            <div className="space-y-3">
              {detail.faqs.map((f) => (
                <details key={f.q} className={`${card} group`}>
                  <summary className="font-heading font-semibold text-primary dark:text-white cursor-pointer">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-text/80 dark:text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className={h2}>Related services</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className={`${card} flex items-center justify-between hover:border-accent transition-colors`}
                    >
                      <span className="font-heading font-semibold text-primary dark:text-white">
                        {r.detail?.h1 ?? r.title}
                      </span>
                      <ArrowRight className="text-accent" size={18} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="p-8 bg-primary rounded-card-lg">
            <h2 className="font-heading font-bold text-2xl text-white mb-3">Talk to us about {config.title.toLowerCase()}</h2>
            <p className="text-white/80 mb-6">
              {siteConfig.companyName}, Abuja, Nigeria. Phone and WhatsApp {siteConfig.phone}. Email{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent hover:underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
            <ContactButtons service={config.title} onDark />
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
