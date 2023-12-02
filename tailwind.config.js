/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'scaleX(0)' },
          '25%': { transform: 'scaleX(0.25)' },
          '50%': { transform: 'scaleX(0.5)' },
          '75%': { transform: 'scaleX(0.75)' },
          '100%': { transform: 'scaleX(1)' },
        }
      },
    },
  },
  plugins: [],
}

