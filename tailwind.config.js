/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#161616',
        secondary: 'rgba(255, 255, 255, 0.2)',
        'dark-subtle': 'rgba(255,255,255,0.6)',
        'primary-red': '#FF315B',
        green: '#04E342',
        "dark-green": '#018f29',
        "light-green": '#94ffb2',
        blue: '#366D94',
        golden: "#ffd000",
        "dark-grey": "#2e2e2e"
      }
    },
  },
  plugins: [],
}