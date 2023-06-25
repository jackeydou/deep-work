/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_bg: '#00c49a',
        secondary_bg: '#156064',
        oriange_bg: '#fb8f67',
      },
      fontFamily: {
        'glass-antiqua': ['Glass Antiqua'],
      },
      spacing: {
        100: '100px'
      },
    },
  },
  plugins: [],
}