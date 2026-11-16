import { siteConfig } from '@/lib/site-config';

/** Google Maps embed of Elevate's Google Business Profile (Asaba office), plus a link to the listing. */
export const GOOGLE_MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2256864221476!2d6.631492074990438!3d6.2339529937542695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043ed63e42c21c5%3A0x60539f425f8b829c!2sElevate%20Web%20And%20Marketing!5e0!3m2!1sen!2sng!4v1794861443925!5m2!1sen!2sng';

export default function GoogleMapEmbed({ className = '' }: { className?: string }) {
  return (
    <figure className={`rounded-card-lg overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 shadow-soft ${className}`}>
      <div className="aspect-[4/3] w-full">
        <iframe
          src={GOOGLE_MAP_EMBED_SRC}
          title="Map: Elevate Web & Marketing office, after Okpanam City Gate, Asaba"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="p-4 text-sm text-text/80 dark:text-gray-300 flex flex-wrap items-center justify-between gap-2">
        <span>Jossie Excel School, after Okpanam City Gate, Asaba. Meetings by appointment.</span>
        <a href={siteConfig.googleProfileUrl} target="_blank" rel="noopener" className="text-accent font-semibold hover:underline">
          See us on Google
        </a>
      </figcaption>
    </figure>
  );
}
