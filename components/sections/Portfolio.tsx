'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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

const defaultProjects: PortfolioItem[] = [
  { id: '1', name: 'MR DGN Group', industry: 'Business & Consulting', description: 'Corporate website for MR DGN Group—a conglomerate driving innovation across construction, entertainment, and real estate. Features portfolio showcase, subsidiary links, media section, and contact flows.', image: '/images/portfolio/mrdn-group-logo.png', url: 'https://mrdgngroup.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { id: '2', name: 'MR DGN Construction', industry: 'Construction', description: 'Building materials supplier and construction services website for MR DGN Construction and Developers Limited in Asaba. Products catalog, project gallery, services, and WhatsApp ordering.', image: '/images/portfolio/mrdn-construction-logo.png', url: 'https://construction.mrdgngroup.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { id: '3', name: 'Mansa Luxe Realty', industry: 'Real Estate', description: 'Premium luxury real estate website for Mansa Luxe Realty Limited—curated properties, consultation booking, and trust signals for Nigeria\'s high-end property market.', image: '/images/portfolio/mansa-luxe-realty-logo.png', url: 'https://mansaluxerealty.mrdgngroup.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { id: '4', name: 'BSG Beelicious Signatures Global', industry: 'Luxury Retail & E-commerce', description: 'E-commerce and brand site for BSG Beelicious Signatures Global—luxury fragrances and home scents. Product collections, curated shopping experience, and newsletter community.', image: '/images/portfolio/experience-bsg-logo.png', url: 'https://experiencebsg.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase'] },
  { id: '5', name: 'TMM Scholars', industry: 'Education & Non-profit', description: 'Education and scholarship program site for The Mighty Men Scholars Program. Application flow, eligibility criteria, 5-step selection process, and contact via WhatsApp and email.', image: '/images/portfolio/tmm-scholars-logo.png', url: 'https://TMMscholars.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { id: '6', name: 'Trade with MRK', industry: 'Trading & Finance', description: 'Professional crypto and forex trading mentorship platform. Free resources, tools, blog, consultation booking, and partner exchange recommendations for retail traders.', image: '/images/portfolio/trade-with-mrk-logo.png', url: 'https://TradewithMRk.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { id: '7', name: 'FP Conglomerate', industry: 'Business & Consulting', description: 'Full-stack marketing and corporate website for FP Conglomerate — lead capture, staff admin portal, blog, careers, and portfolio content powered by a custom API backend.', image: null, url: 'https://www.fpconglomerate.com', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Fastify', 'PostgreSQL'] },
  { id: '8', name: 'Mama Onome Natural Health', industry: 'Health & Wellness', description: 'Clean, elegant website for a natural health and wellness brand — showcasing products and services with a calm, trust-building design built for her target audience.', image: null, url: 'https://mama-onome.vercel.app', featured: true, service: 'website-development', technologies: ['HTML', 'CSS', 'JavaScript', 'Jinja2'] },
  { id: '9', name: 'Runway Refined by Alek', industry: 'Fashion & Lifestyle', description: 'Premium fashion brand website for Runway Refined by Alek — editorial design, collection showcases, media gallery, and brand storytelling for a modern luxury audience.', image: null, url: 'https://runwayrefinedbyalek.com', featured: true, service: 'website-development', technologies: ['React', 'TanStack Start', 'TypeScript', 'Tailwind CSS', 'Cloudinary'] },
  { id: '10', name: 'NovaTrade', industry: 'Trading & Finance', description: 'Full-featured crypto and stock trading platform UI — spot trading, margin, copy trading, bot trading, market data, wallet, and user dashboard. A showcase of Elevate\'s fintech capability.', image: null, url: 'https://novatrade-test.vercel.app', featured: true, service: 'website-development', technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'] },
];

function ProjectPlaceholder() {
  return (
    <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-t-card flex items-center justify-center">
      <Monitor className="text-primary/30 dark:text-white/30" size={64} />
    </div>
  );
}

interface PortfolioProps {
  showAll?: boolean;
}

export default function Portfolio({ showAll = false }: PortfolioProps) {
  const [projects, setProjects] = useState<PortfolioItem[]>(defaultProjects);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const serviceParam = showAll ? searchParams.get('service') : null;

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && data.length > 0 && setProjects(data))
      .catch(() => {});
  }, []);

  const filteredProjects = serviceParam
    ? projects.filter((p) => p.service === serviceParam)
    : projects;
  const displayProjects = showAll ? filteredProjects : projects.slice(0, 6);

  function setServiceFilter(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set('service', slug);
    else params.delete('service');
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
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
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4">
              Our Portfolio
            </h2>
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
                      alt={project.name}
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
                  <h3 className="font-heading font-semibold text-xl text-primary dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
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
