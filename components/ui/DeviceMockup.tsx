'use client';

import Image from 'next/image';

export type DeviceMockupVariant = 'browser' | 'laptop';

interface DeviceMockupProps {
  src: string;
  alt: string;
  variant?: DeviceMockupVariant;
  className?: string;
}

export function DeviceMockup({ src, alt, variant = 'browser', className = '' }: DeviceMockupProps) {
  const content = (
    <div className="relative w-full overflow-hidden rounded-b-lg bg-gray-100 dark:bg-slate-700 border border-t-0 border-gray-200 dark:border-white/10 shadow-lg">
      <div className="relative aspect-video w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
    </div>
  );

  if (variant === 'laptop') {
    return (
      <div className={`relative w-full max-w-3xl mx-auto ${className}`}>
        <div className="relative rounded-lg border-2 border-gray-300 dark:border-slate-600 bg-gray-200 dark:bg-slate-700 shadow-2xl overflow-hidden">
          <div className="pt-2 px-2 pb-1 border-b border-gray-300 dark:border-slate-600 bg-gray-200 dark:bg-slate-700">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500" />
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-lg overflow-hidden shadow-soft-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-slate-800/80">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-md bg-gray-200 dark:bg-slate-600 text-xs text-text/60 dark:text-gray-400 font-mono truncate max-w-[60%]">
            {(() => { try { if (src.startsWith('http')) return new URL(src).hostname; } catch { } return 'Preview'; })()}
          </div>
        </div>
      </div>
      {content}
    </div>
  );
}
