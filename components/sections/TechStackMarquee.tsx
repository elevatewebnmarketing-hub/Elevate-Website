'use client';

const TECH_LOGOS = [
  { name: 'Vercel', url: 'https://vercel.com', imageLight: 'https://cdn.simpleicons.org/vercel/374151', imageDark: 'https://cdn.simpleicons.org/vercel/94a3b8' },
  { name: 'Hostinger', url: 'https://hostinger.com', imageLight: 'https://cdn.simpleicons.org/hostinger/374151', imageDark: 'https://cdn.simpleicons.org/hostinger/94a3b8' },
  { name: 'Resend', url: 'https://resend.com', imageLight: 'https://cdn.resend.com/brand/resend-wordmark-black.svg', imageDark: 'https://cdn.resend.com/brand/resend-wordmark-white.svg' },
  { name: 'Zoho Mail', url: 'https://zoho.com/mail', imageLight: 'https://cdn.simpleicons.org/zoho/374151', imageDark: 'https://cdn.simpleicons.org/zoho/94a3b8' },
  { name: 'GitHub', url: 'https://github.com', imageLight: 'https://cdn.simpleicons.org/github/374151', imageDark: 'https://cdn.simpleicons.org/github/94a3b8' },
  { name: 'Cloudinary', url: 'https://cloudinary.com', imageLight: 'https://cdn.simpleicons.org/cloudinary/374151', imageDark: 'https://cdn.simpleicons.org/cloudinary/94a3b8' },
  { name: 'React', url: 'https://react.dev', imageLight: 'https://cdn.simpleicons.org/react/374151', imageDark: 'https://cdn.simpleicons.org/react/94a3b8' },
  { name: 'Calendly', url: 'https://calendly.com', imageLight: 'https://cdn.simpleicons.org/calendly/374151', imageDark: 'https://cdn.simpleicons.org/calendly/94a3b8' },
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
        <img
          src={item.imageLight}
          alt=""
          className="max-h-10 max-w-16 w-auto h-auto object-contain dark:hidden"
        />
        <img
          src={item.imageDark}
          alt=""
          className="max-h-10 max-w-16 w-auto h-auto object-contain hidden dark:block"
        />
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
