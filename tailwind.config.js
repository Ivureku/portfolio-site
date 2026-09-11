/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        'paper-deep': 'rgb(var(--color-paper-deep) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        'ink-muted': 'rgb(var(--color-ink-muted) / <alpha-value>)',
        rule: 'rgb(var(--color-rule) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        live: 'rgb(var(--color-live) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        data: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '62ch',
        shell: '82rem',
      },
    },
  },
  plugins: [],
};
