import { Star } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { siteConfig } from '@/lib/site-config';

interface Testimonial {
  id: string;
  name: string;
  business: string;
  review: string;
}

// Real 5-star Google reviews, quoted word for word. Add new ones only from the Google profile.
const defaultTestimonials: Testimonial[] = [
  {
    id: 'g-mrdgn',
    name: 'MrDGN',
    business: 'MR DGN Group · Google review',
    review: 'Multiple Website projects well done',
  },
  {
    id: 'g-bsg',
    name: 'Experience Bsg',
    business: 'Experience BSG · Google review',
    review: 'I love the website they created for my business. Very professional',
  },
  {
    id: 'g-alek',
    name: 'Alek Malek',
    business: 'Runway Refined by Alec · Google review',
    review: 'Amazing work, very professional! I’m pleased with my website',
  },
];

export default function Testimonials() {
  // Managed in code (defaultTestimonials above), not the admin panel.
  const testimonials = defaultTestimonials;
  return (
    <SectionWrapper id="testimonials" className="py-16 lg:py-20 bg-background dark:bg-slate-900">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-3">
              What Our Clients Say
            </h2>
            <p className="text-text/80 dark:text-gray-300 text-lg">Real Google reviews, quoted word for word.</p>
          </div>
          <a
            href={siteConfig.googleProfileUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 font-heading font-semibold text-accent hover:underline"
          >
            See all reviews on Google
          </a>
        </div>
        <ul className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <li key={t.id}>
              <figure className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-card-lg p-7 border border-gray-200 dark:border-white/10">
                <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} className="fill-[#FBBC05] text-[#FBBC05]" aria-hidden />
                  ))}
                </div>
                <blockquote className="text-lg lg:text-xl text-primary dark:text-white font-medium leading-relaxed flex-1">
                  &ldquo;{t.review}&rdquo;
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block font-heading font-semibold text-primary dark:text-white">{t.name}</span>
                  <span className="block text-sm text-text/70 dark:text-gray-400">{t.business}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
