export const CALENDLY_URL = 'https://calendly.com/elevatewebnmarketing/30min';

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (opts: Record<string, unknown>) => void;
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const WIDGET_SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';

function openPopup(): void {
  try {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  } catch {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  }
}

export function openCalendly(): void {
  if (typeof window === 'undefined') return;
  if (window.Calendly) {
    openPopup();
    return;
  }
  // Script not loaded yet: load on demand and open popup when ready
  const existing = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
  if (existing) {
    const tryOpen = (): void => {
      if (window.Calendly) openPopup();
    };
    existing.addEventListener('load', tryOpen);
    setTimeout(tryOpen, 150);
    return;
  }
  const script = document.createElement('script');
  script.src = WIDGET_SCRIPT_URL;
  script.async = true;
  script.onload = () => openPopup();
  script.onerror = () => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  document.body.appendChild(script);
}
