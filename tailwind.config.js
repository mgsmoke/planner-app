/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      padding: {
        'safe-b': 'env(safe-area-inset-bottom)',
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}