/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090909',
        ink2: '#151515',
        card: '#171717',
        brand: '#FF9800',
        gold: '#FFA500',
        muted: '#C9C9C9',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        body: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['Pacifico', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 152, 0, 0.35)',
        card: '0 20px 45px -20px rgba(0, 0, 0, 0.9)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 24s linear infinite',
      },
    },
  },
  plugins: [],
};
