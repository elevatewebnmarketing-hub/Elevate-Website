'use client';

import Image from 'next/image';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { openCalendly } from '@/lib/calendly';
import { siteConfig } from '@/lib/site-config';
import TikTokViewContent from '@/components/analytics/TikTokViewContent';
import GoogleMapEmbed from '@/components/sections/GoogleMapEmbed';
import ProjectInquiryForm from '@/components/forms/ProjectInquiryForm';

const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hi Elevate, I’d like to talk about a project.')}`;

const methods = [
  { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.phone, href: whatsapp },
  { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` },
  { icon: Clock, label: 'Online enquiries', value: 'Open 24/7 by WhatsApp, email or enquiry form' },
];

export default function ContactPage() {
  return (
    <>
      <TikTokViewContent contentName="Contact" />
      <Header />
      <main className="pt-28 sm:pt-32 pb-16 lg:pb-20 min-h-screen bg-background dark:bg-slate-900">
        <div className="max-w-7xl 2xl:max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
            <div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary dark:text-white mb-4">
                Talk to us about your website, web app or marketing.
              </h1>
              <p className="text-text/80 dark:text-gray-300 text-lg max-w-xl mb-8">
                Reach us online at any time. Tell us what you need and we&apos;ll help you choose a next step. Prefer to talk first?
              </p>
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center justify-center min-h-[48px] px-7 bg-primary dark:bg-white text-white dark:text-primary font-heading font-semibold rounded-xl hover:bg-primary/90 transition-colors mb-10"
              >
                Book a free strategy call
              </button>

              <ul className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-5">
                {methods.map((m) => {
                  const inner = (
                    <>
                      <span className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <m.icon className="text-accent" size={20} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-text/70 dark:text-gray-400">{m.label}</span>
                        <span className={`block font-medium break-words ${m.href ? 'text-primary dark:text-white group-hover:text-accent' : 'text-primary dark:text-white'}`}>
                          {m.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={m.label}>
                      {m.href ? (
                        <a href={m.href} className="group flex items-start gap-4 min-h-[44px]">{inner}</a>
                      ) : (
                        <div className="flex items-start gap-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
                <li className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="flex items-start gap-4">
                    <span className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="text-accent" size={20} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm text-text/70 dark:text-gray-400">Office</span>
                      <span className="block font-medium text-primary dark:text-white">
                        Jossie Excel School, after Okpanam City Gate, Asaba, Delta State
                      </span>
                      <span className="block text-sm text-text/70 dark:text-gray-400 mt-1">
                        Our office is in Asaba. Contact us before travelling so we can arrange your visit. Wheelchair-accessible entrance, seating and car park are available, with free on-site and street parking. There is no wheelchair-accessible toilet.
                      </span>
                      <a
                        href={siteConfig.googleProfileUrl}
                        target="_blank"
                        rel="noopener"
                        className="inline-block mt-2 text-sm text-accent font-semibold hover:underline"
                      >
                        See us on Google (reviews and directions)
                      </a>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:sticky lg:top-28">
              <ProjectInquiryForm variant="contact" />
            </div>
          </div>

          <div className="mt-14 lg:mt-20 grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 items-stretch">
            <figure className="rounded-card-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 flex flex-col">
              <div className="relative aspect-[4/3] md:aspect-auto md:flex-1 min-h-[16rem] bg-primary/5">
                <Image
                  src="/images/founder-ufuoma-onakpoyan.png"
                  alt="Ufuoma Onakpoyan, founder of Elevate Web & Marketing"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
              <figcaption className="p-5">
                <span className="block font-heading font-semibold text-primary dark:text-white">You’ll talk to Ufuoma, the founder</span>
                <span className="block text-sm text-text/80 dark:text-gray-300 mt-1">
                  Clear scope, fixed prices and replies on WhatsApp, from the first message to launch.
                </span>
              </figcaption>
            </figure>
            <GoogleMapEmbed className="h-full" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
