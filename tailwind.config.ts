import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1F3A',
        accent: '#4F9CF9',
        background: '#F7F9FC',
        text: '#111111',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(11, 31, 58, 0.08)',
        'soft-lg': '0 10px 40px -4px rgba(11, 31, 58, 0.12)',
        'soft-xl': '0 20px 60px -8px rgba(11, 31, 58, 0.15)',
      },
      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
