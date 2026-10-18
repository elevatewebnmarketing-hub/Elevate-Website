import Image from 'next/image';
import Link from 'next/link';

export default function AuthorBio() {
  return (
    <aside className="mt-12 flex gap-5 items-start p-6 rounded-card-lg border border-gray-200 dark:border-white/10">
      <Image
        src="/images/founder-ufuoma-onakpoyan.png"
        alt="Ufuoma Onakpoyan, founder of Elevate Web & Marketing"
        width={80}
        height={82}
        className="rounded-full flex-shrink-0"
      />
      <div>
        <p className="font-heading font-semibold text-primary dark:text-white">About the author</p>
        <p className="text-text/80 dark:text-gray-300 leading-relaxed">
          Ufuoma Onakpoyan is the founder of Elevate Web & Marketing, based in Abuja. Ufuoma builds SEO-ready websites
          for businesses in Nigeria and the UK and also works in Abuja real estate, which means seeing both sides: the
          business owner who needs customers, and the buyer searching online.{' '}
          <Link href="/about" className="text-accent hover:underline">More about Elevate</Link>.
        </p>
      </div>
    </aside>
  );
}
