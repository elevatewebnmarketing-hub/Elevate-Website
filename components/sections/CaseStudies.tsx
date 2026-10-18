'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';
import { AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { SERVICE_OPTIONS, getServiceLabel } from '@/lib/services';

// Real Elevate projects only. Add a result here only when it can be checked (a live page, a dated screenshot, client permission).
const caseStudies = [
  {
    client: 'MR DGN Group, Asaba',
    service: 'website-redesign' as const,
    problem:
      'The group site was a JavaScript-only app. Search engines and AI crawlers received an empty page: 0 readable words, no heading and no links.',
    solution:
      'Rebuilt the site so every page is pre-rendered, with one clear home for the group’s subsidiaries (construction, real estate, entertainment) and direct contact paths for each.',
    result: 'The homepage now serves over 400 words of real content to crawlers and passes every blocking check in our rank-ready audit (17 October 2026).',
  },
  {
    client: 'MR DGN Construction & Developers',
    service: 'seo-optimization' as const,
    problem: 'A building materials supplier in Asaba and Okpanam needed buyers to find it when searching for cement, blocks and sand.',
    solution:
      'Built a server-rendered site around the searches buyers use, titled "Building Materials in Asaba", linked to its Google Business Profile.',
    result:
      'Over 600 words readable by search engines. In September 2026 a buyer found the company through ChatGPT and enquired about concrete blocks. On Google Maps it ranks #6 for "cement blocks in Asaba" (17 October 2026); profile work continues.',
  },
  {
    client: 'MansaLuxe Realty',
    service: 'website-design' as const,
    problem: 'A real estate company selling land and homes in Asaba and Abuja needed buyers to browse listings and enquire easily.',
    solution: 'Designed a property site with listings, property detail pages and enquiry paths for buyers.',
    result: 'Live at mansaluxerealty.mrdgngroup.com as the group’s real estate arm.',
  },
  {
    client: 'Runway Refined by Alek, UK',
    service: 'website-design' as const,
    problem: 'A UK-based model coach working with clients worldwide needed a professional home for packages, portfolio and resources.',
    solution: 'Designed and built the site with services, portfolio, journal, testimonials and FAQ, aimed at models at every stage.',
    result: 'Live at runwayrefinedbyalek.com. The client\'s Google review: “Amazing work, very professional! I’m pleased with my website.”',
    link: '/case-studies/runway-refined',
  },
  {
    client: 'SOCASEMP Initiative, Lagos',
    service: 'website-development' as const,
    problem: 'A Lagos-based non-profit raising leaders and entrepreneurs since 2014 needed a trustworthy way to take donations online.',
    solution: 'Built a donation platform on Cloudflare and Supabase, matched to the main site’s brand, with supporter accounts, an admin area and an ambassador programme.',
    result: 'Live at donate.socasemp.org.',
  },
  {
    client: 'Needool',
    service: 'website-development' as const,
    problem: 'A founder wanted a global skills directory and marketplace, not just a brochure site.',
    solution: 'Built a full web app with a public site, an admin panel and a separate backend.',
    result: 'Live at needool.com.',
  },
];

interface CaseStudiesProps {
  isStandalone?: boolean;
  /** Read by the page on the server: useSearchParams here would stop the list rendering into the HTML. */
  service?: string | null;
}

export default function CaseStudies({ isStandalone = false, service = null }: CaseStudiesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const serviceParam = isStandalone ? service : null;
  // The standalone /case-studies page needs this as its one H1.
  const Heading = isStandalone ? 'h1' : 'h2';
  const CardHeading = isStandalone ? 'h2' : 'h3';

  const filteredStudies = serviceParam
    ? caseStudies.filter((s) => s.service === serviceParam)
    : caseStudies;

  function setServiceFilter(slug: string | null) {
    router.replace(slug ? `${pathname}?service=${slug}` : pathname);
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
            <Heading className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Case Studies
            </Heading>
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
                <CardHeading className="font-heading font-bold text-2xl text-primary dark:text-white">
                  {study.client}
                </CardHeading>
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
                  {'link' in study && study.link && (
                    <Link href={study.link} className="mt-3 text-primary dark:text-white font-medium hover:text-accent">
                      Read the full case study →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
