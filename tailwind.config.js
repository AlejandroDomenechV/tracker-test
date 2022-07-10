/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'white': '#FFFFFF',
      'extra-light-grey': '#F4F4F4',
      'lightest-grey': '#E7E7E7',
      'light-grey': '#B5B5B5',
      'darkest-grey': '#5D5D5D',
      'dark-grey': '#707070',
      'extra-dark-grey': '#3F3F3F',
      'grey': '#848484',
      'salmon': '#FF9984',
      'teal': '#50B59B',
      'light-teal': '#d8f2ec'
    },
    fontFamily: {
      'cera': ['Cera Pro', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}
