'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

const THEME_KEY = 'elevate-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;
  const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
  if (mql) return mql.matches ? 'dark' : 'light';
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initial state matches ThemeScript: dark by default; useEffect syncs from storage/system.
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
