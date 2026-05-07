import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import { siteConfig } from '@/lib/site-config';
import LandingPageVideo from '@/app/google-business-profile-website-offer/LandingPageVideo';
import {
  ArrowRight,
  BadgeCheck,
  Globe,
  MapPinned,
  MessageCircleMore,
  PlayCircle,
  SearchCheck,
  Star,
} from 'lucide-react';

const SITE_URL = 'https://www.elevatewebandmarketing.com';

const faqs = [
  {
    q: 'What is included in the NGN 250,000 offer?',
    a: 'This landing page offer is for a business website plus Google Business Profile optimization. The goal is to help your business look more credible online, show up more clearly on Google, and convert more visitors into leads.',
  },
  {
    q: 'Why do I need both a website and a Google Business Profile?',
    a: 'Your Google Business Profile helps people discover your business on Google Search and Maps, while your website gives them the details and confidence they need to take action. One helps you get found, the other helps you convert that attention into enquiries.',
  },
  {
    q: 'Can this help me get more leads for my business?',
    a: 'Yes. A stronger online presence can increase the number of people who find your business, understand what you offer, and contact you. Results still depend on your market, offer, follow-up speed, and how complete your business information is.',
  },
  {
    q: 'Do I need to already have a Google Business Profile?',
    a: 'No. If you already have one, it can be optimized. If you do not, the process can start with setting it up properly, as long as your business is eligible for a Google Business Profile.',
  },
  {
    q: 'Is Google Business Profile right for every kind of business?',
    a: 'It is best for businesses that serve customers in person or within a service area. If your business is online-only with no in-person or service-area presence, we can advise you on the right visibility strategy before proceeding.',
  },
  {
    q: 'What does Google Business Profile optimization usually cover?',
    a: 'Optimization typically focuses on complete business information, the right categories, service details, business hours, photos, website links, review strategy, and profile accuracy so customers can more easily understand and trust your business.',
  },
  {
    q: 'How long does the process usually take?',
    a: 'The timeline depends on the content you already have, whether a profile needs to be claimed or verified, and how quickly approvals or assets are available. We will confirm the timeline with you before work begins.',
  },
  {
    q: 'Will I need to provide anything?',
    a: 'Usually yes. Most businesses will need to provide basic business details, contact information, brand assets, service descriptions, and access to any existing Google Business Profile or website accounts.',
  },
  {
    q: 'Will you help us verify the Google Business Profile if needed?',
    a: 'Yes. If verification is required, we will guide you through the steps and tell you what is needed. Google requires verified profiles for some profile features and for performance data inside Business Profile.',
  },
  {
    q: 'Can reviews really affect whether people choose my business?',
    a: 'Yes. Reviews influence trust, and Google also points business owners toward review management as part of stronger profile performance. We help you present your business well and create a clearer review follow-up strategy.',
  },
  {
    q: 'Do photos and videos on Google Business Profile matter?',
    a: 'Yes. Visual content helps customers understand what your business offers and makes the profile feel more complete and trustworthy. That is one reason profile optimization should not stop at just the text fields.',
  },
  {
    q: 'What if my business serves customers at their location instead of at a shop?',
    a: 'That can still work. Service-area businesses can be eligible for Google Business Profile, as long as the business meets Google’s eligibility rules for in-person service and accurate service-area representation.',
  },
  {
    q: 'Can you guarantee that my business will rank number one on Google?',
    a: 'No one can guarantee that. Google says local results are influenced by factors like relevance, distance, and prominence. What we can do is help your business present complete, accurate, and stronger information so you are in a much better position.',
  },
  {
    q: 'Will the website include a way for people to contact me quickly?',
    a: 'Yes. The goal is to make it easy for a visitor to understand what you do and then take the next step, whether that is calling, messaging on WhatsApp, or submitting an enquiry.',
  },
  {
    q: 'Are domain, hosting, or other third-party costs part of the NGN 250,000?',
    a: 'The NGN 250,000 covers the offer described on this page. If any third-party items such as domain registration, hosting, or paid tools are needed, we will explain them clearly before you commit.',
  },
  {
    q: 'How do I get started if I am ready to buy?',
    a: 'Use the WhatsApp button on this page and send us a message. We will confirm your business details, answer any final questions, and guide you through the next step to begin.',
  },
];

export const metadata: Metadata = {
  title: 'Website + Google Business Profile Offer | Elevate Web & Marketing',
  description:
    'A dedicated landing page for businesses that want a lead-focused website and Google Business Profile optimization for NGN 250,000.',
  alternates: { canonical: '/google-business-profile-website-offer' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/google-business-profile-website-offer`,
    siteName: siteConfig.companyName,
    title: 'Website + Google Business Profile Offer | Elevate Web & Marketing',
    description:
      'Learn why your business needs a website and Google Business Profile optimization, watch the campaign video, and message us to purchase the NGN 250,000 offer.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Elevate Web & Marketing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website + Google Business Profile Offer | Elevate Web & Marketing',
    description:
      'Watch the video, understand the offer, and message Elevate Web & Marketing on WhatsApp to purchase.',
    images: ['/twitter-image'],
  },
};

export default function GoogleBusinessProfileWebsiteOfferPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    'Hi Elevate Web & Marketing, I am interested in the website + Google Business Profile offer for NGN 250,000.'
  )}`;

  const offerItems = [
    'A business website designed to help visitors trust you and take action.',
    'Google Business Profile optimization to improve how your business appears on Google.',
    'A clearer online presence that supports enquiries, calls, and qualified leads.',
  ];

  const whyItMatters = [
    {
      title: 'People search before they buy',
      body: 'When prospects hear about your business, many of them check Google before they message or call. If your presence looks weak or incomplete, you can lose trust before the conversation even starts.',
      icon: SearchCheck,
    },
    {
      title: 'Your profile helps you get found locally',
      body: 'A strong Google Business Profile helps your business show up with the details people need such as your service area, contact information, reviews, and website link.',
      icon: MapPinned,
    },
    {
      title: 'Your website helps you convert attention',
      body: 'Your website gives prospects the full story: what you do, who you help, why they should trust you, and the next step they should take.',
      icon: Globe,
    },
  ];

  const proofPoints = [
    'Stronger first impression for people who search your business name.',
    'A cleaner path from Google to your website to your WhatsApp or enquiry.',
    'More clarity around your offer, services, and business credibility.',
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16 dark:bg-slate-900">
        <FaqJsonLd faqs={faqs} />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-radial opacity-40" aria-hidden />
          <div
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(79,156,249,0.14),transparent_40%,rgba(11,31,58,0.08))]"
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                Website + Google Business Profile Offer
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary dark:text-white sm:text-5xl lg:text-6xl">
                If customers cannot find your business online, this is how we help them find you now.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text/80 dark:text-gray-300 sm:text-xl">
                Play now to understand what we will do for your business. We build a business
                website and optimize your Google Business Profile so people can find you, trust
                you, and message you more easily. The full offer is
                <span className="font-bold text-primary dark:text-white"> NGN 250,000</span>.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#watch-video"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 font-heading text-base font-semibold text-white shadow-soft transition-colors hover:bg-accent/90"
                >
                  <PlayCircle size={20} />
                  Play This Video
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-primary/15 bg-white px-7 py-4 font-heading text-base font-semibold text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/15 dark:bg-slate-800 dark:text-white"
                >
                  <MessageCircleMore size={20} />
                  Message Us Directly on WhatsApp
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {offerItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-gray-200/70 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-slate-800/80"
                  >
                    <BadgeCheck className="mb-3 h-5 w-5 text-accent" />
                    <p className="text-sm leading-6 text-text/80 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-8">
              <div className="rounded-[28px] border border-primary/10 bg-primary p-1 shadow-2xl shadow-primary/15 dark:border-white/10">
                <div className="rounded-[24px] bg-[linear-gradient(180deg,#0b1f3a,#132a49)] p-7 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                    Investment
                  </p>
                  <p className="mt-4 font-heading text-5xl font-bold leading-none sm:text-6xl">
                    NGN 250,000
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
                    One focused offer for businesses that want a stronger online presence and a
                    clearer path to leads.
                  </p>

                  <div className="mt-7 space-y-3 rounded-2xl bg-white/8 p-5">
                    <div className="flex items-start gap-3">
                      <Star className="mt-0.5 h-5 w-5 text-[#f8d268]" />
                      <p className="text-sm text-white/90">
                        Clear pricing on the page so visitors know exactly what the offer is.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ArrowRight className="mt-0.5 h-5 w-5 text-accent" />
                      <p className="text-sm text-white/90">
                        Play this video, understand what we will do for your business, then message
                        us on WhatsApp when you are ready to move forward.
                      </p>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-heading text-base font-semibold text-white transition-transform hover:scale-[1.01]"
                  >
                    <MessageCircleMore size={20} />
                    Buy via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="watch-video" className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Watch the explanation
              </p>
              <h2 className="font-heading text-3xl font-bold text-primary dark:text-white sm:text-4xl">
                Play this video to see how customers can find your business online now.
              </h2>
              <p className="mt-4 text-base leading-7 text-text/80 dark:text-gray-300 sm:text-lg">
                This video explains what a better website and a properly optimized Google Business
                Profile can do for your business, why visibility matters, and how this helps turn
                search interest into real enquiries.
              </p>
            </div>

            <LandingPageVideo src="/videos/customers-find-you-online-offer.mp4" />

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-accent/20 bg-accent/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-primary dark:text-white">
                Finished watching? Message us directly on WhatsApp now if you are ready to purchase
                the <span className="font-bold">NGN 250,000</span> offer.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-heading text-sm font-semibold text-white"
              >
                <MessageCircleMore size={18} />
                Message Us on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white/70 py-12 sm:py-16 dark:bg-slate-800/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Why this works
              </p>
              <h2 className="font-heading text-3xl font-bold text-primary dark:text-white sm:text-4xl">
                Why a website and Google Business Profile matter together
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {whyItMatters.map(({ title, body, icon: Icon }) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-gray-200/70 bg-background p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"
                >
                  <div className="mb-5 inline-flex rounded-2xl bg-accent/10 p-3 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-primary dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-text/80 dark:text-gray-300">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="rounded-[28px] border border-primary/10 bg-primary p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                What you are paying for
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                NGN 250,000 for a better digital first impression
              </h2>
              <p className="mt-4 text-base leading-7 text-white/82">
                This offer is designed for businesses that want to stop looking invisible or
                incomplete online and start presenting themselves in a way that wins more trust.
              </p>
            </div>

            <div className="rounded-[28px] border border-gray-200/70 bg-white p-8 dark:border-white/10 dark:bg-slate-800">
              <h3 className="font-heading text-2xl font-semibold text-primary dark:text-white">
                What the offer is meant to help you achieve
              </h3>
              <ul className="mt-6 space-y-4">
                {proofPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm leading-7 text-text/80 dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border border-dashed border-accent/35 bg-accent/5 p-5">
                <p className="text-sm font-semibold text-primary dark:text-white">
                  Ready to move forward?
                </p>
                <p className="mt-2 text-sm leading-6 text-text/80 dark:text-gray-300">
                  Click the WhatsApp button and tell us you want the website + Google Business
                  Profile offer. We will take it from there.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white/70 py-12 sm:py-16 dark:bg-slate-800/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Frequently asked questions
              </p>
              <h2 className="font-heading text-3xl font-bold text-primary dark:text-white sm:text-4xl">
                Common questions before buying
              </h2>
              <p className="mt-4 text-base leading-7 text-text/80 dark:text-gray-300">
                These questions reflect the things businesses commonly ask before investing in a
                website and Google Business Profile optimization, including the extra questions that
                usually come up around eligibility, verification, reviews, and ranking.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-2xl border border-gray-200/70 bg-background p-5 dark:border-white/10 dark:bg-slate-900"
                >
                  <summary className="cursor-pointer list-none pr-8 font-heading text-lg font-semibold text-primary dark:text-white">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-text/80 dark:text-gray-300">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-4 pt-12 sm:pt-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] bg-[linear-gradient(135deg,#0b1f3a,#18385f)] p-8 text-white shadow-2xl shadow-primary/20 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                Clear next step
              </p>
              <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
                Play this video. If you are ready, message us on WhatsApp and get started.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/80">
                This page is here to remind you why you clicked, what the offer is, and what to do
                next. The offer is <span className="font-bold text-white">NGN 250,000</span> for a
                business website plus Google Business Profile optimization so customers can find and
                trust your business more easily online.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#watch-video"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-heading text-base font-semibold text-primary transition-colors hover:bg-white/90"
                >
                  <PlayCircle size={20} />
                  Play This Video
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 font-heading text-base font-semibold text-white"
                >
                  <MessageCircleMore size={20} />
                  Message Us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
