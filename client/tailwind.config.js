/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0B0D',
          surface: '#121417',
          'surface-alt': '#17191D',
        },
        border: {
          thin: '#23262B',
          glow: '#3D2F1A',
        },
        text: {
          primary: '#F2F0EC',
          secondary: '#A39D91',
          muted: '#6B6659',
        },
        accent: {
          primary: '#D4971E',
          'primary-dim': '#A97615',
          'primary-light': '#F0B94D',
          glow: 'rgba(212, 151, 30, 0.35)',
          warn: '#FFB020',
          error: '#FF4D4F',
          info: '#4C9AFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['104px', { lineHeight: '1.05', fontWeight: '600' }],
        'display-md': ['80px', { lineHeight: '1.05', fontWeight: '600' }],
        'display-sm': ['64px', { lineHeight: '1.05', fontWeight: '500' }],
        'display-mobile': ['44px', { lineHeight: '1.1', fontWeight: '600' }],
        'display-mobile-sm': ['32px', { lineHeight: '1.1', fontWeight: '600' }],
        'eyebrow': ['11px', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '400' }],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
}
