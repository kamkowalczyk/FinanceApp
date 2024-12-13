/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a', 
        'dark-panel': '#1e293b', 
        'accent-blue': '#3b82f6', 
      },
    },
  },
  plugins: [],
}