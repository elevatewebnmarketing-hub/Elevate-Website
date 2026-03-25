'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';
import { AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { SERVICE_OPTIONS, getServiceLabel } from '@/lib/services';

const caseStudies = [
  {
    client: 'Luxe Salon & Spa',
    service: 'website-development' as const,
    problem:
      'Low online visibility and no way for clients to book appointments easily.',
    solution:
      'Built a modern website with integrated online booking, SEO optimization, and a mobile-first design.',
    result: 'Increased website leads by 42% within 3 months.',
  },
  {
    client: 'Green Valley Restaurant',
    service: 'website-redesign' as const,
    problem: 'Outdated site hurting credibility and missing online ordering.',
    solution:
      'Complete redesign with online ordering system, menu updates, and reservation integration.',
    result: 'Online orders increased 3x in the first month.',
  },
  {
    client: 'TechFlow Consulting',
    service: 'landing-pages' as const,
    problem: 'Website was not generating qualified B2B leads.',
    solution:
      'Strategy-focused landing pages, clear value propositions, and lead magnets tailored to target audience.',
    result: 'Generated 15 qualified leads in the first 2 months.',
  },
  {
    client: 'Summit Fitness',
    service: 'website-development' as const,
    problem: 'Membership sign-ups were low and class schedules were hard to find.',
    solution:
      'Redesigned site with prominent class schedules, easy membership sign-up flows, and integrated payment options.',
    result: 'Membership sign-ups increased by 60% in 4 months.',
  },
  {
    client: 'Horizon Real Estate',
    service: 'seo-optimization' as const,
    problem: 'Property listings were buried and search was cumbersome.',
    solution:
      'Built custom property search with filters, virtual tour integration, and optimized listing pages for SEO.',
    result: 'Organic traffic up 85%, with 2x more inquiry form submissions.',
  },
  {
    client: 'Lagos Retail Growth',
    service: 'meta-ads' as const,
    problem:
      'Facebook and Instagram ads were getting clicks, but lead quality was inconsistent and tracking was unclear.',
    solution:
      'We validated Meta Pixel events, restructured the campaign objective for conversions, and ran structured creative tests across FB/IG placements. We also aligned landing page messaging with the ad promise.',
    result: 'Reduced cost per lead and increased qualified inquiries within 6–8 weeks.',
  },
  {
    client: 'Studio Brand Scaling',
    service: 'meta-ads' as const,
    problem:
      'Creative fatigue set in quickly, and performance dropped even when budgets stayed the same.',
    solution:
      'We implemented a creative testing cadence (new hooks, formats, and angles), kept audiences and placements focused, and refreshed landing page sections to maintain conversion rate as spend scaled.',
    result: 'Improved ROAS through better creative iteration and tighter on-site conversion alignment.',
  },
];

interface CaseStudiesProps {
  isStandalone?: boolean;
}

export default function CaseStudies({ isStandalone = false }: CaseStudiesProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const serviceParam = isStandalone ? searchParams.get('service') : null;

  const filteredStudies = serviceParam
    ? caseStudies.filter((s) => s.service === serviceParam)
    : caseStudies;

  function setServiceFilter(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set('service', slug);
    else params.delete('service');
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  }

  const Wrapper = isStandalone ? 'div' : SectionWrapper;
  const wrapperProps = isStandalone
    ? { className: 'py-24 bg-background dark:bg-slate-900' }
    : { id: 'case-studies', className: 'py-24 bg-background dark:bg-slate-900' };

  return (
    <Wrapper {...wrapperProps}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Case Studies
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl mx-auto sm:mx-0">
              See how we&apos;ve helped businesses grow online
            </p>
          </div>
          {!isStandalone && (
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline justify-center sm:justify-end"
            >
              View all case studies
              <ArrowRight size={20} />
            </Link>
          )}
        </motion.div>

        {isStandalone && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => setServiceFilter(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                !serviceParam
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-text/80 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              All
            </button>
            {SERVICE_OPTIONS.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setServiceFilter(s.slug)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                  serviceParam === s.slug
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-text/80 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-12">
          {filteredStudies.length === 0 ? (
            <div className="text-center py-16 text-text/70 dark:text-gray-400">
              No case studies found for this service. Try a different filter.
            </div>
          ) : filteredStudies.map((study, index) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-card-lg p-8 lg:p-12 shadow-soft border border-gray-100 dark:border-white/10 overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <h3 className="font-heading font-bold text-2xl text-primary dark:text-white">
                  {study.client}
                </h3>
                {study.service && (
                  <Link
                    href={`/case-studies?service=${study.service}`}
                    className="text-xs px-2 py-1 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded hover:bg-primary/20 dark:hover:bg-white/20 transition"
                  >
                    {getServiceLabel(study.service)}
                  </Link>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-red-500" size={24} />
                    <span className="font-heading font-semibold text-primary dark:text-white">
                      Problem
                    </span>
                  </div>
                  <p className="text-text/80 dark:text-gray-300 leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-accent" size={24} />
                    <span className="font-heading font-semibold text-primary dark:text-white">
                      Solution
                    </span>
                  </div>
                  <p className="text-text/80 dark:text-gray-300 leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-green-500" size={24} />
                    <span className="font-heading font-semibold text-primary dark:text-white">
                      Result
                    </span>
                  </div>
                  <p className="text-accent font-semibold leading-relaxed">
                    {study.result}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
