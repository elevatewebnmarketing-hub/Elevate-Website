import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Custom Web App Development',
  description: 'Elevate Web & Marketing builds custom web apps for online marketplaces, donation platforms, bookings and business workflows.',
  alternates: { canonical: '/services/web-app-development' },
};

const projects = [
  { name: 'Needool', url: 'https://www.needool.com/', description: 'A marketplace where people can find providers, browse job openings, and post what they need.' },
  { name: 'Socasemp donation platform', url: 'https://donate.socasemp.org/', description: 'A donation web app with payment integrations for Paystack and Flutterwave. The app also includes a crypto integration through NOWPayments.' },
  { name: 'ChariHelp', url: null, description: 'A forthcoming community web app for connecting people who need help with people who can offer it.' },
];

export default function WebAppDevelopmentPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-8 sm:pt-36">
        <h1 className="max-w-3xl font-heading text-4xl font-bold text-primary sm:text-6xl dark:text-white">Custom web app development</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed">We build web apps for businesses that need customers or staff to do something online, from finding a provider to paying, booking, or managing work.</p>
        <a href="/contact" className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-primary px-6 font-semibold text-white dark:bg-white dark:text-primary">Discuss your web app</a>
        <section className="mt-14" aria-labelledby="web-apps">
          <h2 id="web-apps" className="font-heading text-3xl font-bold">Web apps we’ve built</h2>
          <ul className="mt-5 grid gap-5 md:grid-cols-3">
            {projects.map(project => (
              <li key={project.name} className="rounded-2xl border border-slate-300 p-5 dark:border-slate-600">
                <h3 className="font-heading text-xl font-bold">{project.name}</h3>
                <p className="mt-3 leading-relaxed">{project.description}</p>
                {project.url && <a href={project.url} className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Visit {project.name}</a>}
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-10 max-w-2xl">We work online with businesses across Nigeria and abroad. You can also arrange a visit at our Asaba office through the <a href="/contact" className="font-semibold underline underline-offset-4">contact page</a>.</p>
      </main>
      <Footer />
    </>
  );
}
