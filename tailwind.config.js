/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#0260a8',
          200: '#01518d',
          300: '#013a65',
          light: '#ebf6ff',
          dark: '#022c4d'
        }
      },
    },
  },
  plugins: [],
};
