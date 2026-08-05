/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FDF2F4',
          100: '#FAD5DC',
          500: '#A22C46',
          600: '#8A1F36',
          700: '#6B1D2F',
          800: '#4E1421',
          900: '#330B14',
          custom: '#612124',
          header: '#381e23',
        },
        gold: {
          DEFAULT: '#D4AF37',
          hover: '#C29F2F',
          accent: '#c5a880',
          dark: '#b59870',
          light: '#c99b4a',
        },
        cream: {
          DEFAULT: '#FDFBF7',
          dark: '#F5EFE6',
          bg: '#fbf9f5',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'var(--font-inter)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      keyframes: {
        floatDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomInOut: {
          '0%': { transform: 'scale(1.00)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.00)' },
        },
        infiniteHorizontalMarquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        autoFloatBob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      animation: {
        'float-down': 'floatDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-up': 'floatUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-in-out': 'zoomInOut 8s ease-in-out infinite',
        'marquee': 'infiniteHorizontalMarquee 40s linear infinite',
        'bob': 'autoFloatBob 3.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
