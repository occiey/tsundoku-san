/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#26c8e4',
          DEFAULT: '#20a1b7',
          dark: '#186d8d',
        },
      }
    },
  },
  plugins: [],
}
