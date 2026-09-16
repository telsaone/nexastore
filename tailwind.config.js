/** @type {import('tailwindcss').Config} */
import containerQueries from '@tailwindcss/container-queries'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        base: {
          DEFAULT: 'rgb(var(--nx-base) / <alpha-value>)',
          soft: 'rgb(var(--nx-base-soft) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--nx-surface) / <alpha-value>)',
          raised: 'rgb(var(--nx-surface-raised) / <alpha-value>)',
          hover: 'rgb(var(--nx-surface-hover) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--nx-border) / <alpha-value>)',
          soft: 'rgb(var(--nx-border-soft) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--nx-ink) / <alpha-value>)',
          muted: 'rgb(var(--nx-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--nx-ink-faint) / <alpha-value>)',
        },
        gold: {
          DEFAULT: '#D9A441',
          soft: '#F0C877',
          deep: '#B8842E',
        },
        violet: {
          DEFAULT: '#7C6FF0',
          soft: '#9C92FF',
          deep: '#5B4FD1',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(217,164,65,0.15), 0 8px 30px -8px rgba(217,164,65,0.25)',
        violetGlow: '0 0 0 1px rgba(124,111,240,0.18), 0 8px 30px -8px rgba(124,111,240,0.35)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at top, rgba(124,111,240,0.15), transparent 60%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out both',
        shimmer: 'shimmer 2s infinite linear',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [containerQueries, tailwindcssAnimate],
}
