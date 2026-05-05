'use client';

import Logo from '@/components/ui/Logo';
import { Calendar, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { openCalendly } from '@/lib/calendly';
import { siteConfig } from '@/lib/site-config';

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.6-1.6H16.6V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7V14h2.9v8h3.6Z" />
    </svg>
  );
}

function XIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.9 7.9L22.6 22h-6.8l-4.2-5.5-5 5.5H2.3l7.4-8.5L2.1 2h7l3.8 5.1L18.9 2Z" />
    </svg>
  );
}

type SocialIconProps = { size?: number };
const socialIcons: Record<string, React.ComponentType<SocialIconProps>> = {
  Instagram: Instagram as React.ComponentType<SocialIconProps>,
  WhatsApp: WhatsAppIcon,
  Facebook: FacebookIcon,
  X: XIcon,
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-3 max-w-[280px]">
              <Logo variant="white" width={326} height={109} className="w-full h-auto max-h-14" />
            </a>
            <p className="text-white/80 text-sm max-w-xs mb-4">{siteConfig.tagline}</p>
            <p className="flex items-center gap-2 text-white/70 text-sm mb-4">
              <MapPin size={14} aria-hidden />
              {siteConfig.location}
            </p>
            <button
              type="button"
              onClick={openCalendly}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-heading font-semibold transition-colors"
            >
              <Calendar size={18} aria-hidden />
              Book a Call
            </button>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {siteConfig.footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:underline underline-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Get in Touch</h3>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors mb-3 break-words"
            >
              <Mail size={18} aria-hidden />
              {siteConfig.contactEmail}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors mb-3 block break-words"
            >
              <Phone size={18} aria-hidden />
              {siteConfig.phone}
            </a>
            <p className="text-white/60 text-sm mt-4">
              Public pricing is shown in naira. Strategy calls are free.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {siteConfig.socialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                if (!Icon) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors hover:scale-110"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-white/60 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
