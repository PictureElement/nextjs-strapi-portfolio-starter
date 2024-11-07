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
          '50': '#f0f8ff',
          '100': '#e0f0fe',
          '200': '#bae1fd',
          '300': '#7cc9fd',
          '400': '#37aff9',
          '500': '#0d94ea',
          '600': '#0174c8',
          '700': '#0260a8', // base
          '800': '#064f86',
          '900': '#0b426f',
          '950': '#082a49',
        },
      },
    },
  },
  plugins: [],
};
