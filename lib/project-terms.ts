/**
 * Elevate's project terms: shown on /terms#project-terms and accepted on client invoices.
 * Bump TERMS_VERSION whenever the wording changes, so acceptances record which version a client agreed to.
 * Facts come from business/CONTEXT.md and the site FAQ (timelines, ownership, no ranking promises).
 */
export const TERMS_VERSION = '2026-11-17';
export const TERMS_UPDATED_LABEL = '17 November 2026';
export const PROJECT_TERMS_URL = 'https://www.elevatewebandmarketing.com/terms#project-terms';

export const PROJECT_TERMS: { title: string; body: string[] }[] = [
  {
    title: 'What we build',
    body: [
      'We build what is listed on your invoice or quote. Anything not listed, such as extra pages, new features or a different design direction after approval, is quoted separately before we start it.',
    ],
  },
  {
    title: 'Payment',
    body: [
      'Websites are paid 50% upfront to start and 50% before the website goes live, unless your invoice says otherwise. Monthly plans are paid in advance each month.',
      'Please pay with the methods on your invoice and use the invoice number as the reference. If a payment is late, we pause work until it arrives.',
    ],
  },
  {
    title: 'Timeline',
    body: [
      'Work starts when we receive the deposit and your answers to the onboarding form. Typical timelines: Starter Website 7–10 business days, Business Website 2–4 weeks, E-commerce Website 3–5 weeks.',
      'Time spent waiting for your content, photos or feedback moves the launch date by the same amount.',
    ],
  },
  {
    title: 'Your content',
    body: [
      'You give us your text, photos and logo, or approve the drafts we write for you. You confirm you have the right to use everything you send us. A person on your side approves the website before it goes live.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'Two rounds of changes are included before launch. Further changes, or new features after launch, are quoted separately or covered by a care plan.',
    ],
  },
  {
    title: 'If the project goes quiet',
    body: [
      'If we do not hear from you for 30 days, we pause the project. We can restart it when you are ready, at the next available slot in our schedule.',
    ],
  },
  {
    title: 'Refunds',
    body: [
      'The deposit pays for work we have started, so it is not refundable once work begins. If we cannot deliver what is on your invoice, we refund the part of the work we have not delivered.',
    ],
  },
  {
    title: 'Ownership',
    body: [
      'Once the invoice is paid in full, you own the website, the domain and the content. We register domains in your name. We may show the finished website in our portfolio unless you ask us not to.',
    ],
  },
  {
    title: 'Results',
    body: [
      'We promise the work: the pages, set-up, speed, structure and tracking listed on your invoice. Nobody can guarantee rankings, traffic or a number of enquiries, so we do not.',
    ],
  },
  {
    title: 'Other costs',
    body: [
      'Costs paid to other companies, such as ad spend for Google or Meta, paid plugins, or a premium domain, are paid by you directly unless your invoice includes them.',
    ],
  },
  {
    title: 'Agreeing to these terms',
    body: [
      'Paying your invoice, or clicking “I accept” on it, means you accept the work listed on it and these terms.',
    ],
  },
];
