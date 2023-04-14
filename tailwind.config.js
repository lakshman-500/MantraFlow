/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var, sans-serif', { fontFeatureSettings: '"cv03", "cv04", "cv11"' }],
    },
    },
  },
  plugins: [
   require('@tailwindcss/forms'),
],
}

