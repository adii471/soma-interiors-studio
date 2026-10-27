/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soma: {
          bg: '#0D0C0B',
          card: '#151413',
          cardBorder: 'rgba(216, 208, 197, 0.12)',
          sand: '#E8E2D6',
          sandMuted: '#A69E92',
          cream: '#F8F6F0',
          bronze: '#C79D67',
          bronzeDark: '#8F6F44',
          charcoal: '#1A1816',
          charcoalLight: '#262320',
          accent: '#D4A373',
          warmWhite: '#FCFBF8',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
