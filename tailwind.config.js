module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        '1/2': '50%',
        '1/4': '25%',
        '1/5': '20%',
      },
      padding: {
        '1/5': '20%',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
		require('@tailwindcss/forms'),
	],
}
