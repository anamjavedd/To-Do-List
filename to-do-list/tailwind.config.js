/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        start: '#f7ff00',
        end: '#db36a4',
        random: '#CECECE',
        bgCream: '#FDF0D5',
        bgRed: '#C1121F',
        bgMaroon: '#780000',
        bgDarkBlue: '#003049',
        bgLightBlue: '#669BBC',
        textLemon: '#FFFACD',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        handwriting: ['"Comic Sans MS"', 'cursive'],
      },
    },
  },
  plugins: [],
}
