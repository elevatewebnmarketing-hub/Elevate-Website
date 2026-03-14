---
name: Fix Calendly popup
overview: Fix the Calendly popup by adding the required widget CSS, ensuring the script is ready when opening the popup (with a fallback or load-on-demand), and optionally re-enabling the floating badge widget.
todos: []
isProject: false
---

# Fix Calendly popup

## Why the popup is not working

1. **Missing widget CSS** – The Calendly popup overlay needs their widget CSS to display. The root layout has no `<head>` and no link to `https://assets.calendly.com/assets/external/widget.css`, so the popup can fail to show or render incorrectly.
2. **Script timing** – The widget script is loaded with Next.js `Script` and `strategy="afterInteractive"`. If the user clicks "Book a Call" before the script has run, `window.Calendly` is undefined and we fall back to `window.open()` (new tab). So the popup may rarely run if the script loads late.
3. **Badge disabled** – The floating "Schedule time with me" badge was removed; the snippet you pasted includes it, so we can bring it back if you want that entry point as well.

---

## 1. Add Calendly widget CSS

- **File:** [app/layout.tsx](app/layout.tsx)
- Add a `<head>` block so the widget styles load before the script:
  - Insert `<head>` between `<html ...>` and `<body>`.
  - Inside it:  
  `<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />`
- Next.js will merge this into the document head. The CSS must be present for the popup overlay to display correctly.

---

## 2. Make the popup open reliably in [lib/calendly.ts](lib/calendly.ts)

Two approaches (pick one):

**Option A – Load script on first click if missing (recommended)**  

- In `openCalendly()`:
  - If `window.Calendly` exists: call `window.Calendly.initPopupWidget({ url: CALENDLY_URL })`.
  - If not: create a `<script>` element with `src="https://assets.calendly.com/assets/external/widget.js"`, append it to `document.body`, and in the script’s `onload` callback call `window.Calendly.initPopupWidget({ url: CALENDLY_URL })`. That way the first click can still open the popup after the script loads.
- Keep the existing new-tab fallback only for environments where the script fails to load (e.g. after a short timeout or on script error).

**Option B – Rely on existing script + CSS**  

- Only add the widget CSS (step 1) and keep the current `openCalendly()` logic (use popup if `window.Calendly` exists, else new tab). No load-on-demand.
- Improves popup styling and works when the script has already loaded; first click may still open in a new tab if the script is slow.

Recommendation: implement **Option A** so the first click can open the popup even when the initial script load is delayed.

---

## 3. Optional: Re-enable the floating badge widget

- **File:** [components/CalendlyBadge.tsx](components/CalendlyBadge.tsx)
- Keep loading the widget script as today.
- In the `Script` component’s `onLoad` callback, call `window.Calendly.initBadgeWidget({ url: '...', text: 'Schedule time with me', color: '#0069ff', textColor: '#ffffff', branding: true })` so the floating “Schedule time with me” button appears (as in your snippet).
- Ensure the `Window` type in [lib/calendly.ts](lib/calendly.ts) (or locally) includes `initBadgeWidget` so TypeScript is happy.

---

## 4. Summary


| Change                                                               | Purpose                                                               |
| -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Add widget.css in layout `<head>`                                    | Popup overlay displays and is styled correctly.                       |
| openCalendly: load script on demand if missing, then initPopupWidget | Popup works on first click even when the initial script load is late. |
| Optional: initBadgeWidget in CalendlyBadge onLoad                    | Floating “Schedule time with me” button appears.                      |


After step 1 and 2, “Book a Call” should open the Calendly scheduler in a popup; step 3 is optional and only restores the badge.