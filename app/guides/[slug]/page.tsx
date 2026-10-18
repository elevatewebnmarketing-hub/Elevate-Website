import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthorBio from '@/components/sections/AuthorBio';
import { ORGANIZATION_ID } from '@/components/seo/JsonLd';
import { formatInline } from '@/lib/blog-utils';
import { getGuide, guides } from '@/lib/guides';
import { siteConfig } from '@/lib/site-config';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    // Guide titles are long questions, so the brand suffix is dropped to keep them under ~60 characters.
    title: { absolute: guide.title },
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { type: 'article', title: guide.title, description: guide.description, url: path, images: ['/opengraph-image'] },
    twitter: { title: guide.title, description: guide.description },
  };
}

const h2 = 'font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mt-12 mb-4';
const p = 'text-text/80 dark:text-gray-300 text-lg leading-relaxed mb-4';
const html = (text: string) => ({ __html: formatInline(text) });

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const published = new Date(guide.published).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      url,
      datePublished: guide.published,
      dateModified: guide.published,
      image: `${SITE_URL}/opengraph-image`,
      author: {
        '@type': 'Person',
        name: 'Ufuoma Onakpoyan',
        jobTitle: 'Founder, Elevate Web & Marketing',
        url: `${SITE_URL}/about`,
        image: `${SITE_URL}/images/founder-ufuoma-onakpoyan.png`,
      },
      publisher: { '@id': ORGANIZATION_ID },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: guide.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
  const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hi Elevate, I’d like a free website check. My website is: '
  )}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <Header />
      <main className="pt-32 sm:pt-36 md:pt-40 pb-20 bg-background dark:bg-slate-900">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-text/60 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span aria-current="page">{guide.title}</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-6">{guide.h1}</h1>
          <p className="text-sm text-text/60 dark:text-gray-400 mb-8">By Ufuoma Onakpoyan · Published {published}</p>

          {guide.intro.map((t) => (
            <p key={t} className={p} dangerouslySetInnerHTML={html(t)} />
          ))}

          {guide.sections.map((s) => (
            <section key={s.h2}>
              <h2 className={h2}>{s.h2}</h2>
              {s.paragraphs?.map((t) => (
                <p key={t} className={p} dangerouslySetInnerHTML={html(t)} />
              ))}
              {s.list && (
                <ul className="space-y-3 mb-4">
                  {s.list.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-text/80 dark:text-gray-300 text-lg">
                      <Check className="text-accent flex-shrink-0 mt-1.5" size={18} aria-hidden />
                      <span dangerouslySetInnerHTML={html(t)} />
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((t) => (
                <p key={t} className={p} dangerouslySetInnerHTML={html(t)} />
              ))}
            </section>
          ))}

          <section className="mt-12 p-8 bg-primary rounded-card-lg">
            <h2 className="font-heading font-bold text-2xl text-white mb-3">{guide.cta.heading}</h2>
            <p className="text-white/80 mb-6">{guide.cta.text}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsapp}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors"
              >
                <MessageCircle size={20} /> WhatsApp {siteConfig.phone}
              </a>
              <Link
                href={guide.cta.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-white font-heading font-semibold hover:text-accent transition-colors"
              >
                {guide.cta.label} <ArrowRight size={20} />
              </Link>
            </div>
          </section>

          <h2 className={h2}>Frequently asked questions</h2>
          <div className="space-y-3">
            {guide.faqs.map((f) => (
              <details key={f.q} className="bg-white dark:bg-slate-800 rounded-card-lg border border-gray-200 dark:border-white/10 p-6">
                <summary className="font-heading font-semibold text-primary dark:text-white cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-text/80 dark:text-gray-300 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <AuthorBio />

          <p className="text-sm text-text/60 dark:text-gray-400 mt-8">
            Sources:{' '}
            {guide.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && '; '}
                <a href={s.url} className="underline" rel="noopener">{s.label}</a>
              </span>
            ))}
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
