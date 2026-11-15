/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0b1326',
          low: '#131b2e',
          base: '#171f33',
          high: '#222a3d',
          highest: '#2d3449',
        },
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
          light: '#38bdf8',
          muted: 'rgba(14,165,233,0.15)',
        },
        tertiary: {
          DEFAULT: '#10b981',
          muted: 'rgba(16,185,129,0.12)',
        },
        danger: {
          DEFAULT: '#ef4444',
          muted: 'rgba(239,68,68,0.12)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          muted: 'rgba(245,158,11,0.12)',
        },
        onSurface: '#dae2fd',
        textSecondary: '#94a3b8',
        textTertiary: '#64748b',
        border: 'rgba(148,163,184,0.12)',
        borderMd: 'rgba(148,163,184,0.2)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Inter', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-once': 'spin 0.3s linear 1',
      },
      boxShadow: {
        'glow-primary': '0 0 12px rgba(14,165,233,0.3)',
        'glow-primary-sm': '0 0 8px rgba(14,165,233,0.25)',
      },
      backdropBlur: {
        xl: '20px',
      },
    },
  },
  plugins: [],
}
