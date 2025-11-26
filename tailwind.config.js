/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        winter: {
          blue: '#4A90E2',
          'blue-light': '#6BA8ED',
          'blue-dark': '#3A7BC8',
          light: '#E8F4F8',
          'light-soft': '#F0F8FC',
          dark: '#2C5282',
          'dark-deep': '#1E3A5F',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

