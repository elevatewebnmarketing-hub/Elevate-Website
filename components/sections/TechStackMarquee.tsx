'use client';

import {
  siVercel,
  siHostinger,
  siResend,
  siZoho,
  siGithub,
  siCloudinary,
  siReact,
  siCalendly,
} from 'simple-icons';

const TECH_LOGOS = [
  { name: 'Vercel',     url: 'https://vercel.com',      icon: siVercel },
  { name: 'Hostinger',  url: 'https://hostinger.com',   icon: siHostinger },
  { name: 'Resend',     url: 'https://resend.com',      icon: siResend },
  { name: 'Zoho Mail',  url: 'https://zoho.com/mail',   icon: siZoho },
  { name: 'GitHub',     url: 'https://github.com',      icon: siGithub },
  { name: 'Cloudinary', url: 'https://cloudinary.com',  icon: siCloudinary },
  { name: 'React',      url: 'https://react.dev',       icon: siReact },
  { name: 'Calendly',   url: 'https://calendly.com',    icon: siCalendly },
];

function LogoItem({ item }: { item: (typeof TECH_LOGOS)[0] }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center flex-shrink-0 w-28 opacity-70 hover:opacity-100 transition-opacity"
      aria-label={item.name}
    >
      <div className="flex items-center justify-center w-20 h-12 flex-shrink-0">
        <svg
          role="img"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="max-h-10 max-w-[64px] w-auto h-auto fill-[#374151] dark:fill-[#94a3b8]"
        >
          <path d={item.icon.path} />
        </svg>
      </div>
      <span className="mt-2 text-xs font-medium text-text/70 dark:text-gray-400 whitespace-nowrap">
        {item.name}
      </span>
    </a>
  );
}

function LogoRow() {
  return (
    <div className="flex items-center gap-16 flex-shrink-0 px-4">
      {TECH_LOGOS.map((item) => (
        <LogoItem key={item.name} item={item} />
      ))}
    </div>
  );
}

export default function TechStackMarquee() {
  return (
    <section
      className="py-12 border-b border-gray-100 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 overflow-hidden"
      aria-label="Technologies we use"
    >
      <p className="text-center text-sm font-medium text-text/50 dark:text-gray-400 uppercase tracking-wider mb-8">
        Powered by
      </p>
      <div className="overflow-hidden" aria-hidden>
        <div className="marquee-track flex w-max">
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </section>
  );
}
