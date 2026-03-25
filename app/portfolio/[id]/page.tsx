import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getPortfolioItemById } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Monitor, ExternalLink } from 'lucide-react';
import { getServiceLabel } from '@/lib/services';
import { DeviceMockup } from '@/components/ui/DeviceMockup';

const BASE_URL = 'https://www.elevatewebandmarketing.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getPortfolioItemById(id);
  if (!item) return { title: 'Project Not Found' };
  const description = item.description.slice(0, 160);
  const url = `${BASE_URL}/portfolio/${item.id}`;
  return {
    title: item.name,
    description: `${item.industry}. ${description}`,
    openGraph: {
      title: item.name,
      description: `${item.industry}. ${description}`,
      url,
      type: 'website',
      images: item.image ? [{ url: item.image, width: 1200, height: 630, alt: item.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: item.name,
      description: `${item.industry}. ${description}`,
      images: item.image ? [item.image] : undefined,
    },
    alternates: { canonical: url },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPortfolioItemById(id);

  if (!item) {
    notFound();
  }

  const screenshots = item.screenshots && item.screenshots.length > 0 ? item.screenshots : [];
  const technologies = item.technologies && item.technologies.length > 0 ? item.technologies : [];

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-accent hover:underline mb-8 font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>

          {/* Project hero / logo */}
          <div className="rounded-card-lg overflow-hidden shadow-soft-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-800 mb-10">
            <div className="aspect-video relative bg-gradient-to-br from-primary/5 to-accent/10 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center p-8">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.name} logo`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Monitor className="text-primary/30 dark:text-white/30" size={80} />
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-accent font-medium text-sm">{item.industry}</p>
                {item.service && getServiceLabel(item.service) && (
                  <Link
                    href={`/portfolio?service=${item.service}`}
                    className="text-xs px-2 py-1 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded hover:bg-primary/20 dark:hover:bg-white/20 transition"
                  >
                    {getServiceLabel(item.service)}
                  </Link>
                )}
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-primary dark:text-white mb-3">
                {item.name}
              </h1>
              <p className="text-text/80 dark:text-gray-300 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Problem */}
          {item.problem && (
            <section className="mb-10" id="problem">
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                Problem
              </h2>
              <p className="text-text/80 dark:text-gray-300 leading-relaxed">
                {item.problem}
              </p>
            </section>
          )}

          {/* Our solution */}
          {item.solution && (
            <section className="mb-10" id="solution">
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                Our solution
              </h2>
              <p className="text-text/80 dark:text-gray-300 leading-relaxed">
                {item.solution}
              </p>
            </section>
          )}

          {/* Live website preview (embedded iframe) */}
          {item.url && (
            <section className="mb-10" id="live-preview">
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-4">
                Live website preview
              </h2>
              <div className="rounded-card-lg overflow-hidden shadow-soft-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-800">
                <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-slate-800/80">
                  <span className="text-sm text-text/70 dark:text-gray-400 truncate font-mono">
                    {item.url}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
                  >
                    Open in new tab
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="relative w-full bg-gray-100 dark:bg-slate-700" style={{ minHeight: '500px' }}>
                  <iframe
                    src={item.url}
                    title={`Live preview of ${item.name}`}
                    width="100%"
                    height="500"
                    loading="lazy"
                    className="w-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    allow="fullscreen"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Screenshots with device mockups */}
          {screenshots.length > 0 && (
            <section className="mb-10" id="screenshots">
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-6">
                Screenshots
              </h2>
              <div className="grid gap-8">
                {screenshots.map((url, i) => (
                  <DeviceMockup
                    key={i}
                    src={url}
                    alt={`${item.name} screenshot ${i + 1}`}
                    variant={i % 2 === 0 ? 'browser' : 'laptop'}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Technologies used */}
          {technologies.length > 0 && (
            <section className="mb-10" id="technologies">
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-4">
                Technologies used
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 dark:bg-white/10 text-primary dark:text-white text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Live website CTA */}
          {item.url && (
            <section className="mb-10">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-heading font-semibold rounded-xl shadow-soft hover:bg-accent/90 transition-colors"
              >
                Visit live website
                <ExternalLink size={18} />
              </a>
            </section>
          )}

          {/* Results */}
          {item.result && (
            <section className="mb-10" id="results">
              <h2 className="font-heading font-semibold text-xl text-primary dark:text-white mb-3">
                Results
              </h2>
              <p className="text-accent font-medium leading-relaxed">
                {item.result}
              </p>
            </section>
          )}

          {(item.ownerName || item.ownerJob) && (
            <p className="text-text/60 dark:text-gray-400 text-sm">
              {[item.ownerName, item.ownerJob].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
