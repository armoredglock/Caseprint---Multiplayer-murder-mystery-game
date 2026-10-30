/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-light': 'var(--color-surface-light)',
        accent: 'var(--color-accent)',
        danger: 'var(--color-danger)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        border: 'var(--color-border)',
        'paper-cream': 'var(--color-paper-cream)',
        'ink-black': 'var(--color-ink-black)',
        'ink-blue': 'var(--color-ink-blue)',
        'ink-red': 'var(--color-ink-red)',
        'manila': 'var(--color-manila)',
        'manila-dark': 'var(--color-manila-dark)',
      },
      fontFamily: {
        ui: ['var(--font-typewriter)'], // Modified font to match precinct lobby everywhere
        typewriter: ['var(--font-typewriter)'],
        mono: ['var(--font-mono)'],
        handwriting: ['var(--font-handwriting)'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
      }
    },
  },
  plugins: [],
}
