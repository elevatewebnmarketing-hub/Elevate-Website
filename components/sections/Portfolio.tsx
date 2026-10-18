'use client';

import { useRouter, usePathname } from 'next/navigation';
import portfolioData from '@/data/portfolio.json';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Monitor, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { SERVICE_OPTIONS, getServiceLabel } from '@/lib/services';

interface PortfolioItem {
  id: string;
  name: string;
  industry: string;
  description: string;
  image: string | null;
  url: string | null;
  featured: boolean;
  service?: string | null;
  problem?: string | null;
  solution?: string | null;
  screenshots?: string[];
  technologies?: string[];
  result?: string | null;
  ownerName?: string | null;
  ownerJob?: string | null;
}

// Managed in code: edit data/portfolio.json, not the admin panel.
const projects = portfolioData as PortfolioItem[];

function ProjectPlaceholder() {
  return (
    <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-t-card flex items-center justify-center">
      <Monitor className="text-primary/30 dark:text-white/30" size={64} />
    </div>
  );
}

interface PortfolioProps {
  showAll?: boolean;
  /** Read by the page on the server, so the list renders into the HTML. */
  service?: string | null;
}

export default function Portfolio({ showAll = false, service = null }: PortfolioProps) {
  const router = useRouter();
  const pathname = usePathname();
  const serviceParam = showAll ? service : null;
  // The standalone /portfolio page needs this as its one H1.
  const Heading = showAll ? 'h1' : 'h2';
  const CardHeading = showAll ? 'h2' : 'h3';


  const filteredProjects = serviceParam
    ? projects.filter((p) => p.service === serviceParam)
    : projects;
  const displayProjects = showAll ? filteredProjects : projects.slice(0, 6);

  function setServiceFilter(slug: string | null) {
    router.replace(slug ? `${pathname}?service=${slug}` : pathname);
  }

  return (
    <SectionWrapper id="portfolio" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div className="text-center sm:text-left">
            <Heading className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Our Portfolio
            </Heading>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl">
              Websites we&apos;ve built that drive results
            </p>
          </div>
          {!showAll && (
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline justify-center sm:justify-end"
            >
              View full portfolio
              <ArrowRight size={20} />
            </Link>
          )}
        </motion.div>

        {showAll && (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.length === 0 ? (
            <div className="col-span-full text-center py-16 text-text/70 dark:text-gray-400">
              No projects found for this service. Try a different filter.
            </div>
          ) : displayProjects.map((project, index) => (
            <Link key={project.id} href={`/portfolio/${project.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white dark:bg-slate-800 rounded-card-lg overflow-hidden shadow-soft hover:shadow-soft-xl border border-gray-100 dark:border-white/10 transition-shadow cursor-pointer block h-full"
              >
                <div className="overflow-hidden rounded-t-card aspect-video bg-gradient-to-br from-primary/5 to-accent/10 dark:from-primary/20 dark:to-accent/20">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} website homepage`}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Monitor className="text-primary/30 dark:text-white/30" size={64} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <p className="text-accent font-medium text-sm">
                      {project.industry}
                    </p>
                    {project.service && getServiceLabel(project.service) && (
                      <span className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded">
                        {getServiceLabel(project.service)}
                      </span>
                    )}
                  </div>
                  <CardHeading className="font-heading font-semibold text-xl text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </CardHeading>
                  <p className="text-text/80 dark:text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  {project.problem && (
                    <p className="text-text/60 dark:text-gray-400 text-xs mt-2 italic">
                      Solved: {project.problem}
                    </p>
                  )}
                  {(project.ownerName || project.ownerJob) && (
                    <p className="text-text/60 dark:text-gray-400 text-xs mt-1">
                      {[project.ownerName, project.ownerJob].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
