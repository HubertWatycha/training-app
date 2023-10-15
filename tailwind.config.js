/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'text': '#111312',
      'background': '#F4F5F4',
      'primary': '#A098A0',
      'secondary': '#E2FDE4',
      'accent': '#76717A',
      'button': '#3966F9',
      'github': '#B9A1FC',
      'google': '#DB4437',
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
