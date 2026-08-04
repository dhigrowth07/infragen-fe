/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      colors: {
        brand: {
          red: '#FF0F0F',
          redhover: '#D40D0D',
          black: '#0D0D0D',
          card: '#161616',
          border: '#2A2A2A',
          dim: '#9A9A9A',
          mid: '#C9C9C9',
        }
      },
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scrollLeft: 'scrollLeft 30s linear infinite',
        scrollRight: 'scrollRight 30s linear infinite',
        slide: 'slide 30s linear infinite',
      },
    },
  },
  plugins: [],
}

