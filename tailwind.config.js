/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./views/**/*.{html,ejs}', './public/scripts/**/*.{js,ts}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            pre: {
              maxWidth: '100%',
              overflowX: 'auto',
            },
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
