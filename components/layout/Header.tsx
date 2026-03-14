'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/ui/Logo';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/" className="group flex-shrink-0 max-w-[45%] sm:max-w-none min-w-[8rem] block transition-transform duration-200 hover:scale-105 origin-left">
            <Logo variant={theme === 'dark' ? 'white' : 'black'} width={382} height={120} className="w-[16.31rem] sm:w-[19rem] md:w-[21.75rem] h-auto max-h-[6.34rem]" />
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text/80 hover:text-primary dark:text-gray-300 dark:hover:text-white font-medium text-sm transition-all duration-200 hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
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
            className="lg:hidden bg-background dark:bg-slate-900 border-t border-gray-200/50 dark:border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-primary dark:text-white font-medium py-2 min-h-[44px] flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`inline-flex items-center justify-center w-full px-6 py-3 font-heading font-semibold rounded-xl transition-colors ${
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
