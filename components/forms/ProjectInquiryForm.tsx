'use client';

import { trackEnquiryStart } from '@/lib/enquiry-start';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { STATIC_PRICING_FALLBACK, LOCATION_CURRENCY_MAP, type LocationCode } from '@/lib/pricing-config';
import { detectLocation } from '@/hooks/useLocationPricing';
import {
  createTikTokEventId,
  getTikTokAttribution,
  tiktokContentParams,
  trackTikTokEvent,
} from '@/lib/tiktok';

/**
 * One-question-at-a-time project enquiry (contact page and get-quote page).
 * Posts the same JSON to /api/contact as the old forms; TikTok events unchanged:
 * AddToCart on first interaction, InitiateCheckout on submit, Lead on success.
 */

const SERVICES = [
  'New website',
  'Website redesign',
  'Online store',
  'Landing page',
  'Local SEO and Google profile',
  'Google Ads',
  'Facebook and Instagram ads',
  'Website care plan',
  'Software or web app',
  'Not sure yet',
];

const TIMELINES = ['As soon as possible', 'Within a month', 'In 1 to 3 months', 'Just exploring'];

function budgetOptions(loc: LocationCode): string[] {
  const p = STATIC_PRICING_FALLBACK[loc];
  const { symbol } = LOCATION_CURRENCY_MAP[loc];
  const f = (n: number) => `${symbol}${n.toLocaleString(loc === 'NG' ? 'en-NG' : 'en-US')}`;
  return [
    `Under ${f(p.starter.amount)}`,
    `${f(p.starter.amount)} to ${f(p.business.amount)}`,
    `${f(p.business.amount)} to ${f(p.growth_suite.amount)}`,
    `Over ${f(p.growth_suite.amount)}`,
    'Not sure yet',
  ];
}

type Variant = 'contact' | 'quote';

interface Answers {
  services: string[];
  timeline: string;
  budget: string;
  industry: string;
  message: string;
  website: string;
  name: string;
  email: string;
  phone: string;
}

const EMPTY: Answers = { services: [], timeline: '', budget: '', industry: '', message: '', website: '', name: '', email: '', phone: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  { id: 'services', title: 'What can we help with?', hint: 'Pick everything that applies.' },
  { id: 'timeline', title: 'When do you want to start?', hint: 'A rough idea is fine.' },
  { id: 'budget', title: 'What budget do you have in mind?', hint: 'This helps us suggest the right package. Ad budgets are separate.' },
  { id: 'business', title: 'Tell us about your business', hint: 'What you sell, where, and what you want the website or ads to do.' },
  { id: 'details', title: 'Where should we reply?', hint: 'We reply within 48 hours, usually the same day.' },
] as const;

export default function ProjectInquiryForm({ variant = 'contact' }: { variant?: Variant }) {
  const content = variant === 'quote' ? (['quote-request', 'Quote Request'] as const) : (['project-inquiry', 'Project Inquiry'] as const);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Answers, string>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentName, setSentName] = useState<string | null>(null);
  const [loc, setLoc] = useState<LocationCode>('NG');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const firstRender = useRef(true);
  const reduce = useReducedMotion();
  const budgets = useMemo(() => budgetOptions(loc), [loc]);

  useEffect(() => setLoc(detectLocation()), []);
  // Focus the new question once it has animated in (the old one is still mounted until its exit finishes).
  const pendingFocus = useRef(false);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    pendingFocus.current = true;
    if (sentName) headingRef.current?.focus();
  }, [step, sentName]);
  function focusQuestion() {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }

  function touch() {
    if (started.current) return;
    started.current = true;
    trackEnquiryStart('form');
    trackTikTokEvent('AddToCart', tiktokContentParams(content[0], content[1]));
  }

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    touch();
    setA((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(i: number): boolean {
    const e: Partial<Record<keyof Answers, string>> = {};
    if (i === 0 && a.services.length === 0) e.services = 'Pick at least one option, or choose “Not sure yet”.';
    if (i === 1 && !a.timeline) e.timeline = 'Pick when you want to start.';
    if (i === 2 && !a.budget) e.budget = 'Pick a budget range, or choose “Not sure yet”.';
    if (i === 3 && a.message.trim().length < 10) e.message = 'Add a sentence or two about your business so we can help.';
    if (i === 4) {
      if (!a.name.trim()) e.name = 'Enter your name.';
      if (!EMAIL_RE.test(a.email.trim())) e.email = 'Enter an email address like name@business.com.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setDir(-1);
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!validate(4)) return;
    setError(null);
    const tiktokEventId = createTikTokEventId('Lead');
    const service = a.services.join(', ');
    const payload = {
      name: a.name.trim(),
      email: a.email.trim(),
      phone: a.phone.trim() || undefined,
      website: a.website.trim() || undefined,
      service,
      timeline: a.timeline,
      budget: a.budget,
      message: a.message.trim(),
      ...(variant === 'quote' ? { source: 'quote', projectType: service, industry: a.industry.trim() || undefined } : {}),
      tiktokEventId,
      ...getTikTokAttribution(),
    };
    trackTikTokEvent('InitiateCheckout', tiktokContentParams(content[0], content[1]));
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === 'string' ? data.error : 'Your enquiry didn’t send. Check your connection and try again, or message us on WhatsApp.');
        return;
      }
      trackTikTokEvent('Lead', tiktokContentParams(content[0], content[1]), tiktokEventId);
      setSentName(a.name.trim().split(/\s+/)[0] || a.name.trim());
      setA(EMPTY);
      setStep(0);
    } catch {
      setError('Your enquiry didn’t send. Check your connection and try again, or message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const t = e.target as HTMLElement;
    if (e.key === 'Enter' && t.tagName !== 'TEXTAREA' && t.tagName !== 'BUTTON') {
      e.preventDefault();
      if (step === STEPS.length - 1) void submit();
      else next();
    }
  }

  const whatsapp = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hi Elevate, I just sent an enquiry on your website.')}`;
  const card = 'rounded-card-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 shadow-soft-lg';

  if (sentName) {
    return (
      <div className={`${card} p-8 sm:p-10`} role="status">
        <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-5">
          <Check className="text-accent" size={26} aria-hidden />
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-3 outline-none">
          Thanks, {sentName}. Your enquiry is in.
        </h2>
        <p className="text-text/80 dark:text-gray-300 text-lg mb-6">
          We’ll reply within 48 hours, and we’ve sent a copy to your email. Need an answer sooner? Message us on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={whatsapp} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors">
            <MessageCircle size={20} aria-hidden /> WhatsApp us
          </a>
          <button type="button" onClick={() => setSentName(null)} className="inline-flex items-center justify-center min-h-[48px] px-6 font-heading font-semibold text-primary dark:text-white hover:text-accent">
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const s = STEPS[step];
  const chip = (selected: boolean) =>
    `relative flex items-center gap-2.5 min-h-[52px] w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
      selected
        ? 'border-accent bg-accent/10 text-primary dark:text-white'
        : 'border-gray-200 dark:border-white/15 text-text dark:text-gray-200 hover:border-accent/60'
    }`;
  const input =
    'w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/15 bg-background dark:bg-slate-900 text-primary dark:text-white placeholder:text-text/45 focus:outline-none focus:border-accent transition-colors';
  const err = (k: keyof Answers) =>
    errors[k] ? (
      <p id={`err-${k}`} className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{errors[k]}</p>
    ) : null;

  return (
    <form
      noValidate
      onSubmit={(e) => { e.preventDefault(); if (step === STEPS.length - 1) void submit(); else next(); }}
      onKeyDown={onKeyDown}
      onFocus={touch}
      className={`${card} p-6 sm:p-8 lg:p-10`}
      aria-labelledby="inquiry-question"
    >
      <div className="flex items-center justify-between gap-4 mb-3 text-sm">
        <p className="text-text/70 dark:text-gray-400" aria-live="polite">
          Step {step + 1} of {STEPS.length}
        </p>
        {step > 0 && (
          <button type="button" onClick={back} className="inline-flex items-center gap-1.5 min-h-[44px] px-2 -mr-2 font-semibold text-primary dark:text-white hover:text-accent">
            <ArrowLeft size={16} aria-hidden /> Back
          </button>
        )}
      </div>
      <div className="flex gap-1.5 mb-8" aria-hidden>
        {STEPS.map((st, i) => (
          <span key={st.id} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-accent' : 'bg-gray-200 dark:bg-white/10'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div
          key={s.id}
          custom={dir}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -24 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={(def) => { if ((def as { opacity?: number })?.opacity === 1) focusQuestion(); }}
        >
          <h2 id="inquiry-question" ref={headingRef} tabIndex={-1} className="font-heading font-bold text-2xl sm:text-3xl text-primary dark:text-white mb-2 outline-none">
            {s.title}
          </h2>
          <p className="text-text/70 dark:text-gray-400 mb-6">{s.hint}</p>

          {s.id === 'services' && (
            <fieldset aria-labelledby="inquiry-question" aria-describedby={errors.services ? 'err-services' : undefined}>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {SERVICES.map((opt) => {
                  const on = a.services.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        set('services', opt === 'Not sure yet' ? (on ? [] : ['Not sure yet']) : on ? a.services.filter((x) => x !== opt) : [...a.services.filter((x) => x !== 'Not sure yet'), opt])
                      }
                      className={chip(on)}
                    >
                      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 ${on ? 'border-accent bg-accent' : 'border-gray-300 dark:border-white/30'}`} aria-hidden>
                        {on && <Check size={14} className="text-white" strokeWidth={3} />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {err('services')}
            </fieldset>
          )}

          {(s.id === 'timeline' || s.id === 'budget') && (
            <fieldset aria-describedby={errors[s.id] ? `err-${s.id}` : undefined}>
              <div className="grid sm:grid-cols-2 gap-2.5" role="radiogroup" aria-labelledby="inquiry-question">
                {(s.id === 'timeline' ? TIMELINES : budgets).map((opt) => {
                  const on = a[s.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => {
                        set(s.id, opt);
                        // Single choice: move on after a short beat so the selection is visible.
                        window.setTimeout(() => { setDir(1); setStep((x) => (x === step ? x + 1 : x)); }, reduce ? 0 : 220);
                      }}
                      className={chip(on)}
                    >
                      <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${on ? 'border-accent' : 'border-gray-300 dark:border-white/30'}`} aria-hidden>
                        {on && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {err(s.id)}
            </fieldset>
          )}

          {s.id === 'business' && (
            <div className="space-y-5">
              {variant === 'quote' && (
                <div>
                  <label htmlFor="q-industry" className="block font-medium text-primary dark:text-white mb-2">What kind of business is it? <span className="text-text/60 font-normal">(optional)</span></label>
                  <input id="q-industry" className={input} value={a.industry} onChange={(e) => set('industry', e.target.value)} placeholder="For example: real estate agency in Abuja" maxLength={100} />
                </div>
              )}
              <div>
                <label htmlFor="q-message" className="block font-medium text-primary dark:text-white mb-2">Your business and what you need</label>
                <textarea
                  id="q-message"
                  rows={5}
                  className={`${input} resize-y`}
                  value={a.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="For example: we sell building materials in Asaba and want more calls from Google."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  maxLength={5000}
                />
                {err('message')}
              </div>
              <div>
                <label htmlFor="q-website" className="block font-medium text-primary dark:text-white mb-2">Current website <span className="text-text/60 font-normal">(optional)</span></label>
                <input id="q-website" type="url" inputMode="url" className={input} value={a.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" maxLength={200} />
              </div>
            </div>
          )}

          {s.id === 'details' && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="q-name" className="block font-medium text-primary dark:text-white mb-2">Your name</label>
                  <input id="q-name" autoComplete="name" className={input} value={a.name} onChange={(e) => set('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-name' : undefined} maxLength={100} />
                  {err('name')}
                </div>
                <div>
                  <label htmlFor="q-email" className="block font-medium text-primary dark:text-white mb-2">Email</label>
                  <input id="q-email" type="email" autoComplete="email" inputMode="email" className={input} value={a.email} onChange={(e) => set('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'err-email' : undefined} maxLength={254} />
                  {err('email')}
                </div>
              </div>
              <div>
                <label htmlFor="q-phone" className="block font-medium text-primary dark:text-white mb-2">WhatsApp number <span className="text-text/60 font-normal">(optional, for a faster reply)</span></label>
                <input id="q-phone" type="tel" autoComplete="tel" inputMode="tel" className={input} value={a.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+234" maxLength={30} />
              </div>
              <div className="rounded-xl bg-background dark:bg-slate-900 p-4 text-sm text-text/80 dark:text-gray-300">
                <p className="font-semibold text-primary dark:text-white mb-1">Your answers</p>
                <p>{a.services.join(', ')} · {a.timeline} · {a.budget}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}{' '}
          <a href={whatsapp} className="font-semibold underline">Message us on WhatsApp</a>
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-xs text-text/60 dark:text-gray-500">
          Or message us on <a href={whatsapp} className="underline hover:text-accent">WhatsApp</a>.
        </p>
        {(s.id === 'services' || s.id === 'business' || s.id === 'timeline' || s.id === 'budget') && (
          <button type="submit" className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition-colors">
            Continue <ArrowRight size={18} aria-hidden />
          </button>
        )}
        {s.id === 'details' && (
          <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 disabled:opacity-70 disabled:cursor-wait transition-colors">
            {loading ? (<><Loader2 size={18} className="animate-spin" aria-hidden /> Sending…</>) : (<>Send my enquiry <ArrowRight size={18} aria-hidden /></>)}
          </button>
        )}
      </div>
    </form>
  );
}
