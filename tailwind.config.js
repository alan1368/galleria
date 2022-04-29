module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        stick: ['Stick No Bills'],
        cinzel: ['Cinzel', 'serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        red: '#990000',
        green: '#008000',
        blue: '#0000FF',
        white: '#ffffff',
        black: '#000000',
        buttonColor: '#859793',
        buttonColorHover: '#71807D',
      },
    },
  },
  plugins: [],
}
