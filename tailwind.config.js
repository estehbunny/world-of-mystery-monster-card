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
          deepDark: '#192a3a',
          shade: '#29394f',
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
