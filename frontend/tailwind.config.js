/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      // Add your custom z-index values here
      // For example:
      '50': 50,
      '100': 100,
    },
  },
  plugins: [],
}

