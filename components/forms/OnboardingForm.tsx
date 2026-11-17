'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { INTAKE_SECTIONS, type IntakeField } from '@/lib/intake-questions';
import { siteConfig } from '@/lib/site-config';

const DRAFT_KEY = 'elevate-onboarding-draft-v1';
const fieldClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-primary dark:text-white focus:ring-2 focus:ring-accent focus:border-accent outline-none';

export default function OnboardingForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // Restore an unsent draft from this device.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setValues(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    } catch {}
  }, [values]);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [step]);

  const section = INTAKE_SECTIONS[step];
  const last = step === INTAKE_SECTIONS.length - 1;

  function missing(fields: IntakeField[]) {
    return fields.find((f) => f.required && !values[f.id]?.trim());
  }

  function next() {
    const m = missing(section.fields);
    if (m) {
      setError(`Please answer: ${m.label}`);
      document.getElementById(`f-${m.id}`)?.focus();
      return;
    }
    if (section.id === 'basics' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? '')) {
      setError('Please check your email address.');
      document.getElementById('f-email')?.focus();
      return;
    }
    setError('');
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!last) return next();
    const m = INTAKE_SECTIONS.flatMap((s) => s.fields).find((f) => f.required && !values[f.id]?.trim());
    if (m) {
      setError(`Please answer: ${m.label}`);
      setStep(INTAKE_SECTIONS.findIndex((s) => s.fields.includes(m)));
      return;
    }
    if (!consent) {
      setError('Please tick the box to confirm.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, consent, company_url: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="p-8 bg-white dark:bg-slate-800 rounded-card shadow-soft border border-gray-100 dark:border-slate-700 text-center" role="status">
        <span className="mx-auto mb-4 w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Check size={26} aria-hidden />
        </span>
        <h2 className="font-heading font-bold text-2xl text-primary dark:text-white mb-2">Thank you, we have your answers</h2>
        <p className="text-text/80 dark:text-gray-300">
          Ufuoma will read them and message you on WhatsApp with any questions and the next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bg-white dark:bg-slate-800 rounded-card shadow-soft border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
      <ol className="flex flex-wrap gap-1.5 mb-6" aria-label="Form progress">
        {INTAKE_SECTIONS.map((s, i) => (
          <li key={s.id} className="flex-1 min-w-[2rem]">
            <span className={`block h-1.5 rounded-full ${i <= step ? 'bg-accent' : 'bg-gray-200 dark:bg-slate-600'}`} aria-hidden />
            <span className="sr-only">
              {s.title}
              {i < step ? ' (done)' : i === step ? ' (current)' : ''}
            </span>
          </li>
        ))}
      </ol>

      <p className="text-sm text-text/60 dark:text-gray-400 mb-1">
        Step {step + 1} of {INTAKE_SECTIONS.length}
      </p>
      <h2 ref={headingRef} tabIndex={-1} className="font-heading font-bold text-2xl text-primary dark:text-white mb-2 outline-none scroll-mt-28">
        {section.title}
      </h2>
      {section.intro && <p className="text-text/80 dark:text-gray-300 mb-6">{section.intro}</p>}

      <div className="space-y-5 mt-4">
        {section.fields.map((f) => {
          const id = `f-${f.id}`;
          const hintId = f.hint ? `${id}-hint` : undefined;
          return (
            <div key={f.id}>
              {f.type === 'choice' ? (
                <fieldset aria-describedby={hintId}>
                  <legend className="block font-medium text-primary dark:text-white mb-2">
                    {f.label}
                    {f.required && <span className="text-accent"> *</span>}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {f.options!.map((o, oi) => (
                      <label
                        key={o}
                        className={`cursor-pointer px-4 py-2.5 rounded-xl border text-sm transition ${
                          values[f.id] === o
                            ? 'border-accent bg-accent/10 text-primary dark:text-white font-medium'
                            : 'border-gray-200 dark:border-slate-600 text-text dark:text-gray-200 hover:border-accent'
                        }`}
                      >
                        <input
                          type="radio"
                          id={oi === 0 ? id : undefined}
                          name={f.id}
                          value={o}
                          checked={values[f.id] === o}
                          onChange={() => setValues((v) => ({ ...v, [f.id]: o }))}
                          className="sr-only"
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <>
                  <label htmlFor={id} className="block font-medium text-primary dark:text-white mb-2">
                    {f.label}
                    {f.required && <span className="text-accent"> *</span>}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      id={id}
                      rows={4}
                      className={fieldClass}
                      value={values[f.id] ?? ''}
                      placeholder={f.placeholder}
                      aria-describedby={hintId}
                      aria-required={f.required}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                    />
                  ) : (
                    <input
                      id={id}
                      type={f.type}
                      className={fieldClass}
                      value={values[f.id] ?? ''}
                      placeholder={f.placeholder}
                      aria-describedby={hintId}
                      aria-required={f.required}
                      autoComplete={f.id === 'email' ? 'email' : f.id === 'phone' ? 'tel' : f.id === 'contactName' ? 'name' : f.id === 'businessName' ? 'organization' : undefined}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                    />
                  )}
                </>
              )}
              {f.hint && (
                <p id={hintId} className="text-sm text-text/60 dark:text-gray-400 mt-1.5">
                  {f.hint}
                </p>
              )}
            </div>
          );
        })}

        {last && (
          <label className="flex items-start gap-3 pt-2 text-sm text-text/80 dark:text-gray-300">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 accent-[#4F9CF9]" />
            <span>
              I have the right to use the photos, logos and text I am sharing, and I agree to {siteConfig.companyName} using my
              answers to build my website, as described in the{' '}
              <Link href="/privacy" className="text-accent underline" target="_blank">privacy policy</Link>.
            </span>
          </label>
        )}

        {/* Honeypot for bots: hidden from people and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
          <label htmlFor="company_url">Leave this empty</label>
          <input id="company_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setError('');
              setStep((s) => s - 1);
            }}
            className="flex items-center gap-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 text-primary dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <ChevronLeft size={18} aria-hidden /> Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={sending}
          className="flex items-center gap-1 px-6 py-3 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 transition disabled:opacity-70"
        >
          {last ? (sending ? 'Sending…' : 'Send my answers') : 'Next'}
          {!last && <ChevronRight size={18} aria-hidden />}
        </button>
      </div>
    </form>
  );
}
