'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { siteConfig, type NavItem } from '@/lib/site-config';

const linkClass =
  'text-text/80 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium text-sm transition-colors duration-200';

/** Desktop dropdown: opens on hover and on click, closes on Escape, outside click or focus leaving it. */
function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A mouse click right after hover-open must not close the menu it just opened.
  const openedByHover = useRef(false);
  const menuId = `menu-${item.label.toLowerCase()}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!open) openedByHover.current = true;
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      openedByHover.current = false;
    }, 120);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={`${linkClass} inline-flex items-center gap-1 py-2`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((v) => !v);
          }
        }}
      >
        {item.label}
        <ChevronDown
          size={16}
          aria-hidden
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[22rem]"
          >
            <ul className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-lg p-2">
              {item.children!.map((child) => (
                <li key={child.href}>
                  <a
                    href={child.href}
                    className="block rounded-lg px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-white/5 focus-visible:bg-gray-50 dark:focus-visible:bg-white/5"
                  >
                    <span className="block text-sm font-semibold text-primary dark:text-white">{child.label}</span>
                    {child.note && (
                      <span className="block text-xs text-text/60 dark:text-gray-400 mt-0.5">{child.note}</span>
                    )}
                  </a>
                </li>
              ))}
              <li className="border-t border-gray-100 dark:border-white/10 mt-1 pt-1">
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-accent hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  {item.label === 'Services' ? 'All services and prices' : 'Start with Abuja'}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile accordion section for an item with children. */
function MobileSection({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-between text-primary dark:text-white font-medium py-2 min-h-[44px]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown size={20} aria-hidden className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul className="pl-3 border-l border-gray-200 dark:border-white/10 space-y-1 mb-2">
          {item.children!.map((child) => (
            <li key={child.href}>
              <a
                href={child.href}
                onClick={onNavigate}
                className="flex items-center min-h-[44px] text-sm text-text/80 dark:text-gray-300"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            className="group flex-shrink-0 block transition-transform duration-200 hover:scale-[1.03] origin-left"
          >
            <Logo
              variant={theme === 'dark' ? 'white' : 'black'}
              width={382}
              height={120}
              className="w-[8.5rem] sm:w-[10.25rem] md:w-[12.25rem] h-auto max-h-[3.9rem]"
              priority
            />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {siteConfig.navMenu.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <a key={item.href} href={item.href} className={`${linkClass} hover:underline underline-offset-4`}>
                  {item.label}
                </a>
              )
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="/contact"
              className={`inline-flex items-center justify-center px-4 py-2 text-sm font-heading font-semibold rounded-xl transition-all ${
                theme === 'dark'
                  ? 'bg-white text-primary hover:bg-gray-100'
                  : 'bg-accent text-white hover:bg-accent/90 shadow-soft'
              }`}
            >
              Contact Us
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 text-primary dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute left-0 right-0 top-full bg-background dark:bg-slate-900 shadow-lg border-t border-gray-200/50 dark:border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
              {siteConfig.navMenu.map((item) =>
                item.children ? (
                  <MobileSection key={item.label} item={item} onNavigate={() => setMobileMenuOpen(false)} />
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-primary dark:text-white font-medium py-2 min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`inline-flex items-center justify-center w-full px-6 py-3 mt-2 font-heading font-semibold rounded-xl transition-colors ${
                  theme === 'dark'
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : 'bg-accent text-white hover:bg-accent/90 shadow-soft'
                }`}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
