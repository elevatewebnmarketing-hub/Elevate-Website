import Link from 'next/link';
import { ArrowRight, FileText, Globe, MapPin, Megaphone, RefreshCw, Search, ShoppingCart, Wrench } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

const services = [
  { icon: Globe, title: 'Business Websites', href: '/services/website-design', description: 'Fast, mobile-first websites with a page for every service, built to bring calls and WhatsApp enquiries.' },
  { icon: RefreshCw, title: 'Website Redesigns', href: '/services/website-redesign', description: 'Old, slow or invisible sites rebuilt so Google, AI tools and customers can read them.' },
  { icon: ShoppingCart, title: 'E-commerce Stores', href: '/services/ecommerce', description: 'Online shops with product pages, checkout, Paystack or Flutterwave, and order alerts.' },
  { icon: FileText, title: 'Landing Pages', href: '/services/landing-pages', description: 'One offer, one page, built to turn ad and social clicks into enquiries.' },
  { icon: MapPin, title: 'Local SEO', href: '/services/local-seo', description: 'Google, Bing, Apple and Facebook profiles aligned with your website, plus review training.' },
  { icon: Search, title: 'Google Ads', href: '/services/google-ads', description: 'Search and Maps ads for the searches that bring buyers, tracked to real enquiries.' },
  { icon: Megaphone, title: 'Facebook & Instagram Ads', href: '/services/facebook-instagram-ads', description: 'Ads, copy and short videos aimed at people in the areas you serve.' },
  { icon: Wrench, title: 'Website Care Plans', href: '/services/website-maintenance', description: 'Hosting, updates, backups and small changes every month, so the site keeps working.' },
];

export default function Services() {
  return (
    <SectionWrapper id="services" className="py-16 lg:py-20 bg-background dark:bg-slate-900">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl motion-accent text-primary dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg max-w-2xl">
              Websites, local SEO and ads that work together, so the people searching for what you sell
              find you and get in touch.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent font-heading font-semibold hover:underline justify-center sm:justify-end"
          >
            View all services
            <ArrowRight size={20} />
          </Link>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-card-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-200 dark:bg-white/10">
          {services.map((service) => (
            <li key={service.title} className="bg-white dark:bg-slate-800">
              <Link
                href={service.href}
                className="presentation-service-link group flex h-full flex-col gap-3 p-6 lg:p-7 hover:bg-accent/5 focus-visible:bg-accent/5 transition-colors"
              >
                <service.icon className="text-accent" size={26} aria-hidden />
                <span className="font-heading font-semibold text-lg text-primary dark:text-white group-hover:text-accent transition-colors">
                  {service.title}
                </span>
                <span className="text-text/80 dark:text-gray-300 text-[0.95rem] leading-relaxed">{service.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
