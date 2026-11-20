import Link from 'next/link';
import type { ReactNode } from 'react';
import { MapPin, Clock, Car } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { siteConfig } from '@/lib/site-config';

/**
 * Homepage location sections (20 Nov 2026). Facts from Ufuoma's answers of 20 Nov 2026 (seo/decisions.md):
 * founder lives and works in Abuja, no Abuja office (service area, no address shown), free discovery visits
 * usually within 24 hours, office at MR DGN's office in Asaba, and which client is in which city.
 * Every link points at a page Google already knows, so the homepage passes its weight to them.
 */

const inline = 'text-accent font-medium underline underline-offset-2 hover:no-underline';
const card = 'rounded-card-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 p-6';
const h2 = 'font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white mb-4';
const h3 = 'font-heading font-semibold text-xl text-primary dark:text-white mb-2';
const body = 'text-text/80 dark:text-gray-300 leading-relaxed';

interface Project {
  name: string;
  href: string;
  where: string;
  detail: ReactNode;
}

const abujaProjects: Project[] = [
  {
    name: 'Mansa Luxe Realty',
    href: '/portfolio/3',
    where: 'Abuja and Asaba',
    detail: (
      <>
        Homes for sale in <Link href="/locations/katampe-extension" className={inline}>Katampe Extension</Link>,{' '}
        <Link href="/locations/guzape" className={inline}>Guzape</Link>, Gwarinpa Extension and Idu, Abuja. Every
        listing and district has its own page. Its Google impressions grew from 46 in May 2026 to 843 in October 2026.
      </>
    ),
  },
  {
    name: 'FP Conglomerate',
    href: '/portfolio/7',
    where: 'Abuja',
    detail:
      'A conglomerate headquartered in the capital. We built its marketing site with lead capture, a blog, careers and a staff admin portal, all on its own API.',
  },
  {
    name: 'BSG Beelicious Signatures Global',
    href: '/portfolio/4',
    where: 'Abuja',
    detail:
      'An Abuja fragrance and home-scent brand. An online store with product collections. Their Google review: “I love the website they created for my business. Very professional.”',
  },
  {
    name: 'MR DGN Construction',
    href: '/portfolio/2',
    where: 'Asaba and Abuja',
    detail:
      'Building materials and construction for projects in Asaba and Abuja, with separate pages for cement, blocks, pavers and delivery.',
  },
];

const asabaProjects: Project[] = [
  {
    name: 'MR DGN Group',
    href: '/portfolio/1',
    where: 'Head office in Asaba',
    detail: 'The group site for its construction, real estate and entertainment companies.',
  },
  {
    name: 'MR DGN Construction',
    href: '/locations/okpanam',
    where: 'Okpanam, Asaba',
    detail: 'In our November 2026 test, ChatGPT listed it first for cement blocks in Asaba with delivery.',
  },
  {
    name: 'Mama Onome Natural Health',
    href: '/portfolio/8',
    where: 'Asaba',
    detail: 'A natural health store in Asaba, with its products and an easy way to get in touch.',
  },
  {
    name: 'K-CAP Global Ltd',
    href: '/portfolio/13',
    where: 'Owa, Delta State',
    detail: 'An agricultural commodity exporter selling ginger, sesame and soybeans to buyers abroad.',
  },
];

const abujaServices = [
  { label: 'Website design in Abuja', href: '/services/website-design' },
  { label: 'E-commerce website design for Abuja shops', href: '/services/ecommerce' },
  { label: 'Local SEO and Google Business Profile', href: '/services/local-seo' },
  { label: 'Website redesign', href: '/services/website-redesign' },
  { label: 'Google Ads', href: '/services/google-ads' },
  { label: 'Website care plans', href: '/services/website-maintenance' },
];

const ABUJA_AREAS = 'Maitama, Wuse, Jabi, Garki, Gwarinpa, Lokogoma, Kubwa, Lugbe, Katampe Extension, Guzape';

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-5">
      {projects.map((p) => (
        <li key={p.name + p.where} className={card}>
          <p className="text-sm font-semibold text-accent mb-1">{p.where}</p>
          <h4 className={h3}>
            <Link href={p.href} className="hover:underline underline-offset-4">
              {p.name}
            </Link>
          </h4>
          <p className={`${body} text-sm`}>{p.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function AbujaSection() {
  return (
    <SectionWrapper id="abuja" className="py-16 lg:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <h2 className={h2}>Website design and SEO for Abuja businesses</h2>
          <p className={`${body} text-lg mb-4`}>
            Our founder, Ufuoma Onakpoyan, lives and works in Abuja, so you meet the person who builds your website.
            We don’t have an Abuja office yet. We come to your business instead.
          </p>
          <p className={`${body} text-lg`}>
            People in Abuja search for exactly what they want, such as “estate agent in Katampe” or “bakery in
            Wuse”. We build a page for each thing you sell, set up the Google Business Profile to match, and make sure
            Google and ChatGPT can read every page.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          <div className={card}>
            <Car className="text-accent mb-3" size={24} aria-hidden />
            <h3 className={h3}>Free discovery visit in Abuja</h3>
            <p className={`${body} text-sm`}>
              The first meeting is free. We visit your shop, office or site, see how customers find you now,
              and tell you what we would change. Prefer a call? That works too.
            </p>
          </div>
          <div className={card}>
            <Clock className="text-accent mb-3" size={24} aria-hidden />
            <h3 className={h3}>Usually within 24 hours</h3>
            <p className={`${body} text-sm`}>
              Book on WhatsApp or by phone and we can usually be with you within 24 hours, depending on the week’s
              schedule and when suits you.
            </p>
          </div>
          <div className={card}>
            <MapPin className="text-accent mb-3" size={24} aria-hidden />
            <h3 className={h3}>Anywhere in Abuja</h3>
            <p className={`${body} text-sm`}>
              We visit businesses all over the city, including {ABUJA_AREAS}, and the rest of the FCT.
            </p>
          </div>
        </div>

        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-6">
          Websites we’ve built for Abuja businesses
        </h3>
        <ProjectList projects={abujaProjects} />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="font-heading font-bold text-2xl text-primary dark:text-white mb-4">
              What we do for Abuja businesses
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {abujaServices.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={inline}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <p className={`${body} mb-3`}>
              The prices are the same fixed packages we charge everywhere in Nigeria, listed on our{' '}
              <Link href="/pricing" className={inline}>pricing page</Link>. For a full breakdown, read{' '}
              <Link href="/blog/website-cost-in-nigeria-2026" className={inline}>what a website costs in Nigeria</Link>.
            </p>
            <p className={body}>
              More detail, including what Abuja searches look like right now:{' '}
              <Link href="/locations/abuja" className={inline}>web design and SEO in Abuja</Link>.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function AsabaSection() {
  return (
    <SectionWrapper id="asaba" className="py-16 lg:py-24 bg-background dark:bg-slate-900">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h2 className={h2}>Our office in Asaba</h2>
            <p className={`${body} text-lg mb-4`}>
              Our office is inside MR DGN’s office in Asaba, the head office of the group we build for. Come in any
              time and ask for Elevate Web &amp; Marketing. The team there will call us, or you can phone ahead on{' '}
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={inline}>{siteConfig.phone}</a>.
            </p>
            <address className={`${card} not-italic mb-4`}>
              <p className="font-heading font-semibold text-primary dark:text-white">Elevate Web &amp; Marketing</p>
              <p className={`${body} text-sm`}>
                Jossie Excel School, after Okpanam City Gate by the Express, Asaba, Delta State
              </p>
              <a href={siteConfig.googleProfileUrl} target="_blank" rel="noopener" className={`${inline} text-sm`}>
                Directions on Google Maps
              </a>
            </address>
            <p className={body}>
              See <Link href="/locations/asaba" className={inline}>web design in Asaba</Link> for our Asaba work in
              more detail.
            </p>
          </div>
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-6">
              Websites we’ve built in Asaba and Delta State
            </h3>
            <ProjectList projects={asabaProjects} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

const elsewhere: { place: string; text: ReactNode }[] = [
  {
    place: 'Lagos',
    text: (
      <>
        The <Link href="/portfolio/11" className={inline}>donation platform for SOCASEMP Initiative</Link>, a Lagos
        non-profit. See <Link href="/locations/lagos" className={inline}>web design in Lagos</Link>.
      </>
    ),
  },
  {
    place: 'Benin City',
    text: (
      <>
        The <Link href="/portfolio/5" className={inline}>TMM Scholars website</Link>, a one-page site for a scholarship
        programme for young people in Benin City, with eligibility, the selection steps and WhatsApp contact.
      </>
    ),
  },
  {
    place: 'United Kingdom',
    text: (
      <>
        <Link href="/case-studies/runway-refined" className={inline}>Runway Refined by Alek</Link>, a UK model coach.
        For UK businesses: <Link href="/uk" className={inline}>websites for UK small businesses</Link>.
      </>
    ),
  },
  {
    place: 'Online',
    text: (
      <>
        <Link href="/portfolio/12" className={inline}>Needool</Link>, a skills marketplace, and{' '}
        <Link href="/portfolio/6" className={inline}>Trade with MRK</Link>, a trading mentorship platform.
      </>
    ),
  },
];

export function ElsewhereSection() {
  return (
    <SectionWrapper className="py-14 lg:py-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-2">
          Beyond Abuja and Asaba
        </h2>
        <p className={`${body} mb-6 max-w-3xl`}>
          We work remotely for clients in other cities too, at the same prices. See every project in{' '}
          <Link href="/portfolio" className={inline}>our portfolio</Link> or{' '}
          <Link href="/locations/nigeria" className={inline}>SEO and web design across Nigeria</Link>.
        </p>
        <dl className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {elsewhere.map((e) => (
            <div key={e.place} className={card}>
              <dt className={h3}>{e.place}</dt>
              <dd className={`${body} text-sm`}>{e.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionWrapper>
  );
}
