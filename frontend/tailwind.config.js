/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        repeater: 'repeat(auto-fit, minmax(500px, 1fr))',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
