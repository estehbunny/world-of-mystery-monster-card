/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#2c3e5b',
          dark: '#1c2d42',
          shade: '#2b3b51',
        },
      }
    },
  },
  safelist: [
    {
      pattern: /(bg|text)-(.*)-(.*)/,
    },
  ],
  plugins: [],
}
