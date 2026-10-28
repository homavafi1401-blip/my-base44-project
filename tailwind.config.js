/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Channel vars from src/index.css keep opacity modifiers (e.g. /25) working.
        brand: {
          orange: 'rgb(var(--platform-orange-rgb) / <alpha-value>)',
          red: 'rgb(var(--fresh-red-rgb) / <alpha-value>)',
          black: 'rgb(var(--deep-black-rgb) / <alpha-value>)',
          charcoal: 'rgb(var(--charcoal-black-rgb) / <alpha-value>)',
          white: 'rgb(var(--pure-white-rgb) / <alpha-value>)',
          gray: 'rgb(var(--light-gray-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        script: ['Caveat', 'Segoe Script', 'cursive'],
      },
      boxShadow: {
        'glow-orange': '0 14px 40px -12px rgba(237, 87, 0, 0.65)',
        'glow-red': '0 18px 46px -14px rgba(198, 0, 0, 0.55)',
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-y': 'float-y 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
      },
    },
  },
  plugins: [],
};
