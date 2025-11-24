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
          light: '#E8F4F8',
          dark: '#2C5282',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

