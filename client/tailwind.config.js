/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#1a1a24',
        'surface-light': '#2a2a35',
        accent: '#d4a853',
        danger: '#8b2252',
        'text-primary': '#e6e6e6',
        'text-secondary': '#999999',
        border: '#333344',
        'paper-cream': '#f5f0e8',
        'ink-black': '#111111',
        'ink-blue': '#0f3057',
        'ink-red': '#cc0000',
        'manila': '#d6b87e',
        'manila-dark': '#b89c63',
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
