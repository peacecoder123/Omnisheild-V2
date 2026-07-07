/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1e3a5f', light: '#2d5282', dark: '#152a45' },
        accent:  { DEFAULT: '#0d9488', light: '#14b8a6', dark: '#0f766e' },
      },
    },
  },
  plugins: [],
}
