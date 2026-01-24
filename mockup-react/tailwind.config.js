import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--px-theme-clr, #ff6b6b)',
        'border-light': '#e5e7eb',
        'border-dark': '#334155',
        'text-secondary-light': '#6b7280',
        'text-secondary-dark': '#94a3b8',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
